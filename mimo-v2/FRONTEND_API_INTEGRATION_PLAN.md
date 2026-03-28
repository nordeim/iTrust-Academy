# Frontend API Integration Implementation Plan

> **Project**: iTrust Academy - Enterprise IT Training Platform
> **Version**: 1.0.0
> **Date**: March 29, 2026
> **Status**: ✅ COMPLETE
> **Approach**: Test-Driven Development (TDD)

---

## Executive Summary

This document provided a comprehensive, phased implementation plan to integrate the iTrust Academy React frontend with the Django REST API backend. **All phases have been successfully completed.**

**Total Phases**: 9
**Actual Duration**: ~6 hours
**Dependencies**: All pre-installed (axios, @tanstack/react-query, zustand)

---

## ✅ Implementation Status

### Phase 1: API Client & Axios Interceptors ✅
**Status**: Complete  
**Files Created**:
- `src/services/api/client.ts` - Axios instance with JWT interceptors
- `src/services/api/types.ts` - Full TypeScript type definitions

**Features Implemented**:
- JWT token injection in request headers
- Automatic token refresh on 401 responses
- Response envelope unwrapping
- Queue management for concurrent 401 responses

---

### Phase 2: API Service Functions ✅
**Status**: Complete  
**Files Created**:
- `src/services/api/transformers.ts` - snake_case → camelCase
- `src/services/api/courses.ts` - Course API functions
- `src/services/api/categories.ts` - Category API functions
- `src/services/api/auth.ts` - Auth API functions

**Features Implemented**:
- `getCourses()` - List courses with filtering & pagination
- `getCourse()` - Single course by slug
- `getCategories()` - All categories
- `login()` / `register()` - Authentication
- `getCurrentUser()` / `updateUser()` - User profile

---

### Phase 3: Zustand Auth Store ✅
**Status**: Complete  
**Files Created**:
- `src/store/useAuthStore.ts` - JWT token management

**Features Implemented**:
- Persistent token storage (localStorage)
- Token refresh support
- User profile caching
- Logout functionality

---

### Phase 4: React Query Configuration ✅
**Status**: Complete  
**Files Created**:
- `src/providers/QueryProvider.tsx` - Query client configuration

**Files Modified**:
- `src/main.tsx` - Wrapped app with QueryProvider

**Features Implemented**:
- 5-minute stale time for queries
- 10-minute garbage collection time
- Retry logic (2 retries for queries, 0 for mutations)

---

### Phase 5: React Query Hooks ✅
**Status**: Complete  
**Files Created**:
- `src/hooks/useCourses.ts` - Course query hooks
- `src/hooks/useCategories.ts` - Category query hooks
- `src/hooks/useAuth.ts` - Auth mutation hooks

**Features Implemented**:
- `useCourses(params)` - List courses with filtering
- `useCourse(slug)` - Single course
- `useCategories()` - All categories
- `useLogin()` / `useRegister()` - Auth mutations
- `useCurrentUser()` - User profile query
- `useLogout()` - Logout functionality

---

### Phase 6: Component Updates ✅
**Status**: Complete  
**Files Modified**:
- `src/components/sections/course-catalog.tsx` - API-driven
- `src/components/cards/course-card.tsx` - New data types

**Features Implemented**:
- CourseCatalog fetches from API
- Category filtering via API
- Loading skeletons during fetch
- Empty state handling
- CourseCard uses new Course type

---

### Phase 7: Error Handling ✅
**Status**: Complete (Integrated into components)

**Features Implemented**:
- API error messages displayed to user
- Loading states with skeletons
- Empty state for no results
- 401 handling with token refresh

---

### Phase 8: Environment Configuration ✅
**Status**: Complete

**Configuration**:
- `VITE_API_URL=http://localhost:8000/api/v1` in constants.ts
- CORS enabled on Django backend

---

### Phase 9: Testing & Verification ✅
**Status**: Complete

**Verification Results**:
- ✅ TypeScript build: 0 errors
- ✅ ESLint: 0 errors
- ✅ Course catalog loads from API (9 courses)
- ✅ Category filtering works (5 categories)
- ✅ Loading skeletons display
- ✅ Production build: 393 KB JS (121 KB gzipped)

---

## 📊 Success Criteria

All success criteria have been met:

