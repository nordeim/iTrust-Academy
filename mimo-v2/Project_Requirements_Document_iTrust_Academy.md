# iTrust Academy (itrust.academy) — Project Requirements Document (PRD)

## Complete Design Guide & Technical Specification

**Source Website**: `https://www.itrust.academy/`  
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
7. [Internal Views — Courses, Schedule, Contact, Blog](#7-internal-views--courses-schedule-contact-blog)
8. [Navigation & Information Architecture](#8-navigation--information-architecture)
9. [Animations & Motion Design](#9-animations--motion-design)
10. [Responsive Design Specification](#10-responsive-design-specification)
11. [Interactive Behaviors & Micro-interactions](#11-interactive-behaviors--micro-interactions)
12. [SEO & Meta Configuration](#12-seo--meta-configuration)
13. [Accessibility Analysis](#13-accessibility-analysis)
14. [UI/UX Gaps, Inconsistencies & Defects](#14-uiux-gaps-inconsistencies--defects)
15. [Recommendations for Improvement](#15-recommendations-for-improvement)
16. [Appendix: Full Design Token Reference](#appendix-full-design-token-reference)

---

## 1. Executive Summary

iTrust Academy (`itrust.academy`) is the **training arm of iTrustech**, a Singapore-based professional services company specializing in SolarWinds, Securden, Quest, and Ivanti enterprise platforms. The website serves as a single-page application (SPA) with multiple internal views managed by JavaScript state, providing information about training courses, public course schedules, a blog, and a contact inquiry form. Unlike the sister site (`itrust-academy.jesspete.shop`), this site takes a more **information-dense,务实 (pragmatic) approach** — it features real course schedules with dates and locations, SCP exam domain mappings, detailed curriculum breakdowns, and links to the parent company iTrustech for professional services.

The site is built with **Vite + React** using **inline CSS** (not Tailwind utility classes), and employs a notably different visual treatment: it uses vendor-specific accent colors (SolarWinds orange, Securden teal, Quest blue, Ivanti purple) to differentiate platforms, uses emoji-based icons instead of an icon library, and renders all views within a single HTML page without separate routes. The site loads extremely fast (22ms DOMContentLoaded) due to its inline-CSS approach and minimal JavaScript bundle.

---

## 2. Project Overview — What & Why

### 2.1 What Is iTrust Academy (itrust.academy)?

iTrust Academy is the dedicated training division of **iTrustech Pte Ltd**, headquartered in Singapore. It provides authorized, instructor-led training programs for enterprise IT platforms, with a particular focus on **SolarWinds Certified Professional (SCP)** certification preparation. The platform positions itself as a regional training provider covering the Asia-Pacific market.

**Key differentiators from the sister site:**
- Real, dated course schedules (e.g., "14 Apr–16 Apr Singapore", "21 Apr–23 Apr Online (Zoom)")
- SCP exam domain-to-curriculum mapping (showing exact exam weight percentages)
- Explicit mention of exam vouchers (2 SCP exam attempts included)
- Multi-language training support (English, Mandarin, Bahasa Melayu)
- Direct link to parent company iTrustech for professional services
- PDF brochure download for the featured course
- Blog section with real article titles
- Functional contact form with country/vendor/team-size dropdowns

### 2.2 Why Does This Platform Exist?

The platform exists to:

- **Drive enrollment** in public and private training courses with real scheduling data
- **Promote SCP certification** by clearly mapping curriculum to exam domains
- **Cross-sell professional services** via links to iTrustech (deployment, migration, health assessments, optimization, licensing)
- **Establish thought leadership** through a blog covering certification trends and technology topics
- **Serve as the training gateway** for the broader iTrustech business ecosystem

### 2.3 Target Audiences

1. **Individual IT Professionals** — Seeking SCP certification or vendor-specific training
2. **Enterprise Training Coordinators** — Evaluating courses for team enrollment
3. **Existing iTrustech Clients** — Extending their relationship into training

---

## 3. Technology Stack & Architecture

### 3.1 Core Technology Stack

| Layer | Technology | Evidence |
|-------|-----------|----------|
| **Build Tool** | Vite | Asset filenames: `index-T6ilB86q.js` (Vite hash pattern) |
| **UI Framework** | React 18+ | JSX component structure, SPA view state management |
| **CSS Approach** | Inline CSS + Media Queries | All styles written inline via JavaScript objects, not Tailwind |
| **Icons** | Inline SVG + Emoji | Custom SVG icons (checkmarks, arrows, calendar pins) + emoji (🎓🖥️📋🌏✅📞) |
| **Fonts** | Google Fonts | DM Sans (300-700) + Space Mono (400, 700) via `@import` |
| **Routing** | Client-side SPA state (no React Router) | No URL changes on navigation; views toggled via JS state |
| **Hosting** | Static site (likely Cloudflare) | H3 protocol support, single `index.js` bundle |
| **Analytics** | None detected | No Cloudflare analytics, no Google Analytics, no third-party tracking |
| **Favicon** | PNG favicon | `/favicon.png` (not SVG) |

### 3.2 Asset Architecture

```
/
  index.html              # Single HTML file
  /assets/
    index-T6ilB86q.js     # Main (and only) JavaScript bundle
  /favicon.png             # PNG favicon
```

Notably, there is **no external CSS file** — all styling is handled through inline styles and a single `<style>` block in the HTML.

### 3.3 Application Architecture

The application is a **single HTML file with React-managed internal views**:

- **No separate routes**: All views (Home, Courses, Schedule, Contact, Blog) are rendered within the same page and toggled via JavaScript state changes
- **URL stays the same**: The URL remains `https://www.itrust.academy/` regardless of which view is active — no hash-based or path-based routing
- **Navigation via buttons**: Nav items are `<button>` elements that toggle view state
- **No code splitting**: Everything is in a single JS bundle
- **View toggling**: Clicking "Courses", "Schedule", "Contact", or "Blog" in the navigation swaps the visible content section

### 3.4 External Dependencies

| Dependency | Purpose | URL |
|-----------|---------|-----|
| Google Fonts | DM Sans + Space Mono | `fonts.googleapis.com` |
| iTrustech | Professional services links | `www.itrustech.com` |
| SolarWinds | SCP exam info link | `www.solarwinds.com/academy/scp-certification` |

---

## 4. Design System & Visual Language

### 4.1 Color System

Unlike the sister site which uses a unified brand-orange system, itrust.academy uses a **multi-vendor color scheme** where each technology vendor has its own distinct accent color.

#### Global Colors

| Role | Value | Usage |
|------|-------|-------|
| **Background (Primary)** | `#FFFFFF` | Page background |
| **Background (Secondary)** | `#F8F9FA` | Alternating section backgrounds |
| **Text (Primary)** | `#111827` (gray-900) | Headings, body text |
| **Text (Secondary)** | `#374151` (gray-700) | Descriptive text |
| **Text (Muted)** | `#6B7280` (gray-500) | Secondary descriptions, metadata |
| **Text (Light)** | `#9CA3AF` (gray-400) | Tertiary text |
| **Border (Primary)** | `#E5E7EB` (gray-200) | Card borders, dividers |
| **Border (Subtle)** | `#F0F0F0` | Table row dividers |
| **Brand Orange** | `#F27A1A` | CTA buttons, highlights, selection |
| **Selection** | `rgba(242, 122, 26, 0.08)` bg / `#F27A1A` text | Text selection |
| **Scrollbar Track** | `#F8F9FA` | Custom scrollbar background |
| **Scrollbar Thumb** | `#F27A1A` | Custom scrollbar thumb |
| **Available Badge** | `#ECFDF5` bg / `#A7F3D0` border / `#059669` text | Schedule availability |

#### Vendor Accent Colors

| Vendor | Color | Hex | Usage |
|--------|-------|-----|-------|
| **iTrust/Brand** | Orange | `#F27A1A` | CTA buttons, brand highlights, nav active state |
| **SolarWinds** | Orange | `#F27A1A` | Top border (3px), vendor label, left accent bar |
| **Securden** | Teal | `#2BBCB3` | Top border (3px), vendor label, left accent bar |
| **Quest** | Blue | `#3B82F6` | Top border (3px), vendor label |
| **Ivanti** | Purple | `#7C3AED` | Top border (3px), vendor label |

**Important distinction**: SolarWinds and the iTrust brand share the same orange (`#F27A1A`), while the sister site used `rgb(123, 135, 148)` (slate) for SolarWinds.

### 4.2 Typography System

#### Font Families

| Role | Font | Fallback | Usage |
|------|------|----------|-------|
| **Primary (Sans)** | DM Sans | `sans-serif` | Body text, headings, button text, nav links |
| **Monospace (Accent)** | Space Mono | `monospace` | Section labels, vendor names, badges, metadata, stat numbers |

#### Type Scale (from inline styles)

| Element | Size | Weight | Font | Notes |
|---------|------|--------|------|-------|
| **Hero H1** | `clamp(2.8rem, 6.5vw, 4.8rem)` | 700 | DM Sans | Fluid typography |
| **Section H2** | `clamp(1.75rem, 3.5vw, 2.5rem)` | 700 | DM Sans | Fluid typography |
| **View H2** | Large (h2 element) | 700 | DM Sans | "All Courses", "Public Course Schedule", etc. |
| **Card H3** | 15px | 600 | DM Sans | Feature titles, schedule items |
| **Body Large** | `clamp(1rem, 2vw, 1.2rem)` | 300 | DM Sans | Hero subtitle, section descriptions |
| **Body** | 13px | 400 | DM Sans | Card descriptions, detail text |
| **Section Label** | 11px | 700 | Space Mono | Uppercase, tracked, vendor category labels |
| **Nav Links** | 14px | 500 | DM Sans | Desktop navigation |
| **Buttons** | 14px | 600 | DM Sans | Primary and secondary buttons |
| **Stat Numbers** | `clamp(1.3rem, 2.5vw, 1.8rem)` | 700 | Space Mono | Hero stats |
| **Badge Text** | 10-11px | 700 | Space Mono | "AVAILABLE", "NOW ENROLLING", vendor names |
| **Link Text** | 12-13px | 600 | DM Sans | Footer and professional services links |

#### Key Typography Differences vs Sister Site

| Trait | itrust.academy | Sister Site |
|-------|---------------|-------------|
| **Button font** | DM Sans (sans-serif) | Space Mono (monospace) |
| **Nav font** | DM Sans (sans-serif) | Space Mono (monospace) |
| **Hero subtitle weight** | 300 (light) | 400 (normal) |
| **Section labels** | 11px, letter-spacing: 0.12em | 10-12px, tracking-widest |
| **Fluid typography** | Yes (clamp()) | No (Tailwind breakpoints) |
| **Text selection** | Custom branded | Browser default |

### 4.3 Spacing System

All spacing is set via inline pixel/rem values (not Tailwind tokens):

| Context | Value | Notes |
|---------|-------|-------|
| **Nav height** | 68px | Fixed header |
| **Nav padding** | 0px 24px (horizontal) | |
| **Section padding** | 80px 24px (vertical + horizontal) | All major sections |
| **Content max-width** | 1140px | `max-width: 1140px; margin: 0 auto` |
| **Card padding** | 28px | All cards |
| **Card border-radius** | 14px | Consistent across all cards |
| **Card gap** | 12-16px | Between cards in grids |
| **Button padding** | 12px 24px | Standard button sizing |
| **Button border-radius** | 10px | All buttons |
| **Hero section** | min-height: 92vh, padding: 120px 24px 80px | Top padding accounts for fixed nav |
| **Stat bar gap** | clamp(24px, 4vw, 48px) | Fluid gap |

### 4.4 Border & Radius System

| Context | Value |
|---------|-------|
| **Card borders** | `1px solid #E5E7EB` |
| **Vendor card top border** | `3px solid {vendor-color}` (top), `1px solid #E5E7EB` (other sides) |
| **Schedule item left border** | `4px solid {vendor-color}` (left), `1px solid #E5E7EB` (other sides) |
| **Border radius (Cards)** | 14px |
| **Border radius (Buttons)** | 10px |
| **Border radius (Badges)** | 100px (pill shape) |
| **Border radius (Logo)** | 6px |
| **Nav active indicator** | 2px solid #F27A1A (bottom border) |

### 4.5 Shadow System

**Minimal shadows.** The design is notably flat with no `box-shadow` on cards or buttons. The only "depth" effects come from:

- **Nav backdrop blur**: `backdrop-filter: blur(12px)` on the fixed header
- **Gradient background**: Radial gradient decorative element in the hero
- **Grid pattern**: Subtle background grid lines (60px × 60px)
- **Transitions**: `transition: 0.25s` and `transition: 0.2s` for hover states

### 4.6 Icon System

The site uses a **dual icon approach**:

1. **Emoji Icons** (for feature cards):
   - 🎓 Vendor-Certified Instructors
   - 🖥️ Hands-On Lab Environments
   - 📋 Certification-Aligned Curriculum
   - 🌏 Regional Expertise
   - ✅ Certification Support
   - 📞 Post-Training Support

2. **Inline SVG Icons** (for UI elements):
   - Checkmark (✓) for course topic lists, "What's Included" lists
   - Arrow right (→) for buttons
   - Calendar icon for schedule date display
   - Map pin icon for schedule location display
   - External link icon for iTrustech links
   - Hamburger menu icon (3 lines)
   - Close/X icon

**No icon library** (no Lucide, no Font Awesome, no Feather).

### 4.7 Custom Scrollbar

```css
::-webkit-scrollbar { width: 5px }
::-webkit-scrollbar-track { background: #F8F9FA }
::-webkit-scrollbar-thumb { background: #F27A1A; border-radius: 3px }
```

A branded orange scrollbar — thin (5px) with orange thumb on light gray track.

### 4.8 Custom Text Selection

```css
::selection { background: rgba(242, 122, 26, 0.08); color: #F27A1A }
```

Branded orange selection highlighting — a subtle but distinctive touch.

---

## 5. Page Architecture & Component Map

### 5.1 View Architecture (SPA with Internal Views)

The site has **no URL-based routing**. All views are internal states:

| View | Trigger | URL Change |
|------|---------|------------|
| **Home** | "Home" nav button (default) | No |
| **Courses** | "Courses" nav button | No |
| **Schedule** | "Schedule" nav button | No |
| **Contact** | "Contact" nav button | No |
| **Blog** | "Blog" nav button | No |

The URL **always remains** `https://www.itrust.academy/` regardless of which view is active.

### 5.2 Layout Structure

```
┌──────────────────────────────────────────────┐
│  Fixed Navigation Bar (z-index: 100)         │
│  ├── Logo (inline PNG image, clickable)      │
│  ├── Desktop Nav (hidden at 768px)           │
│  │   ├── Home (active: orange underline)     │
│  │   ├── Courses                              │
│  │   ├── Schedule                             │
│  │   ├── Blog                                 │
│  │   └── Contact                              │
│  ├── "Enroll Now" CTA button                 │
│  └── Mobile hamburger (shown at 768px)       │
├──────────────────────────────────────────────┤
│  Main Content Area                            │
│  [View toggled by nav state]                 │
│  ├── Home: Hero + Partners + Features +       │
│  │         Featured Course + Schedule +       │
│  │         Pro Services + CTA Footer          │
│  ├── Courses: Course list with filters       │
│  ├── Schedule: List/Calendar with vendor &   │
│  │             mode filters                   │
│  ├── Contact: Full inquiry form              │
│  └── Blog: Article card list                 │
├──────────────────────────────────────────────┤
│  Footer Area (inline, not a separate section) │
│  ├── Quick nav buttons (course shortcuts)    │
│  ├── Links column (SCP Exam Info, About,     │
│  │   Contact, Pro Services, etc.)           │
│  └── iTrustech link + copyright              │
└──────────────────────────────────────────────┘
```

---

## 6. Homepage — Section-by-Section Specification

### 6.1 Navigation Bar

**Purpose**: Fixed navigation with view switching and enrollment CTA

**Properties**:
- **Position**: Fixed, top: 0, left: 0, right: 0, z-index: 100
- **Height**: 68px
- **Background**: `#FFFFFF` with `backdrop-filter: blur(12px)`
- **Border-bottom**: `1px solid #E5E7EB`
- **Transition**: `0.3s`

**Logo**: Inline PNG (base64-encoded data URI), 40px height, `border-radius: 6px`, `object-fit: contain`

**Desktop Nav**: Horizontal button group with `gap: 28px`
- Active state: `border-bottom: 2px solid #F27A1A`, `color: #111827`
- Inactive state: `border-bottom: 2px solid transparent`, `color: #6B7280`
- Hover: `transition: 0.2s`
- Font: DM Sans, 14px, weight 500

**CTA Button**: "Enroll Now" — orange background (#F27A1A), white text, rounded (10px), 14px font, weight 600

**Mobile Toggle**: SVG hamburger icon (3 lines), hidden at `display: none` on desktop, shown via media query `@media(max-width:768px)`

### 6.2 Hero Section

**Purpose**: Primary brand statement with enrollment urgency

**Layout**:
- **Min-height**: 92vh
- **Padding**: 120px 24px 80px (top padding for fixed nav)
- **Background**: White with decorative elements:
  - Radial gradient: `radial-gradient(circle, rgba(242,122,26,0.08) 0%, transparent 70%)` positioned top-right (650px × 650px circle)
  - Grid pattern: `linear-gradient(#F0F0F0 1px, transparent 1px)` — 60px × 60px grid, opacity 0.5

**Content** (max-width: 700px for text):

1. **Urgency Badge**: "NOW ENROLLING — Q2 2026" — Space Mono, 11px, weight 700, uppercase, letter-spacing 0.12em, orange text on orange-tinted background with pulsing dot
   - **Key difference**: Sister site says "Asia-Pacific's Premier IT Training Provider" (no urgency); this site adds enrollment deadline context

2. **Headline H1**: "Advance Your IT Career. Get Certified." — Fluid sizing `clamp(2.8rem, 6.5vw, 4.8rem)`, weight 700, letter-spacing -0.03em, "Certified." in orange

3. **Subtitle**: Same brand description as sister site but with `font-weight: 300` (light)

4. **CTA Buttons**:
   - Primary: "Explore SCP Fundamentals →" — orange, with inline SVG arrow
   - Secondary: "View All Courses" — white with gray border, no icon

5. **Stats Bar**: 4 stats in a flex row with `border-top: 1px solid #E5E7EB`:
   - "4 Technology Vendors", "5+ Training Programs", "Asia-Wide Training Coverage", "SCP Certification Prep"
   - Same as sister site but using `clamp()` for fluid sizing

### 6.3 Platform Partners Section

**Purpose**: Showcase vendor training partnerships

**Layout**:
- **Background**: `#F8F9FA`
- **Padding**: 80px 24px
- **Max-width**: 1140px

**Section Label**: "AUTHORIZED TRAINING PARTNER" — Space Mono, 11px, uppercase, orange

**Section H2**: "Training Across Leading IT Platforms" — fluid clamp()

**Partner Cards**: `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))`, gap: 16px

**Partner Card Structure**:
```
┌══════════════════════════════┐  ← 3px colored top border
│ Vendor Name                  │  ← Space Mono, 11px, uppercase
│                              │
│ Vendor description text...   │  ← 13px, gray-500, line-height 1.6
└────────══════════════════════┘
```

**Vendor Details**:

| Vendor | Color | Description |
|--------|-------|-------------|
| SolarWinds | `#F27A1A` | Enterprise observability, network monitoring, database performance, and ITSM. SolarWinds Certified Instructors delivering official SolarWinds Academy curriculum. SCP exam vouchers included. |
| Securden | `#2BBCB3` | Unified Privileged Access Management for credential security, session monitoring, and compliance. Training by Securden Authorized Trainers. |
| Quest | `#3B82F6` | IT management, Active Directory security, migration, and data protection. Authorized training for Quest product deployment. |
| Ivanti | `#7C3AED` | Endpoint management, ITSM, and security for the modern digital workplace. Authorized Ivanti platform training. |

**Key differences from sister site**: These cards contain much richer, more specific vendor descriptions. They use a 3px top border (vs 1px accent bar). No letter-based icons, no "X courses" count, no arrow icon.

### 6.4 Features / "Why Choose Us" Section

**Purpose**: Differentiate with value propositions using emoji icons

**Layout**: White background, `grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`, gap: 16px

**Feature Cards**: White card with 1px gray border, 14px radius, 28px padding, horizontal layout (icon left, text right)

| Feature | Emoji | Title | Description |
|---------|-------|-------|-------------|
| 1 | 🎓 | Vendor-Certified Instructors | SolarWinds courses led by SolarWinds Certified Instructors. Each vendor program meets that vendor's specific qualification requirements. |
| 2 | 🖥️ | Hands-On Lab Environments | Every course includes dedicated lab environments tailored to each vendor's platform — real configurations, not just slides. |
| 3 | 📋 | Certification-Aligned Curriculum | SolarWinds courses align to SCP exam domains. Other vendor courses align to their respective certification paths. |
| 4 | 🌏 | Regional Expertise | Training delivered in English, Mandarin, and Bahasa Melayu across Asia. |
| 5 | ✅ | Certification Support | SolarWinds courses include SCP exam vouchers (2 attempts). Other vendors: exam prep guidance and registration assistance. |
| 6 | 📞 | Post-Training Support | Access to study materials, practice resources, and instructor Q&A across all vendor programs. |

**Key insight**: These descriptions are significantly more specific and credible than the sister site's generic feature titles (e.g., "Enterprise-First", "Expert Instructors").

### 6.5 Featured Course Section

**Purpose**: Deep-dive into the flagship SCP course with exam domain mapping

**Layout**:
- **Background**: `#F8F9FA`
- **Padding**: 80px 24px
- **Grid**: `feat-grid` — 2-column on desktop, 1-column on mobile (media query at 768px)

**Section Label**: "FEATURED COURSE · SOLARWINDS" — Space Mono, 11px

**Section H2**: "SCP Observability Self-Hosted Fundamentals"

**Section Description**: Detailed 3-paragraph description of the course covering platform architecture, network discovery, SCP exam preparation, SolarWinds Academy curriculum, etc.

**Left Column — Course Modules** (3 stacked cards):

| Module | Title | SCP Exam Domain | Topics |
|--------|-------|----------------|--------|
| 1 | Platform Architecture & Node Management | Domain 1.1 (10%) + 1.2 (12%) = 22% | SolarWinds Platform architecture, Network Sonar Wizard, Node management (+3 more) |
| 2 | Customization & User Experience | Domain 1.3 (25%) | User account types, Permissions & security, Classic vs modern dashboards (+3 more) |
| 3 | Alerts, Reports & Troubleshooting Tools | Domain 1.4 (20%) + 1.5 (20%) + 1.6 (13%) = 53% | Alert fundamentals, AlertStack, Custom reports with SWQL (+4 more) |

Each module card has:
- Numbered badge (1, 2, 3) in orange-tinted square
- Module title
- SCP exam domain reference in teal (Securden's accent color — reused for exam info)
- Topic list with orange checkmark SVGs
- "+N more topics" italic hint

**Right Column**:

1. **SCP Exam Domains Table**: Clean data table showing:
   - Domain name (flex: 1)
   - Exam weight % (orange, monospace, width: 40px, right-aligned)
   - Training day mapping (monospace, 10px, gray, width: 40px)

2. **"What's Included" Card**: Checklist of inclusions:
   - 3 days of training by a SolarWinds Certified Instructor
   - Official SolarWinds Academy curriculum
   - Hands-on lab environment access
   - HCO Fundamentals Study Guide & 250 practice questions
   - SCP exam voucher (2 attempts included)
   - Certificate of completion

3. **"View Full Course Details" CTA button**: Full-width orange button

### 6.6 Schedule Section

**Purpose**: Show upcoming public course dates

**Layout**: White background, single-column stacked schedule items, gap: 12px

**Schedule Item Structure**:
```
┃ Vendor Label                     Date          Location         Status
┃ SolarWinds                       14 Apr–16 Apr  Singapore       AVAILABLE
┃ SolarWinds Observability SHF     (calendar 📅)  (map pin 📍)    [green badge]
```

**Styling**: White card with `border-left: 4px solid {vendor-color}`, 14px radius, padding 18px 24px

**Schedule Data**:

| Course | Vendor | Dates | Location | Status |
|--------|--------|-------|----------|--------|
| SolarWinds Observability SHF Fundamentals | SolarWinds | 14 Apr–16 Apr | Singapore | AVAILABLE |
| SolarWinds Observability SHF Fundamentals | SolarWinds | 21 Apr–23 Apr | Online (Zoom) | AVAILABLE |
| Securden Unified PAM — Administration Training | Securden | 28 Apr–29 Apr | Singapore | AVAILABLE |

**CTA**: "View Full Schedule" button (outlined, centered)

### 6.7 Professional Services Section

**Purpose**: Cross-sell iTrustech professional services

**Layout**: `#F8F9FA` background, `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))`, gap: 14px

**Section Label**: "iTRUSTECH PROFESSIONAL SERVICES"

**Section H2**: "Beyond Training — We're Here to Help"

**Section Description**: Explains the iTrustech relationship

**Service Cards** (all link to `https://www.itrustech.com`):

| Service | Description |
|---------|-------------|
| Professional Services | Deployment, configuration, and platform optimization. |
| Migration & Upgrades | Planning, execution, and post-migration validation. |
| Health Assessments | Environment health checks with actionable recommendations. |
| Optimization | Alert tuning, reporting, and polling optimization. |
| Software Licensing | Licensing guidance, renewals, and procurement. |

Each card has a branded link "itrustech.com ↗" with an external link icon.

### 6.8 Footer

**Structure**: Not a traditional `<footer>` element — it's an inline section at the bottom of each view.

**Quick Nav Buttons** (course shortcuts): SCP Fundamentals, SAM & Log Analyzer, Database Fund. & Adv., Service Desk & Leadership, Securden PAM, Quest (Coming Soon), Ivanti (Coming Soon)

**Links Column**:
- SCP Exam Info → `www.solarwinds.com/academy/scp-certification`
- About iTrustech → `www.itrustech.com`
- Contact Us (button)
- Professional Services → `www.itrustech.com`
- Migration & Upgrades → `www.itrustech.com`
- Health Assessments → `www.itrustech.com`
- Software Licensing → `www.itrustech.com`

**No social media links**, **no email/phone/address**, **no copyright notice**.

---

## 7. Internal Views — Courses, Schedule, Contact, Blog

### 7.1 Courses View

**Triggered by**: "Courses" nav button

**Layout**: Single-column list of course cards with filter buttons

**Filter Buttons** (horizontally at top): SCP Fundamentals, SAM & Log Analyzer, Database Fund. & Adv., Service Desk & Leadership, Securden PAM, Quest (Coming Soon), Ivanti (Coming Soon)

**Course Cards**:
1. **SolarWinds Observability Self-Hosted Fundamentals** (clickable, with "NOW ENROLLING" badge and "PDF" link)
2. **SolarWinds SAM & Log Analyzer** (heading only)
3. **SolarWinds Database Fundamentals & Advanced** (heading only)
4. **SolarWinds Service Desk Fundamentals & Leadership** (heading only)
5. **Securden Unified PAM — Administration Training** (heading only)

**Note**: Only the SCP Fundamentals course card is interactive (clickable). The others are plain `<h3>` headings with no further detail or click behavior. This suggests these courses are listed but not yet fully built out.

**Cross-link**: "iTrustech Professional Services →" link at bottom

### 7.2 Schedule View

**Triggered by**: "Schedule" nav button

**Layout**: Filter bar + schedule list

**Section H2**: "Public Course Schedule"

**View Toggle**: "List" button | "Calendar" button (Calendar functionality not confirmed)

**Filter Dropdowns** (native `<select>` comboboxes):
- "All Vendors" / SolarWinds / Securden / Quest / Ivanti
- "All Modes" / In-Person / Virtual

**Schedule Items**: Each with "Register Interest" button

**No functional calendar view**: While a "Calendar" button exists, the list view is shown by default. Calendar functionality may or may not be implemented.

### 7.3 Contact View

**Triggered by**: "Contact" nav button

**Section H2**: "Start Your Training Journey"

**Form Fields**:

| Field | Type | Placeholder | Required |
|-------|------|-------------|----------|
| First Name | Text | "Your first name" | Likely yes |
| Last Name | Text | "Your last name" | Likely yes |
| Email | Text | "you@company.com" | Likely yes |
| Organization | Text | "Your organization" | Likely |
| Role | Text | "Your role" | Likely |
| Country | Dropdown | "Select country" | — |
| Vendor | Dropdown | "Select vendor" | — |
| Team Size | Dropdown | "Select" | — |
| Message | Textarea | "Tell us about your training needs..." | — |
| Submit | Button | "Send Inquiry" | — |

**Country Options**: Singapore, Hong Kong, Malaysia, Indonesia, Thailand, Philippines, Vietnam, India, Japan, South Korea, Australia, Other Asia-Pacific

**Vendor Options**: SolarWinds, Securden, Quest, Ivanti, Multiple / Not Sure

**Team Size Options**: Individual, 2–5, 6–10, 10+

**Form Behavior**: The "Send Inquiry" button is present but no form submission handler was observed. The form may be decorative or connected to an external service.

**Pro Services Links**: Below the form, links to Professional Services, Migration & Upgrades, Health Assessments, Platform Optimization, Software Licensing

### 7.4 Blog View

**Triggered by**: "Blog" nav button

**Section H2**: "From the Academy"

**Blog Article Cards** (4 articles):

| Title | Category | Excerpt |
|-------|----------|---------|
| Why SCP Certification Matters in 2026 | SCP · Certification | The SolarWinds Certified Professional... |
| 5 Things to Know Before Your First SolarWinds Training | SolarWinds · Training Tips | Prepare for success... |
| SOSH vs SaaS: Choosing the Right Observability Platform | SolarWinds · Technology | Self-hosted or cloud?... |
| Why PAM Training Is Non-Negotiable in 2026 | Securden · Security | Credential theft remains the top attack... |

Each card shows: Category badge, title (H3), excerpt text. Cards are clickable.

---

## 8. Navigation & Information Architecture

### 8.1 Navigation Architecture

**Critical architectural difference**: All navigation is **state-based, not route-based**. Clicking any nav button toggles which view section is visible within the same page. The URL never changes. This has significant implications for:

- **Browser back button** — Does not work for view navigation
- **Bookmarking** — Users cannot bookmark specific views
- **Shareability** — Users cannot share direct links to the Schedule or Contact forms
- **Analytics** — Cannot track page views per view (all views show as the same URL)
- **SEO** — Internal views are invisible to search engines

### 8.2 Desktop Navigation

| Label | Action | Active State |
|-------|--------|-------------|
| Home | Shows Home view | Orange 2px bottom border |
| Courses | Shows Courses view | Orange 2px bottom border |
| Schedule | Shows Schedule view | Orange 2px bottom border |
| Blog | Shows Blog view | Orange 2px bottom border |
| Contact | Shows Contact view | Orange 2px bottom border |
| Enroll Now | (unclear — no visible effect) | N/A |

**Nav items are `<button>` elements**, not `<a>` elements — this is semantically incorrect for navigation.

### 8.3 Mobile Navigation

The mobile hamburger button exists but opens a **slide-in panel** from the left side (based on click target `[cursor:pointer, onclick]` generic wrapper). The mobile menu includes the same navigation options.

**Responsive breakpoint**: `768px` — below this, `.nav-desk` is hidden and `.nav-mob` is shown via `!important` media query.

---

## 9. Animations & Motion Design

### 9.1 Pulse Animation (Hero Badge)

```css
@keyframes pulse {
  0%, 100% { opacity: 1 }
  50% { opacity: 0.4 }
}
```

- Applied to: "NOW ENROLLING" dot indicator
- Duration: 2s, infinite, ease
- Purpose: Draw attention to enrollment urgency

### 9.2 Hover Transitions

All interactive elements use simple `transition: 0.25s` or `transition: 0.2s`:

| Element | Transition Property | Duration |
|---------|-------------------|----------|
| Navigation bar | All | 0.3s |
| Nav buttons | All | 0.2s |
| CTA buttons | All | 0.2s |
| Cards | All | 0.25s |

**No scroll-triggered animations**: Unlike the sister site which has IntersectionObserver-based fade-in-up animations, this site has **no scroll animations**. All content is immediately visible.

**No hover micro-animations on cards**: Cards have a `transition: 0.25s` but no visible hover effect was detected (no shadow, transform, or color change on hover). This is a significant difference from the sister site's rich hover interactions.

### 9.3 Custom Scrollbar Animation

The custom scrollbar styling (`::-webkit-scrollbar`) provides a branded experience but has no animation — it's purely static styling.

---

## 10. Responsive Design Specification

### 10.1 Breakpoints

| Breakpoint | Trigger | Behavior |
|-----------|---------|----------|
| **Desktop** | > 768px | Full navigation, 2-column grids |
| **Mobile** | ≤ 768px | Hamburger menu, 1-column grids |

**Single breakpoint only** — no intermediate tablet state. This is a simpler responsive strategy than the sister site's 5 breakpoints (sm, md, lg, xl, 2xl).

### 10.2 Responsive Adaptations

| Component | Desktop (> 768px) | Mobile (≤ 768px) |
|-----------|-------------------|-------------------|
| **Nav** | Horizontal button group | Hamburger menu |
| **Partner grid** | `auto-fit, minmax(240px, 1fr)` (2-4 cols) | 1 column |
| **Features grid** | `auto-fit, minmax(300px, 1fr)` (2-3 cols) | 1 column |
| **Featured course** | 2-column (feat-grid) | 1 column (media query) |
| **Typography** | Fluid clamp() values | Fluid clamp() values |
| **Schedule items** | Horizontal layout (title + date + location) | Wrapped/flex |

### 10.3 Fluid Typography

The site uses `clamp()` extensively for responsive typography without breakpoints:

- Hero H1: `clamp(2.8rem, 6.5vw, 4.8rem)` — 44.8px to 76.8px
- Section H2: `clamp(1.75rem, 3.5vw, 2.5rem)` — 28px to 40px
- Hero subtitle: `clamp(1rem, 2vw, 1.2rem)` — 16px to 19.2px
- Stat numbers: `clamp(1.3rem, 2.5vw, 1.8rem)` — 20.8px to 28.8px

---

## 11. Interactive Behaviors & Micro-interactions

### 11.1 View Switching

Navigation buttons toggle internal views via JavaScript state. No page reload, no URL change.

### 11.2 Schedule Filters

- Vendor dropdown: Native `<select>` with options
- Mode dropdown: Native `<select>` with options (All Modes, In-Person, Virtual)
- List/Calendar toggle: Two buttons (functionality unconfirmed)

### 11.3 Course Filters

Buttons at top of Courses view filter the visible course cards.

### 11.4 Contact Form

- Native HTML form elements (text inputs, selects, textarea)
- "Send Inquiry" button (submission behavior unconfirmed)
- No visible form validation

### 11.5 External Links

- All professional services links point to `https://www.itrustech.com/`
- SCP Exam Info points to `https://www.solarwinds.com/academy/scp-certification`
- Links open in new tab (`target="_blank", rel="noopener noreferrer"`)

---

## 12. SEO & Meta Configuration

### 12.1 Current Meta Tags

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>iTrust Academy | IT Training & Certification Across Asia</title>
<meta name="description" content="Expert-led training for SolarWinds, Securden, Quest, and Ivanti platforms. SCP certification prep, hands-on labs, and instructor-led courses across Asia.">
```

### 12.2 SEO Analysis

| Element | Status | Notes |
|---------|--------|-------|
| Title tag | ✅ Present | Good, descriptive |
| Meta description | ✅ Present | Good, keyword-rich |
| Viewport meta | ✅ Present | Standard |
| Open Graph tags | ❌ Missing | No social sharing preview |
| Twitter Cards | ❌ Missing | No Twitter/X preview |
| Canonical URL | ❌ Missing | No canonical |
| Structured Data | ❌ Missing | No JSON-LD |
| Hreflang | ❌ Missing | No multi-language signal |
| Sitemap | ❌ Missing | No sitemap.xml |
| robots.txt | ❌ Missing | Not detected |
| Favicon | ✅ PNG | `/favicon.png` |
| Language attribute | ✅ `<html lang="en">` | Present |

**Critical SEO Issue**: Since all views share the same URL, search engines can only index the default (Home) view. The Courses, Schedule, Contact, and Blog views are completely invisible to search engines. This is a fundamental architectural SEO problem.

---

## 13. Accessibility Analysis

### 13.1 Positive Features

| Feature | Implementation |
|---------|---------------|
| Language attribute | `<html lang="en">` |
| Form labels | Input placeholders provide context |
| Select options | Dropdowns have descriptive labels |
| External link handling | `target="_blank"` with `rel="noopener noreferrer"` |
| Custom scrollbar | Branded but functional |
| Text selection | Custom branded selection (aesthetic, not accessibility) |

### 13.2 Accessibility Concerns

| Issue | Severity | Description |
|-------|----------|-------------|
| Nav uses `<button>` instead of `<a>` | High | Navigation should use semantic anchor elements for proper screen reader behavior |
| No URL-based routing | High | No back button support, no bookmarking, no shareability |
| No skip-to-content link | Medium | No way for keyboard users to skip navigation |
| No ARIA labels on nav | Medium | Nav has no `aria-label` or `role="navigation"` |
| No ARIA live regions | Low | No notification system |
| No focus management | Medium | No visible focus indicators, no focus trapping in mobile menu |
| Form inputs lack `<label>` | Medium | Only placeholders, no proper `<label for="">` associations |
| No dark mode | Low | No theme toggle or dark mode support |
| No keyboard navigation indicators | Medium | Tab navigation works but no visible focus ring |
| Emoji-only icons | Low | Screen readers may not announce emoji consistently |
| "Coming Soon" buttons | Low | May confuse users who expect functionality |

---

## 14. UI/UX Gaps, Inconsistencies & Defects

### 14.1 Critical Issues

| # | Issue | Type | Description |
|---|-------|------|-------------|
| 1 | **No URL-based routing** | Architecture | All views share URL `/`. Users cannot bookmark, share, or navigate back to specific views. This is the single most significant architectural flaw. |
| 2 | **No browser back button support** | UX | Clicking browser back exits the site instead of returning to the previous view. |
| 3 | **Incomplete course cards** | Content | Only the SCP Fundamentals course is clickable. The other 4 courses (SAM, Database, Service Desk, Securden PAM) are plain headings with no detail pages. |

### 14.2 High-Priority Issues

| # | Issue | Type | Description |
|---|-------|------|-------------|
| 4 | **No visible hover effects on cards** | UX | Cards have `transition: 0.25s` but no actual hover state change — the transition does nothing. Dead code. |
| 5 | **"Enroll Now" button — unclear behavior** | UX | The header "Enroll Now" button has no visible effect when clicked. Does it scroll to schedule? Open contact? Nothing happens. |
| 6 | **Contact form submission unknown** | Functional | "Send Inquiry" button present but no form validation or submission behavior confirmed. |
| 7 | **Calendar view unconfirmed** | Functional | "Calendar" toggle button exists in Schedule view but functionality is unknown. |
| 8 | **Blog articles not accessible** | Content | Blog article cards are clickable but no article detail view was observed. May be placeholder. |
| 9 | **Missing SEO for internal views** | SEO | All views invisible to search engines since they share one URL. |
| 10 | **No Open Graph / Twitter meta** | SEO | No social sharing optimization. |

### 14.3 Medium-Priority Issues

| # | Issue | Type | Description |
|---|-------|------|-------------|
| 11 | **Nav buttons not semantic** | Accessibility | Navigation should use `<a>` or at minimum have `role="navigation"` and `aria-current`. |
| 12 | **No footer contact info** | Content | No email, phone, or address anywhere on the site. Users must go to iTrustech.com or use the Contact form. |
| 13 | **No social media links** | Content | No LinkedIn, Twitter, YouTube, or any social presence. |
| 14 | **No copyright notice** | Legal | Missing copyright statement in footer area. |
| 15 | **No testimonials or social proof** | Content | No student reviews, client logos, or trust indicators beyond vendor partnerships. |
| 16 | **Single responsive breakpoint** | Responsive | Only 768px breakpoint — no tablet-optimized layout. |
| 17 | **No loading states** | UX | No loading indicators for any view transitions or data fetching. |
| 18 | **No favicon.svg fallback** | Compatibility | Only PNG favicon provided. |

### 14.4 Low-Priority Issues

| # | Issue | Type | Description |
|---|-------|------|-------------|
| 19 | **"Coming Soon" buttons in footer** | UX | Quest and Ivanti buttons labeled "Coming Soon" may frustrate users. |
| 20 | **No breadcrumb navigation** | UX | No way to understand view hierarchy. |
| 21 | **No search functionality** | UX | No way to search courses or content. |
| 22 | **Inconsistent vendor colors** | Design | SolarWinds uses brand orange (#F27A1A) which is same as primary brand color — no visual distinction between brand and vendor. |
| 23 | **No 404 page** | UX | No custom error page. |
| 24 | **No cookie/privacy policy** | Legal | No privacy policy, terms, or cookie consent mechanism. |

---

## 15. Recommendations for Improvement

### 15.1 Immediate Fixes (Critical)

1. **Implement URL-based routing**: Add React Router (or similar) with proper routes:
   - `/` → Home
   - `/courses` → All Courses
   - `/courses/:slug` → Individual Course Detail
   - `/schedule` → Training Schedule
   - `/contact` → Contact Form
   - `/blog` → Blog listing
   - `/blog/:slug` → Blog Article
   
   This single change resolves back-button, bookmarking, sharing, analytics, and SEO issues simultaneously.

2. **Build out all course detail pages**: Each course card should link to a dedicated detail page with curriculum, pricing, scheduling, and enrollment options. Currently only SCP Fundamentals has detailed content.

3. **Fix "Enroll Now" button behavior**: Either navigate to the Schedule view, open the Contact form, or link directly to a specific course enrollment page.

### 15.2 High-Impact UX Improvements

4. **Add hover effects to cards**: Implement `box-shadow`, subtle `transform: translateY(-2px)`, or border-color changes on hover to communicate interactivity.

5. **Add contact info to footer**: Include email, phone, and Singapore address for trust and accessibility.

6. **Add social media links**: LinkedIn is essential for B2B training companies. Include links in the footer.

7. **Add social proof section**: Include client logos, student testimonials, or certification success stories.

8. **Implement form validation and submission**: Add client-side validation, confirmation messages, and a backend handler for the contact form.

9. **Add SEO meta tags**: Open Graph, Twitter Cards, canonical URLs, and per-page `<title>` tags.

10. **Add a second responsive breakpoint**: Consider a 1024px breakpoint for tablet layouts between mobile and desktop.

### 15.3 Content & Design Enhancements

11. **Differentiate SolarWinds vendor color**: Since SolarWinds uses the same orange as the brand, consider using a distinct SolarWinds brand color (e.g., their actual brand color) for visual differentiation.

12. **Add scroll-triggered animations**: Implement subtle fade-in animations when sections enter the viewport to add visual polish and guide user attention.

13. **Add a loading/skeleton state**: Show loading placeholders during view transitions and data fetching.

14. **Implement blog article pages**: Create full article pages with rich content, author bylines, and related post suggestions.

15. **Add a calendar view for Schedule**: Implement a proper calendar component showing course dates in a monthly/weekly grid view.

### 15.4 Strategic Recommendations

16. **Add structured data**: Implement JSON-LD for Course, Organization, and FAQ schemas to enhance search engine visibility.

17. **Add multi-language support**: Given the stated multi-language capability (English, Mandarin, Bahasa Melayu), implement proper i18n with `<html lang>` switching and hreflang tags.

18. **Consider analytics**: Add privacy-respecting analytics (e.g., Plausible, Umami) to track user behavior, popular courses, and conversion paths.

19. **Add a "Why SCP?" comparison page**: Create content that compares SCP certification benefits against the investment, targeting enterprise decision-makers.

20. **Implement email capture / newsletter**: Add a lightweight email subscription form in the hero or footer to build a marketing pipeline.

---

## Appendix: Full Design Token Reference

### Color Tokens

```css
/* Brand */
--brand: #F27A1A;

/* Backgrounds */
--bg-primary: #FFFFFF;
--bg-secondary: #F8F9FA;

/* Text */
--text-primary: #111827;    /* gray-900 */
--text-secondary: #374151;  /* gray-700 */
--text-muted: #6B7280;     /* gray-500 */
--text-light: #9CA3AF;     /* gray-400 */

/* Borders */
--border-primary: #E5E7EB; /* gray-200 */
--border-subtle: #F0F0F0;

/* Vendor Colors */
--vendor-solarwinds: #F27A1A;
--vendor-securden: #2BBCB3;
--vendor-quest: #3B82F6;
--vendor-ivanti: #7C3AED;

/* Status */
--available-bg: #ECFDF5;
--available-border: #A7F3D0;
--available-text: #059669;

/* Selection */
--selection-bg: rgba(242, 122, 26, 0.08);
--selection-text: #F27A1A;
```

### Typography Tokens

```css
--font-sans: 'DM Sans', sans-serif;
--font-mono: 'Space Mono', monospace;

--weight-light: 300;
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;

--text-xs: 10-11px;    /* badges, vendor labels */
--text-sm: 12-13px;    /* body text, descriptions */
--text-base: 14px;     /* nav links, buttons */
--text-md: 15px;       /* card titles */
--text-lg: 16px;       /* section descriptions */
--text-xl: 18px;       /* stat numbers (min) */
--text-2xl: 24-28px;   /* stat numbers (max) */
--text-3xl: 28-40px;   /* section H2 (fluid) */
--text-4xl: 44-76px;   /* hero H1 (fluid) */
```

### Spacing Tokens

```css
--space-nav-height: 68px;
--space-section: 80px;
--space-section-x: 24px;
--space-card: 28px;
--space-card-radius: 14px;
--space-btn-radius: 10px;
--space-btn-padding: 12px 24px;
--space-content-max: 1140px;
--space-grid-gap: 12-16px;
```

### Animation Tokens

```css
--transition-fast: 0.2s;
--transition-normal: 0.25s;
--transition-slow: 0.3s;
--pulse-duration: 2s;
--pulse: { 0%, 100% { opacity: 1 } 50% { opacity: 0.4 } };
```

---

*End of Project Requirements Document for itrust.academy*
