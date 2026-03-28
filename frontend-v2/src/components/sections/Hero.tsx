"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BRAND_NAME, STATS, VENDORS } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.5 },
    },
  };

  return (
    <section 
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(0.145 0 0) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.145 0 0) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <Badge 
              variant="outline" 
              className="px-4 py-1.5 text-xs font-mono tracking-wider border-brand-500 text-brand-600 bg-brand-50"
            >
              NOW ENROLLING — Q2 2026
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6"
          >
            Advance Your IT Career.{" "}
            <span className="text-brand-500">Get Certified.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed"
          >
            {BRAND_NAME} delivers enterprise-grade IT training with official vendor certifications. 
            Join thousands of professionals who have transformed their careers through our expert-led programs.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Button 
              asChild
              size="lg"
              className="bg-brand-500 hover:bg-brand-600 text-white font-mono group"
            >
              <Link href="#courses">
                Explore SCP Fundamentals
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="font-mono border-foreground/20 hover:bg-foreground/5"
            >
              <Link href="#courses">
                View All Courses
              </Link>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col gap-6"
          >
            {/* Partner Logos */}
            <div className="flex items-center gap-6 flex-wrap">
              <span className="text-sm text-muted-foreground font-mono">Official Partner:</span>
              {VENDORS.map((vendor) => (
                <div 
                  key={vendor.id}
                  className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 border border-border"
                >
                  <div 
                    className="w-2 h-2"
                    style={{ backgroundColor: vendor.color }}
                  />
                  <span className="text-sm font-medium text-foreground">
                    {vendor.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4 border-t border-border">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-bold text-foreground font-mono">
                    {stat.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div 
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px]"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.3 }}
            className="relative w-full h-full"
          >
            {/* Abstract geometric shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 border-2 border-brand-500/20" />
            <div className="absolute top-20 right-20 w-48 h-48 bg-brand-500/5" />
            <div className="absolute bottom-20 right-40 w-32 h-32 border border-brand-500/30" />
            
            {/* Feature icons */}
            <div className="absolute top-10 right-10 p-4 bg-white shadow-lg border border-border">
              <Shield className="w-6 h-6 text-brand-500" />
            </div>
            <div className="absolute top-40 right-32 p-4 bg-white shadow-lg border border-border">
              <Award className="w-6 h-6 text-brand-500" />
            </div>
            <div className="absolute bottom-32 right-16 p-4 bg-white shadow-lg border border-border">
              <Users className="w-6 h-6 text-brand-500" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
