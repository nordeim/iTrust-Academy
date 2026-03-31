# Comparative Analysis Report

## iTrust Academy — Dual Website Comparison

**Site A**: `https://itrust-academy.jesspete.shop/` (Sister Site / Jesspete)  
**Site B**: `https://www.itrust.academy/` (iTrustech / Production Site)  
**Analysis Date**: 31 March 2026

---

## 1. Executive Summary

These two websites represent the same brand — **iTrust Academy**, an enterprise IT training provider for SolarWinds, Securden, Quest, and Ivanti platforms. However, they are **fundamentally different implementations** that appear to serve different strategic purposes:

- **Site A** (jesspete.shop) is a **marketing-first showcase** with a rich UI featuring animations, a full course catalog with pricing, and a modern SaaS-style design built with Tailwind CSS. It reads like a product that is positioning itself for investment or client acquisition.

- **Site B** (itrust.academy) is a **functional training portal** with real course schedules, SCP exam domain mappings, a contact form, and a blog. It is more utilitarian and clearly connected to the parent company iTrustech. It reads like an actual operating business website.

This report provides a comprehensive side-by-side comparison across all dimensions: technology, design, content, UX, SEO, accessibility, and strategic alignment.

---

## 2. Technology Stack Comparison

| Dimension | Site A (jesspete.shop) | Site B (itrust.academy) | Winner |
|-----------|------------------------|------------------------|--------|
| **Build Tool** | Vite | Vite | Tie |
| **Framework** | React 18+ | React 18+ | Tie |
| **CSS Approach** | Tailwind CSS v4 (utility classes) | Inline CSS (JavaScript objects) | Site A — more maintainable |
| **Routing** | React Router (hash + path) | Internal state (no URL routing) | Site A — proper routing |
| **Code Splitting** | Yes (lazy-loaded chunks) | No (single bundle) | Site A — better performance |
| **Icon Library** | Lucide React (30+ icons) | Inline SVG + Emoji | Site A — more consistent |
| **Toast System** | Sonner (installed) | None | Site A |
| **Analytics** | Cloudflare Web Analytics | None | Site A |
| **Bundle Size** | Multiple chunks (index + 8 lazy) | Single `index.js` | Site B — fewer requests |
| **External CSS** | Google Fonts + Tailwind CSS | Google Fonts (inline) | Site B — fewer requests |
| **Load Performance** | ~87ms | ~22ms | Site B — 4x faster |
| **Font Loading** | `<link>` + preconnect | `@import` in `<style>` | Site A — better practice |
| **Favicon** | SVG favicon | PNG favicon | Tie |

**Key Insight**: Site A uses a more sophisticated, production-grade tech stack (Tailwind, React Router, code splitting, Sonner) while Site B takes a minimalist approach (inline CSS, no routing, single bundle) that results in faster raw load times but at the cost of maintainability and functionality.

---

## 3. Design System Comparison

### 3.1 Color System

| Aspect | Site A | Site B |
|--------|--------|--------|
| **Primary Brand** | `#F27A1A` (CSS variable `--primary`) | `#F27A1A` (hardcoded) |
| **Design Token System** | Full CSS custom properties (`:root`) | None — hardcoded values |
| **Vendor Colors** | SolarWinds: `rgb(123,135,148)` slate | SolarWinds: `#F27A1A` orange |
| | Securden: `rgb(14,165,233)` sky blue | Securden: `#2BBCB3` teal |
| | Quest: `rgb(99,102,241)` indigo | Quest: `#3B82F6` blue |
| | Ivanti: `rgb(236,72,153)` pink | Ivanti: `#7C3AED` purple |
| **Dark Mode Support** | CSS classes exist (partial) | None |
| **Custom Selection** | Browser default | Branded orange |
| **Custom Scrollbar** | Browser default | Branded orange |

**Key Insight**: Site A uses distinct vendor colors (slate, sky, indigo, pink) that are clearly different from the brand orange, creating strong visual differentiation. Site B uses the brand orange for SolarWinds — confusing brand identity with vendor identity. Site B has more intentional micro-branding (selection, scrollbar) but lacks a token system.

### 3.2 Typography

