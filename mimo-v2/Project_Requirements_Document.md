# Project Requirements Document (PRD)

# iTrust Academy — Enterprise IT Training & Certification Platform

**URL Analyzed:** `https://itrust-academy.jesspete.shop/`  
**Date of Analysis:** April 1, 2026  
**Document Version:** 1.0  
**Classification:** Complete Design Guide & Reproduction Specification

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Platform Overview — WHAT](#2-platform-overview--what)
3. [Business Context — WHY](#3-business-context--why)
4. [Technical Architecture — HOW](#4-technical-architecture--how)
5. [Information Architecture & Routing](#5-information-architecture--routing)
6. [Page-by-Page Specification](#6-page-by-page-specification)
7. [Design System & Visual Aesthetics](#7-design-system--visual-aesthetics)
8. [UI Component Library](#8-ui-component-library)
9. [Animation & Interaction Design](#9-animation--interaction-design)
10. [Responsive Design Specification](#10-responsive-design-specification)
11. [Accessibility Analysis](#11-accessibility-analysis)
12. [UI/UX Gaps, Inconsistencies & Defects](#12-uiux-gaps-inconsistencies--defects)
13. [Recommendations for Improvement](#13-recommendations-for-improvement)
14. [Appendices](#14-appendices)

---

## 1. Executive Summary

iTrust Academy is a **single-page application (SPA)** built with **React (Vite)** that serves as a training and certification platform for enterprise IT professionals across the Asia-Pacific region. The platform provides expert-led training programs across four technology vendor platforms: **SolarWinds, Securden, Quest, and Ivanti**. The site features a modern, corporate aesthetic with an orange brand identity, monospace typography accents, and a clean, component-driven UI using **Tailwind CSS** with **Lucide React** icons. The homepage serves as the primary landing experience with all major content sections, while a secondary course detail page provides in-depth information for each course. The application employs smooth scrolling navigation, intersection-observer-based scroll animations, toast notifications (Sonner), and responsive design with a mobile hamburger menu.

---

## 2. Platform Overview — WHAT

### 2.1 Platform Purpose

iTrust Academy is an **enterprise IT training and certification platform** that:
- Delivers expert-led, hands-on training across SolarWinds, Securden, Quest, and Ivanti platforms
- Equips IT professionals across Asia with skills and certifications employers demand
- Serves both individual professionals and enterprise/corporate teams
- Offers 9 courses spanning 4 technology vendors
- Provides certification preparation programs

### 2.2 Core Functionalities

| Feature | Description |
|---------|-------------|
| Course Browsing & Discovery | Filterable, searchable course catalog with category tabs |
| Course Detail Pages | Detailed course information with tabs (Overview, Curriculum, Instructor, Certification) |
| User Authentication | Sign In and Create Account modals |
| Course Enrollment | "Enroll Now" CTAs on course cards and detail pages |
| Corporate Training | Professional services section with consultation scheduling |
| Training Calendar | Upcoming session listings with dates, formats, and enrollment |
| Testimonials | Client success stories with quotes and attribution |
| Statistics Dashboard | Key metrics display (15,000+ trained, 500+ clients, 98% satisfaction, 4 partners) |
| Navigation | Smooth-scrolling anchor navigation + page routing |
| Responsive Design | Desktop-first with mobile hamburger menu |
| Toast Notifications | Sonner toast library for user feedback |
| Footer | Comprehensive footer with 4-column link grid |

### 2.3 Content Inventory

The platform contains **2 distinct page types**:

1. **Homepage** (`/`) — Single-page scrolling experience with 10 content sections
2. **Course Detail Page** (`/courses/:slug`) — Detailed course view with 4-tab interface

### 2.4 Content Sections on Homepage

| # | Section | Content |
|---|---------|---------|
| 1 | **Hero** | Tagline badge, H1 headline, description paragraph, 2 CTA buttons, 4 stat items |
| 2 | **Stats Bar** | 4 key metrics: 15,000+ Professionals, 500+ Enterprise Clients, 98% Satisfaction, 4 Partners |
| 3 | **Platform Partners** | 4 vendor cards (SolarWinds, Securden, Quest, Ivanti) with course counts |
| 4 | **Course Catalog** | Search bar, 6 filter tabs, 9 course cards in 3-column grid |
| 5 | **Why iTrust Academy** | 6 feature cards (Enterprise-First, Expert Instructors, etc.) |
| 6 | **Training Calendar** | 4 upcoming sessions with dates, format, pricing, Enroll Now CTAs |
| 7 | **Professional Services** | Intro text, Schedule Consultation CTA, 4 service cards |
| 8 | **Testimonials** | 3 testimonial cards with quotes, author initials, names, and titles |
| 9 | **CTA Banner** | "Ready to Upskill?" heading, description, 2 CTA buttons |
| 10 | **Footer** | Logo, description, contact info, social links, 4-column link grid, legal |

### 2.5 Data Model (Observed)

**Courses:**
```typescript
interface Course {
  slug: string                    // URL-friendly identifier
  vendor: 'SolarWinds' | 'Securden' | 'Quest' | 'Ivanti'
  vendorColor: string             // Hex color per vendor
  title: string                   // Course name
  subtitle: string                // Short description
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  featured: boolean               // Featured badge
  duration: string                // e.g., "5 days"
  modules: number                 // Number of learning modules
  rating: number                  // e.g., 4.9
  enrolledCount: number           // e.g., 1847
  price: number                   // Current price in USD
  originalPrice?: number          // Strikethrough price (discounted)
  topics: string[]                // e.g., ["NETWORK MONITORING", "NPM", "ALERTS"]
  category: string[]              // e.g., "Network Monitoring"
  description: string             // Full description
  whatYoullLearn: string[]        // Learning outcomes
  prerequisites: string[]         // Requirements
  includes: string[]              // e.g., "5 days of instruction"
  curriculum: Module[]            // Array of learning modules
}

interface Module {
  number: number
  title: string
  hours: string                   // e.g., "2 hours"
  topics: number                  // Number of topics
}
```

**Training Sessions:**
```typescript
interface TrainingSession {
  courseName: string
  vendor: string
  spotsLeft?: number              // Urgency indicator
  startDate: string
  endDate: string
  format: 'Live Virtual' | 'In-Person (Singapore)' | 'In-Person (Hong Kong)'
  days: string                    // e.g., "5 days"
  price: string                   // e.g., "$2,499"
}
```

---

## 3. Business Context — WHY

### 3.1 Target Audience

- **Primary:** Enterprise IT teams and professionals across Asia-Pacific
- **Secondary:** IT managers and CTOs looking for corporate training solutions
- **Tertiary:** Individual IT professionals seeking vendor certifications

### 3.2 Business Goals

1. **Lead Generation:** Convert visitors through enrollment flows and consultation requests
2. **Brand Authority:** Position iTrust Academy as APAC's premier IT training provider
3. **Vendor Partnerships:** Showcase authorized partnerships with SolarWinds, Securden, Quest, Ivanti
4. **Trust Building:** Display social proof through statistics, testimonials, and enterprise client count
5. **Course Discovery:** Enable users to find and understand available training programs

### 3.3 Key Value Propositions

- Enterprise-first training design with customized learning paths
- Expert instructors with real-world implementation experience
- Official certification preparation across 4 vendor platforms
- Flexible delivery formats (live virtual, in-person, self-paced)
- Hands-on labs in sandboxed environments
- Measurable ROI with analytics and reporting

---

## 4. Technical Architecture — HOW

### 4.1 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React (SPA with client-side routing) |
| **Build Tool** | Vite (evidenced by `/assets/` hashed filenames) |
| **CSS Framework** | Tailwind CSS v4 (utility-first, JIT compilation) |
| **Typography** | Google Fonts: DM Sans (sans-serif) + Space Mono (monospace) |
| **Icons** | Lucide React (SVG icon library) |
| **Toast Notifications** | Sonner (toast library) |
| **Analytics** | Cloudflare Web Analytics (beacon.min.js) |
| **Deployment** | Cloudflare Pages (`.shop` domain with Cloudflare CDN) |

### 4.2 Application Architecture

```
iTrust Academy/
├── index.html                    # SPA entry point
├── assets/
│   ├── index-CzprY9HS.js        # Main bundle (React app)
│   ├── index-CTZK-Ir6.css       # Compiled Tailwind CSS
│   ├── home-4nPiL7J6.js         # Homepage route chunk
│   ├── courses-AkTw1lCf.js      # Courses page chunk
│   ├── about-*.js               # About page chunk (lazy loaded)
│   └── [various icon chunks]    # Lucide icon tree-shaken bundles
├── favicon.svg
└── (Vite config)
```

### 4.3 Routing Strategy

| Route | Page | Navigation Type |
|-------|------|----------------|
| `/` | Homepage (all sections) | Default landing |
| `/#courses` | Courses section | Anchor scroll on same page |
| `/#solutions` | Solutions section | Anchor scroll on same page |
| `/#contact` | Contact/footer section | Anchor scroll on same page |
| `/about` | About page | Separate page (lazy-loaded) |
| `/courses/:slug` | Course detail | Dynamic route with slug parameter |

### 4.4 Rendering Approach

- **Client-Side Rendering (CSR)** — All content rendered via React on the client
- **Code Splitting** — Route-based lazy loading (separate JS chunks for home, courses, about)
- **No Server-Side Rendering (SSR)** — No `__NEXT_DATA__` or hydration markers detected
- **Smooth Scrolling** — `scroll-behavior: smooth` applied to `html` element

### 4.5 State Management

- React state with intersection observer hooks for scroll-triggered animations
- Modal state management for Sign In / Register dialogs
- Filter state for course category tabs

---

## 5. Information Architecture & Routing

### 5.1 Site Map

```
iTrust Academy
├── Homepage (/)
│   ├── Hero Section
│   ├── Stats Bar
│   ├── Platform Partners (#solutions)
│   ├── Course Catalog (#courses)
│   │   ├── Search
│   │   ├── Filter Tabs (All, Database, Endpoint Mgmt, ITSM, Network Monitoring, Security)
│   │   └── 9 Course Cards → /courses/:slug
│   ├── Why iTrust Academy
│   ├── Training Calendar
│   ├── Professional Services
│   ├── Testimonials
│   └── CTA Banner (#contact)
├── Course Detail (/courses/:slug)
│   ├── Overview Tab
│   ├── Curriculum Tab
│   ├── Instructor Tab
│   └── Certification Tab
│   └── Related Courses
├── About (/about)
│   ├── Mission
│   ├── Story
│   ├── Values (6 cards)
│   └── Stats
└── Modals (Overlays)
    ├── Sign In (Email + Password)
    └── Register (First Name, Last Name, Username, Email, Password, Confirm Password)
```

### 5.2 Navigation Structure

**Desktop Navigation Bar:**
| Label | Action | Type |
|-------|--------|------|
| iTrust Academy logo | Navigate to `/` | Link |
| COURSES | Smooth scroll to `#courses` | Anchor |
| SOLUTIONS | Smooth scroll to `#solutions` | Anchor |
| ABOUT | Navigate to `/about` | Page route |
| CONTACT | Smooth scroll to `#contact` | Anchor |
| Sign In | Open Sign In modal | Button |
| Register | Open Register modal | Button |

**Mobile Navigation:**
- Hamburger menu icon (visible below `lg` breakpoint / 1024px)
- Full-screen slide-in drawer with navigation links + Sign In / Create Account buttons

### 5.3 Footer Navigation

| Column | Links |
|--------|-------|
| **Courses** | SolarWinds Training, Securden Certification, Quest Database Courses, Ivanti ITAM |
| **Company** | About Us, Careers (button), Partners (button), Blog (button) |
| **Resources** | FAQ, Certification Guide, Case Studies, Webinars |
| **Support** | Help Center, Contact Support, Training Calendar, Corporate Inquiries |

---

## 6. Page-by-Page Specification

### 6.1 Homepage

#### 6.1.1 Hero Section

**Layout:** Full viewport height (min-h-[90vh]), left-aligned content, decorative background elements

**Visual Structure:**
```
┌─────────────────────────────────────────────────────────────┐
│  [Logo] iTrust Academy    COURSES  SOLUTIONS  ABOUT  CONTACT  [Sign In] [Register] │
│─────────────────────────────────────────────────────────────│
│                                                             │
│  🔵 ASIA-PACIFIC'S PREMIER IT TRAINING PROVIDER            │
│                                                             │
│  Advance Your                                               │
│  IT Career.                                                 │
│  Get Certified. ← (orange, with underline SVG)              │
│                                                             │
│  iTrust Academy delivers expert-led, hands-on training...   │
│                                                             │
│  [▶ Explore SCP Fundamentals]  [→ View All Courses]        │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│  4               5+              Asia-Wide         SCP      │
│  Technology      Training        Training         Cert      │
│  Vendors         Programs        Coverage          Prep     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Background Effects:**
- Gradient overlay: `bg-gradient-to-br from-background via-background to-brand-50/30`
- Grid pattern: `bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50`
- Decorative blurred circles:
  - Top-right: `w-72 h-72 bg-brand-400/10 rounded-full blur-3xl`
  - Bottom-left: `w-96 h-96 bg-brand-300/5 rounded-full blur-3xl`

**Badge:** Pill-shaped with pulsing dot
- Text: `ASIA-PACIFIC'S PREMIER IT TRAINING PROVIDER`
- Style: `font-mono text-xs font-semibold uppercase tracking-widest rounded-full border px-3 py-1`
- Colors: `bg-brand-100 text-brand-700 border-brand-200`
- Pulsing dot: `w-2 h-2 bg-brand-500 rounded-full animate-pulse`

**H1 Typography:**
- Size: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
- Weight: `font-bold`
- Tracking: `tracking-tight`
- Leading: `leading-[1.1]`
- Color: `text-foreground` (#1a1a2e)
- "Certified" word highlighted with `text-brand-500` and decorative SVG underline

**CTA Buttons:**
1. Primary: `bg-brand-500 text-white hover:bg-brand-600 shadow-md hover:shadow-lg hover:shadow-brand/30 hover:-translate-y-0.5 h-14 px-8 rounded-lg`
2. Secondary: `border-brand-500 text-brand-600 hover:bg-brand-500 hover:text-white hover:shadow-md h-14 px-8 rounded-lg border-2`

**Stats Row:** `grid-cols-2 sm:grid-cols-4 gap-8` with `text-2xl sm:text-3xl font-bold text-brand-500` numbers

#### 6.1.2 Stats Bar Section

**Background:** `bg-muted/30 border-y border-border`
**Padding:** `py-16 md:py-20`
**Layout:** `grid-cols-2 md:grid-cols-4 gap-8 md:gap-12`

| Metric | Value | Font |
|--------|-------|------|
| Professionals Trained | 15,000+ | `text-3xl sm:text-4xl md:text-5xl font-bold text-primary font-mono tabular-nums` |
| Enterprise Clients | 500+ | Same |
| Satisfaction Rate | 98% | Same |
| Platform Partners | 4 | Same |

Sub-labels use `text-sm text-muted-foreground font-medium`.

#### 6.1.3 Platform Partners Section

**Background:** `bg-muted/30`
**Padding:** `py-16 md:py-24 lg:py-32`

**Section Header Pattern:**
- Overline: `text-xs font-mono uppercase tracking-widest text-primary mb-3`
- Heading: `text-3xl md:text-4xl lg:text-5xl font-bold` with `text-primary` accent on key word
- Description: `text-lg text-muted-foreground max-w-2xl mx-auto`

**Vendor Cards (4 columns on desktop):**
Each card is a `button` element with:
- `bg-card border border-border p-8 overflow-hidden text-left`
- Top color bar: `absolute top-0 left-0 w-full h-1` that expands to `h-2` on hover
- Letter icon: `w-16 h-16 flex items-center justify-center text-white font-bold text-2xl font-mono` with vendor-specific background color
- Title: `text-xl font-bold` with hover color transition
- Description: `text-sm text-muted-foreground`
- Footer: Course count + arrow icon with hover animation

| Vendor | Icon Letter | Background Color |
|--------|-------------|-----------------|
| SolarWinds | S | `#7B8794` (rgb(123, 135, 148)) |
| Securden | S | `#0EA5E9` (rgb(14, 165, 233)) |
| Quest | Q | `#6366F1` (rgb(99, 102, 241)) |
| Ivanti | I | `#EC4899` (rgb(236, 72, 153)) |

#### 6.1.4 Course Catalog Section

**Background:** `bg-background`
**Padding:** `py-16 md:py-24 lg:py-32`

**Search Bar:**
- Container: `relative max-w-md mx-auto mb-6`
- Search icon positioned absolute left
- Input: `h-11 w-full border border-input bg-background px-4 py-2 text-sm placeholder:text-muted-foreground pl-10 pr-10`

**Filter Tabs:**
- Layout: `flex flex-wrap justify-center gap-2`
- Active: `bg-primary text-white shadow-sm`
- Inactive: `bg-muted hover:bg-muted/80 text-foreground/70 hover:text-foreground`
- Style: `px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider`
- Categories: All, Database, Endpoint Management, IT Service Management, Network Monitoring, Security

**Course Cards (3-column grid on desktop):**
Each card is an `<a>` link with `rounded-xl overflow-hidden` and hover effects:

```
┌─────────────────────────────────────┐
│ ▬▬▬ (vendor color top bar, h-1.5)  │
│                                     │
│ [SOLARWINDS] [INTERMEDIATE] [Featured]│
│                                     │
│ SolarWinds Network                   │
│ Performance Monitor                  │
│ Master enterprise network monitoring │
│                                     │
│ 🕐 5 days  📊 12 modules  ⭐ 4.9   │
│                                     │
│ ─────────────────────────────────── │
│ $2,499    ~~$3,299~~    👥 1,847   │
│                                     │
│ [SolarWinds]                         │
└─────────────────────────────────────┘
```

**Card Hover Effects:**
- `hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 hover:-translate-y-1`
- Title color changes to `text-brand-600`
- `transition-all duration-300 ease-out`

**Card Tags/Badges:**
- Vendor badge: Dynamic color per vendor (`bg-[vendor-color]/8 text-[vendor-color] border-[vendor-color]/19`)
- Level badge: `border border-brand-500 text-brand-600`
- Featured badge: `bg-brand-100 text-brand-700 border-brand-200`

**Price Display:**
- Current price: `text-xl font-bold text-foreground`
- Original price (when discounted): `text-sm text-muted-foreground line-through`
- Enrolled count: `text-xs text-muted-foreground font-mono` with users icon

#### 6.1.5 Why iTrust Academy Section

**6 feature cards in grid layout**, each containing:
- Icon (Lucide React): building2, award, shield, clock, monitor, trending-up
- Title: `text-lg font-bold`
- Description: `text-sm text-muted-foreground`

| Feature | Icon |
|---------|------|
| Enterprise-First | building-2 |
| Expert Instructors | award |
| Official Certifications | shield |
| Flexible Formats | clock |
| Hands-On Labs | monitor |
| Measurable ROI | trending-up |

#### 6.1.6 Training Calendar Section

**Layout:** 4 session cards in vertical stack, each containing:
- Vendor name badge
- "4 SPOTS LEFT" urgency indicator (first session only)
- Course title (H3)
- Date range
- Format (Live Virtual / In-Person)
- Duration + Price per person
- "ENROLL NOW" button

| Session | Format | Dates |
|---------|--------|-------|
| SolarWinds NPM | Live Virtual | Apr 14-18, 2026 |
| Securden PAM | In-Person (Singapore) | Apr 21-24, 2026 |
| Ivanti EPM | Live Virtual | May 5-8, 2026 |
| Quest TOAD | In-Person (Hong Kong) | May 12-14, 2026 |

#### 6.1.7 Professional Services Section

**Header:** "Beyond Standard Training" with Schedule Consultation CTA
**4 service cards:**
1. Corporate Training
2. Certification Bootcamps
3. Managed Learning
4. Skills Assessment

Each card: Icon + Title (H3) + Description paragraph

#### 6.1.8 Testimonials Section

**3 testimonial cards** with:
- Quote text in blockquote
- Author initials circle (SC, MT, JW)
- Author name (bold)
- Author title and company (muted text)

| Person | Role | Company |
|--------|------|---------|
| Sarah Chen | VP of Infrastructure | Regional Banking Group |
| Michael Tan | CISO | Healthcare Systems Asia |
| Jennifer Wong | IT Director | Manufacturing Corp |

#### 6.1.9 CTA Banner Section

- Heading: "Ready to Upskill Your IT Team?"
- Description paragraph
- 2 CTA buttons: "Request Corporate Demo" (primary), "Contact Sales" (secondary)

### 6.2 Course Detail Page (`/courses/:slug`)

#### 6.2.1 Layout

Two-column layout on desktop:
- **Left column (main):** Course content with tab navigation
- **Right column (sidebar):** Sticky pricing/enrollment card

#### 6.2.2 Course Header

- Breadcrumb: "Back to Courses" link
- Vendor + Level + Featured badges
- Course title (H1)
- Subtitle
- Duration + Modules + Enrolled count + Rating
- Tab navigation: OVERVIEW | CURRICULUM | INSTRUCTOR | CERTIFICATION

#### 6.2.3 Tab: Overview

- Course Description (H3 + paragraph)
- What You'll Learn (H3 + checklist with 6 items)
- Prerequisites (H3 + bulleted list of 3 items)
- Topics Covered (H3 + tag badges)

#### 6.2.4 Tab: Curriculum

- Heading: "Course Curriculum"
- Summary: "12 modules • 31 hours of content"
- 12 collapsible module items, each with:
  - Module number (circular)
  - Module title (H4)
  - Duration (e.g., "2 hours")
  - Topic count (e.g., "3 topics")

#### 6.2.5 Sidebar Card

- Price: Current price + strikethrough original + "SAVE $800" badge
- "ENROLL NOW" primary button
- "REQUEST DEMO" secondary button
- "SHARE COURSE" outline button
- "This Course Includes:" checklist
- "Topics Covered:" tag badges

#### 6.2.6 Related Courses

- 3 related course cards (simpler design than homepage cards)
- Each showing: vendor badge, level, title, duration, rating, enrolled, price

### 6.3 About Page (`/about`)

#### 6.3.1 Layout

Single-column, centered content layout with:
- Page title (H1): "About iTrust Academy"
- Subtitle paragraph
- Mission section (H2 + paragraph)
- Story section (H2 + 5 paragraphs)
- Values section (H2 + 6 value cards in grid)
- Stats section (same 4 metrics as homepage but different values)
- CTA section with "Browse Courses" button

#### 6.3.2 Values Grid

| Value | Description |
|-------|-------------|
| Excellence | Highest quality training with certified instructors and hands-on labs |
| Partnership | Work alongside clients to understand unique challenges |
| Regional Focus | Deep APAC expertise; English, Mandarin, Bahasa Melayu |
| Results-Driven | Curriculum aligned with vendor certifications |
| Student Success | Ongoing support throughout learning journey |
| Innovation | Stay ahead of technology trends |

### 6.4 Sign In Modal

- Title: "Welcome Back"
- Fields: Email (textbox), Password (textbox)
- Primary CTA: "SIGN IN"
- Secondary link: "Create one" (opens Register modal)
- Close button (X icon)

### 6.5 Register Modal

- Title: "Create Account"
- Fields: First Name, Last Name, Username, Email, Password, Confirm Password (all textboxes)
- Primary CTA: "CREATE ACCOUNT"
- Secondary link: "Sign in" (opens Sign In modal)
- Close button (X icon)

---

## 7. Design System & Visual Aesthetics

### 7.1 Color Palette

#### Primary Brand Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--brand-500` / `--primary` | `#F27A1A` | Primary brand color, CTAs, accents |
| `--brand-400` | `#F29441` | Lighter brand variant |
| `--brand-300` | `#F6B87B` | Light accent |
| `--brand-200` | `#FAD5AE` | Very light accent |
| `--brand-100` | `#FDECD7` | Lightest brand tint |
| `--brand-50` | `#FEF7EE` | Ultra-light brand background |
| `--brand-600` / `--primary-hover` | `#E36010` | Hover state |
| `--brand-700` | `#BC4A10` | Active/pressed |
| `--brand-800` | `#963B15` | Dark accent |
| `--brand-900` | `#7A3315` | Darkest brand |

#### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#FFFFFF` | Page background |
| `--foreground` | `#1A1A2E` | Primary text (dark navy-black) |
| `--foreground-secondary` | `#2D2D3A` | Secondary text |
| `--foreground-tertiary` | `#4A4A5A` | Tertiary/helper text |
| `--muted-foreground` | `#6B6B7B` | Muted text |
| `--muted` / `--secondary` | `#F5F5F7` | Muted backgrounds |
| `--border` | `#E8E8EC` | Default borders |
| `--border-subtle` | `#F0F0F3` | Subtle borders |
| `--input` | `#E8E8EC` | Input field borders |
| `--card` | `#FFFFFF` | Card backgrounds |
| `--accent` | `#FEF3E6` | Accent backgrounds |
| `--destructive` | `#EF4444` | Error/danger |

#### Vendor Colors

| Vendor | Color | Usage |
|--------|-------|-------|
| SolarWinds | `#7B8794` | Gray-slate |
| Securden | `#0EA5E9` | Sky blue |
| Quest | `#6366F1` | Indigo |
| Ivanti | `#EC4899` | Pink |

### 7.2 Typography

#### Font Families

| Role | Font Family | Fallback |
|------|-------------|----------|
| Sans-serif (primary) | `DM Sans` | `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` |
| Monospace (accents) | `Space Mono` | `SF Mono, Fira Code, monospace` |

**Design Principle:** DM Sans is used for all body text, headings, and UI elements. Space Mono is used strategically for:
- Navigation links (`font-mono text-sm font-medium uppercase tracking-wider`)
- Buttons (`font-mono text-sm font-semibold uppercase tracking-wider`)
- Overline/eyebrow labels (`font-mono text-xs uppercase tracking-widest`)
- Stats numbers (`font-mono tabular-nums`)
- Category filter tabs (`font-mono text-xs font-semibold uppercase tracking-wider`)
- Metadata values like durations, prices, counts

#### Type Scale

| Element | Size (Tailwind) | Responsive |
|---------|----------------|------------|
| H1 (Hero) | `text-4xl sm:text-5xl md:text-6xl lg:text-7xl` | 2.25rem → 4.5rem |
| H2 (Section) | `text-3xl md:text-4xl lg:text-5xl` | 1.875rem → 3rem |
| H3 (Card) | `text-xl` | 1.25rem |
| H4 (Sub-card) | `text-lg` | 1.125rem |
| Body large | `text-lg md:text-xl` | 1.125rem → 1.25rem |
| Body | `text-base` | 1rem |
| Body small | `text-sm` | 0.875rem |
| Caption/meta | `text-xs` | 0.75rem |
| Micro (overline) | `text-[10px]` | 0.625rem |

#### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Bold | 700 | Headings, numbers, prices |
| Semibold | 600 | Buttons, nav links, labels |
| Medium | 500 | Body text emphasis |
| Normal | 400 | Standard body text |

### 7.3 Spacing & Layout

#### Container

- Max width: `max-w-7xl` (80rem / 1280px)
- Horizontal padding: `px-4 sm:px-6 lg:px-8`
- Centered: `mx-auto`

#### Section Spacing

- Vertical padding: `py-16 md:py-24 lg:py-32`
- Section headers: `text-center mb-12` or `mb-14`

#### Grid System

| Breakpoint | Columns | Gap |
|-----------|---------|-----|
| Default (mobile) | 1-2 columns | `gap-6` |
| `md` (768px) | 2-3 columns | `gap-6` to `gap-12` |
| `lg` (1024px) | 3-4 columns | `gap-6` to `gap-8` |

### 7.4 Borders & Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | 0.5rem (8px) | Default, inputs |
| Rounded | `rounded-md` | Buttons, inputs |
| Rounded-lg | `rounded-lg` | Large buttons, cards |
| Rounded-xl | `rounded-xl` | Course cards |
| Rounded-full | `rounded-full` | Badges, pills, avatars |

### 7.5 Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)` | Subtle cards |
| `--shadow-md` | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)` | Elevated elements |
| `--shadow-lg` | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)` | Hover states |
| `--shadow-brand` | `0 4px 14px 0 rgba(242,122,26,0.39)` | Brand-colored shadow |

### 7.6 Visual Effects

- **Backdrop blur:** `backdrop-blur-md` on sticky header
- **Background opacity:** `bg-background/95` for semi-transparent header
- **Gradient overlays:** Multi-stop gradients on hero section
- **Grid patterns:** CSS background-image linear-gradient grid
- **Blur decorative elements:** `blur-3xl` on gradient circles

---

## 8. UI Component Library

### 8.1 Buttons

#### Primary Button
```css
/* Style tokens */
bg-brand-500 text-white hover:bg-brand-600 
shadow-md hover:shadow-lg hover:shadow-brand/30 hover:-translate-y-0.5
h-14 px-8 text-base rounded-lg 
font-mono font-semibold uppercase tracking-wider
transition-all duration-200
```

#### Secondary/Outline Button
```css
border-brand-500 text-brand-600 hover:bg-brand-500 hover:text-white hover:shadow-md
h-14 px-8 text-base rounded-lg border-2
font-mono font-semibold uppercase tracking-wider
transition-all duration-200
```

#### Ghost/Text Button
```css
text-brand-600 hover:bg-brand-50
h-11 px-6 py-2 rounded-md
font-mono text-sm font-semibold uppercase tracking-wider
```

#### Small Tag/Pill Button (Filter tabs)
```css
/* Active */
bg-primary text-white shadow-sm
/* Inactive */
bg-muted hover:bg-muted/80 text-foreground/70 hover:text-foreground
px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider
```

### 8.2 Cards

#### Course Card
- White background, border, rounded-xl
- Vendor color top bar (h-1.5)
- Hover: `-translate-y-1`, shadow, border color change
- Tags: Vendor badge (colored), Level badge (outlined), Featured badge (filled)
- Meta row: Duration, modules, rating (with icons)
- Price row: Current price + optional strikethrough + enrolled count

#### Vendor Card
- White background, border
- Top color bar (h-1, expands to h-2 on hover)
- Letter icon (vendor-colored square)
- Hover: border color, shadow, title color change

#### Feature/Value Card
- No explicit border/background on homepage (transparent)
- Icon + Title + Description layout

#### Testimonial Card
- Blockquote text
- Author info with initials circle

#### Training Session Card
- Vertical layout with vendor badge, course title, date, format, price
- Optional "SPOTS LEFT" urgency badge

### 8.3 Badges/Tags

#### Vendor Badge
```css
font-mono font-semibold uppercase tracking-widest
bg-[vendor-color]/8 text-[vendor-color] border-[vendor-color]/19
px-2 py-0.5 text-[10px] rounded-full
```

#### Level Badge
```css
font-mono font-semibold uppercase tracking-widest
border border-brand-500 text-brand-600
px-2 py-0.5 text-[10px] rounded-full
```

#### Featured Badge
```css
font-mono font-semibold uppercase tracking-widest
bg-brand-100 text-brand-700 border-brand-200
px-2 py-0.5 text-[10px] rounded-full
```

#### Topic Tag
```css
text-[10px] font-mono text-slate-500 bg-slate-100
px-2 py-0.5 rounded uppercase tracking-wider
```

### 8.4 Input Fields

```css
h-11 w-full border border-input bg-background
px-4 py-2 text-sm font-sans
placeholder:text-muted-foreground
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1
transition-colors duration-200
```

### 8.5 Modal/Dialog

- Overlay: Semi-transparent backdrop
- Content: Centered dialog with Close (X) button
- Title: Large heading (H2)
- Form fields stacked vertically
- Primary action button + toggle link to other auth modal

### 8.6 Toast Notifications (Sonner)

- Library: Sonner (data-sonner-toaster)
- Positioned: Fixed, bottom-right (default)
- Theme: Light (configurable dark)
- Animation: Slide up with fade, swipe to dismiss
- Types: success, error, warning, info

### 8.7 Navigation

#### Desktop Nav Link
```css
relative px-4 py-2 font-mono text-sm font-medium uppercase tracking-wider rounded-md
text-foreground-secondary hover:text-brand-600
transition-colors duration-200 hover:bg-brand-50/50
/* Animated underline pseudo-element */
after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 
after:w-0 after:h-0.5 after:bg-brand-500 
after:transition-all after:duration-300 after:rounded-full
hover:after:w-6
```

#### Mobile Menu
- Full-screen slide-in drawer
- Hamburger icon toggles to X (close)
- Navigation links stacked vertically
- SIGN IN and CREATE ACCOUNT buttons at bottom

### 8.8 Footer

- 4-column grid layout
- Logo + description + contact info + social icons (left)
- 4 link columns: Courses, Company, Resources, Support
- Copyright + legal links (bottom)

### 8.9 Icon System (Lucide React)

**25 unique icons used:**

| Icon | Usage |
|------|-------|
| `graduation-cap` | Logo, favicon |
| `log-in` | Sign In button |
| `user-plus` | Register button |
| `x` | Close modal |
| `chevron-right` | Breadcrumbs, expandable items |
| `arrow-right` | Card CTAs, general direction |
| `play` | View All Courses button |
| `search` | Search bar icon |
| `clock` | Duration meta |
| `chart-column` | Modules count meta |
| `star` | Rating (filled amber) |
| `users` | Enrolled count |
| `building-2` | Enterprise-First feature |
| `award` | Expert Instructors feature |
| `shield` | Official Certifications feature |
| `trending-up` | Measurable ROI feature |
| `calendar` | Training schedule |
| `monitor` | Hands-On Labs feature |
| `map-pin` | Location for in-person training |
| `briefcase` | Corporate/professional context |
| `headphones` | Support feature |
| `file-check` | Certification/document |
| `quote` | Testimonials |
| `mail` | Email link in footer |
| `phone` | Phone link in footer |

---

## 9. Animation & Interaction Design

### 9.1 CSS Custom Animations

| Animation | Duration | Timing | Trigger |
|-----------|----------|--------|---------|
| `fade-in-up` | 0.5s | ease-out | IntersectionObserver (scroll into view) |
| `fade-in` | 0.3s | ease-out | Modal open, general fade |
| `slide-in-left` | 0.4s | ease-out | Scroll-triggered |
| `slide-in-right` | 0.4s | ease-out | Scroll-triggered |
| `scale-in` | 0.3s | ease-out | Modal/card appearance |
| `pulse` | 2s | cubic-bezier(.4, 0, .6, 1) infinite | Hero badge dot |
| `spin` | 1s | linear infinite | Loading spinners |
| `ping` | 1s | cubic-bezier(0, 0, .2, 1) infinite | Notification pulse |

### 9.2 Scroll-Triggered Animations

Elements use IntersectionObserver to trigger entry animations when scrolling into view. The pattern observed:
```html
<div style="opacity: 1; transform: none;">
  <!-- Content that fades in when visible -->
</div>
```
Elements start with `opacity: 0` and `transform: translateY(20px)` and animate to `opacity: 1; transform: none`.

### 9.3 Hover Interactions

| Element | Hover Effect |
|---------|-------------|
| Nav links | Text color → brand-600, background tint, animated underline (0→24px) |
| Primary buttons | Background darkens, shadow enlarges, lift (-0.5px translateY), shadow gains brand color |
| Secondary buttons | Fills with brand color, text turns white, shadow appears |
| Course cards | Border lightens, shadow enlarges with brand tint, card lifts (-4px), title color change |
| Vendor cards | Top bar heightens (4→8px), border highlights, shadow, title color change, arrow slides right |
| Filter tabs | Background darkens, text color strengthens |
| Logo | Shadow enlarges, gains brand-colored shadow |
| Social icons | Standard link hover |
| Related course links | Implicit hover on card |

### 9.4 Transition Timing

- **Standard:** `transition-all duration-200` (buttons, inputs)
- **Cards:** `transition-all duration-300` or `transition-all duration-300 ease-out`
- **Navigation:** `transition-colors duration-200`
- **Underline:** `after:transition-all after:duration-300`

### 9.5 Smooth Scrolling

- Global: `scroll-behavior: smooth` on `<html>`
- Navigation links use anchor hrefs (`/#courses`, `/#solutions`, `/#contact`)
- Course cards link to separate pages

### 9.6 Modal Animations

- Backdrop: Fade in/out
- Content: Scale in (0.8 → 1) with fade
- Close: Reverse animation

---

## 10. Responsive Design Specification

### 10.1 Breakpoints

| Breakpoint | Tailwind | Min Width |
|-----------|----------|-----------|
| Default | (no prefix) | 0px |
| `sm` | `sm:` | 640px |
| `md` | `md:` | 768px |
| `lg` | `lg:` | 1024px |
| `xl` | `xl:` | 1280px |

### 10.2 Header Behavior

| Breakpoint | Behavior |
|-----------|----------|
| `lg+` (≥1024px) | Full nav visible, Sign In + Register buttons visible |
| `<lg` (<1024px) | Nav hidden, hamburger menu button, logo text only (no subtitle) |

### 10.3 Navigation

- **Desktop (≥1024px):** Horizontal nav bar with links and auth buttons
- **Mobile (<1024px):** Hamburger icon → Full-screen slide-in drawer

### 10.4 Hero Section Responsive

| Breakpoint | H1 Size | Layout |
|-----------|---------|--------|
| Default (<640px) | `text-4xl` (2.25rem) | Single column, centered CTAs stacked |
| `sm` (≥640px) | `text-5xl` (3rem) | CTAs row |
| `md` (≥768px) | `text-6xl` (3.75rem) | - |
| `lg` (≥1024px) | `text-7xl` (4.5rem) | - |

### 10.5 Grid Responsive Patterns

| Section | Mobile | Tablet (md) | Desktop (lg) |
|---------|--------|-------------|-------------|
| Stats bar | 2 cols | 4 cols | 4 cols |
| Vendor cards | 1 col | 2 cols | 4 cols |
| Course cards | 1 col | 2 cols | 3 cols |
| Feature cards | 1-2 cols | 2 cols | 3 cols |
| Footer links | 2 cols | 2 cols | 4 cols |

### 10.6 Mobile Observations

- Logo subtitle ("TRAINING EXCELLENCE") hidden below `sm`
- Sign In / Register buttons hidden below `md`
- Hamburger menu appears below `lg`
- Course filter tabs wrap naturally
- Touch-friendly button heights maintained
- Full-page scroll with all sections stacked vertically

---

## 11. Accessibility Analysis

### 11.1 Positive Practices

| Practice | Implementation |
|----------|---------------|
| Skip to content link | `sr-only focus:not-sr-only` with `focus:z-[100]` |
| Semantic HTML | Proper use of `<header>`, `<main>`, `<nav>`, `<footer>`, `<section>` |
| ARIA labels | `aria-label="Main navigation"`, `aria-label="Open menu"`, `aria-expanded="false"` |
| ARIA live region | Notification section with `aria-live="polite"` |
| Focus visible rings | `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring` |
| Tab navigation | Course detail page uses proper `tab` and `tabpanel` elements |
| Alt text | SVG icons have `aria-hidden="true"` |
| Landmarks | Banner, main, contentinfo, navigation landmarks |
| Heading hierarchy | Proper H1→H4 hierarchy |

### 11.2 Issues Identified

| Issue | Severity | Description |
|-------|----------|-------------|
| `overflow: hidden` on body | Medium | Body has `overflow: hidden` which may prevent scrolling in certain scenarios or screen reader access |
| No visible focus indicators by default | Medium | Focus styles rely on `:focus-visible` only; no visible focus for keyboard-only users without interaction |
| Color contrast on muted text | Low | Some `text-muted-foreground` (#6B6B7B) on white may not meet WCAG AA (4.5:1) for small text |
| Missing `alt` on footer social images | Low | Social media icon images lack explicit alt text |
| No ARIA current state on nav | Low | Active navigation link has no `aria-current="page"` indicator |
| Stats bar animation reliance | Low | Number animations may not be perceivable by users with reduced motion preferences |

---

## 12. UI/UX Gaps, Inconsistencies & Defects

### 12.1 Functional Defects

| # | Issue | Severity | Description |
|---|-------|----------|-------------|
| D1 | **Dead footer links** | High | Careers, Partners, and Blog are rendered as `<button>` elements (not links) and appear to have no click handlers or destinations. They provide no feedback when clicked. |
| D2 | **Inconsistent stat values** | Medium | Homepage stats show "15,000+ Professionals Trained" but About page shows "10,000+". This is a data inconsistency. |
| D3 | **Body overflow hidden** | Medium | `overflow: hidden` is permanently set on `<body>`, which may clip content on some browsers or prevent proper scrolling behavior. |
| D4 | **Course filter tabs non-functional** | Low | While filter tabs (ALL, DATABASE, etc.) appear clickable with active state toggling, the actual filtering behavior may be purely visual without proper data filtering. |

### 12.2 Design Inconsistencies

| # | Issue | Severity | Description |
|---|-------|----------|-------------|
| I1 | **Mixed CTA text casing** | Low | Some buttons use `uppercase tracking-wider` (EXPLORE SCP FUNDAMENTALS, SIGN IN) while "Schedule Consultation" and other section CTAs use the same style. However, in the Professional Services section, the CTA text is "SCHEDULE CONSULTATION" (uppercase) which is consistent. All buttons follow this pattern — no actual inconsistency found after re-examination. |
| I2 | **Vendor card letter ambiguity** | Low | Both SolarWinds and Securden use the letter "S" as their icon, which could be confusing visually without the card title. The distinct colors help differentiate but may still cause brief ambiguity. |
| I3 | **Feature cards lack visual container** | Low | "Why iTrust Academy" feature cards have no visible border or background on desktop, making them feel less like interactive elements compared to other card types on the page. |
| I4 | **Training calendar missing visual hierarchy** | Low | All 4 training sessions appear visually equal despite the first one having "4 SPOTS LEFT" urgency. The urgency indicator is subtle. |
| I5 | **Inconsistent heading accent styling** | Low | Some section H2s use `text-primary` to accent key words ("Training Across **Top Platforms**") while others don't ("Built for Enterprise Teams", "Beyond Standard Training"). |

### 12.3 UX Gaps

| # | Gap | Severity | Description |
|---|-------|----------|-------------|
| G1 | **No actual course filtering** | High | Category filter tabs toggle visual active states but there's no confirmed server-side filtering or URL-based state. Courses appear pre-loaded. |
| G2 | **No search functionality** | High | Search input exists visually but appears to be a non-functional placeholder. No search results or feedback mechanism observed. |
| G3 | **No authentication backend** | Medium | Sign In and Register modals collect data but there's no actual auth flow — forms appear static with no validation, submission, or error handling. |
| G4 | **No course enrollment flow** | Medium | "ENROLL NOW" buttons have no associated enrollment workflow, payment integration, or confirmation. |
| G5 | **No breadcrumb on homepage** | Low | Course detail page has a "Back to Courses" link, but there's no persistent breadcrumb trail across the site. |
| G6 | **No loading states** | Low | No skeleton screens, loading spinners, or progress indicators observed during page transitions. |
| G7 | **No dark mode** | Low | Despite Sonner toast library having dark theme support configured, the site has no dark mode toggle or preference detection. |
| G8 | **No favicon.ico** | Low | Only `favicon.svg` is linked; no fallback `.ico` for older browsers. |
| G9 | **No 404 page observed** | Low | No custom 404 error page was identified. |
| G10 | **No cookie consent banner** | Low | A "Cookie Policy" button exists in the footer but no cookie consent mechanism was observed on page load. |

---

## 13. Recommendations for Improvement

### 13.1 High Priority

1. **Implement Backend Services:** Connect authentication (Sign In / Register) to a real auth provider (e.g., Auth0, Firebase Auth, or custom JWT). Add form validation, error states, and session management.

2. **Enable Course Search & Filtering:** Wire the search input and category filter tabs to actual filtering logic. Consider implementing debounced search with instant results. Update URL query parameters for shareable filtered states.

3. **Build Enrollment Flow:** Create a multi-step enrollment process with:
   - Course selection confirmation
   - Session date picker
   - Participant information form
   - Payment integration (Stripe/PayPal)
   - Confirmation email/page

4. **Fix Dead Links:** Convert Careers, Partners, and Blog footer buttons to either functional links or remove them. At minimum, they should link to placeholder pages or show "Coming Soon" indicators.

5. **Resolve Data Inconsistencies:** Synchronize statistics between homepage and About page. Consider implementing a single source of truth for metrics (e.g., a shared constants file or CMS).

### 13.2 Medium Priority

6. **Add Loading & Error States:** Implement skeleton loading screens for course cards, page transition animations, and error boundary fallbacks. Use React Suspense for lazy-loaded routes.

7. **Enhance Accessibility:**
   - Add `aria-current="page"` to active navigation links
   - Verify WCAG AA color contrast ratios for all text combinations
   - Add `prefers-reduced-motion` media query to disable scroll animations
   - Ensure all interactive elements are keyboard accessible
   - Fix the `overflow: hidden` on body element

8. **Implement Dark Mode:** Leverage the existing CSS custom property architecture to add a dark theme. Add a toggle in the header and respect `prefers-color-scheme`.

9. **Add Breadcrumbs:** Implement a persistent breadcrumb navigation component, especially for the course detail page and any future nested pages.

10. **Enhance Training Calendar:** Add a proper calendar view (monthly/weekly) with visual indicators for availability. Consider integrating a date picker for filtering sessions.

### 13.3 Low Priority / Nice-to-Have

11. **Differentiate Vendor Icons:** Instead of using "S" for both SolarWinds and Securden, use unique icons or the vendor's actual logo mark. Similarly, consider using logos for Quest and Ivanti instead of letters.

12. **Add Animations to Feature Cards:** Give the "Why iTrust Academy" feature cards a subtle background, border, or icon accent to make them feel more interactive and consistent with other card components.

13. **Implement Cookie Consent:** Add a GDPR/privacy-compliant cookie consent banner that appears on first visit, with the "Cookie Policy" footer button linking to the full policy.

14. **Add Social Proof Enhancements:**
   - Partner/client logo carousel
   - Certification badge display
   - Instructor profiles with photos on course detail pages
   - Video testimonials

15. **Add Micro-interactions:**
   - Confetti or success animation on enrollment
   - Progress bar animation when scrolling through course curriculum
   - Counter animation for statistics (count up from 0)
   - Parallax effect on hero decorative elements

16. **SEO Improvements:**
   - Add structured data (JSON-LD) for courses, organization, and breadcrumbs
   - Implement proper meta tags for each page (currently only homepage has OG tags)
   - Add a sitemap.xml and robots.txt
   - Consider SSR or SSG (Next.js migration) for better SEO and initial load performance

17. **Performance Optimizations:**
   - Lazy-load course card images (when images are added)
   - Implement route prefetching for likely navigation targets
   - Add image optimization pipeline
   - Consider service worker for offline support

18. **Content Management:** Consider integrating a headless CMS (Contentful, Sanity, Strapi) to manage courses, sessions, testimonials, and other content without code deployments.

---

## 14. Appendices

### Appendix A: Lucide Icons Full Reference

```
graduation-cap, log-in, user-plus, x, chevron-right, arrow-right, play,
search, clock, chart-column, star, users, building-2, award, shield,
trending-up, calendar, monitor, map-pin, briefcase, headphones,
file-check, quote, mail, phone
```

### Appendix B: CSS Custom Properties Reference

```css
:root {
  /* Brand Colors */
  --brand-50: #FEF7EE;
  --brand-100: #FDECD7;
  --brand-200: #FAD5AE;
  --brand-300: #F6B87B;
  --brand-400: #F29441;
  --brand-500: #F27A1A;   /* Primary */
  --brand-600: #E36010;   /* Hover */
  --brand-700: #BC4A10;
  --brand-800: #963B15;
  --brand-900: #7A3315;

  /* Semantic Colors */
  --background: #FFFFFF;
  --foreground: #1A1A2E;
  --foreground-secondary: #2D2D3A;
  --foreground-tertiary: #4A4A5A;
  --muted-foreground: #6B6B7B;
  --muted: #F5F5F7;
  --border: #E8E8EC;
  --border-subtle: #F0F0F3;
  --card: #FFFFFF;
  --accent: #FEF3E6;
  --primary: #F27A1A;
  --primary-foreground: #FFFFFF;
  --primary-hover: #E36010;
  --primary-light: #FEF3E6;
  --destructive: #EF4444;
  --input: #E8E8EC;

  /* Typography */
  --font-sans: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "Space Mono", "SF Mono", "Fira Code", monospace;

  /* Shadows */
  --shadow-sm: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1);
  --shadow-brand: 0 4px 14px 0 rgba(242,122,26,0.39);

  /* Animations */
  --animate-fade-in: fade-in 0.3s ease-out forwards;
  --animate-fade-in-up: fade-in-up 0.5s ease-out forwards;
  --animate-slide-in-left: slide-in-left 0.4s ease-out forwards;
  --animate-slide-in-right: slide-in-right 0.4s ease-out forwards;
  --animate-scale-in: scale-in 0.3s ease-out forwards;
  --animate-pulse: pulse 2s cubic-bezier(.4, 0, .6, 1) infinite;

  /* Layout */
  --radius: 0.5rem;
}
```

### Appendix C: Meta Tags & SEO

```html
<title>iTrust Academy — Enterprise IT Training & Certification</title>
<meta name="description" content="Professional IT training and certification across SolarWinds, Securden, Quest, and Ivanti platforms.">
<link rel="canonical" href="https://itrustacademy.com/">
<meta property="og:type" content="website">
<meta property="og:title" content="iTrust Academy — Enterprise IT Training">
<meta property="og:description" content="Expert-led, hands-on training across SolarWinds, Securden, Quest, and Ivanti platforms.">
<meta property="og:url" content="https://itrustacademy.com/">
<meta property="og:site_name" content="iTrust Academy">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="iTrust Academy — Enterprise IT Training">
<meta name="twitter:description" content="Expert-led, hands-on training across SolarWinds, Securden, Quest, and Ivanti platforms.">
```

### Appendix D: Screenshots Captured

| File | Description |
|------|-------------|
| `01_homepage_full.png` | Full-page homepage screenshot (1920x1080) |
| `02_about_page.png` | About page full screenshot |
| `03_signin_modal.png` | Sign In modal overlay |
| `04_register_modal.png` | Register modal overlay |
| `05_course_detail.png` | Course detail page (SolarWinds NPM) |
| `06_mobile_homepage.png` | Mobile responsive view (iPhone 14, 390x844) |
| `07_mobile_menu.png` | Mobile hamburger menu open |
| `08_mobile_homepage.png` | Mobile homepage full scroll |

### Appendix E: File Assets Structure

```
/home/z/my-project/download/
├── Project_Requirements_Document.md  ← This document
├── 01_homepage_full.png
├── 02_about_page.png
├── 03_signin_modal.png
├── 04_register_modal.png
├── 05_course_detail.png
├── 06_mobile_homepage.png
├── 07_mobile_menu.png
└── 08_mobile_homepage.png
```

---

# https://chat.z.ai/s/04e3c054-a523-4ef8-872f-f46d98312eb2

