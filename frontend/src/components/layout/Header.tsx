"use client";

import { useState, useEffect } from "react";
import { Container } from "./Container";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { Logo } from "./Logo";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

/**
 * Header Component
 * Fixed header with scroll-aware background
 * Contains logo, navigation, and CTA button
 * 
 * @example
 * <Header />
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Add background when scrolled past 20px
      setIsScrolled(currentScrollY > 20);
      
      // Hide header when scrolling down, show when scrolling up
      // Only apply this behavior when scrolled past header height
      if (currentScrollY > 100) {
        setIsHidden(currentScrollY > lastScrollY);
      } else {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        "transition-all duration-300 ease-out",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent",
        isHidden && "translate-y-[-100%]"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <Button 
              className="hidden md:inline-flex"
              size="default"
            >
              Get Started
            </Button>
            
            {/* Mobile Menu Toggle */}
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
