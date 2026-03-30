# CLAUDE.md - iTrust Academy Project Briefing

> **Single Source of Truth for AI Coding Agents**
> 
> **Project**: iTrust Academy - Enterprise IT Training Platform
> **Tech Stack**: React 19 + TypeScript + Tailwind CSS v4 + Vite + Django REST API
> **Last Updated**: March 29, 2026

---

## 📋 Executive Summary

iTrust Academy is a **production-ready full-stack application** for enterprise IT training and certification. The platform integrates a React 19 frontend with a Django REST API backend, showcasing courses from 4 major vendors (SolarWinds, Securden, Quest, Ivanti) and serving IT professionals in the Asia-Pacific region.

**Key Characteristics:**
- ✅ TypeScript strict mode enabled
- ✅ Tailwind CSS v4 with CSS-first configuration
- ✅ Radix UI primitives for accessibility
- ✅ Framer Motion animations throughout
- ✅ Responsive design (mobile-first)
- ✅ **Full API integration with Django backend**
- ✅ **JWT authentication with token refresh**
- ✅ **Real-time data fetching with React Query**

---

## 🏗️ Architecture Overview

### Core Application Structure

```
App (app.tsx)
├── QueryProvider (React Query)
├── Header (Sticky navigation with mobile drawer)
├── Main Content
│   ├── Hero (Animated hero with CTA buttons)
│   ├── Stats (Trust indicators with counter stats)
│   ├── VendorCards (4 vendor showcase cards)
│   ├── CourseCatalog (API-integrated course grid)
│   ├── Features (6 feature cards with icons)
│   ├── TrainingSchedule (Calendar/scheduling)
│   ├── ProfessionalServices (Services grid)
│   ├── Testimonials (Customer testimonials)
│   └── CTA (Call-to-action section)
└── Footer (Enhanced footer with contact info)
```

### State Management
- **Server State**: React Query for API data
- **Auth State**: Zustand store with localStorage persistence
- **Local State**: React `useState` for component-level state
- **Filtering**: CourseCatalog uses `activeVendor` state for filtering

### Data Flow (Updated)
```
Backend API (Django REST)
    ↓
apiClient (Axios + JWT)
    ↓
React Query Hooks (useCourses, useCategories)
    ↓
Section Components (sections/*.tsx)
    ↓
Layout Components (layout/*.tsx)
    ↓
UI Components (ui/*.tsx)
    ↓
Render to DOM
```

---

## 📁 File Organization

### Critical Files - KNOW THESE

| File | Purpose | Key Info |
|------|---------|----------|
| `src/app/app.tsx` | Root component | All sections rendered here in order |
| `src/app/globals.css` | Global styles | Tailwind v4 theme tokens, CSS variables |
| `src/data/courses.ts` | Course data | 9 courses, VENDORS array, COURSE_CATEGORIES |
| `src/lib/constants.ts` | App constants | BRAND_NAME, NAV_ITEMS, FOOTER_LINKS, API_URL |
| `src/lib/utils.ts` | Utilities | `cn()` class merger, `formatPrice()`, `formatDate()` |

### Component Architecture

**Layout Components** (`src/components/layout/`)
- `Container.tsx` - Max-width wrapper with responsive padding
- `Section.tsx` - Section wrapper with background variants
- `Header.tsx` - Sticky header with mobile navigation
- `Footer.tsx` - Site footer with links and contact info

**Section Components** (`src/components/sections/`)
- `Hero.tsx` - Hero section with headline and CTAs
- `Stats.tsx` - Statistics section with counters
- `VendorCards.tsx` - Vendor showcase cards
- `CourseCatalog.tsx` - Course grid with filtering
- `Features.tsx` - Platform features
- `TrainingSchedule.tsx` - Training calendar
- `ProfessionalServices.tsx` - Services grid
- `Testimonials.tsx` - Customer testimonials
- `CTA.tsx` - Call-to-action section

**UI Components** (`src/components/ui/`)
- `Button.tsx` - Button component with variants
- `Card.tsx` - Card container
- `Badge.tsx` - Badge/label component
- `Input.tsx` - Form input
- `Separator.tsx` - Visual divider
- `variants.ts` - CVA variant definitions for buttons/badges

