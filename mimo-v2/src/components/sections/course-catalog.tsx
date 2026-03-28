import { useState } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { CourseCard } from "@/components/cards/course-card"
import { Button } from "@/components/ui/button"
import { COURSES, COURSE_CATEGORIES } from "@/data/courses"
import { cn } from "@/lib/utils"

export function CourseCatalog() {
  const [activeVendor, setActiveVendor] = useState<string>("All")

  const filteredCourses = activeVendor === "All"
    ? COURSES
    : COURSES.filter((course) => course.vendor === activeVendor)

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
          {COURSE_CATEGORIES.map((vendor) => (
            <button
              key={vendor}
              onClick={() => setActiveVendor(vendor)}
              className={cn(
                "px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer",
                activeVendor === vendor
                  ? "bg-primary text-white shadow-sm"
                  : "bg-muted hover:bg-muted/80 text-foreground/70 hover:text-foreground"
              )}
            >
              {vendor}
            </button>
          ))}
        </motion.div>

        {/* Course Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </motion.div>

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
