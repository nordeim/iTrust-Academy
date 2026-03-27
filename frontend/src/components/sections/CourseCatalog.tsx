"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CourseCard } from "@/components/cards/CourseCard";
import { Button } from "@/components/common/Button";
import { COURSES, COURSE_CATEGORIES, type CourseCategory } from "@/data/courses";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * CourseCatalog Section
 * Featured courses with category filtering
 * Interactive tab-style category selector
 */
export function CourseCatalog() {
  const [activeCategory, setActiveCategory] = useState<CourseCategory>("All");
  const prefersReducedMotion = useReducedMotion();

  const filteredCourses = activeCategory === "All"
    ? COURSES
    : COURSES.filter((course) => course.category === activeCategory);

  return (
    <Section id="courses" background="default">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Industry-Leading{" "}
            <span className="text-primary">Courses</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Comprehensive training programs designed by industry experts 
            for enterprise teams seeking excellence.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
          role="tablist"
          aria-label="Course categories"
        >
          {COURSE_CATEGORIES.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              aria-controls={`courses-panel-${category}`}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 font-mono text-sm font-medium transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Course Grid */}
        <div 
          id={`courses-panel-${activeCategory}`}
          role="tabpanel"
          aria-label={`${activeCategory} courses`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg">
            View All Courses
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
