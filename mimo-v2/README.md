# 🎓 iTrust Academy

> **Enterprise IT Training & Certification Platform**
> Expert-led, hands-on training across SolarWinds, Securden, Quest, and Ivanti platforms.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📋 Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [User Interaction Flow](#user-interaction-flow)
- [Application Logic Flow](#application-logic-flow)
- [Key Technologies](#key-technologies)
- [Backend API Integration](#-backend-api-integration)
- [Deployment](#deployment)
- [Development Guidelines](#development-guidelines)

---

## 🎯 About The Project

**iTrust Academy** is a modern, responsive web application designed for enterprise IT training and certification. Built with React 19 and Tailwind CSS v4, it delivers a premium user experience for IT professionals seeking training across leading technology platforms.

### 🌏 Target Audience
- IT professionals in the Asia-Pacific region
- Enterprise teams seeking vendor certifications
- System administrators and network engineers
- IT managers looking for team upskilling solutions

---

## 🔗 Backend API Integration

The frontend is currently transitioning from a static-first prototype to a fully dynamic platform integrated with the **AI Academy Backend API (v1.7.0)**.

### 📑 Integration Documentation
For deep technical details, refer to the following artifacts in the root directory:
*   [**API Integration Assessment Report**](./API_Integration_Assessment_Report.md): Analysis of connectivity gaps, authentication strategy, and data mapping requirements.
*   [**API Integration Remediation Plan**](./API_Integration_Remediation_Plan.md): Step-by-step strategic roadmap for implementing the infrastructure, authentication, and dynamic data layers.

### 🛠️ Planned Architecture
*   **API Client**: Axios instance with JWT interceptors.
*   **Server State**: `@tanstack/react-query` for caching and synchronization.
*   **Authentication**: Persistent JWT management via **Zustand**.
*   **Data Flow**: Transitioning `src/data/courses.ts` to dynamic fetching from `GET /api/v1/courses/`.

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

### Project Structure

```
mimo-v2/
├── 📁 src/
│   ├── 📁 app/
│   │   ├── app.tsx                 # Root application component
│   │   └── globals.css             # Global styles & Tailwind theme
│   │
│   ├── 📁 components/
│   │   ├── 📁 cards/
│   │   │   └── course-card.tsx     # Course listing card component
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
│   │   │   ├── course-catalog.tsx  # Course grid with filtering
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
│   ├── 📁 data/
│   │   └── courses.ts              # Course data & types
│   │
│   ├── 📁 hooks/
│   │   └── useReducedMotion.ts     # Accessibility hook for animations
│   │
│   ├── 📁 lib/
│   │   ├── constants.ts            # App constants & navigation
│   │   └── utils.ts                # Utility functions (cn, formatters)
│   │
│   ├── 📁 types/
│   │   └── vite-env.d.ts           # TypeScript declarations
│   │
│   ├── main.tsx                    # React entry point
│   └── index.css                   # Base CSS imports
│
├── 📁 public/                      # Static assets
├── 📁 dist/                        # Production build output
├── 📄 index.html                   # HTML entry point
├── 📄 vite.config.ts               # Vite configuration
├── 📄 tsconfig.json                # TypeScript configuration
├── 📄 package.json                 # Dependencies & scripts
└── 📄 README.md                    # This file
```

### Design Patterns

| Pattern | Implementation | Purpose |
|---------|---------------|---------|
| **Composition** | Radix UI + Custom | Reusable, accessible primitives |
| **Container/Presentational** | Layout/Section split | Separation of concerns |
| **Custom Hooks** | useReducedMotion | Reusable animation logic |
| **CVA (Class Variance Authority)** | variants.ts | Type-safe component variants |
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
| `dev` | `npm run dev` | Start Vite dev server (http://localhost:5173) |
| `build` | `npm run build` | TypeScript check + production build |
| `lint` | `npm run lint` | ESLint code linting |
| `preview` | `npm run preview` | Preview production build locally |

### Development Workflow

```bash
# 1. Start development server
npm run dev

# 2. Open browser to http://localhost:5173

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
