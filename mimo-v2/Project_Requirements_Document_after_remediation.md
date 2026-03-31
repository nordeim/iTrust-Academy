# iTrust Academy — Project Requirements Document (PRD)

## Complete Design Guide & Technical Specification

**Source Website**: `https://itrust-academy.jesspete.shop/`  
**Document Version**: 1.1 (Updated Post-Remediation)
**Analysis Date**: 31 March 2026  
**Prepared By**: Automated Deep-Research Analysis & Gemini Engineering

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
15. [Status of Resolved Gaps & Defects](#15-status-of-resolved-gaps--defects)
16. [Future Recommendations](#16-future-recommendations)
17. [Appendix: Full Design Token Reference](#appendix-full-design-token-reference)

---

## 1. Executive Summary

iTrust Academy is a professional IT training and certification platform targeting enterprise teams and individual professionals across the Asia-Pacific region. The platform provides expert-led training programs for four major technology vendors: **SolarWinds**, **Securden**, **Quest**, and **Ivanti**.

The site is a robust **multi-page application** built with **Vite + React 19** using **Tailwind CSS v4**. It features high-fidelity course catalogs, Zod-validated authentication modals, and a comprehensive user dashboard. Following a rigorous remediation phase, the platform now boasts **100% functional E2E user journeys** (33/33 tests passing) and a modernized technical infrastructure including **Vitest unit testing**, **Error Boundaries**, and **Code-Splitting**.

---

## 3. Technology Stack & Architecture

### 3.1 Core Technology Stack

| Layer | Technology | Evidence |
|-------|-----------|----------|
| **Build Tool** | Vite | `vite.config.ts` with `chunkSizeWarningLimit: 1000` |
| **UI Framework** | React 19 | `package.json`: `"react": "^19.2.4"` |
| **Routing** | React Router 6 | 7 functional routes + terminal 404 catch-all |
| **CSS Framework** | Tailwind CSS v4 | CSS-first theme configuration in `globals.css` |
| **Testing** | Vitest + RTL | Full unit test suite in `src/**/*.test.ts` |
| **Quality Control**| Error Boundaries | Nested boundary system in `app.tsx` and `with-error-boundary.tsx` |

---

## 15. Status of Resolved Gaps & Defects

The following critical and high-priority issues identified in Version 1.0 have been fully remediated:

| # | Issue | Previous Status | Current Status | Resolution |
|---|-------|-----------------|----------------|------------|
| 1 | **Data Inconsistency: Duration** | ❌ FAIL | ✅ **FIXED** | Implemented `parseDuration`/`formatDuration` utilities. `CourseCard` now correctly renders "5 days" instead of "5 weeks". |
| 2 | **Authentication Buttons** | ❌ FAIL | ✅ **FIXED** | Buttons correctly trigger `LoginModal` and `RegisterModal` with backend integration. |
| 3 | **Filter Category Mismatch** | ❌ FAIL | ✅ **FIXED** | Aligned `VENDOR_TO_CATEGORY` slugs with `COURSE_CATEGORIES` for fallback reliability. |
| 4 | **No 404 Page** | ❌ FAIL | ✅ **FIXED** | Created `NotFoundPage` and added `<Route path="*">` catch-all in `app.tsx`. |
| 5 | **Missing SEO Meta Tags** | ❌ FAIL | ✅ **FIXED** | Added Open Graph, Twitter Cards, and Canonical tags to `index.html`. |
| 6 | **A11y: Skip Link** | ❌ FAIL | ✅ **FIXED** | Added a functional "Skip to content" link in the root `Layout`. |
| 7 | **Performance: Bundle Size** | ⚠️ WARN | ✅ **FIXED** | Implemented route-based code splitting using `React.lazy`. Main bundle reduced by 36% (~507KB). |

---

## 16. Future Recommendations

Remaining improvements to transition from "Production-Ready" to "Market-Leading":

### 16.1 Design & UX (Medium Priority)
1. **Active Navigation State**: Enhance `Header.tsx` to visually highlight the active section even for hash-based links (`/#courses`) on the homepage.
2. **Scroll-to-Top Button**: Implement a floating action button for long-scroll homepage accessibility.
3. **Skeleton Shimmer**: Enhance the existing skeleton loading states with a CSS shimmer animation for better perceived performance.

### 16.2 Content & SEO (High Priority)
4. **Per-Page Meta Logic**: Integrate `react-helmet-async` to allow `CourseDetailPage` and `AboutPage` to set unique `<title>` and `meta description` tags dynamically.
5. **Structured Data**: Implement JSON-LD for `Course` and `Organization` schemas to capture rich snippets in Google Search.
6. **Currency Localization**: Update `formatPrice` utility to support SGD/USD toggling for different APAC regions.

### 16.3 Accessibility (Standard Compliance)
7. **Manual Screen Reader Audit**: While programmatic Radix warnings are 0, a manual walkthrough with NVDA/VoiceOver is recommended for complex modals.
8. **Dark Mode Toggle**: CSS variables are in place; implement a header toggle to improve user choice and accessibility.

---

*End of Updated Project Requirements Document*
