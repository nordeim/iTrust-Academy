// ═══════════════════════════════════════════════════════════
// Home Page - Landing page with all sections
// ═══════════════════════════════════════════════════════════

import { Hero } from "@/components/sections/hero"
import { Stats } from "@/components/sections/stats"
import { VendorCards } from "@/components/sections/vendor-cards"
import { CourseCatalog } from "@/components/sections/course-catalog"
import { Features } from "@/components/sections/features"
import { TrainingSchedule } from "@/components/sections/training-schedule"
import { ProfessionalServices } from "@/components/sections/professional-services"
import { Testimonials } from "@/components/sections/testimonials"
import { CTA } from "@/components/sections/cta"

export function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <VendorCards />
      <CourseCatalog />
      <Features />
      <TrainingSchedule />
      <ProfessionalServices />
      <Testimonials />
      <CTA />
    </>
  )
}
