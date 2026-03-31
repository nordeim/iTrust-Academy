// ═══════════════════════════════════════════════════════════
// Course Catalog Component - With Search Functionality
// ═══════════════════════════════════════════════════════════

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { CourseCard } from "@/components/cards/course-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCourses } from "@/hooks/useCourses"
import { useCategories } from "@/hooks/useCategories"
import { cn, scrollToSection, formatDuration } from "@/lib/utils"
import { COURSES, COURSE_CATEGORIES, VENDOR_TO_CATEGORY } from "@/data/courses"
import type { Course as CourseType } from "@/services/api/types"

export function CourseCatalog() {
  const [activeVendor, setActiveVendor] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")

  // Fetch courses and categories from API
  const { data: coursesData, isLoading: coursesLoading } = useCourses()
  const { data: categories, isLoading: categoriesLoading } = useCategories()

  // Use API categories if available, otherwise use static categories
  const allCategories = useMemo(() => {
    if (categories && categories.length > 0) {
      return categories
    }
    // Fallback to static categories
    return COURSE_CATEGORIES.map((cat, index) => ({
      id: index,
      name: cat.name,
      slug: cat.slug,
      description: "",
      color: "#f27a1a",
      icon: "",
    }))
  }, [categories])

  const isLoading = coursesLoading || categoriesLoading

  // Use API data if available, otherwise use static data
  const allCourses = useMemo(() => {
    if (coursesData?.courses && coursesData.courses.length > 0) {
      return coursesData.courses
    }
    // Fallback to static data - convert to CourseType format
    return COURSES.map(course => {
      const category = VENDOR_TO_CATEGORY[course.vendor] || { id: 0, name: course.vendor, slug: course.vendor.toLowerCase(), color: course.color }
      return {
        id: course.id,
        slug: course.slug,
        title: course.title,
        subtitle: course.subtitle,
        thumbnail: null,
        thumbnailAlt: course.title,
        categories: [{ ...category, description: "", icon: "" }],
        level: course.level.toLowerCase() as "beginner" | "intermediate" | "advanced",
        modulesCount: course.modules,
        durationWeeks: parseInt(course.duration) || 1,
        durationLabel: formatDuration(course.duration),
        price: course.price,
        originalPrice: course.originalPrice || null,
        discountPercentage: course.originalPrice ? Math.round((1 - course.price / course.originalPrice) * 100) : 0,
        currency: "USD",
        rating: course.rating,
        reviewCount: course.enrolled,
        isFeatured: course.featured,
      }
    })
  }, [coursesData?.courses])

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Listen for vendor filter events from VendorCards
  useEffect(() => {
    const handleVendorFilter = (e: CustomEvent<string>) => {
      setActiveVendor(e.detail)
    }

    window.addEventListener("vendorFilter", handleVendorFilter as EventListener)

    return () => {
      window.removeEventListener("vendorFilter", handleVendorFilter as EventListener)
    }
  }, [])

  // Filter courses by selected category and search query
  const filteredCourses: CourseType[] = useMemo(() => {
    let courses = [...allCourses]

    // Filter by category
    if (activeVendor !== "All") {
      courses = courses.filter((course) =>
        course.categories.some(cat => cat.slug === activeVendor)
      )
    }

    // Filter by search query
    if (debouncedQuery.trim() !== "") {
      const query = debouncedQuery.toLowerCase()
      courses = courses.filter((course) => {
        // Search in title
        if (course.title.toLowerCase().includes(query)) return true
        // Search in subtitle
        if (course.subtitle.toLowerCase().includes(query)) return true
        // Search in category names
        if (course.categories.some(cat => cat.name.toLowerCase().includes(query))) return true
        return false
      })
    }

    return courses
  }, [allCourses, activeVendor, debouncedQuery])

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("")
    setDebouncedQuery("")
  }

  // Determine empty state message
  const getEmptyMessage = () => {
    if (debouncedQuery.trim() !== "") {
      return `No courses found for "${debouncedQuery}". Try a different search term.`
    }
    return "No courses found for this category."
  }

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

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          {/* Search Input */}
          <div className="relative max-w-md mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
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
            {allCategories?.map((category) => (
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
          </div>
        </motion.div>

        {/* Search Results Count */}
        {!isLoading && (debouncedQuery || activeVendor !== "All") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 text-center"
          >
            <p className="text-sm text-muted-foreground">
              {filteredCourses.length === 0 ? (
                "No courses found"
              ) : (
                <>
                  Showing <span className="font-semibold text-foreground">{filteredCourses.length}</span>{" "}
                  {filteredCourses.length === 1 ? "course" : "courses"}
                  {debouncedQuery && (
                    <> for "<span className="font-semibold text-foreground">{debouncedQuery}</span>"</>
                  )}
                </>
              )}
            </p>
          </motion.div>
        )}

        {/* Course Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">{getEmptyMessage()}</p>
            {(debouncedQuery || activeVendor !== "All") && (
              <div className="flex justify-center gap-3">
                {debouncedQuery && (
                  <Button variant="outline" size="sm" onClick={handleClearSearch}>
                    Clear Search
                  </Button>
                )}
                {activeVendor !== "All" && (
                  <Button variant="outline" size="sm" onClick={() => setActiveVendor("All")}>
                    Show All Courses
                  </Button>
                )}
              </div>
            )}
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection("schedule")}
          >
            View Full Training Calendar
          </Button>
        </motion.div>
      </Container>
    </Section>
  )
}
