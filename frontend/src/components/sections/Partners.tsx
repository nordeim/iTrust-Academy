"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * Partners Section
 * Authorized training partner badges and certifications
 * Establishes credibility and trust
 */
export function Partners() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-12 md:py-16 bg-muted/30 border-y border-border">
      <Container>
        {/* Section Label */}
        <motion.p
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.4 }}
          className="text-center text-sm text-muted-foreground font-mono uppercase tracking-widest mb-8"
        >
          Authorized Training Partner
        </motion.p>

        {/* Partners Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {PARTNERS.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: prefersReducedMotion ? 0 : 0.4, 
                delay: index * 0.05 
              }}
              className="group"
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <span 
                  className="font-mono text-sm font-medium text-muted-foreground/70 
                             group-hover:text-foreground transition-colors duration-200"
                >
                  {partner.name}
                </span>
                {partner.badge && (
                  <span 
                    className="text-xs font-mono text-primary/60 group-hover:text-primary 
                               transition-colors duration-200"
                  >
                    {partner.badge}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// Partners data
const PARTNERS = [
  { name: "AWS", badge: "Advanced Partner" },
  { name: "Microsoft", badge: "Gold Partner" },
  { name: "Google Cloud", badge: "Partner" },
  { name: "Cisco", badge: "Authorized" },
  { name: "PMI", badge: "ATP" },
  { name: "(ISC)²", badge: "Official" },
  { name: "CompTIA", badge: "Partner" },
];
