"use client";

import Link from "next/link";
import { Container } from "./Container";
import { BRAND_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Footer Component
 * Site footer with navigation, contact info, and legal links
 * Dark theme for visual contrast
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl font-mono">i</span>
              </div>
              <span className="font-sans font-bold text-xl">{BRAND_NAME}</span>
            </div>
            <p className="text-sm text-white/60 mb-6 max-w-sm leading-relaxed">
              Enterprise IT training excellence for organizations across Asia-Pacific.
            </p>
            <div className="space-y-2 text-sm text-white/60">
              <a href="mailto:contact@itrust-academy.com" className="hover:text-primary transition-colors">
                contact@itrust-academy.com
              </a>
              <div>+65 6123 4567</div>
            </div>
          </div>

          {/* Courses Column */}
          <div>
            <h4 className="font-mono text-sm font-semibold uppercase tracking-wider mb-4 text-white/80">
              Courses
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Cloud & Infrastructure", href: "#" },
                { label: "Cybersecurity", href: "#" },
                { label: "Data & AI", href: "#" },
                { label: "Software Development", href: "#" },
                { label: "Project Management", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-mono text-sm font-semibold uppercase tracking-wider mb-4 text-white/80">
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "#" },
                { label: "Careers", href: "#" },
                { label: "Partners", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Contact", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="font-mono text-sm font-semibold uppercase tracking-wider mb-4 text-white/80">
              Resources
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Learning Platform", href: "#" },
                { label: "Certification Guide", href: "#" },
                { label: "Case Studies", href: "#" },
                { label: "Webinars", href: "#" },
                { label: "FAQ", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/40">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-white/40">
              <span>© {currentYear} {BRAND_NAME}. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="font-mono">Singapore • Hong Kong • Malaysia • Thailand</span>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