**Custom Components** (`src/components/`)
- `CourseCard.tsx` - Course listing card with hover effects
- `social-icons.tsx` - Custom SVG social icons

### Hooks
- `useReducedMotion.ts` - Detects `prefers-reduced-motion` preference

### Styles
- `globals.css` - Tailwind v4 theme configuration
- `animations.ts` - Framer Motion animation variants

---

## 🎨 Design System

### Color Tokens (CSS Variables in globals.css)

```css
:root {
  /* Brand Colors */
  --color-brand-500: #f27a1a;  /* Primary burnt orange */
  
  /* Background */
  --background: #ffffff;
  --background-secondary: #fafafa;
  
  /* Text */
  --foreground: #1a1a2e;  /* Dark charcoal */
  --foreground-secondary: #2d2d3a;
  --muted-foreground: #6b6b7b;
  
  /* Borders */
  --border: #e8e8ec;
  --card-border: #e8e8ec;
  
  /* Shadows */
  --shadow-brand: 0 4px 14px 0 rgb(242 122 26 / 0.39);
}
```

### Typography
- **Font Family**: DM Sans (sans), Space Mono (mono)
- **Headlines**: `text-4xl md:text-5xl lg:text-6xl font-bold`
- **Body**: `text-base text-muted-foreground`

### Spacing Scale
- Standard Tailwind spacing
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Section padding: `py-16 md:py-24 lg:py-32`

### Component Variants (CVA Pattern)

```typescript
// Button variants
- default: "bg-brand-500 text-white hover:bg-brand-600 shadow-md"
- outline: "border-2 border-brand-500 text-brand-600"
- ghost: "text-brand-600 hover:bg-brand-50"
- secondary: "bg-slate-100 text-slate-900"

// Badge variants
- default: "bg-brand-100 text-brand-700 border border-brand-200 rounded-full"
- outline: "border border-brand-500 text-brand-600"
```

---

## 🔧 Development Workflow

### Available Scripts
```bash
npm run dev      # Start Vite dev server (port 5174)
npm run build    # TypeScript check + production build
npm run lint     # ESLint with react-refresh rules
npm run preview  # Preview production build locally
```

### Build Process
1. TypeScript compilation (`tsc -b`)
2. Vite bundling to `dist/`
3. Output: `index.html`, `assets/`

### Code Quality
- **ESLint**: Configured with react-refresh plugin
- **TypeScript**: Strict mode enabled
- **No console errors** in production
- **Fast Refresh**: Only export components from component files

### File Import Patterns
```typescript
// Aliases configured in tsconfig.json
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { COURSES } from "@/data/courses"
```

---

## 🧪 Testing Approach

### Current Testing Status
- ✅ Linting passes (`npm run lint`)
- ✅ TypeScript compiles (`npm run build`)
- ✅ Production build generates successfully
- ✅ E2E tests pass (9 test cases)

### E2E Testing

**Test Plan**: See `E2E_TEST_PLAN.md` for comprehensive test cases.

| Category | Tests | Status |
|----------|-------|--------|
| Page Load & Rendering | 3 | ✅ Pass |
| Hero Section | 4 | ✅ Pass |
| Navigation | 3 | ✅ Pass |
| Course Catalog | 5 | ✅ Pass |
| Mobile Responsiveness | 3 | ✅ Pass |

**Screenshots**: Saved to `screenshots/e2e-*.png`

### Manual Testing Checklist
- [x] Hero section loads with animations
- [x] Mobile navigation drawer works
- [x] Course filtering functions correctly
- [x] All sections render without errors
- [x] Footer displays contact information
- [x] Buttons have hover states
- [x] Cards have hover lift effect

### UI Verification
- Screenshots saved to `/screenshots/` folder
- Test viewports: 1440px, 768px, 375px
- E2E test evidence: 9 screenshots captured

---

## 🚀 Deployment

### Production Build
```bash
npm run build
# Output: dist/ folder with index.html and assets/
```

### Deployment Targets
1. **Netlify**: Recommended - drag & drop `dist/` folder
2. **Vercel**: Connect GitHub repo for auto-deployment
3. **GitHub Pages**: Use `gh-pages` npm package

### Environment Variables
```env
VITE_API_URL=/api/v1
VITE_APP_ENV=development
```