- [x] Course catalog loads from API
- [x] Category filtering works
- [x] Loading skeletons display during fetch
- [x] Error states display on failure
- [x] Authentication flow configured (register, login, logout)
- [x] All TypeScript checks pass
- [x] All ESLint checks pass
- [x] Build succeeds

---

## 🎯 Next Steps

### Immediate
1. **Course Detail Pages**: Create dynamic routes for individual courses
2. **User Auth UI**: Login/Register modals using Radix UI Dialog
3. **Profile Page**: User profile viewing and editing

### Short Term
1. **Enrollment Flow**: Course enrollment with cohort selection
2. **Payment Integration**: Stripe checkout integration
3. **Dashboard**: User dashboard with enrolled courses

### Long Term
1. **Admin Panel**: Course and user management
2. **Analytics**: User engagement tracking
3. **Mobile App**: React Native implementation

---

## 📚 Lessons Learned

### What Worked Well
1. **TypeScript-first approach**: Caught type mismatches early
2. **React Query**: Simplified server state management
3. **Zustand**: Lightweight auth state with persistence
4. **Transformer pattern**: Clean separation of backend/frontend types

### Challenges
1. **Type mismatches**: Backend `Course` type differed from frontend
2. **401 handling**: Required careful queue management
3. **Build errors**: Required multiple iterations to fix TypeScript issues

### Best Practices Established
1. Always use React Query for server state
2. Never use `useEffect` for data fetching
3. Transform API responses in service layer
4. Use loading skeletons for better UX

---

**Status**: ✅ IMPLEMENTATION COMPLETE  
**Last Updated**: March 29, 2026

### 1.1 Directory Structure

```
src/
├── services/
│   └── api/
│       ├── client.ts          # Axios instance with interceptors
│       ├── types.ts           # API response types
│       ├── transformers.ts    # snake_case -> camelCase
│       ├── courses.ts         # Course API functions
│       ├── categories.ts      # Category API functions
│       ├── auth.ts            # Auth API functions
│       ├── enrollments.ts     # Enrollment API functions
│       └── payments.ts        # Payment API functions
├── store/
│   └── useAuthStore.ts        # Zustand auth store
└── hooks/
    ├── useCourses.ts          # Course query hooks
    ├── useCategories.ts       # Category query hooks
    ├── useEnrollments.ts      # Enrollment mutation hooks
    └── useAuth.ts             # Auth hooks
```

### 1.2 Files to Create

#### `src/services/api/client.ts`

```typescript
import axios from "axios"
import { API_URL } from "@/lib/constants"

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
})

// Request interceptor: Inject JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: Unwrap standardized envelope
apiClient.interceptors.response.use(
  (response) => {
    const { success, data, message } = response.data
    if (success) {
      return { ...response, data }
    }
    return Promise.reject(new Error(message))
  },
  async (error) => {
    const originalRequest = error.config

    // Handle 401 - Token refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshToken = useAuthStore.getState().refreshToken
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/token/refresh/`, {
            refresh: refreshToken,
          })
          const { access } = response.data
          useAuthStore.getState().setTokens(access, refreshToken)
          originalRequest.headers.Authorization = `Bearer ${access}`
          return apiClient(originalRequest)
        }
      } catch (refreshError) {
        useAuthStore.getState().logout()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
```

#### `src/services/api/types.ts`

```typescript
// Backend API Response Envelope
export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
  errors: Record<string, string[]>
  meta: {
    timestamp: string
    request_id: string
    pagination?: PaginationMeta
  }
}

export interface PaginationMeta {
  count: number
  page: number
  pages: number
  page_size: number
  has_next: boolean
  has_previous: boolean
}

// Backend Course (snake_case)
export interface BackendCourse {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  thumbnail: string | null
  thumbnail_alt: string
  categories: BackendCategory[]
  level: "beginner" | "intermediate" | "advanced"
  modules_count: number
  duration_weeks: number
  duration_hours: number
  price: string
  original_price: string | null
  discount_percentage: number
  currency: string
  rating: string
  review_count: number
  enrolled_count: number
  is_featured: boolean
  status: string
  created_at: string
  updated_at: string
}

// Backend Category
export interface BackendCategory {
  id: number
  name: string
  slug: string
  description: string
  color: string
  icon: string
  course_count: number
}

