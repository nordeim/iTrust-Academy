import { describe, it, expect } from "vitest"
import { COURSE_CATEGORIES, VENDOR_TO_CATEGORY } from "@/data/courses"

describe("vendor filter alignment in fallback mode", () => {
  const filterSlugs = COURSE_CATEGORIES
    .filter(c => c.slug !== "all")
    .map(c => c.slug)

  const courseCategorySlugs = Object.values(VENDOR_TO_CATEGORY).map(v => v.slug)

  it("every filter button slug has a matching course category slug", () => {
    filterSlugs.forEach(slug => {
      expect(courseCategorySlugs).toContain(slug)
    })
  })

  it("every course category slug has a matching filter button slug", () => {
    courseCategorySlugs.forEach(slug => {
      expect(filterSlugs).toContain(slug)
    })
  })
})
