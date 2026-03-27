# iTrust Academy - Master Execution Plan

## Executive Summary

This document provides a comprehensive, phase-by-phase implementation roadmap for building the **iTrust Academy** production-ready codebase. The plan follows Test-Driven Development (TDD) methodology and breaks work into independent phases that can be executed by coding agents.

**Project Goal**: Build a complete, production-ready B2B IT training platform with:
- React 19 + Vite 7 + Tailwind CSS v4 frontend
- Django 6 + DRF + PostgreSQL backend
- JWT authentication, Stripe payments, comprehensive caching
- "Precision Corporate" design with burnt-orange (#F27A1A) branding

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Phase Structure](#2-phase-structure)
3. [Phase 1: Foundation & Setup](#phase-1-foundation--setup)
4. [Phase 2: Backend Core](#phase-2-backend-core)
5. [Phase 3: Authentication System](#phase-3-authentication-system)
6. [Phase 4: Course Management](#phase-4-course-management)
7. [Phase 5: Enrollment & Payments](#phase-5-enrollment--payments)
8. [Phase 6: Frontend Foundation](#phase-6-frontend-foundation)
9. [Phase 7: Frontend UI Components](#phase-7-frontend-ui-components)
10. [Phase 8: Frontend Pages & Sections](#phase-8-frontend-pages--sections)
11. [Phase 9: Integration & Testing](#phase-9-integration--testing)
12. [Phase 10: Deployment Preparation](#phase-10-deployment-preparation)

---

## 1. Project Overview

### 1.1 Success Criteria

- [ ] All 8 page sections fully functional with animations
- [ ] JWT authentication working with refresh tokens
- [ ] Course enrollment flow with Stripe payments
- [ ] Soft delete implementation across all models
- [ ] Comprehensive caching for performance
- [ ] 90%+ test coverage (backend + frontend)
- [ ] WCAG AAA accessibility compliance
- [ ] Production-ready security headers

### 1.2 Design Requirements

- **Brand Color**: #F27A1A (burnt orange)
- **Typography**: DM Sans (body), Space Mono (labels/mono)
- **Aesthetic**: "Precision Corporate" - clean, corporate, trust-oriented
- **Corner Radius**: Sharp corners (`--radius: 0rem`)
- **Layout**: Card-based with intentional whitespace

---

## 2. Phase Structure

Each phase includes:
- **Objective**: Clear goal statement
- **Files to Create**: Comprehensive list with descriptions
- **TDD Approach**: Test-first methodology
- **Checklist**: Completion criteria
- **Dependencies**: Required prior phases
- **Estimated Effort**: Time estimate

---

## Phase 1: Foundation & Setup

**Objective**: Establish project structure, install dependencies, and configure development environment.

**Duration**: 4-6 hours

### 1.1 Directory Structure Setup

| Action | Description |
|--------|-------------|
| Create `backend/` | Django project root |
| Create `frontend/` | React/Vite project root |
| Create `docs/` | Documentation folder |
| Create `scripts/` | Automation scripts |

### 1.2 Files to Create

#### Backend Foundation

**File**: `backend/requirements/base.txt`
```
Django==6.0.3
djangorestframework==3.16.1
django-cors-headers==4.9.0
django-filter==25.2
django-storages==1.14.6
django-redis==6.0.0
djangorestframework-simplejwt==5.3.1
drf-spectacular==0.29.0
Pillow==12.1.1
psycopg2-binary==2.9.10
redis==6.4.0
celery==5.6.2
stripe==14.4.1
python-dotenv==1.2.1
whitenoise==6.11.0
gunicorn==25.1.0
dj-database-url==3.1.2
boto3==1.42.73
botocore==1.42.73
```

**File**: `backend/requirements/development.txt`
```
-r base.txt
pytest==9.0.2
pytest-django==4.12.0
factory-boy==3.3.3
black==23.12.1
flake8==6.1.0
mypy==1.19.1
django-debug-toolbar==6.2.0
ipython==8.22.0
```

**File**: `backend/academy/settings/base.py`
- Django base configuration
- Installed apps configuration
- Middleware setup
- Database configuration template
- REST Framework settings
- JWT configuration
- CORS settings
- Cache configuration (Redis)
- Logging configuration

**File**: `backend/academy/settings/development.py`
- Development-specific settings
- DEBUG = True
- Local database settings
- Development CORS origins
- Debug toolbar

**File**: `backend/academy/settings/production.py`
- Production security settings
- Database URL from environment
- AWS S3 static/media storage
- Security headers
- Logging to CloudWatch/files

**File**: `backend/academy/settings/test.py`
- Test-specific settings
- In-memory database
- Fast password hashing
- Test CORS settings

**File**: `backend/academy/urls.py`
- Root URL configuration
- API namespace: `/api/v1/`
- Admin URLs
- Media/static URLs (dev)

**File**: `backend/manage.py`
- Standard Django management script

**File**: `backend/academy/wsgi.py`
- WSGI application entry point

**File**: `backend/academy/asgi.py`
- ASGI application for WebSocket support

#### Frontend Foundation

**File**: `frontend/package.json`
```json
{
  "name": "itrust-academy-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-collapsible": "^1.1.12",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-toast": "^1.2.8",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@stripe/react-stripe-js": "^5.6.1",
    "@stripe/stripe-js": "^8.11.0",
    "@tanstack/react-query": "^5.91.3",
    "axios": "^1.13.6",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "framer-motion": "^12.35.0",
    "lucide-react": "^0.562.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-hook-form": "^7.70.0",
    "react-router-dom": "^6.30.3",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.4.0",
    "zod": "^4.3.5",
    "zustand": "^5.0.12"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "@testing-library/user-event": "^14.6.1",
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "jsdom": "^29.0.1",
    "tailwindcss": "^4.1.18",
    "@tailwindcss/postcss": "^4.1.18",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.46.4",
    "vite": "^7.2.4",
    "vitest": "^4.1.0"
  }
}
```

**File**: `frontend/tsconfig.json`
- TypeScript strict mode configuration
- Path aliases: `@/*` → `src/*`
- Modern target: ES2022
- React JSX transform

**File**: `frontend/vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```

**File**: `frontend/postcss.config.mjs`
```javascript
export default {
  plugins: ["@tailwindcss/postcss"],
}
```

**File**: `frontend/index.html`
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>iTrust Academy - IT Training & Certification</title>
    <meta name="description" content="Professional IT training and certification across SolarWinds, Securden, Quest, and Ivanti platforms" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### 1.3 TDD - Phase 1 Tests

**File**: `backend/apps/common/tests/test_base_models.py`
```python
import pytest
from django.test import TestCase
from common.models import SoftDeleteModel, TimestampModel


class TestSoftDeleteModel(TestCase):
    """Tests for soft delete functionality."""
    
    def test_soft_delete_sets_flag(self):
        """Verify soft delete sets is_deleted flag."""
        pass  # Test implementation
    
    def test_restore_recovers_object(self):
        """Verify restore removes is_deleted flag."""
        pass
    
    def test_hard_delete_removes_object(self):
        """Verify hard_delete removes from database."""
        pass
    
    def test_default_manager_excludes_deleted(self):
        """Verify default manager filters deleted objects."""
        pass
```

### 1.4 Phase 1 Checklist

- [ ] Backend Django project initialized
- [ ] Requirements files created with all dependencies
- [ ] Settings modules (base, dev, prod, test) created
- [ ] Frontend Vite project initialized
- [ ] package.json with all dependencies
- [ ] TypeScript configured with strict mode
- [ ] Vite config with proxy and path aliases
- [ ] Tailwind CSS v4 CSS file created with theme tokens
- [ ] PostCSS configuration
- [ ] Development servers can start without errors
- [ ] TDD test skeletons written

### 1.5 Dependencies

- None (foundation phase)

---

## Phase 2: Backend Core

**Objective**: Implement core backend infrastructure including models, serializers, and base API layer.

**Duration**: 8-10 hours

### 2.1 Files to Create

#### Common Infrastructure

**File**: `backend/common/models.py`
- `SoftDeleteManager` - Custom manager excluding deleted objects
- `SoftDeleteModel` - Abstract base with soft delete
- `TimestampModel` - Abstract base with created/updated
- `AuditModel` - Abstract base with user tracking

**File**: `backend/common/validators.py`
- `validate_file_size` - File size validator
- `validate_image_dimensions` - Image dimension validator
- `validate_slug` - Slug format validator

**File**: `backend/api/pagination.py`
```python
from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
    """Standard pagination with configurable page size."""
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100
```

**File**: `backend/api/permissions.py`
- `IsOwnerOrAdmin` - Object-level permission
- `ReadOnly` - GET/HEAD/OPTIONS only
- `IsInstructor` - Instructor role check

**File**: `backend/api/middleware/request_id.py`
```python
import uuid


class RequestIDMiddleware:
    """Generate unique request ID for each request."""
    
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        request.request_id = str(uuid.uuid4())
        response = self.get_response(request)
        response['X-Request-ID'] = request.request_id
        return response
```

**File**: `backend/api/middleware/logging.py`
```python
import logging
import time

logger = logging.getLogger('api.requests')


class APILoggingMiddleware:
    """Log all API requests with timing."""
    
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        start_time = time.time()
        response = self.get_response(request)
        duration = (time.time() - start_time) * 1000
        
        logger.info(
            f"{request.method} {request.path} - {response.status_code} - "
            f"{duration:.2f}ms - {getattr(request, 'request_id', 'N/A')}"
        )
        
        return response
```

**File**: `backend/api/middleware/response_format.py`
- Standardized response envelope middleware
- Success/error formatting
- Meta information injection

**File**: `backend/api/exceptions.py`
```python
from rest_framework.views import exception_handler


def standardized_exception_handler(exc, context):
    """Custom exception handler with standardized format."""
    response = exception_handler(exc, context)
    
    if response is not None:
        # Format into standard envelope
        pass
    
    return response
```

#### Users App

**File**: `backend/apps/users/models.py`
```python
from django.contrib.auth.models import AbstractUser
from django.db import models
from common.models import TimestampModel


class User(AbstractUser, TimestampModel):
    """Custom User model."""
    
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
```

**File**: `backend/apps/users/serializers.py`
- `UserSerializer` - Full user data
- `UserProfileSerializer` - Public profile
- `UserRegistrationSerializer` - Registration with validation
- `UserUpdateSerializer` - Profile updates

**File**: `backend/apps/users/views.py`
- `UserViewSet` - CRUD operations
- `UserMeView` - Current user endpoint
- `RegisterView` - User registration

**File**: `backend/apps/users/urls.py`
- User API routes
- Registration endpoint

**File**: `backend/apps/users/admin.py`
- User admin customization
- Fieldsets for profile data

### 2.2 TDD - Phase 2 Tests

**File**: `backend/apps/users/tests/test_models.py`
```python
import pytest
from django.test import TestCase
from apps.users.models import User


class TestUserModel(TestCase):
    """Tests for User model."""
    
    def test_create_user_with_email(self):
        """Verify user creation with email."""
        pass
    
    def test_user_str_representation(self):
        """Verify __str__ returns expected format."""
        pass
    
    def test_email_uniqueness(self):
        """Verify email must be unique."""
        pass
    
    def test_required_fields(self):
        """Verify required fields on creation."""
        pass
```

**File**: `backend/apps/users/tests/test_views.py`
```python
from django.test import TestCase, Client
from rest_framework.test import APITestCase


class TestUserViews(APITestCase):
    """Tests for user API views."""
    
    def test_register_user_success(self):
        """Verify user registration."""
        pass
    
    def test_register_duplicate_email_fails(self):
        """Verify duplicate email rejected."""
        pass
    
    def test_get_me_authenticated(self):
        """Verify /users/me/ returns current user."""
        pass
    
    def test_get_me_unauthenticated_fails(self):
        """Verify /users/me/ requires auth."""
        pass
```

### 2.3 Phase 2 Checklist

- [ ] SoftDeleteManager implemented with filter_deleted/exclude_deleted
- [ ] SoftDeleteModel with delete(), hard_delete(), restore() methods
- [ ] RequestIDMiddleware generating unique IDs
- [ ] APILoggingMiddleware logging all requests
- [ ] ResponseFormatMiddleware standardizing all responses
- [ ] Custom exception handler implemented
- [ ] User model with custom USERNAME_FIELD=email
- [ ] User serializers with validation
- [ ] User views with CRUD operations
- [ ] All user tests passing
- [ ] Migration files created and applied

### 2.4 Dependencies

- Phase 1: Foundation & Setup

---

## Phase 3: Authentication System

**Objective**: Implement JWT authentication with SimpleJWT, including token refresh, blacklisting, and password reset.

**Duration**: 6-8 hours

### 3.1 Files to Create

**File**: `backend/apps/users/authentication.py`
```python
from rest_framework_simplejwt.authentication import JWTAuthentication


class CustomJWTAuthentication(JWTAuthentication):
    """Custom JWT authentication with additional validation."""
    
    def get_user(self, validated_token):
        """Get user and check if still active."""
        user = super().get_user(validated_token)
        
        if not user.is_active:
            raise AuthenticationFailed('User is inactive')
        
        return user
```

**File**: `backend/apps/users/tokens.py`
```python
from rest_framework_simplejwt.tokens import RefreshToken


def get_tokens_for_user(user):
    """Generate token pair for user."""
    refresh = RefreshToken.for_user(user)
    
    return {
        'access': str(refresh.access_token),
        'refresh': str(refresh),
    }
```

**File**: `backend/apps/users/services.py`
```python
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode


class PasswordResetService:
    """Service for password reset operations."""
    
    @staticmethod
    def send_reset_email(user):
        """Send password reset email."""
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        
        # Send email with token and uid
        pass
```

**File**: `backend/academy/settings/jwt.py`
```python
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=30),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': True,
    
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    
    'JTI_CLAIM': 'jti',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',
}
```

**File**: `backend/apps/users/tests/test_auth.py`
```python
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken


class TestJWTAuth(APITestCase):
    """Tests for JWT authentication."""
    
    def test_obtain_token_pair(self):
        """Verify token pair generation."""
        pass
    
    def test_refresh_token(self):
        """Verify token refresh."""
        pass
    
    def test_blacklisted_token_fails(self):
        """Verify blacklisted refresh token rejected."""
        pass
    
    def test_access_token_expires(self):
        """Verify expired access token rejected."""
        pass
```

### 3.2 Frontend Authentication

**File**: `frontend/src/services/api/client.ts`
```typescript
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor - handle 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      
      try {
        const refreshToken = localStorage.getItem('refresh_token')
        const response = await axios.post('/auth/token/refresh/', {
          refresh: refreshToken,
        })
        
        const { access } = response.data
        localStorage.setItem('access_token', access)
        
        originalRequest.headers.Authorization = `Bearer ${access}`
        return apiClient(originalRequest)
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    
    return Promise.reject(error)
  }
)

export default apiClient
```

**File**: `frontend/src/store/authStore.ts`
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  isInstructor: boolean
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  login: (tokens: { access: string; refresh: string }, user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      login: (tokens, user) => {
        localStorage.setItem('access_token', tokens.access)
        localStorage.setItem('refresh_token', tokens.refresh)
        set({ user, isAuthenticated: true })
      },
      logout: () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)
```

**File**: `frontend/src/services/api/auth.ts`
```typescript
import apiClient from './client'

export const authApi = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/token/', { email, password }),
  
  register: (data: {
    email: string
    username: string
    password: string
    firstName: string
    lastName: string
  }) => apiClient.post('/auth/register/', data),
  
  refresh: (refresh: string) =>
    apiClient.post('/auth/token/refresh/', { refresh }),
  
  me: () => apiClient.get('/users/me/'),
  
  updateProfile: (data: Partial<User>) =>
    apiClient.patch('/users/me/', data),
  
  requestPasswordReset: (email: string) =>
    apiClient.post('/auth/password-reset/', { email }),
  
  confirmPasswordReset: (data: {
    token: string
    uid: string
    newPassword: string
  }) => apiClient.post('/auth/password-reset/confirm/', data),
}
```

**File**: `frontend/src/hooks/useAuth.ts`
```typescript
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/authStore'
import { authApi } from '@/services/api/auth'
import { useNavigate } from 'react-router-dom'

export function useLogin() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authApi.login(email, password).then((res) => res.data),
    onSuccess: async (data) => {
      const { access, refresh } = data
      const userResponse = await authApi.me()
      login({ access, refresh }, userResponse.data.data)
      navigate('/')
    },
  })
}

export function useRegister() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  
  return useMutation({
    mutationFn: authApi.register,
    onSuccess: async (data) => {
      // Auto-login after registration
      const { access, refresh } = data.data.tokens
      login({ access, refresh }, data.data.user)
      navigate('/')
    },
  })
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => authApi.me().then((res) => res.data.data),
    enabled: !!localStorage.getItem('access_token'),
  })
}
```

### 3.3 Phase 3 Checklist

- [ ] JWT token obtain endpoint working
- [ ] Token refresh with rotation
- [ ] Token blacklisting on refresh
- [ ] Password reset email flow
- [ ] Password reset confirmation
- [ ] Frontend API client with interceptors
- [ ] Auth store with Zustand
- [ ] useLogin hook with auto-redirect
- [ ] useRegister hook
- [ ] Token refresh logic on 401
- [ ] All auth tests passing

### 3.4 Dependencies

- Phase 2: Backend Core
- Phase 1: Foundation

---

## Phase 4: Course Management

**Objective**: Implement complete course management system with categories, courses, modules, and cohorts.

**Duration**: 12-14 hours

### 4.1 Files to Create

#### Courses App - Models

**File**: `backend/apps/courses/models.py`
- `Category` model with color/icon support
- `Course` model with full fields
- `CourseModule` model for course content
- `Cohort` model for training instances

**File**: `backend/apps/courses/serializers.py`
```python
from rest_framework import serializers
from .models import Course, Category, Cohort, CourseModule


class CategorySerializer(serializers.ModelSerializer):
    course_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'color', 'icon', 'course_count']
    
    def get_course_count(self, obj):
        return obj.courses.filter(is_deleted=False).count()


class CourseListSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    
    class Meta:
        model = Course
        fields = [
            'id', 'slug', 'title', 'subtitle', 'thumbnail', 'thumbnail_alt',
            'categories', 'level', 'modules_count', 'duration_weeks',
            'price', 'original_price', 'discount_percentage', 'currency',
            'rating', 'review_count', 'enrolled_count', 'is_featured'
        ]


class CourseDetailSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True, read_only=True)
    modules = CourseModuleSerializer(many=True, read_only=True)
    
    class Meta:
        model = Course
        fields = [
            'id', 'slug', 'title', 'subtitle', 'description', 'short_description',
            'vendor', 'categories', 'level', 'status', 'thumbnail', 'thumbnail_alt',
            'modules_count', 'duration_weeks', 'duration_hours',
            'price', 'original_price', 'currency', 'rating', 'review_count',
            'enrolled_count', 'includes_certification', 'includes_labs',
            'meta_title', 'meta_description', 'created_at', 'updated_at', 'modules'
        ]


class CohortSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    course_slug = serializers.SlugField(source='course.slug', read_only=True)
    instructor_name = serializers.CharField(source='instructor.get_full_name', read_only=True)
    spots_remaining = serializers.IntegerField(read_only=True)
    availability_status = serializers.CharField(read_only=True)
    
    class Meta:
        model = Cohort
        fields = [
            'id', 'course_title', 'course_slug', 'start_date', 'end_date',
            'timezone', 'format', 'location', 'instructor_name',
            'spots_total', 'spots_remaining', 'availability_status',
            'early_bird_price', 'early_bird_deadline', 'status'
        ]
```

**File**: `backend/apps/courses/views.py`
```python
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
        if self.action == 'list':
            return CourseListSerializer
        return CourseDetailSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.prefetch_related('categories', 'modules')
    
    def list(self, request, *args, **kwargs):
        cache_key = self._build_cache_key(request.query_params)
        cached = cache.get(cache_key)
        
        if cached:
            return Response(cached)
        
        response = super().list(request, *args, **kwargs)
        cache.set(cache_key, response.data, 300)
        
        return response
    
    def retrieve(self, request, *args, **kwargs):
        slug = kwargs.get('slug')
        cache_key = f'course:detail:{slug}'
        cached = cache.get(cache_key)
        
        if cached:
            return Response(cached)
        
        response = super().retrieve(request, *args, **kwargs)
        cache.set(cache_key, response.data, 3600)
        
        return response
    
    @action(detail=True, methods=['get'])
    def cohorts(self, request, slug=None):
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
        params_str = '&'.join(f"{k}={v}" for k, v in sorted(query_params.items()))
        return f"course:list:{params_str}"


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'
    
    def list(self, request, *args, **kwargs):
        cached = cache.get('category:list')
        
        if cached:
            return Response(cached)
        
        response = super().list(request, *args, **kwargs)
        cache.set('category:list', response.data, 1800)
        
        return response


class CohortViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Cohort.objects.filter(is_deleted=False)
    serializer_class = CohortSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['course', 'format', 'status']
    ordering_fields = ['start_date', 'price']
    ordering = ['start_date']
```

**File**: `backend/apps/courses/signals.py`
```python
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from .models import Course, Category, Cohort


@receiver([post_save, post_delete], sender=Course)
def invalidate_course_cache(sender, instance, **kwargs):
    """Invalidate course cache on save/delete."""
    cache.delete(f'course:detail:{instance.slug}')
    cache.delete_pattern('course:list:*')


@receiver([post_save, post_delete], sender=Category)
def invalidate_category_cache(sender, instance, **kwargs):
    """Invalidate category cache."""
    cache.delete('category:list')
    cache.delete_pattern('course:list:*')


@receiver([post_save, post_delete], sender=Cohort)
def invalidate_cohort_cache(sender, instance, **kwargs):
    """Invalidate cohort cache."""
    cache.delete(f'course:{instance.course_id}:cohorts')
```

### 4.2 Frontend Course Services

**File**: `frontend/src/services/api/courses.ts`
```typescript
import apiClient from './client'

export const coursesApi = {
  list: (params?: {
    level?: string
    vendor?: string
    search?: string
    ordering?: string
    page?: number
  }) => apiClient.get('/courses/', { params }),
  
  detail: (slug: string) => apiClient.get(`/courses/${slug}/`),
  
  cohorts: (slug: string) => apiClient.get(`/courses/${slug}/cohorts/`),
  
  categories: () => apiClient.get('/categories/'),
  
  featured: () => apiClient.get('/courses/?is_featured=true'),
}
```

**File**: `frontend/src/hooks/useCourses.ts`
```typescript
import { useQuery } from '@tanstack/react-query'
import { coursesApi } from '@/services/api/courses'

export function useCourses(params?: {
  level?: string
  vendor?: string
  search?: string
  ordering?: string
}) {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: () => coursesApi.list(params).then((res) => res.data.data),
  })
}

