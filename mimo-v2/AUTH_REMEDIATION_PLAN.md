# Auth Remediation Plan: Identity & Session Management

> **Project**: iTrust Academy - Enterprise IT Training Platform
> **Architecture**: React 19 + TypeScript + Zustand + Radix UI Dialog
> **Objective**: Implement a logical, modal-based authentication system for high-conversion user flows.

---

## 1. UX Design Strategy: "Contextual Identity"

### 1.1 Entry Points & Behavior
*   **Header (Guest)**: Replace the generic "Get Started" with a dual-action set: `[ Sign In ]` (Ghost) and `[ Register ]` (Primary).
*   **Header (Authenticated)**: Show a user avatar with a dropdown menu: `[ Profile ]`, `[ My Courses ]`, `[ Logout ]`.
*   **Action Interception**: If an anonymous user clicks "Enroll Now" or "Schedule Consultation", trigger the `LoginModal` instead of scrolling.
*   **Modal-First Approach**: Use Radix UI `Dialog` for Login/Register to keep users on the landing page and maintain their scroll position.

### 1.2 Form Hierarchy
*   **Login**: Email + Password + "Remember Me" toggle.
*   **Register**: First Name + Last Name + Username + Email + Password + Password Confirm.
*   **Feedback**: Standardized Sonner toasts for `Success` and `Error`.

---

## 2. Infrastructure Foundations

### 2.1 State Management (Zustand)
*   **Store**: `useAuthStore` (Already exists).
*   **Validation**: Ensure `itrust-auth` localStorage key is working correctly.
*   **Automatic Profile Fetch**: If `accessToken` exists on mount but `user` is null, call `getCurrentUser()`.

### 2.2 API Layer (Axios)
*   **Interceptors**: `apiClient` already handles token injection and 401 refresh logic.
*   **Transformers**: Ensure `BackendUser` (snake_case) is correctly mapped to `User` (camelCase).

---

## 3. Implementation Roadmap

### Phase 1: Atomic UI Components
1.  **Dialog Primitive**: Create `src/components/ui/dialog.tsx` using Radix UI.
2.  **Auth Modals**: 
    *   `src/components/forms/login-modal.tsx`
    *   `src/components/forms/register-modal.tsx`
3.  **User Dropdown**:
    *   `src/components/layout/user-nav.tsx`

### Phase 2: Logic Integration
1.  **Hooks**: 
    *   Implement `useLogin` and `useRegister` mutations in `src/hooks/useAuth.ts`.
    *   Implement `useCheckAuth` to handle session restoration on mount.
2.  **Header Refactoring**:
    *   Update `Header.tsx` to conditionally render Guest CTAs or `UserNav`.
    *   Sync `MobileNav` with the same logic.

### Phase 3: Conversational Triggers
1.  **Intercept Actions**: Update `CourseCard` and `ProfessionalServices` to check `isAuthenticated` before triggering scroll or navigation.

---

## 4. Technical Integrity & Validation

### 4.1 Security Checks
*   [ ] Tokens stored in `localStorage` are cleared on `logout()`.
*   [ ] 401 response from any endpoint triggers silent refresh.
*   [ ] Sensitive data (passwords) handled only via `react-hook-form` + `zod`.

### 4.2 Accessibility (WCAG AAA)
*   [ ] Dialogs manage focus (auto-focus first input).
*   [ ] "Escape" key closes modals.
*   [ ] `aria-label` present on all auth inputs.

---

**Validated Against Codebase**: March 29, 2026. Aligned with established `apiClient` and `useAuthStore` patterns.
