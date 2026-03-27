# iTrust Academy - Project Architecture Document

## Executive Summary

**iTrust Academy** is a professional B2B IT training platform designed to serve enterprises across Asia with premium technology education services. This document outlines the complete architectural vision, design system, and technical implementation strategy for building a distinctive, production-ready web application that embodies "Precision Futurism" with "Technologic Minimalism."

---

## 1. Project Overview

### 1.1 Business Context

iTrust Academy positions itself as the premier destination for enterprise IT training in the Asian market. The platform must convey:

- **Authority & Trust**: Established credibility through clean, professional design
- **Technical Excellence**: Modern, code-first aesthetic appealing to IT professionals
- **Premium Quality**: High-end feel justifying enterprise-level pricing
- **Regional Expertise**: Asian market focus with cultural sensitivity

### 1.2 Target Audience Analysis

| Segment | Characteristics | Design Implications |
|---------|----------------|---------------------|
| CTO/CIO | Decision-makers, time-constrained | Clear value propositions, quick scanning |
| IT Managers | Technical evaluators | Detailed course information, credibility signals |
| HR/L&D Directors | Budget approvers | ROI messaging, corporate-friendly aesthetics |
| Individual Learners | End users | Easy navigation, clear learning paths |

### 1.3 Design Positioning

**Position**: Legacy Innovator (Trusted + Bold Accents)

- Leverages established trust through professional, clean design
- Introduces distinctive burnt-orange accent for memorable brand identity
- Balances corporate credibility with modern, forward-thinking aesthetics

---

## 2. Design System Architecture

### 2.1 Color Palette

#### Primary Brand Colors

```css
/* Burnt Orange - Primary Brand Color */
--itrust-orange-50: oklch(0.98 0.02 55);
--itrust-orange-100: oklch(0.95 0.04 55);
--itrust-orange-200: oklch(0.90 0.08 55);
--itrust-orange-300: oklch(0.82 0.12 55);
--itrust-orange-400: oklch(0.72 0.16 55);
--itrust-orange-500: oklch(0.65 0.18 55);  /* Primary: #F27A1A */
--itrust-orange-600: oklch(0.58 0.16 55);  /* Hover state */
--itrust-orange-700: oklch(0.48 0.14 55);
--itrust-orange-800: oklch(0.38 0.10 55);
--itrust-orange-900: oklch(0.28 0.08 55);
```

#### Neutral Scale (Precision Gray)

```css
/* Neutral Scale - Clean Professional Base */
--neutral-50: oklch(0.99 0 0);
--neutral-100: oklch(0.97 0 0);
--neutral-200: oklch(0.93 0 0);
--neutral-300: oklch(0.87 0 0);
--neutral-400: oklch(0.70 0 0);
--neutral-500: oklch(0.55 0 0);
--neutral-600: oklch(0.40 0 0);
--neutral-700: oklch(0.25 0 0);
--neutral-800: oklch(0.15 0 0);
--neutral-900: oklch(0.10 0 0);
```

#### Semantic Colors

```css
/* Success */
--success-500: oklch(0.72 0.19 142);

/* Warning */
--warning-500: oklch(0.75 0.18 85);

/* Error */
--error-500: oklch(0.65 0.22 25);

/* Info */
--info-500: oklch(0.70 0.15 230);
```

### 2.2 Typography System

#### Font Stack

```css
/* Primary: DM Sans - Body & UI Text */
--font-sans: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

/* Technical: Space Mono - Labels, Code, Technical Elements */
--font-mono: "Space Mono", "SF Mono", "Fira Code", monospace;
```

#### Type Scale

| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| Display 1 | 4.5rem (72px) | 700 | 1.1 | -0.02em |
| Display 2 | 3.75rem (60px) | 700 | 1.15 | -0.01em |
| Heading 1 | 3rem (48px) | 600 | 1.2 | -0.01em |
| Heading 2 | 2.25rem (36px) | 600 | 1.25 | 0 |
| Heading 3 | 1.875rem (30px) | 600 | 1.3 | 0 |
| Heading 4 | 1.5rem (24px) | 500 | 1.4 | 0 |
| Body Large | 1.125rem (18px) | 400 | 1.6 | 0 |
| Body | 1rem (16px) | 400 | 1.6 | 0 |
| Body Small | 0.875rem (14px) | 400 | 1.5 | 0 |
| Caption | 0.75rem (12px) | 500 | 1.4 | 0.02em |
| Label | 0.6875rem (11px) | 600 | 1.3 | 0.05em |