### Vite Configuration
```typescript
server: {
  port: 5174,
  allowedHosts: ['itrust-academy.jesspete.shop', 'localhost', '127.0.0.1'],
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

---

## ⚠️ Known Issues & Considerations

### FIXED Issues
1. ✅ ESLint errors resolved (component exports, useReducedMotion hook)
2. ✅ TypeScript errors resolved (import.meta.env types, Lucide icons)
3. ✅ Orphaned files removed (App.tsx, App.css, index.css)
4. ✅ Logo duplication bug fixed (header & footer)
5. ✅ All CTA buttons wired with onClick handlers (11/11)
6. ✅ Header button text size increased (12px → 14px)
7. ✅ Accessibility labels added to decorative icons
8. ✅ Favicon 404 error fixed (vite.svg → favicon.svg)
9. ✅ 100% E2E test pass rate achieved (14/14)
10. ✅ Authentication UI implemented (13/13 auth tests passed)
11. ✅ ContactModal system implemented (3 modals for consultation/demo/sales)
12. ✅ ComingSoonModal implemented (graceful degradation for placeholder links)
13. ✅ Social links fixed (external navigation with security attributes)
14. ✅ Platform cards enhanced (event-based filtering)
15. ✅ Footer complete rewrite (modals & social links integrated)

### Current State
- All lint checks pass (0 errors)
- Build completes successfully (1.3 seconds)
- UI renders correctly across viewports
- Animations work with Framer Motion
- All CTAs are functional
- Logo renders correctly (no duplication)
- Favicon loads correctly (no 404 errors)
- Authentication UI fully functional
- **E2E Test Pass Rate: 100% (33/33 total)**
- **QA Validation Rate: 80% (12/15 elements)**
- ContactModal opens for 3 CTA types
- ComingSoonModal handles placeholder links
- Social links open in new tab with proper security
- Platform cards dispatch CustomEvent for filtering

### Authentication UI Components
```
src/components/
├── ui/
│   ├── dialog.tsx          # Radix UI dialog primitive
│   ├── label.tsx           # Form label component
│   ├── dropdown-menu.tsx   # Dropdown menu primitive
│   └── avatar.tsx          # Avatar component
├── forms/
│   ├── login-modal.tsx     # Login form with Zod validation
│   └── register-modal.tsx  # Register form with Zod validation
└── layout/
    ├── header.tsx          # Updated with auth state management
    └── user-nav.tsx        # Authenticated user dropdown
```

### E2E Testing Methodology
- **Tool**: Playwright (Python Sync API)
- **Target**: `vite preview` (port 5174) for API proxy support
- **Strategy**: UUID-based unique users for test isolation
- **Evidence**: Screenshots for every major state change

### E2E Testing Lessons Learned
1. **Proxy Fidelity**: Never assume a static build is "integrated" without an active proxy
2. **Timing is Everything**: Use `wait_until="networkidle"` and warm-up navigation calls
3. **UI Interception**: Component-level interception provides smoother UX for SPAs
4. **IPv6 Issues**: Use `127.0.0.1` instead of `localhost` for reliable automation

### Troubleshooting Tips
- **Server Stability**: Use `fuser -k 5174/tcp` to clear hung processes
- **Zod Errors**: Check `errors` object in `react-hook-form` if form won't submit
- **JWT Issues**: Check `itrust-auth` in localStorage for token presence
- **Static Server**: Use `vite preview` not `http.server` for API proxy support

### Scroll Utility Functions
```typescript
import { scrollToSection, scrollToTop } from "@/lib/utils"

// Scroll to section by ID
scrollToSection("courses")
scrollToSection("contact")

// Scroll to top
scrollToTop()
```

### Static Assets Note
- Favicon: `/favicon.svg` (in public/ folder)
- Vite copies files from `public/` to dist root
- Files in `src/assets/` are bundled, not copied to root

### Potential Improvements
- [ ] Add unit tests with Vitest
- [ ] Implement contact form functionality
- [ ] Add course detail pages
- [ ] Add loading skeletons for async operations
- [ ] Dark mode toggle

---

## 📚 Important Patterns

### Component Pattern (UI Components)
```typescript
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { default: "...", outline: "..." },
      size: { default: "...", sm: "...", lg: "..." }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
)

