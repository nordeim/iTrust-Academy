"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Settings, 
  Users, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const services = [
  {
    icon: Building2,
    title: "Enterprise Training",
    description: "Customized training programs designed for your organization's specific needs. Scale your team's skills efficiently.",
    features: [
      "Custom curriculum development",
      "On-site or virtual delivery",
      "Progress tracking & reporting",
      "Volume discounts available",
    ],
  },
  {
    icon: Settings,
    title: "Implementation Consulting",
    description: "Expert guidance for deploying and optimizing IT management solutions in your environment.",
    features: [
      "Architecture design",
      "Best practices setup",
      "Performance optimization",
      "Knowledge transfer",
    ],
  },
  {
    icon: Users,
    title: "Team Assessment",
    description: "Evaluate your team's current skills and identify gaps. Create a roadmap for professional development.",
    features: [
      "Skills gap analysis",
      "Certification roadmaps",
      "Learning path recommendations",
      "Progress milestones",
    ],
  },
];

export function ProfessionalServices() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
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
      id="solutions"
      className="py-20 md:py-32 bg-muted/30"
      aria-label="Professional services"
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
            For Enterprises
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Professional Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Beyond training, we offer comprehensive solutions to help your organization succeed.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            
            return (
              <motion.div key={service.title} variants={itemVariants}>
                <Card className="h-full border-border bg-white hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    {/* Icon */}
                    <div className="w-14 h-14 flex items-center justify-center bg-brand-500 mb-6">
                      <Icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li 
                          key={feature} 
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button 
                      variant="outline" 
                      className="w-full font-mono border-border hover:bg-muted group"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <Card className="inline-block border-brand-500 bg-brand-50">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    Need a Custom Solution?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Our team will work with you to design the perfect training program.
                  </p>
                </div>
                <Button className="bg-brand-500 hover:bg-brand-600 text-white font-mono whitespace-nowrap">
                  Contact Sales
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
