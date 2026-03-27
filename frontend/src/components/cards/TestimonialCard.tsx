"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  index?: number;
}

/**
 * TestimonialCard Component
 * Displays customer testimonial with quote styling
 * Sharp corners with subtle hover effect
 */
export function TestimonialCard({ 
  quote, 
  author, 
  role, 
  company, 
  index = 0 
}: TestimonialCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "relative p-8 border border-border bg-card",
        "transition-all duration-300 ease-out",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
      )}
    >
      {/* Quote Icon */}
      <Quote 
        className="w-10 h-10 text-primary/20 mb-4" 
        aria-hidden="true" 
      />

      {/* Quote Text */}
      <blockquote className="text-lg leading-relaxed mb-6 text-foreground/90">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center gap-4">
        {/* Avatar Placeholder */}
        <div 
          className="w-12 h-12 bg-primary/10 flex items-center justify-center flex-shrink-0"
          aria-hidden="true"
        >
          <span className="text-primary font-bold font-mono text-lg">
            {author.split(" ").map(n => n[0]).join("")}
          </span>
        </div>
        
        {/* Name & Role */}
        <div>
          <div className="font-semibold text-foreground">{author}</div>
          <div className="text-sm text-muted-foreground">
            {role}, {company}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