| Aspect | Site A | Site B |
|--------|--------|--------|
| **Primary Font** | DM Sans | DM Sans |
| **Accent Font** | Space Mono | Space Mono |
| **Button Font** | Space Mono (monospace) | DM Sans (sans-serif) |
| **Nav Font** | Space Mono (monospace) | DM Sans (sans-serif) |
| **Responsive Type** | Tailwind breakpoint classes | CSS `clamp()` fluid functions |
| **Hero H1 Size** | 36-72px (4 breakpoint steps) | 44.8-76.8px (fluid) |
| **Section H2 Size** | 30-48px (3 breakpoint steps) | 28-40px (fluid) |
| **Hero Weight** | 700 (bold) | 700 (bold) |
| **Subtitle Weight** | 400 (normal) | 300 (light) |

**Key Insight**: Site A uses monospace for buttons and navigation (creating a technical/engineering aesthetic), while Site B uses sans-serif everywhere (creating a cleaner, more corporate look). Site B's fluid typography via `clamp()` is more elegant than Site A's breakpoint jumps.

### 3.3 Layout & Spacing

| Aspect | Site A | Site B |
|--------|--------|--------|
| **Max Width** | 1280px (`max-w-7xl`) | 1140px |
| **Section Padding** | 64-128px vertical | 80px vertical (fixed) |
| **Card Padding** | 24px (`p-6`) | 28px |
| **Card Radius** | 12px (`rounded-xl`) | 14px |
| **Button Radius** | 8px (`rounded-lg`) | 10px |
| **Nav Height** | 64-80px (responsive) | 68px (fixed) |
| **Hero Min-Height** | 90vh | 92vh |

**Key Insight**: Site A has slightly more compact spacing and smaller border radii. Site B uses fixed spacing values while Site A varies section padding by viewport. Both use similar hero heights (~90-92vh).

---

## 4. Content Comparison

### 4.1 Homepage Sections

| Section | Site A | Site B | Analysis |
|---------|--------|--------|----------|
| **Hero Badge** | "Asia-Pacific's Premier IT Training Provider" | "NOW ENROLLING — Q2 2026" | Different strategies: A = authority, B = urgency |
| **Hero CTA** | "Explore SCP Fundamentals" + "View All Courses" (with icons) | "Explore SCP Fundamentals →" + "View All Courses" (one icon) | Similar but A has richer button design |
| **Stats Bar** | 4 stats (same content) | 4 stats (same content) | Identical data |
| **Social Proof Bar** | 15,000+ trained, 500+ clients, 98% satisfaction, 4 partners | None | **A has significant credibility advantage** |
| **Vendor Partners** | 4 cards with letter icons, descriptions, course counts, arrow icons | 4 cards with descriptions only | A is more interactive; B has richer text |
| **Why Choose Us** | 6 items (generic titles only) | 6 items (emoji icons + detailed descriptions) | **B has far superior content quality** |
| **Course Catalog** | 9 courses with full data (pricing, duration, rating, enrolled) | 5 courses listed (1 detailed, 4 headings only) | **A has vastly more complete catalog** |
| **Course Search/Filter** | Search bar + 6 category filters | 7 vendor filter buttons | Both have filtering |
| **Featured Course** | None | Deep SCP course with exam domain mapping | **B has unique exam prep content** |
| **Training Calendar** | 4 courses listed with "Enroll Now" | 3 real dates with location + "Available" badges | **B has real scheduling data** |
| **Enterprise Features** | 6 value props (titles only) | N/A (in Why Choose Us section) | A has more feature categories |
| **Solutions** | 4 cards (Corporate, Bootcamps, Managed, Assessment) | 5 professional services links → iTrustech | B is linked to actual services |
| **Testimonials** | "Trusted by Industry Leaders" heading (no content) | None | Neither has real testimonials |
| **CTA Section** | "Ready to Upskill Your IT Team?" + 2 buttons | "Start Your Training Journey" button (in Contact view) | A has dedicated CTA |
| **Blog** | None (footer link only) | 4 article cards with titles | **B has actual blog content** |
| **Contact Form** | None (Sign In / Register buttons non-functional) | Full form with 8 fields + dropdowns | **B has functional-looking form** |

### 4.2 Content Depth Scorecard

