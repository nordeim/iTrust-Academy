# API Integration Remediation Plan - iTrust Academy

> **Strategic Roadmap for Backend API Connectivity**
> **Project**: iTrust Academy
> **Date**: March 28, 2026
> **Phases**: 1. Infrastructure, 2. Auth, 3. Catalog, 4. Features, 5. Refinement

---

## Phase 1: Infrastructure Foundations (The "Plumbing")
**Goal**: Establish the base connectivity layer for all subsequent API work.

### 1.1 Query Provider Initialization
- [ ] Initialize `QueryClient` and `QueryClientProvider` in `src/main.tsx`.
- [ ] Configure global defaults for `retry` and `staleTime`.

### 1.2 Base API Client Creation
- [ ] Create `src/services/api/client.ts`.
- [ ] Implement `apiClient` as a pre-configured `axios` instance using `API_URL`.
- [ ] Implement **Request Interceptor** to inject JWT `Authorization: Bearer <token>`.
- [ ] Implement **Response Interceptor** to unwrap the standardized JSON envelope.

### 1.3 Global Error Handling
- [ ] Implement a global error interceptor to handle `AUTHENTICATION_ERROR` by triggering token refresh or redirecting to login.

---

## Phase 2: Authentication & Identity Management
**Goal**: Secure the application and manage user state.

### 2.1 Zustand Auth Store
- [ ] Create `src/store/useAuthStore.ts`.
- [ ] Implement persistence for `accessToken`, `refreshToken`, and `user` object.

### 2.2 Auth Service Layer
- [ ] Implement `POST /auth/token/` (login).
- [ ] Implement `POST /auth/token/refresh/` (refresh).
- [ ] Implement `POST /auth/register/` (signup).
- [ ] Implement `GET /users/me/` (profile fetching).

### 2.3 Auth UI Components
- [ ] Create `LoginModal` and `RegisterModal` using `radix-ui/react-dialog`.
- [ ] Update `Header.tsx` to show "Login/Register" or "User Menu" based on auth state.

---

## Phase 3: Course Discovery Integration
**Goal**: Replace static data with real-time catalog from the backend.

### 3.1 Course & Category Services
- [ ] Implement `GET /courses/` with search and ordering parameters.
- [ ] Implement `GET /categories/` for filter bar population.
- [ ] Create `useCourses` and `useCategories` custom hooks.

### 3.2 Dynamic Course Catalog
- [ ] Refactor `CourseCatalog.tsx` to utilize `useCourses` hook.
- [ ] Implement **Pagination Controls** using metadata from `meta.pagination`.
- [ ] Ensure `CourseCard.tsx` maps `snake_case` API data to internal props.

---

## Phase 4: Feature-Level Synchronization
**Goal**: Implement business-critical enrollment and payment flows.

### 4.1 Enrollment Management
- [ ] Implement `POST /enrollments/` and `GET /enrollments/`.
- [ ] Implement `createEnrollment` mutation in `src/hooks/useEnrollments.ts`.

### 4.2 Stripe Payment Integration
- [ ] Implement `POST /payments/create-intent/` in `src/services/api/payments.ts`.
- [ ] Finalize `src/hooks/usePayment.ts` to manage Stripe client secrets and intent states.

---

## Phase 5: Verification & Refinement
**Goal**: Ensure production-grade stability and UX.

### 5.1 Quality Assurance (QA)
- [ ] Run `npm run build` to verify type-safety of API integrations.
- [ ] Perform E2E tests using Playwright to verify full login-to-enrollment flows.

### 5.2 UX Polishing
- [ ] Add **Skeleton States** for `CourseCatalog` loading.
- [ ] Implement **Sonner Toasts** for success/error feedback on mutations.
- [ ] Implement **Optimistic Updates** for enrollment cancellations.

---

## Success Criteria
1. ✅ `npm run build` succeeds with 0 type errors.
2. ✅ User can register, login, and persist their session across reloads.
3. ✅ Course catalog dynamically reflects backend database state.
4. ✅ Enrollment flow successfully creates records in the backend database.
