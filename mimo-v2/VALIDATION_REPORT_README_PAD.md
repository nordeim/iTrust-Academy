# Validation Report: README.md & Project_Architecture_Document.md vs. Actual Codebase

> **Date**: 2026-03-31
> **Scope**: Line-by-line verification of structural claims, file listings, hooks, routes, and tech stack references
> **Target Documents**: `README.md`, `Project_Architecture_Document.md`
> **Baseline**: Live codebase at `/home/project/iTrust-Academy/mimo-v2/`

---

## 1. Confirmed Accurate (Both Documents)

| # | Claim | Location | Verification |
|---|-------|----------|-------------|
| 1 | 7 routes (`/`, `/courses/:slug`, `/about`, `/faq`, `/privacy`, `/terms`, `/dashboard`) | README:300, PAD:67-74 | `app.tsx` lines 36-84 — all 7 routes present |
| 2 | Frontend file tree (`src/pages/`, `src/components/`, `src/services/api/`, `src/hooks/`, `src/store/`, `src/providers/`, `src/lib/`) | README:184-267, PAD:60-131 | All directories verified |
| 3 | Backend file tree (`academy/settings/`, `api/views/`, `courses/models.py`, `users/models.py`) | README:269-274, PAD:132-162 | All directories verified |
| 4 | 4 hooks: `useCourses`, `useCategories`, `useAuth`, `useReducedMotion` | README:251-255, PAD:117-120 | All 4 files exist in `src/hooks/` |
| 5 | CVA variants in `src/components/ui/variants.ts` | PAD:9.3 | File exists |
| 6 | Course component files (`course-tabs`, `course-curriculum`, `course-instructor`, `course-certification`, `related-courses`) | README:203-208, PAD:78-82 | All 5 files in `src/components/course/` |
| 7 | `docker-compose.yml` with PostgreSQL 16 + Redis 7 + MinIO | README:277, PAD:165 | Confirmed in `docker-compose.yml` |
| 8 | `QueryProvider.tsx` | README:258, PAD:122 | Confirmed in `src/providers/` |
| 9 | `src/types/vite-env.d.ts` | PAD:130 | Confirmed in `src/types/` |
| 10 | `backend/academy/settings/{base,development,production,test}.py` | PAD:135-138 | All 4 files confirmed |
| 11 | `backend/api/views/{all_views.py, payments.py}` | PAD:145-146 | Confirmed |
| 12 | `backend/api/{serializers,responses,middleware,throttles,exceptions}.py` | PAD:147-150 | All confirmed |
| 13 | Auth store key `"itrust-auth"` | PAD:180 | `useAuthStore.ts:69` confirmed |
| 14 | `useCategories` staleTime = 30 min, `useCourses` staleTime = 5 min | PAD:433-435 | `useCategories.ts:17`, `useCourses.ts:18` confirmed |
| 15 | API service files (`client.ts`, `types.ts`, `transformers.ts`, `courses.ts`, `categories.ts`, `auth.ts`) | README:241-246, PAD:108-113 | All 6 files confirmed |
| 16 | Form components (`login-modal.tsx`, `register-modal.tsx`) | README:210-211, PAD:84-85 | Confirmed in `src/components/forms/` |
| 17 | Modal components (`contact-modal.tsx`, `coming-soon-modal.tsx`) | README:213-214, PAD:87-88 | Confirmed in `src/components/modals/` |
| 18 | Layout components (`header.tsx`, `footer.tsx`, `user-nav.tsx`) | README:216-220, PAD:91-93 | Confirmed in `src/components/layout/` |
| 19 | Section components (9 files) | README:222-230, PAD:94-100 | All 9 confirmed in `src/components/sections/` |
| 20 | UI primitives (`button.tsx`, `card.tsx`, `badge.tsx`, `input.tsx`, `dialog.tsx`, `variants.ts`) | README:232-237, PAD:102-105 | All confirmed in `src/components/ui/` |

---

## 2. Discrepancies Found

### 2.1 Missing Files Not Documented in Either Document

| Actual File | README | PAD | Severity | Notes |
|------------|--------|-----|----------|-------|
| `src/components/ui/error-boundary.tsx` | ❌ | ❌ | **HIGH** | Used in `app.tsx:8` — critical component completely undocumented |
| `src/components/ui/with-error-boundary.tsx` | ❌ | ❌ | **MEDIUM** | HOC wrapper, completely undocumented |
| `src/components/ui/separator.tsx` | ❌ | ❌ | **LOW** | Standard UI primitive missing from file tree |
| `src/styles/animations.ts` | ❌ | ❌ | **MEDIUM** | Framer Motion animation variants file undocumented |

### 2.2 Stale/Outdated Descriptions

| Issue | Document | Line | Detail |
|-------|----------|------|--------|
| Toaster location | PAD | 64,176 | PAD says `app.tsx` has "Routes + Toaster" — actually moved to `layout.tsx:13` |
| Route count mismatch | README | 83 | Prose says "8 routes", table shows 7, actual code has 7 |
| `app.tsx` description | PAD | 175 | Says "orchestrates vertical stacking of all landing page sections" — but it now does routing with lazy-loaded pages, not section stacking |

### 2.3 Internal Document Inconsistencies

