// ═══════════════════════════════════════════════════════════
// Course Instructor Component - Instructor profile
// ═══════════════════════════════════════════════════════════

import { motion } from "framer-motion"
import { Award, Briefcase, CheckCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Instructor } from "@/data/courses"

interface CourseInstructorProps {
  instructor: Instructor
}

export function CourseInstructor({ instructor }: CourseInstructorProps) {
  // Generate initials for avatar
  const initials = instructor.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div>
      <h3 className="text-xl font-bold mb-6">Meet Your Instructor</h3>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar */}
          <div className="shrink-0">
            <div className="w-24 h-24 rounded-full bg-brand-100 dark:bg-brand-900/20 flex items-center justify-center text-2xl font-bold text-brand-600">
              {initials}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h4 className="text-xl font-bold">{instructor.name}</h4>
            <p className="text-brand-600 font-medium mb-4">{instructor.title}</p>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              {instructor.bio}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-brand-500" />
                <span className="font-mono">{instructor.experience} experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-brand-500" />
                <span className="font-mono">{instructor.certifications.length} certifications</span>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h5 className="font-semibold mb-3">Certifications:</h5>
              <div className="flex flex-wrap gap-2">
                {instructor.certifications.map((cert, index) => (
                  <Badge key={index} variant="outline" className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
