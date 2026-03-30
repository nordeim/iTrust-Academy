# QA Remediation Plan - iTrust Academy
## Deep Analysis & Optimal UX Implementation

**Version:** 2.0
**Date:** March 30, 2026
**Status:** Ready for Implementation
**Approach:** Test-Driven Development (TDD) - Red → Green → Refactor

---

## Executive Summary

After deep analysis of user expectations and industry best practices for training platforms, I've identified **15 non-functional elements** requiring remediation. This plan implements **natural UX patterns** that align with user mental models.

### Key Design Principles Applied:
1. **Progressive Disclosure** - Show what's available, hide what's not
2. **Immediate Feedback** - Every click provides clear response
3. **Contextual Actions** - Platform cards filter by platform
4. **Graceful Degradation** - Placeholder features show "Coming Soon" rather than failing silently

---

## Deep UX Analysis & Optimal Solutions

### 🔴 Critical Issues (Immediate Fix Required)

#### Issue 1: Platform Cards Don't Filter Courses
**Current State:** Cards link to #courses but don't filter
**User Expectation:** Click SolarWinds → See only SolarWinds courses
**Optimal Solution:** Add vendor filtering to CourseCatalog

**UX Rationale:**
- Users expect platform cards to act as filters (Amazon, Udemy pattern)
- This creates a direct path from interest to relevant content
- Supports the "browse by vendor" mental model

**Implementation:**
- vendor-cards.tsx: Dispatch custom event with vendor ID
- course-catalog.tsx: Listen for event and filter courses
- Add clear filter button when active

**TDD Test Cases:**
1. Click SolarWinds card → URL updates to #courses?vendor=solarwinds
2. CourseCatalog reads param → Filters to show only SolarWinds courses
3. Active filter indicator shows in UI
4. Clear filter returns to all courses

---

#### Issue 2: Footer CTAs Non-Functional
**Current State:** Button clicks have no visible action
**User Expectation:** Opens contact form or modal
**Optimal Solution:** Implement Contact Modal System

**UX Rationale:**
- Corporate training inquiries need structured forms
- Modal keeps user in context (no page navigation)
- Form fields: Name, Email, Company, Interest, Message

**Implementation:**
- Create ContactModal component using Radix Dialog
- Props: type ('consultation' | 'demo' | 'sales')
- Zod validation for form fields
- Success toast on submit

**TDD Test Cases:**
1. Click SCHEDULE CONSULTATION → ContactModal opens with type="consultation"
2. Click REQUEST CORPORATE DEMO → ContactModal opens with type="demo"
3. Click CONTACT SALES → ContactModal opens with type="sales"
4. Form validation works (required fields)
5. Submit shows success toast
6. Close button dismisses modal

---

### 🟡 High Priority Issues (This Sprint)

#### Issue 3: Footer Links Have Placeholder Hrefs
**Current State:** href="#" for Careers, Partners, Blog, Documentation, FAQ
**User Expectation:** Navigate to actual content
**Optimal Solution:** Implement "Coming Soon" Modals

**UX Rationale:**
- These pages don't exist yet (no backend routes)
- "Coming Soon" is better than broken links
- Maintains user trust while signaling future value
- Can include "Notify me" email capture

**Implementation:**
- Create ComingSoonModal component
- Triggered by placeholder links
- Content: "This feature is coming soon!" + email signup

**TDD Test Cases:**
1. Click Careers → ComingSoonModal opens with title="Careers at iTrust"
2. Click Partners → ComingSoonModal opens with title="Partners Program"
3. Click Blog → ComingSoonModal opens with title="iTrust Blog"
4. Click Documentation → ComingSoonModal opens with title="Documentation"
5. Click FAQ → ComingSoonModal opens with title="FAQ"
6. Email input accepts valid emails
7. Subscribe button shows confirmation

---

#### Issue 4: Social Links Don't Open Externally
**Current State:** href="#" with no target="_blank"
**User Expectation:** Opens social profiles in new tab
**Optimal Solution:** Add real URLs and external link behavior

