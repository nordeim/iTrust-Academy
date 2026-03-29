# Comprehensive E2E Test Plan - QA Validation

> **Date**: March 29, 2026
> **Version**: 1.0.0
> **Status**: Ready for Execution

---

## 📋 Test Plan Overview

This test plan validates all QA findings from `QA_findings.md` and `QA_findings_2.md` to confirm their resolution.

### QA Issues to Validate

| ID | Issue | Expected Resolution |
|----|-------|---------------------|
| QA-01 | Logo duplication (header) | "iTrust Academy" (not "iiTrust") |
| QA-02 | Logo duplication (footer) | "iTrust Academy" (not "iiTrust") |
| QA-03 | GET STARTED button | Scrolls to courses section |
| QA-04 | EXPLORE SCP FUNDAMENTALS | Scrolls to courses section |
| QA-05 | VIEW ALL COURSES | Scrolls to courses section |
| QA-06 | REQUEST CORPORATE DEMO | Scrolls to contact section |
| QA-07 | CONTACT SALES | Scrolls to contact section |
| QA-08 | SCHEDULE CONSULTATION | Scrolls to contact section |
| QA-09 | ENROLL NOW buttons | Scrolls to courses section |
| QA-10 | VIEW FULL TRAINING CALENDAR | Scrolls to schedule section |
| QA-11 | Header button text size | ≥ 14px font size |
| QA-12 | Accessibility labels | aria-hidden on decorative icons |

---

## 🧪 Test Cases

### Suite 1: Logo Duplication (QA-01, QA-02)

```python
# TC-101: Header Logo Test
# Given: User loads homepage
# When: Header renders
# Then: Logo should display "iTrust Academy" without duplication
# Verify: No "iiTrust Academy" text present

# TC-102: Footer Logo Test
# Given: User scrolls to footer
# When: Footer renders
# Then: Logo should display "iTrust Academy" without duplication
```

### Suite 2: CTA Button Functionality (QA-03 to QA-10)

```python
# TC-201: GET STARTED Button
# Given: Header is visible
# When: User clicks GET STARTED
# Then: Page scrolls to courses section
# Verify: Scroll position changes to courses section

# TC-202: EXPLORE SCP FUNDAMENTALS Button
# Given: Hero section is visible
# When: User clicks EXPLORE SCP FUNDAMENTALS
# Then: Page scrolls to courses section

# TC-203: VIEW ALL COURSES Button
# Given: Hero section is visible
# When: User clicks VIEW ALL COURSES
# Then: Page scrolls to courses section

# TC-204: REQUEST CORPORATE DEMO Button
# Given: CTA section is visible
# When: User clicks REQUEST CORPORATE DEMO
# Then: Page scrolls to contact section

# TC-205: CONTACT SALES Button
# Given: CTA section is visible
# When: User clicks CONTACT SALES
# Then: Page scrolls to contact section

# TC-206: SCHEDULE CONSULTATION Button
# Given: Professional Services section
# When: User clicks SCHEDULE CONSULTATION
# Then: Page scrolls to contact section

# TC-207: ENROLL NOW Buttons
# Given: Training schedule section
# When: User clicks ENROLL NOW
# Then: Page scrolls to courses section

# TC-208: VIEW FULL TRAINING CALENDAR
# Given: Course catalog section
# When: User clicks VIEW FULL TRAINING CALENDAR
# Then: Page scrolls to schedule section
```

### Suite 3: Button Text Size (QA-11)

```python
# TC-301: Header Button Font Size
# Given: Header is rendered
# When: GET STARTED button is rendered
# Then: Font size should be ≥ 14px
# Verify: Computed font-size is not 12px
```

### Suite 4: Accessibility (QA-12)

```python
# TC-401: Decorative Icons have aria-hidden
# Given: Page is loaded
# When: All SVG icons are rendered
# Then: Decorative icons should have aria-hidden="true"
# Verify: ArrowRight, Play icons have aria-hidden

# TC-402: Social Icons have aria-labels
# Given: Footer is visible
# When: Social media icons render
# Then: Each icon should have aria-label attribute
```

---

## 📸 Screenshots to Capture

| ID | Screenshot | Purpose |
|----|------------|---------|
| S-01 | qa-header-logo.png | Verify header logo |
| S-02 | qa-footer-logo.png | Verify footer logo |
| S-03 | qa-hero-buttons.png | Verify hero CTA buttons |
| S-04 | qa-cta-section.png | Verify CTA section buttons |
| S-05 | qa-button-font-size.png | Verify font size |
| S-06 | qa-accessibility.png | Verify aria attributes |

---

## ✅ Success Criteria

- [ ] All 12 QA issues validated
- [ ] No logo duplication visible
- [ ] All 11 CTAs functional (scroll behavior confirmed)
- [ ] Button font size ≥ 14px
- [ ] Decorative icons have aria-hidden
- [ ] Build passes with 0 errors
- [ ] Screenshots captured as evidence

---

**Status**: Ready for execution
