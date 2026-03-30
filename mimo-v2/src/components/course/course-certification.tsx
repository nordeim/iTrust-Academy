// ═══════════════════════════════════════════════════════════
// Course Certification Component - Certification information
// ═══════════════════════════════════════════════════════════

import { motion } from "framer-motion"
import { Award, CheckCircle, Clock, FileText } from "lucide-react"
import type { Certification } from "@/data/courses"

interface CourseCertificationProps {
  certification: Certification
  vendorColor: string
}

export function CourseCertification({ certification, vendorColor }: CourseCertificationProps) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-6">Certification Path</h3>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-brand-50 to-white dark:from-brand-900/20 dark:to-slate-900 border border-brand-200 dark:border-brand-800 rounded-xl p-6"
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${vendorColor}20` }}
          >
            <Award className="w-8 h-8" style={{ color: vendorColor }} />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h4 className="text-xl font-bold mb-2">{certification.name}</h4>
            <p className="text-muted-foreground mb-4">
              Provided by <span className="font-medium text-foreground">{certification.provider}</span>
            </p>

            {/* Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {certification.examCode && (
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-brand-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Exam Code</p>
                    <p className="font-mono text-sm">{certification.examCode}</p>
                  </div>
                </div>
              )}
              {certification.passingScore && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Passing Score</p>
                    <p className="font-mono text-sm">{certification.passingScore}</p>
                  </div>
                </div>
              )}
              {certification.validity && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Validity</p>
                    <p className="font-mono text-sm">{certification.validity}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-6 pt-6 border-t border-brand-200 dark:border-brand-800">
          <h5 className="font-semibold mb-3">Certification Benefits:</h5>
          <ul className="grid md:grid-cols-2 gap-3">
            {[
              "Industry-recognized credential",
              "Enhanced career opportunities",
              "Access to vendor resources",
              "Professional community membership",
            ].map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
