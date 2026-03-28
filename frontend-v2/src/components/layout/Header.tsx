"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { NAV_ITEMS, BRAND_NAME } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.5 }
    },
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/95 backdrop-blur-sm border-b border-border shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
            aria-label="iTrust Academy Home"
          >
            <div className="w-8 h-8 bg-brand-500 flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-lg font-mono">i</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-foreground leading-tight">
                {BRAND_NAME}
              </span>
              <span className="text-xs text-muted-foreground font-mono hidden sm:block">
                Enterprise Training
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button 
              asChild
              className="bg-brand-500 hover:bg-brand-600 text-white font-mono"
            >
              <Link href="#courses">Enroll Now</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Main navigation links for iTrust Academy
              </SheetDescription>
              <div className="flex flex-col h-full pt-8">
                {/* Mobile Logo */}
                <Link 
                  href="/" 
                  className="flex items-center gap-2 mb-8"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-8 h-8 bg-brand-500 flex items-center justify-center">
                    <span className="text-white font-bold text-lg font-mono">i</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {BRAND_NAME}
                  </span>
                </Link>

                {/* Mobile Navigation */}
                <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-3 text-sm font-mono text-muted-foreground hover:text-foreground hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {/* Mobile CTA */}
                <div className="mt-auto pb-8">
                  <Button 
                    asChild
                    className="w-full bg-brand-500 hover:bg-brand-600 text-white font-mono"
                  >
                    <Link href="#courses" onClick={() => setIsOpen(false)}>
                      Enroll Now
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
