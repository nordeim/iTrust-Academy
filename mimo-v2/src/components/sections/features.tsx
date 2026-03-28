import { motion } from "framer-motion"
import { Building2, Users, Award, Clock, Shield, TrendingUp } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { cn } from "@/lib/utils"

const FEATURES = [
  {
    icon: Building2,
    title: "Enterprise-First",
    description: "Training programs designed specifically for organizational needs with customized learning paths and team analytics.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from certified professionals with real-world experience implementing these platforms at scale.",
  },
  {
    icon: Award,
    title: "Official Certifications",
    description: "Prepare for globally recognized certifications across SolarWinds, Securden, Quest, and Ivanti.",
  },
  {
    icon: Clock,
    title: "Flexible Formats",
    description: "Choose from instructor-led, self-paced, or blended learning options to fit your team's schedule.",
  },
  {
    icon: Shield,
    title: "Hands-On Labs",
    description: "Practice in real sandboxed environments with guided exercises mirroring production scenarios.",
  },
  {
    icon: TrendingUp,
    title: "Measurable ROI",
    description: "Track progress with detailed analytics, skill assessments, and ROI reporting for stakeholders.",
  },
]

export function Features() {
  return (
    <Section id="features">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-widest text-primary mb-3"
          >
            Why iTrust Academy
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Built for <span className="text-primary">Enterprise Teams</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Everything your IT team needs to master critical platforms — with the rigor and quality enterprises demand.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={cn(
                  "group relative p-8 border border-border bg-card",
                  "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
                  "transition-all duration-300"
                )}
              >
                {/* Icon */}
                <div className="mb-5 w-12 h-12 flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
