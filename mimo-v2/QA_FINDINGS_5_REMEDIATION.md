# QA Findings 5 Remediation Plan

## Executive Summary

**Date**: March 30, 2026
**Status**: Ready for Implementation
**Approach**: Test-Driven Development (TDD)

---

## Issues Identified & Root Causes

### Issue 1: Dialog Accessibility Warnings (Medium Priority)

**Symptom**: 11 console warnings: `Missing Description or aria-describedby={undefined}`

**Root Cause**:
- `contact-modal.tsx` and `coming-soon-modal.tsx` import `* as Dialog from "@radix-ui/react-dialog"` directly
- They bypass the shared Dialog primitive in `src/components/ui/dialog.tsx`
- The shared primitive already exports `DialogDescription` which these modals don't use

**Impact**: WCAG 2.1 non-compliance, screen reader barriers

---

### Issue 2: Form Submission Feedback Missing (Medium Priority)

**Symptom**: Contact form closes without visible success message

**Root Cause**:
- `Toaster` component from sonner is NOT mounted in `src/app/app.tsx`
- `toast.success()` calls work but have no visual output

**Impact**: Users uncertain if submission succeeded, may cause duplicate submissions

---

### Issue 3: Platform Card Scroll Behavior (Low Priority)

**Symptom**: QA reported no scroll on click, but verification shows scroll works

**Root Cause**:
- Code is correct in `vendor-cards.tsx` - dispatches CustomEvent and scrolls to #courses
- Discrepancy likely due to race condition in headless environment
- Status 5 verification shows scroll works (1770px)

**Status**: Already working, but needs hardening for reliability

---

## Remediation Tasks

### Task 1: Refactor Modals to Use Shared Dialog Components

**Files to Modify**:
- `src/components/modals/contact-modal.tsx`
- `src/components/modals/coming-soon-modal.tsx`

**Changes**:
1. Replace `import * as Dialog from "@radix-ui/react-dialog"` with imports from `@/components/ui/dialog`
2. Add `DialogDescription` component to each modal
3. Use shared Dialog wrapper components

**TDD Test Cases**:
- Console shows 0 accessibility warnings
- All modals have proper ARIA descriptions
- Modal functionality unchanged

---

### Task 2: Mount Toaster Component in App Root

**File to Modify**:
- `src/app/app.tsx`

**Changes**:
1. Import `{ Toaster }` from sonner
2. Add `<Toaster />` component inside the main container

**TDD Test Cases**:
- `toast.success()` displays visible notification
- `toast.error()` displays visible notification
- Toasts auto-dismiss after timeout

---

### Task 3: Harden Platform Card Scroll (Optional)

**File to Modify**:
- `src/components/sections/vendor-cards.tsx`

**Changes**:
- Add scrollIntoView with fallback for reliability
- Ensure courses section exists before scrolling

**TDD Test Cases**:
- Click SolarWinds card → scrolls to courses
- Works in headless environment
- Works with network delays

---

## Implementation Order

1. **Mount Toaster** (5 min) - Highest impact, lowest effort
2. **Refactor ContactModal** (30 min) - Use shared Dialog components
3. **Refactor ComingSoonModal** (30 min) - Use shared Dialog components
4. **Harden Scroll** (15 min) - Optional reliability improvement

---

## Files Summary

| File | Action | Estimated Lines |
|------|--------|-----------------|
| `src/app/app.tsx` | Add Toaster import + component | +2 |
| `src/components/modals/contact-modal.tsx` | Refactor to shared Dialog | ~50 lines changed |
| `src/components/modals/coming-soon-modal.tsx` | Refactor to shared Dialog | ~40 lines changed |
| `src/components/sections/vendor-cards.tsx` | Harden scroll (optional) | +10 |

**Total Estimated Time**: 1.5 hours
