// ═══════════════════════════════════════════════════════════
// Data Transformers - Backend (snake_case) → Frontend (camelCase)
// ═══════════════════════════════════════════════════════════

import type {
  BackendCategory,
  BackendCourse,
  BackendCourseDetail,
  BackendCohort,
  BackendEnrollment,
  BackendUser,
  Category,
  Course,
  CourseDetail,
  Cohort,
  Enrollment,
  User,
} from "./types"

// ─────────────────────────────────────────────────────────
// 1. Category Transformer
// ─────────────────────────────────────────────────────────

export function transformCategory(backend: BackendCategory): Category {
  return {
    id: backend.id,
    name: backend.name,
    slug: backend.slug,
    description: backend.description,
    color: backend.color,
    icon: backend.icon,
  }
}

export function transformCategories(backend: BackendCategory[]): Category[] {
  return backend.map(transformCategory)
}

// ─────────────────────────────────────────────────────────
// 2. Course Transformer
// ─────────────────────────────────────────────────────────

export function transformCourse(backend: BackendCourse): Course {
  return {
    id: backend.id,
    slug: backend.slug,
    title: backend.title,
    subtitle: backend.subtitle,
    thumbnail: backend.thumbnail,
    thumbnailAlt: backend.thumbnail_alt,
    categories: transformCategories(backend.categories),
    level: backend.level,
    modulesCount: backend.modules_count,
    durationWeeks: backend.duration_weeks,
    price: parseFloat(backend.price),
    originalPrice: backend.original_price
      ? parseFloat(backend.original_price)
      : null,
    discountPercentage: backend.discount_percentage,
    currency: backend.currency,
    rating: parseFloat(backend.rating),
    reviewCount: backend.review_count,
    isFeatured: backend.is_featured,
  }
}

export function transformCourseDetail(backend: BackendCourseDetail): CourseDetail {
  return {
    ...transformCourse(backend),
    description: backend.description,
    durationHours: backend.duration_hours,
    enrolledCount: backend.enrolled_count ?? 0,
    createdAt: backend.created_at,
    updatedAt: backend.updated_at,
  }
}

export function transformCourses(backend: BackendCourse[]): Course[] {
  return backend.map(transformCourse)
}

// ─────────────────────────────────────────────────────────
// 3. Cohort Transformer
// ─────────────────────────────────────────────────────────

export function transformCohort(backend: BackendCohort): Cohort {
  return {
    id: backend.id,
    courseTitle: backend.course_title,
    courseSlug: backend.course_slug,
    startDate: backend.start_date,
    endDate: backend.end_date,
    timezone: backend.timezone,
    format: backend.format,
    location: backend.location,
    instructorName: backend.instructor_name,
    spotsTotal: backend.spots_total,
    spotsRemaining: backend.spots_remaining,
    availabilityStatus: backend.availability_status,
    earlyBirdPrice: backend.early_bird_price
      ? parseFloat(backend.early_bird_price)
      : null,
    earlyBirdDeadline: backend.early_bird_deadline,
    status: backend.status,
  }
}

export function transformCohorts(backend: BackendCohort[]): Cohort[] {
  return backend.map(transformCohort)
}

// ─────────────────────────────────────────────────────────
// 4. Enrollment Transformer
// ─────────────────────────────────────────────────────────

export function transformEnrollment(backend: BackendEnrollment): Enrollment {
  return {
    id: backend.id,
    courseTitle: backend.course_title,
    cohortInfo: transformCohort(backend.cohort_info),
    amountPaid: parseFloat(backend.amount_paid),
    currency: backend.currency,
    status: backend.status,
    createdAt: backend.created_at,
    confirmedAt: backend.confirmed_at,
  }
}

export function transformEnrollments(backend: BackendEnrollment[]): Enrollment[] {
  return backend.map(transformEnrollment)
}

// ─────────────────────────────────────────────────────────
// 5. User Transformer
// ─────────────────────────────────────────────────────────

export function transformUser(backend: BackendUser): User {
  return {
    id: backend.id,
    email: backend.email,
    username: backend.username,
    firstName: backend.first_name,
    lastName: backend.last_name,
    bio: backend.bio,
    phone: backend.phone,
    avatarUrl: backend.avatar_url,
    company: backend.company,
    title: backend.title,
    linkedinUrl: backend.linkedin_url,
    githubUrl: backend.github_url,
    isStudent: backend.is_student,
    isInstructor: backend.is_instructor,
    createdAt: backend.created_at,
    updatedAt: backend.updated_at,
  }
}

// ─────────────────────────────────────────────────────────
// 6. Generic Transformer (for dynamic objects)
// ─────────────────────────────────────────────────────────

function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase())
}

export function transformKeys(
  obj: unknown
): unknown {
  if (Array.isArray(obj)) {
    return obj.map(transformKeys)
  }

  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([key, value]) => [
        snakeToCamel(key),
        transformKeys(value),
      ])
    )
  }

  return obj
}
