// ═══════════════════════════════════════════════════════════
// Course Query Hooks
// ═══════════════════════════════════════════════════════════

import { useQuery } from "@tanstack/react-query"
import { getCourses, getCourse, getCourseCohorts } from "@/services/api/courses"
import type { CourseQueryParams } from "@/services/api/types"

// ─────────────────────────────────────────────────────────
// 1. List Courses
// ─────────────────────────────────────────────────────────

export function useCourses(params?: CourseQueryParams) {
  return useQuery({
    queryKey: ["courses", params],
    queryFn: () => getCourses(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// ─────────────────────────────────────────────────────────
// 2. Single Course
// ─────────────────────────────────────────────────────────

export function useCourse(slug: string) {
  return useQuery({
    queryKey: ["course", slug],
    queryFn: () => getCourse(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })
}

// ─────────────────────────────────────────────────────────
// 3. Course Cohorts
// ─────────────────────────────────────────────────────────

export function useCourseCohorts(slug: string) {
  return useQuery({
    queryKey: ["course", slug, "cohorts"],
    queryFn: () => getCourseCohorts(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  })
}