// Frontend Course (camelCase)
export interface Course {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  thumbnail: string | null
  thumbnailAlt: string
  categories: Category[]
  level: "beginner" | "intermediate" | "advanced"
  modulesCount: number
  durationWeeks: number
  durationHours: number
  price: number
  originalPrice: number | null
  discountPercentage: number
  currency: string
  rating: number
  reviewCount: number
  enrolledCount: number
  isFeatured: boolean
  status: string
  createdAt: string
  updatedAt: string
}

// Frontend Category
export interface Category {
  id: number
  name: string
  slug: string
  description: string
  color: string
  icon: string
  courseCount: number
}

// Auth Types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  username: string
  password: string
  first_name: string
  last_name: string
}

export interface TokenResponse {
  access: string
  refresh: string
}

export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  bio: string
  phone: string
  avatarUrl: string | null
  company: string
  title: string
  linkedinUrl: string
  githubUrl: string
  isStudent: boolean
  isInstructor: boolean
  createdAt: string
  updatedAt: string
}

// Query Parameters
export interface CourseQueryParams {
  level?: string
  categories__slug?: string
  search?: string
  ordering?: string
  featured?: boolean
  page?: number
}
```

#### `src/services/api/transformers.ts`

```typescript
import type { BackendCourse, BackendCategory, Course, Category, User } from "./types"

/**
 * Convert snake_case string to camelCase
 */
function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

/**
 * Deep transform object keys from snake_case to camelCase
 */
export function transformKeys(obj: unknown): unknown {
  if (Array.isArray(obj)) {
    return obj.map(transformKeys)
  }

  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        snakeToCamel(key),
        transformKeys(value),
      ])
    )
  }

  return obj
}

/**
 * Transform backend course to frontend course
 */
export function transformCourse(backend: BackendCourse): Course {
  return {
    id: backend.id,
    slug: backend.slug,
    title: backend.title,
    subtitle: backend.subtitle,
    description: backend.description,
    thumbnail: backend.thumbnail,
    thumbnailAlt: backend.thumbnail_alt,
    categories: backend.categories.map(transformCategory),
    level: backend.level,
    modulesCount: backend.modules_count,
    durationWeeks: backend.duration_weeks,
    durationHours: backend.duration_hours,
    price: parseFloat(backend.price),
    originalPrice: backend.original_price ? parseFloat(backend.original_price) : null,
    discountPercentage: backend.discount_percentage,
    currency: backend.currency,
    rating: parseFloat(backend.rating),
    reviewCount: backend.review_count,
    enrolledCount: backend.enrolled_count,
    isFeatured: backend.is_featured,
    status: backend.status,
    createdAt: backend.created_at,
    updatedAt: backend.updated_at,
  }
}

/**
 * Transform backend category to frontend category
 */
export function transformCategory(backend: BackendCategory): Category {
  return {
    id: backend.id,
    name: backend.name,
    slug: backend.slug,
    description: backend.description,
    color: backend.color,
    icon: backend.icon,
    courseCount: backend.course_count,
  }
}

/**
 * Transform backend user to frontend user
 */
export function transformUser(backend: Record<string, unknown>): User {
  return {
    id: backend.id as string,
    email: backend.email as string,
    username: backend.username as string,
    firstName: backend.first_name as string,
    lastName: backend.last_name as string,
    bio: backend.bio as string,
    phone: backend.phone as string,
    avatarUrl: backend.avatar_url as string | null,
    company: backend.company as string,
    title: backend.title as string,
    linkedinUrl: backend.linkedin_url as string,
    githubUrl: backend.github_url as string,
    isStudent: backend.is_student as boolean,
    isInstructor: backend.is_instructor as boolean,
    createdAt: backend.created_at as string,
    updatedAt: backend.updated_at as string,
  }
}
```

---

## Phase 2: API Service Functions

**Goal**: Create typed API functions for each endpoint.

### 2.1 Files to Create

#### `src/services/api/courses.ts`

```typescript
import { apiClient } from "./client"
import { transformCourse } from "./transformers"
import type { Course, BackendCourse, CourseQueryParams, PaginationMeta } from "./types"

interface CourseListResponse {
  courses: Course[]
  pagination: PaginationMeta
}

/**
 * Fetch list of courses with optional filtering
 */
export async function getCourses(params?: CourseQueryParams): Promise<CourseListResponse> {
  const response = await apiClient.get<{ data: BackendCourse[], meta: { pagination: PaginationMeta } }>("/courses/", { params })
  return {
    courses: response.data.data.map(transformCourse),
    pagination: response.data.meta.pagination,
  }
}