export function useCourse(slug: string) {
  return useQuery({
    queryKey: ['course', slug],
    queryFn: () => coursesApi.detail(slug).then((res) => res.data.data),
    enabled: !!slug,
  })
}

export function useCourseCohorts(slug: string) {
  return useQuery({
    queryKey: ['course-cohorts', slug],
    queryFn: () => coursesApi.cohorts(slug).then((res) => res.data.data),
    enabled: !!slug,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => coursesApi.categories().then((res) => res.data.data),
    staleTime: 30 * 60 * 1000, // 30 minutes
  })
}

export function useFeaturedCourses() {
  return useQuery({
    queryKey: ['courses', 'featured'],
    queryFn: () => coursesApi.featured().then((res) => res.data.data.results),
  })
}
```

### 4.3 TDD - Phase 4 Tests

**File**: `backend/apps/courses/tests/test_courses.py`
```python
from rest_framework.test import APITestCase
from django.urls import reverse


class TestCourseAPI(APITestCase):
    """Tests for Course API endpoints."""
    
    def test_list_courses(self):
        """Verify course list returns paginated results."""
        pass
    
    def test_filter_by_level(self):
        """Verify filtering by level works."""
        pass
    
    def test_search_courses(self):
        """Verify search functionality."""
        pass
    
    def test_course_detail(self):
        """Verify course detail endpoint."""
        pass
    
    def test_course_cohorts(self):
        """Verify course cohorts endpoint."""
        pass
    
    def test_caching_works(self):
        """Verify responses are cached."""
        pass
