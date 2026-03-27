"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/common/Button";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * CTA Section
 * Final call-to-action before footer
 * Prominent design with brand color background
 */
export function CTA() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary" aria-hidden="true" />
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6"
          >
            Ready to Transform Your Team?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-primary-foreground/90 mb-10"
          >
            Join 500+ enterprises across Asia who have elevated their workforce 
            with iTrust Academy&apos;s industry-leading training programs.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 hover:shadow-lg"
            >
              Request Corporate Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
            >
              Contact Sales
            </Button>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.3 }}
            className="mt-10 pt-10 border-t border-white/20"
          >
            <p className="font-mono text-sm text-primary-foreground/70 uppercase tracking-wider">
              No credit card required • Free consultation • Custom solutions
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