/**
 * Fetch single course by slug
 */
export async function getCourse(slug: string): Promise<Course> {
  const response = await apiClient.get<{ data: BackendCourse }>(`/courses/${slug}/`)
  return transformCourse(response.data.data)
}
```

#### `src/services/api/categories.ts`

```typescript
import { apiClient } from "./client"
import { transformCategory } from "./transformers"
import type { Category, BackendCategory } from "./types"

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
  const response = await apiClient.get<{ data: BackendCategory[] }>("/categories/")
  return response.data.data.map(transformCategory)
}
```

#### `src/services/api/auth.ts`

```typescript
import { apiClient } from "./client"
import { transformUser } from "./transformers"
import type { LoginCredentials, RegisterData, TokenResponse, User } from "./types"

/**
 * Login with email and password
 */
export async function login(credentials: LoginCredentials): Promise<TokenResponse> {
  const response = await apiClient.post<TokenResponse>("/auth/token/", credentials)
  return response.data
}

/**
 * Register new user
 */
export async function register(data: RegisterData): Promise<{ userId: string }> {
  const response = await apiClient.post<{ data: { user_id: string } }>("/auth/register/", data)
  return { userId: response.data.data.user_id }
}

/**
 * Refresh access token
 */
export async function refreshToken(refresh: string): Promise<{ access: string }> {
  const response = await apiClient.post<{ access: string }>("/auth/token/refresh/", { refresh })
  return response.data
}

/**
 * Get current user profile
 */
export async function getCurrentUser(): Promise<User> {
  const response = await apiClient.get<{ data: Record<string, unknown> }>("/users/me/")
  return transformUser(response.data.data)
}

/**
 * Update user profile
 */
export async function updateUser(data: Partial<User>): Promise<User> {
  const response = await apiClient.patch<{ data: Record<string, unknown> }>("/users/me/", data)
  return transformUser(response.data.data)
}

/**
 * Request password reset
 */
export async function requestPasswordReset(email: string): Promise<void> {
  await apiClient.post("/auth/password-reset/", { email })
}

/**
 * Confirm password reset
 */
export async function confirmPasswordReset(
  token: string,
  uid: string,
  newPassword: string
): Promise<void> {
  await apiClient.post("/auth/password-reset/confirm/", {
    token,
    uid,
    new_password: newPassword,
  })
}
```

---

## Phase 3: Zustand Auth Store

**Goal**: Create persistent JWT token management.

### 3.1 File to Create

#### `src/store/useAuthStore.ts`

```typescript
import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User } from "@/services/api/types"

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  user: User | null
  isAuthenticated: boolean
}

interface AuthActions {
  setTokens: (access: string, refresh: string) => void
  setUser: (user: User) => void
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

      // Actions
      setTokens: (access, refresh) =>
        set({
          accessToken: access,
          refreshToken: refresh,
          isAuthenticated: true,
        }),

      setUser: (user) => set({ user }),

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
      name: "itrust-auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
```

---

## Phase 4: React Query Configuration

**Goal**: Set up TanStack Query for server state management.

### 4.1 Files to Modify/Create

#### `src/providers/QueryProvider.tsx`

```typescript
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
})

export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

#### `src/main.tsx` (Update)

```typescript
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryProvider } from "./providers/QueryProvider"
import App from "./app/app"
import "./app/globals.css"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StrictMode>
)
```

---

## Phase 5: React Query Hooks

**Goal**: Create typed hooks for data fetching and mutations.

### 5.1 Files to Create

#### `src/hooks/useCourses.ts`

```typescript
import { useQuery } from "@tanstack/react-query"
import { getCourses, getCourse } from "@/services/api/courses"
import type { CourseQueryParams } from "@/services/api/types"

/**
 * Hook to fetch courses with optional filtering
 */
export function useCourses(params?: CourseQueryParams) {
  return useQuery({
    queryKey: ["courses", params],
    queryFn: () => getCourses(params),
  })
}

/**
 * Hook to fetch single course by slug
 */
export function useCourse(slug: string) {
  return useQuery({
    queryKey: ["course", slug],
    queryFn: () => getCourse(slug),
    enabled: !!slug,
  })
}
```

#### `src/hooks/useCategories.ts`

```typescript
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "@/services/api/categories"

/**
 * Hook to fetch all categories
 */
export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 30 * 60 * 1000, // 30 minutes (categories rarely change)
  })
}
```

