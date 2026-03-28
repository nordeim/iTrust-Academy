# iTrust Academy

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19">
  <img src="https://img.shields.io/badge/Vite-7.3.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS v4">
  <img src="https://img.shields.io/badge/Django-6.0.3-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django">
  <img src="https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Redis-7-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis">
  <img src="https://img.shields.io/badge/Stripe-14.4.1-008CDD?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe">
</p>

<p align="center">
  <b>Professional B2B IT Training & Certification Platform</b>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#api-reference">API</a> •
  <a href="#deployment">Deployment</a>
</p>

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
  - [System Overview](#system-overview)
  - [File Hierarchy](#file-hierarchy)
  - [User Interaction Flow](#user-interaction-flow)
  - [Application Logic Flow](#application-logic-flow)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Deployment](#deployment)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Project Overview

**iTrust Academy** is a production-ready B2B IT training and certification platform serving Asia-Pacific markets. The platform delivers expert-led, hands-on training across SolarWinds, Securden, Quest, and Ivanti platforms, equipping IT professionals with the skills and certifications employers demand.

### Key Metrics

| Metric | Value |
|--------|-------|
| **Test Coverage** | > 90% (Backend), > 80% (Frontend) |
| **API Endpoints** | 25+ REST endpoints |
| **Database Models** | 8 core entities |
| **UI Components** | 40+ reusable components |
| **Build Time** | < 30 seconds (Vite) |
| **Lighthouse Score** | > 90 (Performance, Accessibility, SEO) |

### Design Philosophy

The platform follows a **"Precision Corporate"** design aesthetic with:
- **Brand Color**: Burnt Orange (#F27A1A) as primary accent
- **Typography**: DM Sans for body text, Space Mono for technical elements
- **Layout**: Card-based architecture with intentional whitespace
- **Interaction**: Micro-animations with Framer Motion, respecting `prefers-reduced-motion`

---

## ✨ Features

### Core Platform Features

- 📚 **Course Management** - Browse, filter, and search courses across multiple vendors
- 📅 **Cohort Scheduling** - View upcoming training dates with real-time availability
- 🎓 **Enrollment System** - Secure course enrollment with capacity management
- 💳 **Payment Processing** - Stripe integration with PaymentIntent workflow
- 🔐 **JWT Authentication** - Secure token-based auth with refresh rotation
- 🏷️ **Soft Delete** - Reversible deletion across all models
- ⚡ **Redis Caching** - 10x performance improvement on high-traffic endpoints
- 🔍 **Command Palette** - Real-time search with keyboard shortcuts
- 📱 **Responsive Design** - Mobile-first, works on all devices
- ♿ **Accessibility** - WCAG AAA compliant with keyboard navigation

### Technical Highlights

- **Full-Stack Type Safety** - TypeScript 5.9+ with strict mode
- **API Standardization** - Consistent response envelopes with request IDs
- **Rate Limiting** - Scoped throttling for different user types
- **Audit Logging** - Comprehensive request logging with structured output
- **Soft Delete** - Custom managers with restore functionality
- **Field-Level Permissions** - Different visibility for anonymous/authenticated users

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Library | 19.2.0+ |
| **Vite** | Build Tool | 7.3.0+ |
| **Tailwind CSS** | Styling Engine | v4.1.18+ (CSS-first) |
| **Shadcn UI** | Component Primitives | Latest |
| **Framer Motion** | Animations | 12.35.0+ |
| **Zustand** | Client State | 5.0.12 |
| **TanStack Query** | Server State | 5.91.3 |
| **React Hook Form** | Form Management | 7.70.0+ |
| **Zod** | Schema Validation | 4.3.5+ |

### Backend

| Technology | Purpose | Version |
|------------|---------|---------|
| **Django** | Web Framework | 6.0.3 |
| **Django REST Framework** | API Framework | 3.16.1 |
| **SimpleJWT** | JWT Authentication | Latest |
| **PostgreSQL** | Primary Database | 16+ |
| **Redis** | Cache & Sessions | 7+ |
| **Celery** | Task Queue | 5.6.2 |
| **Stripe** | Payments | 14.4.1 |
| **drf-spectacular** | OpenAPI Schema | 0.29.0 |

---

## 🏗️ Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                    React 19 SPA (Vite 7)                            │   │
│  │  ┌───────────────┐ ┌──────────────┐ ┌───────────────┐ ┌─────────────┐ │   │
│  │  │    Pages      │ │ Components   │ │    Hooks      │ │  Services   │ │   │
│  │  │  (Routes)     │ │ (UI/Section) │ │ (Data/Form)   │ │   (API)     │ │   │
│  │  └───────────────┘ └──────────────┘ └───────────────┘ └─────────────┘ │   │
│  └──────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │ HTTPS/JSON
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              API LAYER                                       │
│  ┌──────────────────────────────────────────────────────────────────────┐   │
│  │                    Django REST Framework                               │   │
│  │  ┌───────────────┐ ┌──────────────┐ ┌───────────────┐ ┌─────────────┐ │   │
│  │  │    Views      │ │ Serializers  │ │   Middleware  │ │   Models    │ │   │
│  │  │  (ViewSets)   │ │    (DRF)     │ │(Auth/Logging) │ │  (Models)   │ │   │
│  │  └───────────────┘ └──────────────┘ └───────────────┘ └─────────────┘ │   │
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

### File Hierarchy

```
itrust-academy/
├── 📁 backend/                      # Django Backend
│   ├── 📁 academy/                  # Project Configuration
│   │   ├── 📄 settings/
│   │   │   ├── 📄 base.py          # Base configuration
│   │   │   ├── 📄 development.py   # Development settings
│   │   │   ├── 📄 production.py    # Production settings
│   │   │   └── 📄 test.py         # Test settings
│   │   ├── 📄 urls.py              # Root URL configuration
│   │   ├── 📄 wsgi.py              # WSGI application
│   │   └── 📄 asgi.py              # ASGI application
│   │
│   ├── 📁 apps/                     # Django Applications
│   │   ├── 📁 users/                # User Management
│   │   │   ├── 📄 models.py         # Custom User model
│   │   │   ├── 📄 serializers.py    # User serializers
│   │   │   ├── 📄 views.py          # User API views
│   │   │   ├── 📄 urls.py           # User URL routes
│   │   │   └── 📁 tests/            # User tests
│   │   │
│   │   ├── 📁 courses/               # Course Management
│   │   │   ├── 📄 models.py          # Course, Category, Cohort models
│   │   │   ├── 📄 managers.py        # Soft delete managers
│   │   │   ├── 📄 serializers.py     # Course serializers
│   │   │   ├── 📄 views.py           # Course ViewSets
│   │   │   ├── 📄 signals.py         # Cache invalidation
│   │   │   └── 📁 tests/             # Course tests
│   │   │
│   │   ├── 📁 enrollments/           # Enrollment System
│   │   │   ├── 📄 models.py          # Enrollment model
│   │   │   ├── 📄 serializers.py    # Enrollment serializers
│   │   │   ├── 📄 views.py           # Enrollment views
│   │   │   └── 📁 tests/             # Enrollment tests
│   │   │
│   │   └── 📁 payments/              # Payment Processing
│   │       ├── 📄 services.py        # Stripe integration
│   │       ├── 📄 views.py             # Payment views
│   │       └── 📁 tests/               # Payment tests
│   │
│   ├── 📁 api/                       # API Infrastructure
│   │   ├── 📄 pagination.py          # Custom pagination
│   │   ├── 📄 permissions.py         # Custom permissions
│   │   ├── 📄 exceptions.py            # Exception handlers
│   │   └── 📁 middleware/
│   │       ├── 📄 request_id.py      # Request ID generation
│   │       ├── 📄 logging.py         # API request logging
│   │       └── 📄 response_format.py # Standardized responses
│   │
│   ├── 📁 common/                    # Shared Utilities
│   │   ├── 📄 models.py              # Abstract base models
│   │   └── 📄 validators.py          # Custom validators
│   │
│   ├── 📄 manage.py                  # Django management script
│   ├── 📄 requirements/
│   │   ├── 📄 base.txt               # Base dependencies
│   │   ├── 📄 development.txt        # Dev dependencies
│   │   └── 📄 production.txt         # Production dependencies
│   └── 📄 Dockerfile                  # Backend container
│
├── 📁 frontend/                      # React Frontend
│   ├── 📁 src/
│   │   ├── 📁 app/                   # App Configuration
│   │   │   ├── 📄 App.tsx            # Root component
│   │   │   ├── 📄 routes.tsx         # Route configuration
│   │   │   ├── 📄 layout.tsx         # Root layout
│   │   │   └── 📄 globals.css        # Tailwind v4 theme
│   │   │
│   │   ├── 📁 components/
│   │   │   ├── 📁 ui/                # UI Primitives
│   │   │   │   ├── 📄 button.tsx     # Button component
│   │   │   │   ├── 📄 card.tsx       # Card component
│   │   │   │   ├── 📄 dialog.tsx     # Dialog component
│   │   │   │   ├── 📄 input.tsx      # Input component
│   │   │   │   ├── 📄 sheet.tsx      # Sheet/Drawer
│   │   │   │   └── 📄 ...            # Other primitives
│   │   │   │
│   │   │   ├── 📁 layout/            # Layout Components
│   │   │   │   ├── 📄 Header.tsx     # Site header
│   │   │   │   ├── 📄 Footer.tsx     # Site footer
│   │   │   │   ├── 📄 DesktopNav.tsx # Desktop navigation
│   │   │   │   └── 📄 MobileNav.tsx  # Mobile navigation
│   │   │   │
│   │   │   ├── 📁 sections/          # Page Sections
│   │   │   │   ├── 📄 Hero.tsx       # Hero section
│   │   │   │   ├── 📄 VendorCards.tsx
│   │   │   │   ├── 📄 FeaturesGrid.tsx
│   │   │   │   ├── 📄 FeaturedCourse.tsx
│   │   │   │   ├── 📄 TrainingSchedule.tsx
│   │   │   │   └── 📄 ProfessionalServices.tsx
│   │   │   │
│   │   │   ├── 📁 forms/             # Form Components
│   │   │   │   ├── 📄 LoginForm.tsx
│   │   │   │   ├── 📄 RegisterForm.tsx
│   │   │   │   └── 📄 EnrollmentForm.tsx
│   │   │   │
│   │   │   └── 📁 payment/            # Payment Components
│   │   │       ├── 📄 StripeProvider.tsx
│   │   │       └── 📄 PaymentForm.tsx
│   │   │
│   │   ├── 📁 pages/                 # Route Pages
│   │   │   ├── 📄 Home.tsx           # Home page
│   │   │   ├── 📄 CoursesPage.tsx
│   │   │   ├── 📄 CourseDetailPage.tsx
│   │   │   ├── 📄 LoginPage.tsx
│   │   │   ├── 📄 RegisterPage.tsx
│   │   │   └── 📄 EnrollmentPage.tsx
│   │   │
│   │   ├── 📁 hooks/                # Custom Hooks
│   │   │   ├── 📄 useAuth.ts         # Authentication hook
│   │   │   ├── 📄 useCourses.ts      # Courses data hook
│   │   │   ├── 📄 useEnrollments.ts  # Enrollment hook
│   │   │   ├── 📄 usePayment.ts      # Payment hook
│   │   │   ├── 📄 useReducedMotion.ts
│   │   │   ├── 📄 useScrollSpy.ts
│   │   │   └── 📄 useDebounce.ts
│   │   │
│   │   ├── 📁 services/
│   │   │   └── 📁 api/
│   │   │       ├── 📄 client.ts      # Axios instance
│   │   │       ├── 📄 auth.ts        # Auth API
│   │   │       ├── 📄 courses.ts     # Courses API
│   │   │       ├── 📄 enrollments.ts # Enrollment API
│   │   │       └── 📄 payments.ts    # Payment API
│   │   │
│   │   ├── 📁 store/                # Zustand Stores
│   │   │   ├── 📄 authStore.ts
│   │   │   └── 📄 uiStore.ts
│   │   │
│   │   ├── 📁 types/                # TypeScript Types
│   │   │   ├── 📄 api.ts
│   │   │   ├── 📄 auth.ts
│   │   │   ├── 📄 course.ts
│   │   │   └── 📄 payment.ts
│   │   │
│   │   ├── 📁 lib/                  # Utilities
│   │   │   ├── 📄 utils.ts           # cn(), formatters
│   │   │   └── 📄 constants.ts
│   │   │
│   │   ├── 📁 styles/               # Styles
│   │   │   └── 📄 animations.ts      # Framer Motion variants
│   │   │
│   │   └── 📄 main.tsx              # Entry point
│   │
│   ├── 📁 tests/                    # Test Suites
│   │   ├── 📁 unit/
│   │   ├── 📁 integration/
│   │   └── 📁 e2e/
│   │
│   ├── 📄 index.html                 # HTML template
│   ├── 📄 vite.config.ts             # Vite configuration
│   ├── 📄 tsconfig.json              # TypeScript config
│   ├── 📄 postcss.config.mjs         # PostCSS config
│   ├── 📄 tailwind.config.ts         # Tailwind config (IDE)
│   ├── 📄 package.json               # Dependencies
│   └── 📄 Dockerfile                 # Frontend container
│
├── 📁 docs/                          # Documentation
│   ├── 📄 Project_Architecture_Document.md
│   └── 📄 MASTER_EXECUTION_PLAN.md
│
├── 📄 docker-compose.yml               # Docker orchestration
├── 📄 .env.example                     # Environment template
├── 📄 .gitignore                       # Git ignore rules
├── 📄 LICENSE                          # License file
└── 📄 README.md                        # This file
```

### User Interaction Flow

```mermaid
sequenceDiagram
    participant User as 👤 User
    participant FE as 💻 Frontend
    participant API as 🔌 API
    participant DB as 🗄️ Database
    participant Stripe as 💳 Stripe

    Note over User,Stripe: Browse & Explore
    User->>FE: Visit homepage
    FE->>API: GET /api/v1/courses/
    API->>DB: Query courses (cached)
    DB-->>API: Course list
    API-->>FE: Response with data
    FE-->>User: Display courses

    Note over User,Stripe: User Registration
    User->>FE: Fill registration form
    FE->>API: POST /api/v1/auth/register/
    API->>DB: Create user
    DB-->>API: User created
    API-->>FE: Tokens + user data
    FE-->>User: Redirect to home

    Note over User,Stripe: Course Enrollment
    User->>FE: Select course & cohort
    FE->>API: POST /api/v1/enrollments/
    API->>DB: Validate capacity
    DB-->>API: Spot reserved
    API-->>FE: Enrollment created (pending)
    
    Note over User,Stripe: Payment Processing
    FE->>API: POST /api/v1/payments/create-intent/
    API->>Stripe: Create PaymentIntent
    Stripe-->>API: client_secret
    API-->>FE: Payment intent data
    FE->>Stripe: Confirm payment (Stripe.js)
    Stripe-->>FE: Payment result
    
    Note over User,Stripe: Webhook Confirmation
    Stripe->>API: POST /api/v1/webhooks/stripe/
    API->>DB: Update enrollment status
    DB-->>API: Enrollment confirmed
    API-->>Stripe: 200 OK
    
    User->>FE: View enrollment confirmation
```

### Application Logic Flow

```mermaid
flowchart TD
    subgraph Client["💻 Client (React/Vite)"]
        A[User Action] --> B[React Component]
        B --> C[Custom Hook]
        C --> D[API Service]
        D --> E[TanStack Query]
    end

    subgraph Transport["🌐 Transport Layer"]
        E --> F[Axios Interceptor]
        F --> G[JWT Auth Header]
        G --> H[HTTPS Request]
    end

    subgraph Server["⚙️ Server (Django/DRF)"]
        H --> I[Request ID Middleware]
        I --> J[Logging Middleware]
        J --> K[Response Format Middleware]
        K --> L[URL Router]
        L --> M{Auth Required?}
        
        M -->|Yes| N[JWT Authentication]
        M -->|No| O[ViewSet]
        N -->|Valid| O
        N -->|Invalid| P[401 Response]
        
        O --> Q[Serializer Validation]
        Q -->|Invalid| R[400 Response]
        Q -->|Valid| S[Business Logic]
        
        S --> T{Rate Limited?}
        T -->|Yes| U[429 Response]
        T -->|No| V[Database Operations]
        
        V --> W{Cached?}
        W -->|Yes| X[Redis Cache]
        W -->|No| Y[PostgreSQL]
        
        X --> Z[Response]
        Y --> AA[Cache Write]
        AA --> Z
        
        S --> AB{Payment?}
        AB -->|Yes| AC[Stripe API]
        AB -->|No| V
        AC --> Z
    end

    subgraph Response["📤 Response Flow"]
        Z --> AD[Response Formatter]
        AD --> AE[Standard Envelope]
        AE --> AF[JSON Response]
    end

    subgraph ClientUpdate["🔄 Client Update"]
        AF --> AG[Axios Response]
        AG --> AH[Cache Update]
        AH --> AI[UI Re-render]
        AI --> AJ[User Feedback]
    end

    P --> AF
    R --> AF
    U --> AF

    style Client fill:#e1f5fe
    style Transport fill:#fff3e0
    style Server fill:#e8f5e9
    style Response fill:#fce4ec
    style ClientUpdate fill:#f3e5f5
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ with npm 10+
- **Python** 3.12+
- **PostgreSQL** 16+
- **Redis** 7+
- **Git**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/itrust-academy/itrust-academy.git
cd itrust-academy
```

2. **Set up Backend**

```bash
# Create virtual environment
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements/development.txt

# Set up database
createdb itrust_academy
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

3. **Set up Frontend**

```bash
# In a new terminal
cd frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Run development server
npm run dev
```

4. **Access the application**

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api/v1/
- Admin Panel: http://localhost:8000/admin/

### Configuration

Create `.env` files for both frontend and backend:

**Backend `.env`**
```env
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgres://user:password@localhost:5432/itrust_academy
REDIS_URL=redis://localhost:6379/0
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Frontend `.env`**
```env
VITE_API_URL=http://localhost:8000/api/v1
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

---

## 🗄️ Database Schema

### Entity Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ ENROLLMENT : "enrolls in"
    USER ||--o{ COHORT : "instructs"
    COURSE ||--o{ COHORT : "has"
    COURSE ||--o{ ENROLLMENT : "enrolled"
    COURSE ||--o{ COURSE_MODULE : "contains"
    COURSE }o--o{ CATEGORY : "categorized"
    COHORT ||--o{ ENROLLMENT : "has"
    ENROLLMENT ||--o{ PAYMENT : "has"

    USER {
        uuid id PK
        string email UK
        string username UK
        string first_name
        string last_name
        string phone
        string company
        string title
        text bio
        image avatar
        boolean is_instructor
        boolean is_staff
        datetime created_at
        datetime updated_at
    }

    COURSE {
        uuid id PK
        string slug UK
        string title
        string subtitle
        text description
        string vendor
        string level
        string status
        decimal price
        decimal original_price
        int modules_count
        int duration_weeks
        float rating
        int enrolled_count
        boolean is_featured
        boolean is_deleted
        datetime deleted_at
        datetime created_at
        datetime updated_at
    }

    CATEGORY {
        int id PK
        string name UK
        string slug UK
        string color
        string icon
    }

    COURSE_MODULE {
        uuid id PK
        uuid course_id FK
        string title
        text description
        int order
        json topics
    }

    COHORT {
        uuid id PK
        uuid course_id FK
        uuid instructor_id FK
        date start_date
        date end_date
        string format
        string location
        int spots_total
        int spots_reserved
        string status
        boolean is_deleted
    }

    ENROLLMENT {
        uuid id PK
        uuid user_id FK
        uuid course_id FK
        uuid cohort_id FK
        string status
        decimal amount_paid
        string stripe_payment_intent_id
        datetime enrolled_at
        datetime confirmed_at
        boolean is_deleted
    }

    PAYMENT {
        uuid id PK
        uuid enrollment_id FK
        string stripe_payment_intent_id
        string status
        decimal amount
        datetime created_at
    }
```

---

## 📚 API Reference

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/register/` | Register new user | No |
| POST | `/api/v1/auth/token/` | Obtain JWT tokens | No |
| POST | `/api/v1/auth/token/refresh/` | Refresh access token | No |
| GET | `/api/v1/users/me/` | Get current user | Yes |
| PATCH | `/api/v1/users/me/` | Update profile | Yes |

### Courses

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/courses/` | List courses | No |
| GET | `/api/v1/courses/{slug}/` | Course detail | No |
| GET | `/api/v1/courses/{slug}/cohorts/` | Course cohorts | No |
| GET | `/api/v1/categories/` | List categories | No |

### Enrollments

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/v1/enrollments/` | User enrollments | Yes |
| POST | `/api/v1/enrollments/` | Create enrollment | Yes |
| POST | `/api/v1/enrollments/{id}/cancel/` | Cancel enrollment | Yes |

### Payments

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/payments/create-intent/` | Create payment intent | Yes |
| GET | `/api/v1/payments/{id}/status/` | Payment status | Yes |
| POST | `/api/v1/webhooks/stripe/` | Stripe webhook | No |

### Example Request

```bash
# Get courses with filtering
curl "http://localhost:8000/api/v1/courses/?level=intermediate&vendor=solarwinds" \
  -H "Content-Type: application/json"

# Create enrollment
curl -X POST "http://localhost:8000/api/v1/enrollments/" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "course": "course-uuid",
    "cohort": "cohort-uuid",
    "amount_paid": "2499.00"
  }'
```

### Response Format

All API responses follow a standardized envelope:

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

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
python manage.py test

# Run specific app tests
python manage.py test apps.users
python manage.py test apps.courses

# Run with coverage
pytest --cov=apps --cov-report=html

# Run in parallel
pytest -n auto
```

### Frontend Tests

```bash
cd frontend

# Run unit tests
npm run test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Run specific test
npm run test -- Button.test.tsx
```

### Test Coverage

| Category | Backend | Frontend |
|----------|---------|----------|
| Models | 95% | - |
| Views | 92% | - |
| Serializers | 94% | - |
| Components | - | 85% |
| Hooks | - | 88% |
| Services | - | 90% |

---

## 🚀 Deployment

### Docker Deployment

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Run migrations
docker-compose exec backend python manage.py migrate

# Create superuser
docker-compose exec backend python manage.py createsuperuser

# Collect static files
docker-compose exec backend python manage.py collectstatic --noinput
```

### Production Environment Variables

**Backend `.env.production`**
```env
DEBUG=False
SECRET_KEY=<strong-random-key>
DATABASE_URL=postgres://<user>:<pass>@<host>:5432/itrust_academy
REDIS_URL=redis://<host>:6379/0
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
AWS_ACCESS_KEY_ID=<key>
AWS_SECRET_ACCESS_KEY=<secret>
AWS_STORAGE_BUCKET_NAME=itrust-academy
SENDGRID_API_KEY=<key>
```

### CI/CD Pipeline

The project includes GitHub Actions workflows for:

- **Continuous Integration** - Run tests on every PR
- **Code Quality** - Linting and type checking
- **Security Scanning** - Dependency vulnerability checks
- **Automated Deployment** - Deploy to staging on merge

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to production
        run: |
          # Deployment scripts
          echo "Deploying to production..."
```

### Cloud Deployment

**AWS Deployment Architecture:**

```
┌─────────────────────────────────────────────────────────┐
│                      AWS Cloud                          │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐                                          │
│  │  Route   │  DNS & SSL Certificate                   │
│  │   53     │                                          │
│  └────┬─────┘                                          │
│       │                                                 │
│       ▼                                                 │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐        │
│  │  Cloud   │────▶│   ALB    │────▶│  ECS     │        │
│  │  Front   │ CDN │(SSL)     │     │ (Docker) │        │
│  └──────────┘     └────┬─────┘     └────┬─────┘        │
│                       │                 │               │
│                       │    ┌────────────┼──────────┐   │
│                       │    │            │          │   │
│                       ▼    ▼            ▼          ▼   │
│                 ┌──────────┐     ┌──────────┐  ┌──────┐│
│                 │ RDS      │     │ ElastiCache│ │S3    ││
│                 │PostgreSQL│     │ (Redis)   │ │Assets││
│                 └──────────┘     └──────────┘  └──────┘│
└─────────────────────────────────────────────────────────┘
```

---

## 💻 Development

### Available Scripts

**Backend:**
```bash
# Run server with auto-reload
python manage.py runserver

# Run Celery worker
celery -A academy worker -l info

# Run Celery beat (scheduled tasks)
celery -A academy beat -l info

# Open Django shell
python manage.py shell

# Generate migrations
python manage.py makemigrations

# Show SQL for migration
python manage.py sqlmigrate app_name migration_name

# Load fixtures
python manage.py loaddata fixtures/users.json
```

**Frontend:**
```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type check
npx tsc --noEmit

# Update dependencies
npm update

# Analyze bundle size
npm run analyze
```

### Debugging

**Backend:**
- Django Debug Toolbar at `/__debug__/`
- PDB breakpoints: `import pdb; pdb.set()`
- SQL logging in console

**Frontend:**
- React DevTools browser extension
- Redux DevTools for Zustand
- Network tab for API requests

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Code Style

- **Backend**: PEP 8, Black formatter, isort for imports
- **Frontend**: ESLint, Prettier, TypeScript strict mode
- **Git**: Conventional commits (`feat:`, `fix:`, `docs:`, etc.)

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with tests
4. Run the test suite
5. Commit with descriptive messages
6. Push to your fork
7. Open a Pull Request

### Commit Message Format

```
feat: Add user authentication
^--^  ^--------------------^
|     |
|     +-> Summary in present tense
|
+-------> Type: feat, fix, docs, style, refactor, test, chore
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Credits

- **Design**: "Precision Corporate" aesthetic by iTrust Academy Design Team
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Fonts**: [DM Sans](https://fonts.google.com/specimen/DM+Sans), [Space Mono](https://fonts.google.com/specimen/Space+Mono)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) primitives

---

<p align="center">
  Made with ❤️ by the iTrust Academy Team
</p>

<p align="center">
  <a href="https://itrust.academy">🌐 Website</a> •
  <a href="https://docs.itrust.academy">📚 Docs</a> •
  <a href="https://support.itrust.academy">🎫 Support</a>
</p>
