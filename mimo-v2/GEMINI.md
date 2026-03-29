# GEMINI.md - iTrust Academy Master Briefing

> **Single Source of Truth & Operational Protocol for the Gemini Coding Agent**
> **Project**: iTrust Academy - Enterprise IT Training Platform (APAC)
> **Tech Stack**: React 19 + TypeScript 5.9 + Vite 8 + Tailwind CSS v4 + Django REST API
> **Design Philosophy**: Avant-Garde / Meticulous Minimalism / Corporate Precision
> **Last Synchronized**: March 29, 2026

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

### Core Structure (Updated)
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
├── services/
│   └── api/              # API Integration Layer
│       ├── client.ts     # Axios + JWT interceptors
│       ├── types.ts      # Backend/Frontend type definitions
│       ├── transformers.ts # snake_case → camelCase
│       ├── courses.ts    # Course API functions
│       ├── categories.ts # Category API functions
│       └── auth.ts       # Auth API functions
├── store/
│   └── useAuthStore.ts   # Zustand JWT token management
├── hooks/
│   ├── useCourses.ts     # Course query hooks (React Query)
│   ├── useCategories.ts  # Category query hooks (React Query)
│   ├── useAuth.ts        # Auth mutation hooks
│   └── useReducedMotion.ts # Accessibility hook
├── providers/
│   └── QueryProvider.tsx # React Query configuration
├── data/                 # Static Course & Vendor data (fallback)
├── lib/                  # Constants, CN Utility, Formatters
└── types/                # Vite-env, CSS module declarations
```

### Critical Data Flows (Updated)
1.  **API Data**: `apiClient` → `React Query` → `useCourses/useCategories` → Components
2.  **Styles**: `globals.css` (Tailwind v4) → All components via `cn()` utility
3.  **Animations**: `framer-motion` variants defined in `src/styles/animations.ts`
4.  **Auth**: `useAuthStore` (Zustand) → `apiClient` → JWT token injection

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

The frontend is **fully integrated** with the **Django REST API Backend**.

### Integration Status: ✅ COMPLETE

All phases of the API integration have been implemented:
1.  ✅ **Axios Client**: `src/services/api/client.ts` with JWT interceptors
2.  ✅ **Auth Store**: `src/store/useAuthStore.ts` with Zustand persistence
3.  ✅ **Data Transformers**: `src/services/api/transformers.ts` for snake_case → camelCase
4.  ✅ **React Query Hooks**: `useCourses`, `useCategories`, `useAuth`
5.  ✅ **Component Integration**: CourseCatalog now fetches from API

### Key Integration Rules
1.  **Data Mapping**: Backend uses `snake_case`. Always map to frontend `camelCase` in the service layer using transformer utilities.
2.  **Authentication**: Use the `apiClient` which automatically handles JWT injection from the Zustand store.
3.  **State Management**: Use `@tanstack/react-query` for all server-side data. Avoid `useEffect` for data fetching.
4.  **Error Handling**: Standardized responses include a `success` boolean and a `message`. Always check `success` before consuming `data`.

### API Endpoints Connected
*   `GET /api/v1/courses/` → `useCourses()` hook
*   `GET /api/v1/categories/` → `useCategories()` hook
*   `POST /api/v1/auth/token/` → `useLogin()` hook
*   `GET /api/v1/users/me/` → `useCurrentUser()` hook

---

## 🔧 Workflow & Verification SOP

### Mandatory Verification Commands
1.  **Linting**: `npm run lint` (Must pass with 0 errors).
2.  **Type Checking & Build**: `npm run build` (Ensures production bundle integrity).
3.  **UI Verification**: Use Playwright scripts to capture screenshots to `/screenshots/`.
4.  **E2E Testing**: Follow `E2E_TEST_PLAN.md` for comprehensive test execution.

### Server Configuration (Updated)
```bash
# Development server runs on port 5174 (changed from 5173)
npm run dev  # http://localhost:5174

# Vite config includes allowedHosts for external domain
allowedHosts: ['itrust-academy.jesspete.shop', 'localhost', '127.0.0.1']
```

### E2E Testing Status
- ✅ 9 test cases executed
- ✅ 9 screenshots captured (desktop, mobile, tablet)
- ✅ Page load verified
- ✅ Hero section renders correctly
- ✅ Navigation functional
- ✅ Mobile responsive (375px, 768px, 1440px)

### Deployment Checklist
- [x] Build generated in `dist/`
- [x] Responsive check: Mobile (375px), Tablet (768px), Desktop (1440px)
- [x] Dark mode/Light mode variables verified
- [x] Fast Refresh rules satisfied (no non-component exports in component files)
- [x] API integration verified with live backend

---

## ⚠️ History: The "Remediation" Phase
**CRITICAL: Do not revert these architectural decisions.**
1.  **Fast Refresh Fix**: Variants (CVA) are separated into `src/components/ui/variants.ts` to prevent ESLint errors in `button.tsx` and `badge.tsx`.
2.  **React 19 Hooks**: `useReducedMotion` uses `useSyncExternalStore` instead of `useEffect` to avoid cascading renders.
3.  **Footer Redesign**: The footer was updated to a **Light Theme** (`#F8FAFC`) with prominent contact icons to match the reference design in `sample_for_font_color_reference_3.png`.
4.  **Icon Strategy**: Brand icons (LinkedIn, Twitter, etc.) are custom SVGs in `src/components/icons/` because Lucide excludes brand logos.
5.  **Asset Cleanup**: Legacy `App.tsx`, `App.css`, and `index.css` were removed to eliminate conflict with `src/app/`.
6.  **API Integration**: Complete frontend API layer with Axios, React Query, and Zustand for JWT management.

---

## 🎯 Current Roadmap & Pending Tasks

### ✅ Completed
*   Full API integration with Django backend
*   JWT authentication with token refresh
*   React Query hooks for courses and categories
*   Data transformers (snake_case → camelCase)
*   Zustand auth store with persistence
*   CourseCatalog component updated for API
*   Visual design enhancements (shadows, typography, colors)

### 🔄 In Progress
*   Loading skeleton components
*   Error boundary implementation

### 📋 Planned (Next Directives)
1.  **Course Detail Pages**: Dynamic routes for courses
2.  **User Authentication UI**: Login/Register modals
3.  **Enrollment Flow**: Course enrollment with payment
4.  **Profile Management**: User profile editing
5.  **Dark Mode Toggle**: UI switch for theme preference
6.  **Contact Form**: Inquiry and feedback forms

---

**Initialize new Gemini instance with this context for 100% architectural alignment.**
