"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, BarChart3, Users, Star } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { cn } from "@/lib/utils";
import type { Course } from "@/data/courses";

interface CourseCardProps {
  course: Course;
  index?: number;
}

/**
 * CourseCard Component
 * Displays course information with hover effects
 * Features sharp corners and accent shadow on hover
 */
export function CourseCard({ course, index = 0 }: CourseCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={`#course-${course.id}`}
        className={cn(
          "group block bg-card border border-border p-6",
          "transition-all duration-300 ease-out",
          "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        )}
        aria-label={`View course: ${course.title}`}
      >
        {/* Header - Category & Featured Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <Badge variant="default" size="sm">
            {course.category}
          </Badge>
          {course.featured && (
            <Badge variant="featured" size="sm">
              Featured
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2 leading-tight">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
          {course.description}
        </p>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
          {/* Duration */}
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-muted-foreground/70" aria-hidden="true" />
            <span className="font-mono">{course.duration}</span>
          </div>
          
          {/* Level */}
          <div className="flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4 text-muted-foreground/70" aria-hidden="true" />
            <span 
              className={cn(
                "font-mono font-medium",
                course.level === "Beginner" && "text-green-600 dark:text-green-400",
                course.level === "Intermediate" && "text-amber-600 dark:text-amber-400",
                course.level === "Advanced" && "text-red-600 dark:text-red-400"
              )}
            >
              {course.level}
            </span>
          </div>
        </div>

        {/* Rating & Students */}
        {(course.rating || course.students) && (
          <div className="flex items-center gap-4 text-sm border-t border-border pt-4">
            {course.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" aria-hidden="true" />
                <span className="font-mono font-medium">{course.rating}</span>
              </div>
            )}
            {course.students && (
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="w-4 h-4" aria-hidden="true" />
                <span className="font-mono">{course.students.toLocaleString()} students</span>
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        {course.tags && course.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {course.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-muted-foreground/70 bg-muted px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.article>
  );
}
