# iTrust Academy - Project Architecture Document

## Executive Summary

**iTrust Academy** is a professional B2B IT training and certification platform serving Asia. This document defines the complete system architecture, design philosophy, and technical implementation strategy for building a production-ready, full-stack application.

**Design Identity**: "Precision Corporate" - A clean, corporate aesthetic with burnt-orange (#F27A1A) accent, card-based layouts, and intentional whitespace creating trust and professionalism.

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Frontend Architecture](#2-frontend-architecture)
3. [Backend Architecture](#3-backend-architecture)
4. [Database Design](#4-database-design)
5. [Design System & Tokens](#5-design-system--tokens)
6. [API Architecture](#6-api-architecture)
7. [Security Architecture](#7-security-architecture)
8. [Performance Strategy](#8-performance-strategy)
9. [Deployment Architecture](#9-deployment-architecture)
10. [Testing Strategy](#10-testing-strategy)

---

## 1. System Overview

### 1.1 Architecture Pattern: Strictly Decoupled Client-Server

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                        React 19 SPA (Vite)                          │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  ┌───────────┐ │   │
│  │  │   Pages     │  │  Components  │  │    Hooks      │  │  Services │ │   │
│  │  │  (Routes)   │  │  (UI/Section)│  │  (Data/Form)  │  │   (API)   │ │   │
│  │  └─────────────┘  └──────────────┘  └───────────────┘  └───────────┘ │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │ HTTPS/JSON
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              API LAYER                                       │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                   Django REST Framework                              │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  ┌───────────┐ │   │
│  │  │    Views    │  │ Serializers  │  │   Middleware  │  │  Models   │ │   │
│  │  │  (ViewSets) │  │    (DRF)     │  │ (Auth/Logging)│  │  (Models) │ │   │
│  │  └─────────────┘  └──────────────┘  └───────────────┘  └───────────┘ │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    ▼                   ▼                   ▼
            ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
            │  PostgreSQL  │   │    Redis     │   │    Stripe    │
            │   (Primary)  │   │   (Cache)    │   │  (Payments)  │
            └──────────────┘   └──────────────┘   └──────────────┘
```

### 1.2 Technology Stack Matrix

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Frontend Framework** | React | 19.2.0 | UI Library with Concurrent Features |
| **Build Tool** | Vite | 7.3.0 | Development server & production builds |
| **Styling Engine** | Tailwind CSS | 4.1.18+ | CSS-first utility framework |
| **UI Components** | Shadcn UI + Radix | Latest | Accessible primitives |
| **Animation** | Framer Motion | 12.35.0+ | Declarative animations |
| **State Management** | Zustand | 5.0.12 | Client state |
| **Server State** | TanStack Query | 5.91.3 | Data fetching & caching |
| **Forms** | React Hook Form + Zod | Latest | Form management & validation |
| **Backend Framework** | Django | 6.0.3 | Python web framework |
| **API Framework** | Django REST Framework | 3.16.1 | REST API implementation |
| **Authentication** | SimpleJWT | Latest | JWT token-based auth |
| **Database** | PostgreSQL | 16+ | Primary data store |
| **Cache** | Redis | 5.2.1+ | Session & query caching |
| **Payments** | Stripe | 14.4.1 | Payment processing |
| **Task Queue** | Celery | 5.6.2 | Background tasks |

### 1.3 Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Frontend Architecture** | SPA with Vite | Faster builds, modern ESM support, HMR |
| **Styling Approach** | Tailwind v4 CSS-first | Zero-JS runtime, Lightning CSS compiler |
| **Component Library** | Shadcn/Radix primitives | Accessibility-first, fully customizable |
| **State Pattern** | Zustand + TanStack Query | Separation of client/server state |
| **Backend Pattern** | DRF ViewSets | Consistent CRUD patterns, automatic routing |
| **API Design** | REST with standardized envelope | Predictable responses, easy debugging |
| **Authentication** | JWT (SimpleJWT) | Stateless, scalable, mobile-friendly |
| **Database** | PostgreSQL + Redis | ACID compliance + high-performance caching |
| **Payment Provider** | Stripe | Industry standard, comprehensive APIs |

---

## 2. Frontend Architecture

### 2.1 Directory Structure

```
frontend/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   ├── fonts/
│   │   └── icons/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Root component with providers
│   │   ├── routes.tsx                 # Route configuration
│   │   ├── layout.tsx                 # Root layout
│   │   └── globals.css                # Tailwind v4 entry + theme
│   │
│   ├── components/
│   │   ├── ui/                        # Shadcn UI primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── input.tsx
│   │   │   ├── sheet.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/                    # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── DesktopNav.tsx
│   │   │
│   │   ├── sections/                  # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── VendorCards.tsx
│   │   │   ├── FeaturesGrid.tsx
│   │   │   ├── FeaturedCourse.tsx
│   │   │   ├── TrainingSchedule.tsx
│   │   │   └── ProfessionalServices.tsx
│   │   │
│   │   ├── forms/                     # Form components
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── EnrollmentForm.tsx
│   │   │
│   │   └── payment/                   # Payment components
│   │       ├── PaymentForm.tsx
│   │       └── StripeProvider.tsx
│   │
│   ├── pages/                         # Route pages
│   │   ├── Home.tsx
│   │   ├── CoursesPage.tsx
│   │   ├── CourseDetailPage.tsx
│   │   ├── SchedulePage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── EnrollmentPage.tsx
│   │
│   ├── hooks/                         # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useCourses.ts
│   │   ├── useEnrollments.ts
│   │   ├── usePayment.ts
│   │   ├── useScrollSpy.ts
│   │   ├── useReducedMotion.ts
│   │   └── useDebounce.ts
│   │
│   ├── services/
│   │   ├── api/
│   │   │   ├── client.ts              # Axios instance
│   │   │   ├── auth.ts
│   │   │   ├── courses.ts
│   │   │   ├── enrollments.ts
│   │   │   ├── payments.ts
│   │   │   └── search.ts
│   │   └── queryClient.ts             # TanStack Query config
│   │
│   ├── store/                         # Zustand stores
│   │   ├── authStore.ts
│   │   ├── uiStore.ts
│   │   └── searchStore.ts
│   │
│   ├── types/                         # TypeScript types
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── course.ts
│   │   ├── payment.ts
│   │   └── user.ts
│   │
│   ├── lib/                           # Utilities
│   │   ├── utils.ts                   # cn(), formatters
│   │   └── constants.ts
│   │
│   ├── styles/
│   │   └── animations.ts              # Framer Motion variants
│   │
│   └── main.tsx                       # Entry point
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts                 # v4 uses CSS, but kept for IDE
└── package.json
```

### 2.2 Tailwind CSS v4 Configuration

**Critical**: No `tailwind.config.js` file. Tailwind v4 uses CSS-first configuration.

```css
/* src/app/globals.css */
@import "tailwindcss";

/* ============================================
   THEME CONFIGURATION - iTrust Academy
   Brand: Burnt Orange #F27A1A
   ============================================ */

@theme {
  /* Brand Colors */
  --color-brand-orange: #F27A1A;
  --color-brand-orange-light: rgba(242, 122, 26, 0.08);
  --color-brand-orange-border: rgba(242, 122, 26, 0.25);
  --color-brand-orange-hover: #E06D12;
  
  /* Vendor Colors */
  --color-vendor-solarwinds: #F27A1A;
  --color-vendor-securden: #2BBCB3;
  --color-vendor-quest: #3B82F6;
  --color-vendor-ivanti: #7C3AED;
  
  /* Semantic Colors */
  --color-success: #059669;
  --color-success-bg: #ECFDF5;
  --color-success-border: #A7F3D0;
  
  /* Surfaces */
  --color-bg-white: #FFFFFF;
  --color-bg-gray: #F8F9FA;
  --color-border-default: #E5E7EB;
  --color-border-strong: #374151;
  
  /* Text Colors */
  --color-text-dark: #111827;
  --color-text-secondary: #6B7280;
  --color-text-muted: #9CA3AF;
  --color-text-white: #FFFFFF;
  
  /* Footer */
  --color-footer-bg: #1F2937;
  --color-footer-text: #D1D5DB;
  
  /* Typography */
  --font-sans: "DM Sans", system-ui, sans-serif;
  --font-mono: "Space Mono", "JetBrains Mono", monospace;
  
  /* Spacing Scale Extensions */
  --spacing-18: 4.5rem;
  --spacing-88: 22rem;
  --spacing-section: 6rem;
  
  /* Border Radius */
  --radius-card: 14px;
  --radius-button: 10px;
  --radius-badge: 4px;
  --radius-sharp: 0px;
  
  /* Custom Animations */
  --animate-slide-up: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  --animate-fade-in: fade-in 0.3s ease-out;
  --animate-scale-in: scale-in 0.2s ease-out;
  
  @keyframes slide-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scale-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
}

/* ============================================
   BASE STYLES
   ============================================ */

@layer base {
  * {
    @apply border-border-default;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply bg-bg-white text-text-dark font-sans antialiased;
    font-feature-settings: "cv02", "cv03", "cv04", "cv11";
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-sans font-semibold tracking-tight;
  }
}

/* ============================================
   CUSTOM UTILITIES
   ============================================ */

@utility card-base {
  background-color: var(--color-bg-white);
  border-radius: var(--radius-card);
  border: 1px solid var(--color-border-default);
  padding: 28px;
}

@utility card-accent-top {
  border-top-width: 3px;
  border-top-color: var(--color-brand-orange);
}

@utility section-padding {
  padding-top: var(--spacing-section);
  padding-bottom: var(--spacing-section);
}

@utility container-center {
  margin-inline: auto;
  padding-inline: 1rem;
  max-width: 1200px;
}

@utility text-balance {
  text-wrap: balance;
}

@utility btn-primary {
  background-color: var(--color-brand-orange);
  color: var(--color-text-white);
  border-radius: var(--radius-button);
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

@utility btn-primary:hover {
  background-color: var(--color-brand-orange-hover);
}

@utility btn-secondary {
  background-color: var(--color-bg-white);
  color: var(--color-text-dark);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-button);
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: background-color 0.2s ease;
}

@utility btn-secondary:hover {
  background-color: var(--color-bg-gray);
}
```

### 2.3 Component Architecture Patterns

#### 2.3.1 Shadcn UI Primitive Pattern

```typescript
// src/components/ui/button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "btn-primary",
        secondary: "btn-secondary",
        ghost: "hover:bg-bg-gray",
        link: "text-brand-orange underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={props.disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
```

#### 2.3.2 Section Component Pattern

```typescript
// src/components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Button } from "@/components/ui/button";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="container-center">
        <motion.div
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate="visible"
          variants={containerVariants}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Enrollment Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center rounded-full bg-brand-orange-light px-4 py-1.5 text-sm font-medium text-brand-orange">
              NOW ENROLLING — Q2 2026
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="mt-8 text-4xl font-bold tracking-tight text-text-dark sm:text-5xl lg:text-6xl"
          >
            Advance Your IT Career.
            <br />
            <span className="text-brand-orange">Get Certified.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg leading-8 text-text-secondary"
          >
            iTrust Academy delivers expert-led, hands-on training across SolarWinds, 
            Securden, Quest, and Ivanti — equipping IT professionals across Asia with 
            the skills and certifications employers demand.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg">Explore SCP Fundamentals →</Button>
            <Button variant="secondary" size="lg">View All Courses</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

### 2.4 Data Flow Architecture

```
User Action → Component → Hook → Service → API → Backend
     ↑                                             ↓
     └────────── State Update ←────────────────────┘
```

**Data Flow Pattern**:
1. **User Action**: Click, submit, scroll
2. **Component**: UI layer captures event
3. **Hook**: `useMutation` (TanStack Query) or `useAction`
4. **Service**: API client method with error handling
5. **API**: HTTP request to Django REST Framework
6. **Backend**: Business logic, database operations
7. **State Update**: Cache invalidation, UI refresh

---

## 3. Backend Architecture

### 3.1 Django Application Structure

```
backend/
├── academy/                           # Project settings
│   ├── __init__.py
│   ├── settings/
│   │   ├── __init__.py
│   │   ├── base.py                    # Base configuration
│   │   ├── development.py
│   │   ├── production.py
│   │   └── test.py
│   ├── urls.py                        # Root URL configuration
│   ├── wsgi.py
│   └── asgi.py
│
├── apps/                              # Django applications
│   ├── __init__.py
│   │
│   ├── users/                         # User management
│   │   ├── __init__.py
│   │   ├── models.py                  # Custom User model
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   └── tests/
│   │       └── test_users.py
│   │
│   ├── courses/                       # Course & training
│   │   ├── __init__.py
│   │   ├── models.py                  # Course, Category, Cohort
│   │   ├── managers.py                # Custom QuerySets (soft delete)
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   ├── admin.py
│   │   ├── signals.py                 # Cache invalidation
│   │   └── tests/
│   │       ├── test_courses.py
│   │       ├── test_cohorts.py
│   │       └── test_soft_delete.py
│   │
│   ├── enrollments/                   # Enrollment management
│   │   ├── __init__.py
│   │   ├── models.py                  # Enrollment model
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── tests/
│   │       └── test_enrollments.py
│   │
│   └── payments/                      # Payment processing
│       ├── __init__.py
│       ├── models.py
│       ├── services.py                # Stripe integration
│       ├── views.py
│       ├── urls.py
│       └── tests/
│           └── test_payments.py
│
├── api/                               # DRF API layer
│   ├── __init__.py
│   ├── pagination.py                  # Custom pagination
│   ├── permissions.py                 # Custom permissions
│   ├── serializers.py                 # Base serializers
│   ├── exceptions.py                  # Custom exceptions
│   ├── middleware/                    # Custom middleware
│   │   ├── __init__.py
│   │   ├── request_id.py              # Request ID generation
│   │   ├── logging.py                 # API request logging
│   │   └── response_format.py         # Standardized responses
│   └── utils/
│       ├── __init__.py
│       └── response.py                  # Response helpers
│
├── common/                            # Shared utilities
│   ├── __init__.py
│   ├── models.py                      # Abstract base models
│   └── validators.py
│
├── logs/                              # Application logs
│
├── manage.py
├── requirements/
│   ├── base.txt
│   ├── development.txt
│   └── production.txt
└── pytest.ini
```

### 3.2 Model Architecture

#### 3.2.1 Abstract Base Model (Soft Delete)

```python
# common/models.py
import uuid
from django.db import models
from django.utils import timezone


class SoftDeleteManager(models.Manager):
    """Manager that filters out soft-deleted objects by default."""
    
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)
    
    def all_objects(self):
        """Return all objects including deleted."""
        return super().get_queryset()
    
    def only_deleted(self):
        """Return only soft-deleted objects."""
        return super().get_queryset().filter(is_deleted=True)


class SoftDeleteModel(models.Model):
    """Abstract base model with soft delete functionality."""
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    is_deleted = models.BooleanField(default=False, db_index=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    objects = SoftDeleteManager()
    
    class Meta:
        abstract = True
        ordering = ['-created_at']
    
    def delete(self, using=None, keep_parents=False):
        """Soft delete - sets is_deleted flag instead of removing."""
        self.is_deleted = True
        self.deleted_at = timezone.now()
        self.save(update_fields=['is_deleted', 'deleted_at'])
    
    def hard_delete(self, using=None, keep_parents=False):
        """Permanent delete - removes from database."""
        super().delete(using=using, keep_parents=keep_parents)
    
    def restore(self):
        """Restore a soft-deleted object."""
        self.is_deleted = False
        self.deleted_at = None
        self.save(update_fields=['is_deleted', 'deleted_at'])


class TimestampModel(models.Model):
    """Abstract model with timestamp fields only."""
    
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True
        ordering = ['-created_at']
```

#### 3.2.2 User Model

```python
# apps/users/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models
from common.models import TimestampModel


class User(AbstractUser, TimestampModel):
    """Custom User model with profile fields."""
    
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    company = models.CharField(max_length=100, blank=True)
    title = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    is_instructor = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"
```

#### 3.2.3 Course Model

```python
# apps/courses/models.py
from django.db import models
from django.utils.text import slugify
from common.models import SoftDeleteModel


class Category(SoftDeleteModel):
    """Course category with color coding."""
    
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    color = models.CharField(max_length=7, default="#F27A1A")
    icon = models.CharField(max_length=50, blank=True)
    sort_order = models.PositiveIntegerField(default=0)
    
    class Meta:
        db_table = 'categories'
        ordering = ['sort_order', 'name']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Course(SoftDeleteModel):
    """Training course with full details."""
    
    LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]
    
    VENDOR_CHOICES = [
        ('solarwinds', 'SolarWinds'),
        ('securden', 'Securden'),
        ('quest', 'Quest'),
        ('ivanti', 'Ivanti'),
    ]
    
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)
    description = models.TextField()
    short_description = models.TextField(blank=True)
    
    vendor = models.CharField(max_length=20, choices=VENDOR_CHOICES)
    categories = models.ManyToManyField(Category, related_name='courses', blank=True)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='beginner')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    
    # Media
    thumbnail = models.ImageField(upload_to='courses/thumbnails/', blank=True, null=True)
    thumbnail_alt = models.CharField(max_length=200, blank=True)
    
    # Duration & Structure
    duration_weeks = models.PositiveIntegerField(default=1)
    duration_hours = models.PositiveIntegerField(default=8)
    modules_count = models.PositiveIntegerField(default=1)
    
    # Pricing
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=3, default='USD')
    
    # Stats
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)
    review_count = models.PositiveIntegerField(default=0)
    enrolled_count = models.PositiveIntegerField(default=0)
    
    # Features
    is_featured = models.BooleanField(default=False)
    includes_certification = models.BooleanField(default=True)
    includes_labs = models.BooleanField(default=True)
    
    # SEO
    meta_title = models.CharField(max_length=200, blank=True)
    meta_description = models.TextField(blank=True)
    
    class Meta:
        db_table = 'courses'
        ordering = ['-is_featured', '-created_at']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    @property
    def discount_percentage(self):
        """Calculate discount percentage."""
        if self.original_price and self.original_price > self.price:
            return round((1 - self.price / self.original_price) * 100)
        return 0


class CourseModule(models.Model):
    """Individual course module."""
    
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='modules')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    duration_hours = models.PositiveIntegerField(default=1)
    exam_domain = models.CharField(max_length=100, blank=True)
    topics = models.JSONField(default=list)
    
    class Meta:
        db_table = 'course_modules'
        ordering = ['order']
    
    def __str__(self):
        return f"{self.course.title} - {self.title}"


class Cohort(SoftDeleteModel):
    """Training cohort/instance of a course."""
    
    FORMAT_CHOICES = [
        ('online', 'Online'),
        ('in_person', 'In Person'),
        ('hybrid', 'Hybrid'),
    ]
    
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('enrolling', 'Enrolling'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='cohorts')
    instructor = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, related_name='cohorts')
    
    # Schedule
    start_date = models.DateField()
    end_date = models.DateField()
    timezone = models.CharField(max_length=50, default='Asia/Singapore')
    
    # Location
    format = models.CharField(max_length=20, choices=FORMAT_CHOICES)
    location = models.CharField(max_length=200, blank=True)
    meeting_link = models.URLField(blank=True)
    
    # Capacity
    spots_total = models.PositiveIntegerField(default=20)
    spots_reserved = models.PositiveIntegerField(default=0)
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    
    # Pricing
    early_bird_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    early_bird_deadline = models.DateField(null=True, blank=True)
    
    class Meta:
        db_table = 'cohorts'
        ordering = ['start_date']
    
    def __str__(self):
        return f"{self.course.title} - {self.start_date}"
    
    @property
    def spots_remaining(self):
        """Calculate remaining spots."""
        return self.spots_total - self.spots_reserved
    
    @property
    def availability_status(self):
        """Determine availability status."""
        if self.spots_remaining <= 0:
            return 'waitlist'
        elif self.spots_remaining <= 3:
            return 'limited'
        return 'available'
```

### 3.3 API Layer Architecture

#### 3.3.1 Response Standardization

```python
# api/middleware/response_format.py
import uuid
from django.utils import timezone


class ResponseFormatterMiddleware:
    """Middleware to standardize all API responses."""
    
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        request.start_time = timezone.now()
        request.request_id = str(uuid.uuid4())
        
        response = self.get_response(request)
        
        # Only process JSON responses from DRF
        if self._is_api_response(response):
            response = self._format_response(response, request)
        
        return response
    
    def _is_api_response(self, response):
        """Check if this is a DRF JSON response."""
        content_type = response.get('Content-Type', '')
        return 'application/json' in content_type
    
    def _format_response(self, response, request):
        """Wrap response in standard envelope."""
        import json
        
        try:
            data = json.loads(response.content)
        except (json.JSONDecodeError, AttributeError):
            return response
        
        # Skip if already formatted
        if 'success' in data and 'data' in data:
            return response
        
        # Calculate duration
        duration = getattr(request, 'start_time', None)
        duration_ms = None
        if duration:
            duration_ms = round((timezone.now() - duration).total_seconds() * 1000, 2)
        
        formatted = {
            'success': response.status_code < 400,
            'data': data if response.status_code < 400 else None,
            'message': self._get_message(response.status_code, data),
            'errors': data if response.status_code >= 400 else {},
            'meta': {
                'timestamp': timezone.now().isoformat(),
                'request_id': getattr(request, 'request_id', str(uuid.uuid4())),
                'duration_ms': duration_ms,
            }
        }
        
        response.content = json.dumps(formatted).encode()
        return response
    
    def _get_message(self, status_code, data):
        """Get appropriate message for status code."""
        if status_code < 300:
            return 'Request successful'
        elif status_code == 400:
            return 'Validation failed'
        elif status_code == 401:
            return 'Authentication required'
        elif status_code == 403:
            return 'Permission denied'
        elif status_code == 404:
            return 'Resource not found'
        elif status_code >= 500:
            return 'Internal server error'
        return 'Unknown status'
```

#### 3.3.2 Custom Exception Handler

```python
# api/exceptions.py
from rest_framework.views import exception_handler
from rest_framework.response import Response
from django.utils import timezone
import uuid


def standardized_exception_handler(exc, context):
    """Custom exception handler with standardized format."""
    
    response = exception_handler(exc, context)
    
    if response is not None:
        request = context.get('request')
        
        # Extract error details
        errors = response.data
        
        formatted = {
            'success': False,
            'data': None,
            'message': _get_error_message(errors),
            'errors': errors,
            'meta': {
                'timestamp': timezone.now().isoformat(),
                'request_id': getattr(request, 'request_id', str(uuid.uuid4())),
                'error_code': _get_error_code(response.status_code),
            }
        }
        
        response.data = formatted
    
    return response


def _get_error_message(errors):
    """Extract human-readable error message."""
    if isinstance(errors, dict):
        if 'detail' in errors:
            return errors['detail']
        if 'non_field_errors' in errors:
            return errors['non_field_errors'][0]
        return 'Validation failed - please check your input'
    return str(errors)


def _get_error_code(status_code):
    """Map status code to error code."""
    codes = {
        400: 'VALIDATION_ERROR',
        401: 'AUTHENTICATION_ERROR',
        403: 'PERMISSION_DENIED',
        404: 'NOT_FOUND',
        429: 'RATE_LIMIT_EXCEEDED',
        500: 'INTERNAL_ERROR',
    }
    return codes.get(status_code, 'UNKNOWN_ERROR')
```

#### 3.3.3 ViewSet Pattern

```python
# apps/courses/views.py
from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.core.cache import cache
from .models import Course, Category, Cohort
from .serializers import (
    CourseListSerializer,
    CourseDetailSerializer,
    CategorySerializer,
    CohortSerializer,
)


class CourseViewSet(viewsets.ModelViewSet):
    """Course API with filtering, search, and caching."""
    
    queryset = Course.objects.filter(status='published')
    lookup_field = 'slug'
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['level', 'vendor', 'categories__slug', 'is_featured']
    search_fields = ['title', 'subtitle', 'description']
    ordering_fields = ['price', 'rating', 'created_at', 'enrolled_count']
    ordering = ['-is_featured', '-created_at']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action == 'list':
            return CourseListSerializer
        return CourseDetailSerializer
    
    def get_queryset(self):
        """Optimize queries with prefetch_related."""
        queryset = super().get_queryset()
        return queryset.prefetch_related('categories', 'modules')
    
    def list(self, request, *args, **kwargs):
        """Cached list endpoint."""
        # Build cache key from query params
        cache_key = self._build_cache_key(request.query_params)
        cached = cache.get(cache_key)
        
        if cached:
            return Response(cached)
        
        response = super().list(request, *args, **kwargs)
        cache.set(cache_key, response.data, 300)  # 5 minutes
        
        return response
    
    def retrieve(self, request, *args, **kwargs):
        """Cached detail endpoint."""
        slug = kwargs.get('slug')
        cache_key = f'course:detail:{slug}'
        cached = cache.get(cache_key)
        
        if cached:
            return Response(cached)
        
        response = super().retrieve(request, *args, **kwargs)
        cache.set(cache_key, response.data, 3600)  # 1 hour
        
        return response
    
    @action(detail=True, methods=['get'])
    def cohorts(self, request, slug=None):
        """Get cohorts for a specific course."""
        course = self.get_object()
        cohorts = Cohort.objects.filter(
            course=course,
            status__in=['upcoming', 'enrolling'],
            is_deleted=False
        ).select_related('instructor').order_by('start_date')
        
        serializer = CohortSerializer(cohorts, many=True)
        return Response({
            'success': True,
            'data': serializer.data,
            'message': 'Cohorts retrieved successfully'
        })
    
    def _build_cache_key(self, query_params):
        """Build cache key from query parameters."""
        params_str = '&'.join(f"{k}={v}" for k, v in sorted(query_params.items()))
        return f"course:list:{params_str}"


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """Category API with caching."""
    
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    
    def list(self, request, *args, **kwargs):
        """Cached category list."""
        cached = cache.get('category:list')
        
        if cached:
            return Response(cached)
        
        response = super().list(request, *args, **kwargs)
        cache.set('category:list', response.data, 1800)  # 30 minutes
        
        return response
```

---

## 4. Database Design

### 4.1 Entity Relationship Diagram

```
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│      User        │     │   Enrollment     │     │     Cohort       │
├──────────────────┤     ├──────────────────┤     ├──────────────────┤
│ id (PK)          │────<│ id (PK)          │>────│ id (PK)          │
│ email (unique)   │     │ user_id (FK)     │     │ course_id (FK)   │
│ username         │     │ course_id (FK)   │     │ instructor_id(FK)│
│ first_name       │     │ cohort_id (FK)   │     │ start_date       │
│ last_name        │     │ status           │     │ end_date         │
│ is_instructor    │     │ amount_paid      │     │ format           │
│ ...              │     │ stripe_payment_id│     │ location         │
└──────────────────┘     │ ...              │     │ spots_total      │
                         └──────────────────┘     │ spots_reserved   │
                                                   │ ...              │
                                                   └──────────────────┘
                                                            │
                                                            │
                                                            ▼
                                                   ┌──────────────────┐
                                                   │     Course       │
                                                   ├──────────────────┤
                                                   │ id (PK)          │
                                                   │ slug (unique)    │
                                                   │ title            │
                                                   │ vendor           │
                                                   │ level            │
                                                   │ price            │
                                                   │ is_featured      │
                                                   │ ...              │
                                                   └──────────────────┘
                                                            │
                                                            │
                                                            ▼
                                                   ┌──────────────────┐
                                                   │    Category      │
                                                   ├──────────────────┤
                                                   │ id (PK)          │
                                                   │ name             │
                                                   │ slug             │
                                                   │ color            │
                                                   │ ...              │
                                                   └──────────────────┘
                                                            ▲
                                                            │
                                                   ┌──────────────────┐
                                                   │  course_categories│
                                                   │ (M:N junction)   │
                                                   └──────────────────┘
```

### 4.2 Database Indexes

```sql
-- User indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_instructor ON users(is_instructor);

-- Course indexes
CREATE INDEX idx_courses_slug ON courses(slug);
CREATE INDEX idx_courses_status ON courses(status);
CREATE INDEX idx_courses_vendor ON courses(vendor);
CREATE INDEX idx_courses_level ON courses(level);
CREATE INDEX idx_courses_featured ON courses(is_featured) WHERE is_featured = true;

-- Cohort indexes
CREATE INDEX idx_cohorts_dates ON cohorts(start_date, end_date);
CREATE INDEX idx_cohorts_status ON cohorts(status);
CREATE INDEX idx_cohorts_course ON cohorts(course_id);

-- Enrollment indexes
CREATE INDEX idx_enrollments_user ON enrollments(user_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_enrollments_status ON enrollments(status);

-- Soft delete indexes (applies to all soft-delete models)
CREATE INDEX idx_courses_deleted ON courses(is_deleted) WHERE is_deleted = false;
CREATE INDEX idx_cohorts_deleted ON cohorts(is_deleted) WHERE is_deleted = false;
```

---

## 5. Design System & Tokens

### 5.1 Color Tokens

```css
/* Brand Colors */
--color-brand-orange: #F27A1A;           /* Primary CTA, accent */
--color-brand-orange-light: rgba(242, 122, 26, 0.08);  /* Badge backgrounds */
--color-brand-orange-border: rgba(242, 122, 26, 0.25); /* Light borders */
--color-brand-orange-hover: #E06D12;    /* Hover states */

/* Vendor Colors */
--color-vendor-solarwinds: #F27A1A;     /* Orange */
--color-vendor-securden: #2BBCB3;       /* Teal */
--color-vendor-quest: #3B82F6;        /* Blue */
--color-vendor-ivanti: #7C3AED;         /* Purple */

/* Semantic Colors */
--color-success: #059669;
--color-success-bg: #ECFDF5;
--color-success-border: #A7F3D0;
--color-error: #DC2626;
--color-warning: #D97706;

/* Surfaces */
--color-bg-white: #FFFFFF;
--color-bg-gray: #F8F9FA;
--color-bg-dark: #1F2937;

/* Text */
--color-text-dark: #111827;
--color-text-secondary: #6B7280;
--color-text-muted: #9CA3AF;
--color-text-white: #FFFFFF;

/* Borders */
--color-border-default: #E5E7EB;
--color-border-strong: #374151;
```

### 5.2 Typography System

```css
/* Font Families */
--font-sans: "DM Sans", system-ui, sans-serif;
--font-mono: "Space Mono", "JetBrains Mono", monospace;

/* Type Scale */
--text-xs: 0.75rem;      /* 12px - Labels, badges */
--text-sm: 0.875rem;     /* 14px - Body small, buttons */
--text-base: 1rem;       /* 16px - Body */
--text-lg: 1.125rem;     /* 18px - Lead text */
--text-xl: 1.25rem;      /* 20px - Small headings */
--text-2xl: 1.5rem;      /* 24px - H3 */
--text-3xl: 1.875rem;    /* 30px - H2 */
--text-4xl: 2.25rem;     /* 36px - H1 */
--text-5xl: 3rem;        /* 48px - Display */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
```

### 5.3 Spacing System

```css
/* Base spacing scale (4px base) */
--spacing-0: 0;
--spacing-1: 0.25rem;    /* 4px */
--spacing-2: 0.5rem;     /* 8px */
--spacing-3: 0.75rem;    /* 12px */
--spacing-4: 1rem;       /* 16px */
--spacing-5: 1.25rem;    /* 20px */
--spacing-6: 1.5rem;     /* 24px */
--spacing-8: 2rem;       /* 32px */
--spacing-10: 2.5rem;    /* 40px */
--spacing-12: 3rem;      /* 48px */
--spacing-16: 4rem;      /* 64px */
--spacing-20: 5rem;      /* 80px */
--spacing-24: 6rem;      /* 96px */

/* Component-specific spacing */
--card-padding: 28px;
--section-gap: 6rem;
--container-padding: 1rem;
```

### 5.4 Component Primitives

```css
/* Cards */
--card-radius: 14px;
--card-padding: 28px;
--card-border: 1px solid var(--color-border-default);

/* Buttons */
--button-radius: 10px;
--button-padding: 0.75rem 1.5rem;

/* Badges */
--badge-radius: 4px;
--badge-padding: 4px 12px;

/* Shadows */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
```

---

## 6. API Architecture

### 6.1 API Endpoints Reference

#### Authentication
```
POST   /api/v1/auth/register/              # User registration
POST   /api/v1/auth/token/                  # Obtain JWT token pair
POST   /api/v1/auth/token/refresh/          # Refresh access token
POST   /api/v1/auth/token/verify/          # Verify token validity
POST   /api/v1/auth/password-reset/         # Request password reset
POST   /api/v1/auth/password-reset/confirm/  # Confirm password reset
```

#### Users
```
GET    /api/v1/users/me/                    # Get current user profile
PATCH  /api/v1/users/me/                    # Update user profile
```

#### Courses
```
GET    /api/v1/courses/                     # List courses (paginated)
POST   /api/v1/courses/                     # Create course (admin)
GET    /api/v1/courses/{slug}/              # Get course detail
PUT    /api/v1/courses/{slug}/              # Update course (admin)
DELETE /api/v1/courses/{slug}/              # Soft delete course (admin)
GET    /api/v1/courses/{slug}/cohorts/      # Get course cohorts
```

#### Categories
```
GET    /api/v1/categories/                  # List categories
GET    /api/v1/categories/{slug}/           # Get category detail
```

#### Cohorts
```
GET    /api/v1/cohorts/                     # List cohorts
GET    /api/v1/cohorts/{id}/                # Get cohort detail
```

#### Enrollments (Authenticated)
```
GET    /api/v1/enrollments/                 # List user enrollments
POST   /api/v1/enrollments/                 # Create enrollment
GET    /api/v1/enrollments/{id}/            # Get enrollment detail
POST   /api/v1/enrollments/{id}/cancel/     # Cancel enrollment
```

#### Payments (Authenticated)
```
POST   /api/v1/payments/create-intent/      # Create Stripe PaymentIntent
GET    /api/v1/payments/{id}/status/        # Check payment status
POST   /api/v1/webhooks/stripe/             # Stripe webhook handler
```

### 6.2 Request/Response Format

**Standardized Response Envelope:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Request successful",
  "errors": {},
  "meta": {
    "timestamp": "2026-03-27T10:30:00Z",
    "request_id": "550e8400-e29b-41d4-a716-446655440000",
    "duration_ms": 45.2,
    "pagination": {
      "count": 100,
      "page": 1,
      "pages": 10,
      "page_size": 10,
      "has_next": true,
      "has_previous": false
    }
  }
}
```

### 6.3 Filtering & Search

| Endpoint | Parameters | Example |
|----------|-----------|---------|
| `/courses/` | `level`, `vendor`, `categories__slug`, `search`, `ordering` | `?level=intermediate&vendor=solarwinds` |
| `/cohorts/` | `course`, `format`, `status` | `?format=online&status=enrolling` |

---

## 7. Security Architecture

### 7.1 Authentication & Authorization

```python
# REST Framework Configuration
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",  # Admin only
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ],
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "100/hour",
        "user": "1000/hour",
        "enrollment": "10/minute",
    },
}

# JWT Configuration
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_HEADER_TYPES": ("Bearer",),
}
```

### 7.2 Security Headers

```python
# Security middleware configuration
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
SECURE_SSL_REDIRECT = True  # Production only
```

### 7.3 CORS Configuration

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",      # Vite dev server
    "http://localhost:3000",      # Alternative dev port
    "https://app.itrust.academy", # Production
]

CORS_ALLOW_CREDENTIALS = True
```

---

## 8. Performance Strategy

### 8.1 Caching Strategy

| Endpoint | Cache Duration | Key Pattern |
|----------|---------------|-------------|
| `/courses/` | 5 minutes | `course:list:{params}` |
| `/courses/{slug}/` | 1 hour | `course:detail:{slug}` |
| `/categories/` | 30 minutes | `category:list` |
| `/courses/{slug}/cohorts/` | 10 minutes | `course:{slug}:cohorts` |

**Cache Invalidation:**
- Course create/update/delete → Invalidate course list
- Cohort change → Invalidate parent course cohorts

### 8.2 Query Optimization

**N+1 Prevention:**
```python
# Bad - 1 + N queries
Course.objects.all()  # Each course queries categories

# Good - 2 queries
Course.objects.prefetch_related('categories').all()

# Good with select_related for FKs
Cohort.objects.select_related('course', 'instructor').all()
```

### 8.3 Database Connection Pooling

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT'),
        'CONN_MAX_AGE': 600,  # 10 minutes
        'OPTIONS': {
            'MAX_CONNS': 20,
        }
    }
}
```

---

## 9. Deployment Architecture

### 9.1 Production Architecture

```
                    ┌──────────────────┐
                    │   CDN (CloudFront│                    │
                    └────────┬─────────┘
                             │
                             ▼
┌──────────┐         ┌──────────────────┐
│   User   │─────────>│   Load Balancer  │
└──────────┘         │   (ALB/NGINX)    │
                     └────────┬─────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │ Django   │   │ Django   │   │ Django   │
        │ App #1   │   │ App #2   │   │ App #3   │
        └──────────┘   └──────────┘   └──────────┘
              │               │               │
              └───────────────┼───────────────┘
                              ▼
              ┌───────────────┴───────────────┐
              ▼               ▼               ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │PostgreSQL│   │  Redis   │   │  Celery  │
        │ (Primary)│   │ (Cache)  │   │ (Worker) │
        └──────────┘   └──────────┘   └──────────┘
```

### 9.2 Environment Configuration

```python
# Production settings
DEBUG = False
ALLOWED_HOSTS = ['api.itrust.academy', 'app.itrust.academy']

# Database
DATABASES = {
    'default': env.db('DATABASE_URL')
}

# Cache
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': env('REDIS_URL'),
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        }
    }
}