#### Typography Usage Guidelines

1. **Display**: Hero headlines, major section headers
2. **Heading**: Section titles, card titles
3. **Body**: Paragraphs, descriptions, general text
4. **Label (Space Mono)**: Navigation items, buttons, tags, technical labels
5. **Caption**: Supporting text, metadata, timestamps

### 2.3 Spacing System

```css
/* Base Unit: 4px */
--spacing-0: 0;
--spacing-1: 0.25rem;  /* 4px */
--spacing-2: 0.5rem;   /* 8px */
--spacing-3: 0.75rem;  /* 12px */
--spacing-4: 1rem;     /* 16px */
--spacing-5: 1.25rem;  /* 20px */
--spacing-6: 1.5rem;   /* 24px */
--spacing-8: 2rem;     /* 32px */
--spacing-10: 2.5rem;  /* 40px */
--spacing-12: 3rem;    /* 48px */
--spacing-16: 4rem;    /* 64px */
--spacing-20: 5rem;    /* 80px */
--spacing-24: 6rem;    /* 96px */
--spacing-32: 8rem;    /* 128px */
```

### 2.4 Border Radius System

**Design Decision: Sharp Corners (Technologic Minimalism)**

```css
--radius-none: 0rem;     /* Primary: Sharp, technical aesthetic */
--radius-sm: 0.125rem;   /* 2px - Subtle softening */
--radius-md: 0.25rem;    /* 4px - Buttons, inputs */
--radius-lg: 0.5rem;     /* 8px - Cards (occasional use) */
--radius-full: 9999px;   /* Pills, avatars */
```

**Primary Direction**: Sharp corners (`radius: 0`) to reinforce the "Precision Futurism" aesthetic.

### 2.5 Shadow System

```css
/* Elevation Levels */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.06);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.10);
--shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.12);

/* Accent Shadow (Orange Glow) */
--shadow-accent: 0 4px 16px rgba(242, 122, 26, 0.25);
--shadow-accent-lg: 0 8px 32px rgba(242, 122, 26, 0.30);
```

### 2.6 Animation System

#### Motion Principles

1. **Purposeful**: Every animation serves a functional purpose
2. **Snappy**: Quick, responsive feedback (150-300ms)
3. **Smooth**: Natural easing curves
4. **Accessible**: Respects `prefers-reduced-motion`

#### Timing Functions

```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
```

#### Duration Scale

```css
--duration-instant: 100ms;   /* Micro-interactions */
--duration-fast: 150ms;      /* Hover states */
--duration-normal: 250ms;    /* Standard transitions */
--duration-slow: 400ms;      /* Page transitions */
--duration-slower: 600ms;    /* Complex animations */
```

---

## 3. Component Architecture

### 3.1 Component Hierarchy

```
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page (single-page experience)
│   └── globals.css             # Global styles & Tailwind config
├── components/
│   ├── ui/                     # Shadcn/UI primitives (existing)
│   ├── layout/                 # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   └── MobileNav.tsx
│   ├── sections/               # Page sections
│   │   ├── Hero.tsx
│   │   ├── CourseCatalog.tsx
│   │   ├── Features.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Partners.tsx
│   │   ├── CTA.tsx
│   │   └── Stats.tsx
│   ├── cards/                  # Card components
│   │   ├── CourseCard.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── TestimonialCard.tsx
│   │   └── StatCard.tsx
│   └── common/                 # Shared components
│       ├── Button.tsx
│       ├── Badge.tsx
│       ├── Icon.tsx
│       └── Container.tsx
├── lib/
│   ├── utils.ts                # Utility functions
│   ├── constants.ts            # App constants
│   └── hooks/                  # Custom hooks
│       ├── useReducedMotion.ts
│       └── useInView.ts
└── data/
    └── courses.ts              # Course data
```

### 3.2 Core Component Specifications

#### Header Component

```typescript
interface HeaderProps {
  transparent?: boolean;        // For hero overlay mode
  sticky?: boolean;             // Sticky on scroll
}

// Features:
// - Logo with brand identity
// - Desktop navigation (md+)
// - Mobile menu trigger (below md)
// - Scroll-aware background change
// - Smooth hide/show on scroll
```

