# iTrust Academy - Master Execution Plan

## Executive Overview

This Master Execution Plan provides a systematic, phase-by-phase approach to building the complete iTrust Academy web application. Each phase is designed to be independently executable while maintaining dependencies on previous phases.

**Total Estimated Time**: 8-10 hours
**Total Phases**: 8 Implementation Phases + Validation
**Methodology**: Test-Driven Development (TDD)

---

## Phase Dependencies Diagram

```
Phase 1: Design System Foundation
         ↓
Phase 2: Core Layout Components
         ↓
Phase 3: Navigation & Header ←─────────────┐
         ↓                                  │
Phase 4: Hero Section                        │
         ↓                                  │
Phase 5: Course Catalog & Cards ────────────┤
         ↓                                  │
Phase 6: Features & Value Proposition       │
         ↓                                  │
Phase 7: Testimonials & Trust Signals       │
         ↓                                  │
Phase 8: Footer & Final Polish ─────────────┘
         ↓
Phase 9: Validation & QA
```

---

## Phase 1: Design System & Theme Foundation

### Objective
Establish the complete design system including colors, typography, spacing, and base styles that embody the "Precision Futurism" aesthetic.

### Files to Create/Modify

| File | Description | Status |
|------|-------------|--------|
| `src/app/globals.css` | Complete redesign with iTrust brand theme | Modify |
| `src/lib/constants.ts` | App-wide constants including navigation, brand data | Create |
| `src/lib/hooks/useReducedMotion.ts` | Accessibility hook for motion preferences | Create |
| `src/lib/hooks/useInView.ts` | Intersection observer hook for scroll animations | Create |

### Detailed Tasks

#### 1.1 Update globals.css

```css
/* Complete Tailwind v4 CSS-first theme */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Brand Colors - Burnt Orange */
  --color-brand-50: oklch(0.98 0.02 55);
  --color-brand-100: oklch(0.95 0.04 55);
  --color-brand-200: oklch(0.90 0.08 55);
  --color-brand-300: oklch(0.82 0.12 55);
  --color-brand-400: oklch(0.72 0.16 55);
  --color-brand-500: oklch(0.65 0.18 55);  /* Primary: #F27A1A */
  --color-brand-600: oklch(0.58 0.16 55);
  --color-brand-700: oklch(0.48 0.14 55);
  --color-brand-800: oklch(0.38 0.10 55);
  --color-brand-900: oklch(0.28 0.08 55);
  
  /* Typography */
  --font-sans: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "Space Mono", "SF Mono", monospace;
  
  /* Sharp corners for Precision Futurism */
  --radius: 0rem;
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  
  /* Custom animations */
  --animate-fade-in-up: fade-in-up 0.5s ease-out forwards;
  --animate-fade-in: fade-in 0.3s ease-out forwards;
  --animate-scale-in: scale-in 0.3s ease-out forwards;
  --animate-slide-in-right: slide-in-right 0.4s ease-out forwards;
  
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scale-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes slide-in-right {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
}

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.65 0.18 55);  /* Brand orange */
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0.005 55);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.65 0.18 55);
}
```

#### 1.2 Create constants.ts

```typescript
// src/lib/constants.ts
export const BRAND_NAME = "iTrust Academy";
export const BRAND_TAGLINE = "Enterprise IT Training Excellence";

export const NAV_ITEMS = [
  { label: "Courses", href: "#courses" },
  { label: "Solutions", href: "#solutions" },
  { label: "About", href: "#about" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "#contact" },
] as const;

export const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { name: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { name: "YouTube", href: "https://youtube.com", icon: "youtube" },
] as const;
```

#### 1.3 Create useReducedMotion hook

```typescript
// src/lib/hooks/useReducedMotion.ts
import { useState, useEffect } from "react";

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}
```

### Phase 1 Checklist

