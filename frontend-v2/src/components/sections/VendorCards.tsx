"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VENDORS } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function VendorCards() {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.5 },
    },
  };

  return (
    <section 
      id="vendors"
      className="py-20 md:py-32 bg-muted/30"
      aria-label="Our vendor partners"
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
            Authorized Training Partner
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Learn from Industry Leaders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Official training programs from the world&apos;s leading IT management and security vendors.
          </p>
        </motion.div>

        {/* Vendor Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {VENDORS.map((vendor) => (
            <motion.div key={vendor.id} variants={cardVariants}>
              <Card className="h-full group hover:shadow-lg transition-all duration-300 border-0 bg-white overflow-hidden">
                {/* Color accent bar */}
                <div 
                  className="h-1.5 w-full transition-all duration-300 group-hover:h-2"
                  style={{ backgroundColor: vendor.color }}
                />
                
                <CardContent className="p-6">
                  {/* Vendor Logo Placeholder */}
                  <div 
                    className="w-12 h-12 flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${vendor.color}15` }}
                  >
                    <span 
                      className="text-xl font-bold"
                      style={{ color: vendor.color }}
                    >
                      {vendor.name.charAt(0)}
                    </span>
                  </div>

                  {/* Vendor Name */}
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {vendor.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {vendor.description}
                  </p>

                  {/* Course Count */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono text-muted-foreground">
                      {vendor.courses} courses
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="font-mono text-xs group-hover:bg-transparent p-0 h-auto"
                      style={{ color: vendor.color }}
                    >
                      View Courses
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
