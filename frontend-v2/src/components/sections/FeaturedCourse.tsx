"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, BarChart3, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { COURSES, VENDORS } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function FeaturedCourse() {
  const prefersReducedMotion = useReducedMotion();
  const featuredCourse = COURSES[0]; // SCP Fundamentals
  const vendor = VENDORS.find((v) => v.id === featuredCourse.vendor);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.6 },
    },
  };

  const discount = featuredCourse.originalPrice 
    ? Math.round((1 - featuredCourse.price / featuredCourse.originalPrice) * 100)
    : 0;

  return (
    <section 
      id="courses"
      className="py-20 md:py-32 bg-muted/30"
      aria-label="Featured course"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-sm font-mono text-brand-500 tracking-wider uppercase mb-4 block">
            Featured Program
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Start Your Certification Journey
          </h2>
        </motion.div>

        {/* Featured Course Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card className="overflow-hidden border-0 bg-white shadow-lg">
            <div className="grid lg:grid-cols-2">
              {/* Left Side - Course Info */}
              <CardContent className="p-8 lg:p-12">
                {/* Vendor Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <Badge 
                    variant="outline"
                    className="font-mono text-xs"
                    style={{ 
                      borderColor: vendor?.color,
                      color: vendor?.color,
                      backgroundColor: `${vendor?.color}10`
                    }}
                  >
                    {vendor?.name}
                  </Badge>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {featuredCourse.level}
                  </Badge>
                </div>

                {/* Course Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {featuredCourse.title}
                </h3>
                <p className="text-muted-foreground font-mono text-sm mb-6">
                  {featuredCourse.subtitle}
                </p>

                {/* Description */}
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {featuredCourse.description}
                </p>

                {/* Course Meta */}
                <div className="flex flex-wrap gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-mono text-muted-foreground">
                      {featuredCourse.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-mono text-muted-foreground">
                      {featuredCourse.level}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {featuredCourse.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 flex items-center justify-center bg-brand-500">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Mobile Price & CTA */}
                <div className="lg:hidden">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-3xl font-bold text-foreground font-mono">
                      ${featuredCourse.price.toLocaleString()}
                    </span>
                    {featuredCourse.originalPrice && (
                      <>
                        <span className="text-lg text-muted-foreground line-through font-mono">
                          ${featuredCourse.originalPrice.toLocaleString()}
                        </span>
                        <Badge className="bg-brand-500 text-white font-mono text-xs">
                          Save {discount}%
                        </Badge>
                      </>
                    )}
                  </div>
                  <Button 
                    className="w-full bg-brand-500 hover:bg-brand-600 text-white font-mono"
                    size="lg"
                  >
                    Enroll Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>

              {/* Right Side - Pricing Card (Desktop) */}
              <CardContent className="p-8 lg:p-12 bg-muted/50 hidden lg:flex flex-col justify-center">
                <div className="max-w-sm mx-auto">
                  {/* Price */}
                  <div className="text-center mb-8">
                    <p className="text-sm font-mono text-muted-foreground mb-2">
                      Course Investment
                    </p>
                    <div className="flex items-baseline justify-center gap-3 mb-2">
                      <span className="text-5xl font-bold text-foreground font-mono">
                        ${featuredCourse.price.toLocaleString()}
                      </span>
                    </div>
                    {featuredCourse.originalPrice && (
                      <div className="flex items-center justify-center gap-3">
                        <span className="text-lg text-muted-foreground line-through font-mono">
                          ${featuredCourse.originalPrice.toLocaleString()}
                        </span>
                        <Badge className="bg-brand-500 text-white font-mono">
                          Save {discount}%
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* What's Included */}
                  <div className="mb-8">
                    <p className="text-sm font-medium text-foreground mb-4">
                      What&apos;s included:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-brand-500" />
                        Official course materials
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-brand-500" />
                        Hands-on lab access
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-brand-500" />
                        Certification exam voucher
                      </li>
                      <li className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-brand-500" />
                        30-day post-course support
                      </li>
                    </ul>
                  </div>

                  {/* CTA */}
                  <Button 
                    className="w-full bg-brand-500 hover:bg-brand-600 text-white font-mono"
                    size="lg"
                  >
                    Enroll Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-4 font-mono">
                    Next cohort starts April 7, 2026
                  </p>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