- [ ] globals.css updated with iTrust brand colors
- [ ] Sharp corners (--radius: 0rem) applied
- [ ] DM Sans and Space Mono fonts configured
- [ ] Custom animations defined
- [ ] constants.ts created with brand data
- [ ] useReducedMotion hook created
- [ ] useInView hook created
- [ ] Visual verification: Colors render correctly
- [ ] Accessibility check: Reduced motion respected

---

## Phase 2: Core Layout Components

### Objective
Create the foundational layout components that provide consistent structure across the application.

### Files to Create

| File | Description | Status |
|------|-------------|--------|
| `src/components/layout/Container.tsx` | Responsive container wrapper | Create |
| `src/components/layout/Section.tsx` | Section wrapper with consistent spacing | Create |
| `src/components/common/Button.tsx` | Custom button with brand styling | Create |
| `src/components/common/Badge.tsx` | Badge component with Space Mono font | Create |

### Detailed Tasks

#### 2.1 Container Component

```typescript
// src/components/layout/Container.tsx
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg" | "xl" | "full";
}

export function Container({ children, className, size = "default" }: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-3xl",
    default: "max-w-7xl",
    lg: "max-w-[1400px]",
    xl: "max-w-[1600px]",
    full: "max-w-full",
  };

  return (
    <div className={cn("w-full mx-auto px-4 sm:px-6 lg:px-8", sizeClasses[size], className)}>
      {children}
    </div>
  );
}
```

#### 2.2 Section Component

```typescript
// src/components/layout/Section.tsx
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "muted" | "dark";
}

export function Section({ children, className, id, background = "default" }: SectionProps) {
  const bgClasses = {
    default: "bg-background",
    muted: "bg-muted/30",
    dark: "bg-neutral-900 text-white",
  };

  return (
    <section id={id} className={cn("py-16 md:py-24 lg:py-32", bgClasses[background], className)}>
      {children}
    </section>
  );
}
```

#### 2.3 Custom Button Component

```typescript
// src/components/common/Button.tsx
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center font-mono text-sm font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "text-primary hover:bg-primary/10",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
```

#### 2.4 Badge Component

```typescript
// src/components/common/Badge.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center font-mono text-xs font-semibold uppercase tracking-widest",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-primary text-primary",
        success: "bg-green-500/10 text-green-700",
        warning: "bg-amber-500/10 text-amber-700",
      },
      size: {
        default: "px-2.5 py-1",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
```

### Phase 2 Checklist

- [ ] Container component created
- [ ] Section component created with background variants
- [ ] Button component created with brand styling
- [ ] Badge component created with Space Mono font
- [ ] All components have TypeScript types
- [ ] Components are responsive
- [ ] Visual verification in browser

---

## Phase 3: Navigation & Header System

### Objective
Create a professional, accessible navigation system with mobile responsiveness and smooth scroll behavior.

### Files to Create

| File | Description | Status |
|------|-------------|--------|
| `src/components/layout/Header.tsx` | Main header with scroll effects | Create |
| `src/components/layout/DesktopNav.tsx` | Desktop navigation links | Create |
| `src/components/layout/MobileNav.tsx` | Mobile navigation with Sheet | Create |
| `src/components/layout/Logo.tsx` | Brand logo component | Create |

### Detailed Tasks

#### 3.1 Logo Component

```typescript
// src/components/layout/Logo.tsx
import Link from "next/link";
import { BRAND_NAME } from "@/lib/constants";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="relative w-10 h-10 bg-primary flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-xl font-mono">i</span>
      </div>
      {showText && (
        <span className="font-sans font-bold text-xl tracking-tight">
          {BRAND_NAME}
        </span>
      )}
    </Link>
  );
}
```

#### 3.2 DesktopNav Component

```typescript
// src/components/layout/DesktopNav.tsx
"use client";

import Link from "next/link";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "font-mono text-sm font-medium uppercase tracking-wider",
            "text-foreground/70 hover:text-foreground transition-colors",
            "relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5",
            "after:bg-primary after:transition-all after:duration-200",
            "hover:after:w-full"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
```

