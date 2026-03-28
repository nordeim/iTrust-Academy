import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"

const STATS = [
  { value: "15,000+", label: "Professionals Trained" },
  { value: "500+", label: "Enterprise Clients" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "4", label: "Platform Partners" },
]

export function Stats() {
  return (
    <section className="py-16 md:py-20 bg-muted/30 border-y border-border">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2 font-mono tabular-nums">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}
