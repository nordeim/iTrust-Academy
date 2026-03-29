import { useState } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { CourseCard } from "@/components/cards/course-card"
import { Button } from "@/components/ui/button"
import { useCourses } from "@/hooks/useCourses"
import { useCategories } from "@/hooks/useCategories"
import { cn, scrollToSection } from "@/lib/utils"
import type { Course as CourseType } from "@/services/api/types"

export function CourseCatalog() {
  const [activeVendor, setActiveVendor] = useState<string>("All")

  // Fetch courses and categories from API
  const { data: coursesData, isLoading: coursesLoading } = useCourses()
  const { data: categories, isLoading: categoriesLoading } = useCategories()

  const isLoading = coursesLoading || categoriesLoading

  // Filter courses by selected category
  const filteredCourses: CourseType[] = activeVendor === "All"
    ? coursesData?.courses ?? []
    : coursesData?.courses.filter((course) =>
        course.categories.some(cat => cat.slug === activeVendor)
      ) ?? []

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

        {/* Category Filter */}
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
          {categories?.map((category) => (
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
              <div key={i} className="h-96 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No courses found for this category.</p>
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