```

**File**: `backend/apps/courses/tests/test_soft_delete.py`
```python
from rest_framework.test import APITestCase


class TestSoftDelete(APITestCase):
    """Tests for soft delete functionality."""
    
    def test_delete_sets_is_deleted(self):
        """Verify delete sets is_deleted flag."""
        pass
    
    def test_deleted_not_in_list(self):
        """Verify deleted objects excluded from list."""
        pass
    
    def test_restore_recovers(self):
        """Verify restore functionality."""
        pass
    
    def test_hard_delete_permanent(self):
        """Verify hard_delete removes from DB."""
        pass
```

### 4.4 Phase 4 Checklist

- [ ] Category model with color/icon
- [ ] Course model with all fields
- [ ] CourseModule model for content
- [ ] Cohort model with capacity logic
- [ ] CourseListSerializer with category prefetch
- [ ] CourseDetailSerializer with modules
- [ ] CohortSerializer with computed fields
- [ ] CourseViewSet with filtering/searching
- [ ] CategoryViewSet with caching
- [ ] CohortViewSet with filtering
- [ ] Cache invalidation signals
- [ ] Frontend useCourses hook
- [ ] Frontend useCourse hook
- [ ] Frontend useCategories hook
- [ ] All course tests passing
- [ ] All soft delete tests passing

### 4.5 Dependencies

- Phase 3: Authentication System
- Phase 2: Backend Core

---

## Phase 5: Enrollment & Payments

**Objective**: Implement enrollment system with capacity management and Stripe payment processing.

**Duration**: 10-12 hours

### 5.1 Files to Create

#### Enrollment App

**File**: `backend/apps/enrollments/models.py`
```python
from django.db import models, transaction
from django.core.exceptions import ValidationError
from common.models import SoftDeleteModel


