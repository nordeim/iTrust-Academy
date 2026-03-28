import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { cn } from "@/lib/utils"

const TESTIMONIALS = [
  {
    quote: "iTrust Academy's SolarWinds NPM training transformed our network monitoring capabilities. Our team reduced mean time to resolution by 60% within the first quarter.",
    author: "Sarah Chen",
    role: "VP of Infrastructure",
    company: "Regional Banking Group",
    initials: "SC",
  },
  {
    quote: "The Securden PAM program was exactly what our security team needed. Hands-on labs that mirror our production environment made the difference.",
    author: "Michael Tan",
    role: "CISO",
    company: "Healthcare Systems Asia",
    initials: "MT",
  },
  {
    quote: "Outstanding ROI. The Ivanti EPM training enabled our desktop team to automate patching across 10,000 endpoints. Best training investment we've made.",
    author: "Jennifer Wong",
    role: "IT Director",
    company: "Manufacturing Corp",
    initials: "JW",
  },
]

export function Testimonials() {
  return (
    <Section id="about" background="muted">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-widest text-primary mb-3"
          >
            Client Success
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Trusted by <span className="text-primary">Industry Leaders</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            See how enterprise teams across Asia-Pacific have transformed their IT capabilities.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={cn(
                "relative p-8 border border-border bg-card",
                "hover:border-primary/30 transition-all duration-300"
              )}
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-primary/15 mb-6" />

              {/* Quote Text */}
              <blockquote className="text-base leading-relaxed mb-8 text-foreground/90">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold font-mono text-sm">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.author}</div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
