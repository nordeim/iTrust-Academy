"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, BRAND_NAME } from "@/lib/constants";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

/**
 * MobileNav Component
 * Slide-in navigation for mobile viewports
 * Uses CSS-based animation for performance
 * 
 * @example
 * <MobileNav />
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      {/* Menu Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggle}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        className="relative z-50"
      >
        {isOpen ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Menu className="h-5 w-5" aria-hidden="true" />
        )}
      </Button>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-navigation"
        className={cn(
          "fixed inset-0 top-16 z-40 bg-background border-t border-border",
          "transition-all duration-300 ease-out",
          isOpen 
            ? "opacity-100 visible translate-y-0" 
            : "opacity-0 invisible -translate-y-4"
        )}
        aria-hidden={!isOpen}
      >
        <nav className="container py-8" aria-label="Mobile navigation">
          <ul className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={handleClose}
                  className={cn(
                    "block font-mono text-lg font-medium uppercase tracking-wider",
                    "py-4 border-b border-border",
                    "text-foreground/80 hover:text-primary",
                    "transition-colors duration-200"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          {/* CTA Button */}
          <div className="mt-8">
            <Button 
              className="w-full" 
              onClick={handleClose}
            >
              Get Started
            </Button>
          </div>
          
          {/* Contact Info */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2 font-mono uppercase tracking-wider">
              Contact Us
            </p>
            <a 
              href="mailto:contact@itrust-academy.com"
              className="text-primary hover:underline"
            >
              contact@itrust-academy.com
            </a>
          </div>
        </nav>
      </div>

      {/* Background Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 z-30 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={handleClose}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
