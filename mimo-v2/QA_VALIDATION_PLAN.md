# QA Findings Validation Plan - iTrust Academy

## Executive Summary

**Objective:** Validate the 11 non-functional elements identified in QA_findings_4.md against the actual codebase using browser automation.

**QA Findings Claims:**
- ✅ Working: 18 items (Navigation, Auth, Filters)
- ❌ Non-Functional: 11 items (CTAs, Footer Links, Platform Cards, Social Links)

**Validation Approach:**
- TDD methodology: Red → Green → Verify
- Playwright browser automation for UI verification
- Code inspection for handler verification
- Screenshot evidence for each finding

---

## Non-Functional Elements to Validate

### Category 1: Primary CTAs (7 items)
| ID | Element | Location | Expected | QA Claim |
|----|---------|----------|----------|----------|
| CTA-01 | EXPLORE SCP FUNDAMENTALS | Hero.tsx | Navigate/modal | No action |
| CTA-02 | ENROLL NOW (course 1) | CourseCard.tsx | Open enrollment | No action |
| CTA-03 | ENROLL NOW (course 2) | CourseCard.tsx | Open enrollment | No action |
| CTA-04 | ENROLL NOW (course 3) | CourseCard.tsx | Open enrollment | No action |
| CTA-05 | ENROLL NOW (course 4) | CourseCard.tsx | Open enrollment | No action |
| CTA-06 | SCHEDULE CONSULTATION | Footer.tsx | Open form/modal | No action |
| CTA-07 | REQUEST CORPORATE DEMO | Footer.tsx | Open form/modal | No action |

### Category 2: Platform Cards (4 items)
| ID | Element | Location | Expected | QA Claim |
|----|---------|----------|----------|----------|
| PC-01 | SolarWinds card | VendorCards.tsx | Navigate | No action |
| PC-02 | Securden card | VendorCards.tsx | Navigate | No action |
| PC-03 | Quest card | VendorCards.tsx | Navigate | No action |
| PC-04 | Ivanti card | VendorCards.tsx | Navigate | No action |

### Category 3: Footer Links (6 items)
| ID | Element | Location | Expected | QA Claim |
|----|---------|----------|----------|----------|
| FL-01 | About Us | Footer.tsx | Navigate | No action |
| FL-02 | Careers | Footer.tsx | Navigate | No action |
| FL-03 | Partners | Footer.tsx | Navigate | No action |
| FL-04 | Blog | Footer.tsx | Navigate | No action |
| FL-05 | Documentation | Footer.tsx | Navigate | No action |
| FL-06 | FAQ | Footer.tsx | Navigate | No action |

### Category 4: Social Links (3 items)
| ID | Element | Location | Expected | QA Claim |
|----|---------|----------|----------|----------|
| SL-01 | LinkedIn | Footer.tsx | Open external | No action |
| SL-02 | Twitter | Footer.tsx | Open external | No action |
| SL-03 | YouTube | Footer.tsx | Open external | No action |

---

## Validation Tasks

### Phase 1: Browser Environment Setup
- [ ] Verify frontend server running on port 5174
- [ ] Verify backend API running on port 8000
- [ ] Create Playwright test script
- [ ] Take baseline homepage screenshot

### Phase 2: Primary CTAs Validation
- [ ] **CTA-01:** Click EXPLORE SCP FUNDAMENTALS button
  → Verify: Does it scroll to courses or do nothing?
  → Screenshot: before/after click
  
- [ ] **CTA-02 to CTA-05:** Click all 4 ENROLL NOW buttons
  → Verify: Does it trigger login modal for guests?
  → Check: Is handleEnrollClick function working?
  → Screenshot: before/after click

- [ ] **CTA-06 & CTA-07:** Click footer CTAs
  → Verify: Do they open modals or do nothing?
  → Inspect: Footer.tsx for onClick handlers
  → Screenshot: before/after click

### Phase 3: Platform Cards Validation
- [ ] **PC-01 to PC-04:** Click all 4 platform cards
  → Verify: Are they wrapped in <a> tags?
  → Check: VendorCards.tsx implementation
  → Screenshot: element inspection

### Phase 4: Footer Links Validation
- [ ] **FL-01 to FL-06:** Click all footer navigation links
  → Verify: Do they have href attributes?
  → Check: Footer.tsx link implementation
  → Screenshot: link element inspection

### Phase 5: Social Links Validation
- [ ] **SL-01 to SL-03:** Click all social media links
  → Verify: Do they have target="_blank"?
  → Check: Social icon components
  → Screenshot: link attributes

### Phase 6: Code Inspection
- [ ] Inspect Hero.tsx for CTA handlers
- [ ] Inspect CourseCard.tsx for ENROLL NOW handler
- [ ] Inspect VendorCards.tsx for click handlers
- [ ] Inspect Footer.tsx for link implementation
- [ ] Check lib/constants.ts for navigation mappings

### Phase 7: Evidence Documentation
- [ ] Compile validation results table
- [ ] Compare findings against QA claims
- [ ] Identify discrepancies
- [ ] Create remediation recommendations

---

## Success Criteria

**Validation Complete When:**
- [ ] All 20 elements tested (11 non-functional + 9 working as controls)
- [ ] Screenshots captured for evidence
- [ ] Code inspected to verify implementation
- [ ] Results documented in comparison table
- [ ] Discrepancies between QA and actual state identified

---

## Test Script Requirements

```python
# Browser automation script must:
# 1. Navigate to http://localhost:5174/
# 2. Wait for networkidle
# 3. Test each non-functional element
# 4. Capture before/after screenshots
# 5. Log results with timestamps
# 6. Generate validation report
```

---

## Expected Outcomes

**Scenario A: QA Findings Confirmed**
- 11 elements truly non-functional
- Code lacks handlers/hrefs
- Remediation needed

**Scenario B: Partially Functional**
- Some elements work but not obvious
- UX issues (no visual feedback)
- Documentation/training needed

**Scenario C: Already Fixed**
- Handlers implemented after QA
- False positives in QA report
- Update documentation

---

## Timeline

| Phase | Estimated Time | Verification |
|-------|---------------|--------------|
| Phase 1: Setup | 2 min | Server responding 200 |
| Phase 2: CTAs | 5 min | Screenshots captured |
| Phase 3: Platform Cards | 3 min | Handler verification |
| Phase 4: Footer Links | 3 min | Link attributes checked |
| Phase 5: Social Links | 2 min | External link behavior |
| Phase 6: Code Inspection | 5 min | Source code reviewed |
| Phase 7: Documentation | 5 min | Report generated |
| **Total** | **25 min** | **Complete validation** |

---

## Risks & Mitigation

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Server not running | Low | Pre-check with curl |
| Selectors not found | Medium | Use flexible selectors |
| Timing issues | Medium | Use wait_for_timeout |
| Screenshots fail | Low | Check directory exists |

---

**Plan Version:** 1.0
**Created:** March 30, 2026
**Status:** Ready for execution
