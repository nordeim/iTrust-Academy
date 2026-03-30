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

### Core Structure (Integrated Full-Stack)
```
src/
├── app/                  # Main Entry & Global Configuration
│   ├── app.tsx           # Root orchestrator for all sections
│   └── globals.css       # Tailwind v4 CSS-first theme & variables
├── components/
│   ├── forms/            # NEW: Zod-validated Auth Modals (Login, Register)
│   ├── layout/           # Sticky Header, UserNav Dropdown, Light Footer
│   ├── sections/         # Animated landing page sections (Hero, Stats, Catalog, etc.)
│   ├── ui/               # Radix Primitives: Dialog, Dropdown, Avatar, Button, etc.
│   └── icons/            # Custom SVG Brand Icons
├── services/
│   └── api/              # API Integration Layer (Axios + JWT + Transformers)
├── store/
│   └── useAuthStore.ts   # Zustand JWT & User persistence
├── hooks/
│   ├── useAuth.ts        # Auth mutation & profile hooks
│   ├── useCourses.ts     # Course query hooks
│   └── useCategories.ts  # Category query hooks
├── providers/
│   └── QueryProvider.tsx # React Query configuration
├── data/                 # Static Course & Vendor data (fallback)
└── lib/                  # Constants, CN Utility, Scroll Utilities
```

### Critical Data Flows
1.  **Identity**: `useAuthStore` (Zustand) → `apiClient` (Axios Interceptors) → JWT Injection.
2.  **Server State**: `React Query` → `apiService` → `Transformers (snake → camel)` → Components.
3.  **Navigation**: `scrollToSection()` utility for single-page; React Router planned for detail pages.

---

## 🔗 Backend API Integration Protocol

The frontend is **fully integrated** with the **Django REST API Backend**.

### Integration Status: ✅ COMPLETE

All phases of the API integration have been implemented:
1.  ✅ **Axios Client**: `src/services/api/client.ts` with JWT interceptors & token refresh.
2.  ✅ **Auth Store**: `src/store/useAuthStore.ts` with Zustand persistence.
3.  ✅ **Data Transformers**: `src/services/api/transformers.ts` for schema alignment.
4.  ✅ **Authentication UI**: Login and Register modals with Radix UI Dialog.
5.  ✅ **User Navigation**: `UserNav` component for profile access and logout.

### Key Integration Rules
1.  **Data Mapping**: Backend uses `snake_case`. Always map to frontend `camelCase` in the service layer using transformer utilities.
2.  **State Management**: Use `@tanstack/react-query` for all server-side data. Avoid `useEffect` for data fetching.
3.  **Validation**: All forms must use `react-hook-form` with `zod` schemas.

---

## 🔧 Workflow & Verification SOP

### Mandatory Verification Commands
1.  **Linting**: `npm run lint` (Must pass with 0 errors).
2.  **Type Checking & Build**: `npm run build` (Ensures production bundle integrity).
3.  **UI Verification**: Use Playwright scripts to capture screenshots to `/screenshots/`.
4.  **E2E Testing**: 27/27 test cases must pass (14 Landing + 13 Auth).

### Server Configuration
```bash
# Development server runs on port 5174
npm run dev  # http://localhost:5174

# Vite config includes allowedHosts for external domain
allowedHosts: ['itrust-academy.jesspete.shop', 'localhost', '127.0.0.1']
```

---

## ⚠️ History: The "Remediation" Phase
**CRITICAL: Do not revert these architectural decisions.**
1.  **React 19 Patterns**: Use `useSyncExternalStore` for accessibility hooks.
2.  **Fast Refresh Fix**: CVA Variants are in `src/components/ui/variants.ts`.
3.  **Footer Redesign**: Light Theme (`#F8FAFC`) matching reference samples.
4.  **Logo Fix**: Icon changed to `<GraduationCap>` to prevent duplication.
5.  **Favicon Fix**: Reference changed from `/vite.svg` to `/favicon.svg`.
6.  **Auth UI**: Implemented as high-conversion modals using Radix UI Dialog.

---

## 🚀 Accomplishments & Milestones

### Milestone 7: Authentication UI (March 29, 2026)
*   ✅ **Radix UI Primitives**: Created foundational `src/components/ui/` primitives: `dialog.tsx`, `dropdown-menu.tsx`, `avatar.tsx`, and `label.tsx`.
*   ✅ **High-Conversion Modals**: Implemented `LoginModal` and `RegisterModal` with seamless switching logic.
*   ✅ **Identity Persistence**: Integrated `useAuthStore` (Zustand) with localStorage to maintain sessions across reloads.
*   ✅ **Dynamic Header**: Refactored `Header.tsx` to conditionally render Guest CTAs or the `UserNav` profile menu.

