# iTrust Academy — Project Requirements Document (PRD)

## Complete Design Guide & Technical Specification

**Source Website**: `https://itrust-academy.jesspete.shop/`  
**Document Version**: 1.0  
**Analysis Date**: 31 March 2026  
**Prepared By**: Automated Deep-Research Analysis

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Overview — What & Why](#2-project-overview--what--why)
3. [Technology Stack & Architecture](#3-technology-stack--architecture)
4. [Design System & Visual Language](#4-design-system--visual-language)
5. [Page Architecture & Component Map](#5-page-architecture--component-map)
6. [Homepage — Section-by-Section Specification](#6-homepage--section-by-section-specification)
7. [Course Detail Page Specification](#7-course-detail-page-specification)
8. [About Page Specification](#8-about-page-specification)
9. [Navigation & Information Architecture](#9-navigation--information-architecture)
10. [Animations & Motion Design](#10-animations--motion-design)
11. [Responsive Design Specification](#11-responsive-design-specification)
12. [Interactive Behaviors & Micro-interactions](#12-interactive-behaviors--micro-interactions)
13. [SEO & Meta Configuration](#13-seo--meta-configuration)
14. [Accessibility Analysis](#14-accessibility-analysis)
15. [UI/UX Gaps, Inconsistencies & Defects](#15-uiux-gaps-inconsistencies--defects)
16. [Recommendations for Improvement](#16-recommendations-for-improvement)
17. [Appendix: Full Design Token Reference](#appendix-full-design-token-reference)

---

## 1. Executive Summary

iTrust Academy is a professional IT training and certification platform targeting enterprise teams and individual professionals across the Asia-Pacific region. The platform provides expert-led training programs for four major technology vendors: **SolarWinds**, **Securden**, **Quest**, and **Ivanti**. The website serves as the primary marketing and enrollment channel, featuring course catalogs, corporate training solutions, and a brand narrative centered on trust, expertise, and measurable outcomes.

The site is a **single-page application (SPA)** built with **Vite + React** using **Tailwind CSS v4** for styling, with **Lucide React** icons and **Sonner** for toast notifications. It features a modern, clean design aesthetic with an orange brand identity, strong typographic hierarchy, and scroll-triggered animations. The platform currently has three accessible routes: the **Homepage**, **Course Detail** pages, and the **About** page.

---

## 2. Project Overview — What & Why

### 2.1 What Is iTrust Academy?

iTrust Academy is an enterprise-focused IT training provider established (per footer) "since 2010" and headquartered at **1 Raffles Place, Tower 2, Singapore 048616**. The academy positions itself as **"Asia-Pacific's Premier IT Training Provider"** offering authorized training programs across four technology platforms. Key statistics displayed on the site include:

| Metric | Value |
|--------|-------|
| Professionals Trained | 15,000+ |
| Enterprise Clients | 500+ |
| Satisfaction Rate | 98% |
| Platform Partners | 4 |
| Total Courses Offered | 9 |
| Price Range | $1,799 – $2,999 USD |

### 2.2 Why Does This Platform Exist?

The platform exists to bridge the skills gap for IT professionals in the Asia-Pacific region by providing:

- **Authorized vendor training** for SolarWinds (network monitoring, SIEM, database performance), Securden (privileged access management, application access), Quest (Oracle database tools, Active Directory recovery), and Ivanti (endpoint management, IT service management)
- **Certification preparation** for the SolarWinds Certified Professional (SCP) exam and other vendor certifications
- **Corporate training solutions** including bootcamps, managed learning programs, skills assessments, and on-site training
- **Hands-on, practical learning** with expert instructors and real-world lab environments

### 2.3 Target Audiences

1. **Enterprise IT Teams** — Organizations seeking bulk training for network engineers, security analysts, database administrators, and IT service managers
2. **Individual IT Professionals** — Professionals seeking certification and career advancement through structured training programs
3. **HR/L&D Decision Makers** — Corporate learning & development leaders evaluating training vendors for their organizations

---

## 3. Technology Stack & Architecture

### 3.1 Core Technology Stack

| Layer | Technology | Evidence |
|-------|-----------|----------|
| **Build Tool** | Vite | Asset filenames follow Vite hashing pattern (e.g., `index-Bt0YrObR.js`) |
| **UI Framework** | React 18+ | JSX component structure, `lucide-react` usage, SPA routing |
| **CSS Framework** | Tailwind CSS v4 | Utility classes (`flex`, `gap-6`, `bg-brand-500`, `hover:shadow-lg`), `font-mono`, `text-muted-foreground` semantic tokens |
| **Icons** | Lucide React | `lucide lucide-graduation-cap`, `lucide-arrow-right`, etc. |
| **Toast Notifications** | Sonner | `data-sonner-toaster` CSS present in styles |
| **Fonts** | Google Fonts (DM Sans + Space Mono) | Preconnect links to `fonts.googleapis.com` |
| **Analytics** | Cloudflare Web Analytics | `beacon.min.js` from `static.cloudflareinsights.com` |
| **Hosting** | Cloudflare Pages / Workers | URL structure and H3 protocol support |
| **Routing** | Client-side SPA routing | Hash-based navigation with `/#courses`, `/#solutions`, `/#contact`; dedicated routes for `/about` and `/courses/:slug` |

### 3.2 Asset Architecture

```
/assets/
  index-Bt0YrObR.js          # Main entry bundle
  index-ChFSDcsF.css         # Main stylesheet
  home-glRTGCTp.js           # Home page lazy-loaded chunk
  courses-Bg354NHO.js        # Courses module chunk
  container-CfjxpNqv.js      # Shared container component
  button-CfCSiaQJ.js         # Button component chunk
  award-6TYcxrmE.js          # Award icon chunk
  star-Bml4JGb-.js           # Star icon chunk
  trending-up-C-7QckVG.js    # Trending icon chunk
  users-BKX_aWpK.js          # Users icon chunk
  createLucideIcon-OiqTUq2H.js  # Lucide icon factory
/favicon.svg                 # SVG favicon
```

### 3.3 Application Architecture

The app follows a **component-based SPA architecture**:

- **Root Layout**: `min-h-screen flex flex-col` — full-height flex column with header, main, and footer
- **Routing**: Client-side with React Router (SPA) — homepage sections accessed via `/#hash`, dedicated pages via `/about`, `/courses/:slug`
- **Code Splitting**: Lazy-loaded chunks for home page, courses module, and shared components (evidenced by `modulepreload` links)
- **State Management**: Likely React state/local state (no evidence of Redux/Zustand in the bundle)

---

## 4. Design System & Visual Language

### 4.1 Color System — CSS Custom Properties (:root)

```css
:root {
  /* Backgrounds */
  --background: #fff;
  --background-secondary: #fafafa;
  --background-tertiary: #f5f5f5;

  /* Foregrounds (Text) */
  --foreground: #1a1a2e;
  --foreground-secondary: #2d2d3a;
  --foreground-tertiary: #4a4a5a;

  /* Cards */
  --card: #fff;
  --card-foreground: #1a1a2e;
  --card-border: #e8e8ec;

  /* Popovers */
  --popover: #fff;
  --popover-foreground: #1a1a2e;

  /* Primary (Brand Orange) */
  --primary: #f27a1a;
  --primary-foreground: #fff;
  --primary-hover: #e36010;
  --primary-light: #fef3e6;

  /* Secondary */
  --secondary: #f5f5f7;
  --secondary-foreground: #1a1a2e;

  /* Muted */
  --muted: #f5f5f7;
  --muted-foreground: #6b6b7b;

  /* Accent */
  --accent: #fef3e6;
  --accent-foreground: #1a1a2e;

  /* Destructive */
  --destructive: #ef4444;
  --destructive-foreground: #fff;

  /* Borders & Inputs */
  --border: #e8e8ec;
  --border-subtle: #f0f0f3;
  --input: #e8e8ec;

  /* Ring (Focus) */
  --ring: #f27a1a;

  /* Shadows */
  --shadow-color: 220 3% 15%;
  --shadow-strength: 1%;
}
```

### 4.2 Brand Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| **Primary Brand** | `#f27a1a` | CTAs, links, highlights, active states, logo background |
| **Primary Hover** | `#e36010` | Hover states for primary elements |
| **Primary Light** | `#fef3e6` | Badge backgrounds, accent areas |
| **Primary 50** | (brand-50) | Very subtle brand tint for gradients |
| **Primary 100** | `#fff7ed` (approx) | Light brand backgrounds |
| **SolarWinds Vendor** | `rgb(123, 135, 148)` | Top accent bars, category badges — neutral slate |
| **Securden Vendor** | `rgb(14, 165, 233)` | Top accent bars, category badges — sky blue |
| **Quest Vendor** | `rgb(99, 102, 241)` | Top accent bars, category badges — indigo |
| **Ivanti Vendor** | `rgb(236, 72, 153)` | Top accent bars, category badges — pink |

### 4.3 Typography System

#### Font Families

| Role | Font | Fallback | Usage |
|------|------|----------|-------|
| **Primary (Sans)** | `DM Sans` | `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | Body text, headings, UI elements |
| **Monospace (Accent)** | `Space Mono` | `monospace` | Labels, badges, metadata, stat numbers, button text, nav links |

#### Type Scale

| Element | Tailwind Class | Approx. Size | Weight | Font |
|---------|---------------|-------------|--------|------|
| **Hero H1** | `text-7xl` | 72px | 700 (bold) | DM Sans |
| **Section H2** | `text-5xl` | 48px | 700 (bold) | DM Sans |
| **Sub-section H3** | `text-xl` | 20px | 700 (bold) | DM Sans |
| **Card H3** | `text-lg` | 18px | 700 (bold) | DM Sans |
| **Body Large** | `text-lg` | 18px | 400 | DM Sans |
| **Body** | `text-sm` | 14px | 400 | DM Sans |
| **Nav Links** | `text-sm` | 14px | 500 (medium) | Space Mono |
| **Buttons** | `text-sm / text-base` | 14/16px | 600 (semibold) | Space Mono |
| **Badge/Label** | `text-[10px] / text-xs` | 10/12px | 600-700 | Space Mono |
| **Stat Numbers** | `text-5xl` | 48px | 700 (bold) | Space Mono |
| **Footer Heading** | `text-sm` | 14px | 700 (bold) | DM Sans |
| **Caption** | `text-xs` | 12px | 400 | DM Sans |

#### Key Typography Traits

- **Uppercase + Letter-Spacing** on all monospace elements (navigation, buttons, badges, section labels) using `uppercase tracking-wider` or `tracking-widest`
- **Line Heights**: Hero uses `leading-[1.1]` (tight), body uses `leading-relaxed` (1.625)
- **Tracking**: `tracking-tight` on headings, `tracking-widest` on micro-labels

### 4.4 Spacing System

The site follows Tailwind's default spacing scale:

| Context | Token | Value |
|---------|-------|-------|
| **Section Padding (Vertical)** | `py-16 md:py-24 lg:py-32` | 64px / 96px / 128px |
| **Container Padding (Horizontal)** | `px-4 sm:px-6 lg:px-8` | 16px / 24px / 32px |
| **Max Content Width** | `max-w-7xl` | 1280px |
| **Card Padding** | `p-6` or `p-8` | 24px or 32px |
| **Card Gap** | `gap-6` | 24px |
| **Element Gap (Internal)** | `gap-2` to `gap-4` | 8px to 16px |
| **Margin Between Sections** | `mb-8` to `mb-14` | 32px to 56px |

### 4.5 Border & Radius System

| Context | Value |
|---------|-------|
| **Card Border** | `border border-border` (1px solid #e8e8ec) |
| **Border Radius (Cards)** | `rounded-xl` (12px) |
| **Border Radius (Buttons)** | `rounded-lg` (8px) |
| **Border Radius (Badges)** | `rounded-full` (9999px) |
| **Border Radius (Logo)** | `rounded-lg` (8px) |
| **Border Radius (Inputs)** | Default (no explicit rounding — browser default, likely 0px or very small) |
| **Subtle Border** | `border-border-subtle` (#f0f0f3) — used for dividers |

### 4.6 Shadow System

| Context | Classes |
|---------|---------|
| **Primary Button** | `shadow-md hover:shadow-lg hover:shadow-brand/30` |
| **Logo** | `shadow-md group-hover:shadow-lg group-hover:shadow-brand-500/20` |
| **Card Hover** | `hover:shadow-lg hover:shadow-brand-500/5` |
| **Filter Button (Active)** | `shadow-sm` |
| **Footer Logo** | `shadow-lg shadow-brand-500/20` |
| **Hero Decorative** | `blur-3xl` (CSS filter blur, not box-shadow) |

### 4.7 Icon System

All icons use **Lucide React** with consistent sizing:

| Context | Size Class | Stroke |
|---------|-----------|--------|
| **Logo Icon** | `h-5 w-5` (20px) | 2 |
| **Nav/Button Icons** | `h-4 w-4` (16px) | 2 |
| **Card Metadata Icons** | `w-3.5 h-3.5` (14px) | 2 |
| **Sidebar/Course Detail Icons** | `w-5 h-5` (20px) | 2 |
| **Footer Social Icons** | `w-5 h-5` (20px) | 2 |
| **Feature Section Icons** | Large (implied by layout) | 2 |

Key icons used: `graduation-cap` (logo), `arrow-right`, `play`, `log-in`, `user-plus`, `menu`, `x`, `clock`, `chart-column`, `star`, `users`, `search`, `check-circle`, `award`, `share-2`, `mail`, `phone`, `map-pin`, `book-open`, `arrow-left`

---

## 5. Page Architecture & Component Map

### 5.1 Page Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Homepage | Landing page with hero, stats, vendors, courses, features, calendar, solutions, CTA, and footer |
| `/#courses` | Courses Section | Hash-anchor to courses section on homepage |
| `/#solutions` | Solutions Section | Hash-anchor to solutions section on homepage |
| `/#contact` | Contact Section | Hash-anchor to contact CTA on homepage |
| `/about` | About Page | Company mission, story, values, and CTA |
| `/courses/:slug` | Course Detail | Individual course page with tabs (Overview, Curriculum, Instructor, Certification) |
| `/faq` | FAQ | Referenced in footer (likely placeholder) |
| `/privacy` | Privacy Policy | Referenced in footer |
| `/terms` | Terms of Service | Referenced in footer |

### 5.2 Shared Layout Components

```
┌──────────────────────────────────────────┐
│  Notification Region (aria-live)         │
├──────────────────────────────────────────┤
│  Header (fixed, z-50)                    │
│  ├── Logo (link to /)                    │
│  ├── Desktop Nav (hidden lg:flex)        │
│  │   ├── Courses (→ /#courses)           │
│  │   ├── Solutions (→ /#solutions)       │
│  │   ├── About (→ /about)                │
│  │   └── Contact (→ /#contact)           │
│  ├── Auth Buttons                        │
│  │   ├── Sign In (hidden md:inline-flex) │
│  │   └── Register (hidden md:inline-flex)│
│  └── Mobile Menu Toggle (lg:hidden)      │
├──────────────────────────────────────────┤
│  Main Content (flex-1)                   │
│  [Page-specific content here]            │
├──────────────────────────────────────────┤
│  Footer                                 │
│  ├── Brand Column (4 cols)               │
│  │   ├── Logo + Tagline                  │
│  │   ├── Description                     │
│  │   ├── Contact Info (email, phone,     │
│  │   │   address)                        │
│  │   └── Social Links (LinkedIn, Twitter,│
│  │       YouTube)                        │
│  ├── Link Columns (8 cols, 4 sub-cols)  │
│  │   ├── Courses links                   │
│  │   ├── Company links                   │
│  │   ├── Resources links                 │
│  │   └── Support links                   │
│  └── Bottom Bar                          │
│      ├── Copyright                       │
│      └── Legal Links                     │
└──────────────────────────────────────────┘
```

---

## 6. Homepage — Section-by-Section Specification

### 6.1 Hero Section

**Purpose**: Primary brand statement and conversion gateway

**Layout**:
- **Height**: `min-h-[90vh]` (90% viewport height minimum)
- **Background**: White (`bg-background`) with layered decorative elements:
  - Subtle gradient: `bg-gradient-to-br from-background via-background to-brand-50/30`
  - Grid pattern overlay: `bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-50` — creates a faint 4rem × 4rem grid
  - Top-right blur circle: `bg-brand-400/10 rounded-full blur-3xl` (w-72, positioned top-20 right-20)
  - Bottom-left blur circle: `bg-brand-300/5 rounded-full blur-3xl` (w-96, positioned bottom-20 left-10)
- **Content Width**: `max-w-4xl` within `max-w-7xl` container

**Content**:
1. **Badge/Pill**: "Asia-Pacific's Premier IT Training Provider" — monospace, uppercase, rounded-full, brand-100 background, brand-700 text, with a `animate-pulse` dot indicator (w-2, h-2, bg-brand-500)
2. **Headline H1**: "Advance Your IT Career. Get Certified." — Three lines, bold, with "Certified." in brand-500 color and a decorative SVG underline (hand-drawn curve path, opacity 0.3, stroke #f27a1a)
3. **Subheadline**: Brand description paragraph — muted tertiary color, max-w-2xl
4. **CTA Buttons** (side by side on desktop, stacked on mobile):
   - Primary: "Explore SCP Fundamentals" — solid brand-500, with arrow-right icon, hover: -translate-y-0.5
   - Secondary: "View All Courses" — outlined (border-2 brand-500), with play icon, hover: fill brand-500 with white text
5. **Stats Bar**: 4-column grid below a border-top divider:
   - "4 Technology Vendors"
   - "5+ Training Programs"
   - "Asia-Wide Training Coverage"
   - "SCP Certification Prep"
   - All values in brand-500 bold, labels in muted-foreground

### 6.2 Social Proof / Stats Bar

**Purpose**: Build credibility with key metrics

**Layout**:
- **Padding**: `py-16 md:py-20`
- **Background**: `bg-muted/30` (semi-transparent muted) with `border-y border-border`
- **Grid**: 4 columns (2 on mobile, 4 on desktop) with `gap-8 md:gap-12`

**Content**:
| Metric | Value | Label |
|--------|-------|-------|
| Professionals Trained | 15,000+ | Monospace, tabular-nums |
| Enterprise Clients | 500+ | Monospace, tabular-nums |
| Satisfaction Rate | 98% | Monospace, tabular-nums |
| Platform Partners | 4 | Monospace, tabular-nums |

**Typography**: Values in `text-3xl sm:text-4xl md:text-5xl font-bold text-primary font-mono tabular-nums`; labels in `text-sm text-muted-foreground font-medium`

### 6.3 Platform Partners / Solutions Section

**Purpose**: Showcase technology vendor partnerships

**Layout**:
- **ID**: `#solutions`
- **Padding**: `py-16 md:py-24 lg:py-32`
- **Background**: `bg-muted/30`

**Content**:
- **Section Label**: "Platform Partners" — monospace, uppercase, text-xs, tracking-widest, text-primary
- **Section H2**: "Training Across Top Platforms" — bold, with "Top Platforms" in text-primary
- **Description**: "Authorized training programs for the IT platforms that power modern enterprises."
- **Partner Cards**: 4-column grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`), `gap-6`

**Partner Card Structure**:
```
┌─────────────────────────┐
│ ▬▬▬▬▬▬▬▬▬ (colored bar)│  ← absolute top, h-1, expands to h-2 on hover
│                         │
│  ┌──────┐               │
│  │  S   │  ← 4×4 (w-16 h-16) colored square with white letter
│  └──────┘               │
│                         │
│  Vendor Name            │  ← text-xl, bold
│  Vendor description     │  ← text-sm, muted
│                         │
│  3 courses    →         │  ← course count + arrow icon
└─────────────────────────┘
```

**Vendor Colors**:
| Vendor | Letter | Background | Description |
|--------|--------|-----------|-------------|
| SolarWinds | S | `rgb(123, 135, 148)` (slate) | IT infrastructure monitoring & management |
| Securden | S | `rgb(14, 165, 233)` (sky blue) | Privileged access & password management |
| Quest | Q | `rgb(99, 102, 241)` (indigo) | Database & identity management |
| Ivanti | I | `rgb(236, 72, 153)` (pink) | Endpoint & service management |

**Hover Effects**: `hover:border-primary/50 hover:shadow-lg`, top bar expands from h-1 to h-2, arrow icon translates right by 4px

**Note**: Cards are rendered as `<button>` elements, not links — potential accessibility concern.

### 6.4 Courses Section

**Purpose**: Main course catalog with search and filtering

**Layout**:
- **ID**: `#courses`
- **Padding**: `py-16 md:py-24 lg:py-32`
- **Background**: `bg-background` (white)

**Content**:
- **Section Label**: "Our Programs"
- **Section H2**: "Industry-Leading Training"
- **Description**: "Expert-led, hands-on courses designed for enterprise IT teams seeking excellence across top platforms."

**Filter Bar**:
- **Search**: Text input with search icon, `max-w-md mx-auto`, placeholder "Search courses..."
- **Filter Buttons**: Horizontal wrap with `gap-2`:
  - "All" (active state: `bg-primary text-white shadow-sm`)
  - "Database", "Endpoint Management", "IT Service Management", "Network Monitoring", "Security" (inactive: `bg-muted text-foreground/70`)
  - All buttons use monospace, uppercase, tracking-wider, text-xs, semibold

**Course Card Grid**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, `gap-6`

**Course Card Structure**:
```
┌──────────────────────────────┐
│ ▬▬▬▬▬▬▬▬▬ (vendor color bar)│  ← h-1.5 colored accent
│                              │
│  [Network Monitoring] [INT.] [Featured] │  ← badges (top-right: "Featured")
│                              │
│  Course Title                │  ← text-lg, bold, line-clamp-2
│  Course subtitle/description │  ← text-sm, brand-600
│                              │
│  🕐 5 weeks  📊 12 modules  ⭐ 4.9 │  ← metadata row
│                              │
│  ─────────────────────       │  ← border-top
│  $2,499   ~~$3,299~~  👥1,847│  ← price + enrollment
│                              │
│  [Network Monitoring]        │  ← tag pill(s)
└──────────────────────────────┘
```

**Course Data Model** (9 courses total):

| # | Course | Vendor | Category | Level | Duration | Modules | Rating | Price | Enrolled | Featured |
|---|--------|--------|----------|-------|----------|---------|--------|-------|----------|----------|
| 1 | SolarWinds Network Performance Monitor | SolarWinds | Network Monitoring | Intermediate | 5 weeks | 12 | 4.9 | $2,499 ($3,299) | 1,847 | ✓ |
| 2 | Securden Privileged Access Management | Securden | Security | Advanced | 4 weeks | 10 | 4.8 | $2,999 | 923 | ✓ |
| 3 | Quest TOAD for Oracle | Quest | Database | Intermediate | 3 weeks | 8 | 4.7 | $1,999 ($2,499) | 2,156 | — |
| 4 | Ivanti Endpoint Manager | Ivanti | Endpoint Mgmt | Intermediate | 4 weeks | 10 | 4.8 | $2,299 | 1,432 | ✓ |
| 5 | SolarWinds Security Event Manager | SolarWinds | Network Monitoring | Advanced | 5 weeks | 11 | 4.6 | $2,799 | 756 | — |
| 6 | Securden Application Access Manager | Securden | Security | Advanced | 3 weeks | 7 | 4.9 | $2,599 | 489 | — |
| 7 | Quest Recovery Manager for AD | Quest | Database | Intermediate | 3 weeks | 8 | 4.7 | $2,199 | 1,087 | — |
| 8 | Ivanti Service Management (ITSM) | Ivanti | Endpoint Mgmt | Beginner | 4 weeks | 9 | 4.8 | $1,799 ($2,299) | 1,678 | ✓ |
| 9 | SolarWinds Database Performance Analyzer | SolarWinds | Network Monitoring | Advanced | 4 weeks | 9 | 4.5 | $2,699 | 634 | — |

**Card Hover**: `hover:border-brand-200 hover:shadow-lg hover:shadow-brand-500/5 hover:-translate-y-1` — lift effect with brand shadow

**CTA**: "View Full Training Calendar" button below grid

### 6.5 Features / "Built for Enterprise Teams" Section

**Purpose**: Differentiate from competitors with key value propositions

**Layout**:
- **Background**: Implied from context (continues from courses section or has own section)
- **Grid**: 6 feature cards in responsive grid

**Feature Items** (headings only from accessibility tree):
1. Enterprise-First
2. Expert Instructors
3. Official Certifications
4. Flexible Formats
5. Hands-On Labs
6. Measurable ROI

### 6.6 Training Calendar Section

**Purpose**: Highlight upcoming scheduled courses

**Layout**:
- **Section H2**: "Training Calendar"
- **Cards**: Listed course names with "ENROLL NOW" buttons:
  1. SolarWinds Network Performance Monitor
  2. Securden Privileged Access Management
  3. Ivanti Endpoint Manager
  4. Quest TOAD for Oracle
- **CTA**: "View Full Training Calendar" button

### 6.7 Solutions / "Beyond Standard Training" Section

**Purpose**: Showcase corporate training services

**Layout**:
- **Section H2**: "Beyond Standard Training"
- **CTA**: "Schedule Consultation" button
- **Solution Cards** (4 cards):
  1. Corporate Training
  2. Certification Bootcamps
  3. Managed Learning
  4. Skills Assessment

### 6.8 Testimonials / Social Proof Section

**Purpose**: Build trust through customer validation

**Layout**:
- **Section H2**: "Trusted by Industry Leaders"
- **Content**: Logo-based social proof (specific content captured in full HTML)

### 6.9 Final CTA Section

**Purpose**: Drive conversion with enterprise inquiry prompt

**Layout**:
- **Section H2**: "Ready to Upskill Your IT Team?"
- **CTA Buttons** (side by side):
  1. "Request Corporate Demo" — Primary button style
  2. "Contact Sales" — Secondary button style

### 6.10 Footer

**Structure**: Full-width footer with dark theme variant support (`dark:bg-slate-900`)

**Brand Column** (lg:col-span-4):
- Logo + tagline "Enterprise IT Training Excellence"
- Description paragraph: "Empowering IT professionals with industry-leading training and certifications since 2010."
- Contact information:
  - Email: info@itrustacademy.com
  - Phone: +65 1234 5678
  - Address: 1 Raffles Place, Tower 2, Singapore 048616
- Social links: LinkedIn, Twitter/X, YouTube (32×32 icon buttons with hover fill effect)

**Link Columns** (lg:col-span-8, 4 sub-columns):

| Courses | Company | Resources | Support |
|---------|---------|-----------|---------|
| SolarWinds Training | About Us | FAQ | Help Center |
| Securden Certification | Careers | Certification Guide | Contact Support |
| Quest Database Courses | Partners | Case Studies | Training Calendar |
| Ivanti ITAM | Blog | Webinars | Corporate Inquiries |

**Bottom Bar**:
- Left: "© 2026 iTrust Academy. All rights reserved."
- Right: Privacy Policy | Terms of Service | Cookie Policy

---

## 7. Course Detail Page Specification

### 7.1 Layout

**Structure**: Two-column grid (`lg:grid-cols-3`) — content area (2/3) + sidebar (1/3)

**Content Area** (lg:col-span-2):
1. **Breadcrumb**: "← Back to Courses" link
2. **Header Block**:
   - Vendor badge (colored), Level badge (outlined), Featured badge
   - Course title (H1, `text-3xl md:text-4xl font-bold`)
   - Subtitle
3. **Metadata Bar**: Duration, modules, enrolled count, rating — displayed in a `bg-muted/50 rounded-xl` container
4. **Tab Navigation**: "Overview" | "Curriculum" | "Instructor" | "Certification" — underline tab style with brand-500 active state
5. **Tab Content** (Overview shown):
   - Course Description section
   - "What You'll Learn" — 2-column grid with check-circle icons
   - Prerequisites — bulleted list with brand-500 dots
   - Topics Covered — tag pills
6. **Related Courses**: 3-column grid of related course cards

**Sidebar** (lg:col-span-1):
- **Sticky** positioned (`sticky top-24`)
- **Price Card** (`bg-card border border-border rounded-xl p-6`):
  - Price with strikethrough original: `$2,499 ~~$3,299~~`
  - "Save $800" badge (green)
  - "Enroll Now" primary button (full width)
  - "Request Demo" outlined button (full width)
  - "Share Course" text link
  - Divider
  - "This Course Includes": 5 days, 12 modules, certificate, lifetime access
  - Divider
  - "Topics Covered": Tag pills

### 7.2 Key Observations

- **Duration inconsistency**: Homepage cards say "5 weeks" but course detail page says "5 days" — a data consistency defect
- **Tab interaction**: Tabs are implemented as `<button>` elements with `role="tab"` and `aria-selected` — good accessibility pattern
- **Sticky sidebar**: Remains visible while scrolling through course content — good UX for conversion

---

## 8. About Page Specification

### 8.1 Layout

**Sections**:
1. **Page Header**: "About iTrust Academy" (H1)
2. **Our Mission** (H2)
3. **Our Story** (H2)
4. **Our Values** (H2) — Grid of value cards:
   - Excellence
   - Partnership
   - Regional Focus
   - Results-Driven
   - Student Success
   - Innovation
5. **CTA Section**: "Ready to Start Your Journey?" with "Browse Courses" button

---

## 9. Navigation & Information Architecture

### 9.1 Primary Navigation

| Label | Target | Type |
|-------|--------|------|
| Courses | `/#courses` | Hash anchor (scrolls on homepage) |
| Solutions | `/#solutions` | Hash anchor (scrolls on homepage) |
| About | `/about` | Dedicated page route |
| Contact | `/#contact` | Hash anchor (scrolls on homepage) |

### 9.2 Navigation UX Details

- **Desktop**: Horizontal nav with items spaced by `gap-1`, monospace font, uppercase, `tracking-wider`
- **Hover effect**: Text changes to `text-brand-600`, background shows `bg-brand-50/50`, and a brand-500 underline bar animates in (pseudo-element `after`, from `w-0` to `w-6`)
- **Mobile**: Hamburger menu (`lucide-menu` icon) triggers a full-screen overlay slide-in panel with nav links, Sign In, and Create Account buttons
- **Header behavior**: Fixed position (`fixed top-0`), transparent background initially, transitions to solid on scroll (class `transition-all duration-300 bg-transparent` suggests scroll-based background change)
- **Active state**: No visible active/selected state indicator on desktop nav links (defect)

### 9.3 Mobile Menu

- Triggered by hamburger button (visible at `lg:hidden` breakpoint, below 1024px)
- Opens full-screen overlay with:
  - Close button (X icon)
  - Logo repeat
  - Navigation links (uppercase, larger tap targets)
  - "SIGN IN" and "CREATE ACCOUNT" buttons
- Uses `z-50` stacking context
- Overlay has click-outside-to-close behavior (inferred from `generic` clickable wrapper)

---

## 10. Animations & Motion Design

### 10.1 Scroll-Triggered Fade-In-Up Animation

**Most prevalent animation across the site.** Elements below the fold initially render with:

```css
opacity: 0;
transform: translateY(20px);
```

These animate to `opacity: 1; transform: none` when they enter the viewport — implemented via an **Intersection Observer** (React component). The animation appears to use a staggered delay for grid items.

**Affected Elements**:
- Section labels and headings
- Stat numbers
- Platform partner cards
- Course cards (grid items)
- Feature items
- CTA buttons and text
- Training calendar cards

**Characteristics**:
- Duration: Approximately 600ms (estimated)
- Easing: Ease-out (cubic-bezier curve)
- Stagger: ~100-150ms between grid items
- Trigger: When element enters viewport (IntersectionObserver with threshold)

### 10.2 Pulse Animation

**Usage**: The green dot indicator in the hero badge ("Asia-Pacific's Premier IT Training Provider")

```css
.animate-pulse
```

- Duration: 2000ms (2s)
- Infinite iteration
- Used for: Attention-drawing "live" indicator

### 10.3 Hover Micro-Animations

| Element | Animation | CSS |
|---------|-----------|-----|
| Primary CTA button | Lift up + shadow grow | `hover:-translate-y-0.5 hover:shadow-lg` |
| Arrow icons | Translate right | `group-hover:translate-x-1 transition-transform` |
| Course cards | Lift + shadow | `hover:-translate-y-1 hover:shadow-lg` |
| Partner card top bar | Height expand | `h-1 → h-2` |
| Partner card arrow | Translate right + color change | `group-hover:translate-x-1 group-hover:text-primary` |
| Logo icon | Shadow expand | `group-hover:shadow-lg group-hover:shadow-brand-500/20` |
| Nav links | Underline grow | `after:w-0 → hover:after:w-6` |
| Outlined buttons | Fill on hover | `hover:bg-brand-500 hover:text-white` |
| Social icons | Background fill | `hover:bg-brand-500 hover:text-white` |

### 10.4 Loading/Skeleton State

Course cards display skeleton loading state before content loads:
```html
<div class="h-96 bg-muted animate-pulse rounded-xl"></div>
```

This shows 6 placeholder cards with a pulsing animation while course data is being fetched.

### 10.5 Page Transition

Header background transitions from transparent to solid on scroll — `transition-all duration-300`.

---

## 11. Responsive Design Specification

### 11.1 Breakpoints

| Breakpoint | Tailwind | Min Width | Behavior |
|-----------|----------|-----------|----------|
| **xs** | Default | 0px | Single column, stacked layout |
| **sm** | `sm:` | 640px | Some elements expand (2-col stats, badge visible) |
| **md** | `md:` | 768px | Auth buttons appear, 4-col stats, 2-col grids, sidebar layouts |
| **lg** | `lg:` | 1024px | Desktop nav appears, mobile menu hidden, 3-col grids |
| **xl** | `xl:` | 1280px | Larger type sizes (text-7xl hero, text-5xl stats) |

### 11.2 Responsive Adaptations by Component

**Header**:
- Mobile: Logo + hamburger only, h-16
- Desktop: Logo + nav + auth buttons, h-20 (md:h-20)

**Hero**:
- Mobile: text-4xl (36px) headline, stacked CTAs, 2-col stat grid (center-aligned)
- Tablet: text-5xl (48px)
- Desktop: text-7xl (72px), side-by-side CTAs, 4-col stat grid (left-aligned)

**Stats Bar**:
- Mobile: 2×2 grid (grid-cols-2)
- Desktop: 4-column grid

**Partner Cards**:
- Mobile: 1 column
- Tablet: 2 columns (sm:grid-cols-2)
- Desktop: 4 columns (lg:grid-cols-4)

**Course Cards**:
- Mobile: 1 column, full width
- Tablet: 2 columns (md:grid-cols-2)
- Desktop: 3 columns (lg:grid-cols-3)

**Course Detail Page**:
- Mobile: Single column (sidebar below content)
- Desktop: 3-column grid (2 content + 1 sidebar, lg:grid-cols-3)

**Footer**:
- Mobile: Stacked columns
- Desktop: 4+8 grid (lg:grid-cols-12)

**Typography Scaling**:
- Hero H1: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
- Stats: `text-3xl sm:text-4xl md:text-5xl`
- Section H2: `text-3xl md:text-4xl lg:text-5xl`

### 11.3 Container Behavior

```css
max-w-7xl (1280px) with mx-auto centering
Padding: px-4 (16px) → sm:px-6 (24px) → lg:px-8 (32px)
```

---

## 12. Interactive Behaviors & Micro-interactions

### 12.1 Course Filtering

- **Filter buttons** toggle category filtering
- Active state: `bg-primary text-white shadow-sm`
- Inactive state: `bg-muted text-foreground/70`
- Search input allows text-based filtering
- **Note**: The web-reader extracted HTML shows filter categories as "All, SolarWinds, Securden, Quest, Ivanti" while the interactive snapshot shows "All, Database, Endpoint Management, IT Service Management, Network Monitoring, Security" — this inconsistency suggests the filtering system may have been updated between the server-rendered and client-hydrated states, or the filters may be contextually different.

### 12.2 Tab Navigation (Course Detail)

- Implemented with `role="tab"` and `aria-selected` attributes
- Active tab: `border-b-2 border-brand-500 text-brand-600`
- Inactive tab: `border-b-2 border-transparent text-muted-foreground`
- Hover: `hover:text-foreground hover:border-muted`
- Tabs: Overview, Curriculum, Instructor, Certification

### 12.3 Mobile Menu

- Hamburger button triggers overlay
- Aria attributes: `aria-label="Open menu"`, `aria-expanded` toggles between false/true
- Close button changes aria-label to "Close menu"
- Full-screen overlay with z-50
- Click outside or close button dismisses

### 12.4 Form Interactions

- Search input: Focus shows ring (focus-visible:ring-2, focus-visible:ring-ring)
- Input transitions: `transition-colors duration-200`

### 12.5 Button States

| State | Visual |
|-------|--------|
| **Default** | Base styles |
| **Hover** | Color shift + shadow + optional lift |
| **Focus** | `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` |
| **Disabled** | `disabled:pointer-events-none disabled:opacity-50` |
| **Active/Pressed** | No explicit active state (defect) |

---

## 13. SEO & Meta Configuration

### 13.1 Current Meta Tags

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>iTrust Academy — Enterprise IT Training & Certification</title>
<meta name="description" content="Professional IT training and certification across SolarWinds, Securden, Quest, and Ivanti platforms. Equip your workforce with cutting-edge skills.">
```

### 13.2 Missing SEO Elements (Defects)

| Missing Element | Impact |
|----------------|--------|
| Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) | Poor social media sharing appearance |
| Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:image`) | No rich preview on Twitter/X |
| Canonical URL (`<link rel="canonical">`) | Potential duplicate content issues |
| Favicon (only SVG, no `.ico` fallback) | Compatibility issues with older browsers |
| Structured Data (JSON-LD) | No rich search results |
| Additional meta tags (keywords, author, robots) | Limited SEO control |
| Hreflang tags | No multi-language support signal |
| Sitemap reference | Not detected |

---

## 14. Accessibility Analysis

### 14.1 Positive Accessibility Features

| Feature | Implementation |
|---------|---------------|
| Semantic HTML | `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>` used properly |
| ARIA labels | Navigation has `aria-label="Main navigation"`, mobile menu has `aria-label` and `aria-expanded` |
| ARIA roles | Course tabs use `role="tab"` and `aria-selected` |
| Live regions | Notification region with `aria-live="polite"` |
| Focus management | `focus-visible:ring-2 focus-visible:ring-ring` on interactive elements |
| Skip content | Notification region available for screen reader announcements |
| Icon hiding | Icons marked with `aria-hidden="true"` |
| Alt text | Decorative SVGs properly marked as `aria-hidden` |
| Color contrast | Brand orange (#f27a1a) on white passes WCAG AA for large text |

### 14.2 Accessibility Concerns

| Issue | Severity | Description |
|-------|----------|-------------|
| No skip-to-content link | Medium | Users cannot skip navigation to reach main content |
| Partner cards as buttons | Medium | Vendor cards are `<button>` but act as navigation — should be `<a>` with proper roles |
| No active nav indicator | Medium | Users cannot identify current page in navigation |
| Duration inconsistency | Low | "5 weeks" vs "5 days" could confuse users |
| Filter label text inconsistency | Low | Server vs client render shows different filter categories |
| No dark mode toggle | Low | Dark mode classes exist in footer but no toggle mechanism |
| No page-specific titles | Medium | All pages share the same title — poor for screen reader users |
| Missing form labels | Medium | Search input has no visible or aria-label |
| Toast system | Low | Sonner toast system exists but no error handling was observed |

---

## 15. UI/UX Gaps, Inconsistencies & Defects

### 15.1 Critical Issues

| # | Issue | Type | Description |
|---|-------|------|-------------|
| 1 | **Data Inconsistency: Course Duration** | Data | Homepage shows "5 weeks" for SolarWinds NPM; course detail page shows "5 days". Same for other courses. This is a significant trust-eroding discrepancy. |
| 2 | **Missing Sign In / Register Functionality** | Functional | "Sign In" and "Register" buttons are present but do not navigate to any page or trigger any modal. They appear to be non-functional. |
| 3 | **Filter Category Mismatch** | Data | Server-rendered HTML shows filters as vendor-based ("SolarWinds", "Securden", "Quest", "Ivanti") while interactive snapshot shows topic-based ("Database", "Endpoint Management", etc.) — suggests a hydration mismatch or data loading issue. |

### 15.2 High-Priority Issues

| # | Issue | Type | Description |
|---|-------|------|-------------|
| 4 | **No 404 / Error Page** | UX | Navigating to non-existent routes likely shows a blank or broken state (no error handling detected). |
| 5 | **Incomplete Pages** | Content | FAQ, Careers, Partners, Blog, Help Center, Case Studies, Webinars, Certification Guide — all referenced in footer but likely lead to nowhere or placeholder pages. |
| 6 | **No Cookie Consent Banner** | Legal/Compliance | "Cookie Policy" link exists but no cookie consent mechanism is implemented. |
| 7 | **No Dark Mode Toggle** | UX | Dark mode CSS classes are present in the footer component but there is no visible toggle for users. |
| 8 | **Missing Page Titles** | SEO/Accessibility | All pages share the generic title "iTrust Academy — Enterprise IT Training & Certification" regardless of which page is viewed. |

### 15.3 Medium-Priority Issues

| # | Issue | Type | Description |
|---|-------|------|-------------|
| 9 | **Partner Cards Use `<button>` Instead of `<a>`** | Semantic/Accessibility | Vendor partner cards that should navigate to filtered courses are implemented as buttons without navigation behavior. |
| 10 | **No Active Navigation State** | UX | There is no visual indicator of which page/section the user is currently viewing in the navigation. |
| 11 | **No Scroll-to-Top Button** | UX | On a very long homepage, there is no mechanism to quickly return to the top. |
| 12 | **"View All Courses" Button Behavior Unclear** | UX | The outlined "View All Courses" button with a play icon is semantically confusing — "play" suggests video, not course browsing. |
| 13 | **Missing Testimonial Content** | Content | The "Trusted by Industry Leaders" section heading exists but no actual testimonials or customer logos were detected in the accessible snapshot. |
| 14 | **No Loading Indicator** | UX | Only skeleton loading for course cards was detected. No global loading indicator for page transitions. |
| 15 | **Currency Not Specified** | UX | Prices are shown as numbers ($1,799, $2,999) without specifying the currency (USD, SGD, etc.). |

### 15.4 Low-Priority Issues

| # | Issue | Type | Description |
|---|-------|------|-------------|
| 16 | **No Favicon ICO Fallback** | Compatibility | Only SVG favicon is provided; older browsers may not display it. |
| 17 | **No Structured Data** | SEO | No JSON-LD structured data for courses, organization, or breadcrumbs. |
| 18 | **Missing OG/Twitter Meta Tags** | SEO | No social media preview optimization. |
| 19 | **Phone Number Appears to Be Placeholder** | Content | "+65 1234 5678" is a sequential dummy number. |
| 20 | **No Breadcrumbs on Homepage** | UX | Breadcrumbs only appear on course detail pages. |
| 21 | **Address in Footer Uses `<span>` Instead of `<address>`** | Semantic | Physical address should use the `<address>` HTML element. |
| 22 | **No Keyboard Navigation Hint** | Accessibility | No visible indication that the site supports keyboard navigation. |

---

## 16. Recommendations for Improvement

### 16.1 Immediate Fixes (Critical)

1. **Resolve Data Inconsistency**: Audit and unify all course data (duration, pricing, descriptions) across homepage cards, course detail pages, and training calendar. Implement a single source of truth (database or CMS) with shared data models. The "weeks" vs "days" discrepancy erodes trust and must be fixed before launch.

2. **Implement Authentication Flow**: Either build functional Sign In / Register pages with form validation and state management, or remove the buttons entirely. Non-functional auth buttons create a negative first impression and suggest an unfinished product.

3. **Fix Filter Hydration Mismatch**: Investigate why server-rendered filter categories differ from the client-hydrated state. Ensure consistent filter options and ensure the filtering logic works correctly on both server and client sides.

### 16.2 High-Impact UX Improvements

4. **Add Active Navigation State**: Implement a visual indicator (underline, color change, or background) showing which page or section the user is currently on. This is fundamental navigation UX.

5. **Implement 404 Page**: Create a custom 404 page with navigation back to the homepage, a search bar, and suggested courses. This prevents users from hitting dead ends.

6. **Complete Footer Navigation**: Either build out the referenced pages (FAQ, Careers, Blog, etc.) or remove links to non-existent pages. A site under development should clearly communicate what is coming soon versus what is available.

7. **Add Cookie Consent Mechanism**: Implement a GDPR/CCPA-compliant cookie consent banner before deploying analytics (Cloudflare Web Analytics is already active).

8. **Currency Localization**: Display currency symbols/codes explicitly. Since the company is Singapore-based, clarify whether prices are in USD, SGD, or if multi-currency support is needed for different APAC markets.

### 16.3 SEO & Performance Enhancements

9. **Implement Full SEO Meta Tags**:
   - Add Open Graph tags for social sharing (og:title, og:description, og:image, og:url, og:type)
   - Add Twitter Card tags (twitter:card, twitter:title, twitter:description, twitter:image)
   - Add canonical URLs to all pages
   - Create a sitemap.xml
   - Add robots.txt
   - Implement per-page unique `<title>` tags

10. **Add Structured Data**: Implement JSON-LD for:
    - Organization schema (for Google Knowledge Panel)
    - Course schema (for rich course listings in search)
    - BreadcrumbList schema
    - FAQ schema (when FAQ page is built)

11. **Lazy Loading Optimization**: The current skeleton loading for courses is good. Extend this pattern to other sections and add proper loading states with shimmer effects.

12. **Image Optimization**: When real images/logos are added (currently using letter-based placeholders), implement:
    - WebP/AVIF format with fallbacks
    - Responsive `srcset` attributes
    - Lazy loading with `loading="lazy"`
    - Proper alt text

### 16.4 Design & Interaction Enhancements

13. **Add Scroll-to-Top Button**: Implement a floating button that appears after scrolling past the hero section, providing smooth scroll back to top.

14. **Improve "View All Courses" Button**: Replace the "play" icon with a more contextually appropriate icon (e.g., `compass`, `grid`, or `layout-grid`) to better communicate the action of browsing all courses.

15. **Add Testimonials/Reviews Section**: The "Trusted by Industry Leaders" section needs actual content — student testimonials, company logos, or case study snippets to validate claims.

16. **Implement Search Functionality**: The search bar in the courses section should be fully functional with real-time filtering, not just a visual element.

17. **Add Course Comparison Feature**: Allow users to compare courses side-by-side to help with decision-making, especially valuable for enterprise buyers evaluating multiple training options.

18. **Dark Mode Toggle**: Since dark mode CSS is already partially implemented in the footer, add a toggle in the header or settings to enable users to switch themes.

### 16.5 Accessibility Improvements

19. **Add Skip-to-Content Link**: Implement a visually hidden skip link that becomes visible on focus, allowing keyboard users to jump directly to the main content.

20. **Add aria-label to Search Input**: The search input needs an accessible label for screen readers.

21. **Fix Semantic HTML**: Convert partner cards from `<button>` to `<a>` elements. Use `<address>` for the physical address in the footer.

22. **Ensure Color Contrast**: Audit all text/background color combinations against WCAG 2.1 AA standards, paying particular attention to `muted-foreground` (#6b6b7b) on light backgrounds.

### 16.6 Strategic Recommendations

23. **Multi-Language Support**: Given the APAC focus, consider implementing multi-language support (at minimum English, Mandarin, and Bahasa) with proper `hreflang` tags.

24. **Live Chat / Support Widget**: Add a live chat widget or at minimum a floating "Need Help?" button for immediate visitor engagement.

25. **Progressive Web App (PWA)**: Consider PWA capabilities for offline access to course materials and a mobile-app-like experience.

26. **Analytics Event Tracking**: Extend beyond Cloudflare's basic analytics to track key conversion events: course card clicks, filter usage, enroll button clicks, and scroll depth per section.

---

## Appendix: Full Design Token Reference

### CSS Custom Properties

```css
:root {
  /* Surface Colors */
  --background: #ffffff;
  --background-secondary: #fafafa;
  --background-tertiary: #f5f5f5;

  /* Text Colors */
  --foreground: #1a1a2e;
  --foreground-secondary: #2d2d3a;
  --foreground-tertiary: #4a4a5a;

  /* Card System */
  --card: #ffffff;
  --card-foreground: #1a1a2e;
  --card-border: #e8e8ec;

  /* Popover System */
  --popover: #ffffff;
  --popover-foreground: #1a1a2e;

  /* Primary / Brand */
  --primary: #f27a1a;
  --primary-foreground: #ffffff;
  --primary-hover: #e36010;
  --primary-light: #fef3e6;

  /* Secondary */
  --secondary: #f5f5f7;
  --secondary-foreground: #1a1a2e;

  /* Muted */
  --muted: #f5f5f7;
  --muted-foreground: #6b6b7b;

  /* Accent */
  --accent: #fef3e6;
  --accent-foreground: #1a1a2e;

  /* Destructive / Error */
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;

  /* Borders */
  --border: #e8e8ec;
  --border-subtle: #f0f0f3;
  --input: #e8e8ec;

  /* Focus Ring */
  --ring: #f27a1a;

  /* Shadows */
  --shadow-color: 220 3% 15%;
  --shadow-strength: 1%;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-brand: 0 10px 15px -3px rgba(242, 122, 26, 0.2);
}

/* Brand Extended Colors (inferred from Tailwind config) */
--brand-50:  #fff7ed;  /* lightest */
--brand-100: #ffedd5;
--brand-200: #fed7aa;
--brand-300: #fdba74;
--brand-400: #fb923c;
--brand-500: #f27a1a;  /* primary */
--brand-600: #e36010;
--brand-700: #c2410c;
--brand-800: #9a3412;
--brand-900: #7c2d12;
```

### Typography Reference

```css
--font-sans: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--font-mono: "Space Mono", monospace;
--font-serif: (not actively used);

--font-weight-thin: 100;
--font-weight-light: 300;
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-black: 900;

--text-xs: 0.75rem (12px);
--text-sm: 0.875rem (14px);
--text-base: 1rem (16px);
--text-lg: 1.125rem (18px);
--text-xl: 1.25rem (20px);
--text-2xl: 1.5rem (24px);
--text-3xl: 1.875rem (30px);
--text-4xl: 2.25rem (36px);
--text-5xl: 3rem (48px);
--text-6xl: 3.75rem (60px);
--text-7xl: 4.5rem (72px);
--text-8xl: 6rem (96px);
--text-9xl: 8rem (128px);

--leading-tight: 1.1;
--leading-normal: 1.5;
--leading-relaxed: 1.625;

--tracking-tight: -0.025em;
--tracking-normal: 0em;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
--tracking-widest: 0.1em;

--radius-xs: 0.125rem;
--radius: 0.25rem;
--radius-2xl: 1rem;
--radius-3xl: 1.5rem;
--radius-4xl: 2rem;

--animate-fade-in: ...;
--animate-fade-in-up: ...;
--animate-slide-in-left: ...;
--animate-slide-in-right: ...;
--animate-scale-in: ...;
--animate-pulse: 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
--animate-spin: 1s linear infinite;
--animate-bounce: 1s infinite;
--animate-ping: 1s cubic-bezier(0, 0, 0.2, 1) infinite;

--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

---

*End of Project Requirements Document*
