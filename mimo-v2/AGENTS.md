# iTrust Academy - Agent Guidelines

> Enterprise IT Training Platform | React 19 + TypeScript 5.9 + Tailwind CSS v4 + Vite 8 + Django REST API

## Commands

```bash
npm run dev       # Start Vite dev server (port 5174, proxies /api to localhost:8000)
npm run build     # TypeScript check + production build (tsc -b && vite build)
npm run lint      # ESLint (must pass with 0 errors before committing)
npm run preview   # Preview production build (required for E2E tests - supports API proxy)
```

**Unit Tests** (Vitest + React Testing Library):
```bash
npm test                              # Run all tests (exits 0 with no tests)
npm run test:watch                    # Watch mode
npx vitest run src/lib/__tests__/utils.test.ts           # Single test file
npx vitest run -t "parses '5 days'"                      # Single test by name
npx vitest run src/lib/__tests__/utils.test.ts -t "parseDuration"  # File + name filter
```

**E2E Tests** (Playwright Python): Run against `npm run preview`, not static servers.
```bash
npm run preview -- --port 5174 --host 0.0.0.0  # Start preview server first
python3 run_reg_course_e2e.py                   # Run full E2E suite (33 tests)
python3 scripts/verify_phase1_routing.py        # Phase verification scripts
python3 scripts/validate_qa_findings.py         # Automated UX validation
```

**Kill hung dev server**: `fuser -k 5174/tcp`

## Code Style

- **TypeScript**: Strict mode. No `any` (use `unknown`). Prefer `interface` over `type`.
- **Components**: PascalCase names, default exports. Never export constants from component files (Fast Refresh).
- **Hooks**: camelCase with `use` prefix. Use `useSyncExternalStore` for accessibility hooks (React 19).
- **Files**: kebab-case filenames. Place CVA variants in `src/components/ui/variants.ts`, not inline.
- **Imports**: React → Third-party → `@/` absolute → Relative.
- **Formatting**: 2-space indent, semicolons, double quotes.
- **Error Handling**: Early returns, no nested conditionals. Always provide `onError` for mutations with user feedback.
- **Comments**: Minimal. Use `/* ═══════ */` for section dividers only.

## Testing Conventions

- **Framework**: Vitest with `globals: true` (no imports needed for `describe`/`it`/`expect`).
- **Setup**: `src/test/setup.ts` loads `@testing-library/jest-dom/vitest` matchers.
- **Config**: `vitest.config.ts` — jsdom environment, tests only in `src/**/*.test.{ts,tsx}`.
- **Components needing providers**: Wrap in `QueryClientProvider` + `MemoryRouter` for tests.
- **Pattern**: Write failing test first (TDD), then implement to make it pass.

```tsx
// Test file pattern: src/<module>/__tests__/<name>.test.ts(x)
import { render, screen } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { MemoryRouter } from "react-router-dom"

function wrapper({ children }: { children: React.ReactNode }) {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return <QueryClientProvider client={qc}><MemoryRouter>{children}</MemoryRouter></QueryClientProvider>
}

it("renders correctly", () => {
  render(<MyComponent />, { wrapper })
  expect(screen.getByText("Hello")).toBeInTheDocument()
})
```

## UI Component Patterns

**Always use Radix UI primitives** (`@/components/ui/`) — never build modals/dropdowns from scratch.

```tsx
// CVA Component Pattern
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const variants = cva("base", { variants: { variant: {...} }, defaultVariants: {...} })

export interface Props extends VariantProps<typeof variants> { className?: string }
export function Component({ variant, className }: Props) {
  return <div className={cn(variants({ variant }), className)} />
}
```

**Section Pattern**: Wrap in `<Section>` + `<Container>`, animate with Framer Motion (`viewport={{ once: true }}`).

**Forms**: `react-hook-form` + `zod` validation. Disable buttons during async ops with loading indicator.

## Architecture

- **Server State**: `@tanstack/react-query` only. No `useEffect` for data fetching.
- **Auth State**: Zustand (`useAuthStore`) with localStorage persistence.
- **API Layer**: Axios client (`src/services/api/`) with JWT interceptors + token refresh.
- **Data Mapping**: Backend `snake_case` → frontend `camelCase` via transformers.
- **Routing**: `react-router-dom` with lazy-loaded pages wrapped in `<Suspense>` + `<ErrorBoundary>`.
- **Shared Data**: Export data mappings (like `VENDOR_TO_CATEGORY`) from `src/data/`, not from component files.

## Design System

- **Brand**: Burnt orange `#F27A1A` (brand-500). Charcoal text `#1A1A2E`.
- **Fonts**: DM Sans (body), Space Mono (code).
- **Radius**: `0.5rem` (md). **Anti-Generic**: No purple gradients, no Inter/Roboto, no template grids.
- **Utility**: `cn()` from `@/lib/utils` for class merging.

## Pre-Commit Checklist

- [ ] `npm test` passes (all unit tests)
- [ ] `npm run lint` passes (0 errors)
- [ ] `npm run build` succeeds
- [ ] No `any` types introduced
- [ ] Radix primitives used (no custom modals/dropdowns)
- [ ] CVA variants in `variants.ts` (not inline)
- [ ] External links have `target="_blank" rel="noopener noreferrer"`

## File Organization

```
src/
├── app/           # Entry: app.tsx (routes), layout.tsx (shell), globals.css
├── pages/         # Route pages: home, course-detail, about, faq, privacy, terms, dashboard, not-found
├── components/
│   ├── ui/        # Atomic: button, badge, card, input, dialog, separator, error-boundary, variants.ts
│   ├── layout/    # Structure: header, footer, container, section, user-nav
│   ├── sections/  # Landing: hero, stats, vendor-cards, course-catalog, features, cta, etc.
│   ├── forms/     # Auth: login-modal, register-modal
│   ├── modals/    # Shared: contact-modal, coming-soon-modal
│   ├── cards/     # course-card
│   ├── course/    # course-tabs, course-curriculum, course-instructor, related-courses
│   └── icons/     # social-icons.tsx (custom SVGs)
├── services/api/  # client.ts, types.ts, transformers.ts, auth.ts, courses.ts, categories.ts
├── hooks/         # useAuth, useCourses, useCategories, useReducedMotion
├── store/         # useAuthStore.ts (Zustand)
├── providers/     # QueryProvider.tsx
├── data/          # courses.ts (static fallback + VENDOR_TO_CATEGORY + COURSE_CATEGORIES)
├── lib/           # utils.ts (cn, formatPrice, parseDuration), constants.ts
├── styles/        # animations.ts (Framer Motion variants)
└── test/          # setup.ts (Vitest config)
```

## Common Pitfalls

- **react-refresh error**: Don't export constants alongside components. Move data to `src/data/` or `src/lib/`.
- **Vitest scanning `.agent/` dirs**: Ensure `include: ["src/**/*.test.{ts,tsx}"]` in `vitest.config.ts`.
- **Missing QueryClient in tests**: Wrap renders in `QueryClientProvider` when components use React Query.
- **Duration display**: Use `course.durationLabel` (from `formatDuration`) for static data, `course.durationWeeks` for API data.
- **Filter alignment**: `VENDOR_TO_CATEGORY` slugs in `src/data/courses.ts` must match `COURSE_CATEGORIES` slugs.