# Static & Media
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
```

---

## 10. Testing Strategy

### 10.1 Testing Pyramid

```
                    ┌─────────┐
                    │   E2E   │  (10%)
                    │ Cypress │
                   ┌┴─────────┴┐
                   │Integration│  (30%)
                   │   Tests   │
                  ┌┴───────────┴┐
                  │   Unit      │  (60%)
                  │   Tests     │
                  └─────────────┘
```

### 10.2 Backend Test Structure

```
apps/courses/tests/
├── __init__.py
├── test_models.py              # Model tests
├── test_serializers.py         # Serializer tests
├── test_views.py               # API endpoint tests
├── test_caching.py            # Cache behavior tests
└── test_soft_delete.py        # Soft delete tests

apps/users/tests/
├── __init__.py
├── test_models.py
├── test_views.py
└── test_auth.py               # JWT auth tests
```

### 10.3 Frontend Test Structure

```
tests/
├── unit/
│   ├── components/
│   │   ├── Button.test.tsx
│   │   └── Card.test.tsx
│   ├── hooks/
│   │   ├── useAuth.test.ts
│   │   └── useCourses.test.ts
│   └── utils/
│       └── formatters.test.ts
├── integration/
│   ├── api.test.ts
│   └── forms.test.tsx
└── e2e/
    ├── auth.spec.ts
    ├── courses.spec.ts
    └── enrollment.spec.ts