**UX Rationale:**
- Social links must open in new tab (user doesn't lose place)
- rel="noopener noreferrer" for security
- If no profiles exist, use ComingSoonModal

**Implementation:**
- Add SOCIAL_URLS to constants.ts
- Update footer.tsx to use target="_blank"
- Add security attributes

**TDD Test Cases:**
1. Click LinkedIn → Opens in new tab
2. Click Twitter → Opens in new tab
3. Click YouTube → Opens in new tab
4. All links have proper security attributes
5. If URLs are placeholder → ComingSoonModal

---

## Remediation Implementation Plan

### Phase 1: Platform Card Filtering (TDD: Red)

#### Task 1.1: Update VendorCards to Pass Filter Parameter
**File:** src/components/sections/vendor-cards.tsx
**Change:** Modify href to include vendor parameter

**Before:** href={`#courses`}

**After:** 
- Dispatch CustomEvent with vendor.id
- Set window.location.hash with vendor param

**Test:** 
- Click SolarWinds card
- Verify URL contains "vendor=solarwinds"
- Verify scroll to courses section

---

#### Task 1.2: Update CourseCatalog to Listen for Filter Events
**File:** src/components/sections/course-catalog.tsx
**Change:** Add event listener for vendor filter

**Add useEffect:**
- Listen for 'vendorFilter' custom event
- Set activeVendor from event detail
- Check URL hash on mount for vendor param
- Scroll to courses section

**Test:**
- Click SolarWinds card
- Verify only SolarWinds courses shown
- Verify active filter badge appears
- Click "Clear Filter" → All courses shown

---

#### Task 1.3: Add Clear Filter Button
**File:** src/components/sections/course-catalog.tsx
**Change:** Show clear button when filter active

**Add to UI:**
- Show "Clear Filter" button when activeVendor is set
- Reset activeVendor to null on click
- Update URL to remove vendor param

**Test:**
- Apply vendor filter
- Click "Clear Filter"
- Verify all courses displayed
- Verify URL updated to remove vendor param

---

### Phase 2: Contact Modal System (TDD: Red)

#### Task 2.1: Create ContactModal Component
**File:** src/components/modals/contact-modal.tsx (new)

**Requirements:**
- Radix Dialog primitive (consistent with auth modals)
- Props: type: 'consultation' | 'demo' | 'sales'
- Form fields: name, email, company, message
- Dynamic title based on type
- Zod validation schema
- Loading state on submit
- Success toast notification

**TDD Test Cases:**
- Renders with correct title based on type
- Validates required fields
- Shows validation errors
- Submits successfully with toast
- Closes on success

---

#### Task 2.2: Create useContactForm Hook
**File:** src/hooks/use-contact-form.ts (new)

**Responsibilities:**
- Form state management
- Validation with Zod
- Submission to backend (or mock)
- Loading states
- Error handling

**TDD Test Cases:**
- Submit with invalid email shows error
- Submit with valid data succeeds
- Loading state during submission
- Error state on failure

---

#### Task 2.3: Integrate ContactModal into ProfessionalServices
**File:** src/components/sections/professional-services.tsx
**Change:** Replace scrollToSection with ContactModal

**Before:** Button onClick scrolls to contact section

**After:** 
- Button opens ContactModal with type="consultation"
- Manage modal state with useState

**Test:**
- Click Schedule Consultation
- Verify ContactModal appears
- Verify title is "Schedule a Consultation"

---

#### Task 2.4: Integrate ContactModal into CTA Section
**File:** src/components/sections/cta.tsx
**Change:** Replace scrollToSection with ContactModal

**Update both buttons:**
- "Request Corporate Demo" → opens ContactModal with type="demo"
- "Contact Sales" → opens ContactModal with type="sales"

**Test:**
- Click Request Corporate Demo
- Verify ContactModal with type="demo"
- Click Contact Sales
- Verify ContactModal with type="sales"

---

### Phase 3: Coming Soon Modal System (TDD: Red)

#### Task 3.1: Create ComingSoonModal Component
**File:** src/components/modals/coming-soon-modal.tsx (new)

**Requirements:**
- Props: title: string, open: boolean, onClose: () => void
- Content: "Coming Soon" illustration/message
- Email signup for notifications (optional)
- Close button + Escape key dismiss

**TDD Test Cases:**
- Renders with correct title
- Shows "Coming Soon" message
- Closes on Escape key
- Closes on close button click

---

#### Task 3.2: Update Footer Links to Use ComingSoonModal
**File:** src/components/layout/footer.tsx
**Change:** Convert placeholder links to ComingSoonModal triggers

**Before:** a href="#" for placeholder links

**After:**
- Use button with onClick for placeholder links
- Open ComingSoonModal with link label as title
- Keep real links (About Us) as anchor tags

**Create mapping:**
- COMING_SOON_LINKS = ['Careers', 'Partners', 'Blog', 'Documentation', 'FAQ']
- REAL_PAGES = ['About Us', 'Contact']

**Test:**
- Click Careers → ComingSoonModal appears
- Click About Us → Scrolls to About section

---

### Phase 4: Social Links Fix (TDD: Red)

#### Task 4.1: Update Social Icons Component
**File:** src/components/layout/footer.tsx
**Change:** Add real URLs and external attributes

**Before:** a href="#" with Icon

**After:**
- Define SOCIAL_URLS mapping
- Check if URL is placeholder
- Use button for placeholders (ComingSoonModal)
- Use anchor with target="_blank" for real URLs
- Add rel="noopener noreferrer" for security

**Test:**
- Click LinkedIn
- Verify new tab opened with linkedin.com
- Verify has target="_blank" and rel="noopener noreferrer"

---

### Phase 5: Code Quality & Validation (TDD: Refactor)

#### Task 5.1: Run Lint Checks
```bash
npm run lint
# Expect: 0 errors, 0 warnings
```

#### Task 5.2: Run TypeScript Build
```bash
npm run build
# Expect: Build succeeds
```

#### Task 5.3: Browser Validation
```bash
python3 scripts/validate_qa_findings.py
# Expect: All 15 issues now PASS
```

---

## Files to Modify

| File | Changes | Lines |
|------|---------|-------|
| src/components/sections/vendor-cards.tsx | Add filter event dispatch | +5 |
| src/components/sections/course-catalog.tsx | Add event listener, clear filter | +25 |
| src/components/modals/contact-modal.tsx | Create new component | +150 |
| src/components/modals/coming-soon-modal.tsx | Create new component | +80 |
| src/hooks/use-contact-form.ts | Create new hook | +60 |
| src/components/sections/professional-services.tsx | Integrate ContactModal | +15 |
| src/components/sections/cta.tsx | Integrate ContactModal | +15 |
| src/components/layout/footer.tsx | Update links, add ComingSoon | +40 |
| src/lib/constants.ts | Add SOCIAL_URLS | +8 |

**Total:** ~398 lines of new/modified code

---

## Validation Checklist

### TDD Red Phase (Before Implementation)
- [ ] Write failing tests for each feature
- [ ] Run tests - confirm they fail
- [ ] Document expected behavior

### TDD Green Phase (Implementation)
- [ ] Implement Platform Card filtering
- [ ] Implement ContactModal system
- [ ] Implement ComingSoonModal system
- [ ] Fix Social Links
- [ ] Run tests - confirm they pass

### TDD Refactor Phase (Quality)
- [ ] Run ESLint - 0 errors
- [ ] Run TypeScript build - succeeds
- [ ] Re-run QA validation script
- [ ] Verify all 15 issues now PASS
- [ ] Capture final screenshots
- [ ] Update documentation

---

## Success Criteria

**Validated Complete When:**
- [ ] All 15 non-functional elements now work correctly
- [ ] Platform cards filter courses by vendor
- [ ] Footer CTAs open ContactModal
- [ ] Footer links show ComingSoonModal
- [ ] Social links open in new tab
- [ ] ESLint passes with 0 errors
- [ ] TypeScript build succeeds
- [ ] QA validation script shows 100% pass rate
- [ ] Screenshots captured as evidence
- [ ] User can complete all core journeys

---

## Estimated Timeline

| Phase | Tasks | Estimated Time |
|-------|-------|---------------|
| Phase 1 | Platform Card Filtering | 45 min |
| Phase 2 | ContactModal System | 90 min |
| Phase 3 | ComingSoonModal System | 45 min |
| Phase 4 | Social Links Fix | 15 min |
| Phase 5 | Validation & QA | 30 min |
| **Total** | | **225 min (3.75 hours)** |

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| URL parsing edge cases | Low | Medium | Use URLSearchParams API |
| Modal focus management | Medium | Low | Follow Radix Dialog patterns |
| Form validation UX | Low | Medium | Clear error messages |
| Build size increase | Low | Low | Code splitting if needed |

---

**Plan Version:** 2.0
**Prepared by:** AI Architect
**Last Updated:** March 30, 2026
**Status:** Ready for Implementation
