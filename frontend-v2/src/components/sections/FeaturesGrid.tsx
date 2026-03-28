"use client";

import { motion } from "framer-motion";
import { 
  GraduationCap, 
  FlaskConical, 
  Award, 
  Clock, 
  Building2, 
  Briefcase 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FEATURES } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const iconMap = {
  "Expert-Led Training": GraduationCap,
  "Hands-On Labs": FlaskConical,
  "Official Certifications": Award,
  "Flexible Learning": Clock,
  "Enterprise Solutions": Building2,
  "Career Support": Briefcase,
} as const;

export function FeaturesGrid() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
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
      className="py-20 md:py-32"
      aria-label="Why choose iTrust Academy"
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
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Your Success is Our Priority
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide comprehensive training solutions designed to accelerate your career growth.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.title as keyof typeof iconMap] || GraduationCap;
            
            return (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="h-full group hover:shadow-md transition-all duration-300 border-border bg-white">
                  <CardContent className="p-6">
                    {/* Icon */}
                    <div className="w-12 h-12 flex items-center justify-center bg-brand-50 border border-brand-100 mb-4 group-hover:bg-brand-100 transition-colors">
                      <Icon className="w-6 h-6 text-brand-500" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
