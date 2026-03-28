import { motion } from "framer-motion"
import { Briefcase, GraduationCap, Headphones, FileCheck } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const SERVICES = [
  {
    icon: Briefcase,
    title: "Corporate Training",
    description: "Customized training programs tailored to your organization's specific platform deployments and team skill gaps.",
  },
  {
    icon: GraduationCap,
    title: "Certification Bootcamps",
    description: "Intensive multi-day programs designed to prepare your team for official vendor certifications with hands-on exam prep.",
  },
  {
    icon: Headphones,
    title: "Managed Learning",
    description: "End-to-end training management including scheduling, enrollment tracking, progress reporting, and ROI measurement.",
  },
  {
    icon: FileCheck,
    title: "Skills Assessment",
    description: "Comprehensive skill gap analysis and competency mapping to build targeted learning paths for your IT teams.",
  },
]

export function ProfessionalServices() {
  return (
    <Section background="dark">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Header */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-mono uppercase tracking-widest text-primary mb-3"
            >
              Professional Services
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              Beyond Standard <span className="text-primary">Training</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-lg text-white/60 leading-relaxed mb-8"
            >
              We partner with your organization to deliver comprehensive learning solutions
              that drive measurable business outcomes across your IT operations.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button size="lg" className="group">
                Schedule Consultation
              </Button>
            </motion.div>
          </div>

          {/* Right: Service Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {SERVICES.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={cn(
                    "p-6 border border-white/10 bg-white/5",
                    "hover:border-primary/50 hover:bg-white/10",
                    "transition-all duration-300 group"
                  )}
                >
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </Container>
    </Section>
  )
}