| Content Category | Site A | Site B |
|-----------------|--------|--------|
| Course catalog completeness | ★★★★★ (9 courses, full data) | ★★☆☆☆ (1 detailed, 4 stubs) |
| Course detail pages | ★★★★☆ (tabs: Overview/Curriculum/Instructor/Cert) | ★☆☆☆☆ (only homepage featured section) |
| Pricing transparency | ★★★★★ (all prices shown) | ☆☆☆☆☆ (no prices anywhere) |
| Schedule realism | ★★☆☆☆ (no dates, no locations) | ★★★★★ (real dates, locations, modes) |
| Certification detail | ★★☆☆☆ (mentioned but not detailed) | ★★★★★ (SCP exam domain %, day mapping) |
| Professional services | ★★☆☆☆ (generic service cards) | ★★★★☆ (links to real iTrustech pages) |
| Blog / thought leadership | ☆☆☆☆☆ (none) | ★★★☆☆ (4 article titles) |
| Contact / lead capture | ☆☆☆☆☆ (non-functional buttons) | ★★★★☆ (full form with dropdowns) |
| Social proof / credibility | ★★★★☆ (stats bar, though unverified) | ★★☆☆☆ (vendor partnerships only) |
| Multi-language mention | ☆☆☆☆☆ (not mentioned) | ★★★☆☆ (English, Mandarin, Bahasa Melayu) |
| **Overall Content Score** | **23/40** | **27/40** |

**Key Insight**: Site A excels at breadth (many courses, full pricing) while Site B excels at depth (exam mapping, real schedules, professional services). Neither site is comprehensive — the ideal site would combine A's catalog breadth with B's content depth.

### 4.3 Data Consistency Issues

| Issue | Site A | Site B |
|-------|--------|--------|
| **Duration inconsistency** | "5 weeks" on homepage, "5 days" on detail page | Uses "3 days" consistently |
| **Phone number** | "+65 1234 5678" (placeholder) | Not shown |
| **Pricing model** | USD prices shown ($1,799-$2,999) | No prices shown |
| **Course count** | 9 courses | 5 listed (+ 2 "Coming Soon") |

---

## 5. UX & Interactivity Comparison

### 5.1 Navigation

| Feature | Site A | Site B |
|---------|--------|--------|
| **Routing type** | URL-based (hash + path) | State-based (no URL change) |
| **Back button support** | Yes (hash routing) | No |
| **Bookmarkable views** | Partial (home sections via hash) | No |
| **Active nav indicator** | None visible | Orange bottom border |
| **Mobile menu** | Full-screen overlay with animation | Slide-in panel |
| **Nav items are** | `<a>` elements (proper) | `<button>` elements (improper) |
| **Nav labels** | COURSES, SOLUTIONS, ABOUT, CONTACT | Home, Courses, Schedule, Blog, Contact |
| **Auth buttons** | Sign In + Register (non-functional) | Enroll Now (behavior unclear) |

**Verdict**: Site A has better technical navigation (proper elements, URL routing, back button). Site B has better visual active state indicator but fundamentally broken navigation architecture.

### 5.2 Animations & Motion

| Feature | Site A | Site B |
|---------|--------|--------|
| **Scroll-triggered animations** | Yes (fade-in-up via IntersectionObserver) | None |
| **Hover effects on cards** | Yes (lift + shadow + border color) | None (transition declared but unused) |
| **Hover effects on buttons** | Yes (lift + shadow + arrow translate) | Minimal (transition only) |
| **Hover effects on nav** | Yes (underline grow + background) | Color change via bottom border |
| **Pulse animation** | Yes (hero badge dot) | Yes (hero badge dot) |
| **Skeleton loading** | Yes (course cards) | None |
| **Page transitions** | None visible | None visible |

**Verdict**: Site A has significantly richer motion design. Site B is essentially static with minimal interactivity feedback.

### 5.3 Responsive Design

| Feature | Site A | Site B |
|---------|--------|--------|
| **Breakpoints** | 5 (sm, md, lg, xl, 2xl) | 1 (768px) |
| **Tablet optimization** | Yes (md, lg breakpoints) | No |
| **Mobile nav** | Full-screen overlay with logo, nav, auth buttons | Slide-in panel |
| **Fluid typography** | No (Tailwind steps) | Yes (CSS clamp) |
| **Adaptive grids** | Complex multi-breakpoint | Simple auto-fit with single breakpoint |

**Verdict**: Site A has a more polished responsive experience with dedicated tablet states. Site B's fluid typography is more modern but the single breakpoint creates jarring layout shifts.

---

## 6. SEO Comparison