#### Navigation Component

```typescript
interface NavItem {
  label: string;
  href: string;
  badge?: string;              // Optional badge (e.g., "New")
  children?: NavItem[];        // Dropdown items
}

// Features:
// - Horizontal nav for desktop
// - Active state indication
// - Dropdown for sub-menu items
// - Accessible keyboard navigation
```

#### CourseCard Component

```typescript
interface CourseCardProps {
  title: string;
  description: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image?: string;
  featured?: boolean;
  href: string;
}

// Features:
// - Image with hover zoom effect
// - Category badge (Space Mono)
// - Title truncation
// - Level indicator
// - Duration display
// - Hover state with accent shadow
```

### 3.3 Shadcn/UI Integration Strategy

**Principle**: Use existing shadcn/UI primitives as foundation, apply custom styling to achieve the "Precision Futurism" aesthetic.

| Component | Shadcn Base | Custom Styling |
|-----------|-------------|----------------|
| Button | `button.tsx` | Sharp corners, orange accent, Space Mono labels |
| Card | `card.tsx` | Sharp corners, subtle shadow, hover accent |
| Badge | `badge.tsx` | Space Mono font, uppercase, sharp corners |
| Sheet | `sheet.tsx` | Mobile navigation drawer |
| Dialog | `dialog.tsx` | Course detail modal |
| Tabs | `tabs.tsx` | Course category filtering |
| Carousel | `carousel.tsx` | Testimonials slider |

---

## 4. Page Architecture

### 4.1 Single-Page Experience (Home Page)

The home page serves as a comprehensive single-page experience that communicates the full value proposition without requiring navigation to multiple pages.

#### Section Order

1. **Hero** - Primary value proposition with CTA
2. **Stats** - Trust signals (students, courses, partners)
3. **Course Catalog** - Featured courses grid
4. **Features** - Platform differentiation
5. **Testimonials** - Social proof
6. **Partners** - Enterprise credibility
7. **CTA** - Final conversion push
8. **Footer** - Contact, links, legal

### 4.2 Responsive Breakpoints

```css
/* Mobile-First Approach */
--breakpoint-sm: 640px;    /* Small tablets */
--breakpoint-md: 768px;    /* Tablets */
--breakpoint-lg: 1024px;   /* Laptops */
--breakpoint-xl: 1280px;   /* Desktops */
--breakpoint-2xl: 1536px;  /* Large screens */
--breakpoint-3xl: 1920px;  /* Extra large */
```

### 4.3 Grid System

```css
/* Container */
.container {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: 1rem;
}

/* Grid */
.grid-courses {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .grid-courses {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-courses {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 5. Interaction Patterns

### 5.1 Hover States

| Element | Hover Effect |
|---------|-------------|
| Buttons | Background darken, slight lift (translateY -1px) |
| Cards | Accent shadow, subtle scale (1.02) |
| Links | Underline animation, color change |
| Navigation | Background highlight, indicator line |

### 5.2 Focus States (Accessibility)

```css
/* Focus Ring */
.focus-ring {
  outline: none;
  box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--itrust-orange-500);
}

/* Focus Visible (Keyboard Only) */
.focus-visible:focus-visible {
  outline: 2px solid var(--itrust-orange-500);
  outline-offset: 2px;
}
```

### 5.3 Loading States

- **Skeleton Loading**: Gray shimmer effect for content loading
- **Button Loading**: Spinner icon with disabled state
- **Page Transitions**: Fade in/out with subtle opacity changes

---

## 6. Performance Architecture

### 6.1 Image Optimization

- **Format**: WebP with AVIF fallback
- **Responsive**: `srcset` for multiple sizes
- **Lazy Loading**: Below-fold images
- **Placeholder**: Low-quality blur placeholders

### 6.2 Code Splitting

```typescript
// Lazy load heavy components
const CourseCatalog = dynamic(() => import('@/components/sections/CourseCatalog'), {
  loading: () => <CourseCatalogSkeleton />
});