#### 3.3 MobileNav Component

```typescript
// src/components/layout/MobileNav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, BRAND_NAME } from "@/lib/constants";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background border-t animate-fade-in">
          <nav className="container py-8">
            <ul className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block font-mono text-lg font-medium uppercase tracking-wider py-3 border-b border-border hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button className="w-full">Get Started</Button>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
```

#### 3.4 Header Component

```typescript
// src/components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { Container } from "./Container";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { Logo } from "./Logo";
import { Button } from "@/components/common/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm border-b"
          : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo />
          <DesktopNav />
          <div className="flex items-center gap-4">
            <Button className="hidden md:inline-flex">Get Started</Button>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
```

### Phase 3 Checklist

- [ ] Logo component created with brand identity
- [ ] DesktopNav created with hover effects
- [ ] MobileNav created with slide-in animation
- [ ] Header created with scroll effects
- [ ] Navigation is keyboard accessible
- [ ] Mobile menu opens/closes correctly
- [ ] Active states work properly
- [ ] Visual verification on all breakpoints

---

## Phase 4: Hero Section & Home Page

### Objective
Create an impactful hero section that immediately communicates the value proposition and encourages user engagement.

### Files to Create/Modify

| File | Description | Status |
|------|-------------|--------|
| `src/components/sections/Hero.tsx` | Hero section with animated elements | Create |
| `src/components/sections/Stats.tsx` | Statistics/Trust signals section | Create |
| `src/app/page.tsx` | Complete home page with all sections | Modify |

### Detailed Tasks

#### 4.1 Hero Section

```typescript
// src/components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
};

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-primary/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-1/4 -left-1/4 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl opacity-40" />

      <Container className="relative z-10">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            {...ANIMATION_VARIANTS.fadeInUp}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0 }}
          >
            <Badge variant="default" className="mb-6">
              Enterprise IT Training Excellence
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            {...ANIMATION_VARIANTS.fadeInUp}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
          >
            Transform Your Team with{" "}
            <span className="text-primary relative">
              Enterprise-Grade
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-primary/30" />
            </span>{" "}
            IT Training
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            {...ANIMATION_VARIANTS.fadeInUp}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8"
          >
            Equip your workforce with cutting-edge skills in cloud, cybersecurity, 
            AI/ML, and DevOps. Trusted by 500+ enterprises across Asia.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            {...ANIMATION_VARIANTS.fadeInUp}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg">Explore Courses</Button>
            <Button variant="outline" size="lg">Request Demo</Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            {...ANIMATION_VARIANTS.fadeInUp}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-border/50"
          >
            <p className="text-sm text-muted-foreground mb-4 font-mono uppercase tracking-wider">
              Trusted by industry leaders
            </p>
            <div className="flex flex-wrap items-center gap-8 opacity-60">
              {/* Partner logos placeholder - grayed out */}
              {["Samsung", "DBS Bank", "Singtel", "Grab", "OCBC"].map((partner) => (
                <span key={partner} className="font-mono text-sm font-medium">
                  {partner}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
```

#### 4.2 Stats Section

```typescript
// src/components/sections/Stats.tsx
"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const STATS = [
  { value: "50,000+", label: "Professionals Trained" },
  { value: "500+", label: "Enterprise Clients" },
  { value: "200+", label: "Expert Instructors" },
  { value: "98%", label: "Satisfaction Rate" },
];

export function Stats() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-16 md:py-20 bg-muted/30 border-y border-border">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: prefersReducedMotion ? 0 : 0.5, 
                delay: index * 0.1 
              }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2 font-mono">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

#### 4.3 Update page.tsx

```typescript
// src/app/page.tsx
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      {/* Additional sections will be added in subsequent phases */}
    </main>
  );
}
```

### Phase 4 Checklist

- [ ] Hero section created with animations
- [ ] Stats section created with trust signals
- [ ] Page.tsx updated with new sections
- [ ] Animations respect reduced motion
- [ ] Responsive design verified
- [ ] Accessibility check completed
- [ ] Performance check: No layout shift

---

## Phase 5: Course Catalog & Cards

### Objective
Create an impressive course catalog section with interactive cards that showcase the training offerings.

### Files to Create

| File | Description | Status |
|------|-------------|--------|
| `src/data/courses.ts` | Course data and types | Create |
| `src/components/cards/CourseCard.tsx` | Course card component | Create |
| `src/components/sections/CourseCatalog.tsx` | Course grid with filtering | Create |

### Detailed Tasks

#### 5.1 Course Data

```typescript
// src/data/courses.ts
export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
}