| Factor | Site A | Site B |
|--------|--------|--------|
| **Title tag** | "iTrust Academy — Enterprise IT Training & Certification" | "iTrust Academy \| IT Training & Certification Across Asia" |
| **Meta description** | Yes | Yes |
| **Internal page indexability** | Yes (separate routes for courses, about) | No (single URL for all views) |
| **Open Graph tags** | Missing | Missing |
| **Twitter Cards** | Missing | Missing |
| **Canonical URL** | Missing | Missing |
| **Structured Data** | Missing | Missing |
| **Sitemap** | Missing | Missing |
| **robots.txt** | Missing | Missing |
| **Per-page titles** | No (shared title) | No (shared title) |
| **lang attribute** | No (missing) | Yes (`lang="en"`) |

**Verdict**: Both sites have poor SEO. Site A has an architectural advantage (multiple routes), but neither implements basic SEO best practices. Site B is at a fundamental disadvantage because all content lives on one URL.

---

## 7. Accessibility Comparison

| Factor | Site A | Site B |
|--------|--------|--------|
| **Semantic HTML** | Good (`<header>`, `<main>`, `<footer>`, `<nav>`) | Minimal (no `<footer>`, `<main>`) |
| **ARIA labels** | Yes (nav, menu, notifications) | No |
| **Role attributes** | Yes (tabs with `role="tab"`) | No |
| **Live regions** | Yes (`aria-live="polite"`) | No |
| **Focus management** | Yes (`focus-visible:ring`) | No visible focus ring |
| **Skip-to-content** | No | No |
| **Form labels** | N/A (no forms) | Partial (placeholder-only) |
| **Icon accessibility** | `aria-hidden="true"` on all icons | No attributes on emoji |
| **Dark mode** | Partial CSS support | None |
| **Language attr** | Missing | Yes |

**Verdict**: Site A has significantly better accessibility with ARIA attributes, semantic elements, and focus management. Site B has almost no accessibility features.

---

## 8. Visual Aesthetics Comparison

### 8.1 Design Philosophy

| Aspect | Site A | Site B |
|--------|--------|--------|
| **Aesthetic** | Modern SaaS / tech-forward | Corporate / utilitarian |
| **Visual complexity** | High (gradients, shadows, animations, patterns) | Low (flat, minimal decoration) |
| **White space** | Generous (varying section padding) | Moderate (fixed 80px padding) |
| **Color usage** | Restrained with intentional brand pops | Functional, vendor-differentiated |
| **Iconography** | Professional (Lucide SVG icons) | Mixed (emoji + inline SVG) |
| **Typography feel** | Technical/engineering (monospace accents) | Clean/corporate (all sans-serif) |
| **Card design** | Rich (top color bar, badges, metadata, pricing) | Simple (border, text only) |
| **Hero feel** | Aspirational + decorative | Informational + urgent |

### 8.2 Decorative Elements

| Element | Site A | Site B |
|---------|--------|--------|
| **Background pattern** | CSS grid lines (4rem × 4rem) | CSS grid lines (60px × 60px) |
| **Gradient blobs** | 2 decorative blur circles | 1 radial gradient circle |
| **Underline decoration** | SVG wave on "Certified." | None |
| **Scrollbar** | Browser default | Branded orange |
| **Text selection** | Browser default | Branded orange |

**Verdict**: Site A has a more visually rich and polished design with multiple decorative layers. Site B has a cleaner, more restrained design with thoughtful micro-branding touches (selection, scrollbar).

---

## 9. Strategic Alignment Comparison

### 9.1 Business Purpose

| Dimension | Site A | Site B |
|-----------|--------|--------|
| **Primary purpose** | Marketing / lead generation | Training operations / enrollment |
| **Target user** | Enterprise buyers, individual professionals | IT professionals seeking training |
| **Parent company link** | None (stands alone) | Strong link to iTrustech |
| **Revenue model implied** | Course sales ($1,799-$2,999) | Inquiry-based (contact form) |
| **Content freshness** | Q2 2026 enrollment badge | Q2 2026 enrollment badge |
| **Geographic focus** | Asia-Pacific (implied) | Asia-Pacific (explicit, with country dropdown) |

### 9.2 Trust & Credibility

