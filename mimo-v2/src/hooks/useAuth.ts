// ═══════════════════════════════════════════════════════════
// Auth Query & Mutation Hooks
// ═══════════════════════════════════════════════════════════

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuthStore } from "@/store/useAuthStore"
import { transformKeysToSnake } from "@/services/api/transformers"
import {
  login as loginApi,
  register as registerApi,
  getCurrentUser,
  updateUser,
  requestPasswordReset,
  confirmPasswordReset,
} from "@/services/api/auth"
import type { LoginRequest, RegisterRequest, User } from "@/services/api/types"

// ─────────────────────────────────────────────────────────
// 1. Login Mutation
// ─────────────────────────────────────────────────────────

export function useLogin() {
  const setTokens = useAuthStore((s) => s.setTokens)

  return useMutation({
    mutationFn: (credentials: LoginRequest) => loginApi(credentials),
    onSuccess: (data) => {
      setTokens(data.access, data.refresh)
    },
  })
}

// ─────────────────────────────────────────────────────────
// 2. Register Mutation
// ─────────────────────────────────────────────────────────

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => registerApi(data),
  })
}

// ─────────────────────────────────────────────────────────
// 3. Current User Query
// ─────────────────────────────────────────────────────────

export function useCurrentUser() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const setUser = useAuthStore((s) => s.setUser)

  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const user = await getCurrentUser()
      setUser(user)
      return user
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  })
}

// ─────────────────────────────────────────────────────────
// 4. Update User Mutation
// ─────────────────────────────────────────────────────────

export function useUpdateUser() {
  const queryClient = useQueryClient()
  const setUser = useAuthStore((s) => s.setUser)

  return useMutation({
    mutationFn: (data: Partial<User>) => {
      // Transform camelCase to snake_case before API call
      const snakeCaseData = transformKeysToSnake(data)
      return updateUser(snakeCaseData as Parameters<typeof updateUser>[0])
    },
    onSuccess: (user) => {
      setUser(user)
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })
}

// ─────────────────────────────────────────────────────────
// 5. Request Password Reset
// ─────────────────────────────────────────────────────────

export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (email: string) => requestPasswordReset(email),
  })
}

// ─────────────────────────────────────────────────────────
// 6. Confirm Password Reset
// ─────────────────────────────────────────────────────────

export function useConfirmPasswordReset() {
  return useMutation({
    mutationFn: ({
      token,
      uid,
      newPassword,
    }: {
      token: string
      uid: string
      newPassword: string
    }) => confirmPasswordReset(token, uid, newPassword),
  })
}

// ─────────────────────────────────────────────────────────
// 7. Logout
// ─────────────────────────────────────────────────────────

export function useLogout() {
  const logout = useAuthStore((s) => s.logout)
  const queryClient = useQueryClient()

  return () => {
    logout()
    queryClient.clear()
  }
}
