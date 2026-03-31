# Phased Remediation Plan: iTrust Academy

> **Date**: 2026-03-31
> **Source**: Validated gaps from `VALIDATED_ASSESSMENT_REPORT.md` and `VALIDATION_REPORT_README_PAD.md`
> **Method**: TDD (Test-Driven Development) — write failing test first, implement fix, verify pass
> **Prerequisite**: Vitest test runner (no test infrastructure currently exists)

---

## Phase 0: Test Infrastructure Setup

**Goal**: Install and configure Vitest for TDD workflow.

### 0.1 Install Vitest + React Testing Library

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### 0.2 Configure Vitest

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
    css: false,
  },
})
```

### 0.3 Create Test Setup

Create `src/test/setup.ts`:
```ts
import "@testing-library/jest-dom"
```

### 0.4 Add Test Script to package.json

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest"
}
```

### Verification
- [ ] `npm test` runs with 0 tests (clean exit)
- [ ] `npm run test:watch` starts watch mode

---

## Phase 1: P0 — Duration Inconsistency Bug

**Gap**: `course-card.tsx:76` hardcodes "weeks" but data uses "5 days" strings.
**Root Cause**: `course-catalog.tsx:72` does `parseInt(course.duration)` → extracts `5` → stored as `durationWeeks` → rendered as "5 weeks".

### 1.1 Write Failing Test

Create `src/lib/__tests__/duration.test.ts`:
```ts
import { describe, it, expect } from "vitest"
import { parseDuration, formatDuration } from "@/lib/utils"

describe("parseDuration", () => {
  it("parses '5 days' correctly", () => {
    expect(parseDuration("5 days")).toEqual({ value: 5, unit: "days" })
  })
  it("parses '2 weeks' correctly", () => {
    expect(parseDuration("2 weeks")).toEqual({ value: 2, unit: "weeks" })
  })
  it("parses '4 days' correctly", () => {
    expect(parseDuration("4 days")).toEqual({ value: 4, unit: "days" })
  })
  it("defaults to 1 week for invalid input", () => {
    expect(parseDuration("")).toEqual({ value: 1, unit: "weeks" })
  })
})

describe("formatDuration", () => {
  it("formats days correctly", () => {
    expect(formatDuration("5 days")).toBe("5 days")
  })
  it("formats weeks correctly", () => {
    expect(formatDuration("2 weeks")).toBe("2 weeks")
  })
})
```