export const COURSE_CATEGORIES = [
  "All",
  "Cloud & Infrastructure",
  "Cybersecurity",
  "Data & AI",
  "Software Development",
  "Project Management",
] as const;

export const COURSES: Course[] = [
  {
    id: "aws-solutions-architect",
    title: "AWS Solutions Architect Professional",
    description: "Master AWS architecture patterns, security best practices, and cost optimization strategies for enterprise deployments.",
    category: "Cloud & Infrastructure",
    level: "Advanced",
    duration: "40 hours",
    featured: true,
    tags: ["AWS", "Cloud", "Architecture"],
  },
  {
    id: "kubernetes-admin",
    title: "Kubernetes Administrator (CKA)",
    description: "Learn container orchestration, cluster management, and deployment strategies for production Kubernetes environments.",
    category: "Cloud & Infrastructure",
    level: "Intermediate",
    duration: "35 hours",
    featured: true,
    tags: ["Kubernetes", "DevOps", "Containers"],
  },
  {
    id: "cybersecurity-essentials",
    title: "Cybersecurity Essentials",
    description: "Comprehensive security fundamentals covering threat analysis, vulnerability assessment, and incident response.",
    category: "Cybersecurity",
    level: "Beginner",
    duration: "24 hours",
    tags: ["Security", "Compliance", "Risk"],
  },
  {
    id: "ml-engineering",
    title: "Machine Learning Engineering",
    description: "Build and deploy production ML systems using MLOps best practices, model monitoring, and scalable architectures.",
    category: "Data & AI",
    level: "Advanced",
    duration: "48 hours",
    featured: true,
    tags: ["ML", "AI", "MLOps"],
  },
  {
    id: "devops-fundamentals",
    title: "DevOps Engineering Fundamentals",
    description: "CI/CD pipelines, infrastructure as code, monitoring, and automation for modern software delivery.",
    category: "Software Development",
    level: "Intermediate",
    duration: "32 hours",
    tags: ["DevOps", "CI/CD", "Automation"],
  },
  {
    id: "pmp-certification",
    title: "PMP Certification Preparation",
    description: "Project Management Professional exam preparation with hands-on case studies and practice exams.",
    category: "Project Management",
    level: "Intermediate",
    duration: "36 hours",
    tags: ["PMP", "Project Management", "Certification"],
  },
];
```

#### 5.2 CourseCard Component

```typescript
// src/components/cards/CourseCard.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, BarChart3 } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { cn } from "@/lib/utils";
import type { Course } from "@/data/courses";

