## 1. CODING STANDARDS FOR AGENTS

### General
- **TDD Mandate:** ALWAYS write or update tests before/during implementation.
- **Build Verification:** Before marking a frontend task as complete, verify that `vite build` succeeds without TypeScript errors.

### Frontend Logic
- **Button Handlers:** All landing page buttons must use the `useNavigate` hook for SPA transitions; avoid `<a href="#">` or window-level redirects.
- **Type Imports:** Use `import type` for all TypeScript interfaces and types to comply with `verbatimModuleSyntax`.

### Backend Logic
- **Soft Delete:** All core models must implement `SoftDeleteManager` and provide `delete()` (soft) and `restore()` methods. Use `Model.objects.all_objects()` to include deleted records in queries.
- **Standardized Responses:** Use `ResponseFormatterMixin` for all ViewSets to ensure consistent JSON envelopes.

---

## 2. DEFINITION OF DONE (DoD)
A task is complete only when:
1. **Tests Pass:** `python manage.py test` (Backend: 257 tests) and `npm run test` (Frontend: 92+ tests) return 100% success.
2. **E2E Validation:** Basic smoke tests (`tests/e2e/smoke.spec.ts`) pass with visual verification (non-blank screenshots).
3. **Build Integrity:** Production build (`npm run build`) completes with zero TypeScript errors.
4. **Standardization:** Response format adheres to the standardized JSON envelope.
5. **Accessibility:** Targeted at **WCAG AAA**. All animations respect `useReducedMotion`.

## 3. TROUBLESHOOTING

| Issue | Cause | Solution |
|-------|-------|----------|
| TypeScript build errors (TS1484) | `verbatimModuleSyntax` | Use `import type` for type-only imports |
| Blank white page | `kimi-plugin-inspect-react` incompatible with React 19 | Remove plugin from `vite.config.ts` |
| Server dies after shell exit | Process requires active TTY | Use `nohup` with `< /dev/null` redirection |
| Tests return 404 | Reserved query param `format` | Avoid `format` as filter param name |
| Throttle tests fail | Rate too high in test settings | Use custom test throttle classes |
| Request IDs identical | Response caching | Call `cache.clear()` between requests |
| Cache stale data | Signal not registered | Check `courses/apps.py` `ready()` method |
| Ordering fails (string comparison) | API returns decimals as strings | Convert to float: `float(c["price"])` |
| LSP type error in admin | Tuple concatenation | Convert fieldsets to list: `list(UserAdmin.fieldsets) + [...]` |
| `ImproperlyConfigured: No default throttle rate` | Missing scope in settings | Add scope to `DEFAULT_THROTTLE_RATES` |
| Import error from `api.exceptions` | Stale import from deleted module | Remove invalid import, consolidate in `exceptions.py` |
| Stripe Elements init error | Elements wrapper applied too early | Make `<Elements>` conditional on stripePromise |
| Mobile menu not closing | Missing state management | Verify `setIsMobileMenuOpen(false)` on navigation |
| Button not responding | Missing onClick handler | Add `useNavigate` + `onClick` handler |

---

## 4. DEFINITION OF DONE

A task is complete only when:

1. **Validation:** Behavioral correctness verified (tests or shell verification)
2. **Styling:** Adheres to Design System (sharp corners, indigo/cyan theme, CSS variables)
3. **Testing:** New features include comprehensive test coverage (TDD preferred)
4. **TypeScript:** Build succeeds with 0 errors (`npm run build`)
5. **No regressions:** All existing tests still pass
6. **Documentation:** Update relevant docs if architecture changes

---

## 5. RECENT LESSONS LEARNED

1. **`verbatimModuleSyntax`** requires `import type` — caused 218 build errors when violated
2. **React 19** is incompatible with some Vite plugins (e.g., `kimi-plugin-inspect-react`)
3. **DRF throttle rates** are computed at class init — `override_settings` doesn't affect them; use custom throttle classes for testing
4. **Cached responses** include dynamic metadata — clear cache between tests verifying uniqueness
5. **Django signals** must be registered in `apps.py` `ready()` method
6. **`format`** is a reserved DRF query parameter — don't use it as a filter name
7. **Server backgrounding** requires `nohup` + `< /dev/null` for Node.js processes
8. **cmdk** component needs `shouldFilter={false}` to disable built-in filtering when using custom search logic

## 6. BUTTON CLICK FIXES

### Issue Summary

Multiple buttons on the frontend landing page were not responding when clicked. This prevented users from navigating to key pages like login, registration, and enrollment.

### Root Cause Analysis

| Component | Button | Issue |
|-----------|--------|-------|
| **Navigation.tsx** | "Sign In" | No onClick handler |
| **Navigation.tsx** | "Get Started" | No onClick handler |
| **Navigation.tsx** | "A Academy" | Used `<a href="#">` instead of `<Link>` |
| **FeaturedCourse.tsx** | "Enroll Now" | No onClick handler |
| **ConsultingCTA.tsx** | "Talk to Sales" | No onClick handler |
| **ConsultingCTA.tsx** | "Download Brochure" | No onClick handler |
| **TrainingSchedule.tsx** | "Enroll Now" | Only e.stopPropagation() |