### Milestone 8: Full-Stack E2E Validation (March 29, 2026)
*   ✅ **Integrated Lifecycle**: Successfully simulated the full user journey: Registration → Auto-Login → Logout → Manual Login.
*   ✅ **Discovery Sync**: Verified real-time course fetching and category filtering from the Django REST backend.
*   ✅ **Action Interception**: Implemented and verified guest-to-auth redirection for business-critical actions (Enroll Now).

---

## 🧪 E2E Testing Methodology

Our E2E suite utilizes **Playwright (Python Sync API)** for high-fidelity browser automation.

### 1. Verification Strategy
*   **Target Environment**: Tests must run against `npm run preview` (port 5174).
*   **Infrastructure Requirement**: `vite preview` is mandatory to support the `/api` proxy and `POST` requests (simple static servers like `http.server` will fail).
*   **Lifecycle Simulation**: We use `uuid` generation for `USER_DATA` to ensure every test run is independent and avoids unique constraint violations in the backend.

### 2. E2E Test Results Summary
| Category | Tests | Status |
|----------|-------|--------|
| Landing Page | 14 | ✅ 100% Pass |
| Authentication UI | 13 | ✅ 100% Pass |
| Registration & Course Flow | 6 | ✅ 100% Pass |
| **Total** | **33** | **✅ 100% Pass** |

### 3. Evidence Standard
*   **Annotated Screenshots**: Every major state change (Modal Open, Auth Success, Filter Applied) must capture a screenshot in `/screenshots/`.
*   **Console Monitoring**: Playwright listeners are used to pipe browser `console` logs and `pageerror` events to the terminal for transparent debugging.

---

## ⚠️ Technical Hurdles & Resolutions

### 1. Network & Connectivity
*   **Issue**: `localhost` resolving to IPv6 caused `ERR_CONNECTION_REFUSED` in automated environments.
*   **Resolution**: Explicitly bind Vite to `127.0.0.1` (`--host 127.0.0.1`) and update test scripts to use IP-based URLs.

### 2. Mock vs. Real Infrastructure
*   **Issue**: Python `http.server` returned `501 Unsupported Method` for authentication `POST` requests.
*   **Resolution**: Standardized on `vite preview` for all verification phases to ensure the API proxy layer is active.

### 3. Robust Selectors
*   **Issue**: Non-standard CSS selectors (e.g., `:has-text`) used in `document.querySelector` caused runtime errors in DOM utilities.
*   **Resolution**: Refactored `scrollToSection` and interception logic to use robust, standard-compliant `Array.from(document.querySelectorAll('button'))` patterns.

---

## 🎓 Lessons Learnt
1.  **Proxy Fidelity**: Never assume a static build is "integrated" without an active proxy. Always test against the environment that matches the `VITE_API_URL` configuration.
2.  **Timing is Everything**: Development modules take time to compile. Use `wait_until="networkidle"` and include "warm-up" navigation calls in E2E scripts.
3.  **UI Interception**: Intercepting guest actions at the component level (instead of global route guards) provides a smoother UX for single-page applications.

---

## 🔧 Troubleshooting Tips for Future Agents
*   **Server Stability**: If port 5174 is hanging, use `fuser -k 5174/tcp` to clear the process before restarting.
*   **Zod Errors**: If a form isn't submitting and no API call is visible, check the `errors` object in `react-hook-form`; Zod will block submission silently if the schema isn't met.
*   **JWT Issues**: If API calls return 401, check the `itrust-auth` entry in Application Storage. Ensure the `accessToken` is present.

---

## 🎯 Current Roadmap & Pending Tasks

### ✅ Completed
*   Full API integration with Django backend
*   JWT authentication with silent token refresh
*   Authentication UI (Login/Register Modals)
*   User Profile navigation and dropdown
*   Zustand auth store with persistence
*   Visual design enhancements & QA remediation (Phase 1-8)
*   100% E2E test pass rate (33/33 total)
*   ContactModal system implemented (3 modals)
*   ComingSoonModal system implemented (graceful degradation)
*   Social links fixed (external navigation)
*   Platform cards enhanced (CustomEvent filtering)
*   QA Remediation Phase 9 complete (12/15 elements)
*   Bidirectional data transformers (snake_case ↔ camelCase)
*   Footer complete rewrite with modals & social links

### 🔄 In Progress
*   Category-based vendor filtering refinement
*   Loading skeleton components for catalog
*   Error boundary implementation

### 📋 Planned (Next Directives)
1.  **Course Detail Pages**: Dynamic routes for course curriculums.
2.  **Enrollment Flow**: Course enrollment integration with Stripe payments.
3.  **Profile Management**: Dedicated page for user profile editing.
4.  **Dark Mode Toggle**: Theme switching logic.

---

**Initialize new Gemini instance with this context for 100% architectural alignment.**