class Enrollment(SoftDeleteModel):
    """User enrollment in a course cohort."""
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]
    
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey('courses.Course', on_delete=models.CASCADE, related_name='enrollments')
    cohort = models.ForeignKey('courses.Cohort', on_delete=models.CASCADE, related_name='enrollments')
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    amount_paid = models.DecimalField(max_digits=10, decimal_places=2)
    stripe_payment_intent_id = models.CharField(max_length=100, blank=True)
    
    # Timestamps
    enrolled_at = models.DateTimeField(auto_now_add=True)
    confirmed_at = models.DateTimeField(null=True, blank=True)
    cancelled_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'enrollments'
        unique_together = ['user', 'cohort']
    
    def save(self, *args, **kwargs):
        is_new = self._state.adding
        
        if is_new:
            self._validate_capacity()
            self._reserve_spot()
        
        super().save(*args, **kwargs)
    
    def _validate_capacity(self):
        """Check if cohort has available spots."""
        if self.cohort.spots_remaining <= 0:
            raise ValidationError('This cohort is full. Please join the waitlist.')
    
    @transaction.atomic
    def _reserve_spot(self):
        """Atomically reserve a spot in the cohort."""
        cohort = Cohort.objects.select_for_update().get(pk=self.cohort.pk)
        cohort.spots_reserved += 1
        cohort.save()
    
    @transaction.atomic
    def cancel(self):
        """Cancel enrollment and release spot."""
        if self.status == 'cancelled':
            raise ValidationError('Enrollment is already cancelled')
        
        self.status = 'cancelled'
        self.cancelled_at = timezone.now()
        self.save()
        
        # Release spot
        cohort = Cohort.objects.select_for_update().get(pk=self.cohort.pk)
        cohort.spots_reserved -= 1
        cohort.save()
