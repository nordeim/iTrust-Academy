// ═══════════════════════════════════════════════════════════
// Zustand Auth Store - JWT Token Management
// Persists tokens to localStorage for session persistence
// ═══════════════════════════════════════════════════════════

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/services/api/types"

interface AuthState {
  // Tokens
  accessToken: string | null
  refreshToken: string | null

  // User
  user: User | null

  // Computed
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthActions {
  setTokens: (access: string, refresh: string) => void
  setUser: (user: User) => void
  setLoading: (loading: boolean) => void
  logout: () => void
  clearTokens: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      // State
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,

      // Actions
      setTokens: (access, refresh) =>
        set({
          accessToken: access,
          refreshToken: refresh,
          isAuthenticated: true,
        }),

      setUser: (user) => set({ user }),

      setLoading: (loading) => set({ isLoading: loading }),

      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }),

      clearTokens: () =>
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "itrust-auth",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

// ─────────────────────────────────────────────────────────
// Selectors for convenient access
// ─────────────────────────────────────────────────────────

export const selectAccessToken = (state: AuthState) => state.accessToken
export const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated
export const selectUser = (state: AuthState) => state.user
