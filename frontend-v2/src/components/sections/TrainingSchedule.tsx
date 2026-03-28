"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SCHEDULE, VENDORS } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function TrainingSchedule() {
  const prefersReducedMotion = useReducedMotion();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric" 
    });
  };

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
      id="schedule"
      className="py-20 md:py-32"
      aria-label="Upcoming training schedule"
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
            Training Calendar
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Upcoming Cohorts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Secure your spot in our upcoming training sessions. Limited seats available.
          </p>
        </motion.div>

        {/* Schedule Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {SCHEDULE.map((item, index) => {
            const vendor = VENDORS.find((v) => v.id === item.vendor);
            
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden border-border hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row md:items-center">
                      {/* Color accent */}
                      <div 
                        className="hidden md:block w-1.5 h-full min-h-[100px]"
                        style={{ backgroundColor: vendor?.color }}
                      />
                      
                      {/* Mobile color bar */}
                      <div 
                        className="md:hidden h-1.5 w-full"
                        style={{ backgroundColor: vendor?.color }}
                      />

                      <div className="flex-1 p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                          {/* Course Name */}
                          <div className="lg:w-1/3">
                            <div className="flex items-center gap-2 mb-1">
                              <span 
                                className="text-xs font-mono font-medium"
                                style={{ color: vendor?.color }}
                              >
                                {vendor?.name}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground">
                              {item.course}
                            </h3>
                          </div>

                          {/* Date */}
                          <div className="lg:w-1/4 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm font-mono text-muted-foreground">
                              {formatDate(item.startDate)} - {formatDate(item.endDate)}, 2026
                            </span>
                          </div>

                          {/* Format & Location */}
                          <div className="lg:w-1/4 flex flex-wrap items-center gap-3">
                            <Badge 
                              variant="outline" 
                              className="font-mono text-xs"
                            >
                              {item.format}
                            </Badge>
                            {item.location && (
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                <span className="font-mono">{item.location}</span>
                              </div>
                            )}
                          </div>

                          {/* Spots & Status */}
                          <div className="lg:w-1/4 flex items-center justify-between lg:justify-end gap-4">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm font-mono text-muted-foreground">
                                {item.spots} spots
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge 
                                className={`font-mono text-xs ${
                                  item.status === "limited" 
                                    ? "bg-amber-500 hover:bg-amber-600" 
                                    : "bg-brand-500 hover:bg-brand-600"
                                } text-white`}
                              >
                                {item.status === "limited" ? "Limited" : "Enrolling"}
                              </Badge>
                              <Button 
                                size="sm"
                                className="bg-brand-500 hover:bg-brand-600 text-white font-mono hidden sm:flex"
                              >
                                Register
                                <ArrowRight className="ml-1 h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Schedule Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.2 }}
          className="text-center mt-8"
        >
          <Button 
            variant="outline" 
            className="font-mono border-border hover:bg-muted"
          >
            View Full Schedule
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
