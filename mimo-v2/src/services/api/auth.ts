// ═══════════════════════════════════════════════════════════
// Auth API Service
// ═══════════════════════════════════════════════════════════

import axios from "axios"
import { apiClient } from "./client"
import { transformUser } from "./transformers"
import { API_URL } from "@/lib/constants"
import type {
  User,
  BackendUser,
  ApiResponse,
  TokenResponse,
  LoginRequest,
  RegisterRequest,
} from "./types"

// ─────────────────────────────────────────────────────────
// 1. Login (Get Token Pair)
// ─────────────────────────────────────────────────────────

export async function login(credentials: LoginRequest): Promise<TokenResponse> {
  const response = await axios.post<TokenResponse>(
    `${API_URL}/auth/token/`,
    credentials
  )
  return response.data
}

// ─────────────────────────────────────────────────────────
// 2. Register New User
// ─────────────────────────────────────────────────────────

interface RegisterResponse {
  user_id: string
}

export async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {
  const response = await axios.post<ApiResponse<RegisterResponse>>(
    `${API_URL}/auth/register/`,
    data
  )
  return response.data.data
}

// ─────────────────────────────────────────────────────────
// 3. Refresh Token
// ─────────────────────────────────────────────────────────

export async function refreshToken(refresh: string): Promise<TokenResponse> {
  const response = await axios.post<TokenResponse>(
    `${API_URL}/auth/token/refresh/`,
    { refresh }
  )
  return response.data
}

// ─────────────────────────────────────────────────────────
// 4. Verify Token
// ─────────────────────────────────────────────────────────

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await axios.post(`${API_URL}/auth/token/verify/`, { token })
    return true
  } catch {
    return false
  }
}

// ─────────────────────────────────────────────────────────
// 5. Get Current User Profile
// ─────────────────────────────────────────────────────────

export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get<ApiResponse<BackendUser>>("/users/me/")
  return transformUser(response.data.data as unknown as BackendUser)
}

// ─────────────────────────────────────────────────────────
// 6. Update User Profile
// ─────────────────────────────────────────────────────────

export async function updateUser(
  data: Partial<BackendUser>
): Promise<User> {
  const response = await apiClient.patch<ApiResponse<BackendUser>>(
    "/users/me/",
    data
  )
  return transformUser(response.data.data as unknown as BackendUser)
}

// ─────────────────────────────────────────────────────────
// 7. Password Reset Request
// ─────────────────────────────────────────────────────────

export async function requestPasswordReset(email: string): Promise<void> {
  await axios.post(`${API_URL}/auth/password-reset/`, { email })
}

// ─────────────────────────────────────────────────────────
// 8. Password Reset Confirm
// ─────────────────────────────────────────────────────────

export async function confirmPasswordReset(
  token: string,
  uid: string,
  newPassword: string
): Promise<void> {
  await axios.post(`${API_URL}/auth/password-reset/confirm/`, {
    token,
    uid,
    new_password: newPassword,
  })
}
