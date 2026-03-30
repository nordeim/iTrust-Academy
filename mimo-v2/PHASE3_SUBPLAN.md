# Phase 3 Sub-Plan: Search Functionality

## Goal
Add search functionality to the course catalog with debounced filtering by title, subtitle, and tags.

## Current State Analysis

### Existing course-catalog.tsx
- ✅ Category filter buttons (All, SolarWinds, etc.)
- ✅ API data fetching (useCourses hook)
- ✅ Loading state with skeleton
- ✅ Empty state for category filter
- ✅ Vendor filter event listener

### What's Missing
- ❌ Search input field
- ❌ Debounced search filtering
- ❌ Search by title, subtitle, tags
- ❌ Search result count feedback
- ❌ Clear search button

### Available Course Data
- 9 courses from static data (COURSES array)
- Each course has: title, subtitle, description, tags, vendor, level

## TODO List

### TDD Red Phase (Failing Tests First)
- [ ] Write test: Search input is visible
- [ ] Write test: Typing filters courses by title
- [ ] Write test: Clear search button appears when searching
- [ ] Write test: "No results" state shows when no matches

### TDD Green Phase (Implementation)
- [ ] Add searchQuery state to CourseCatalog
- [ ] Add debounced search input field
- [ ] Implement search filter logic (title, subtitle, tags)
- [ ] Add search result count feedback
- [ ] Add clear search button
- [ ] Update empty state to handle search vs category

### TDD Refactor Phase (Quality Assurance)
- [ ] Run lint check: `npm run lint`
- [ ] Run build check: `npm run build`
- [ ] Verify search works with category filter
- [ ] Capture screenshots of search states

## Implementation Details

### Search Filter Logic
```typescript
// Filter by search query (title, subtitle, tags)
const searchFiltered = searchQuery.trim() === ""
  ? allCourses
  : allCourses.filter((course) => {
      const query = searchQuery.toLowerCase()
      return (
        course.title.toLowerCase().includes(query) ||
        course.subtitle.toLowerCase().includes(query) ||
        course.tags.some(tag => tag.toLowerCase().includes(query))
      )
    })
```

### Debounce Implementation
```typescript
// Debounce search input
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedQuery(searchQuery)
  }, 300)
  return () => clearTimeout(timer)
}, [searchQuery])
```

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/sections/course-catalog.tsx` | Add search input and filtering |

## Validation Checklist
- [ ] `npm run lint` passes with 0 errors
- [ ] `npm run build` succeeds
- [ ] Search input is visible
- [ ] Typing filters courses
- [ ] Clear button appears when searching
- [ ] "No results" state shows when no matches
- [ ] Search works with category filter

## Estimated Time: 1-2 hours
