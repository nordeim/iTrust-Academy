"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Users, 
  Award, 
  Clock, 
  Globe2, 
  TrendingUp,
  BookOpen,
  Shield
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FeatureCard } from "@/components/cards/FeatureCard";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

/**
 * Features Section
 * Value proposition grid showcasing platform advantages
 * Differentiates iTrust Academy from competitors
 */
export function Features() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section id="solutions" background="muted">
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
            Why Enterprises{" "}
            <span className="text-primary">Choose Us</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Built for scale, designed for impact. Discover what sets iTrust Academy 
            apart as the region&apos;s leading enterprise IT training provider.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

// Feature data
const FEATURES = [
  {
    icon: Building2,
    title: "Enterprise-First Approach",
    description: "Training programs designed specifically for organizational needs with customized learning paths, team analytics, and dedicated support.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from certified professionals with 10+ years of real-world experience at leading technology companies across the globe.",
  },
  {
    icon: Award,
    title: "Industry Certifications",
    description: "Prepare for AWS, Azure, Google Cloud, CISSP, PMP, and 50+ globally recognized certifications with guaranteed results.",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Choose from self-paced, instructor-led live, or blended learning options. On-site training available for teams of 10+.",
  },
  {
    icon: Globe2,
    title: "Asia-Pacific Focus",
    description: "Training delivered across the region with local language support, regional compliance considerations, and timezone-friendly schedules.",
  },
  {
    icon: TrendingUp,
    title: "Measurable Results",
    description: "Track progress with detailed analytics, skill assessments, and ROI reporting. Average 40% improvement in team productivity.",
  },
  {
    icon: BookOpen,
    title: "Comprehensive Curriculum",
    description: "200+ courses covering cloud, security, data, development, and management. Continuous updates reflecting industry trends.",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "Satisfaction guarantee with free retakes. 98% pass rate on certification exams with our structured preparation programs.",
  },
];
