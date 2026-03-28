import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { VENDORS } from "@/data/courses"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

export function VendorCards() {
  return (
    <Section id="solutions" background="muted">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-widest text-primary mb-3"
          >
            Platform Partners
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Training Across <span className="text-primary">Top Platforms</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Authorized training programs for the IT platforms that power modern enterprises.
          </motion.p>
        </div>

        {/* Vendor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VENDORS.map((vendor, index) => (
            <motion.a
              key={vendor.id}
              href={`#courses`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={cn(
                "group relative bg-card border border-border p-8 overflow-hidden",
                "hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              )}
            >
              {/* Accent color bar */}
              <div
                className="absolute top-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-2"
                style={{ backgroundColor: vendor.color }}
              />

              {/* Logo area */}
              <div
                className="w-16 h-16 flex items-center justify-center mb-6 text-white font-bold text-2xl font-mono"
                style={{ backgroundColor: vendor.color }}
              >
                {vendor.name[0]}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {vendor.name}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {vendor.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  {vendor.courses} courses
                </span>
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </Section>
  )
}