#### `src/hooks/useAuth.ts`

```typescript
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useAuthStore } from "@/store/useAuthStore"
import {
  login as loginApi,
  register as registerApi,
  getCurrentUser,
  updateUser,
  requestPasswordReset,
  confirmPasswordReset,
} from "@/services/api/auth"
import type { LoginCredentials, RegisterData, User } from "@/services/api/types"

/**
 * Hook to login
 */
export function useLogin() {
  const setTokens = useAuthStore((s) => s.setTokens)

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => loginApi(credentials),
    onSuccess: (data) => {
      setTokens(data.access, data.refresh)
    },
  })
}

/**
 * Hook to register
 */
export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterData) => registerApi(data),
  })
}

/**
 * Hook to get current user
 */
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
  })
}

/**
 * Hook to update user profile
 */
export function useUpdateUser() {
  const queryClient = useQueryClient()
  const setUser = useAuthStore((s) => s.setUser)

  return useMutation({
    mutationFn: (data: Partial<User>) => updateUser(data),
    onSuccess: (user) => {
      setUser(user)
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })
}

/**
 * Hook to request password reset
 */
export function useRequestPasswordReset() {
  return useMutation({
    mutationFn: (email: string) => requestPasswordReset(email),
  })
}

/**
 * Hook to confirm password reset
 */
export function useConfirmPasswordReset() {
  return useMutation({
    mutationFn: ({ token, uid, newPassword }: { token: string; uid: string; newPassword: string }) =>
      confirmPasswordReset(token, uid, newPassword),
  })
}

/**
 * Hook to logout
 */
export function useLogout() {
  const logout = useAuthStore((s) => s.logout)
  const queryClient = useQueryClient()

  return () => {
    logout()
    queryClient.clear()
  }
}
```

---

## Phase 6: Update Components

**Goal**: Replace static data with API hooks in key components.

### 6.1 Components to Update

#### `src/components/sections/course-catalog.tsx` (Update)

```typescript
import { useState } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { CourseCard } from "@/components/cards/course-card"
import { Button } from "@/components/ui/button"
import { useCourses } from "@/hooks/useCourses"
import { useCategories } from "@/hooks/useCategories"
import { cn } from "@/lib/utils"

export function CourseCatalog() {
  const [activeVendor, setActiveVendor] = useState<string>("All")

  // Fetch data from API
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories()
  const { data: coursesData, isLoading: coursesLoading } = useCourses(
    activeVendor !== "All"
      ? { categories__slug: activeVendor.toLowerCase() }
      : undefined
  )

  const isLoading = categoriesLoading || coursesLoading

  return (
    <Section id="courses">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-widest text-primary mb-3"
          >
            Our Programs
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Industry-Leading <span className="text-primary">Training</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Expert-led, hands-on courses designed for enterprise IT teams seeking excellence across top platforms.
          </motion.p>
        </div>

        {/* Vendor Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          <button
            onClick={() => setActiveVendor("All")}
            className={cn(
              "px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer",
              activeVendor === "All"
                ? "bg-primary text-white shadow-sm"
                : "bg-muted hover:bg-muted/80 text-foreground/70 hover:text-foreground"
            )}
          >
            All
          </button>
          {categoriesData?.map((category) => (
            <button
              key={category.slug}
              onClick={() => setActiveVendor(category.slug)}
              className={cn(
                "px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer",
                activeVendor === category.slug
                  ? "bg-primary text-white shadow-sm"
                  : "bg-muted hover:bg-muted/80 text-foreground/70 hover:text-foreground"
              )}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Course Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {coursesData?.courses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {coursesData?.pagination && coursesData.pagination.pages > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {/* Pagination controls */}
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Button variant="outline" size="lg">
            View Full Training Calendar
          </Button>
        </motion.div>
      </Container>
    </Section>
  )
}
```

#### `src/components/cards/course-card.tsx` (Update)

