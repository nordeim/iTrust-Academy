# Document Alignment Update Plan

> **Date**: 2026-03-31
> **Scope**: Fix all confirmed discrepancies in `README.md` and `Project_Architecture_Document.md`
> **Source**: `VALIDATION_REPORT_README_PAD.md` — 10 confirmed gaps after re-validation

---

## Phase 1: README.md Updates (4 edits)

### Edit 1 — Fix route count (Line 83)
**Current**: `- **Multi-Page Routing**: React Router with 8 routes`
**Fix**: `- **Multi-Page Routing**: React Router with 7 routes`

### Edit 2 — Add missing UI files to project tree (Lines 231-237)
**Current** (`src/components/ui/` section):
```
│   │   └── 📁 ui/
│   │       ├── button.tsx               # Button component
│   │       ├── card.tsx                 # Card container
│   │       ├── badge.tsx                # Badge component
│   │       ├── input.tsx                # Form input
│   │       ├── dialog.tsx               # Dialog primitive
│   │       └── variants.ts              # CVA variants
```
**Fix**: Add 3 missing files:
```
│   │   └── 📁 ui/
│   │       ├── button.tsx               # Button component
│   │       ├── card.tsx                 # Card container
│   │       ├── badge.tsx                # Badge component
│   │       ├── input.tsx                # Form input
│   │       ├── dialog.tsx               # Dialog primitive
│   │       ├── separator.tsx            # Visual divider
│   │       ├── error-boundary.tsx       # Error boundary component
│   │       ├── with-error-boundary.tsx  # Error boundary HOC
│   │       └── variants.ts              # CVA variants
```

### Edit 3 — Add missing `styles/` directory to project tree (After Line 267)
**Current** (end of `src/` tree):
```
│   └── main.tsx                         # Entry point
```
**Fix**: Insert `styles/` directory before `main.tsx`:
```
│   ├── 📁 styles/
│   │   └── animations.ts                # Framer Motion animation variants
│   │
│   └── main.tsx                         # Entry point
```

### Edit 4 — Add all scripts to E2E testing section (Lines 537-543)
**Current**:
```bash
# Run E2E tests
python3 scripts/verify_phase1_routing.py
python3 scripts/verify_phase2_course_detail.py
python3 scripts/verify_phase3_search.py
python3 scripts/verify_phase4_brand_pages.py
python3 scripts/verify_phase5_dashboard.py
```
**Fix**: Add 3 missing scripts + full-suite runner:
```bash
# Run full E2E suite
python3 run_reg_course_e2e.py

# Run phase verification scripts
python3 scripts/verify_phase1_routing.py
python3 scripts/verify_phase2_course_detail.py
python3 scripts/verify_phase3_search.py
python3 scripts/verify_phase4_brand_pages.py
python3 scripts/verify_phase5_dashboard.py

# Run QA validation
python3 scripts/validate_qa_findings.py
python3 scripts/test_phase1_vendor_filter.py
```

---

## Phase 2: Project_Architecture_Document.md Updates (5 edits)

### Edit 1 — Fix `app.tsx` description in file tree (Line 64)
**Current**: `│   │   ├── app.tsx                  # Main App component (Routes + Toaster)`
**Fix**: `│   │   ├── app.tsx                  # Routes configuration with lazy-loaded pages`

### Edit 2 — Add missing UI files to file tree (Lines 101-105)
**Current** (`ui/` section):
```
│   │   └── ui/                      # Atomic UI primitives (Button, Badge, Input, etc.)
│   │       ├── dialog.tsx           # Radix UI dialog primitive with DialogDescription
│   │       ├── dropdown-menu.tsx    # Dropdown menu primitive
│   │       ├── avatar.tsx           # Avatar component
│   │       └── label.tsx            # Form label component
```
**Fix**: Add missing files:
```
│   │   └── ui/                      # Atomic UI primitives (Button, Badge, Input, etc.)
│   │       ├── dialog.tsx           # Radix UI dialog primitive with DialogDescription
│   │       ├── dropdown-menu.tsx    # Dropdown menu primitive
│   │       ├── avatar.tsx           # Avatar component
│   │       ├── label.tsx            # Form label component
│   │       ├── separator.tsx        # Visual divider with orientation
│   │       ├── error-boundary.tsx   # React error boundary (class component)
│   │       └── with-error-boundary.tsx # Error boundary HOC wrapper
```

### Edit 3 — Add `styles/` directory to file tree (Before Line 128)
**Current** (end of `src/` tree):
```
│   ├── main.tsx                     # React entry point (BrowserRouter + QueryProvider)
│   └── types/                       # Type Definitions
│       └── vite-env.d.ts            # Vite environment declarations
```
**Fix**: Insert `styles/` before `main.tsx`:
```
│   ├── styles/                      # Framer Motion Animation Variants
│   │   └── animations.ts            # Shared animation definitions
│   ├── main.tsx                     # React entry point (BrowserRouter + QueryProvider)
│   └── types/                       # Type Definitions
│       └── vite-env.d.ts            # Vite environment declarations
```

### Edit 4 — Fix `app.tsx` in Key File Descriptions (Line 175)
**Current**: `| src/app/app.tsx | Root Component | Orchestrates the vertical stacking of all landing page sections. |`
**Fix**: `| src/app/app.tsx | Routes Config | Lazy-loaded route definitions with ErrorBoundary + Suspense per route. |`

### Edit 5 — Clarify `useCurrentUser` in React Query Hooks table (Line 438)
**Current**: `| useCurrentUser() | Current user profile | 5 minutes |`
**Fix**: `| useCurrentUser() | Current user profile (defined in useAuth.ts) | 5 minutes |`

---

## Phase 3: Verification

After applying all edits:
1. `npm run lint` — must pass with 0 errors
2. `npm run build` — must succeed
3. Visual spot-check: open both docs and verify file trees match `ls -R src/`
4. Verify route count matches `grep -c "path=" src/app/app.tsx` (expected: 7)

---

## Summary

| Document | Edits | Lines Affected |
|----------|-------|----------------|
| `README.md` | 4 | ~40 lines (tree sections + scripts) |
| `Project_Architecture_Document.md` | 5 | ~25 lines (tree + descriptions + table) |
| **Total** | **9** | **~65 lines** |
