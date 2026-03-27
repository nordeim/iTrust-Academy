"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * Stats Section
 * Trust signals with animated statistics
 * Demonstrates scale and credibility
 */
export function Stats() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-16 md:py-20 bg-muted/30 border-y border-border">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: prefersReducedMotion ? 0 : 0.5, 
                delay: index * 0.1 
              }}
              className="text-center"
            >
              <div 
                className={cn(
                  "text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2",
                  "font-mono tabular-nums"
                )}
              >
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// Statistics data
const STATS = [
  { 
    value: "50,000+", 
    label: "Professionals Trained" 
  },
  { 
    value: "500+", 
    label: "Enterprise Clients" 
  },
  { 
    value: "200+", 
    label: "Expert Instructors" 
  },
  { 
    value: "98%", 
    label: "Satisfaction Rate" 
  },
];
