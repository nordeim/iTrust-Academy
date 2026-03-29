# E2E Test Plan: iTrust Academy Frontend

> **Date**: March 29, 2026
> **Server**: http://localhost:5174
> **Stack**: React 19 + Tailwind CSS v4 + Django REST API
> **Testing Tools**: agent-browser, chrome-devtools-mcp

---

## 1. Test Suite Overview

### 1.1 Test Categories

| Category | Tests | Priority |
|----------|-------|----------|
| Page Load & Rendering | 3 | High |
| Hero Section | 4 | High |
| Navigation | 3 | High |
| Course Catalog | 5 | High |
| Vendor Cards | 2 | Medium |
| Footer | 2 | Medium |
| Mobile Responsiveness | 3 | Medium |
| API Integration | 3 | High |

### 1.2 Success Criteria

Each test must:
1. ✅ Pass visual verification (non-blank screenshot)
2. ✅ Pass structural verification (a11y snapshot)
3. ✅ No console errors
4. ✅ Expected elements present in DOM

---

## 2. Test Cases

### 2.1 Page Load & Rendering

| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| TC-001 | Homepage loads successfully | Navigate to / | Page title contains "iTrust" |
| TC-002 | React app mounts | Wait for networkidle | DOM contains main elements |
| TC-003 | No JS errors on load | Check console | No errors in console |

### 2.2 Hero Section

| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| TC-010 | Hero headline visible | Navigate, snapshot | "Advance Your IT Career" text present |
| TC-011 | CTA buttons present | Snapshot | "Explore Courses" button visible |
| TC-012 | Hero animation completes | Wait 2s after load | Text fully visible |
| TC-013 | Badge visible | Snapshot | "ASIA-PACIFIC'S PREMIER IT TRAINING" text |

### 2.3 Navigation

| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| TC-020 | Header visible | Scroll to top | Logo and nav items visible |
| TC-021 | Nav links present | Snapshot | Courses, Solutions, About, Contact links |
| TC-022 | Get Started button | Snapshot | Button visible in header |

### 2.4 Course Catalog

| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| TC-030 | Course cards render | Scroll to catalog | Course cards visible |
| TC-031 | Category filter buttons | Snapshot | All, Database, Security, etc. buttons |
| TC-032 | Filter by category | Click filter, snapshot | Filtered courses displayed |
| TC-033 | Course card content | Snapshot | Title, price, rating visible |
| TC-034 | Featured badge | Check featured courses | "Featured" badge on highlighted courses |

### 2.5 Vendor Cards

| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| TC-040 | Vendor section visible | Scroll to vendors | 4 vendor cards displayed |
| TC-041 | Vendor names | Snapshot | SolarWinds, Securden, Quest, Ivanti |

### 2.6 Footer

| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| TC-050 | Footer visible | Scroll to bottom | Footer content visible |
| TC-051 | Contact info | Snapshot | Email, phone, address visible |

### 2.7 Mobile Responsiveness

| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| TC-060 | Mobile viewport | Set viewport 375x812 | Layout adapts correctly |
| TC-061 | Mobile navigation | Check hamburger menu | Menu button visible |
| TC-062 | Mobile course cards | Snapshot | Cards stack vertically |

### 2.8 API Integration

| Test ID | Description | Steps | Expected Result |
|---------|-------------|-------|-----------------|
| TC-070 | API requests succeed | Check network | GET /api/v1/courses/ returns 200 |
| TC-071 | Courses data loads | Check course count | 9 courses displayed |
| TC-072 | Categories load | Check filter buttons | 5+ category filters present |

---

## 3. Execution Log

**Start Time**: [To be filled]
**Tester**: agent-browser CLI

### Test Results

| Test ID | Status | Screenshot | Notes |
|---------|--------|------------|-------|
| TC-001 | ⏳ | - | - |
| TC-002 | ⏳ | - | - |
| TC-003 | ⏳ | - | - |
| ... | ... | ... | ... |

---

## 4. Evidence Collection

### Screenshots Required

1. `e2e-homepage-full.png` - Full page homepage
2. `e2e-hero-section.png` - Hero section close-up
3. `e2e-course-catalog.png` - Course catalog section
4. `e2e-filtered-courses.png` - After category filter applied
5. `e2e-mobile-view.png` - Mobile viewport (375x812)
6. `e2e-footer.png` - Footer section

### Console Logs Required

- Capture any errors during page load
- Verify API requests succeed

---

**Status**: Ready for Execution