**Verify**: `npm test` — FAILS (functions don't exist yet)

### 1.2 Implement Fix in `src/lib/utils.ts`

Add two functions:
```ts
export function parseDuration(duration: string): { value: number; unit: string } {
  const match = duration.match(/^(\d+)\s*(days?|weeks?|hours?)$/i)
  if (match) {
    return { value: parseInt(match[1], 10), unit: match[2].toLowerCase() }
  }
  return { value: 1, unit: "weeks" }
}

export function formatDuration(duration: string): string {
  return duration || "1 week"
}
```

**Verify**: `npm test` — PASSES

### 1.3 Write Failing Test for Catalog Mapping

Create `src/components/sections/__tests__/course-catalog-duration.test.ts`:
```ts
import { describe, it, expect } from "vitest"

describe("duration fallback mapping", () => {
  it("does not lose unit information from static data", () => {
    const duration = "5 days"
    const parsed = parseInt(duration)
    // Current bug: parseInt("5 days") = 5, then displayed as "5 weeks"
    expect(parsed).toBe(5)
    // The fix should preserve the original string
    expect(duration).toBe("5 days")
  })
})
```

### 1.4 Fix `course-catalog.tsx:72`

Change the fallback mapping to preserve the raw duration string instead of parsing it:

```ts
// BEFORE (line 72):
durationWeeks: parseInt(course.duration) || 1,

// AFTER:
durationWeeks: parseDuration(course.duration).value,
durationLabel: formatDuration(course.duration),
```

But this requires changing the `Course` type in `services/api/types.ts` to include `durationLabel`.

**Alternative simpler fix**: Change `course-card.tsx:76` to use the raw duration string directly.

### 1.5 Fix `course-card.tsx:76`

The card receives a `Course` from `services/api/types.ts` which has `durationWeeks: number`. For API data this is correct (backend sends `duration_weeks: number`). For fallback data, the issue is the mapping.

**Best fix**: Add a `durationLabel` field to the fallback mapping and use it in the card.

```ts
// course-catalog.tsx fallback mapping — add:
durationLabel: course.duration,

// types.ts Course interface — add:
durationLabel?: string
```

```tsx
// course-card.tsx:76 — change:
<span>{course.durationLabel || `${course.durationWeeks} weeks`}</span>
```

### Verification
- [ ] Unit tests pass
- [ ] Catalog card shows "5 days" not "5 weeks"
- [ ] Detail page still shows "5 days" (unchanged)
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds

---

## Phase 2: P0 — Filter Category Mismatch in Fallback

**Gap**: Filter buttons use `COURSE_CATEGORIES` slugs ("solarwinds") but fallback course data uses `VENDOR_TO_CATEGORY` slugs ("network-monitoring").

### 2.1 Write Failing Test

Create `src/components/sections/__tests__/course-filter.test.ts`:
```ts
import { describe, it, expect } from "vitest"
import { COURSE_CATEGORIES } from "@/data/courses"

describe("vendor filter alignment", () => {
  const VENDOR_TO_CATEGORY: Record<string, { slug: string }> = {
    "SolarWinds": { slug: "network-monitoring" },
    "Securden": { slug: "security" },
    "Quest": { slug: "database" },
    "Ivanti": { slug: "endpoint-management" },
  }

  it("filter button slugs match course category slugs in fallback mode", () => {
    const filterSlugs = COURSE_CATEGORIES
      .filter(c => c.slug !== "all")
      .map(c => c.slug)

    const courseCategorySlugs = Object.values(VENDOR_TO_CATEGORY).map(v => v.slug)

    // This will FAIL because "solarwinds" !== "network-monitoring"
    filterSlugs.forEach(slug => {
      expect(courseCategorySlugs).toContain(slug)
    })
  })
})
```

**Verify**: `npm test` — FAILS

### 2.2 Fix — Align Slugs in `course-catalog.tsx`

Change `VENDOR_TO_CATEGORY` to use the same slugs as `COURSE_CATEGORIES`:

```ts
// BEFORE:
const VENDOR_TO_CATEGORY = {
  "SolarWinds": { slug: "network-monitoring", ... },
  "Securden": { slug: "security", ... },
  "Quest": { slug: "database", ... },
  "Ivanti": { slug: "endpoint-management", ... },
}

// AFTER:
const VENDOR_TO_CATEGORY = {
  "SolarWinds": { slug: "solarwinds", name: "SolarWinds", ... },
  "Securden": { slug: "securden", name: "Securden", ... },
  "Quest": { slug: "quest", name: "Quest", ... },
  "Ivanti": { slug: "ivanti", name: "Ivanti", ... },
}
```

**Verify**: `npm test` — PASSES

### Verification
- [ ] Unit tests pass
- [ ] Clicking "SolarWinds" filter shows SolarWinds courses in fallback mode
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds

---

## Phase 3: P1 — 404 Catch-All Route

**Gap**: No `<Route path="*">` in `app.tsx`.

### 3.1 Write Failing E2E Test

Create `scripts/verify_404_page.py`:
```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://127.0.0.1:5174/nonexistent-page")
    page.wait_for_load_state("networkidle")

    # Should show 404 content, not empty layout
    assert page.locator("text=Page Not Found").is_visible(), "404 page not shown"
    assert page.locator("text=Back to Home").is_visible(), "Back link missing"

    page.screenshot(path="screenshots/verify-404.png")
    browser.close()
    print("PASS: 404 page renders correctly")
```

**Verify**: `python3 scripts/verify_404_page.py` — FAILS

### 3.2 Create NotFound Page

Create `src/pages/not-found.tsx`:
```tsx
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Search } from "lucide-react"
import { Container } from "@/components/layout/container"

export function NotFoundPage() {
  return (
    <div className="py-32">
      <Container>
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking doesn't exist or has been moved.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
```

### 3.3 Add Catch-All Route in `app.tsx`

```tsx
const NotFoundPage = lazy(() => import("@/pages/not-found").then(m => ({ default: m.NotFoundPage })))

// In Routes, after all defined routes:
<Route path="*" element={
  <Suspense fallback={<PageLoader />}>
    <NotFoundPage />
  </Suspense>
} />
```

**Verify**: `python3 scripts/verify_404_page.py` — PASSES

### Verification
- [ ] `/nonexistent` shows NotFound page
- [ ] `/courses/nonexistent-slug` still shows course-level "Course Not Found"
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds

---

## Phase 4: P1 — Skip-to-Content Link

**Gap**: No skip link in `layout.tsx` for keyboard users.

### 4.1 Write Failing Test

Create `src/app/__tests__/layout-a11y.test.tsx`:
```tsx
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Layout } from "../layout"

describe("Layout accessibility", () => {
  it("has a skip-to-content link", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    )
    const skipLink = screen.getByText("Skip to content")
    expect(skipLink).toBeInTheDocument()
    expect(skipLink).toHaveAttribute("href", "#main-content")
  })

  it("main element has id for skip link target", () => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    )
    const main = document.querySelector("main")
    expect(main).toHaveAttribute("id", "main-content")
  })
})
```

**Verify**: `npm test` — FAILS

### 4.2 Implement Fix in `layout.tsx`

```tsx
export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-white focus:rounded-md focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <Toaster position="bottom-right" richColors />
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
```

**Verify**: `npm test` — PASSES

### Verification
- [ ] Unit tests pass
- [ ] Tab on page load reveals "Skip to content" link
- [ ] Link focuses main content area
- [ ] `npm run lint` passes

---

## Phase 5: P2 — SEO Meta Tags

**Gap**: `index.html` lacks OG, Twitter Card, and canonical tags.

### 5.1 Add Static OG Tags to `index.html`

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>iTrust Academy — Enterprise IT Training & Certification</title>
  <meta name="description" content="Professional IT training and certification across SolarWinds, Securden, Quest, and Ivanti platforms." />
  <link rel="canonical" href="https://itrustacademy.com/" />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="iTrust Academy — Enterprise IT Training" />
  <meta property="og:description" content="Expert-led, hands-on training across SolarWinds, Securden, Quest, and Ivanti platforms." />
  <meta property="og:url" content="https://itrustacademy.com/" />
  <meta property="og:site_name" content="iTrust Academy" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="iTrust Academy — Enterprise IT Training" />
  <meta name="twitter:description" content="Expert-led, hands-on training across SolarWinds, Securden, Quest, and Ivanti platforms." />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
</head>
```

### Verification
- [ ] `npm run build` succeeds
- [ ] `dist/index.html` contains OG tags
- [ ] `npm run lint` passes

---

## Phase 6: P2 — Bundle Size Configuration

**Gap**: No explicit chunk size warning limit configured.

### 6.1 Add Chunk Size Warning Limit to `vite.config.ts`

```ts
build: {
  outDir: 'dist',
  sourcemap: true,
  chunkSizeWarningLimit: 1000, // 1MB — adjust after analysis
},
```

### 6.2 Run Build and Analyze

```bash
npm run build 2>&1 | grep -i "chunk\|warning"
```

### Verification
- [ ] Build completes without errors
- [ ] Any chunk warnings are documented
- [ ] No new lint errors

---

## Phase 7: Final Validation

### 7.1 Full Test Suite
```bash
npm test                    # All unit tests pass
npm run lint                # 0 errors
npm run build               # Successful build
```

### 7.2 E2E Validation
```bash
npm run preview -- --port 5174 --host 0.0.0.0 &
python3 run_reg_course_e2e.py          # 33/33 existing tests still pass
python3 scripts/verify_404_page.py     # New 404 test passes
```

### 7.3 Update Documentation
- Update `README.md` with any new test scripts
- Update `VALIDATED_ASSESSMENT_REPORT.md` status to "RESOLVED"
- Update `AGENTS.md` with test commands

---

## Summary

| Phase | Priority | Gap | Files Modified | Tests Added |
|-------|----------|-----|----------------|-------------|
| 0 | — | Test infrastructure | `package.json`, `vitest.config.ts`, `src/test/setup.ts` | 0 |
| 1 | P0 | Duration inconsistency | `utils.ts`, `course-catalog.tsx`, `course-card.tsx`, `types.ts` | 2 |
| 2 | P0 | Filter mismatch | `course-catalog.tsx` | 1 |
| 3 | P1 | No 404 route | `not-found.tsx`, `app.tsx` | 1 (E2E) |
| 4 | P1 | Skip-to-content | `layout.tsx` | 1 |
| 5 | P2 | SEO meta tags | `index.html` | 0 |
| 6 | P2 | Bundle size | `vite.config.ts` | 0 |
| 7 | — | Final validation | — | — |

**Total new files**: 4 (`vitest.config.ts`, `src/test/setup.ts`, `src/pages/not-found.tsx`, `scripts/verify_404_page.py`)
**Total modified files**: 6 (`package.json`, `utils.ts`, `course-catalog.tsx`, `course-card.tsx`, `app.tsx`, `layout.tsx`, `index.html`, `vite.config.ts`, `types.ts`)
**Total tests added**: 5 (4 unit + 1 E2E)
