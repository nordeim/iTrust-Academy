# Auth UI Implementation Plan - TDD Approach

> **Date**: March 29, 2026
> **Status**: Ready for Execution
> **Approach**: Test-Driven Development (TDD)

---

## 📋 Current State Analysis

### ✅ Already Implemented (Backend)
| Component | File | Status |
|-----------|------|--------|
| Auth API Service | `src/services/api/auth.ts` | ✅ Ready |
| Auth Store | `src/store/useAuthStore.ts` | ✅ Ready |
| Auth Hooks | `src/hooks/useAuth.ts` | ✅ Ready |
| JWT Interceptors | `src/services/api/client.ts` | ✅ Ready |

### ❌ Missing UI Components
| Component | File | Purpose |
|-----------|------|---------|
| Dialog Primitive | `src/components/ui/dialog.tsx` | Radix UI dialog wrapper |
| Login Modal | `src/components/forms/login-modal.tsx` | User login form |
| Register Modal | `src/components/forms/register-modal.tsx` | User registration form |
| User Navigation | `src/components/layout/user-nav.tsx` | Authenticated user dropdown |

---

## 🔧 Implementation Plan (TDD)

### Phase 1: Create Dialog Primitive (Radix UI)
**Test**: Dialog opens and closes correctly
**File**: `src/components/ui/dialog.tsx`

### Phase 2: Create Login Modal
**Test**: Form validates and submits via useLogin hook
**File**: `src/components/forms/login-modal.tsx`

### Phase 3: Create Register Modal
**Test**: Form validates and submits via useRegister hook
**File**: `src/components/forms/register-modal.tsx`

### Phase 4: Create UserNav Dropdown
**Test**: Shows user info and logout option
**File**: `src/components/layout/user-nav.tsx`

### Phase 5: Update Header
**Test**: Shows Sign In/Register for guests, UserNav for authenticated
**File**: `src/components/layout/header.tsx`

---

## ✅ Success Criteria

- [ ] Login modal opens and authenticates users
- [ ] Register modal creates new users
- [ ] Header shows correct state (guest vs authenticated)
- [ ] JWT tokens persist across page refresh
- [ ] Logout clears tokens and updates UI
- [ ] Build passes with 0 errors

---

**Ready for Execution**