| Factor | Site A | Site B |
|--------|--------|--------|
| **Social proof stats** | Yes (15,000+ trained, 500+ clients, 98%) | No |
| **Vendor partnerships** | Listed | Listed with "Authorized" emphasis |
| **Instructor credentials** | "Expert Instructors" (vague) | "SolarWinds Certified Instructors" (specific) |
| **Exam details** | Mentioned | Full SCP exam domain breakdown |
| **Real schedule** | No real dates | Yes (Apr 2026 dates, Singapore, Zoom) |
| **External validation** | None | Links to SolarWinds SCP exam page |
| **Company address** | Singapore (in footer) | Not shown |

### 9.3 Feature Completeness Matrix

| Feature | Site A | Site B |
|---------|--------|--------|
| Course catalog | ✅ Full (9 courses) | ⚠️ Partial (1 + 4 stubs) |
| Course detail pages | ✅ Yes (3+ tabs) | ❌ No separate pages |
| Course pricing | ✅ All prices shown | ❌ No pricing |
| Course search | ✅ Text search | ❌ No search |
| Course filtering | ✅ Category filters | ✅ Vendor filters |
| Training schedule | ⚠️ No real dates | ✅ Real dates + locations |
| Exam preparation | ⚠️ Mentioned | ✅ Full domain mapping |
| Registration/enrollment | ❌ Non-functional buttons | ⚠️ "Register Interest" buttons |
| Contact form | ❌ Non-functional buttons | ✅ Full form |
| Blog | ❌ Placeholder links only | ✅ 4 articles listed |
| Professional services | ✅ Generic cards | ✅ Links to iTrustech |
| User authentication | ❌ Buttons present, non-functional | ❌ Not available |
| Multi-language | ❌ Not mentioned | ✅ Mentioned (3 languages) |
| About page | ✅ Full page | ❌ Links to iTrustech |
| FAQ page | ❌ Placeholder link | ❌ Not available |
| Privacy / Terms | ❌ Footer links only | ❌ Not available |

---

## 10. Defect Comparison

### 10.1 Shared Defects (Both Sites)

| Defect | Severity |
|--------|----------|
| No Open Graph / Twitter meta tags | Medium |
| No structured data (JSON-LD) | Medium |
| No canonical URLs | Medium |
| No sitemap / robots.txt | Medium |
| No skip-to-content link | Medium |
| No 404 error page | Medium |
| No cookie consent mechanism | Medium |
| No testimonials with real content | Medium |
| No social media links in footer | Medium |
| Non-functional authentication | High (Site A) / N/A (Site B) |
| Incomplete footer pages (FAQ, Careers, Blog) | Medium |

### 10.2 Site A Unique Defects

| Defect | Severity |
|--------|----------|
| "5 weeks" vs "5 days" duration inconsistency | Critical |
| Non-functional Sign In / Register buttons | Critical |
| Filter hydration mismatch (server vs client) | Critical |
| Placeholder phone number | Medium |
| No real course schedule data | Medium |
| No professional services integration | Low |

### 10.3 Site B Unique Defects

| Defect | Severity |
|--------|----------|
| No URL-based routing (all views on one URL) | Critical |
| No browser back button support | Critical |
| No hover effects on cards (dead transition code) | High |
| "Enroll Now" button has no effect | High |
| Most courses have no detail content (plain headings) | High |
| No pricing anywhere on site | High |
| No contact information (email, phone, address) | Medium |
| No social media presence | Medium |
| No copyright notice | Medium |
| Nav uses `<button>` instead of `<a>` | Medium |
| No form validation or submission confirmed | Medium |
| Single responsive breakpoint only | Medium |
| No accessibility features (ARIA, focus, skip-nav) | High |

---

## 11. Strengths & Weaknesses Summary

### Site A (jesspete.shop)

| Strengths | Weaknesses |
|-----------|-----------|
| ✅ Superior visual design and polish | ❌ Data inconsistencies ("weeks" vs "days") |
| ✅ Rich animations and micro-interactions | ❌ Non-functional authentication flow |
| ✅ Complete course catalog with pricing | ❌ No real scheduling data |
| ✅ Proper URL-based routing | ❌ No real contact/enrollment mechanism |
| ✅ Code-split, production-grade architecture | ❌ No professional services integration |
| ✅ Good accessibility foundations | ❌ Placeholder contact info |
| ✅ Responsive across 5 breakpoints | ❌ Superficial content ("Enterprise-First", "Flexible Formats") |
| ✅ Skeleton loading states | ❌ No blog content |
| ✅ Course detail pages with tabs | ❌ No SCP exam detail |