```

### 10.4 Test Commands

```bash
# Backend tests
cd backend && python manage.py test

# Frontend unit tests
cd frontend && npm run test

# E2E tests
cd frontend && npm run test:e2e

# Coverage reports
cd frontend && npm run test:coverage
```

---

## Appendix A: Technology Stack Summary

| Category | Technology | Version |
|----------|------------|---------|
| Frontend Framework | React | 19.2.0+ |
| Build Tool | Vite | 7.3.0+ |
| Styling | Tailwind CSS | 4.1.18+ |
| UI Components | Shadcn UI + Radix | Latest |
| Animation | Framer Motion | 12.35.0+ |
| State Management | Zustand | 5.0.12 |
| Data Fetching | TanStack Query | 5.91.3 |
| Forms | React Hook Form + Zod | Latest |
| Backend Framework | Django | 6.0.3 |
| API Framework | Django REST Framework | 3.16.1 |
| Authentication | SimpleJWT | Latest |
| Database | PostgreSQL | 16+ |
| Cache | Redis | 5.2.1+ |
| Payments | Stripe | 14.4.1 |
| Task Queue | Celery | 5.6.2 |

---

## Appendix B: File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Components | PascalCase | `Button.tsx`, `HeroSection.tsx` |
| Hooks | camelCase with `use` | `useAuth.ts`, `useCourses.ts` |
| Utilities | camelCase | `formatCurrency.ts`, `cn.ts` |
| Constants | SCREAMING_SNAKE | `API_ENDPOINTS.ts` |
| Types | PascalCase | `Course.ts`, `User.ts` |
| Styles | camelCase | `animations.ts` |
| Tests | Same as source + `.test` | `Button.test.tsx` |

---

## Appendix C: API Versioning Strategy

- **Current Version**: v1
- **URL Pattern**: `/api/v1/{resource}/`
- **Breaking Changes**: Bump to v2
- **Deprecation**: 6-month notice period

---

**Document Version**: 1.0.0  
**Last Updated**: 2026-03-27  
**Status**: Draft - Ready for Review
