# Static Assets 404 Remediation Plan

> **Date**: March 29, 2026
> **Status**: Ready for Execution

---

## 📋 Issue Analysis

### Root Cause

The `index.html` file references `/vite.svg` as the favicon, but:
- `vite.svg` exists in `src/assets/` folder (bundled by Vite, not copied to root)
- `favicon.svg` exists in `public/` folder (copied to dist root by Vite)

Vite copies files from `public/` folder to the dist root, but files in `src/assets/` are bundled and hashed.

### Missing Assets Found

| Asset | Location | Status |
|-------|----------|--------|
| `/vite.svg` | Referenced in index.html | ❌ Not in dist root |
| `/favicon.svg` | public/ folder | ✅ Exists |

### API 404 Errors (Expected)

| Endpoint | Reason |
|----------|--------|
| `/api/v1/courses/` | Static server can't proxy to Django |
| `/api/v1/categories/` | Static server can't proxy to Django |

These are **expected** when serving static build without backend proxy.

---

## 🔧 Remediation Plan

### Step 1: Fix Favicon Reference

Change `index.html` to reference `/favicon.svg` instead of `/vite.svg`.

**File**: `index.html`
**Change**: `<link rel="icon" type="image/svg+xml" href="/vite.svg" />`
**To**: `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`

### Step 2: Verify Public Assets

Ensure all required static assets exist in `public/` folder:

| Asset | Purpose |
|-------|---------|
| `favicon.svg` | Browser tab icon |
| `icons.svg` | SVG sprite for icons |

### Step 3: Rebuild and Test

After fixing, rebuild and verify:
- No 404 errors for static assets
- Favicon loads correctly

---

## ✅ Success Criteria

- [ ] Favicon loads without 404
- [ ] No static asset 404 errors
- [ ] Build succeeds
- [ ] Browser shows favicon correctly

---

**Status**: Ready for execution