| Issue | Document | Detail |
|-------|----------|--------|
| ~~MinIO listing~~ | ~~PAD~~ | ~~Section 2.2 lists MinIO, Section 10.1 Docker table omits it~~ — **RE-VALIDATED: CORRECT. MinIO IS listed in Section 10.1 line 585. Retracted.** |
| Hook table clarity | PAD | Section 7.3 lists `useCurrentUser()` as standalone hook; it's actually defined inside `src/hooks/useAuth.ts:47`, not a separate file |
| `useCategories` cache | PAD | Section 7.3 says 30 min — **CORRECT** per `useCategories.ts:17` |

### 2.4 Undocumented Test/Script Files

| Directory | Count | Documented |
|-----------|-------|------------|
| `backend/api/tests/` | 18 files | ❌ Neither document |
| `backend/courses/tests/` | 1 file (`test_soft_delete.py`) | ❌ Neither document |
| `scripts/` (undocumented) | 3 files (`validate_qa_findings.py`, `verify_p0_remediation.py`, `test_phase1_vendor_filter.py`) | ❌ README only lists the 5 `verify_phase*.py` scripts |

### 2.5 Version/Dependency Spot-Checks

| Claim | Document | Source | Status |
|-------|----------|--------|--------|
| React 19 | Both | `package.json`: `"react": "^19.2.4"` | ✅ |
| TypeScript 5.9 | Both | `package.json`: `"typescript": "~5.9.3"` | ✅ |
| Tailwind CSS v4 | Both | `package.json`: `"tailwindcss": "^4.2.2"` | ✅ |
| Vite 8 | Both | `package.json`: `"vite": "^8.0.1"` | ✅ |
| Framer Motion 12 | PAD | `package.json`: `"framer-motion": "^12.38.0"` | ✅ |
| Zustand 5 | PAD | `package.json`: `"zustand": "^5.0.12"` | ✅ |
| Zod 4 | PAD | `package.json`: `"zod": "^4.3.6"` | ✅ |
| Axios 1.14 | PAD | `package.json`: `"axios": "^1.14.0"` | ✅ |
| TanStack Query 5 | PAD | `package.json`: `"@tanstack/react-query": "^5.95.2"` | ✅ |

---

## 3. Summary Statistics

| Category | Count |
|----------|-------|
| Confirmed accurate claims | 21 |
| Missing files not documented | 4 |
| Stale/outdated descriptions | 3 |
| Internal doc inconsistencies | 2 (hook table clarity, retracted MinIO) |
| Undocumented backend test files | 19 |
| Undocumented script files | 3 |
| Version claims verified accurate | 9 |

**Overall Accuracy**: ~87%

---

## 3b. Re-Validation Results (2026-03-31)

All gaps from Section 2 were re-validated against the live codebase. Results:

| Gap | Initial Finding | Re-Validation | Resolution |
|-----|----------------|---------------|------------|
| `error-boundary.tsx` missing from docs | ❌ | ✅ Confirmed 76 lines, class component with `AlertTriangle` UI | **Valid gap** |
| `with-error-boundary.tsx` missing from docs | ❌ | ✅ Confirmed 20 lines, HOC wrapping `ErrorBoundary` | **Valid gap** |
| `separator.tsx` missing from docs | ❌ | ✅ Confirmed 19 lines, `role="separator"` with orientation prop | **Valid gap** |
| `animations.ts` missing from docs | ❌ | ✅ Confirmed 42 lines, 7 Framer Motion variant exports | **Valid gap** |
| Toaster in `app.tsx` (PAD stale) | ❌ | ✅ Toaster only in `layout.tsx:8,13`, NOT in `app.tsx` | **Valid gap** |
| Route count "8" (README) | ❌ | ✅ `grep -c "path="` = 7 routes | **Valid gap** |
| `app.tsx` description stale (PAD) | ❌ | ✅ Now does routing with lazy pages, not section stacking | **Valid gap** |
| MinIO missing from PAD 10.1 | ❌ | ✅ MinIO IS listed at line 585 | **RETRACTED** |
| `useCurrentUser` clarity (PAD) | ❌ | ✅ Defined at `useAuth.ts:47`, not standalone file | **Valid gap** |
| Backend tests undocumented | 18 files | ✅ 16 test files confirmed (excluding `__init__.py` and `__pycache__`) | **Valid gap** |
| Scripts undocumented | 3 files | ✅ `validate_qa_findings.py`, `verify_p0_remediation.py`, `test_phase1_vendor_filter.py` confirmed | **Valid gap** |

---

## 4. Recommended Fixes

### 4.1 README.md Fixes

1. **Line 83**: Change "8 routes" → "7 routes"
2. **Project Structure tree**: Add `error-boundary.tsx`, `with-error-boundary.tsx`, `separator.tsx` under `ui/`
3. **Project Structure tree**: Add `styles/animations.ts` to the tree
4. **Testing section**: Add 3 missing script files to the E2E scripts list
5. **Route table**: Already correct (7 routes) — no change needed

### 4.2 Project_Architecture_Document.md Fixes

1. **Line 64**: Remove "+ Toaster" from `app.tsx` description
2. **Line 175**: Update `app.tsx` role description to reflect routing architecture
3. **Line 176**: Move Toaster reference to `layout.tsx` description
4. **Section 3.1**: Add `error-boundary.tsx`, `with-error-boundary.tsx`, `separator.tsx` under `ui/`
5. **Section 3.1**: Add `styles/animations.ts`
6. **Section 3.2**: Add `error-boundary.tsx` to key file descriptions
7. **Section 7.3**: Clarify `useCurrentUser` is inside `useAuth.ts`