interface CourseCardProps {
  course: Course;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={`#course-${course.id}`}
        className={cn(
          "group block bg-card border border-border p-6",
          "transition-all duration-300 ease-out",
          "hover:border-primary hover:shadow-lg hover:shadow-primary/5",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <Badge variant="default" size="sm">
            {course.category}
          </Badge>
          {course.featured && (
            <Badge variant="outline" size="sm" className="border-primary text-primary">
              Featured
            </Badge>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
          {course.description}
        </p>

        {/* Footer */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4 border-t border-border">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{course.duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BarChart3 className="w-4 h-4" />
            <span className={cn(
              "font-mono",
              course.level === "Beginner" && "text-green-600",
              course.level === "Intermediate" && "text-amber-600",
              course.level === "Advanced" && "text-red-600"
            )}>
              {course.level}
            </span>
          </div>
        </div>

        {/* Tags */}
        {course.tags && (
          <div className="flex flex-wrap gap-2 mt-4">
            {course.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-muted-foreground/70 bg-muted px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
```

#### 5.3 CourseCatalog Section

```typescript
// src/components/sections/CourseCatalog.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CourseCard } from "@/components/cards/CourseCard";
import { Button } from "@/components/common/Button";
import { COURSES, COURSE_CATEGORIES } from "@/data/courses";
import { cn } from "@/lib/utils";

export function CourseCatalog() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredCourses = activeCategory === "All"
    ? COURSES
    : COURSES.filter((course) => course.category === activeCategory);

  return (
    <Section id="courses" background="default">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Industry-Leading <span className="text-primary">Courses</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Comprehensive training programs designed by industry experts 
            for enterprise teams seeking excellence.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {COURSE_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 font-mono text-sm font-medium transition-all duration-200",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg">
            View All Courses
          </Button>
        </motion.div>
      </Container>
    </Section>
  );
}
```

### Phase 5 Checklist

- [ ] Course data structure defined
- [ ] CourseCard component created
- [ ] CourseCatalog section with filtering
- [ ] Cards have hover effects
- [ ] Category filter works correctly
- [ ] Responsive grid layout
- [ ] Accessibility: Keyboard navigation works
- [ ] Visual verification completed

---

## Phase 6: Features & Value Proposition

### Objective
Create a compelling features section that differentiates iTrust Academy from competitors.

### Files to Create

| File | Description | Status |
|------|-------------|--------|
| `src/components/cards/FeatureCard.tsx` | Feature card component | Create |
| `src/components/sections/Features.tsx` | Features grid section | Create |

### Detailed Tasks

#### 6.1 FeatureCard Component

```typescript
// src/components/cards/FeatureCard.tsx
"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

export function FeatureCard({ icon: Icon, title, description, index = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "group relative p-6 border border-border bg-card",
        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
        "transition-all duration-300"
      )}
    >
      {/* Icon */}
      <div className="mb-4 w-12 h-12 flex items-center justify-center bg-primary/10 text-primary">
        <Icon className="w-6 h-6" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm">
        {description}
      </p>
    </motion.div>
  );
}
```

#### 6.2 Features Section

```typescript
// src/components/sections/Features.tsx
"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  Users, 
  Award, 
  Clock, 
  Globe, 
  TrendingUp 
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { FeatureCard } from "@/components/cards/FeatureCard";

const FEATURES = [
  {
    icon: Building2,
    title: "Enterprise-First Approach",
    description: "Training programs designed specifically for organizational needs with customized learning paths and team analytics.",
  },
  {
    icon: Users,
    title: "Expert Instructors",
    description: "Learn from certified professionals with real-world experience at leading technology companies.",
  },
  {
    icon: Award,
    title: "Industry Certifications",
    description: "Prepare for AWS, Azure, Google Cloud, CISSP, PMP, and other globally recognized certifications.",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Choose from self-paced, instructor-led, or blended learning options to fit your team's schedule.",
  },
  {
    icon: Globe,
    title: "Asia-Pacific Focus",
    description: "Training delivered across the region with local language support and regional compliance considerations.",
  },
  {
    icon: TrendingUp,
    title: "Measurable Results",
    description: "Track progress with detailed analytics, skill assessments, and ROI reporting for stakeholders.",
  },
];

export function Features() {
  return (
    <Section id="solutions" background="muted">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Why Enterprises <span className="text-primary">Choose Us</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Built for scale, designed for impact. Discover what sets iTrust Academy apart.
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
```

### Phase 6 Checklist

- [ ] FeatureCard component created
- [ ] Features section created with data
- [ ] Icons render correctly
- [ ] Hover effects work properly
- [ ] Responsive layout verified
- [ ] Accessibility: Proper heading hierarchy

---

## Phase 7: Testimonials & Trust Signals

### Objective
Create social proof through testimonials and partner logos.

### Files to Create

| File | Description | Status |
|------|-------------|--------|
| `src/components/cards/TestimonialCard.tsx` | Testimonial card | Create |
| `src/components/sections/Testimonials.tsx` | Testimonials section | Create |
| `src/components/sections/Partners.tsx` | Partner logos section | Create |

### Detailed Tasks

#### 7.1 TestimonialCard Component

```typescript
// src/components/cards/TestimonialCard.tsx
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

export function TestimonialCard({ 
  quote, 
  author, 
  role, 
  company, 
  index = 0 
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        "relative p-8 border border-border bg-card",
        "hover:border-primary/30 transition-all duration-300"
      )}
    >
      {/* Quote Icon */}
      <Quote className="w-10 h-10 text-primary/20 mb-4" />

      {/* Quote */}
      <blockquote className="text-lg mb-6 leading-relaxed">
        "{quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-bold font-mono">
            {author.split(" ").map(n => n[0]).join("")}
          </span>
        </div>
        <div>
          <div className="font-semibold">{author}</div>
          <div className="text-sm text-muted-foreground">
            {role}, {company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
```

#### 7.2 Testimonials Section

```typescript
// src/components/sections/Testimonials.tsx
"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { TestimonialCard } from "@/components/cards/TestimonialCard";

const TESTIMONIALS = [
  {
    quote: "iTrust Academy transformed our cloud capabilities. Their AWS training program helped us achieve 40% reduction in infrastructure costs while improving reliability.",
    author: "Sarah Chen",
    role: "CTO",
    company: "TechCorp Singapore",
  },
  {
    quote: "The cybersecurity program was exceptional. Our team now has the skills and certifications needed to protect our organization from evolving threats.",
    author: "Michael Tan",
    role: "CISO",
    company: "Financial Services Ltd",
  },
  {
    quote: "Outstanding ROI. The DevOps training enabled our teams to deploy 5x faster with significantly fewer incidents. Highly recommended for enterprise teams.",
    author: "Jennifer Wong",
    role: "VP Engineering",
    company: "Global Retail Inc",
  },
];

export function Testimonials() {
  return (
    <Section id="about" background="default">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Trusted by <span className="text-primary">Industry Leaders</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            See what enterprise leaders say about their transformation journey with us.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.author}
              {...testimonial}
              index={index}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
```

#### 7.3 Partners Section

```typescript
// src/components/sections/Partners.tsx
"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";

const PARTNERS = [
  "AWS Partner",
  "Microsoft Gold Partner",
  "Google Cloud Partner",
  "Cisco Authorized",
  "PMI ATP",
  "(ISC)² Official",
];

export function Partners() {
  return (
    <section className="py-12 bg-muted/30 border-y border-border">
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground font-mono uppercase tracking-wider mb-8"
        >
          Authorized Training Partner
        </motion.p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {PARTNERS.map((partner, index) => (
            <motion.div
              key={partner}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="font-mono text-sm font-medium text-muted-foreground/70 hover:text-foreground transition-colors"
            >
              {partner}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

### Phase 7 Checklist

- [ ] TestimonialCard component created
- [ ] Testimonials section created
- [ ] Partners section created
- [ ] Responsive layout verified
- [ ] Accessibility: Proper structure

---

## Phase 8: Footer & Final Polish

### Objective
Complete the page with footer and final CTA section.

### Files to Create/Modify

| File | Description | Status |
|------|-------------|--------|
| `src/components/sections/CTA.tsx` | Call-to-action section | Create |
| `src/components/layout/Footer.tsx` | Footer component | Create |
| `src/app/page.tsx` | Complete home page | Modify |

### Detailed Tasks

#### 8.1 CTA Section

```typescript
// src/components/sections/CTA.tsx
"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/common/Button";

export function CTA() {
  return (
    <section className="py-20 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Ready to Transform Your Team?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg opacity-90 mb-8"
          >
            Join 500+ enterprises across Asia who have elevated their workforce 
            with iTrust Academy's industry-leading training programs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Request Corporate Demo
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Sales
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
```

#### 8.2 Footer Component

```typescript
// src/components/layout/Footer.tsx
"use client";

import Link from "next/link";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { BRAND_NAME } from "@/lib/constants";

const FOOTER_LINKS = {
  courses: [
    { label: "Cloud & Infrastructure", href: "#" },
    { label: "Cybersecurity", href: "#" },
    { label: "Data & AI", href: "#" },
    { label: "Software Development", href: "#" },
    { label: "Project Management", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Partners", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  resources: [
    { label: "Learning Platform", href: "#" },
    { label: "Certification Guide", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Webinars", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <Container className="py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl font-mono">i</span>
              </div>
              <span className="font-sans font-bold text-xl">{BRAND_NAME}</span>
            </div>
            <p className="text-sm text-white/60 mb-6">
              Enterprise IT training excellence for organizations across Asia-Pacific.
            </p>
            <div className="text-sm text-white/40">
              © 2024 {BRAND_NAME}. All rights reserved.
            </div>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-mono text-sm font-semibold uppercase tracking-wider mb-4 text-white/80">
              Courses
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.courses.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-sm font-semibold uppercase tracking-wider mb-4 text-white/80">
              Company
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-mono text-sm font-semibold uppercase tracking-wider mb-4 text-white/80">
              Resources
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
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
            <div className="flex gap-6 text-sm text-white/40">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
            <div className="text-sm text-white/40 font-mono">
              Singapore | Hong Kong | Malaysia | Thailand
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
```

#### 8.3 Final page.tsx

```typescript
// src/app/page.tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { CourseCatalog } from "@/components/sections/CourseCatalog";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";
import { Partners } from "@/components/sections/Partners";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Hero />
        <Stats />
        <CourseCatalog />
        <Features />
        <Testimonials />
        <Partners />
        <CTA />
      </div>
      <Footer />
    </main>
  );
}
```

### Phase 8 Checklist

- [ ] CTA section created
- [ ] Footer component created
- [ ] Complete page assembled
- [ ] All sections render correctly
- [ ] Responsive on all breakpoints
- [ ] Links are functional
- [ ] No console errors

---

## Phase 9: Validation & QA

### Objective
Comprehensive testing and quality assurance.

### Tasks

#### 9.1 Automated Checks

```bash
# Type check
bun run typecheck

# Lint
bun run lint

# Build
bun run build
```

#### 9.2 Manual Testing Checklist

**Desktop Testing:**
- [ ] All sections render correctly
- [ ] Navigation works with smooth scroll
- [ ] Hover effects are smooth
- [ ] Course filtering works
- [ ] All links are functional
- [ ] No layout shifts

**Mobile Testing:**
- [ ] Mobile menu opens/closes
- [ ] Touch interactions work
- [ ] Text is readable
- [ ] Images load correctly
- [ ] No horizontal scroll

**Accessibility Testing:**
- [ ] Keyboard navigation works
- [ ] Focus states are visible
- [ ] Color contrast is sufficient
- [ ] Screen reader compatible
- [ ] `prefers-reduced-motion` respected

**Performance Testing:**
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1

#### 9.3 Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

---

## Risk Register

| Risk | Probability | Impact | Mitigation | Owner |
|------|------------|--------|------------|-------|
| Tailwind v4 compatibility | Medium | High | Use stable patterns, test early | All phases |
| Font loading delay | Low | Medium | Use font-display: swap | Phase 1 |
| Animation performance | Low | Medium | Test on low-end devices | All phases |
| Mobile nav issues | Medium | High | Thorough testing on mobile | Phase 3 |

---

## Sign-Off

**Prepared by**: Frontend Architecture Team
**Date**: 2026-03-27
**Version**: 1.0

---

*This document serves as the definitive execution guide for the iTrust Academy project. All development should reference this plan for consistent implementation.*
