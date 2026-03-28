// ═══════════════════════════════════════════════════════════
// Course API Service
// ═══════════════════════════════════════════════════════════

import { apiClient, getPaginated, getOne } from "./client"
import { transformCourse, transformCourseDetail, transformCohorts } from "./transformers"
import type {
  Course,
  CourseDetail,
  Cohort,
  BackendCourse,
  BackendCourseDetail,
  BackendCohort,
  ApiResponse,
  CourseQueryParams,
} from "./types"

// ─────────────────────────────────────────────────────────
// 1. List Courses (with filtering & pagination)
// ─────────────────────────────────────────────────────────

interface CourseListResponse {
  courses: Course[]
  pagination: {
    count: number
    page: number
    pages: number
    pageSize: number
    hasNext: boolean
    hasPrevious: boolean
  }
}

export async function getCourses(
  params?: CourseQueryParams
): Promise<CourseListResponse> {
  const { data, meta } = await getPaginated<BackendCourse>(
    "/courses/",
    params as Record<string, unknown> | undefined
  )

  return {
    courses: data.map(transformCourse),
    pagination: meta.pagination
      ? {
          count: meta.pagination.count,
          page: meta.pagination.page,
          pages: meta.pagination.pages,
          pageSize: meta.pagination.page_size,
          hasNext: meta.pagination.has_next,
          hasPrevious: meta.pagination.has_previous,
        }
      : {
          count: data.length,
          page: 1,
          pages: 1,
          pageSize: data.length,
          hasNext: false,
          hasPrevious: false,
        },
  }
}

// ─────────────────────────────────────────────────────────
// 2. Get Single Course (by slug)
// ─────────────────────────────────────────────────────────

export async function getCourse(slug: string): Promise<CourseDetail> {
  const backend = await getOne<BackendCourseDetail>(`/courses/${slug}/`)
  return transformCourseDetail(backend)
}

// ─────────────────────────────────────────────────────────
// 3. Get Course Cohorts (available sessions)
// ─────────────────────────────────────────────────────────

export async function getCourseCohorts(slug: string): Promise<Cohort[]> {
  const response = await apiClient.get<ApiResponse<BackendCohort[]>>(
    `/courses/${slug}/cohorts/`
  )
  return transformCohorts(response.data.data)
}

// ─────────────────────────────────────────────────────────
// 4. Featured Courses
// ─────────────────────────────────────────────────────────

export async function getFeaturedCourses(): Promise<Course[]> {
  const { courses } = await getCourses({ featured: true })
  return courses
}
