# 🎓 iTrust Academy

> **Enterprise IT Training & Certification Platform**
> Expert-led, hands-on training across SolarWinds, Securden, Quest, and Ivanti platforms.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev/)
[![Django REST](https://img.shields.io/badge/Django%20REST-3.16-092E20?logo=django)](https://www.django-rest-framework.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Full-Stack Integration](#-full-stack-integration)
- [E2E Testing](#-e2e-testing)
- [Getting Started](#getting-started)
- [Key Technologies](#key-technologies)
- [Deployment](#deployment)
- [Development Guidelines](#development-guidelines)

---

## 🎯 About The Project

**iTrust Academy** is a modern, full-stack web application designed for enterprise IT training and certification. Built with React 19 + Tailwind CSS v4 frontend and Django REST API backend, it delivers a premium user experience for IT professionals seeking training across leading technology platforms.

### 🌏 Target Audience
- IT professionals in the Asia-Pacific region
- Enterprise teams seeking vendor certifications
- System administrators and network engineers
- IT managers looking for team upskilling solutions

---

## 🔗 Full-Stack Integration

The application is **fully integrated** with a Django REST API backend.

### 🛠️ Integration Architecture

```
Frontend (React 19 + Vite)
    ↓
QueryClient (TanStack Query)
    ↓
apiClient (Axios + JWT)
    ↓
Django REST API (localhost:8000)
    ↓
PostgreSQL Database
```

### 📁 API Layer Structure

```
src/
├── services/api/
│   ├── client.ts          # Axios instance with JWT interceptors
│   ├── types.ts           # API response types
│   ├── transformers.ts    # snake_case → camelCase
│   ├── courses.ts         # Course API functions
│   ├── categories.ts      # Category API functions
│   └── auth.ts            # Auth API functions
├── store/
│   └── useAuthStore.ts    # Zustand JWT token management
├── hooks/
│   ├── useCourses.ts      # Course query hooks
│   ├── useCategories.ts   # Category query hooks
│   └── useAuth.ts         # Auth mutation hooks
└── providers/
    └── QueryProvider.tsx   # React Query configuration
```

### 🔐 Authentication

- **JWT Tokens**: 30-minute access, 7-day refresh
- **Token Persistence**: Zustand with localStorage
- **Auto-Refresh**: Automatic token refresh on 401
- **Secure Storage**: Tokens stored in `itrust-auth` localStorage key

### 📊 Data Flow

```typescript
// Fetch courses from API
const { data: coursesData, isLoading } = useCourses()

// Filter by category
const { data: filtered } = useCourses({ 
  categories__slug: 'security' 
})

// Get single course
const { data: course } = useCourse('solarwinds-npm')
```

### 📑 Integration Documentation

- [API Integration Assessment Report](./API_Integration_Assessment_Report.md)
- [API Integration Remediation Plan](./API_Integration_Remediation_Plan.md)
- [Frontend API Integration Plan](./FRONTEND_API_INTEGRATION_PLAN.md)
- [Backend Validation Report](./BACKEND_VALIDATION_REPORT.md)

---

## 🧪 E2E Testing

The application includes comprehensive E2E testing capabilities.

### Testing Tools

| Tool | Purpose | Status |
|------|---------|--------|
| **Playwright** | Automated testing & screenshots | ✅ Active |
| **agent-browser** | CLI-based browser automation | ✅ Available |
| **chrome-devtools-mcp** | Performance & debugging | ✅ Available |

### Test Coverage

| Category | Tests | Status |
|----------|-------|--------|
| Page Load & Rendering | 3 | ✅ Pass |
| Hero Section | 4 | ✅ Pass |
| Navigation | 3 | ✅ Pass |
| Course Catalog | 5 | ✅ Pass |
| Vendor Cards | 2 | ✅ Pass |
| Footer | 2 | ✅ Pass |
| Mobile Responsiveness | 3 | ✅ Pass |
| API Integration | 3 | ✅ Pass |

### Running E2E Tests

```bash
# View E2E test plan
cat E2E_TEST_PLAN.md

# Run tests with Playwright
python3 << 'EOF'
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("http://localhost:5174/")
    page.screenshot(path="screenshots/test.png")
    browser.close()
EOF
```

### Screenshots

E2E screenshots are saved to `screenshots/` folder:
- `e2e-01-homepage-full.png` - Full page desktop view
- `e2e-02-hero-section.png` - Hero section close-up
- `e2e-03-course-catalog.png` - Course catalog section
- `e2e-06-mobile-hero.png` - Mobile responsive view
- `e2e-09-tablet-view.png` - Tablet responsive view

---

## 🔍 QA Remediation

All critical QA findings have been resolved with **100% E2E test pass rate**.

### Issues Fixed

| Issue | Status | Details |
|-------|--------|---------|
| Logo duplication | ✅ Fixed | Changed icon from "i" to GraduationCap |
| Non-functional CTAs | ✅ Fixed | All 11 buttons now have onClick handlers |
| Small button text | ✅ Fixed | Header CTA increased from 12px to 14px |
| Missing accessibility | ✅ Fixed | Added aria-hidden to decorative icons |
| Favicon 404 error | ✅ Fixed | Changed from `/vite.svg` to `/favicon.svg` |

### CTA Functionality

| Button | Action |
|--------|--------|
| GET STARTED | Scrolls to courses |
| EXPLORE SCP FUNDAMENTALS | Scrolls to courses |
| VIEW ALL COURSES | Scrolls to courses |
| REQUEST CORPORATE DEMO | Scrolls to contact |
| CONTACT SALES | Scrolls to contact |
| SCHEDULE CONSULTATION | Scrolls to contact |
| ENROLL NOW | Scrolls to courses |
| VIEW FULL TRAINING CALENDAR | Scrolls to schedule |

### Utility Functions

```typescript
// Smooth scroll to section
scrollToSection("courses")

// Scroll to top
scrollToTop()
```

### E2E Test Results

| Category | Tests | Status |
|----------|-------|--------|
| Landing Page | 14 | ✅ 100% Pass |
| Authentication UI | 13 | ✅ 100% Pass |
| Registration & Course Flow | 6 | ✅ 100% Pass |
| **Total** | **33** | **✅ 100% Pass** |

### Comprehensive E2E Test Suite

| Test Case | Description | Status |
|-----------|-------------|--------|
| Initial Load | Page loads correctly | ✅ PASS |
| UI-101 | User Registration | ✅ PASS |
| Session | Logout functionality | ✅ PASS |
| UI-102 | User Login | ✅ PASS |
| UI-201/202 | Course Discovery & Filtering | ✅ PASS |
| UI-301 | Action Interception | ✅ PASS |

### Lessons Learned from E2E Journey

1. **Proxy Fidelity**: Always test against `vite preview` for API integration
2. **Timing**: Use `wait_until="networkidle"` for reliable automation
3. **UI Interception**: Component-level interception provides smoother UX

---

## 🔐 Authentication UI

The application now includes a complete authentication UI system.

### Components

| Component | File | Purpose |
|-----------|------|---------|
| Dialog | `src/components/ui/dialog.tsx` | Radix UI dialog primitive |
| LoginModal | `src/components/forms/login-modal.tsx` | Login form with validation |
| RegisterModal | `src/components/forms/register-modal.tsx` | Registration form |
| UserNav | `src/components/layout/user-nav.tsx` | Authenticated user dropdown |

### Features

- ✅ Login modal with email/password
- ✅ Register modal with 6 fields
- ✅ Form validation with Zod
- ✅ Toast notifications (Sonner)
- ✅ Auto-login after registration
- ✅ User profile dropdown
- ✅ Logout functionality
- ✅ Session persistence (Zustand + localStorage)

### Auth E2E Test Results

| Test | Status |
|------|--------|
| AUTH-01: Sign In button visible | ✅ PASS |
| AUTH-02: Register button visible | ✅ PASS |
| AUTH-03: Login modal opens | ✅ PASS |
| AUTH-04: Login form fields | ✅ PASS |
| AUTH-05: Register modal opens | ✅ PASS |
| AUTH-06: Register form fields | ✅ PASS |
| AUTH-07: Form validation | ✅ PASS |

**Total: 13/13 PASSED (100%)**

---

| Pass Rate | 100% |

---

## 🔧 QA Remediation - Phase 9

### Overview

Deep analysis and remediation of 15 non-functional UI elements identified in QA validation. Implemented optimal UX patterns following industry best practices.

### Issues Resolved

| ID | Element | Before | After | Status |
|----|---------|--------|-------|--------|
| CTA-01 | EXPLORE SCP FUNDAMENTALS | ❌ No action | ✅ Scrolls to courses | Fixed |
| CTA-02-05 | ENROLL NOW (×4) | ❌ "No visible action" | ✅ Triggers login modal | Fixed |
| CTA-06 | SCHEDULE CONSULTATION | ❌ No action | ✅ Opens ContactModal | Fixed |
| CTA-07 | REQUEST CORPORATE DEMO | ❌ No action | ✅ Opens ContactModal | Fixed |
| CTA-08 | CONTACT SALES | ❌ No action | ✅ Opens ContactModal | Fixed |
| PC-01-04 | Platform Cards (×4) | ❌ No navigation | ✅ Dispatches filter event | Fixed |
| SL-01-03 | Social Links (×3) | ❌ No external nav | ✅ target="_blank" + security | Fixed |

### New Components

| Component | File | Purpose |
|-----------|------|---------|
| **ContactModal** | `src/components/modals/contact-modal.tsx` | Contact form with 3 type variants |
| **ComingSoonModal** | `src/components/modals/coming-soon-modal.tsx` | Coming soon placeholder modal |

### UX Design Principles Applied

1. **Progressive Disclosure** - Platform cards filter courses directly
2. **Immediate Feedback** - Every click provides clear modal/toast response
3. **Contextual Actions** - ContactModal adapts title/fields by inquiry type
4. **Graceful Degradation** - Placeholder features show "Coming Soon" modal

---

## ✨ Features
- **Expert-Led Training**: Courses taught by certified instructors with real-world experience
- **Hands-On Labs**: Dedicated lab environments for practical learning
- **Certification Aligned**: Curriculum mapped to official vendor certification paths
- **Regional Focus**: Training delivered in English, Mandarin, and Bahasa Melayu
- **Flexible Learning**: Self-paced and instructor-led options available

---

## ✨ Features
- **Expert-Led Training**: Courses taught by certified instructors with real-world experience
- **Hands-On Labs**: Dedicated lab environments for practical learning
- **Certification Aligned**: Curriculum mapped to official vendor certification paths
- **Regional Focus**: Training delivered in English, Mandarin, and Bahasa Melayu
- **Flexible Learning**: Self-paced and instructor-led options available

---

## ✨ Features

### 🎨 UI/UX
- **Modern Design System**: Clean, professional aesthetic with burnt orange (#f27a1a) brand colors
- **Responsive Layout**: Mobile-first design optimized for all devices
- **Smooth Animations**: Framer Motion-powered entrance and scroll animations
- **Accessible Components**: WCAG AA compliant with Radix UI primitives
- **Dark Mode Ready**: Built-in support for light/dark theme switching

### 📚 Course Catalog
- **Interactive Filtering**: Filter courses by vendor (SolarWinds, Securden, Quest, Ivanti)
- **Course Cards**: Rich course information with pricing, ratings, duration
- **Featured Courses**: Highlighted training programs
- **Vendor Badges**: Visual color-coding for each technology partner

### 🧭 Navigation
- **Sticky Header**: Fixed navigation that adapts on scroll
- **Mobile Drawer**: Full-screen mobile navigation with smooth animations
- **Scroll Spy**: Automatic section highlighting
- **Keyboard Accessible**: Full keyboard navigation support

### 📱 Interactive Elements
- **Animated Buttons**: Hover effects with shadows and micro-interactions
- **Form Handling**: React Hook Form with Zod validation
- **Toast Notifications**: Sonner for user feedback
- **Loading States**: Skeleton screens and spinners

---

## 🏗️ Architecture Overview

### Project Structure (Updated)

```
mimo-v2/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── app.tsx                 # Root application component
│   │   └── globals.css             # Global styles & Tailwind theme
│   │
│   ├── 📁 components/
│   │   ├── 📁 cards/
│   │   │   └── course-card.tsx     # Course listing card (API-driven)
│   │   │
│   │   ├── 📁 icons/
│   │   │   └── social-icons.tsx    # Custom SVG social media icons
│   │   │
│   │   ├── 📁 layout/
│   │   │   ├── container.tsx       # Max-width wrapper component
│   │   │   ├── footer.tsx          # Site footer with links
│   │   │   ├── header.tsx          # Sticky navigation header
│   │   │   └── section.tsx         # Page section wrapper
│   │   │
│   │   ├── 📁 sections/
│   │   │   ├── hero.tsx            # Hero banner section
│   │   │   ├── stats.tsx           # Statistics/trust indicators
│   │   │   ├── vendor-cards.tsx    # Vendor showcase cards
│   │   │   ├── course-catalog.tsx  # Course grid (API-integrated)
│   │   │   ├── features.tsx        # Platform features
│   │   │   ├── training-schedule.tsx # Calendar/scheduling
│   │   │   ├── professional-services.tsx # Services section
│   │   │   ├── testimonials.tsx    # Customer testimonials
│   │   │   └── cta.tsx             # Call-to-action section
│   │   │
│   │   └── 📁 ui/
│   │       ├── button.tsx          # Reusable button component
│   │       ├── card.tsx            # Card container component
│   │       ├── badge.tsx           # Label/badge component
│   │       ├── input.tsx           # Form input component
│   │       ├── separator.tsx       # Visual divider
│   │       └── variants.ts         # Component variant definitions
│   │
│   ├── 📁 services/
│   │   └── 📁 api/
│   │       ├── client.ts           # Axios instance with JWT interceptors
│   │       ├── types.ts            # API response types
│   │       ├── transformers.ts     # snake_case → camelCase
│   │       ├── courses.ts          # Course API functions
│   │       ├── categories.ts       # Category API functions
│   │       └── auth.ts             # Auth API functions
│   │
│   ├── 📁 store/
│   │   └── useAuthStore.ts         # Zustand JWT token management
│   │
│   ├── 📁 hooks/
│   │   ├── useCourses.ts           # Course query hooks
│   │   ├── useCategories.ts        # Category query hooks
│   │   ├── useAuth.ts              # Auth mutation hooks
│   │   └── useReducedMotion.ts     # Accessibility hook
│   │
│   ├── 📁 providers/
│   │   └── QueryProvider.tsx       # React Query configuration
│   │
│   ├── 📁 data/
│   │   └── courses.ts              # Legacy static data (fallback)
│   │
│   ├── 📁 lib/
│   │   ├── constants.ts            # App constants & API_URL
│   │   └── utils.ts                # Utility functions
│   │
│   ├── 📁 types/
│   │   └── vite-env.d.ts           # TypeScript declarations
│   │
│   ├── main.tsx                    # React entry point (QueryProvider)
│   └── index.css                   # Base CSS imports
│
├── 📁 backend/                     # Django REST API
│   ├── 📁 api/                     # API endpoints & serializers
│   ├── 📁 courses/                 # Course models & logic
│   ├── 📁 users/                   # User authentication
│   └── manage.py                   # Django management
│
├── 📁 screenshots/                 # UI verification screenshots
├── 📄 docker-compose.yml           # PostgreSQL, Redis, MinIO
├── 📄 package.json                 # Frontend dependencies
└── 📄 README.md                    # This file
```

### Design Patterns

| Pattern | Implementation | Purpose |
|---------|---------------|---------|
| **API Client** | Axios + JWT interceptors | Centralized HTTP layer |
| **Server State** | React Query hooks | Data fetching & caching |
| **Auth State** | Zustand store | JWT token persistence |
| **Data Transform** | transformers.ts | Backend ↔ Frontend mapping |
| **CVA Variants** | variants.ts | Type-safe component variants |
| **CSS-first Theming** | globals.css | Tailwind v4 theme tokens |

---

## 🔄 User Interaction Flow

```mermaid
flowchart TB
    subgraph Landing["Landing Page"]
        A[Hero Section] --> B[Stats Section]
        B --> C[Vendor Cards]
    end
    
    subgraph Navigation["Navigation"]
        D[Sticky Header] --> E{Desktop/Mobile?}
        E -->|Desktop| F[Nav Links]
        E -->|Mobile| G[Menu Button]
        G --> H[Mobile Drawer]
    end
    
    subgraph Courses["Course Discovery"]
        I[Course Catalog] --> J[Vendor Filter]
        J --> K[Course Cards Grid]
        K --> L[Course Detail View]
    end
    
    subgraph Actions["User Actions"]
        M[CTA Buttons] --> N[Contact/Enroll]
        O[Footer Links] --> P[Legal Pages]
    end
    
    Landing --> Navigation
    Navigation --> Courses
    Courses --> Actions
```

### Interaction Flow Description

1. **Landing**: User arrives at hero section with clear value proposition
2. **Navigation**: Desktop users see horizontal nav; mobile users access drawer
3. **Discovery**: Users filter courses by vendor, view course details
4. **Conversion**: CTAs lead to contact forms or enrollment
5. **Footer**: Additional navigation to company info and resources

---

## ⚙️ Application Logic Flow

```mermaid
flowchart LR
    subgraph Data["Data Layer"]
        A[courses.ts] --> B[Course Type Definitions]
        A --> C[Vendor Data]
        D[constants.ts] --> E[Navigation Items]
    end
    
    subgraph Components["Component Layer"]
        F[Hero] --> G[Framer Motion Animations]
        H[CourseCatalog] --> I[Filter State]
        I --> J[CourseCard List]
    end
    
    subgraph UI["UI Layer"]
        K[Button] --> L[CVA Variants]
        M[Card] --> N[Tailwind Classes]
    end
    
    subgraph Hooks["Hooks Layer"]
        O[useReducedMotion] --> P[Media Query]
    end
    
    Data --> Components
    Components --> UI
    Hooks --> Components
```

### Logic Flow Description

1. **Data Layer**: Static course data in TypeScript with strict typing
2. **Component Layer**: React components consume data, manage state
3. **UI Layer**: Presentational components styled with Tailwind + CVA
4. **Hooks Layer**: Reusable logic for accessibility and animations

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.x or higher
- **npm** 9.x or higher (or yarn/pnpm)
- **Git** for version control

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/itrust-academy.git
cd itrust-academy

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Start Vite dev server (http://localhost:5174) |
| `build` | `npm run build` | TypeScript check + production build |
| `lint` | `npm run lint` | ESLint code linting |
| `preview` | `npm run preview` | Preview production build locally |

### Development Workflow

```bash
# 1. Start development server
npm run dev

# 2. Open browser to http://localhost:5174

# 3. Make changes - Hot Module Replacement (HMR) enabled

# 4. Before committing
npm run lint
npm run build
```

---

## 🛠️ Key Technologies

### Core Framework
- **[React 19](https://react.dev/)** - Latest React with improved performance
- **[TypeScript 5.9](https://www.typescriptlang.org/)** - Type-safe development
- **[Vite 8](https://vitejs.dev/)** - Fast development server and optimized builds

### Styling
- **[Tailwind CSS v4](https://tailwindcss.com/)** - CSS-first configuration with @theme
- **[class-variance-authority](https://cva.style/)** - Component variant management
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Class name merging

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Headless, accessible primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[Framer Motion](https://www.framer.com/motion/)** - Production-grade animations

### Form & State
- **[React Hook Form](https://react-hook-form.com/)** - Performant form handling
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Zustand](https://github.com/pmndrs/zustand)** - Minimal state management

### Data & API
- **[TanStack Query](https://tanstack.com/query)** - Server state management
- **[Axios](https://axios-http.com/)** - HTTP client for API calls

---

## 📦 Deployment

### Production Build

```bash
# Create optimized production build
npm run build

# Output will be in `dist/` folder
# - index.html
# - assets/index-[hash].js
# - assets/index-[hash].css
```

### Deployment Options

#### Option 1: Netlify (Recommended)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

**Configuration** (`netlify.toml`):
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### Option 2: Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**Configuration** (`vercel.json`):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Option 3: GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

### Environment Variables

Create `.env` file for local development:

```env
# API Configuration
VITE_API_URL=http://localhost:8000/api/v1

# Analytics (optional)
VITE_GA_TRACKING_ID=your-google-analytics-id
```

### Build Optimization Tips

1. **Code Splitting**: Vite automatically splits chunks
2. **Image Optimization**: Use WebP/AVIF formats in `/public`
3. **Tree Shaking**: Dead code elimination via Rollup
4. **Compression**: Enable gzip/brotli on your CDN

---

## 📖 Development Guidelines

### Code Organization

```
Components follow "Feature-based" structure:
- Reusable UI components in `components/ui/`
- Page sections in `components/sections/`
- Layout components in `components/layout/`
- Data models in `data/`
```

### Component Patterns

```typescript
// UI Component Pattern (with CVA)
import { cva } from "class-variance-authority"

const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: { default: "...", outline: "..." },
      size: { default: "...", sm: "...", lg: "..." }
    }
  }
)

// Section Component Pattern
export function HeroSection() {
  return (
    <Section id="hero">
      <Container>
        {/* Content */}
      </Container>
    </Section>
  )
}
```

### Styling Conventions

- Use Tailwind's utility-first approach
- Leverage CSS variables from `globals.css`
- Component-specific styles via `className` prop
- Responsive design with `sm:`, `md:`, `lg:` prefixes

### Accessibility Requirements

- Use semantic HTML (`<nav>`, `<main>`, `<section>`)
- Include ARIA labels for interactive elements
- Support keyboard navigation
- Test with screen readers
- Respect `prefers-reduced-motion`

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **[shadcn/ui](https://ui.shadcn.com/)** - Component patterns and inspiration
- **[Tailwind Labs](https://tailwindcss.com/)** - For the amazing CSS framework
- **[Vercel](https://vercel.com/)** - For hosting and deployment inspiration

---

<div align="center">

**[⬆ Back to Top](#-itrust-academy)**

Made with ❤️ by the iTrust Academy Team

</div>