const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => <TestimonialsSkeleton />
});
```

### 6.3 Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | > 95 |
| First Contentful Paint | < 1.2s |
| Largest Contentful Paint | < 2.0s |
| Cumulative Layout Shift | < 0.05 |
| Time to Interactive | < 2.5s |

---

## 7. Accessibility Standards

### 7.1 WCAG AAA Compliance

- **Color Contrast**: Minimum 7:1 for normal text, 4.5:1 for large text
- **Focus Management**: Visible focus indicators on all interactive elements
- **Keyboard Navigation**: Full site navigable via keyboard
- **Screen Reader Support**: Semantic HTML, ARIA labels where needed
- **Reduced Motion**: Respect `prefers-reduced-motion` preference

### 7.2 Semantic Structure

```html
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <!-- Navigation items -->
  </nav>
</header>

<main role="main">
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading">...</h1>
  </section>
  <!-- Additional sections -->
</main>

<footer role="contentinfo">
  <!-- Footer content -->
</footer>
```

---

## 8. Technical Implementation Stack

### 8.1 Core Technologies

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js | 16.1.1 |
| Runtime | React | 19.0.0 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Components | shadcn/ui | Latest |
| Animation | Framer Motion | 12.x |

### 8.2 Build Configuration

```javascript
// vite.config.ts - Tailwind v4 Vite plugin
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
});
```

### 8.3 CSS Architecture (Tailwind v4)

```css
/* globals.css */
@import "tailwindcss";

@theme {
  /* Brand Colors */
  --color-brand-500: oklch(0.65 0.18 55);  /* #F27A1A */
  
  /* Typography */
  --font-sans: "DM Sans", sans-serif;
  --font-mono: "Space Mono", monospace;
  
  /* Sharp corners for Precision Futurism */
  --radius: 0rem;
  
  /* Custom animations */
  --animate-fade-in: fade-in 0.5s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## 9. Content Architecture

### 9.1 Course Categories

1. **Cloud & Infrastructure**
   - AWS, Azure, GCP certifications
   - Kubernetes, Docker containerization
   - Infrastructure as Code (Terraform)

2. **Cybersecurity**
   - CISSP, CISM certifications
   - Ethical Hacking
   - Security Operations

3. **Data & AI**
   - Machine Learning Engineering
   - Data Analytics
   - AI/ML Operations

4. **Software Development**
   - Full-Stack Development
   - DevOps Engineering
   - Agile Methodologies

5. **Project Management**
   - PMP Certification
   - Scrum Master
   - ITIL Foundation

### 9.2 Testimonial Categories

- Enterprise Clients (Fortune 500)
- SME Businesses
- Individual Professionals
- Government Agencies

---

## 10. Quality Assurance Checklist

### 10.1 Pre-Launch Checklist

- [ ] All pages render without errors
- [ ] Responsive design tested on all breakpoints
- [ ] All interactive elements have focus states
- [ ] Color contrast meets WCAG AAA
- [ ] All images have descriptive alt text
- [ ] Forms have proper validation and error states
- [ ] Mobile navigation functions correctly
- [ ] All animations respect reduced motion
- [ ] Lighthouse score > 95
- [ ] No console errors in production build
- [ ] Cross-browser testing completed
- [ ] Performance budget met

### 10.2 Design Quality Gate

- [ ] Distinctive aesthetic direction (not generic)
- [ ] Intentional whitespace usage
- [ ] Typography hierarchy is clear
- [ ] Animations enhance UX without distraction
- [ ] Brand color used consistently
- [ ] Every element justified

---

## 11. Risk Mitigation

### 11.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Tailwind v4 compatibility issues | Medium | High | Use stable v4 patterns, fallback to CSS variables |
| Framer Motion performance | Low | Medium | Use `will-change`, optimize animations |
| Font loading performance | Medium | Medium | Use `font-display: swap`, preload critical fonts |

### 11.2 Design Risks

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Sharp corners feel harsh | Low | Medium | Test with users, add subtle radius if needed |
| Orange too aggressive | Low | Low | Provide softer orange variants |
| Minimalism perceived as empty | Medium | Low | Ensure sufficient content density |

---

## 12. Future Considerations

### 12.1 Phase 2 Features

- Course detail pages with full curriculum
- User authentication and enrollment
- Learning management dashboard
- Progress tracking
- Certificate generation

### 12.2 Scalability

- Component library extraction for reuse
- Design system documentation
- CMS integration for content management
- Multi-language support (i18n)

---

*Document Version: 1.0*
*Last Updated: 2026-03-27*
*Author: Frontend Architecture Team*
