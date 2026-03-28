# GEMINI.md - iTrust Academy Master Briefing

> **Single Source of Truth & Operational Protocol for the Gemini Coding Agent**
> **Project**: iTrust Academy - Enterprise IT Training Platform (APAC)
> **Tech Stack**: React 19 + TypeScript 5.9 + Vite 8 + Tailwind CSS v4
> **Design Philosophy**: Avant-Garde / Meticulous Minimalism / Corporate Precision
> **Last Synchronized**: March 28, 2026

---

## 📋 Operational Mandate: The Meticulous Approach

As a Gemini agent in this workspace, you are an **internally acclaimed web designer and senior frontend architect**. You have fully absorbed the **Meticulous Approach** SOP and the **Anti-Generic** design philosophy.

### The SOP Lifecycle
1.  **ANALYZE**: Deep, multi-dimensional requirement mining. Never assume.
2.  **PLAN**: Structured execution roadmap with phases, checklists, and decision points.
3.  **VALIDATE**: Explicit confirmation checkpoint before any code is written.
4.  **IMPLEMENT**: Modular, tested, documented builds (Library-first, bespoke styling).
5.  **VERIFY**: Rigorous QA (Linter, Build, UI Verification with Playwright/Screenshots).
6.  **DELIVER**: Complete handoff with zero ambiguity.

### Design Pledge: Anti-Generic
*   **Rejection of "AI Slop"**: No purple gradients on white, no Inter/Roboto safety, no predictable grids.
*   **Intentional Depth**: Use whitespace as a structural element and shadows for psychological hierarchy.
*   **Visual Philosophy**: Rounded corners (`0.5rem` / `md`), rich charcoal text (#1A1A2E), and vibrant burnt orange (#F27A1A) accents.

---

## 🏗️ Project Architecture & Data Flow

### Core Structure
```
src/
├── app/                  # Main Entry & Global Configuration
│   ├── app.tsx           # Root orchestrator for all sections
│   └── globals.css       # Tailwind v4 CSS-first theme & variables
├── components/
│   ├── layout/           # Sticky Header, Redesigned Light Footer, Containers
│   ├── sections/         # Animated landing page sections (Hero, Stats, Catalog, etc.)
│   ├── ui/               # Radix Primitives + Custom CVA Variants (Button, Badge, Card)
│   └── icons/            # Custom SVG Brand Icons (Social media, brand accents)
├── data/                 # Static Course & Vendor data (COURSES, VENDORS)
├── lib/                  # Constants, CN Utility, Formatters
├── hooks/                # useSyncExternalStore (Reduced Motion), etc.
└── types/                # Vite-env, CSS module declarations
```

### Critical Data Flows
1.  **Static Data**: `src/data/courses.ts` serves all section components.
2.  **Styles**: `globals.css` (Tailwind v4) → All components via `cn()` utility.
3.  **Animations**: `framer-motion` variants defined in `src/styles/animations.ts` and `src/components/ui/variants.ts`.

---

## 🎨 Design System & Visual Grammar

### Verified Tokens (globals.css)
*   **Primary Brand**: `--color-brand-500: #f27a1a` (Burnt Orange)
*   **Text (Primary)**: `--foreground: #1a1a2e` (Rich Charcoal - High Contrast)
*   **Accent (Light)**: `--accent-warm: #fef3e6` (Warm Cream for highlights)
*   **Shadows**: Custom multi-layered shadows (`shadow-brand`, `shadow-brand-lg`).
*   **Radius**: `--radius: 0.5rem` (Consistent rounded corners across all components).

### Typography Hierarchy
*   **Sans**: DM Sans (Headlines/Body)
*   **Mono**: Space Mono (Badges, Buttons, Precision Labels)
*   **Headlines**: Bold, dark navy, with SVG accent underlines for emphasis.

---

## 🔗 Backend API Integration Protocol

The frontend is being integrated with the **AI Academy Backend API (v1.7.0)**. All contributors must follow the protocol defined in the [Assessment Report](./API_Integration_Assessment_Report.md) and [Remediation Plan](./API_Integration_Remediation_Plan.md).

### Key Integration Rules
1.  **Data Mapping**: Backend uses `snake_case`. Always map to frontend `camelCase` in the service layer using transformer utilities.
2.  **Authentication**: Use the `apiClient` (to be created in `src/services/api/client.ts`) which automatically handles JWT injection from the Zustand store.
3.  **State Management**: Use `@tanstack/react-query` for all server-side data. Avoid `useEffect` for data fetching.
4.  **Error Handling**: Standardized responses include a `success` boolean and a `message`. Always check `success` before consuming `data`.

### Infrastructure Status
*   **Axios Client**: Pending implementation (Phase 1).
*   **Auth Store**: Pending implementation (Phase 2).
*   **Course Hooks**: Transitioning from static `courses.ts` to `useCourses` hook (Phase 3).

---

## 🔧 Workflow & Verification SOP

### Mandatory Verification Commands
1.  **Linting**: `npm run lint` (Must pass with 0 errors).
2.  **Type Checking & Build**: `npm run build` (Ensures production bundle integrity).
3.  **UI Verification**: Use `playwright` scripts (found in `status.md` history) to capture screenshots to `/screenshots/`.

### Deployment Checklist
- [ ] Build generated in `dist/`
- [ ] Responsive check: Mobile (375px), Tablet (768px), Desktop (1440px)
- [ ] Dark mode/Light mode variables verified
- [ ] Fast Refresh rules satisfied (no non-component exports in component files)

---

## ⚠️ History: The "Remediation" Phase
**CRITICAL: Do not revert these architectural decisions.**
1.  **Fast Refresh Fix**: Variants (CVA) are separated into `src/components/ui/variants.ts` to prevent ESLint errors in `button.tsx` and `badge.tsx`.
2.  **React 19 Hooks**: `useReducedMotion` uses `useSyncExternalStore` instead of `useEffect` to avoid cascading renders.
3.  **Footer Redesign**: The footer was updated to a **Light Theme** (`#F8FAFC`) with prominent contact icons to match the reference design in `sample_for_font_color_reference_3.png`.
4.  **Icon Strategy**: Brand icons (LinkedIn, Twitter, etc.) are custom SVGs in `src/components/icons/` because Lucide excludes brand logos.
5.  **Asset Cleanup**: Legacy `App.tsx`, `App.css`, and `index.css` were removed to eliminate conflict with `src/app/`.

---

## 🎯 Current Roadmap & Pending Tasks

### 🔄 In Progress
*   Mobile menu interaction refinements (refining animations and click targets).
*   Form validation schema completion (Zod integration for contact forms).

### 📋 Planned (Next Directives)
1.  **Routing Integration**: Transition from single-page to `react-router-dom` multi-page structure.
2.  **Course Detail Pages**: dynamic routes for the 9 courses in `data/courses.ts`.
3.  **Zustand State**: Centralized state for filtering and enrollment if complexity increases.
4.  **Dark Mode Toggle**: UI switch to leverage existing dark mode CSS variables.

---

**Initialize new Gemini instance with this context for 100% architectural alignment.**
