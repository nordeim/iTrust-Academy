// ═══════════════════════════════════════════════════════════
// Axios API Client with JWT Interceptors
// Handles authentication, token refresh, and response unwrapping
// ═══════════════════════════════════════════════════════════

import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { API_URL } from "@/lib/constants"
import { useAuthStore } from "@/store/useAuthStore"
import type { ApiResponse, TokenResponse } from "./types"

// ─────────────────────────────────────────────────────────
// 1. Create Axios Instance
// ─────────────────────────────────────────────────────────

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
})

// ─────────────────────────────────────────────────────────
// 2. Request Interceptor: Inject JWT Token
// ─────────────────────────────────────────────────────────

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// ─────────────────────────────────────────────────────────
// 3. Response Interceptor: Unwrap Envelope & Handle 401
// ─────────────────────────────────────────────────────────

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value: unknown) => void
  reject: (reason?: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error)
    } else {
      promise.resolve(token)
    }
  })
  failedQueue = []
}

apiClient.interceptors.response.use(
  (response) => {
    // Unwrap standardized envelope
    const { success, data, message } = response.data as ApiResponse<unknown>

    if (success) {
      // Return unwrapped data
      return { ...response, data }
    }

    // Handle business logic errors
    return Promise.reject(new Error(message || "Request failed"))
  },
  async (error: AxiosError<ApiResponse<unknown>>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // Handle 401 Unauthorized - Token Refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue request while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`
          }
          return apiClient(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const refreshToken = useAuthStore.getState().refreshToken
        if (!refreshToken) {
          throw new Error("No refresh token")
        }

        // Call refresh endpoint directly (not through apiClient to avoid loop)
        const response = await axios.post<TokenResponse>(
          `${API_URL}/auth/token/refresh/`,
          { refresh: refreshToken }
        )

        const { access, refresh: newRefresh } = response.data

        // Update store
        useAuthStore.getState().setTokens(access, newRefresh || refreshToken)

        // Update header and retry
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access}`
        }

        processQueue(null, access)
        return apiClient(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError, null)
        useAuthStore.getState().logout()
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    // Extract error message from response
    const errorData = error.response?.data
    const errorMessage =
      errorData?.message ||
      error.message ||
      "An unexpected error occurred"

    return Promise.reject(new Error(errorMessage))
  }
)

// ─────────────────────────────────────────────────────────
// 4. Helper Functions
// ─────────────────────────────────────────────────────────

/**
 * Get paginated data with metadata
 */
export async function getPaginated<T>(
  endpoint: string,
  params?: Record<string, unknown>
): Promise<{ data: T[]; meta: ApiResponse<T[]>["meta"] }> {
  const response = await apiClient.get<ApiResponse<T[]>>(endpoint, { params })
  return {
    data: response.data as unknown as T[],
    meta: (response as unknown as { data: ApiResponse<T[]> }).data.meta,
  }
}

/**
 * Get single resource
 */
export async function getOne<T>(
  endpoint: string,
  params?: Record<string, unknown>
): Promise<T> {
  const response = await apiClient.get<T>(endpoint, { params })
  return response.data
}

/**
 * Create resource
 */
export async function create<T>(
  endpoint: string,
  data: unknown
): Promise<T> {
  const response = await apiClient.post<T>(endpoint, data)
  return response.data
}

/**
 * Update resource
 */
export async function update<T>(
  endpoint: string,
  data: unknown
): Promise<T> {
  const response = await apiClient.patch<T>(endpoint, data)
  return response.data
}

/**
 * Delete resource
 */
export async function remove(
  endpoint: string
): Promise<void> {
  await apiClient.delete(endpoint)
}
