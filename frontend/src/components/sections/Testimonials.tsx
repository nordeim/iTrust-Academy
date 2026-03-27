"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * Testimonials Section
 * Social proof from enterprise clients
 * Builds trust and credibility
 */
export function Testimonials() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section id="about" background="default">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Trusted by{" "}
            <span className="text-primary">Industry Leaders</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            See what enterprise leaders across Asia say about their transformation 
            journey with iTrust Academy.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.author}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              company={testimonial.company}
              index={index}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

// Testimonials data
const TESTIMONIALS = [
  {
    quote: "iTrust Academy transformed our cloud capabilities. Their AWS training program helped us achieve 40% reduction in infrastructure costs while improving reliability and team confidence.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechCorp Singapore",
  },
  {
    quote: "The cybersecurity program was exceptional. Our team now has the skills and certifications needed to protect our organization from evolving threats. Highly recommended for any financial institution.",
    author: "Michael Tan",
    role: "CISO",
    company: "Asian Financial Group",
  },
  {
    quote: "Outstanding ROI. The DevOps training enabled our teams to deploy 5x faster with significantly fewer incidents. The instructors truly understand enterprise challenges.",
    author: "Jennifer Wong",
    role: "VP Engineering",
    company: "Global Retail Solutions",
  },
  {
    quote: "We&apos;ve trained over 200 engineers through iTrust Academy. The quality and consistency of their programs is unmatched in the region. They understand what enterprises need.",
    author: "David Kim",
    role: "Director of Engineering",
    company: "Samsung Electronics",
  },
  {
    quote: "The AI/ML program was exactly what we needed. Practical, hands-on training that our data scientists could immediately apply to production systems.",
    author: "Lisa Ng",
    role: "Head of Data Science",
    company: "DBS Bank",
  },
  {
    quote: "Exceptional project management training that helped our teams deliver on time and within budget. The PMP preparation course had a 100% pass rate for our participants.",
    author: "Robert Lim",
    role: "PMO Director",
    company: "Singtel",
  },
];