### Site B (itrust.academy)

| Strengths | Weaknesses |
|-----------|-----------|
| ✅ Real course schedule with dates/locations | ❌ No URL routing — fundamentally broken navigation |
| ✅ SCP exam domain mapping (unique content) | ❌ No hover effects (dead code) |
| ✅ Functional contact form | ❌ Most courses have no detail pages |
| ✅ Blog with article titles | ❌ No pricing anywhere |
| ✅ Multi-language training mentioned | ❌ No accessibility features |
| ✅ Professional services links to iTrustech | ❌ No social proof / testimonials |
| ✅ Specific instructor credentials | ❌ No social media links |
| ✅ Branded micro-details (scrollbar, selection) | ❌ No animations or dynamic feedback |
| ✅ Fluid typography via clamp() | ❌ No form validation |
| ✅ 4x faster initial load time | ❌ No analytics |

---

## 12. Consolidated Recommendations

### 12.1 Immediate Priorities (Both Sites)

1. **Merge into a single, authoritative website** — Having two separate sites for the same brand creates confusion, dilutes SEO, and splits analytics. Choose the best of both and consolidate.

2. **Implement proper URL routing** — Adopt Site A's React Router approach to enable bookmarking, back-button navigation, and SEO for all views.

3. **Add basic SEO** — Both sites need Open Graph tags, Twitter Cards, canonical URLs, sitemap.xml, robots.txt, and structured data. This is table-stakes for any modern website.

4. **Fix data inconsistencies** — Resolve the "weeks" vs "days" discrepancy. Audit all course data across the site and establish a single source of truth.

5. **Make authentication functional or remove it** — Non-functional Sign In / Register buttons erode trust. Either build the flow or remove the buttons.

### 12.2 Recommended Architecture for Merged Site

**From Site A (take these)**:
- Tailwind CSS utility-class approach (more maintainable than inline CSS)
- React Router with proper URL-based routing
- Lucide React icon library (more consistent than emoji)
- Scroll-triggered fade-in animations
- Rich hover micro-interactions on cards and buttons
- Skeleton loading states
- 5-breakpoint responsive system
- Accessibility foundations (ARIA, focus management)
- Code splitting for performance

**From Site B (take these)**:
- Real course schedule with dates, locations, and availability badges
- SCP exam domain-to-curriculum mapping
- Detailed "Why Choose Us" descriptions (not just titles)
- Functional contact form with country/vendor/team-size dropdowns
- Blog section with article cards
- Professional services cross-linking to iTrustech
- Fluid typography via CSS `clamp()`
- Branded micro-details (custom scrollbar, text selection)
- Multi-language training mention
- Specific instructor credentials

**New (add these)**:
- Complete course detail pages for all 9 courses (combining A's template with B's depth)
- Real pricing on all courses
- Testimonials / social proof section
- Open Graph, Twitter Cards, structured data
- Social media links (LinkedIn minimum)
- Cookie consent banner
- 404 error page
- FAQ page with real content
- Privacy Policy and Terms of Service pages
- Analytics (privacy-respecting)
- Contact information in footer (email, phone, Singapore address)

### 12.3 Design Direction

The merged site should follow Site A's **modern SaaS aesthetic** as the visual foundation, enhanced with:

1. **Vendor-differentiated color system** from Site B (but fix SolarWinds to not use brand orange)
2. **Content depth** from Site B (real schedules, exam details, instructor credentials)
3. **Fluid typography** from Site B (clamp() is more elegant than breakpoint steps)
4. **Branded micro-details** from Site B (scrollbar, selection color)
5. **Complete information architecture** combining both sites' sections

---

## 13. Conclusion

Neither site is production-ready as-is. Site A is a **visually polished shell with superficial content**, while Site B is a **content-rich prototype with fundamental architectural problems**. The ideal iTrust Academy website would combine Site A's superior design and engineering with Site B's authentic content and business logic, then fill in the gaps identified in this report (pricing, testimonials, SEO, accessibility, legal pages, and functional forms).

The most critical decision is whether to **merge these sites** or **choose one as the canonical version**. Given that `itrust.academy` is the natural brand domain and has the more authentic business content, it would be the logical canonical choice — but it requires significant investment in design quality, routing architecture, and content completion to match Site A's visual standard.

---

# https://chat.z.ai/s/ce1e796c-4599-4c7c-915e-c2e95a41d492