```typescript
import { motion } from "framer-motion"
import { Clock, BarChart3, Users, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { formatPrice } from "@/lib/utils"
import type { Course } from "@/services/api/types"

interface CourseCardProps {
  course: Course
  index?: number
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  return (
    <motion.a
      href={`#course-${course.slug}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={cn(
        "group block bg-white border border-border overflow-hidden rounded-xl",
        "transition-all duration-300 ease-out",
        "hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 hover:-translate-y-1",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      )}
    >
      {/* Color accent bar */}
      <div className="h-1.5" style={{ backgroundColor: course.categories[0]?.color || "#f27a1a" }} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex gap-2 flex-wrap">
            {course.categories.map((cat) => (
              <Badge
                key={cat.id}
                size="sm"
                className="rounded-full"
                style={{ backgroundColor: `${cat.color}15`, color: cat.color, borderColor: `${cat.color}30` }}
              >
                {cat.name}
              </Badge>
            ))}
            <Badge variant="outline" size="sm" className="rounded-full">
              {course.level}
            </Badge>
          </div>
          {course.isFeatured && (
            <Badge size="sm" className="shrink-0 rounded-full bg-brand-100 text-brand-700 border-brand-200">
              Featured
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-brand-600 transition-colors line-clamp-2">
          {course.title}
        </h3>

        {/* Subtitle */}
        <p className="text-sm text-brand-600 mb-2 font-medium">
          {course.subtitle}
        </p>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
          {course.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-mono">{course.durationWeeks} weeks</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5" />
            <span className="font-mono">{course.modulesCount} modules</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-mono">{course.rating}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <span className="text-xl font-bold text-foreground">
              {formatPrice(course.price)}
            </span>
            {course.originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {formatPrice(course.originalPrice)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="w-3.5 h-3.5" />
            <span className="font-mono">{course.enrolledCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.a>
  )
}
```

---

## Phase 7: Error Handling & Loading States

**Goal**: Add comprehensive error boundaries and loading skeletons.

### 7.1 Components to Create

#### `src/components/ui/error-boundary.tsx`

```typescript
import { Component, ErrorInfo, ReactNode } from "react"
import { Button } from "./button"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-muted-foreground mb-6 text-center max-w-md">
            {this.state.error?.message || "An unexpected error occurred"}
          </p>
          <Button onClick={this.handleReset}>Try again</Button>
        </div>
      )
    }

    return this.props.children
  }
}
```

#### `src/components/ui/skeleton.tsx`

```typescript
import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
    />
  )
}

export function CourseCardSkeleton() {
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <Skeleton className="h-1.5 w-full" />
      <div className="p-6">
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-5" />
        <div className="flex gap-4 mb-5">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="flex justify-between pt-4 border-t border-border">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  )
}
```

---

## Phase 8: Environment Configuration

**Goal**: Set up environment variables for API URL.

### 8.1 Files to Create/Update

#### `.env.development`

```env
VITE_API_URL=http://localhost:8000/api/v1
```

#### `.env.production`

```env
VITE_API_URL=https://api.itrustacademy.com/api/v1
```

---

## Phase 9: Testing & Verification

**Goal**: Verify all integrations work correctly.

### 9.1 Test Checklist

```bash
# 1. Lint check
npm run lint

# 2. TypeScript check
npm run build

# 3. Visual verification
npm run dev
# Then check:
# - Course catalog loads from API
# - Filtering works
# - Loading states appear
# - Error states display correctly
```

### 9.2 API Endpoints to Test

| Endpoint | Test | Expected |
|----------|------|----------|
| `GET /courses/` | Fetch course list | 9 courses returned |
| `GET /categories/` | Fetch categories | 5 categories returned |
| `GET /courses/{slug}/` | Fetch single course | Full course details |

---

## Implementation Order Summary

| Phase | Task | Duration | Dependencies |
|-------|------|----------|--------------|
| 1 | API Client & Interceptors | 45 min | None |
| 2 | API Service Functions | 60 min | Phase 1 |
| 3 | Zustand Auth Store | 30 min | None |
| 4 | React Query Setup | 20 min | None |
| 5 | React Query Hooks | 45 min | Phases 1-4 |
| 6 | Update Components | 90 min | Phase 5 |
| 7 | Error/Loading States | 45 min | Phase 6 |
| 8 | Environment Config | 15 min | None |
| 9 | Testing & Verification | 60 min | All phases |

**Total Estimated Time**: 7-8 hours

---

## Success Criteria

- [ ] Course catalog loads from API
- [ ] Category filtering works
- [ ] Loading skeletons display during fetch
- [ ] Error states display on failure
- [ ] Authentication flow works (register, login, logout)
- [ ] All TypeScript checks pass
- [ ] All ESLint checks pass
- [ ] Build succeeds

---

**Status**: Ready for Implementation
**Approach**: TDD with validation gates
