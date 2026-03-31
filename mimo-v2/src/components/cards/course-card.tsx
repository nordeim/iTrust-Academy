import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Clock, BarChart3, Users, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { formatPrice } from "@/lib/utils"
import type { Course } from "@/services/api/types"

interface CourseCardProps {
  course: Course
  index?: number
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  // Get primary category color
  const primaryCategory = course.categories[0]
  const color = primaryCategory?.color || "#f27a1a"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        to={`/courses/${course.slug}`}
        className={cn(
          "group block bg-white border border-border overflow-hidden rounded-xl",
          "transition-all duration-300 ease-out",
          "hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 hover:-translate-y-1",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        )}
      >
        {/* Color accent bar */}
        <div className="h-1.5" style={{ backgroundColor: color }} />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex gap-2 flex-wrap">
              {course.categories.length > 0 && (
                <Badge
                  size="sm"
                  className="rounded-full"
                  style={{ backgroundColor: `${color}15`, color: color, borderColor: `${color}30` }}
                >
                  {course.categories[0].name}
                </Badge>
              )}
              <Badge variant="outline" size="sm" className="rounded-full">
                {course.level}
              </Badge>
            </div>
            {course.isFeatured && (
              <Badge size="sm" className="shrink-0 rounded-full bg-brand-100 text-brand-700 border-brand-200">
                Featured
              </Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-brand-600 transition-colors line-clamp-2">
            {course.title}
          </h3>

          {/* Subtitle */}
          <p className="text-sm text-brand-600 mb-2 font-medium">
            {course.subtitle}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-mono">{course.durationLabel || `${course.durationWeeks} weeks`}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5" />
              <span className="font-mono">{course.modulesCount} modules</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-mono">{course.rating}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <span className="text-xl font-bold text-foreground">
                {formatPrice(course.price)}
              </span>
              {course.originalPrice && (
                <span className="ml-2 text-sm text-muted-foreground line-through">
                  {formatPrice(course.originalPrice)}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              <span className="font-mono">{course.reviewCount.toLocaleString()}</span>
            </div>
          </div>

          {/* Tags */}
          {course.categories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {course.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
