"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * Hero Section
 * Primary value proposition with animated elements
 * Features gradient background and trust indicators
 */
export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const animationConfig = {
    fadeInUp: {
      initial: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
      animate: { opacity: 1, y: 0 },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem]"
        aria-hidden="true"
      />
      
      {/* Gradient Orbs - Subtle background depth */}
      <div 
        className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/15 rounded-full blur-[100px] opacity-40"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-1/4 -left-1/4 w-1/3 h-1/3 bg-primary/10 rounded-full blur-[80px] opacity-50"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            {...animationConfig.fadeInUp}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0 }}
          >
            <Badge variant="default" size="lg" className="mb-6">
              Enterprise IT Training Excellence
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...animationConfig.fadeInUp}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            Transform Your Team with{" "}
            <span className="text-primary relative inline-block">
              Enterprise-Grade
              <span 
                className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30"
                aria-hidden="true"
              />
            </span>{" "}
            IT Training
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...animationConfig.fadeInUp}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed"
          >
            Equip your workforce with cutting-edge skills in cloud, cybersecurity, 
            AI/ML, and DevOps. Trusted by <span className="font-semibold text-foreground">500+ enterprises</span> across Asia.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            {...animationConfig.fadeInUp}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg">
              Explore Courses
            </Button>
            <Button variant="outline" size="lg">
              Request Demo
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            {...animationConfig.fadeInUp}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-border/50"
          >
            <p className="text-sm text-muted-foreground mb-4 font-mono uppercase tracking-wider">
              Trusted by industry leaders
            </p>
            <div className="flex flex-wrap items-center gap-8 md:gap-12">
              {TRUSTED_PARTNERS.map((partner) => (
                <span 
                  key={partner} 
                  className="font-mono text-sm font-medium text-muted-foreground/60 hover:text-foreground transition-colors"
                >
                  {partner}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

// Trusted partners for social proof
const TRUSTED_PARTNERS = [
  "Samsung",
  "DBS Bank",
  "Singtel",
  "Grab",
  "OCBC",
];
