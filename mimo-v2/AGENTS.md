# iTrust Academy - Agent Guidelines

> Enterprise IT Training Platform | React 19 + TypeScript 5.9 + Tailwind CSS v4 + Vite 8 + Django REST API

## Commands

```bash
npm run dev       # Start Vite dev server (port 5174, proxies /api to localhost:8000)
npm run build     # TypeScript check + production build (tsc -b && vite build)
npm run lint      # ESLint (must pass with 0 errors before committing)
npm run preview   # Preview production build (required for E2E tests - supports API proxy)
```

**E2E Tests** (Playwright Python): Run against `npm run preview`, not static servers.
```bash
npm run preview -- --port 5174 --host 0.0.0.0  # Start preview server first
python3 run_reg_course_e2e.py                   # Run full E2E suite (33 tests)
python3 scripts/validate_qa_findings.py         # Automated UX validation
```

**Kill hung dev server**: `fuser -k 5174/tcp`

## Code Style

- **TypeScript**: Strict mode. No `any` (use `unknown`). Prefer `interface` over `type`.
- **Components**: PascalCase files, default exports. Never export constants from component files (Fast Refresh).
- **Hooks**: camelCase with `use` prefix. Use `useSyncExternalStore` for accessibility hooks (React 19).
- **Files**: kebab-case. Place CVA variants in `src/components/ui/variants.ts`, not inline.
- **Imports**: React/Next → Third-party → `@/` absolute → Relative.
- **Formatting**: 2-space indent, semicolons, double quotes.
- **Error Handling**: Early returns, no nested conditionals. Always provide `onError` for mutations with user feedback.
- **Comments**: Minimal. Use `/* ═══════ */` for section dividers only.

## UI Component Patterns

**Always use Radix UI primitives** (`@/components/ui/`) — never build modals/dropdowns from scratch.

```tsx
// CVA Component Pattern
import { cva } from "class-variance-authority"
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

## Design System

- **Brand**: Burnt orange `#F27A1A` (brand-500). Charcoal text `#1A1A2E`.
- **Fonts**: DM Sans (body), Space Mono (code).
- **Radius**: `0.5rem` (md). **Anti-Generic**: No purple gradients, no Inter/Roboto, no template grids.
- **Utility**: `cn()` from `@/lib/utils` for class merging.

## Pre-Commit Checklist

- [ ] `npm run lint` passes (0 errors)
- [ ] `npm run build` succeeds
- [ ] No `any` types introduced
- [ ] Radix primitives used (no custom modals/dropdowns)
- [ ] CVA variants in `variants.ts` (not inline)
- [ ] External links have `target="_blank" rel="noopener noreferrer"`
