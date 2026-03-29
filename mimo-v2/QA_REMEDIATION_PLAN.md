# QA Findings Remediation Plan - iTrust Academy

> **Date**: March 29, 2026
> **Status**: Ready for Execution
> **Approach**: Test-Driven Development (TDD)

---

## 📋 Issue Validation Summary

| # | Issue | Severity | Root Cause Confirmed | Files Affected |
|---|-------|----------|---------------------|----------------|
| 1 | CTAs Non-Functional | 🔴 CRITICAL | No onClick handlers | header.tsx, hero.tsx, course-catalog.tsx |
| 2 | Logo Duplication | 🔴 CRITICAL | Icon "i" + Text "iTrust" = "iiTrust" | header.tsx |
| 3 | Missing A11y Labels | 🟠 MAJOR | Icons lack aria-label | All section components |
| 4 | Small Button Text | 🟡 MODERATE | size="sm" = 12px | header.tsx |
| 5 | Anchor-Only Nav | 🟡 MODERATE | No routing system | All navigation |

---

## 🔧 Remediation Plan (TDD Approach)

### Phase 1: Fix Logo Duplication Bug

**Test Case**: TC-001
- **Given**: Logo component renders
- **When**: User views header
- **Then**: Logo should display "iTrust Academy" (not "iiTrust Academy")

**Root Cause**: Logo component shows icon "i" followed by text "iTrust Academy"

**Solution**: Change icon to a different symbol (shield, checkmark, or training icon)

**File**: `src/components/layout/header.tsx`

---

### Phase 2: Wire CTA Buttons with Navigation

**Test Cases**:
- TC-010: "Get Started" button navigates to contact/signup
- TC-011: "Explore SCP Fundamentals" scrolls to course catalog
- TC-012: "View All Courses" scrolls to course catalog
- TC-013: "View Full Training Calendar" scrolls to schedule section

**Implementation**:
1. Add onClick handlers with scroll functionality
2. Create smooth scroll utility function
3. Wire all CTA buttons

**Files**:
- `src/components/layout/header.tsx`
- `src/components/sections/hero.tsx`
- `src/components/sections/course-catalog.tsx`

---

### Phase 3: Add Accessibility Labels to Icons

**Test Cases**:
- TC-020: All interactive icons have aria-label
- TC-021: Decorative icons have aria-hidden="true"
- TC-022: Screen reader announces icon purpose

**Implementation**:
1. Audit all lucide-react icon usage
2. Add aria-label to interactive icons
3. Add aria-hidden to decorative icons

**Files**: All section components

---

### Phase 4: Increase Header Button Text Size

**Test Case**: TC-030
- **Given**: Header CTA button
- **When**: User views button
- **Then**: Font size should be ≥ 14px

**Implementation**: Change `size="sm"` to `size="default"` or `size="lg"`

**File**: `src/components/layout/header.tsx`

---

## 📁 Files to Modify

| File | Changes |
|------|---------|
| `src/lib/utils.ts` | Add scrollToSection utility |
| `src/components/layout/header.tsx` | Fix logo, add onClick, increase button size |
| `src/components/sections/hero.tsx` | Add onClick to CTA buttons |
| `src/components/sections/course-catalog.tsx` | Add onClick to calendar button |
| `src/components/sections/training-schedule.tsx` | Add onClick to buttons |

---

## ✅ Success Criteria

1. ✅ Logo displays "iTrust Academy" correctly
2. ✅ All CTA buttons navigate/scroll on click
3. ✅ All icons have proper accessibility attributes
4. ✅ Header button text is ≥ 14px
5. ✅ Build passes with 0 errors
6. ✅ E2E tests verify functionality

---

**Status**: Ready for execution