export interface ComponentProps extends VariantProps<typeof componentVariants> {
  // Additional props
}

export function Component({ variant, size, className }: ComponentProps) {
  return <div className={cn(componentVariants({ variant, size }), className)} />
}
```

### Section Pattern
```typescript
import { Section } from "@/components/layout/section"
import { Container } from "@/components/layout/container"
import { motion } from "framer-motion"

export function MySection() {
  return (
    <Section id="section-id" background="default">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Content */}
        </motion.div>
      </Container>
    </Section>
  )
}
```

### Animation Pattern
```typescript
import { motion } from "framer-motion"

// Entrance animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-50px" }}
  transition={{ duration: 0.5, delay: 0.1 }}
>
  Content
</motion.div>

// Staggered children
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={staggerContainer}
>
  {items.map((item, i) => (
    <motion.div key={i} variants={staggerItem}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

---

## 🔍 Debugging Tips

### Common Issues

**Build fails with TypeScript errors:**
- Check `tsconfig.json` includes all source files
- Verify no `any` types in strict mode
- Check import.meta.env usage

**Framer Motion animations not working:**
- Ensure `use client` directive for client components
- Check for `prefers-reduced-motion` preference
- Verify motion.div has proper initial/animate props

**Tailwind classes not applying:**
- Verify `globals.css` is imported in `main.tsx`
- Check className concatenation with `cn()` utility
- Ensure Tailwind v4 CSS-first config is correct

**ESLint errors:**
- Never export constants from component files (fast-refresh issue)
- Use `variants.ts` for shared CVA definitions
- Avoid setState in useEffect (use useSyncExternalStore instead)

---

## 📦 Dependencies

### Core
- react ^19.2.4
- react-dom ^19.2.4
- typescript ~5.9.3

### Build & Dev
- vite ^8.0.1
- @vitejs/plugin-react ^6.0.1
- eslint ^9.39.4

### Styling
- tailwindcss ^4.2.2
- @tailwindcss/vite ^4.2.2
- class-variance-authority ^0.7.1
- tailwind-merge ^3.5.0
- clsx ^2.1.1

### UI & Animation
- @radix-ui/react-* (various primitives)
- framer-motion ^12.38.0
- lucide-react ^1.7.0

### Forms & State
- react-hook-form ^7.72.0
- zod ^4.3.6
- @hookform/resolvers ^5.2.2
- zustand ^5.0.12

### Data
- @tanstack/react-query ^5.95.2
- axios ^1.14.0

---

## 📝 Conventions

### Naming
- **Components**: PascalCase (Hero.tsx, CourseCard.tsx)
- **Hooks**: camelCase with `use` prefix (useReducedMotion.ts)
- **Utils**: camelCase (formatPrice.ts)
- **Files**: kebab-case (course-catalog.tsx)

### Imports Order
1. React/Next
2. Third-party libraries
3. Absolute imports (@/)
4. Relative imports

### Comments
- Use `//` for single-line comments
- Use `/* */` for multi-line
- Add section dividers: `/* ═══════════════════ */`

---

## 🎯 Project Goals

### Completed ✅
- [x] Hero section with animations
- [x] Responsive navigation
- [x] Course catalog with filtering
- [x] Feature sections
- [x] Footer with contact info
- [x] All lint checks passing
- [x] Production build working

### In Progress 🔄
- [ ] Mobile menu interaction refinements
- [ ] Additional course detail pages

### Planned 📋
- [ ] Contact form functionality
- [ ] Backend API integration
- [ ] User authentication
- [ ] Course enrollment flow
- [ ] Admin dashboard

---

## 🆘 Getting Help

### Resources
- **README.md**: Complete project documentation
- **package.json**: Dependency versions and scripts
- **tsconfig.json**: TypeScript configuration
- **vite.config.ts**: Build configuration

### Troubleshooting
1. Run `npm install` to ensure dependencies
2. Run `npm run lint` to check for code issues
3. Run `npm run build` to verify TypeScript compilation
4. Check browser console for runtime errors
5. Verify animations with `useReducedMotion` hook

---

**Last Updated**: March 28, 2026  
**Maintained By**: iTrust Academy Development Team  
**Version**: 0.0.0

---

<div align="center">

**END OF BRIEFING DOCUMENT**

</div>