### Solution

Added proper onClick handlers with `useNavigate` hook from React Router:

```typescript
// Before
<Button>Sign In</Button>

// After
<Button onClick={() => navigate("/login")}>Sign In</Button>
```

### Files Modified

| File | Changes |
|------|---------|
| `Navigation.tsx` | Added useNavigate, onClick handlers for Sign In/Get Started |
| `FeaturedCourse.tsx` | Added useNavigate, onClick handler for Enroll Now |
| `ConsultingCTA.tsx` | Added useNavigate, onClick handlers for Talk to Sales/Download Brochure |
| `TrainingSchedule.tsx` | Added useNavigate, updated onClick to navigate to enrollment |

### Button Navigation Mapping

| Button | Action | Route |
|--------|--------|-------|
| **A Academy** | Navigate | `/` (home page) |
| **Sign In** | Navigate | `/login` |
| **Get Started** | Navigate | `/register` |
| **Enroll Now** | Navigate | `/courses/{slug}/enroll` |
| **Talk to Sales** | Alert | Contact info displayed |
| **Download Brochure** | Alert | Coming soon message |

### Lessons Learned

1. **React Router Integration**
   - Always use `<Link>` for internal navigation
   - Use `useNavigate` hook for programmatic navigation
   - Avoid `<a href="#">` for SPA navigation

2. **Button Handlers**
   - All interactive buttons need onClick handlers
   - Test button functionality in browser
   - Consider user experience (scroll to top after navigation)

3. **Component Integration**
   - Navigation components should use React Router
   - Test navigation across all pages
   - Verify links work from any starting page

### Verification

- ✅ All buttons now respond to clicks
- ✅ Navigation works from any page
- ✅ React Router properly integrated
- ✅ Screenshot evidence captured

---

**Status: All navigation elements functional** 🎉

---

## 🧪 QA VERIFICATION RESULTS (March 24, 2026)

### All Issues Resolved ✅

| Issue | Status | Root Cause | Resolution |
|-------|--------|------------|------------|
| Homepage "Enroll Now" Buttons | ✅ FIXED | No onClick handlers | Added proper navigation handlers |
| Registration Form | ✅ FIXED | Missing fields / checkbox validation | Backend accepts registration, Zod schema handles checkbox |
| Command Palette Search | ✅ FIXED | cmdk filtering + onInput conflict | Removed onInput handler, added shouldFilter={false} |

### Detailed Test Results

#### Issue #1: Homepage "Enroll Now" Buttons
| Test Case | Expected | Actual | Status |
|-----------|----------|--------|--------|
| Hero button click | Navigate to Sign In | ✅ Sign In page displayed | PASS |
| Cohort button click | Navigate to Sign In | ✅ Sign In page displayed | PASS |

**Root Cause:** Previously had noop handlers.  
**Fix Applied:** Button handlers now properly navigate to authentication flow.

---

#### Issue #2: Registration Form
| Test Case | Expected | Actual | Status |
|-----------|----------|--------|--------|
| Form submission | 201 Created | ✅ 201 Created | PASS |
| Token acquisition | 200 OK | ✅ 200 OK | PASS |
| User profile load | 200 OK | ✅ 200 OK | PASS |
| Checkbox validation | Accept "on" string | ✅ Working | PASS |

**Root Cause:** Missing first_name/last_name fields caused 400 Bad Request.  
**Fix Applied:** Backend now accepts registration without these fields (made optional or auto-populated).

---

#### Issue #3: Command Palette Search
| Test Case | Expected | Actual | Status |
|-----------|----------|--------|--------|
| Open palette | Dialog visible | ✅ Dialog visible | PASS |
| Type "ai" | Query updated | ✅ Results shown | PASS |
| List height | > 0px | ✅ 124.0px | PASS |
| Items rendered | ≥ 1 | ✅ 1 item | PASS |
| hidden attribute | null | ✅ null (not hidden) | PASS |
| Result text | Course visible | ✅ "AI Engineering Bootcamp" | PASS |

**Root Cause:** React state query was null despite input, list height 0px.  
**Fix Applied:**
- Removed conflicting onInput handler
- Added shouldFilter={false} to disable cmdk's built-in filtering
- Passed shouldFilter prop to Command component

---

### Code Changes Summary

**Files Modified:**
1. `SearchDialog.tsx` - Removed onInput handler, added shouldFilter prop
2. `command.tsx` - Added shouldFilter prop to CommandDialog and Command
3. `RegisterPage.tsx` - Zod schema handles checkbox string values

**Build Status:** ✅ SUCCESS (8.59s)

---

### Verification Evidence

- Screenshot: `command-palette-fix-verify.png` - Shows search results
- API Response: POST /auth/register/ - 201 Created
- Test Results: All 3 issues 100% passing


