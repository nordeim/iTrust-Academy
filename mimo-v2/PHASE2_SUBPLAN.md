# Phase 2 Sub-Plan: Course Detail Enhancement

## Goal
Enhance the course detail page with rich content sections including tabbed navigation, curriculum breakdown, instructor profiles, certification info, and related courses.

## Current State Analysis

### Existing course-detail.tsx
- ✅ Basic course information (title, subtitle, description)
- ✅ Course stats (duration, modules, enrolled, rating)
- ✅ "What You'll Learn" section (hardcoded)
- ✅ Prerequisites section (hardcoded)
- ✅ Sidebar with pricing and CTAs
- ✅ Breadcrumb navigation

### What's Missing
- ❌ Tabbed content navigation
- ❌ Dynamic curriculum section
- ❌ Instructor profile section
- ❌ Certification information
- ❌ Related courses section
- ❌ "Enroll Now" auth integration
- ❌ Social sharing buttons

### Available Course Data (courses.ts)
- 9 courses with basic info
- No curriculum data (needs to be added)
- No instructor data (needs to be added)

## TODO List

### TDD Red Phase (Failing Tests First)
- [ ] Write test: Tab navigation switches content
- [ ] Write test: Curriculum section shows modules
- [ ] Write test: Related courses display correctly
- [ ] Write test: Enroll Now button triggers auth check

### TDD Green Phase (Implementation)
- [ ] Add curriculum data to courses.ts
- [ ] Add instructor data to courses.ts
- [ ] Create CourseTabs component for tabbed navigation
- [ ] Create CourseCurriculum component
- [ ] Create CourseInstructor component
- [ ] Create CourseCertification component
- [ ] Create RelatedCourses component
- [ ] Update course-detail.tsx with new sections
- [ ] Add Enroll Now auth integration
- [ ] Add social sharing buttons

### TDD Refactor Phase (Quality Assurance)
- [ ] Run lint check: `npm run lint`
- [ ] Run build check: `npm run build`
- [ ] Verify all tabs work correctly
- [ ] Capture screenshots of new sections

## Files to Modify

| File | Changes |
|------|---------|
| `src/data/courses.ts` | Add curriculum, instructor, certification data |
| `src/pages/course-detail.tsx` | Add tabs and new sections |

## New Components to Create

| Component | Purpose |
|-----------|---------|
| `src/components/course/course-tabs.tsx` | Tabbed navigation for course sections |
| `src/components/course/course-curriculum.tsx` | Module list with descriptions |
| `src/components/course/course-instructor.tsx` | Instructor profile |
| `src/components/course/course-certification.tsx` | Certification information |
| `src/components/course/related-courses.tsx` | Related courses grid |

## Validation Checklist
- [ ] `npm run lint` passes with 0 errors
- [ ] `npm run build` succeeds
- [ ] Tab navigation works
- [ ] Curriculum displays correctly
- [ ] Instructor profile renders
- [ ] Related courses show
- [ ] Enroll Now button works

## Estimated Time: 3-4 hours
