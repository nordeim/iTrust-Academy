import { motion } from "framer-motion"
import { ArrowRight, Play } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 overflow-hidden bg-background">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-brand-50/30" />
      
      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-brand-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-300/5 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Badge variant="default" className="mb-6 gap-2 bg-brand-100 text-brand-700 border-brand-200">
              <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse" />
              Asia-Pacific's Premier IT Training Provider
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-foreground"
          >
            Advance Your{" "}
            <span className="block">IT Career.</span>
            <span className="block">
              Get{" "}
              <span className="text-brand-500 relative">
                Certified.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 4 100 2 198 10" stroke="#f27a1a" strokeWidth="4" strokeLinecap="round" opacity="0.3"/>
                </svg>
              </span>
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-foreground-tertiary max-w-2xl mb-10 leading-relaxed"
          >
            iTrust Academy delivers expert-led, hands-on training across SolarWinds, Securden, Quest, and Ivanti — equipping IT professionals across Asia with the skills and certifications employers demand.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="group">
              Explore SCP Fundamentals
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="group border-2">
              <Play className="mr-2 h-4 w-4" />
              View All Courses
            </Button>
          </motion.div>

          {/* Trust Indicators / Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-border-subtle"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                { number: "4", label: "Technology Vendors" },
                { number: "5+", label: "Training Programs" },
                { number: "Asia-Wide", label: "Training Coverage" },
                { number: "SCP", label: "Certification Prep" },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <p className="text-2xl sm:text-3xl font-bold text-brand-500">{stat.number}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
