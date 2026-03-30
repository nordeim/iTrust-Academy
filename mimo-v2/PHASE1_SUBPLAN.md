# Phase 1 Sub-Plan: Multi-Page Routing Architecture

## Goal
Transform the single-page application into a multi-page platform with react-router-dom, enabling dynamic routes for course details, dashboard, and brand pages.

## Current State Analysis
- `main.tsx`: Uses QueryProvider wrapper, no routing
- `app.tsx`: Renders all sections in a single div (SPA)
- `constants.ts`: NAV_ITEMS use hash links (#courses, #solutions, etc.)
- `header.tsx`: Uses scrollToSection() for navigation
- `footer.tsx`: Uses ComingSoonModal for placeholder links
- `course-card.tsx`: Uses `href="#course-${slug}"` (non-functional)

## TODO List

### TDD Red Phase (Failing Tests First)
- [ ] Write test: Clicking "Courses" navigates to / route
- [ ] Write test: Clicking course card navigates to /courses/:slug
- [ ] Write test: Clicking "About Us" in footer navigates to /about

### TDD Green Phase (Implementation)
- [ ] Create `src/app/layout.tsx` - Shared layout wrapper
- [ ] Create `src/pages/home.tsx` - Landing page with all sections
- [ ] Create `src/pages/course-detail.tsx` - Placeholder course detail
- [ ] Create `src/pages/about.tsx` - Placeholder about page
- [ ] Create `src/pages/faq.tsx` - Placeholder FAQ page
- [ ] Create `src/pages/privacy.tsx` - Placeholder privacy page
- [ ] Create `src/pages/terms.tsx` - Placeholder terms page
- [ ] Create `src/pages/dashboard.tsx` - Placeholder dashboard
- [ ] Update `src/main.tsx` - Add BrowserRouter wrapper
- [ ] Update `src/app/app.tsx` - Use Routes
- [ ] Update `src/lib/constants.ts` - Change NAV_ITEMS to routes
- [ ] Update `src/components/layout/header.tsx` - Use Link
- [ ] Update `src/components/layout/footer.tsx` - Use Link
- [ ] Update `src/components/cards/course-card.tsx` - Use Link

### TDD Refactor Phase (Quality Assurance)
- [ ] Run lint check: `npm run lint`
- [ ] Run build check: `npm run build`
- [ ] Verify navigation works in browser
- [ ] Capture screenshots of new pages

## Files to Create
| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Shared layout with Header, Footer, Toaster |
| `src/pages/home.tsx` | Landing page (current app.tsx content) |
| `src/pages/course-detail.tsx` | Course detail placeholder |
| `src/pages/about.tsx` | About Us page placeholder |
| `src/pages/faq.tsx` | FAQ page placeholder |
| `src/pages/privacy.tsx` | Privacy Policy placeholder |
| `src/pages/terms.tsx` | Terms of Service placeholder |
| `src/pages/dashboard.tsx` | User dashboard placeholder |

## Files to Modify
| File | Changes |
|------|---------|
| `src/main.tsx` | Add BrowserRouter |
| `src/app/app.tsx` | Use Routes, remove direct section imports |
| `src/lib/constants.ts` | Change NAV_ITEMS hrefs to routes |
| `src/components/layout/header.tsx` | Use Link from react-router-dom |
| `src/components/layout/footer.tsx` | Use Link instead of ComingSoonModal |
| `src/components/cards/course-card.tsx` | Use Link to /courses/:slug |

## Validation Checklist
- [ ] `npm run lint` passes with 0 errors
- [ ] `npm run build` succeeds
- [ ] Navigation links work correctly
- [ ] Course cards link to detail pages
- [ ] Footer links navigate to pages
- [ ] Browser back/forward works

## Estimated Time: 2-3 hours
