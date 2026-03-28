// ═══════════════════════════════════════════════════════════
// API Types - Based on actual Django REST API v1 response
// Source: http://localhost:8000/api/v1/
// ═══════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────
// 1. Response Envelope (Standardized)
// ─────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────
// 2. Backend Types (snake_case - from API)
// ─────────────────────────────────────────────────────────

export interface BackendCategory {
  id: number
  name: string
  slug: string
  description: string
  color: string
  icon: string
}

export interface BackendCourse {
  id: string
  slug: string
  title: string
  subtitle: string
  thumbnail: string | null
  thumbnail_alt: string
  categories: BackendCategory[]
  level: "beginner" | "intermediate" | "advanced"
  modules_count: number
  duration_weeks: number
  price: string
  original_price: string | null
  discount_percentage: number
  currency: string
  rating: string
  review_count: number
  is_featured: boolean
}

export interface BackendCourseDetail extends BackendCourse {
  description: string
  duration_hours: number
  meta_title: string
  meta_description: string
  enrolled_count?: number
  created_at: string
  updated_at: string
}

export interface BackendCohort {
  id: string
  course_title: string
  course_slug: string
  start_date: string
  end_date: string
  timezone: string
  format: "online" | "in_person" | "hybrid"
  location: string
  instructor_name: string
  spots_total: number
  spots_remaining: number
  availability_status: "available" | "filling-fast" | "waitlist"
  early_bird_price: string | null
  early_bird_deadline: string | null
  status: "upcoming" | "enrolling" | "in_progress" | "completed" | "cancelled"
}

export interface BackendEnrollment {
  id: string
  course_title: string
  cohort_info: BackendCohort
  amount_paid: string
  currency: string
  status: "pending" | "confirmed" | "cancelled" | "completed" | "refunded"
  created_at: string
  confirmed_at: string | null
}

export interface BackendUser {
  id: string
  email: string
  username: string
  first_name: string
  last_name: string
  bio: string
  phone: string
  avatar_url: string | null
  company: string
  title: string
  linkedin_url: string
  github_url: string
  is_student: boolean
  is_instructor: boolean
  created_at: string
  updated_at: string
}

export interface TokenResponse {
  access: string
  refresh: string
}

// ─────────────────────────────────────────────────────────
// 3. Frontend Types (camelCase)
// ─────────────────────────────────────────────────────────

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  color: string
  icon: string
}

export interface Course {
  id: string
  slug: string
  title: string
  subtitle: string
  thumbnail: string | null
  thumbnailAlt: string
  categories: Category[]
  level: "beginner" | "intermediate" | "advanced"
  modulesCount: number
  durationWeeks: number
  price: number
  originalPrice: number | null
  discountPercentage: number
  currency: string
  rating: number
  reviewCount: number
  isFeatured: boolean
}

export interface CourseDetail extends Course {
  description: string
  durationHours: number
  enrolledCount: number
  createdAt: string
  updatedAt: string
}

export interface Cohort {
  id: string
  courseTitle: string
  courseSlug: string
  startDate: string
  endDate: string
  timezone: string
  format: "online" | "in_person" | "hybrid"
  location: string
  instructorName: string
  spotsTotal: number
  spotsRemaining: number
  availabilityStatus: "available" | "filling-fast" | "waitlist"
  earlyBirdPrice: number | null
  earlyBirdDeadline: string | null
  status: "upcoming" | "enrolling" | "in_progress" | "completed" | "cancelled"
}

export interface Enrollment {
  id: string
  courseTitle: string
  cohortInfo: Cohort
  amountPaid: number
  currency: string
  status: "pending" | "confirmed" | "cancelled" | "completed" | "refunded"
  createdAt: string
  confirmedAt: string | null
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

// ─────────────────────────────────────────────────────────
// 4. Query Parameters
// ─────────────────────────────────────────────────────────

export interface CourseQueryParams {
  level?: string
  categories__slug?: string
  search?: string
  ordering?: string
  featured?: boolean
  page?: number
}

export interface CohortQueryParams {
  course?: string
  status?: string
  ordering?: string
  page?: number
}

// ─────────────────────────────────────────────────────────
// 5. Request Types
// ─────────────────────────────────────────────────────────

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  username: string
  password: string
  first_name: string
  last_name: string
}

export interface EnrollmentCreateRequest {
  course: string
  cohort: string
  amount_paid: string
}

export interface UserUpdateRequest {
  first_name?: string
  last_name?: string
  bio?: string
  phone?: string
  company?: string
  title?: string
  linkedin_url?: string
  github_url?: string
}
