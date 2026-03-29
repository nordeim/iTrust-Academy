import { motion } from "framer-motion"
import { Calendar, MapPin, Monitor, Clock } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn, scrollToSection } from "@/lib/utils"

const COHORTS = [
  {
    course: "SolarWinds Network Performance Monitor",
    vendor: "SolarWinds",
    startDate: "Apr 14, 2026",
    endDate: "Apr 18, 2026",
    format: "Live Virtual",
    spotsLeft: 4,
    spotsTotal: 20,
    price: "$2,499",
  },
  {
    course: "Securden Privileged Access Management",
    vendor: "Securden",
    startDate: "Apr 21, 2026",
    endDate: "Apr 24, 2026",
    format: "In-Person (Singapore)",
    spotsLeft: 8,
    spotsTotal: 15,
    price: "$2,999",
  },
  {
    course: "Ivanti Endpoint Manager",
    vendor: "Ivanti",
    startDate: "May 5, 2026",
    endDate: "May 8, 2026",
    format: "Live Virtual",
    spotsLeft: 12,
    spotsTotal: 20,
    price: "$2,299",
  },
  {
    course: "Quest TOAD for Oracle",
    vendor: "Quest",
    startDate: "May 12, 2026",
    endDate: "May 14, 2026",
    format: "In-Person (Hong Kong)",
    spotsLeft: 6,
    spotsTotal: 15,
    price: "$1,999",
  },
]

const vendorColors: Record<string, string> = {
  SolarWinds: "#7B8794",
  Securden: "#0EA5E9",
  Quest: "#6366F1",
  Ivanti: "#EC4899",
}

export function TrainingSchedule() {
  return (
    <Section id="schedule">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-widest text-primary mb-3"
          >
            Upcoming Sessions
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Training <span className="text-primary">Calendar</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Secure your team's spot in our upcoming instructor-led training sessions.
          </motion.p>
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {COHORTS.map((cohort, index) => (
            <motion.div
              key={`${cohort.course}-${cohort.startDate}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className={cn(
                "group bg-card border border-border p-6 md:p-8",
                "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
                "transition-all duration-300"
              )}
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* Left: Course Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge
                      size="sm"
                      style={{
                        backgroundColor: `${vendorColors[cohort.vendor]}15`,
                        color: vendorColors[cohort.vendor],
                      }}
                    >
                      {cohort.vendor}
                    </Badge>
                    {cohort.spotsLeft <= 5 && (
                      <Badge variant="danger" size="sm">
                        {cohort.spotsLeft} spots left
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors truncate">
                    {cohort.course}
                  </h3>
                </div>

                {/* Center: Details */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span className="font-mono">{cohort.startDate} – {cohort.endDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {cohort.format.includes("Virtual") ? (
                      <Monitor className="w-4 h-4" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                    <span>{cohort.format}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span className="font-mono">5 days</span>
                  </div>
                </div>

                {/* Right: Price & CTA */}
                <div className="flex items-center gap-6 lg:shrink-0">
                  <div className="text-right">
                    <div className="text-2xl font-bold">{cohort.price}</div>
                    <div className="text-xs text-muted-foreground">per person</div>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => scrollToSection("courses")}
                  >
                    Enroll Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => scrollToSection("contact")}
          >
            View Full Training Calendar
          </Button>
        </motion.div>
      </Container>
    </Section>
  )
}
