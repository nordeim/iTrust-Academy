// ═══════════════════════════════════════════════════════════
// Related Courses Component - Shows related courses
// ═══════════════════════════════════════════════════════════

import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Clock, Star, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { COURSES } from "@/data/courses"
import type { Course } from "@/data/courses"

interface RelatedCoursesProps {
  currentCourse: Course
  limit?: number
}

export function RelatedCourses({ currentCourse, limit = 3 }: RelatedCoursesProps) {
  // Find related courses (same vendor, excluding current course)
  const relatedCourses = COURSES
    .filter((c) => c.vendor === currentCourse.vendor && c.id !== currentCourse.id)
    .slice(0, limit)

  // If not enough same-vendor courses, add other courses
  const otherCourses = COURSES
    .filter((c) => c.vendor !== currentCourse.vendor && c.id !== currentCourse.id)
    .slice(0, limit - relatedCourses.length)

  const courses = [...relatedCourses, ...otherCourses].slice(0, limit)

  if (courses.length === 0) {
    return null
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-6">Related Courses</h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <Link
              to={`/courses/${course.slug}`}
              className="group block bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all"
            >
              {/* Color bar */}
              <div className="h-1" style={{ backgroundColor: course.color }} />

              <div className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <Badge
                    size="sm"
                    className="rounded-full"
                    style={{ backgroundColor: `${course.color}15`, color: course.color, borderColor: `${course.color}30` }}
                  >
                    {course.vendor}
                  </Badge>
                  <Badge variant="outline" size="sm" className="rounded-full">
                    {course.level}
                  </Badge>
                </div>

                {/* Title */}
                <h4 className="font-bold mb-2 group-hover:text-brand-600 transition-colors line-clamp-2">
                  {course.title}
                </h4>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {course.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {course.enrolled.toLocaleString()}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold">{formatPrice(course.price)}</span>
                  {course.originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(course.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
