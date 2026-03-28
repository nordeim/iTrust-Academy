"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { BRAND_NAME, BRAND_TAGLINE, FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { Separator } from "@/components/ui/separator";

const iconMap = {
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
} as const;

export function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: prefersReducedMotion ? 0 : 0.5 },
    },
  };

  return (
    <footer 
      className="bg-foreground text-background"
      aria-label="Footer"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-brand-500 flex items-center justify-center">
                  <span className="text-white font-bold text-lg font-mono">i</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-background leading-tight">
                    {BRAND_NAME}
                  </span>
                  <span className="text-xs text-background/60 font-mono">
                    {BRAND_TAGLINE}
                  </span>
                </div>
              </Link>
              <p className="text-sm text-background/70 mb-6 max-w-sm leading-relaxed">
                Empowering IT professionals with industry-leading training and certifications since 2010.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-background/70">
                  <Mail className="w-4 h-4" />
                  <a 
                    href="mailto:info@itrustacademy.com" 
                    className="hover:text-background transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    info@itrustacademy.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-background/70">
                  <Phone className="w-4 h-4" />
                  <a 
                    href="tel:+6512345678" 
                    className="hover:text-background transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    +65 1234 5678
                  </a>
                </div>
                <div className="flex items-start gap-2 text-sm text-background/70">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span>
                    1 Raffles Place, Tower 2<br />
                    Singapore 048616
                  </span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 mt-6">
                {SOCIAL_LINKS.map((link) => {
                  const Icon = iconMap[link.icon as keyof typeof iconMap];
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center bg-background/10 hover:bg-brand-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                      aria-label={`Follow us on ${link.name}`}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Courses Links */}
            <div>
              <h3 className="text-sm font-semibold text-background mb-4 font-mono uppercase tracking-wider">
                Courses
              </h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.courses.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-sm font-semibold text-background mb-4 font-mono uppercase tracking-wider">
                Company
              </h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-sm font-semibold text-background mb-4 font-mono uppercase tracking-wider">
                Resources
              </h3>
              <ul className="space-y-3">
                {FOOTER_LINKS.resources.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-background/60 font-mono">
                © {currentYear} {BRAND_NAME}. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                {FOOTER_LINKS.legal.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-xs text-background/60 hover:text-background transition-colors font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
