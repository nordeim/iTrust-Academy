"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

/**
 * FeatureCard Component
 * Displays a single feature with icon, title, and description
 * Sharp corners with subtle hover effects
 */
export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  index = 0 
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "group relative p-6 border border-border bg-card",
        "transition-all duration-300 ease-out",
        "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
      )}
    >
      {/* Icon Container */}
      <div 
        className={cn(
          "w-12 h-12 flex items-center justify-center mb-5",
          "bg-primary/10 text-primary",
          "transition-transform duration-300 group-hover:scale-110"
        )}
      >
        <Icon className="w-6 h-6" aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors duration-200">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
