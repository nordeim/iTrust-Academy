# E2E Test Plan - User Accounts & Course Discovery

> **Date**: March 29, 2026
> **Project**: iTrust Academy
> **Target URL**: http://localhost:5174/
> **Backend URL**: http://localhost:8000/api/v1/
> **Status**: UI-Complete Validation

---

## 📋 Test Plan Overview

This plan validates the end-to-end user journey from initial discovery to account creation and authenticated state. With the implementation of the Authentication UI (Milestone 7), we now transition from hybrid testing to **Full UI Validation**.

---

## 🧪 Suite 1: User Identity & Session (UI Level)

**Objective**: Confirm that the modal-based authentication system correctly manages user identity and JWT lifecycle.

### Test Case: UI-101 - User Registration
- **Given**: User is a guest on the landing page.
- **When**: User clicks "Register" in the header, fills the 6-field form correctly, and submits.
- **Then**: Register modal should close, a success toast should appear, and the header should show the `UserNav` (avatar).
- **Verify**: `itrust-auth` key in `localStorage` contains valid tokens.

### Test Case: UI-102 - User Login
- **Given**: User has an existing account.
- **When**: User clicks "Sign In", enters valid credentials, and submits.
- **Then**: Login modal should close and the authenticated UI state should be active.

### Test Case: UI-103 - Form Validation (Zod)
- **Given**: Auth modals are open.
- **When**: User submits empty fields or invalid email formats.
- **Then**: Red validation messages should appear below inputs, and the submit button should remain in a non-loading state.

---

## 🧪 Suite 2: Course Browsing & Discovery (UI Level)

**Objective**: Verify that the Course Catalog correctly fetches and displays data from the live API.

### Test Case: UI-201 - Initial Catalog Load
- **Given**: User navigates to the homepage.
- **When**: Page loads and scrolls to `#courses`.
- **Then**: Course cards should render with data from the API (Title, Price, Rating).
- **Verify**: API loading skeleton displays then disappears.

### Test Case: UI-202 - Category Filtering
- **Given**: Course catalog is loaded.
- **When**: User clicks a category filter button (e.g., "Security").
- **Then**: The grid should update to show only courses belonging to that category.

---

## 🧪 Suite 3: Contextual Action Interception (UI Level)

**Objective**: Validate the "Action Interception" logic for high-conversion guest flows.

### Test Case: UI-301 - Guest Enrollment Trigger
- **Given**: User is NOT authenticated.
- **When**: User clicks "Enroll Now" on a Course Card.
- **Then**: Instead of enrolling, the `LoginModal` should automatically open.
- **Verify**: Modal title says "Welcome Back" or "Sign in to Enroll".

---

## 🛠️ Tools & Evidence

- **Tool**: `playwright` (Python Sync API)
- **Evidence**:
    - `auth-registration-flow.png`
    - `auth-validation-errors.png`
    - `catalog-api-integration.png`
    - `action-interception-modal.png`

---

## ✅ Success Criteria

- [ ] User can create an account and log in via UI modals.
- [ ] Session persists after a page reload.
- [ ] Course data is dynamically populated from the Django backend.
- [ ] Guest actions (Enroll) correctly trigger the auth flow.
- [ ] 0 console errors during the entire user journey.