```

**File**: `backend/apps/enrollments/serializers.py`
```python
from rest_framework import serializers
from .models import Enrollment


class EnrollmentSerializer(serializers.ModelSerializer):
    course_title = serializers.CharField(source='course.title', read_only=True)
    course_slug = serializers.SlugField(source='course.slug', read_only=True)
    cohort_details = serializers.SerializerMethodField()
    
    class Meta:
        model = Enrollment
        fields = [
            'id', 'course', 'course_title', 'course_slug', 'cohort', 'cohort_details',
            'status', 'amount_paid', 'enrolled_at', 'confirmed_at'
        ]
        read_only_fields = ['status', 'confirmed_at', 'enrolled_at']
    
    def get_cohort_details(self, obj):
        from courses.serializers import CohortSerializer
        return CohortSerializer(obj.cohort).data
    
    def validate(self, data):
        user = self.context['request'].user
        cohort = data['cohort']
        
        # Check if already enrolled
        if Enrollment.objects.filter(
            user=user, cohort=cohort, is_deleted=False
        ).exclude(status='cancelled').exists():
            raise serializers.ValidationError(
                'You are already enrolled in this cohort.'
            )
        
        return data


class EnrollmentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = ['course', 'cohort', 'amount_paid']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
```

**File**: `backend/apps/enrollments/views.py`
```python
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Enrollment
from .serializers import EnrollmentSerializer, EnrollmentCreateSerializer


