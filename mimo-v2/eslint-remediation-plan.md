# ESLint Remediation Plan - iTrust Academy

## Executive Summary
**Objective:** Fix all 5 ESLint errors to achieve 0 errors with 100% build success
**Approach:** Test-Driven Development (TDD) - Red → Green → Refactor
**Estimated Time:** 15-20 minutes
**Risk Level:** Low (unused vars and type fixes only)

---

## Current State (RED)

### Validation Evidence
```bash
$ npm run lint

/home/project/iTrust-Academy/mimo-v2/src/components/forms/login-modal.tsx
  59:14  error  'error' is defined but never used  @typescript-eslint/no-unused-vars

/home/project/iTrust-Academy/mimo-v2/src/components/forms/register-modal.tsx
  77:14  error  'error' is defined but never used  @typescript-eslint/no-unused-vars

/home/project/iTrust-Academy/mimo-v2/src/components/layout/footer.tsx
  4:14  error  'scrollToSection' is defined but never used  @typescript-eslint/no-unused-vars

/home/project/iTrust-Academy/mimo-v2/src/components/layout/user-nav.tsx
  5:10  error  'useState' is defined but never used  @typescript-eslint/no-unused-vars

/home/project/iTrust-Academy/mimo-v2/src/hooks/useAuth.ts
  71:61  error  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any

✖ 5 problems (5 errors, 0 warnings)
```

### Success Criteria
- [ ] `npm run lint` returns 0 errors, 0 warnings
- [ ] `npm run build` completes successfully
- [ ] No runtime regressions in auth flow
- [ ] Type safety maintained

---

## Issue Analysis & TDD Test Cases

### Issue 1: Unused 'error' in login-modal.tsx
**Location:** `src/components/forms/login-modal.tsx:59`
**Root Cause:** Error handler captures `error` but doesn't use it
**Impact:** Low - dead code

**TDD Test Case:**
```typescript
// BEFORE (fails lint)
} catch (error) {
  // error not used
}

// AFTER (passes lint)
} catch {
  // omit unused parameter
}
```

### Issue 2: Unused 'error' in register-modal.tsx
**Location:** `src/components/forms/register-modal.tsx:77`
**Root Cause:** Same pattern as login-modal
**Impact:** Low - dead code

**TDD Test Case:**
```typescript
// BEFORE (fails lint)
} catch (error) {
  toast.error("Registration failed. Please try again.")
}

// AFTER (passes lint)
} catch {
  toast.error("Registration failed. Please try again.")
}
```

### Issue 3: Unused import 'scrollToSection' in footer.tsx
**Location:** `src/components/layout/footer.tsx:4`
**Root Cause:** Import added but never used in component
**Impact:** Low - dead import

**TDD Test Case:**
```typescript
// BEFORE (fails lint)
import { scrollToSection } from "@/lib/utils"

// AFTER (passes lint)
// Remove unused import
```

### Issue 4: Unused import 'useState' in user-nav.tsx
**Location:** `src/components/layout/user-nav.tsx:5`
**Root Cause:** Import added but component uses other state management
**Impact:** Low - dead import

**TDD Test Case:**
```typescript
// BEFORE (fails lint)
import { useState } from "react"

// AFTER (passes lint)
// Remove unused import
```

### Issue 5: 'any' type in useAuth.ts
**Location:** `src/hooks/useAuth.ts:71`
**Root Cause:** Type assertion bypasses TypeScript safety
**Impact:** Medium - type safety violation

**TDD Test Case:**
```typescript
// BEFORE (fails lint)
mutationFn: (data: Partial<User>) => updateUser(data as any)

// AFTER (passes lint)
// Option A: Use proper UserUpdateRequest type
mutationFn: (data: Partial<User>) => updateUser(data as UserUpdateRequest)

// Option B: Update updateUser signature to accept Partial<User>
```

---

## Implementation Tasks

### Phase 1: TDD Red Phase (Validate Issues)
- [ ] Run lint to confirm 5 errors exist
- [ ] Document all error locations and types
- [ ] Verify build still succeeds (sanity check)

### Phase 2: TDD Green Phase (Fix Issues)

#### Task 2.1: Fix login-modal.tsx unused error
**File:** `src/components/forms/login-modal.tsx`
**Line:** 59
**Action:** Remove `error` parameter from catch block
**Verification:** Run `npm run lint` - error count should decrease by 1

#### Task 2.2: Fix register-modal.tsx unused error
**File:** `src/components/forms/register-modal.tsx`
**Line:** 77
**Action:** Remove `error` parameter from catch block
**Verification:** Run `npm run lint` - error count should decrease by 1

#### Task 2.3: Fix footer.tsx unused import
**File:** `src/components/layout/footer.tsx`
**Line:** 4
**Action:** Remove `scrollToSection` from imports
**Verification:** Run `npm run lint` - error count should decrease by 1

#### Task 2.4: Fix user-nav.tsx unused import
**File:** `src/components/layout/user-nav.tsx`
**Line:** 5
**Action:** Remove `useState` from imports
**Verification:** Run `npm run lint` - error count should decrease by 1

#### Task 2.5: Fix useAuth.ts 'any' type
**File:** `src/hooks/useAuth.ts`
**Line:** 71
**Action:** Replace `any` with proper type
**Verification:** Run `npm run lint` - all errors should be resolved

### Phase 3: TDD Refactor Phase (Quality Assurance)
- [ ] Run full lint check: `npm run lint`
- [ ] Run TypeScript check: `npm run build`
- [ ] Verify no runtime regressions
- [ ] Document any side effects

### Phase 4: Final Validation
- [ ] Confirm lint passes with 0 errors
- [ ] Confirm build succeeds
- [ ] Quick smoke test of auth flow (login/register)

---

## Implementation Order (Dependencies)

```
Phase 1: Validation
    │
    ▼
Phase 2: Fix Issues (parallel safe)
    ├── Task 2.1: login-modal.tsx
    ├── Task 2.2: register-modal.tsx
    ├── Task 2.3: footer.tsx
    ├── Task 2.4: user-nav.tsx
    └── Task 2.5: useAuth.ts
    │
    ▼
Phase 3: Refactor & QA
    │
    ▼
Phase 4: Final Validation
```

**Note:** Tasks 2.1-2.4 are independent and can be done in any order. Task 2.5 requires type analysis.

---

## Rollback Plan

If any issue arises:
1. Each fix is in a separate file
2. Changes are minimal and isolated
3. Git status will show exact changes
4. Can revert individual files if needed

---

## Expected Outcome

```bash
# After remediation:
$ npm run lint
✓ No errors found

$ npm run build
✓ TypeScript compilation successful
✓ Vite build successful
✓ Bundle created in dist/
```

---

## Notes

- All fixes follow existing codebase patterns
- No breaking changes to API or component interfaces
- Maintains backward compatibility
- Type safety improved (removing `any`)

**Prepared by:** AI Architect following Meticulous Approach SOP
**Date:** March 30, 2026
**Status:** Ready for execution
