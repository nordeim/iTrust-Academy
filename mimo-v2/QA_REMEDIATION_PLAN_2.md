# QA Findings 2 - Remediation Plan

> **Date**: March 29, 2026
> **Status**: Ready for Execution
> **Approach**: Test-Driven Development (TDD)

---

## 📋 Issue Validation Summary

| # | Issue | File | Line | Root Cause | Status |
|---|-------|------|------|------------|--------|
| 1 | Footer logo duplication | `footer.tsx` | 11 | `<span>i</span>` icon + "iTrust" text | ✅ Confirmed |
| 2 | REQUEST CORPORATE DEMO no handler | `cta.tsx` | 47 | Missing onClick | ✅ Confirmed |
| 3 | CONTACT SALES no handler | `cta.tsx` | 55 | Missing onClick | ✅ Confirmed |
| 4 | ENROLL NOW no handler | `training-schedule.tsx` | 158 | Missing onClick | ✅ Confirmed |
| 5 | SCHEDULE CONSULTATION no handler | `professional-services.tsx` | 72 | Missing onClick | ✅ Confirmed |

---

## 🔧 Remediation Plan (TDD Approach)

### Phase 1: Fix Footer Logo Duplication

**Test Case**: TC-501
- **Given**: Footer renders
- **When**: User views footer
- **Then**: Logo should display "iTrust Academy" (not "iiTrust Academy")

**Implementation**: Apply same GraduationCap icon fix as header

**File**: `src/components/layout/footer.tsx`

---

### Phase 2: Wire Remaining CTAs

**Test Cases**:
- TC-510: "Request Corporate Demo" scrolls to contact section
- TC-511: "Contact Sales" scrolls to contact section
- TC-512: "Enroll Now" scrolls to courses section
- TC-513: "Schedule Consultation" scrolls to contact section

**Files**:
- `src/components/sections/cta.tsx`
- `src/components/sections/training-schedule.tsx`
- `src/components/sections/professional-services.tsx`

---

## ✅ Success Criteria

- [ ] Footer displays "iTrust Academy" correctly
- [ ] All remaining CTA buttons have functional onClick handlers
- [ ] Build passes with 0 errors
- [ ] All buttons provide visual feedback on click

---

**Ready for Execution**