class EnrollmentViewSet(viewsets.ModelViewSet):
    """Enrollment API for managing user enrollments."""
    
    permission_classes = [IsAuthenticated]
    serializer_class = EnrollmentSerializer
    
    def get_queryset(self):
        """Return only user's enrollments."""
        return Enrollment.objects.filter(
            user=self.request.user,
            is_deleted=False
        ).select_related('course', 'cohort')
    
    def get_serializer_class(self):
        if self.action == 'create':
            return EnrollmentCreateSerializer
        return EnrollmentSerializer
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Cancel an enrollment."""
        enrollment = self.get_object()
        
        try:
            enrollment.cancel()
            return Response({
                'success': True,
                'data': {'status': enrollment.status},
                'message': 'Enrollment cancelled successfully'
            })
        except Exception as e:
            return Response({
                'success': False,
                'message': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
```

#### Payments App

**File**: `backend/apps/payments/services.py`
```python
import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY


class StripeService:
    """Service for Stripe payment operations."""
    
    @staticmethod
    def create_payment_intent(enrollment, user):
        """Create a PaymentIntent for enrollment."""
        amount_cents = int(enrollment.amount_paid * 100)
        
        intent = stripe.PaymentIntent.create(
            amount=amount_cents,
            currency=enrollment.course.currency.lower(),
            metadata={
                'enrollment_id': str(enrollment.id),
                'user_id': str(user.id),
                'course': enrollment.course.title,
            },
            automatic_payment_methods={'enabled': True},
        )
        
        return intent
    
    @staticmethod
    def construct_event(payload, sig_header, secret):
        """Verify webhook signature and construct event."""
        try:
            return stripe.Webhook.construct_event(
                payload, sig_header, secret
            )
        except ValueError:
            raise Exception('Invalid payload')
        except stripe.error.SignatureVerificationError:
            raise Exception('Invalid signature')
    
    @staticmethod
    def handle_payment_succeeded(payment_intent):
        """Handle successful payment webhook."""
        enrollment_id = payment_intent.metadata.get('enrollment_id')
        
        if enrollment_id:
            from enrollments.models import Enrollment
            enrollment = Enrollment.objects.get(id=enrollment_id)
            enrollment.status = 'confirmed'
            enrollment.confirmed_at = timezone.now()
            enrollment.stripe_payment_intent_id = payment_intent.id
            enrollment.save()
            
            # Update course stats
            enrollment.course.enrolled_count += 1
            enrollment.course.save()
```

**File**: `backend/apps/payments/views.py`
```python
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from apps.enrollments.models import Enrollment
from .services import StripeService


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_payment_intent(request):
    """Create Stripe PaymentIntent for enrollment."""
    enrollment_id = request.data.get('enrollment_id')
    
    if not enrollment_id:
        return Response({
            'success': False,
            'message': 'enrollment_id is required'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    enrollment = get_object_or_404(
        Enrollment,
        id=enrollment_id,
        user=request.user,
        status='pending'
    )
    
    try:
        intent = StripeService.create_payment_intent(enrollment, request.user)
        
        return Response({
            'success': True,
            'data': {
                'client_secret': intent.client_secret,
                'payment_intent_id': intent.id,
                'status': intent.status,
            },
            'message': 'Payment intent created successfully'
        })
    except Exception as e:
        return Response({
            'success': False,
            'message': f'Stripe error: {str(e)}'
        }, status=status.HTTP_502_BAD_GATEWAY)


@api_view(['POST'])
def stripe_webhook(request):
    """Handle Stripe webhook events."""
    payload = request.body
    sig_header = request.headers.get('Stripe-Signature')
    
    try:
        event = StripeService.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
        
        if event['type'] == 'payment_intent.succeeded':
            StripeService.handle_payment_succeeded(event['data']['object'])
        
        return Response({'status': 'success'})
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_400_BAD_REQUEST
        )
```

### 5.2 Frontend Payment Integration

**File**: `frontend/src/services/api/payments.ts`
```typescript
import apiClient from './client'

export const paymentsApi = {
  createIntent: (enrollmentId: string) =>
    apiClient.post('/payments/create-intent/', { enrollment_id: enrollmentId }),
  
  getStatus: (enrollmentId: string) =>
    apiClient.get(`/payments/${enrollmentId}/status/`),
}
```

**File**: `frontend/src/components/payment/StripeProvider.tsx`
```typescript
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export function StripeProvider({ children }: { children: React.ReactNode }) {
  return <Elements stripe={stripePromise}>{children}</Elements>
}
```

**File**: `frontend/src/components/payment/PaymentForm.tsx`
```typescript
import { useState } from 'react'
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'

interface PaymentFormProps {
  clientSecret: string
  onSuccess: () => void
  onError: (error: string) => void
}

export function PaymentForm({ clientSecret, onSuccess, onError }: PaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!stripe || !elements) {
      return
    }
    
    setIsLoading(true)
    
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/enrollment/success`,
      },
    })
    
    if (error) {
      onError(error.message || 'Payment failed')
    } else {
      onSuccess()
    }
    
    setIsLoading(false)
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button type="submit" disabled={!stripe || isLoading} className="w-full">
        {isLoading ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  )
}
```

**File**: `frontend/src/hooks/usePayment.ts`
```typescript
import { useMutation, useQuery } from '@tanstack/react-query'
import { paymentsApi } from '@/services/api/payments'

export function useCreatePaymentIntent() {
  return useMutation({
    mutationFn: (enrollmentId: string) =>
      paymentsApi.createIntent(enrollmentId).then((res) => res.data.data),
  })
}

export function usePaymentStatus(enrollmentId: string) {
  return useQuery({
    queryKey: ['payment-status', enrollmentId],
    queryFn: () => paymentsApi.getStatus(enrollmentId).then((res) => res.data.data),
    enabled: !!enrollmentId,
    refetchInterval: 5000, // Poll every 5 seconds
  })
}
```

### 5.3 Phase 5 Checklist

- [ ] Enrollment model with capacity validation
- [ ] Enrollment atomic spot reservation
- [ ] Enrollment serializers with validation
- [ ] EnrollmentViewSet with cancel action
- [ ] Stripe PaymentIntent creation
- [ ] Stripe webhook handler
- [ ] Payment verification on webhook
- [ ] Frontend StripeProvider
- [ ] Frontend PaymentForm component
- [ ] Frontend payment hooks
- [ ] All enrollment tests passing
- [ ] All payment tests passing

### 5.4 Dependencies

- Phase 4: Course Management
- Phase 3: Authentication System

---

## Phase 6: Frontend Foundation

**Objective**: Set up complete frontend foundation including Tailwind v4 theming, global styles, and utilities.

**Duration**: 6-8 hours

### 6.1 Files to Create

#### Tailwind v4 Configuration

**File**: `frontend/src/app/globals.css`
```css
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
  --color-error: #DC2626;
  --color-error-bg: #FEF2F2;
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
  
  /* Typography */
  --font-sans: "DM Sans", system-ui, sans-serif;
  --font-mono: "Space Mono", "JetBrains Mono", monospace;
  
  /* Spacing */
  --spacing-18: 4.5rem;
  --spacing-88: 22rem;
  --spacing-section: 6rem;
  
  /* Border Radius */
  --radius-card: 14px;
  --radius-button: 10px;
  --radius-badge: 4px;
  --radius-sharp: 0px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  
  /* Animations */
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
```

#### Utility Functions

**File**: `frontend/src/lib/utils.ts`
```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
  amount: number,
  currency: string = 'USD'
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate)
  const end = new Date(endDate)
  
  const sameMonth = start.getMonth() === end.getMonth()
  const sameYear = start.getFullYear() === end.getFullYear()
  
  if (sameMonth && sameYear) {
    return `${start.getDate()}–${end.getDate()} ${start.toLocaleString('en-US', { month: 'short' })} ${start.getFullYear()}`
  }
  
  return `${formatDate(startDate)} – ${formatDate(endDate)}`
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}
```

#### Animation Variants

**File**: `frontend/src/styles/animations.ts`
```typescript
import { Variants } from 'framer-motion'

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  }
}

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.2 }
  }
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

export const vendorColorMap: Record<string, string> = {
  solarwinds: '#F27A1A',
  securden: '#2BBCB3',
  quest: '#3B82F6',
  ivanti: '#7C3AED',
}
```

#### Custom Hooks

**File**: `frontend/src/hooks/useReducedMotion.ts`
```typescript
import { useState, useEffect } from 'react'

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }
    
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])
  
  return prefersReducedMotion
}
```

**File**: `frontend/src/hooks/useScrollSpy.ts`
```typescript
import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string>('')
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset
      
      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])
  
  return activeSection
}
```

**File**: `frontend/src/hooks/useDebounce.ts`
```typescript
import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState(value)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [value, delay])
  
  return debouncedValue
}
```

### 6.2 Phase 6 Checklist

- [ ] Tailwind v4 CSS file with complete theme
- [ ] Base styles with DM Sans font
- [ ] Custom utilities for cards, buttons, sections
- [ ] cn() utility for class merging
- [ ] formatCurrency utility
- [ ] formatDate utilities
- [ ] Animation variants for Framer Motion
- [ ] useReducedMotion hook
- [ ] useScrollSpy hook
- [ ] useDebounce hook
- [ ] All utility tests passing

### 6.3 Dependencies

- Phase 1: Foundation & Setup

---

## Phase 7: Frontend UI Components

**Objective**: Build complete Shadcn-style UI component library with customization for iTrust brand.

**Duration**: 10-12 hours

### 7.1 Files to Create

#### Core UI Components

**File**: `frontend/src/components/ui/button.tsx`
```typescript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand-orange text-white hover:bg-brand-orange-hover",
        secondary: "bg-white text-text-dark border border-border-default hover:bg-bg-gray",
        ghost: "hover:bg-bg-gray",
        link: "text-brand-orange underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-[10px]",
        sm: "h-9 px-3 rounded-[8px]",
        lg: "h-11 px-8 rounded-[10px] text-base",
        icon: "h-10 w-10 rounded-[10px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
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
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

**File**: `frontend/src/components/ui/card.tsx`
```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[14px] border border-border-default bg-white",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-7", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-7 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardContent }
```

**File**: `frontend/src/components/ui/dialog.tsx`
```typescript
import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogPortal = DialogPrimitive.Portal

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border-default bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-[14px]",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-bg-gray data-[state=open]:text-text-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

export { Dialog, DialogTrigger, DialogContent }
```

**File**: `frontend/src/components/ui/input.tsx`
```typescript
import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-[10px] border border-border-default bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
```

**File**: `frontend/src/components/ui/sheet.tsx`
```typescript
import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const Sheet = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close
const SheetPortal = SheetPrimitive.Portal

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-white p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
}
```

**File**: `frontend/src/components/ui/badge.tsx`
```typescript
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-[4px] border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-brand-orange text-white hover:bg-brand-orange-hover",
        secondary:
          "border-transparent bg-bg-gray text-text-dark hover:bg-bg-gray/80",
        success:
          "border-success-border bg-success-bg text-success",
        outline:
          "text-text-dark",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```

**File**: `frontend/src/components/ui/accordion.tsx`
```typescript
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
```

### 7.2 Phase 7 Checklist

- [ ] Button component with variants
- [ ] Card component with Header/Title/Content
- [ ] Dialog component with Overlay/Content
- [ ] Input component with focus states
- [ ] Sheet component for mobile nav
- [ ] Badge component with variants
- [ ] Accordion component for collapsible sections
- [ ] All components using brand colors
- [ ] Focus rings with brand-orange
- [ ] All components accessible (ARIA)
- [ ] All component tests passing

### 7.3 Dependencies

- Phase 6: Frontend Foundation

---

## Phase 8: Frontend Pages & Sections

**Objective**: Build all 8 page sections with animations, responsive design, and API integration.

**Duration**: 16-20 hours

### 8.1 Files to Create

#### Layout Components

**File**: `frontend/src/components/layout/Header.tsx`
- Sticky header with scroll behavior
- Logo on left
- Desktop navigation (hidden on mobile)
- "Enroll Now" CTA button
- Mobile hamburger menu trigger

**File**: `frontend/src/components/layout/DesktopNav.tsx`
- Horizontal navigation links
- Active state highlighting
- Smooth scroll to sections

**File**: `frontend/src/components/layout/MobileNav.tsx`
```typescript
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#courses', label: 'Courses' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  
  useEffect(() => {
    setOpen(false)
  }, [location])
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] p-0">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-border-default">
            <span className="font-semibold">Navigation</span>
          </div>
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-lg font-medium rounded-lg hover:bg-bg-gray transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t border-border-default">
            <Button className="w-full">Enroll Now</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
```

**File**: `frontend/src/components/layout/Footer.tsx`
- 5-column layout
- Course links
- Vendor links
- Resources
- Company info
- Professional services
- Bottom bar with copyright

#### Page Sections

**File**: `frontend/src/components/sections/Hero.tsx`
- "NOW ENROLLING — Q2 2026" badge
- "Advance Your IT Career. Get Certified." heading
- Description paragraph
- Two CTA buttons
- 4 stat badges (animated)
- Framer Motion animations

**File**: `frontend/src/components/sections/VendorCards.tsx`
- "AUTHORIZED TRAINING PARTNER" label
- "Training Across Leading IT Platforms" heading
- 4 vendor cards (SolarWinds, Securden, Quest, Ivanti)
- Colored top borders
- Expandable descriptions
- Accordion functionality

**File**: `frontend/src/components/sections/FeaturesGrid.tsx`
- "WHY CHOOSE US" label
- "Training That Gets Results" heading
- 6 feature cards in grid
- Emoji icons
- Hover animations

**File**: `frontend/src/components/sections/FeaturedCourse.tsx`
- "FEATURED COURSE · SOLARWINDS" label
- "SCP Observability Self-Hosted Fundamentals" title
- Course description
- 3 module cards with expandable content
- Right sidebar: Exam Domains table, What's Included list
- CTA button

**File**: `frontend/src/components/sections/TrainingSchedule.tsx`
- "UPCOMING TRAINING" label
- "Next Public Course Dates" heading
- Schedule cards with:
  - Vendor name
  - Course title
  - Date, Location, Status badge
- Orange left border accent
- "View Full Schedule" CTA

**File**: `frontend/src/components/sections/ProfessionalServices.tsx`
- "iTRUSTECH PROFESSIONAL SERVICES" label
- "Beyond Training — We're Here to Help" heading
- 5 service cards
- External links to itrustech.com
- Bottom note

#### Pages

**File**: `frontend/src/pages/Home.tsx`
```typescript
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { VendorCards } from '@/components/sections/VendorCards'
import { FeaturesGrid } from '@/components/sections/FeaturesGrid'
import { FeaturedCourse } from '@/components/sections/FeaturedCourse'
import { TrainingSchedule } from '@/components/sections/TrainingSchedule'
import { ProfessionalServices } from '@/components/sections/ProfessionalServices'

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="courses" className="bg-bg-gray">
          <VendorCards />
        </section>
        <section id="features">
          <FeaturesGrid />
        </section>
        <section id="featured-course">
          <FeaturedCourse />
        </section>
        <section id="schedule" className="bg-bg-gray">
          <TrainingSchedule />
        </section>
        <section id="services">
          <ProfessionalServices />
        </section>
      </main>
      <Footer />
    </div>
  )
}
```

**File**: `frontend/src/pages/CoursesPage.tsx`
- Course list page
- Filter sidebar
- Search functionality
- Course cards grid

**File**: `frontend/src/pages/CourseDetailPage.tsx`
- Individual course page
- Course information
- Cohort selection
- Enrollment CTA

**File**: `frontend/src/pages/LoginPage.tsx`
- Login form
- Email/password fields
- Form validation with Zod
- Error handling

**File**: `frontend/src/pages/RegisterPage.tsx`
- Registration form
- All required fields
- Validation
- Auto-login after success

### 8.2 Phase 8 Checklist

- [ ] Header with sticky behavior
- [ ] DesktopNav with active states
- [ ] MobileNav with Sheet component
- [ ] Footer with 5 columns
- [ ] Hero section with animations
- [ ] VendorCards with accordion
- [ ] FeaturesGrid with 6 cards
- [ ] FeaturedCourse with modules
- [ ] TrainingSchedule with cards
- [ ] ProfessionalServices section
- [ ] Home page composing all sections
- [ ] Courses list page
- [ ] Course detail page
- [ ] Login page with form
- [ ] Register page with form
- [ ] All pages responsive
- [ ] All animations working
- [ ] All sections accessible

### 8.3 Dependencies

- Phase 7: Frontend UI Components
- Phase 4: Course Management (for API data)
- Phase 3: Authentication (for auth pages)

---

## Phase 9: Integration & Testing

**Objective**: Complete end-to-end integration, write comprehensive tests, and ensure quality.

**Duration**: 8-10 hours

### 9.1 Files to Create

#### Test Files

**File**: `backend/apps/courses/tests/test_caching.py`
```python
from django.test import TestCase
from django.core.cache import cache


class TestCaching(TestCase):
    """Tests for cache behavior."""
    
    def test_course_list_cached(self):
        """Verify course list responses are cached."""
        pass
    
    def test_cache_invalidated_on_save(self):
        """Verify cache cleared on model save."""
        pass
    
    def test_course_detail_cached(self):
        """Verify course detail cached separately."""
        pass
```

**File**: `frontend/tests/unit/components/Button.test.tsx`
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders with default variant', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
  
  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByText('Secondary')).toHaveClass('bg-white')
  })
  
  it('shows loading state', () => {
    render(<Button loading>Loading</Button>)
    expect(screen.getByText('Loading')).toBeDisabled()
  })
})
```

**File**: `frontend/tests/e2e/home.spec.ts`
```typescript
import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })
  
  test('displays hero section', async ({ page }) => {
    await expect(page.getByText('Advance Your IT Career')).toBeVisible()
  })
  
  test('navigation works', async ({ page }) => {
    await page.getByText('Courses').click()
    await expect(page).toHaveURL(/.*courses/)
  })
  
  test('mobile menu opens', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.getByLabel('Open menu').click()
    await expect(page.getByText('Navigation')).toBeVisible()
  })
})
```

### 9.2 Phase 9 Checklist

- [ ] Frontend API integration complete
- [ ] Backend API endpoints tested
- [ ] Frontend unit tests > 80%
- [ ] Integration tests for auth
- [ ] Integration tests for courses
- [ ] Integration tests for enrollment
- [ ] E2E tests for critical paths
- [ ] Manual QA on mobile
- [ ] Manual QA on tablet
- [ ] Manual QA on desktop
- [ ] Accessibility audit
- [ ] Performance audit (Lighthouse > 90)
- [ ] Security audit
- [ ] All tests passing

### 9.3 Dependencies

- Phase 8: Frontend Pages
- Phase 5: Enrollment & Payments
- Phase 4: Course Management
- Phase 3: Authentication

---

## Phase 10: Deployment Preparation

**Objective**: Prepare for production deployment with Docker, CI/CD, and final optimizations.

**Duration**: 6-8 hours

### 10.1 Files to Create

**File**: `docker-compose.yml`
```yaml
version: '3.8'

services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: itrust_academy
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/itrust_academy
      REDIS_URL: redis://redis:6379/0
    depends_on:
      - db
      - redis
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
      - media_files:/app/media

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    environment:
      - VITE_API_URL=http://localhost:8000/api/v1

volumes:
  postgres_data:
  media_files:
```

**File**: `backend/Dockerfile`
```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements/production.txt .
RUN pip install --no-cache-dir -r production.txt

# Copy project
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

EXPOSE 8000

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "4", "academy.wsgi:application"]
```

**File**: `frontend/Dockerfile`
```dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci

# Copy project
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
```

**File**: `.github/workflows/ci.yml`
```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432
      
      redis:
        image: redis:7
        ports:
          - 6379:6379
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements/development.txt
      
      - name: Run tests
        env:
          DATABASE_URL: postgres://postgres:postgres@localhost:5432/test
          REDIS_URL: redis://localhost:6379/0
        run: |
          cd backend
          python manage.py test --verbosity=2

  frontend-tests:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      
      - name: Install dependencies
        run: |
          cd frontend
          npm ci
      
      - name: Run linter
        run: |
          cd frontend
          npm run lint
      
      - name: Run tests
        run: |
          cd frontend
          npm run test
```

### 10.2 Phase 10 Checklist

- [ ] Docker Compose configuration
- [ ] Backend Dockerfile
- [ ] Frontend Dockerfile
- [ ] .dockerignore files
- [ ] GitHub Actions CI workflow
- [ ] Environment variable templates
- [ ] Production settings finalized
- [ ] Static files collection configured
- [ ] Database migration scripts
- [ ] Health check endpoints
- [ ] Documentation complete
- [ ] README with setup instructions

### 10.3 Dependencies

- Phase 9: Integration & Testing

---

## Summary

### Total Estimated Effort

| Phase | Duration | Files |
|-------|----------|-------|
| Phase 1: Foundation | 4-6 hrs | ~15 files |
| Phase 2: Backend Core | 8-10 hrs | ~20 files |
| Phase 3: Authentication | 6-8 hrs | ~15 files |
| Phase 4: Course Management | 12-14 hrs | ~25 files |
| Phase 5: Enrollment & Payments | 10-12 hrs | ~20 files |
| Phase 6: Frontend Foundation | 6-8 hrs | ~15 files |
| Phase 7: Frontend UI Components | 10-12 hrs | ~20 files |
| Phase 8: Frontend Pages & Sections | 16-20 hrs | ~30 files |
| Phase 9: Integration & Testing | 8-10 hrs | ~25 files |
| Phase 10: Deployment Preparation | 6-8 hrs | ~10 files |
| **Total** | **96-118 hrs** | **~215 files** |

### Success Metrics

- **Test Coverage**: > 90% backend, > 80% frontend
- **Performance**: Lighthouse score > 90
- **Accessibility**: WCAG AAA compliance
- **Security**: All OWASP Top 10 addressed
- **Code Quality**: No linting errors
- **Documentation**: Complete API docs, setup guides

### Next Steps

1. Review and approve this plan
2. Execute Phase 1
3. Continue through Phase 10
4. Conduct final QA
5. Deploy to production

---

**Document Version**: 1.0.0  
**Last Updated**: 2026-03-27  
**Status**: Ready for Execution
