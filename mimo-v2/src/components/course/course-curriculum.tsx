// ═══════════════════════════════════════════════════════════
// Course Curriculum Component - Module list with descriptions
// ═══════════════════════════════════════════════════════════

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Clock, BookOpen } from "lucide-react"
import type { CurriculumModule } from "@/data/courses"

interface CourseCurriculumProps {
  modules: CurriculumModule[]
  color: string
}

function ModuleItem({ module, index, color }: { module: CurriculumModule; index: number; color: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div
            className="w-8 h-8 flex items-center justify-center rounded-full text-white font-mono text-sm"
            style={{ backgroundColor: color }}
          >
            {index + 1}
          </div>
          <div>
            <h4 className="font-medium">{module.title}</h4>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {module.duration}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" />
                {module.topics.length} topics
              </span>
            </div>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 border-t border-border">
              <ul className="mt-4 space-y-2">
                {module.topics.map((topic, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function CourseCurriculum({ modules, color }: CourseCurriculumProps) {
  const totalDuration = modules.reduce((acc, m) => {
    const hours = parseInt(m.duration) || 0
    return acc + hours
  }, 0)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold">Course Curriculum</h3>
          <p className="text-muted-foreground mt-1">
            {modules.length} modules • {totalDuration} hours of content
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {modules.map((module, index) => (
          <ModuleItem key={index} module={module} index={index} color={color} />
        ))}
      </div>
    </div>
  )
}
