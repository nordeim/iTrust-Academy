# Tailwind CSS v4.0 Comprehensive Guide
## Migration, Debugging, & React/shadcn Mobile Navigation

---

## Executive Summary

This guide consolidates four validated reference documents into a single authoritative source for Tailwind CSS v4.0 development. It captures the complete paradigm shift from JavaScript-based configuration to CSS-first architecture, provides battle-tested mobile navigation patterns for both vanilla HTML and React/shadcn stacks, and delivers a systematic debugging methodology for visual discrepancies in production.

The combined approach ensures consistency across all development scenarios while identifying critical pitfalls that cause production failures. All findings have been cross-referenced against official Tailwind CSS v4.0 documentation and validated through real-world troubleshooting scenarios.

---

## Table of Contents

- **Part 1**: V4 Fundamentals & Architecture
- **Part 2**: Migration Playbook (v3.4 → v4.0)
- **Part 3**: Mobile Navigation Patterns
- **Part 4**: Visual Debugging Playbook
- **Part 5**: Anti-Patterns Catalog & Pitfalls
- **Part 6**: Verification Protocols
- **Part 7**: AI Agent Implementation Patterns

---

# PART 1: V4 FUNDAMENTALS & ARCHITECTURE

## 1.1 The CSS-First Paradigm Shift

Tailwind CSS v4.0 represents a fundamental transformation from JavaScript-based configuration to native CSS theming. This architectural change aligns with modern CSS capabilities while delivering substantial performance improvements.

### The Mental Model Transformation

**v3.4 Configuration (Legacy)**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#3B82F6',
          600: '#2563EB'
        }
      },
      fontFamily: {
        display: ['Inter', 'sans-serif']
      }
    }
  }
}
```

**v4.0 Configuration (CSS-First)**
```css
@import "tailwindcss";

@theme {
  --font-display: "Satoshi", "sans-serif";
  --breakpoint-3xl: 1920px;
  --color-brand-500: oklch(0.84 0.18 117.33);
  --color-brand-600: oklch(0.53 0.12 118.34);
  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
}
```

### Critical Understanding Points

The v4.0 approach introduces several paradigm shifts that must be understood:

**Theme Variables as Native CSS Custom Properties**: Unlike v3 where theme values were compiled into utility classes, v4 exposes theme variables as native CSS custom properties. This means utilities like `bg-brand-500` actually reference `var(--color-brand-500)` in the generated CSS.

**Color Space Migration to OKLCH**: v4 defaults to OKLCH color space, which provides better gamut coverage and perceptual uniformity compared to RGB. While hex values still work, OKLCH is preferred for design system tokens.

**Lightning CSS Compilation**: v4 uses Lightning CSS (written in Rust) for compilation, delivering 3.78x faster full builds and 8.8x faster incremental rebuilds compared to v3.

**Zero-Configuration Content Detection**: By default, v4 automatically detects content files without requiring explicit `@source` directives, though explicit configuration remains available for monorepo scenarios.

### Browser Requirements

Tailwind CSS v4.0 requires modern browsers that support modern CSS features:

- Safari 16.4+
- Chrome 111+
- Firefox 128+

Projects requiring older browser support **must remain on v3.4** or implement fallback strategies.

---

## 1.2 Installation & Build Tool Configuration

### Package Dependencies

**Remove v3 Dependencies**
```bash
npm uninstall tailwindcss postcss-import autoprefixer
```

**Install v4 Dependencies**
```bash
# For PostCSS users
npm install tailwindcss@latest @tailwindcss/postcss

# For Vite users (RECOMMENDED - superior performance)
npm install tailwindcss@latest @tailwindcss/vite
```

### PostCSS Configuration (Legacy Approach)

```javascript
// postcss.config.js
export default {
  plugins: ["@tailwindcss/postcss"],
};
```

### Vite Configuration (Recommended)

```javascript
// vite.config.js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

The Vite plugin is recommended over PostCSS because it leverages Lightning CSS directly, eliminating the PostCSS plugin chain overhead.

### CSS Import Directive Migration

**v3.4 Approach (Three Directives)**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**v4.0 Approach (Single Import)**
```css
@import "tailwindcss";
```

The single import replaces all three v3 directives. Import bundling is built-in, eliminating the need for `postcss-import`. Automatic vendor prefixing is handled by Lightning CSS.

---

## 1.3 Theme Configuration & Customization

### @theme Directive Structure

The `@theme` directive defines design tokens that automatically generate corresponding utilities:

```css
@import "tailwindcss";

@theme {
  /* Typography */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-display: "Satoshi", "Inter", sans-serif;
  
  /* Colors - OKLCH color space */
  --color-brand-50: oklch(0.99 0.01 117.33);
  --color-brand-100: oklch(0.97 0.02 117.33);
  --color-brand-500: oklch(0.84 0.18 117.33);
  --color-brand-600: oklch(0.53 0.12 118.34);
  --color-brand-900: oklch(0.21 0.04 118.34);
  
  /* Spacing Scale */
  --spacing-18: 4.5rem;
  --spacing-88: 22rem;
  
  /* Custom Breakpoints */
  --breakpoint-3xl: 1920px;
  
  /* Animation */
  --animate-spin: spin 1s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
}
```

### Theme Variable Access

Variables defined in `@theme` are accessible anywhere in CSS:

```css
/* Direct CSS variable usage */
.card {
  background-color: var(--color-brand-500);
  padding: var(--spacing-4);
  font-family: var(--font-display);
}

/* In arbitrary values */
.btn {
  background: linear-gradient(to right, var(--color-brand-500), var(--color-brand-600));
}
```

### Content Detection & @source Directive

v4.0 uses automatic content detection by default:

```css
/* Automatic detection - no configuration needed */
@import "tailwindcss";

/* Explicit inclusion for non-standard paths */
@import "tailwindcss";
@source "../node_modules/@my-company/ui-lib";
@source "../../legacy-components";
@source "../components/**/*.{ts,tsx,js,jsx}";
```

### JavaScript Config Backward Compatibility

For projects transitioning gradually, v4 can load a legacy `tailwind.config.js`:

```css
@config "../../tailwind.config.js";
@import "tailwindcss";
```

**Not Supported in v4**:
- `corePlugins` option
- `safelist` option (use `@source inline()` instead)
- `separator` option

---

# PART 2: MIGRATION PLAYBOOK (v3.4 → v4.0)

## 2.1 Utility Class Breaking Changes

### Removed Deprecated Utilities

These utilities must be migrated as they cause build failures in v4:

| **Removed v3 Utility** | **v4 Replacement** | **Migration Pattern** |
|------------------------|--------------------|-----------------------|
| `bg-opacity-*` | `bg-black/50` | Opacity modifiers |
| `text-opacity-*` | `text-black/50` | Opacity modifiers |
| `border-opacity-*` | `border-black/50` | Opacity modifiers |
| `ring-opacity-*` | `ring-black/50` | Opacity modifiers |
| `placeholder-opacity-*` | `placeholder-black/50` | Opacity modifiers |
| `flex-shrink-*` | `shrink-*` | Direct rename |
| `flex-grow-*` | `grow-*` | Direct rename |
| `overflow-ellipsis` | `text-ellipsis` | Direct rename |
| `decoration-slice` | `box-decoration-slice` | Direct rename |
| `decoration-clone` | `box-decoration-clone` | Direct rename |

**Migration Example**:
```html
<!-- BEFORE (v3) -->
<div class="bg-red-500 bg-opacity-50 text-white text-opacity-80">
  Content
</div>

<!-- AFTER (v4) -->
<div class="bg-red-500/50 text-white/80">
  Content
</div>
```

### Renamed Utilities for Consistency

v4 introduces explicit naming scales for several utility categories:

| **v3 Utility** | **v4 Utility** | **Reason** |
|----------------|----------------|------------|
| `shadow-sm` | `shadow-xs` | Explicit scale |
| `shadow` | `shadow-sm` | Named values |
| `shadow-md` | `shadow-md` | Unchanged |
| `shadow-lg` | `shadow-lg` | Unchanged |
| `shadow-xl` | `shadow-xl` | Unchanged |
| `drop-shadow-sm` | `drop-shadow-xs` | Consistency |
| `drop-shadow` | `drop-shadow-sm` | Consistency |
| `blur-sm` | `blur-xs` | Explicit scale |
| `blur` | `blur-sm` | Named values |
| `blur-md` | `blur-md` | Unchanged |
| `blur-lg` | `blur-lg` | Unchanged |
| `rounded-sm` | `rounded-xs` | Explicit scale |
| `rounded` | `rounded-sm` | Named values |
| `outline-none` | `outline-hidden` | Semantic clarity |
| `ring` | `ring-3` | Explicit width |

**Migration Example**:
```html
<!-- BEFORE (v3) -->
<input class="shadow rounded outline-none focus:ring" />

<!-- AFTER (v4) -->
<input class="shadow-sm rounded-sm outline-hidden focus:ring-3" />
```

### Gradient Utilities - Major Renaming

The `bg-gradient-*` utilities are renamed to support new gradient types:

```html
<!-- BEFORE (v3) -->
<div class="bg-gradient-to-r from-red-500 to-blue-500"></div>

<!-- AFTER (v4) -->
<div class="bg-linear-to-r from-red-500 to-blue-500"></div>
```

**New Gradient Types Available in v4**:
- `bg-linear-*` - Linear gradients
- `bg-conic-*` - Conic gradients
- `bg-radial-*` - Radial gradients
- `bg-linear-45` - Angle-based gradients

**Gradient Interpolation Modifiers**:
```html
<div class="bg-linear-to-r/oklch from-red-600 to-blue-600"></div>
<div class="bg-conic/[in_hsl_longer_hue] from-red-600 to-red-600"></div>
```

**Important: Gradient Persistence Behavior Changed**
```html
<!-- v3: to-yellow-400 would reset to transparent in dark mode -->
<div class="bg-gradient-to-r from-red-500 to-yellow-400 dark:from-blue-500"></div>

<!-- v4: Gradients persist - use explicit reset -->
<div class="bg-linear-to-r from-red-500 via-orange-400 to-yellow-400 
     dark:via-none dark:from-blue-500 dark:to-teal-400"></div>
```

### Outline & Ring Utilities Changes

**Outline Behavior**:
```html
<!-- BEFORE (v3) - Required explicit width and style -->
<input class="outline outline-2 outline-slate-400" />

<!-- AFTER (v4) - Defaults to 1px, auto-solid style -->
<input class="outline-2 outline-slate-400" />
```

**Ring Width & Color**:
```html
<!-- BEFORE (v3) - ring = 3px, default blue-500 -->
<button class="focus:ring">Submit</button>

<!-- AFTER (v4) - ring-3 = 3px, currentColor default -->
<button class="focus:ring-3 focus:ring-blue-500">Submit</button>
```

**Compatibility Override** (for gradual migration):
```css
@theme {
  --default-ring-width: 3px;
  --default-ring-color: var(--color-blue-500);
}
```

### Border & Divide Color Changes

**Default Color Migration**: `gray-200` → `currentColor`

```html
<!-- BEFORE (v3) - Implicit gray-200 -->
<div class="border px-2 py-3">Content</div>

<!-- AFTER (v4) - Must specify color -->
<div class="border border-gray-200 px-2 py-3">Content</div>
```

**Global Override** (for backward compatibility):
```css
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    border-color: var(--color-gray-200, currentColor);
  }
}
```

---

## 2.2 Advanced Pattern Changes

### Arbitrary Values Syntax Evolution

**CSS Variable Shorthand Migration**:

```html
<!-- BEFORE (v3) - Square brackets for CSS variables -->
<div class="bg-[--brand-color] w-[--custom-width]"></div>

<!-- AFTER (v4) - Parentheses for CSS variables -->
<div class="bg-(--brand-color) w-(--custom-width)"></div>
```

**Dynamic Values with @theme**:
```css
@theme {
  --dynamic-width: 200px;
  --dynamic-color: #ff0000;
}
```

```html
<div class="w-[--dynamic-width] bg-[--dynamic-color]">
  Dynamic content
</div>
```

**Grid Arbitrary Values - Comma to Underscore**:
```html
<!-- BEFORE (v3) -->
<div class="grid-cols-[max-content,auto]"></div>

<!-- AFTER (v4) -->
<div class="grid-cols-[max-content_auto]"></div>
```

### Container Configuration Migration

**v3.4 Approach (JavaScript Config)**:
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    container: {
      center: true,
      padding: '2rem',
    }
  }
}
```

**v4.0 Approach (CSS Utility)**:
```css
@utility container {
  margin-inline: auto;
  padding-inline: 2rem;
}
```

**Container Queries - Now Built-In**:
```html
<div class="@container">
  <div class="grid grid-cols-1 @sm:grid-cols-3 @lg:grid-cols-4">
    <!-- Responsive to container, not viewport -->
  </div>
</div>

<!-- Max-width queries -->
<div class="@container">
  <div class="grid grid-cols-3 @max-md:grid-cols-1">
    <!-- ... -->
  </div>
</div>

<!-- Range queries -->
<div class="@container">
  <div class="flex @min-md:@max-xl:hidden">
    <!-- ... -->
  </div>
</div>
```

### Custom Utilities Registration

**Critical Change**: `@layer utilities` → `@utility` directive

**v3.4 Approach**:
```css
@layer utilities {
  .tab-4 {
    tab-size: 4;
  }
}

@layer components {
  .btn {
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: ButtonFace;
  }
}
```

**v4.0 Approach**:
```css
@utility tab-4 {
  tab-size: 4;
}

@utility btn {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: ButtonFace;
}
```

### Variant Stacking Order Reversal

**Left-to-Right Application** (reversed from v3):

```html
<!-- BEFORE (v3) - Right to left -->
<ul class="py-4 first:*:pt-0 last:*:pb-0">
  <li>One</li>
  <li>Two</li>
</ul>

<!-- AFTER (v4) - Left to right -->
<ul class="py-4 *:first:pt-0 *:last:pb-0">
  <li>One</li>
  <li>Two</li>
</ul>
```

### Important Modifier Syntax

```html
<!-- BEFORE (v3) - After variants, before utility -->
<div class="flex! bg-red-500! hover:bg-red-600/50!"></div>

<!-- AFTER (v4) - At end of class name -->
<div class="flex bg-red-500 hover:bg-red-600/50 !flex !bg-red-500 !hover:bg-red-600/50"></div>
```

Note: The old syntax still works but is deprecated.

### Prefix Syntax Changes

```html
<!-- BEFORE (v3) - Prefix in middle -->
<div class="tw-flex tw-bg-red-500 hover:tw-bg-red-600"></div>

<!-- AFTER (v4) - Prefix as variant at beginning -->
<div class="tw:flex tw:bg-red-500 tw:hover:bg-red-600"></div>
```

**CSS Variables Include Prefix**:
```css
@import "tailwindcss" prefix(tw);

@theme {
  --color-avocado-500: oklch(0.84 0.18 117.33);
}

/* Generates */
:root {
  --tw-color-avocado-500: oklch(0.84 0.18 117.33);
}
```

---

## 2.3 Behavioral & Performance Changes

### Space & Divide Utilities Performance Fix

**Critical Selector Change**:

```css
/* BEFORE (v3) - Performance issues on large pages */
.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  margin-top: 1rem;
}

/* AFTER (v4) - Optimized selector */
.space-y-4 > :not(:last-child) {
  margin-bottom: 1rem;
}
```

**Migration Recommendation**:
```html
<!-- BEFORE (v3) -->
<div class="space-y-4 p-4">
  <label for="name">Name</label>
  <input type="text" name="name" />
</div>

<!-- RECOMMENDED (v4) -->
<div class="flex flex-col gap-4 p-4">
  <label for="name">Name</label>
  <input type="text" name="name" />
</div>
```

### Transform Properties Decomposition

**Individual Property Based**:

```html
<!-- BEFORE (v3) - transform property -->
<button class="scale-150 focus:transform-none"></button>

<!-- AFTER (v4) - Individual properties -->
<button class="scale-150 focus:scale-none"></button>
```

**Transition Property Updates**:
```html
<!-- BEFORE (v3) -->
<button class="transition-[opacity,transform] hover:scale-150"></button>

<!-- AFTER (v4) -->
<button class="transition-[opacity,scale] hover:scale-150"></button>
```

### Hover Variant Media Query Behavior

**New Hover Detection**:
```css
/* v4.0 - Only applies when primary input supports hover */
@media (hover: hover) {
  .hover\:underline:hover {
    text-decoration: underline;
  }
}
```

**Override for Touch Compatibility**:
```css
@custom-variant hover (&:hover);
```

### Hidden Attribute Priority

**Display Classes No Longer Override `hidden`**:

```html
<!-- BEFORE (v3) - flex would show element -->
<div hidden class="flex">Still hidden in v4</div>

<!-- AFTER (v4) - Remove hidden to show -->
<div class="flex">Now visible</div>
```

Exception: `hidden="until-found"` still works.

### Transition Property Additions

```css
/* v4.0 adds outline-color to transitions */
.transition,
.transition-colors {
  /* Now includes outline-color */
}
```

**Fix for Outline Transitions**:
```html
<!-- BEFORE - Color transitions from default -->
<button class="transition hover:outline-2 hover:outline-cyan-500"></button>

<!-- AFTER - Set color unconditionally -->
<button class="outline-cyan-500 transition hover:outline-2"></button>
```

---

## 2.4 Modern CSS Features & New Utilities

### Dynamic Utility Values

**Spacing Scale Dynamic Values**:

```html
<!-- No configuration needed -->
<div class="grid grid-cols-15"><!-- Any number --></div>
<div class="w-17"><!-- Any spacing value --></div>
<div class="mt-29 pr-93"><!-- Unlimited --></div>
```

**Data Attribute Variants**:

```html
<div data-current class="opacity-75 data-current:opacity-100">
  Active item
</div>
```

### New Modern Utilities

| **Utility** | **Feature** | **Use Case** |
|-------------|-------------|--------------|
| `inset-shadow-*` | Stacked shadows | Up to 4 shadow layers |
| `inset-ring-*` | Inset rings | Enhanced depth effects |
| `field-sizing` | Auto-resize textareas | No JavaScript needed |
| `color-scheme` | Light/dark scrollbars | System UI consistency |
| `font-stretch` | Variable font widths | Advanced typography |
| `rotate-x-*`, `rotate-y-*` | 3D transforms | Spatial transformations |
| `scale-z-*` | 3D scaling | Depth effects |
| `translate-z-*` | 3D translation | Z-axis movement |

### New Variants

| **Variant** | **Syntax** | **Purpose** |
|-------------|-----------|-------------|
| `starting` | `starting:opacity-0` | Entry transitions |
| `not-*` | `not-hover:opacity-75` | Negation pseudo-class |
| `not-*` (media) | `not-supports-*:px-4` | Negate feature queries |
| `inert` | `inert:opacity-50` | Non-interactive elements |
| `nth-*` | `nth-3:bg-blue-500` | Nth-child selection |
| `in-*` | `in-*:opacity-100` | Like group without `.group` |
| `@min-*` | `@min-md:grid-cols-3` | Container min-width |
| `@max-*` | `@max-md:grid-cols-1` | Container max-width |

---

# PART 3: MOBILE NAVIGATION PATTERNS

## 3.1 Core Principles for Mobile Navigation

### Definition of "Nav Disappears"

A mobile navigation is considered "disappeared" when **any** of these are true:

- The user has **no visible navigation affordance** (no links, no menu button, no drawer)
- The nav exists but is **not visible** (hidden by CSS or Tailwind classes)
- The nav is visible but **not interactive** (covered by another layer or z-index issue)
- The nav is interactive but **not reachable by keyboard**

### Success Criteria

A correct mobile nav implementation must satisfy:

- **Discoverability**: Clear affordance (links or menu button) at mobile breakpoints
- **Reachability**: Can be opened and navigated with touch and keyboard
- **Resilience**: Resize/orientation changes do not strand the nav in a broken state
- **No Clipping**: All items remain reachable on small-height screens

---

## 3.2 Non-Negotiable Guardrails

### Viewport Meta is Mandatory

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

Without it, breakpoints may not behave as expected on real devices.

### Never Destroy Navigation Without Substitution

**Forbidden Pattern**:
- A mobile media query sets `.nav` / `.nav-links` to `display: none`
- There is **no mobile replacement** (menu button + overlay/drawer)

If you hide desktop nav on mobile, you must introduce a mobile pattern:
- **Menu button** + overlay/drawer
- Or keep inline nav visible (small, stacked)

### Symmetrical Breakpoint Strategy (Tailwind v4)

```tsx
// Desktop nav: visible at md and above
<nav className="hidden md:flex items-center gap-8">...</nav>

// Mobile trigger: hidden at md and above
<button className="md:hidden" aria-label="Open menu">Menu</button>
```

This ensures exactly one navigation pattern is visible at any viewport width.

### Use Semantic Controls for Interactive Toggles

- Use a real `<button type="button">` for opening/closing the menu
- Avoid checkbox/label hacks when accessibility matters
- Include proper ARIA attributes: `aria-controls`, `aria-expanded`, `aria-label`

### Mobile Overlays Must Not Be Clipped

If an overlay menu is used:
- It must be `position: fixed` (or otherwise outside clipping ancestors)
- It must not be inside a container with `overflow: hidden` unless intentional
- It should support `overflow-y: auto` for small-height devices

### Establish a Z-Index Scale

Random `z-index` values cause "exists but behind something" failures.

Define a scale:
```css
:root {
  --z-base: 0;
  --z-dropdown: 200;
  --z-sticky: 300;
  --z-modal: 400;
  --z-popover: 500;
  --z-tooltip: 600;
}
```

Use the scale consistently across the codebase.

---

## 3.3 Vanilla HTML Implementation

### HTML Structure (Semantic Toggle)

```html
<header class="header">
  <a class="logo" href="#">Brand</a>

  <button
    type="button"
    class="menu-trigger"
    aria-controls="main-navigation"
    aria-expanded="false"
    aria-label="Open navigation"
  >
    <span class="sr-only">Menu</span>
    <span class="icon-hamburger"></span>
  </button>

  <nav id="main-navigation" class="nav-links" aria-label="Main navigation">
    <a href="#section-1">Section 1</a>
    <a href="#section-2">Section 2</a>
    <a href="#section-3">Section 3</a>
  </nav>
</header>
```

### CSS (Mobile Overlay Pattern)

```css
.menu-trigger { display: none; }

@media (max-width: 768px) {
  .menu-trigger { display: inline-flex; }

  body.menu-open { overflow: hidden; }

  .nav-links {
    position: fixed;
    inset: 0;
    top: var(--nav-height, 64px);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    padding: 64px 24px;
    gap: 16px;

    overflow-y: auto;

    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: opacity 200ms ease, transform 200ms ease, visibility 200ms ease;

    z-index: var(--z-modal, 400);
    background: #fff;
  }

  body.menu-open .nav-links {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
}
```

### JavaScript (Minimal State Machine)

```js
(() => {
  const body = document.body;
  const button = document.querySelector('.menu-trigger');
  const nav = document.getElementById('main-navigation');

  if (!button || !nav) return;

  const setMenuState = (open, { focus = true } = {}) => {
    if (open) {
      body.classList.add('menu-open');
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('aria-label', 'Close navigation');
      if (focus) {
        const first = nav.querySelector('a');
        if (first) first.focus();
      }
      return;
    }

    body.classList.remove('menu-open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open navigation');
    if (focus) button.focus();
  };

  button.addEventListener('click', () => {
    setMenuState(!body.classList.contains('menu-open'));
  });

  nav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setMenuState(false, { focus: false }));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) {
      setMenuState(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && body.classList.contains('menu-open')) {
      setMenuState(false, { focus: false });
    }
  });
})();
```

---

## 3.4 React + shadcn/ui Implementation

### Data Model (Single Source of Truth)

```ts
export const NAV_ITEMS = [
  { href: "#collections", label: "Collections" },
  { href: "#showcase", label: "Artisanal Range" },
  { href: "#about", label: "Our Story" },
  { href: "/journal", label: "Journal" },
] as const;
```

### Mobile Navigation with Sheet

```tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { NAV_ITEMS } from "./nav-items";

export function MobileNavSheet() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    // Close on route change to prevent stranded overlays
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          <span className="sr-only">Menu</span>
          <span className="h-5 w-5">≡</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="p-0">
        <div className="flex h-full flex-col">
          <SheetHeader className="border-b px-6 py-4">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>

          <nav className="flex-1 overflow-y-auto px-6 py-6">
            <ul className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <SheetClose asChild>
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-lg font-medium leading-tight hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

### Desktop Navigation

```tsx
import Link from "next/link";
import { NAV_ITEMS } from "./nav-items";

export function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-sm font-medium hover:underline underline-offset-8"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
```

### Complete Header Component

```tsx
import { MobileNavSheet } from "./mobile-nav-sheet";
import { DesktopNav } from "./desktop-nav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="text-xl font-bold">
          Brand
        </a>
        
        <DesktopNav />
        <MobileNavSheet />
      </div>
    </header>
  );
}
```

---

## 3.5 Root-Cause Taxonomy (Mobile Nav Failures)

### Class A — Destructive Hiding Without Substitution

**Signature**:
- `@media (...) { .nav-links { display: none } }`
- No menu trigger exists in DOM

**Fix**:
- Add a mobile trigger + mobile nav presentation (overlay/drawer)

### Class B — Hidden by Visibility/Opacity/Transform State

**Signature**:
- `opacity: 0`, `visibility: hidden`, or transform moves it off-screen
- Open state never activates (CSS state missing or JS not toggling)

**Fix**:
- Verify state toggling logic and selectors
- Ensure open state actually changes computed styles

### Class C — Clipped by Overflow or Layout Constraints

**Signature**:
- Nav exists and is "open" but top items are missing
- Parent has `overflow: hidden`, or overlay is centered and items clip off-screen

**Fix**:
- Use `position: fixed` overlay
- Use `justify-content: flex-start` + `overflow-y: auto`

### Class D — Behind Another Layer (Z-Index/Stacking Context)

**Signature**:
- Nav is present and visible in DOM, but cannot be clicked
- Another element overlays it

**Fix**:
- Raise nav layer using the z-index scale
- Remove accidental stacking contexts (e.g., `transform` on parents)

### Class E — Breakpoint/Viewport Mismatch

**Signature**:
- Works in desktop devtools but fails on real device
- Breakpoints not triggering

**Fix**:
- Ensure viewport meta
- Verify media query units and breakpoint values

### Class F — JavaScript State Bug

**Signature**:
- Menu button exists but does nothing
- Console errors, selector mismatches, timing issues

**Fix**:
- Guard selectors, attach listeners after DOM ready
- Implement a single `setMenuState(isOpen)` function

### Class G — Keyboard-Only Failure

**Signature**:
- Mouse/touch can open
- Keyboard can't reach the trigger or links

**Fix**:
- Ensure trigger is a `<button>`
- Provide visible focus states
- Support Escape-to-close and focus return

### Class H — Click-Outside Handler Race Condition

**Signature** (React-specific):
- Menu briefly opens then immediately closes (or never visibly opens)
- Click on trigger sets state true, but document listener sets it false
- `aria-expanded` may flicker or stay false
- Console logs show state toggling true→false in rapid succession

**Root Cause**:
Document-level click handlers fire after component handlers due to event bubbling. If the click-outside logic doesn't exclude the trigger element, it immediately undoes the toggle.

**Problematic Pattern**:
```tsx
document.addEventListener('click', (e) => {
  if (!menuElement.contains(e.target)) {
    setIsOpen(false); // Fires when toggle button is clicked!
  }
});
```

**Fix**:
```tsx
const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const menu = document.getElementById('mobile-menu');
  const trigger = document.querySelector('.menu-toggle');
  
  // Check BOTH menu AND trigger
  if (menu && !menu.contains(target) && !trigger?.contains(target)) {
    setIsOpen(false);
  }
};
```

---

# PART 4: VISUAL DEBUGGING PLAYBOOK

## 4.1 The "Flat" & "Minimal" Look

### Cause 1: Tailwind Configuration Conflict (v3 vs v4)

**Issue**: Project contains both legacy `tailwind.config.ts` (JS-based v3 config) and modern `tokens.css` (CSS-based v4 config).

**Impact**: Build system prioritizes JS config, which doesn't contain custom color/spacing tokens defined in CSS. Results in undefined classes.

**Diagnosis**:
```bash
# Check for legacy config files
ls -la tailwind.config.*
ls -la postcss.config.*

# Check package.json for tailwind version
npm list tailwindcss
```

**Resolution**:
1. Rename `tailwind.config.ts` to `.bak` or delete it
2. Ensure `globals.css` starts with `@import "tailwindcss";`
3. Define all design tokens in `@theme` directive

### Cause 2: Missing Tailwind Entry Point

**Issue**: Global CSS file lacks critical `@import "tailwindcss";` directive.

**Impact**: Tailwind v4.0 does **not generate any utility classes**.

**Diagnosis**:
- Inspect `globals.css` or main CSS entry point
- Verify `@import "tailwindcss";` is present and at the top

**Resolution**:
```css
/* globals.css */
@import "tailwindcss";

@theme {
  /* Your theme variables here */
}
```

---

## 4.2 Navigation Layout & Visibility Failures

### Cause 3: Variable Naming Mismatch

**Issue**: Design system defines spacing variables as `--spacing-1`, but application code references `var(--space-1)`.

**Impact**: Browsers treat `gap: var(--space-8)` as `gap: unset` (effectively 0), causing elements to crowd together.

**Diagnosis**:
- Open DevTools → Elements
- Select affected element
- Check Computed styles for `gap`, `margin`, `padding`
- Look for `unset` or `0` values where non-zero expected
- Check Styles panel for variable reference warnings

**Resolution**:
```bash
# Global Find & Replace across src directory
# Replace: var(--space-
# With: var(--spacing-

rg "var\(--space-" --type tsx --type ts --type css
```

### Cause 4: Invalid CSS Syntax (Double Wrapping)

**Issue**: Inline styles wrap CSS variables that already contain color values:

```tsx
// Problematic
background: 'rgb(var(--color-espresso-dark))'

// The variable already contains rgb(61 43 31)
// Result: background: rgb(rgb(61 43 31)) - INVALID CSS
```

**Impact**: Invalid CSS causes element to appear transparent.

**Diagnosis**:
- Inspect element with missing background
- Check Styles panel for crossed-out properties
- Look for "invalid CSS" warnings

**Resolution**:
```tsx
// Correct
background: 'var(--color-espresso-dark)'
// or
backgroundColor: 'var(--color-espresso-dark)'
```

---

## 4.3 Hydration & Runtime Errors

### Cause 5: Invalid HTML/SVG Nesting

**Issue**: Animation components return HTML `<div>` elements but are used inside SVG illustrations.

**Impact**: `<div>` cannot be child of `<svg>` or `<g>`. Causes React Hydration Error.

**Diagnosis**:
- Console shows "Hydration failed because initial UI does not match"
- Error mentions "did not match" between server and client

**Resolution**:
Refactor SVG-compatible elements:
```tsx
// Instead of
function SteamRise() {
  return <div className="steam">...</div>;
}

// Use SVG primitives
function SteamRise() {
  return <g className="steam">...</g>;
}
```

---

## 4.4 Tailwind Build/Purge Issues

### Cause 6: Dynamic Class Strings Not Statically Analyzable

**Issue**: Tailwind v4 (like v3) scans for class strings to generate CSS. Dynamic concatenation defeats this:

```tsx
// PROBLEMATIC - Tailwind cannot detect this
const size = isMobile ? 'md:hidden' : 'md:flex';
<div className={size}>...</div>

// PROBLEMATIC - Same issue
<div className={"md:" + variant}>...</div>
```

**Impact**: Works in dev, disappears in production (purged).

**Diagnosis**:
- Verify `globals.css` includes proper `@source` directives
- Check build output for missing utility classes
- Reproduce in production build (not just dev server)

**Resolution**:
```tsx
// Static class strings
{isMobile ? (
  <div className="md:hidden">Mobile view</div>
) : (
  <div className="md:flex">Desktop view</div>
)}
```

Or use `@layer` approach for dynamic values:
```css
@theme {
  --breakpoint-mobile: 768px;
}

@media (width < var(--breakpoint-mobile)) {
  .mobile-only {
    display: block;
  }
}
```

---

## 4.5 Diagnostic Decision Tree

### Step 1: Is the nav present in the DOM?

- Inspect Elements
- Search for `<nav` or `.nav-links`

If **not present**: Class A or template omission

If **present**: Continue

### Step 2: Is it hidden by computed CSS?

Check in Computed styles:
- `display` - look for `none`
- `visibility` - look for `hidden`
- `opacity` - look for `0`

If `display: none`: Find the rule (likely mobile media query)

### Step 3: Is it off-screen or clipped?

Check layout box:
- `position`
- `top/left/right/bottom`
- `transform`
- Any ancestor `overflow: hidden`

### Step 4: Is it behind another layer?

If it looks "open" but clicks fail:
- Temporarily toggle `pointer-events: none` on suspected overlays
- Inspect stacking contexts:
  - Any parent with `transform`, `filter`, `opacity < 1`, `position` + `z-index`

### Step 5: Is JS failing to toggle state?

- Check Console for errors
- Verify click handler is attached
- Verify state change occurs (body class or attribute)

### Step 6: Production-only disappearance?

- Check build config: content globs and class string patterns
- Verify no dynamic class concatenation
- Test production build locally

---

# PART 5: ANTI-PATTERNS CATALOG & PITFALLS

## 5.1 Tailwind v4 Migration Pitfalls

### Pitfall 1: @apply Breaks in v4.0.8+

**Issue**: `@apply` directive not working in certain contexts.

**Root Causes**:
- Lightning CSS compatibility issues
- CSS module isolation
- Missing `@reference` directive

**Solution**:
```css
/* In scoped styles (CSS Modules, Vue SFC, etc.) */
@reference "../../app.css";

.my-component {
  @apply flex items-center gap-4;
}
```

### Pitfall 2: @source Breaking in Monorepos

**Issue**: Internal package imports fail.

**Solution**:
```css
/* apps/web/src/style.css */
@import 'tailwindcss';
@import '@repo/tailwind-config/style.css';
@source '../../../tools/tailwind';
```

### Pitfall 3: Arbitrary Values Not Recognized

**Issue**: Dynamic arbitrary values fail.

**Root Cause**: v4 requires predefined values in `@theme` for arbitrary value support in some contexts.

**Solution**:
```css
@theme {
  --dynamic-width: 200px;
  --dynamic-color: #ff0000;
}
```

```html
<div class="w-[--dynamic-width] bg-[--dynamic-color]">
```

### Pitfall 4: Color Opacity Rendering Differences

**Issue**: Subtle color rendering differences between v3 and v4.

**Cause**: v4 uses `color-mix()` internally instead of CSS custom properties for some opacity transformations.

**Mitigation**: Test color values in target browsers, especially with `currentColor`.

### Pitfall 5: Build Time Regression

**Issue**: Builds slower than v3.

**Diagnosis**:
1. Check for misconfigured `@source` scanning large directories
2. Verify Vite plugin vs PostCSS plugin usage
3. Check for content detection scanning `node_modules`

**Solution**:
```css
/* Limit scanning scope */
@source "src/components";
/* NOT @source "." or @source "node_modules"; */
```

### Pitfall 6: Gradient Variables Incompatibility

**Issue**: v3 and v4 gradient variables conflict.

**Cause**: `--tw-gradient-from` format changed.

**Solution**: Full migration required - no mixing v3/v4 in same project.

---

## 5.2 Mobile Navigation Anti-Patterns

### Anti-Pattern 1: "Hide Nav on Mobile" Without Menu Trigger

```css
@media (max-width: 768px) {
  .nav-links { display: none; }
}
```

Creates navigation dead-end. Mobile users have no way to access navigation.

### Anti-Pattern 2: Random Z-Index Escalation

```css
.nav { z-index: 999999; }
```

Hides architectural problems and creates new ones. Establish and use a z-index scale.

### Anti-Pattern 3: Overlay Inside `overflow: hidden` Container

Overlays should be `position: fixed` or guaranteed not to be clipped. Parent containers with `overflow: hidden` create clipping contexts.

### Anti-Pattern 4: Non-Semantic Clickable Divs

```tsx
<div onClick={toggleMenu}>Menu</div>
```

Creates invisible navigation for keyboard users. Use `<button type="button">`.

### Anti-Pattern 5: Missing Mobile Trigger at Correct Breakpoint

```tsx
// Desktop nav hidden on mobile
<nav className="hidden md:flex">...</nav>

// Mobile trigger ALSO hidden on mobile
<button className="hidden md:inline-flex">Menu</button>
```

Result: Nothing is visible on mobile.

### Anti-Pattern 6: SSR/Hydration Conditional Nav

```tsx
const isMobile = window.innerWidth < 768; // breaks on SSR
return isMobile ? <MobileNav/> : <DesktopNav/>;
```

Results in flicker, hydration mismatch, or missing nav.

### Anti-Pattern 7: Click-Outside Closes Toggle Button Clicks

```tsx
useEffect(() => {
  const handleClick = (e: MouseEvent) => {
    if (!menuRef.current?.contains(e.target as Node)) {
      setIsOpen(false); // Closes even when toggle was clicked!
    }
  };
  document.addEventListener('click', handleClick);
  return () => document.removeEventListener('click', handleClick);
}, []);
```

---

# PART 6: VERIFICATION PROTOCOLS

## 6.1 Responsive Test Matrix

Test these viewport sizes:

| Width | Height | Device Type |
|-------|--------|-------------|
| 360 | 640 | Small phone |
| 390 | 844 | iPhone 14 |
| 430 | 932 | iPhone 14 Pro Max |
| 768 | 1024 | Tablet portrait |
| 1024 | 768 | Tablet landscape / Small desktop |
| 1440 | 900 | Desktop |
| 1920 | 1080 | Large desktop |

**Additional Tests**:
- Small height scenarios (360×640)
- Orientation change (portrait/landscape)
- Reduced motion (OS setting)
- iOS Safari scrolling inside overlays

## 6.2 Keyboard Accessibility Checklist

- [ ] Tab reaches the menu button
- [ ] Enter/Space opens the menu
- [ ] Focus moves into menu
- [ ] Arrow keys navigate menu items
- [ ] Escape closes the menu
- [ ] Focus returns to trigger after close
- [ ] Visible focus ring on all interactive elements

## 6.3 Behavior Checklist

- [ ] Menu opens and closes reliably
- [ ] Clicking a link closes the menu
- [ ] Resizing to desktop closes the menu
- [ ] No background scroll bleed when open (scroll lock)
- [ ] Route change closes mobile menu (React)
- [ ] Animation transitions are smooth (check reduced motion)

## 6.4 Styling/Utility Checklist

- [ ] Trigger visible on mobile (`md:hidden`)
- [ ] Desktop links hidden on mobile (`hidden md:flex`)
- [ ] No purge issues (classes present in production build)
- [ ] Menu isn't clipped: top items visible
- [ ] Menu isn't behind header/hero layers
- [ ] Focus ring visible on links and trigger

## 6.5 Production Build Validation

```bash
# 1. Run production build
npm run build

# 2. Inspect generated CSS
cat dist/app.css | head -100

# 3. Verify expected utilities are present
grep -o "\.bg-[a-z0-9/-]*" dist/app.css | sort | uniq

# 4. Check for purge warnings
npm run build 2>&1 | grep -i "purge\|unused\|warn"

# 5. Test in production mode locally
npm run start
```

---

# PART 7: AI AGENT IMPLEMENTATION PATTERNS

## 7.1 Version Detection Rules

```javascript
// AI Agent Detection Logic
function detectTailwindVersion(file) {
  if (file.includes('@tailwind base')) {
    return { version: 'v3', suggestUpgrade: true };
  }
  if (file.includes('@import "tailwindcss"')) {
    return { version: 'v4', suggestUpgrade: false };
  }
  if (file.includes('tailwind.config.js') || file.includes('tailwind.config.ts')) {
    return { version: 'v3', configExists: true };
  }
  return { version: 'unknown' };
}
```

## 7.2 Systematic Replacement Map

```javascript
// Utility Transformation Map
const v3ToV4Map = {
  'bg-opacity-': '/',
  'text-opacity-': '/',
  'border-opacity-': '/',
  'ring-opacity-': '/',
  'placeholder-opacity-': '/',
  'shadow-sm': 'shadow-xs',
  'shadow': 'shadow-sm',
  'bg-gradient-': 'bg-linear-',
  'outline-none': 'outline-hidden',
  'ring"': 'ring-3"',
  'flex-shrink-': 'shrink-',
  'flex-grow-': 'grow-',
  'overflow-ellipsis': 'text-ellipsis',
  'decoration-slice': 'box-decoration-slice',
  'decoration-clone': 'box-decoration-clone',
};

function migrateUtility(className) {
  for (const [v3, v4] of Object.entries(v3ToV4Map)) {
    if (className.includes(v3)) {
      return className.replace(v3, v4);
    }
  }
  return className;
}
```

## 7.3 Color Space Validation

```javascript
// Check for RGB → OKLCH conversion needs
function validateColorValue(colorValue) {
  if (colorValue.startsWith('#') && colorValue.length === 4) {
    return `Consider expanding ${colorValue} to 7 characters for consistency`;
  }
  if (colorValue.startsWith('rgb')) {
    return 'Consider migrating to OKLCH for v4 compatibility';
  }
  return null;
}
```

## 7.4 Component Template: New Tailwind v4 Component

```css
/* filename: component-name.css */
@import "tailwindcss";

@theme {
  /* Custom tokens first */
  --color-brand-primary: oklch(0.84 0.18 117.33);
  --color-brand-secondary: oklch(0.53 0.12 118.34);
  --font-heading: "Inter", system-ui;
  --spacing-component: 1.5rem;
  
  /* Animation tokens */
  --animate-slide-up: slide-up 0.3s ease-out;
  
  @keyframes slide-up {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

@utility component-container {
  padding: var(--spacing-component);
  background-color: var(--color-brand-primary);
  border-radius: 0.5rem;
}

@utility component-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 600;
}
```

## 7.5 Debugging Workflow for AI Agents

### Step 1: Version Validation
```bash
npm list tailwindcss
# Expected: tailwindcss@4.x.x
```

### Step 2: Build Output Analysis
```bash
npx @tailwindcss/cli -i input.css -o output.css --verbose
```

### Step 3: CSS Variable Inspection (Browser Console)
```javascript
const styles = getComputedStyle(document.documentElement);
console.log('--color-brand-500:', styles.getPropertyValue('--color-brand-500'));
console.log('--spacing-4:', styles.getPropertyValue('--spacing-4'));
```

---

# APPENDIX: QUICK REFERENCE TABLES

## v3 → v4 Utility Mappings

| Category | v3 | v4 |
|----------|----|----|
| Shadow | `shadow-sm` | `shadow-xs` |
| Shadow | `shadow` | `shadow-sm` |
| Blur | `blur-sm` | `blur-xs` |
| Blur | `blur` | `blur-sm` |
| Rounded | `rounded-sm` | `rounded-xs` |
| Rounded | `rounded` | `rounded-sm` |
| Gradient | `bg-gradient-to-r` | `bg-linear-to-r` |
| Outline | `outline-none` | `outline-hidden` |
| Ring | `ring` | `ring-3` |
| Opacity | `bg-opacity-50` | `bg-color/50` |

## Browser Requirements Summary

| Browser | Minimum Version |
|---------|----------------|
| Safari | 16.4+ |
| Chrome | 111+ |
| Firefox | 128+ |

## Performance Benchmarks

| Metric | Improvement |
|--------|-------------|
| Full build | 3.78x faster |
| Incremental rebuild | 8.8x faster |
| No-change rebuild | 182x faster |

---

# CONCLUSION

This comprehensive guide synthesizes validated findings from extensive analysis of Tailwind CSS v4.0 migration scenarios, mobile navigation patterns, and visual debugging methodologies. All content has been cross-referenced against official documentation and validated through real-world troubleshooting scenarios.

The guide serves as an authoritative reference for:

1. **Understanding the CSS-first paradigm shift** in Tailwind v4
2. **Migrating existing v3.4 projects** with systematic utility transformations
3. **Implementing robust mobile navigation** for both vanilla HTML and React/shadcn stacks
4. **Debugging visual discrepancies** using a systematic diagnostic approach
5. **Avoiding critical pitfalls** that cause production failures

All anti-patterns, root-cause taxonomies, and verification protocols have been validated against production scenarios and official documentation, ensuring production-grade reliability for any project adopting Tailwind CSS v4.0.
---
name: nextjs-tailwind-v4-luxe
description: Comprehensive skill for building luxury-grade Next.js applications with Tailwind CSS v4, Radix UI (shadcn), and Framer Motion. Covers CSS-first theming, avant-garde UI design, code review, security audits, and performance optimization for high-end web experiences.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, SearchWeb, FetchURL or similar tools available to you
---

# Next.js + Tailwind CSS v4 Luxury Web Development

> **Stack**: Next.js 16+ • React 19+ • Tailwind CSS v4 • TypeScript • Radix UI (shadcn) • Framer Motion  
> **Philosophy**: Avant-Garde UI Design • Anti-Generic • Intentional Minimalism • WCAG AAA

---

## When to Use This Skill

Use this skill when:
- Building Next.js applications with Tailwind CSS v4 CSS-first architecture
- Creating luxury, high-end, or distinctive web experiences
- Implementing shadcn/ui components with custom styling
- Adding Framer Motion animations with accessibility considerations
- Conducting code reviews for React/Next.js/TypeScript projects
- Performing security audits on full-stack Next.js applications
- Optimizing performance for production-grade deployments

---

## 1. Project Architecture

### 1.1 Tech Stack Overview

```yaml
Core Framework:
  - Next.js: 16.1.4+ (App Router, Server Components, Turbopack)
  - React: 19.2.3+
  - TypeScript: 5.9.3+ (Strict Mode)

Styling & UI:
  - Tailwind CSS: v4.1.18+ (CSS-first with @theme)
  - Radix UI: Primitives for accessibility
  - shadcn/ui: Component architecture
  - Framer Motion: 12.29.0+ (Animations with reduced motion support)
  - class-variance-authority: Component variants
  - tailwind-merge: Class merging
  - clsx: Conditional classes

Forms & Validation:
  - react-hook-form: Form management
  - zod: Schema validation
  - @hookform/resolvers: Zod integration

Backend/Data:
  - Prisma: ORM (optional)
  - bcryptjs: Password hashing
  - jose: JWT handling
  - zod: Input validation

Development:
  - ESLint: 9.x with TypeScript
  - Prettier: 3.x with tailwindcss plugin
  - Vitest: Unit testing
  - Playwright: E2E testing
```

### 1.2 Directory Structure

```
project-root/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout, fonts, metadata
│   │   ├── page.tsx            # Home page composition
│   │   ├── globals.css         # Tailwind v4 theme + tokens
│   │   └── (routes)/           # Route groups
│   │
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, Shell
│   │   ├── sections/           # Page sections (Hero, Features, etc.)
│   │   └── ui/                 # Reusable UI primitives (shadcn)
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Card.tsx
│   │       └── ...
│   │
│   ├── lib/
│   │   ├── utils.ts            # cn(), formatters, helpers
│   │   └── hooks/              # Custom React hooks
│   │       ├── useScrollSpy.ts
│   │       └── useReducedMotion.ts
│   │
│   ├── data/                   # Static data (destinations, content)
│   └── types/                  # Global TypeScript types
│
├── public/                     # Static assets
├── docs/                       # Design docs, guidelines
├── prisma/                     # Database schema (if using)
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript strict config
└── package.json
```

---

## 2. Tailwind CSS v4 CSS-First Configuration

### 2.1 Critical: No tailwind.config.js

**Tailwind v4 uses CSS-only configuration.** There should be NO `tailwind.config.js` or `tailwind.config.ts` file.

### 2.2 globals.css Structure

```css
/* src/app/globals.css */
@import "tailwindcss";

/* ============================================
   THEME CONFIGURATION
   ============================================ */

@theme {
  /* Custom Colors */
  --color-void: #050506;
  --color-void-light: #0a0a0c;
  --color-aurora-cyan: #22d3ee;
  --color-aurora-purple: #a855f7;
  --color-aurora-magenta: #ec4899;
  --color-champagne: #c9b896;
  --color-champagne-dark: #a89776;
  
  /* Typography */
  --font-sans: "Geist", "Inter", system-ui, sans-serif;
  --font-serif: "Instrument Serif", "Georgia", serif;
  
  /* Extended Spacing */
  --spacing-18: 4.5rem;
  --spacing-88: 22rem;
  
  /* Custom Animations */
  --animate-aurora-slow: aurora-slow 20s ease-in-out infinite;
  --animate-float-slow: float-slow 25s ease-in-out infinite;
  
  @keyframes aurora-slow {
    0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
    33% { transform: translate(30%, 20%) scale(1.1); opacity: 0.6; }
    66% { transform: translate(-20%, 30%) scale(0.9); opacity: 0.7; }
  }
  
  @keyframes float-slow {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }
}

/* ============================================
   BASE STYLES
   ============================================ */

@layer base {
  * {
    @apply border-slate-800;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply bg-void text-slate-100 font-sans antialiased;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-serif;
  }
}

/* ============================================
   CUSTOM UTILITIES
   ============================================ */

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  
  .glass-panel {
    @apply bg-slate-900/30 backdrop-blur-xl border border-slate-800/50;
  }
  
  .aurora-gradient {
    background: linear-gradient(
      135deg,
      var(--color-aurora-cyan) 0%,
      var(--color-aurora-purple) 50%,
      var(--color-aurora-magenta) 100%
    );
  }
}
```

### 2.3 PostCSS Configuration

```javascript
// postcss.config.mjs
export default {
  plugins: ["@tailwindcss/postcss"],
};
```

### 2.4 Migration from v3 to v4: Critical Changes

| v3 Utility | v4 Replacement |
|------------|----------------|
| `bg-opacity-*` | `bg-color/*` (e.g., `bg-red-500/50`) |
| `text-opacity-*` | `text-color/*` |
| `shadow-sm` | `shadow-xs` |
| `shadow` | `shadow-sm` |
| `bg-gradient-to-r` | `bg-linear-to-r` |
| `outline-none` | `outline-hidden` |
| `ring` | `ring-3` |
| `flex-shrink-*` | `shrink-*` |
| `flex-grow-*` | `grow-*` |

**CSS Variable Syntax:**
```css
/* v3 */
<div class="bg-[--brand-color]">

/* v4 */
<div class="bg-(--brand-color)">
```

---

## 3. Component Patterns

### 3.1 UI Primitive Pattern (shadcn-style)

```tsx
// src/components/ui/Button.tsx
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-champagne text-void hover:bg-champagne-dark",
        outline: "border border-slate-700 bg-transparent hover:bg-slate-800",
        ghost: "hover:bg-slate-800",
        link: "underline-offset-4 hover:underline text-champagne",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-12 px-6 text-lg",
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
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={props.disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
```

### 3.2 Section Component Pattern

```tsx
// src/components/sections/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Animation */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 aurora-gradient opacity-20"
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.h1
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6"
        >
          Beyond First Class
        </motion.h1>
        
        <motion.p
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl text-slate-400 max-w-2xl mx-auto mb-8"
        >
          Curated journeys for the world's most discerning travelers
        </motion.p>
        
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Button size="lg">Begin Your Journey</Button>
        </motion.div>
      </div>
    </section>
  );
}
```

### 3.3 Form Component Pattern

```tsx
// src/components/ui/Input.tsx
import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-slate-300">
            {label}
            {props.required && <span className="text-aurora-magenta ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-champagne focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
            error && "border-aurora-magenta focus:ring-aurora-magenta",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-aurora-magenta">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
```

### 3.4 useReducedMotion Hook (Required)

```tsx
// src/lib/hooks/useReducedMotion.ts
import { useState, useEffect } from "react";

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}
```

---

## 4. Avant-Garde Design Principles

### 4.1 Anti-Generic Philosophy

Every interface must have a **distinctive conceptual direction**. Reject:
- Bootstrap-style predictable grids
- Safe "Inter/Roboto" pairings without typographical hierarchy
- Purple-gradient-on-white clichés
- Predictable card grids and hero sections
- The homogenized "AI slop" aesthetic

### 4.2 Design Thinking Framework

Before coding, commit to a **BOLD aesthetic direction**:

| Direction | Characteristics |
|-----------|-----------------|
| **Brutally Minimal** | Extreme whitespace, single focal point |
| **Maximalist Chaos** | Layered textures, bold typography |
| **Retro-Futuristic** | Neon, chrome, geometric patterns |
| **Organic/Natural** | Soft curves, earthy tones, fluid shapes |
| **Luxury/Refined** | Serif fonts, gold accents, subtle gradients |
| **Editorial/Magazine** | Asymmetric layouts, bold headlines |
| **Brutalist/Raw** | Exposed structure, monospace, high contrast |
| **Art Deco/Geometric** | Symmetry, gold/black, stepped forms |

### 4.3 Intentional Minimalism

- **Whitespace is structural**, not just empty space
- **Every element earns its place** through calculated purpose
- If you cannot justify an element's existence, delete it
- **Typography hierarchy** speaks louder than decoration

### 4.4 Multi-Dimensional Analysis

Analyze every design decision through:
1. **Psychological**: User sentiment and cognitive load
2. **Technical**: Rendering performance, repaint/reflow costs
3. **Accessibility**: WCAG AAA strictness
4. **Scalability**: Long-term maintenance and modularity

### 4.5 Animation Guidelines

```typescript
// Timing
const ANIMATION_DURATION = {
  instant: 0,      // State changes
  fast: 150,       // Micro-interactions
  normal: 300,     // Standard transitions
  slow: 500,       // Page transitions
  dramatic: 800,   // Hero animations
};

// Easing
const EASING = {
  entrance: [0.0, 0.0, 0.2, 1],  // Decelerate
  exit: [0.4, 0.0, 1.0, 1.0],    // Accelerate
  standard: [0.4, 0.0, 0.2, 1],  // Symmetric
};

// Stagger
const STAGGER_DELAY = 50; // ms between items
```

---

## 5. Code Review Protocol

### 5.1 Pre-Review Checklist

Before any code review or completion claim:

```bash
# TypeScript Check
npx tsc --noEmit

# Lint
npm run lint

# Tests
npm test

# Build
npm run build
```

### 5.2 Review Categories

#### Critical (Must Fix)
- [ ] No `any` types - use `unknown` instead
- [ ] Proper error handling with user feedback
- [ ] Accessibility: focus states, ARIA labels, keyboard navigation
- [ ] `useReducedMotion` check for all animations
- [ ] No memory leaks in useEffect (proper cleanup)
- [ ] Form validation with Zod schemas
- [ ] XSS prevention (no `dangerouslySetInnerHTML` without sanitization)

#### High Priority
- [ ] TypeScript strict mode compliance
- [ ] Prefer `interface` over `type` (except unions/intersections)
- [ ] Early returns, avoid nested conditionals
- [ ] Loading states for async operations
- [ ] Error boundaries for component trees
- [ ] Proper React key usage in lists

#### Medium Priority
- [ ] Component composition over inheritance
- [ ] Memoization for expensive computations
- [ ] Image optimization with next/image
- [ ] Proper semantic HTML

### 5.3 Code Review Response Pattern

```
READ → UNDERSTAND → VERIFY → EVALUATE → RESPOND → IMPLEMENT
```

**Rules:**
- No performative agreement ("You're absolutely right!")
- Verify technically before implementing
- If unclear: STOP and ask for clarification
- YAGNI check: grep for usage before adding "proper" features

---

## 6. Security Audit Protocol

### 6.1 OWASP Top 10 2025 Checklist

| Category | Checks |
|----------|--------|
| **A01 Broken Access Control** | IDOR prevention, proper auth checks, SSRF protection |
| **A02 Security Misconfiguration** | Secure headers, no default credentials, error handling |
| **A03 Supply Chain** | Audit dependencies (`npm audit`), lock file integrity |
| **A04 Cryptographic Failures** | bcrypt for passwords, jose for JWT, no hardcoded secrets |
| **A05 Injection** | No SQL injection (use Prisma/ORM), no XSS |
| **A06 Insecure Design** | Input validation, business logic flaws |
| **A07 Authentication Failures** | Session management, MFA, secure cookies |
| **A08 Integrity Failures** | Code signing, dependency verification |
| **A09 Logging & Monitoring** | Security event logging, failed auth attempts |
| **A10 Exceptional Conditions** | Fail-closed, proper error handling |

### 6.2 High-Risk Patterns to Flag

```typescript
// ❌ String concatenation in queries
const query = "SELECT * FROM users WHERE id = " + userId;

// ❌ Dynamic code execution
eval(userInput);
new Function(userInput);

// ❌ Unsafe deserialization
JSON.parse(untrustedData); // Without validation

// ❌ Path traversal
fs.readFile(`./uploads/${userInput}`);

// ❌ Disabled security
fetch(url, { verify: false }); // SSL verification disabled
```

### 6.3 Secret Detection Patterns

| Type | Indicators |
|------|------------|
| API Keys | `api_key`, `apikey`, high entropy strings |
| Tokens | `token`, `bearer`, `jwt` |
| Credentials | `password`, `secret`, `key` |
| Cloud | `AWS_`, `AZURE_`, `GCP_` prefixes |

### 6.4 Next.js Specific Security

```typescript
// next.config.ts
const nextConfig = {
  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
  
  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};
```

---

## 7. Performance Optimization

### 7.1 Critical Rules (Do First)

1. **Eliminate Waterfalls**
   ```typescript
   // ❌ Sequential (slow)
   const user = await getUser();
   const posts = await getPosts(user.id);
   
   // ✅ Parallel (fast)
   const [user, posts] = await Promise.all([
     getUser(),
     getPosts(),
   ]);
   ```

2. **Bundle Size Optimization**
   ```typescript
   // ✅ Dynamic imports for large components
   const HeavyChart = dynamic(() => import("./HeavyChart"), {
     loading: () => <Skeleton />,
   });
   
   // ✅ Direct imports (avoid barrel files)
   import { Button } from "@/components/ui/Button";
   // NOT: import { Button } from "@/components/ui"; (index.ts)
   ```

3. **Server Components by Default**
   ```typescript
   // Server component (default) - no "use client"
   export async function ServerComponent() {
     const data = await fetchData(); // Fetches on server
     return <div>{data}</div>;
   }
   
   // Client component only when needed
   "use client";
   export function ClientComponent() {
     const [state, setState] = useState();
     return <div>{state}</div>;
   }
   ```

### 7.2 Image Optimization

```tsx
import Image from "next/image";

// ✅ Optimized images
<Image
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // Above-fold images
  className="object-cover"
/>;

// ✅ Responsive images
<Image
  src="/photo.jpg"
  alt="Photo"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
  className="object-cover"
/>
```

### 7.3 Font Optimization

```tsx
// app/layout.tsx
import { Geist, Instrument_Serif } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

export default function RootLayout({ children }) {
  return (
    <html className={`${geist.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

---

## 8. Accessibility Requirements (WCAG AAA)

### 8.1 Mandatory Practices

```tsx
// ✅ Semantic HTML
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

<main>
  <section aria-labelledby="features-heading">
    <h2 id="features-heading">Features</h2>
  </section>
</main>

// ✅ Focus management
<button className="focus-visible:ring-2 focus-visible:ring-champagne focus-visible:outline-none">
  Click me
</button>

// ✅ ARIA labels for icon buttons
<button aria-label="Close dialog">
  <XIcon />
</button>

// ✅ Form labels
<label htmlFor="email">Email</label>
<input id="email" type="email" aria-required="true" />

// ✅ Error announcements
<div role="alert" className="text-aurora-magenta">
  {errorMessage}
</div>
```

### 8.2 Color Contrast Requirements

| Element | Minimum Ratio |
|---------|---------------|
| Normal text | 4.5:1 |
| Large text (18pt+) | 3:1 |
| UI components | 3:1 |

Test with: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### 8.3 Reduced Motion Support

```tsx
"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function AnimatedCard() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Content
    </motion.div>
  );
}
```

---

## 9. Mobile Navigation Patterns

### 9.1 Breakpoint Strategy

```tsx
// Desktop nav: visible at md and above
<nav className="hidden md:flex items-center gap-8">...</nav>

// Mobile trigger: hidden at md and above
<button className="md:hidden" aria-label="Open menu">Menu</button>
```

### 9.2 Mobile Navigation with Sheet

```tsx
"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Sheet";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-[300px]">
        <nav className="flex flex-col gap-4">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
```

### 9.3 Common Mobile Nav Failures

| Class | Symptom | Fix |
|-------|---------|-----|
| **A** | No visible nav on mobile | Add mobile trigger + overlay |
| **B** | Hidden by opacity/visibility | Verify state toggling |
| **C** | Clipped by overflow | Use `position: fixed` |
| **D** | Behind another layer | Check z-index scale |
| **E** | Breakpoint mismatch | Verify viewport meta |
| **F** | JavaScript failure | Guard selectors, check console |
| **G** | Keyboard inaccessible | Use real `<button>` elements |
| **H** | Click-outside race | Exclude trigger from handler |

---

## 10. Verification Gates

### 10.1 Pre-Commit Checklist

```bash
# 1. Type Check
npx tsc --noEmit

# 2. Lint
npm run lint

# 3. Tests
npm test

# 4. Build
npm run build

# 5. Security Audit
npm audit
```

### 10.2 Pre-Deploy Checklist

- [ ] All tests passing
- [ ] Build successful (exit 0)
- [ ] No console errors
- [ ] Accessibility: keyboard navigation works
- [ ] Accessibility: screen reader compatible
- [ ] Performance: Lighthouse score > 90
- [ ] Security: No high/critical vulnerabilities
- [ ] Responsive: Tested on mobile, tablet, desktop
- [ ] Analytics: Error tracking configured

### 10.3 Design Quality Gate

Before marking any UI work complete:
- [ ] Distinctive aesthetic direction (not generic)
- [ ] Intentional whitespace usage
- [ ] Typography hierarchy is clear
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Color contrast meets WCAG AAA
- [ ] Micro-interactions are satisfying (150-300ms)

---

## 11. Project-Specific Conventions

### 11.1 Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Components | PascalCase | `Hero.tsx`, `Button.tsx` |
| Hooks | camelCase with `use` | `useScrollSpy.ts` |
| Utils | camelCase | `cn.ts`, `formatCurrency.ts` |
| Constants | SCREAMING_SNAKE | `API_ENDPOINTS` |
| Types | PascalCase | `UserProfile`, `Destination` |
| Files | kebab-case | `concierge-form.tsx` |

### 11.2 Import Order

```tsx
// 1. React/Next
import { useState } from "react";
import Image from "next/image";

// 2. Third-party
import { motion } from "framer-motion";
import { z } from "zod";

// 3. Absolute imports (@/)
import { Button } from "@/components/ui/Button";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

// 4. Relative imports
import { HeroAnimation } from "./HeroAnimation";
```

### 11.3 File Headers

```tsx
"use client"; // If using hooks/browser APIs

// Or for server components (default), no directive needed
```

---

## Related Skills

| Skill | When to Use |
|-------|-------------|
| [aesthetic](../.agents/skills/aesthetic/SKILL.md) | Deep design analysis, inspiration workflows |
| [code-review](../.agents/skills/code-review/SKILL.md) | Detailed review protocols, feedback handling |
| [vulnerability-scanner](../.agents/skills/vulnerability-scanner/SKILL.md) | Deep security analysis, threat modeling |
| [nextjs-react-expert](../.agents/skills/nextjs-react-expert/SKILL.md) | Advanced performance optimization |
| [web-design-guidelines](../.agents/skills/web-design-guidelines/SKILL.md) | Vercel Web Interface Guidelines compliance |
| [tailwind-patterns](../.agents/skills/tailwind-patterns/SKILL.md) | Tailwind CSS patterns and best practices |
| [ui-styling](../.agents/skills/ui-styling/SKILL.md) | shadcn/ui implementation guidance |

---

> **Remember**: Technical excellence requires both rigorous implementation and distinctive design. Every line of code and every pixel should demonstrate intentionality and craftsmanship worthy of a luxury experience.

# Product Requirements Document (PRD)
## iTrust Academy Website 

## 1. Executive Summary

A professional B2B IT training and certification platform serving Asia. The design is clean, corporate, and trust-oriented with a burnt-orange brand color, card-based layout, and content-heavy sections focused on course details, upcoming schedules, and cross-selling professional services.

---

## 3. Design System & Tokens

### 3.1 Color Palette

```
/* === BRAND PRIMARY === */
--brand-orange:       #F27A1A    rgb(242, 122, 26)     ← Primary brand, CTAs
--brand-orange-light: rgba(242, 122, 26, 0.08)         ← Badge/light backgrounds
--brand-orange-border: rgba(242, 122, 26, 0.25)        ← Light borders

/* === VENDOR COLORS === */
--vendor-solarwinds:  #F27A1A    (orange — matches brand)
--vendor-securden:    #2BBCB3    (teal)
--vendor-quest:       #3B82F6    (blue)
--vendor-ivanti:      #7C3AED    (purple)

/* === SEMANTIC === */
--success:            #059669    rgb(5, 150, 105)      ← AVAILABLE badges
--success-bg:         #ECFDF5   rgb(236, 253, 245)     ← Badge backgrounds
--success-border:     #A7F3D0   rgb(167, 243, 208)     ← Badge borders

/* === SURFACES === */
--bg-white:           #FFFFFF
--bg-gray:            #F8F9FA   rgb(248, 249, 250)     ← Alternating sections
--border-default:     #E5E7EB   rgb(229, 231, 235)     ← Cards, dividers
--border-strong:      #374151   rgb(55, 65, 81)        ← Footer divider

/* === TEXT === */
--text-dark:          #111827   rgb(17, 24, 39)        ← Headings, primary
--text-secondary:     #6B7280   rgb(107, 114, 128)     ← Body secondary
--text-muted:         #9CA3AF   rgb(156, 163, 175)     ← Tertiary
--text-white:         #FFFFFF

/* === FOOTER === */
--footer-bg:          #1F2937   rgb(31, 41, 55)        ← Dark charcoal
--footer-text:        #D1D5DB   rgb(209, 213, 219)     ← Muted white
--footer-heading:     #FFFFFF
--footer-border:      #374151
```

### 3.2 Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--font-body` | `'DM Sans', sans-serif` | All body text, headings, UI |
| `--font-mono` | `'Space Mono', monospace` | Labels, badges, accent text |

**Font weights observed:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### 3.3 Spacing & Layout

```
--card-padding:       28px
--section-gap:        80-120px (vertical between sections)
--card-radius:        14px      ← Primary card radius
--button-radius:      10px      ← CTA button radius
--badge-radius:       4px       ← Status badges
--max-width:          ~1200px   (centered content container)
--nav-height:         ~64px
```

### 3.4 Button System

| Type | Background | Color | Border | Radius | Font |
|------|-----------|-------|--------|--------|------|
| **Primary CTA** | `#F27A1A` | `#FFFFFF` | none | 10px | 14px/600 |
| **Secondary/Outline** | `#FFFFFF` | `#111827` | 1px `#E5E7EB` | 10px | 14px/600 |
| **Nav "Enroll Now"** | `#F27A1A` | `#FFFFFF` | none | 10px | 14px/600 |
| **Nav link buttons** | transparent | `#111827` | none | — | 14px/500 |

### 3.5 Vendor Card System

Each vendor card has:
- **Top border:** 3px solid in vendor color (SolarWinds=orange, others per vendor)
- **Other borders:** 1px `#E5E7EB`
- **Border-radius:** 14px
- **Padding:** 28px
- **Background:** `#FFFFFF`
- **Hover:** cursor pointer, potential subtle shadow
- **Expanded state:** Shows full description paragraph below vendor name

---

## 4. Site Structure

| Nav Item | Target | Status |
|----------|--------|--------|
| Home | Scroll to top | Functional |
| Courses | Section anchor | Placeholder/scroll |
| Schedule | Section anchor | Placeholder/scroll |
| Blog | — | Placeholder |
| Contact | — | Placeholder |
| Enroll Now | — | Placeholder |

---

## 5. Page Sections — Detailed Spec

### 5.1 Navigation Bar

**Layout:** Full-width, sticky/fixed top. White background. Horizontal flex layout.

```
┌──────────────────────────────────────────────────────────┐
│ [Logo]   Home  Courses  Schedule  Blog  Contact  [Enroll │Now]  [☰] │
└──────────────────────────────────────────────────────────┘
```

| Element | Details |
|---------|---------|
| Logo | Base64 PNG — orange gradient shield with "iTrust Academy" text. 300×115 native, rendered ~140px wide |
| Nav links | 5 text buttons: Home, Courses, Schedule, Blog, Contact |
| CTA | "Enroll Now" — orange filled button, right-aligned |
| Mobile | Hamburger icon replaces nav links; logo + Enroll Now remain |

### 5.2 Hero Section

**Background:** White (`#FFFFFF`)

**Layout:** Single column, centered content. No hero image — pure text-focused.

```
┌────────────────────────────────────┐
│        NOW ENROLLING — Q2 2026     │  ← Orange pill badge
│                                    │
│    Advance Your IT Career.         │  ← h1, large, bold
│         Get Certified.             │
│                                    │
│  iTrust Academy delivers expert-   │  ← Subtitle paragraph
│  led, hands-on training across...  │
│                                    │
│  [Explore SCP Fundamentals →]      │  ← Primary CTA
│  [View All Courses]                │  ← Secondary outline
│                                    │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐     │
│  │  4  │ │ 5+ │ │Asia│ │SCP │     │  ← 4 stat badges
│  │Tech │ │Prog│ │Wide│ │Cert│     │
│  └────┘ └────┘ └────┘ └────┘     │
└────────────────────────────────────┘
```

**Components:**
- **Enrollment badge:** Pill shape, orange-tinted bg, uppercase text, letter-spacing
- **H1:** "Advance Your IT Career." (line 1) + "Get Certified." (line 2, bold)
- **Subtitle:** Full-width paragraph describing the academy
- **CTAs:** Two buttons side-by-side (primary orange + outline)
- **Stats row:** 4 compact stat blocks with number + label

### 5.3 Authorized Training Partner Section

**Background:** Light gray (`#F8F9FA`)

**Section header:**
- Label: "AUTHORIZED TRAINING PARTNER" (uppercase, small, orange-tinted)
- H2: "Training Across Leading IT Platforms"

**Vendor Cards Grid:** 2×2 on desktop, stacked on mobile.

Each card:
```
┌─────────────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │ ← 3px top border (vendor color)
│                             │
│  SolarWinds                 │ ← Vendor name (vendor color, bold)
│  Enterprise observability,  │ ← Description (expandable)
│  network monitoring...      │
│                             │
└─────────────────────────────┘
```

| Vendor | Top Border Color | Name Color | Status |
|--------|-----------------|------------|--------|
| SolarWinds | `#F27A1A` (orange) | `#F27A1A` | Active |
| Securden | `#2BBCB3` (teal) | `#2BBCB3` | Active |
| Quest | `#3B82F6` (blue) | `#3B82F6` | Active |
| Ivanti | `#7C3AED` (purple) | `#7C3AED` | Active |

**Interaction:** Clicking a card toggles expansion to show the full description paragraph.

### 5.4 "Training That Gets Results" (Why Choose Us)

**Background:** White (`#FFFFFF`)

**Section header:**
- Label: "WHY CHOOSE US"
- H2: "Training That Gets Results"

**Features Grid:** 3×2 on desktop (6 items), 2×3 on tablet, 1×6 on mobile.

Each feature card:
```
┌──────────────────────────────┐
│  🎓                          │ ← Emoji icon
│  Vendor-Certified Instructors│ ← Title (bold)
│  SolarWinds courses led by.. │ ← Description
└──────────────────────────────┘
```

**Features:**
1. 🎓 **Vendor-Certified Instructors** — SolarWinds courses led by SolarWinds Certified Instructors
2. 🖥️ **Hands-On Lab Environments** — Every course includes dedicated lab environments
3. 📋 **Certification-Aligned Curriculum** — Courses align to SCP exam domains
4. 🌏 **Regional Expertise** — Training in English, Mandarin, and Bahasa Melayu
5. ✅ **Certification Support** — SCP exam vouchers (2 attempts) included
6. 📞 **Post-Training Support** — Study materials, practice resources, instructor Q&A

### 5.5 Featured Course: SCP Observability Fundamentals

**Background:** White (`#FFFFFF`), full-width section.

**Layout:** Two-column on desktop. Left = course modules. Right = sidebar with exam domains + inclusions.

```
┌────────────────────────────────────────────────────────────┐
│ FEATURED COURSE · SOLARWINDS                               │
│ SCP Observability Self-Hosted Fundamentals                 │ ← h2
│                                                            │
│ This intensive 3-day program prepares IT professionals...  │ ← Description
│                                                            │
│ ┌─────────────────────────┐  ┌───────────────────────────┐ │
│ │ MODULE 1                │  │ SCP EXAM DOMAINS          │ │
│ │ Platform Architecture   │  │ ┌───────────────────────┐ │ │
│ │ & Node Management       │  │ │ Architecture    10% D1│ │ │
│ │ SCP Exam: 1.1 + 1.2    │  │ │ Node Mgmt       12% D1│ │ │
│ │ ─────────────────────── │  │ │ Customization   25% D2│ │ │
│ │ • SolarWinds Platform.. │  │ │ Alerts          20% D3│ │ │
│ │ • Network Sonar Wizard  │  │ │ Reports         20% D3│ │ │
│ │ • Node management...    │  │ │ Troubleshooting 13% D3│ │ │
│ │ +3 more topics          │  │ └───────────────────────┘ │ │
│ ├─────────────────────────┤  │                           │ │
│ │ MODULE 2                │  │ WHAT'S INCLUDED           │ │
│ │ Customization & User    │  │ ✓ 3 days training by SCI │ │
│ │ Experience              │  │ ✓ Official curriculum    │ │
│ │ ...                     │  │ ✓ Hands-on lab access    │ │
│ ├─────────────────────────┤  │ ✓ Study guide & 250 Q's  │ │
│ │ MODULE 3                │  │ ✓ SCP voucher (2 tries)  │ │
│ │ Alerts, Reports &       │  │ ✓ Certificate of compl.  │ │
│ │ Troubleshooting Tools   │  │                           │ │
│ │ ...                     │  │ [View Full Course Details→]│ │
│ └─────────────────────────┘  └───────────────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

**Left Column — Course Modules:**
- 3 expandable module cards, each with:
  - Module number (large, bold)
  - Module title + SCP exam domain reference
  - Bullet list of topics with checkmark icons
  - "+N more topics" toggle

**Right Column — Sidebar (stacked):**

*Exam Domains Table:*
- Header: "SCP EXAM DOMAINS"
- 6-row table: Domain Name | Weight % | Day
- Row borders: 1px `#F0F0F0`
- Compact, data-dense layout

*What's Included List:*
- Header: "WHAT'S INCLUDED"
- 6 items with green checkmark icons:
  - 3 days of training by a SolarWinds Certified Instructor
  - Official SolarWinds Academy curriculum
  - Hands-on lab environment access
  - HCO Fundamentals Study Guide & 250 practice questions
  - SCP exam voucher (2 attempts included)
  - Certificate of completion

*CTA:* "View Full Course Details →" (orange button)

### 5.6 Upcoming Training Dates

**Background:** Light gray (`#F8F9FA`)

**Section header:**
- Label: "UPCOMING TRAINING"
- H2: "Next Public Course Dates"
- Subtitle: "Browse our full schedule or register your interest for an upcoming session."

**Schedule Cards:** List layout, each card is a row.

```
┌──────────────────────────────────────────────────────────┐
│ SolarWinds                                               │
│ SolarWinds Observability Self-Hosted Fundamentals        │
│                                                          │
│ 📅 14 Apr–16 Apr    📍 Singapore    [AVAILABLE]          │
└──────────────────────────────────────────────────────────┘
```

Each card:
- Left-accent border: 4px solid `#F27A1A` (orange)
- Border-radius: 14px
- Background: `#FFFFFF`
- Content:
  - Vendor name (small, vendor color)
  - Course title (bold)
  - Meta row: Date (calendar icon) | Location (pin icon) | Status badge
- **Status badge "AVAILABLE":** `#059669` text, `#ECFDF5` bg, `#A7F3D0` border, 4px radius
- **Hover:** cursor pointer, subtle elevation

**CTA:** "View Full Schedule →" (orange button, centered below cards)

### 5.7 "Beyond Training" — iTrustech Professional Services

**Background:** White (`#FFFFFF`)

**Section header:**
- Label: "iTRUSTECH PROFESSIONAL SERVICES"
- H2: "Beyond Training — We're Here to Help"
- Subtitle: "iTrust Academy is the training arm of iTrustech. For hands-on help beyond certification, our professional services team has you covered."

**Services Grid:** List/cards linking to `https://www.itrustech.com`

Each service card:
```
┌─────────────────────────────────────┐
│  Professional Services              │ ← Title (bold)
│  Deployment, configuration, and     │ ← Description
│  platform optimization.             │
│                                     │
│  itrustech.com →                    │ ← External link
└─────────────────────────────────────┘
```

**5 Services:**
1. Professional Services — Deployment, configuration, and platform optimization
2. Migration & Upgrades — Planning, execution, and post-migration validation
3. Health Assessments — Environment health checks with actionable recommendations
4. Optimization — Alert tuning, reporting, and polling optimization
5. Software Licensing — Licensing guidance, renewals, and procurement

**Bottom note:** "iTrust Academy = Training & Certification | iTrustech = Professional Services, Licensing & More → www.itrustech.com"

### 5.8 Footer

**Background:** Dark charcoal (`#1F2937`)

**Layout:** 5-column grid on desktop, stacked on mobile.

```
┌──────────────────────────────────────────────────────────────────┐
│ SolarWinds         Other Vendors    Resources    Company   Need │
│ ─────────────      ──────────────   ─────────    ───────   More │
│ SCP Fundamentals   Securden PAM     Blog         About     ...  │
│ SAM & Log Analyz.  Quest (Soon)     Schedule     Contact        │
│ Database Fund.     Ivanti (Soon)    SCP Exam ↗                   │
│ Service Desk                                                     │
├──────────────────────────────────────────────────────────────────┤
│ [Logo]  © 2026 iTrust Academy by iTrustech Pte Ltd              │
│         Headquarters in Singapore · Offices in HK & Malaysia     │
└──────────────────────────────────────────────────────────────────┘
```

**Column 1 — SolarWinds Courses:**
- SCP Fundamentals
- SAM & Log Analyzer
- Database Fund. & Adv.
- Service Desk & Leadership

**Column 2 — Other Vendors:**
- Securden PAM
- Quest (Coming Soon)
- Ivanti (Coming Soon)

**Column 3 — Resources:**
- Blog
- Schedule
- SCP Exam Info (external link → solarwinds.com)

**Column 4 — Company:**
- About iTrustech (external link → itrustech.com)
- Contact Us

**Column 5 — Need More Than Training?:**
- Professional Services (→ itrustech.com)
- Migration & Upgrades (→ itrustech.com)
- Health Assessments (→ itrustech.com)
- Software Licensing (→ itrustech.com)

**Bottom Bar:**
- Logo (small)
- "© 2026 iTrust Academy by iTrustech Pte Ltd"
- "Headquarters in Singapore · Offices in Hong Kong & Malaysia · Training across Asia"

---

## 6. Interactive Behaviors

| Component | Behavior |
|-----------|----------|
| **Vendor cards** | Click to expand/collapse description text. Toggle with animation. |
| **Course module cards** | Expand/collapse to show "+N more topics" |
| **Nav buttons** | Smooth scroll to corresponding section (or non-functional placeholder) |
| **Mobile hamburger** | Slide-in or overlay menu with all nav links |
| **CTA buttons** | Hover: subtle opacity/darken shift. Press: scale down slightly. |
| **Schedule cards** | Hover: slight elevation + border highlight |
| **External links** | Open in new tab (itrustech.com, solarwinds.com) |
| **"Enroll Now"** | Placeholder — could link to a form or be non-functional |

---

## 7. Responsive Design

### Breakpoints

| Breakpoint | Width | Layout Changes |
|-----------|-------|----------------|
| Mobile | < 768px | Single column, hamburger nav, stacked cards |
| Tablet | 768–1023px | 2-column vendor grid, condensed layout |
| Desktop | ≥ 1024px | Full layout, 2-column vendor grid, side-by-side course details |

### Mobile-Specific Changes
- **Nav:** Hamburger menu (top-right), logo left, "Enroll Now" button visible
- **Hero:** Stats badges wrap to 2×2 grid
- **Vendor cards:** Stack vertically
- **Features:** Stack to single column
- **Course section:** Modules and sidebar stack vertically
- **Schedule cards:** Full width
- **Services:** Stack vertically
- **Footer:** Single column, accordion-style or stacked sections

---

## 8. Asset Requirements

| Asset | Format | Details |
|-------|--------|---------|
| **Logo** | SVG (preferred) or PNG | Orange gradient shield with "iTrust Academy" wordmark. Current: 300×115 base64 PNG |
| **Vendor icons** | Inline SVG | Optional logos for SolarWinds, Securden, Quest, Ivanti |
| **Feature emoji** | Unicode emoji | 🎓 🖥️ 📋 🌏 ✅ 📞 (no image assets needed) |
| **Checkmark icon** | Inline SVG | Green checkmark for "What's Included" list |
| **Arrow icons** | Inline SVG | Right arrows for "→" on CTAs and links |
| **Calendar icon** | Inline SVG | Used in schedule date display |
| **Location pin icon** | Inline SVG | Used in schedule location display |
| **External link icon** | Inline SVG | Small arrow/box icon for outbound links |
| **Hamburger icon** | Inline SVG | Mobile nav toggle |
| **Chevron/down icon** | Inline SVG | For expandable sections (vendor cards, modules) |

---

## 9. Content Inventory

### 9.1 Copy Text

**Hero:**
> NOW ENROLLING — Q2 2026
> Advance Your IT Career. Get Certified.
> iTrust Academy delivers expert-led, hands-on training across SolarWinds, Securden, Quest, and Ivanti — equipping IT professionals across Asia with the skills and certifications employers demand.

**Stats:** 4 Technology Vendors | 5+ Training Programs | Asia-Wide Coverage | SCP Certification Prep

**Section — Authorized Training Partner:**
> Training Across Leading IT Platforms

**Vendor descriptions:**
- **SolarWinds:** Enterprise observability, network monitoring, database performance, and ITSM. SolarWinds Certified Instructors delivering official SolarWinds Academy curriculum. SCP exam vouchers included.
- **Securden:** Unified Privileged Access Management for credential security, session monitoring, and compliance. Training by Securden Authorized Trainers.
- **Quest:** IT management, Active Directory security, migration, and data protection. Authorized training for Quest product deployment.
- **Ivanti:** Endpoint management, ITSM, and security for the modern digital workplace. Authorized Ivanti platform training.

**Section — Why Choose Us:**
> Training That Gets Results

**Section — Featured Course:**
> FEATURED COURSE · SOLARWINDS
> SCP Observability Self-Hosted Fundamentals
> This intensive 3-day program prepares IT professionals for the SolarWinds Certified Professional (SCP) Hybrid Cloud Observability Fundamentals examination.

**Section — Upcoming Training:**
> Next Public Course Dates
> Browse our full schedule or register your interest for an upcoming session.

**Schedule entries:**
1. SolarWinds Observability Self-Hosted Fundamentals — 14 Apr–16 Apr — Singapore — AVAILABLE
2. SolarWinds Observability Self-Hosted Fundamentals — 21 Apr–23 Apr — Online (Zoom) — AVAILABLE
3. Securden Unified PAM — Administration Training — 28 Apr–29 Apr — Singapore — AVAILABLE

**Section — Professional Services:**
> Beyond Training — We're Here to Help
> iTrust Academy is the training arm of iTrustech. For hands-on help beyond certification, our professional services team has you covered.

---

### Core Design Philosophy

The project follows a **"Precision Futurism"** aesthetic, emphasizing:
- **Technologic Minimalism:** High-contrast, code-first aesthetics (JetBrains Mono, Space Grotesk).
- **CSS-First Styling:** utilizing Tailwind CSS with extensive CSS variables for theming.
- **Component-Driven UI:** Leveraging Shadcn/UI primitives for accessible, composable interfaces.

> **✅ Current Status:** The project is now **Production Ready** with:
> - **257 backend tests passing** (including 18 soft delete tests)
> - **92+ frontend tests passing**
> - **Full API integration** for core pages
> - **Complete payment processing** with Stripe
> - **Command Palette search** fully functional

---

## 2. High-Level System Architecture

The system follows a strictly decoupled **Client-Server** architecture.

```mermaid
graph TD
    User[User / Browser]
    
    subgraph Frontend [Frontend (Vite + React)]
        SPA[Single Page App]
        Router[React Router v6]
        TanStack[TanStack Query - Data Fetching]
        Zustand[State Management]
        UI[Shadcn UI Components]
        SearchDialog[Command Palette Search]
    end
    
    subgraph Backend [Backend (Django)]
        API[Django REST Framework]
        Auth[SimpleJWT Authentication]
        Logging[APILoggingMiddleware - Audit Trail]
        Admin[Django Admin]
        
        subgraph Services
            CoursesApp[Courses App]
            UsersApp[Users App]
            EnrollmentApp[Enrollment App]
            SoftDelete[Soft Delete Infrastructure]
        end
    end
    
    subgraph Infrastructure
        DB[(PostgreSQL)]
        Redis[(Redis Cache)]
        Stripe[Stripe Payment Gateway]
        Storage[MinIO / S3 - Media]
    end

    User -->|HTTPS| SPA
    SPA -->|REST API (JSON)| API
    API -->|Read/Write| DB
    API -->|Cache| Redis
    API -->|Payments| Stripe
    API -->|Object Storage| Storage
    SPA -->|Search| SearchDialog
    API -->|Soft Delete| SoftDelete
```

---

## 3. Frontend Architecture

The frontend is built with **React 19** using **Vite 7** for tooling. It follows a modular architecture separating pages, sections, and low-level primitives.

### 3.1 Directory Structure

```mermaid
graph TD
    src[src]
    src --> components[components]
    src --> pages[pages]
    src --> sections[sections]
    src --> services[services/api]
    src --> hooks[hooks]
    src --> types[types]
    src --> lib[lib - utilities]
    
    components --> ui[ui (Shadcn)]
    components --> Payment[PaymentForm.tsx]
    components --> Search[SearchDialog.tsx]
    components --> Cohort[CohortSelector.tsx]
    
    pages --> Courses[CoursesPage.tsx]
    pages --> Detail[CourseDetailPage.tsx]
    pages --> Enroll[EnrollmentPage.tsx]
    pages --> Register[RegisterPage.tsx]
    pages --> Login[LoginPage.tsx]
    
    services --> Client[client.ts - Axios]
    services --> CoursesAPI[courses.ts]
    services --> Payments[payments.ts]
    services --> Auth[auth.ts]
    
    sections --> Hero[Hero.tsx]
    sections --> Featured[FeaturedCourse.tsx]
    sections --> Schedule[TrainingSchedule.tsx]
    
    types --> API[api.ts]
    types --> PaymentTypes[payment.ts]
    types --> CourseTypes[course.ts]
```

### 3.2 Key Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| **Vite** | 7.3.0 | Build tool and dev server |
| **React** | 19.2.0 | UI Library |
| **TanStack Query** | 5.x | Server state management and caching |
| **Tailwind CSS** | 3.4.19 | Styling engine with CSS-variable based theme |
| **Framer Motion** | 12.35.0 | High-fidelity animations |
| **Stripe SDK** | 14.4.1 | Frontend payment processing (Stripe Elements) |
| **cmdk** | Latest | Command Palette component library |
| **Zustand** | 5.0.3 | Client state management |

### 3.3 Design System Implementation
Centralized in `src/index.css` via CSS variables.
- **Sharp Corners:** `--radius: 0rem` mandatory.
- **Accent Top:** `card-accent-top` pattern for all containers.
- **Contrast:** High contrast Ivory/Indigo/Cyan palette.
- **Typography:** Space Grotesk (Display), Inter (Body), JetBrains Mono (Code).

### 3.4 Data Flow
- **Integrated Pages:** Use `useQuery` hooks from `src/hooks/` which consume services in `src/services/api/`.
- **Command Palette:** Real-time search with API integration via `SearchDialog.tsx`.
- **State Management:** Zustand for client state, TanStack Query for server state.

### 3.5 Key Components
- **SearchDialog.tsx:** Command Palette search with real-time filtering
- **PaymentForm.tsx:** Stripe Elements integration for payment processing
- **CohortSelector.tsx:** Interactive cohort selection component
- **EnrollmentPage.tsx:** Multi-step enrollment wizard

---

## 4. Backend Architecture

A modular **Django 6.0.3** application utilizing DRF for a standardized REST API.

### 4.1 Middleware & Security
- **JWT:** simplejwt for secure token-based authentication.
- **Audit Logging:** `APILoggingMiddleware` records every API request with user metadata, IP, and duration.
- **Throttling:** Scoped rate limiting for anonymous, authenticated, and enrollment endpoints.
- **Response Envelopes:** All responses wrapped in a `SuccessResponse` or error envelope via `ResponseFormatterMixin`.

### 4.2 Application Modules
1. **`users`:** Custom User model, registration, and profile management.
2. **`courses`:** Core domain models (Course, Category, Cohort, Enrollment).
3. **`api`:** The DRF implementation layer (Views, Serializers, Custom Exceptions).
4. **Soft Delete Infrastructure:** Implemented across Course, Cohort, Enrollment models.

### 4.3 Key Features
- **N+1 Optimization:** 82% query reduction via `select_related` and `prefetch_related`.
- **Field-Level Permissions:** Serializers conditionally hide sensitive fields (e.g., `enrolled_count`) from anonymous users.
- **Caching:** Redis-backed caching for high-traffic endpoints (Courses, Categories).
- **Soft Delete:** Full implementation with `deleted_at` field, custom managers, and restore functionality.
- **Payment Processing:** Stripe PaymentIntent creation and webhook handling.
- **Request Logging:** Comprehensive audit trail with structured logging.

### 4.4 Test Infrastructure
- **Total Tests:** 257 passing (including 18 soft delete tests)
- **Test Framework:** Django TestCase / DRF APITestCase
- **Coverage:** Comprehensive TDD with all major features tested

---

## 5. Key Interactions & Workflows

### 5.1 Enrollment & Payment Flow
1. **Client:** `POST /api/v1/enrollments/` (Authenticated).
2. **Server:** Validates capacity, creates a `pending` Enrollment.
3. **Client:** `POST /api/v1/payments/create-intent/` with `enrollment_id`.
4. **Server:** Returns Stripe `client_secret`.
5. **Client:** Confirms payment via Stripe Elements.
6. **Server (Webhook):** Receives `payment_intent.succeeded`, updates Enrollment to `confirmed`.

### 5.2 Search Flow
1. **Client:** Opens Command Palette (Ctrl+K or click search button).
2. **Client:** User types search query (minimum 2 characters).
3. **Client:** `GET /api/v1/courses/?search={query}`.
4. **Server:** Returns filtered courses.
5. **Client:** Displays results in Command Palette.

### 5.3 Registration Flow
1. **Client:** Fills registration form (email, username, password, checkbox).
2. **Client:** `POST /api/v1/auth/register/`.
3. **Server:** Validates data, creates user.
4. **Client:** Auto-login with returned token.
5. **Client:** Redirects to homepage.

---

## 7. Developer Handbook

### 7.1 Running Tests
- **Backend:** `cd backend && python manage.py test`
- **Backend (specific):** `cd backend && python manage.py test courses.tests.test_soft_delete`
- **Frontend:** `cd frontend && npm run test`
- **E2E:** `cd frontend && npm run test tests/e2e/smoke.spec.ts`

### 7.2 Adding a New View
1. Inherit from `ResponseFormatterMixin` in `api/views/all_views.py`.
2. Apply `@extend_schema` for OpenAPI documentation.
3. Update `api/urls.py`.
4. Add tests in `api/tests/`.

### 7.3 Adding a New Component
1. Check if Shadcn/UI has a primitive component.
2. Create in `src/components/ui/` if primitive, or `src/components/` if feature.
3. Export from appropriate index file.
4. Add Storybook documentation (if applicable).

### 7.4 Common Commands
```bash
# Start servers
./start_servers.sh

# Backend tests
cd backend && python manage.py test

# Frontend tests
cd frontend && npm run test

# Build for production
cd frontend && npm run build
```

### 7.5 Troubleshooting
| Issue | Solution |
|-------|----------|
| Tests not discovered | Check `__init__.py` in test directories |
| Button not responding | Verify onClick handler is attached |
| Command Palette not showing results | Check `shouldFilter={false}` prop |
| Registration fails | Verify first_name/last_name handling |
| Build fails with TypeScript errors | Check `import type` syntax |

---

## 8. Technology Stack Summary

| Component | Technology | Version |
|-----------|------------|---------|
| Frontend Framework | React | 19.2.0 |
| Build Tool | Vite | 7.3.0 |
| Styling | Tailwind CSS | 3.4.19 |
| State Management | Zustand | 5.0.3 |
| Server State | TanStack Query | 5.x |
| UI Components | Shadcn/UI | Latest |
| Command Palette | cmdk | Latest |
| Backend Framework | Django | 6.0.3 |
| API Framework | Django REST Framework | 3.15.2 |
| Database | PostgreSQL | 16 |
| Cache | Redis | 5.2.1 |
| Payments | Stripe | 14.4.1 |
| Authentication | SimpleJWT | Latest |

---

{
  "name": "frontend",
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
    "test:coverage": "vitest run --coverage"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.2.2",
    "@radix-ui/react-accordion": "^1.2.12",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-aspect-ratio": "^1.1.8",
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-collapsible": "^1.1.12",
    "@radix-ui/react-context-menu": "^2.2.16",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-hover-card": "^1.1.15",
    "@radix-ui/react-label": "^2.1.8",
    "@radix-ui/react-menubar": "^1.1.16",
    "@radix-ui/react-navigation-menu": "^1.2.14",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.8",
    "@radix-ui/react-radio-group": "^1.3.8",
    "@radix-ui/react-scroll-area": "^1.2.10",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slider": "^1.3.6",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-toggle": "^1.1.10",
    "@radix-ui/react-toggle-group": "^1.1.11",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@stripe/react-stripe-js": "^5.6.1",
    "@stripe/stripe-js": "^8.11.0",
    "@tanstack/react-query": "^5.91.3",
    "axios": "^1.13.6",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.6.0",
    "framer-motion": "^12.35.0",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.562.0",
    "next-themes": "^0.4.6",
    "react": "^19.2.0",
    "react-day-picker": "^9.13.0",
    "react-dom": "^19.2.0",
    "react-hook-form": "^7.70.0",
    "react-resizable-panels": "^4.2.2",
    "react-router-dom": "^6.30.3",
    "recharts": "^2.15.4",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.4.0",
    "vaul": "^1.1.2",
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
    "autoprefixer": "^10.4.23",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "jsdom": "^29.0.1",
    "kimi-plugin-inspect-react": "^1.0.3",
    "msw": "^2.12.14",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.19",
    "tailwindcss-animate": "^1.0.7",
    "tw-animate-css": "^1.4.0",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.46.4",
    "vite": "^7.2.4",
    "vitest": "^4.1.0"
  }
}
Django==6.0.3
djangorestframework==3.16.1
django-cors-headers==4.9.0
django-filter==25.2
django-storages==1.14.6
django-redis==6.0.0
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
drf-spectacular==0.29.0
-r base.txt

pytest==9.0.2
pytest-django==4.12.0
factory-boy==3.3.3
black==23.12.1
flake8==6.1.0
mypy==1.19.1
django-debug-toolbar==6.2.0

---

### Base URL
```
Development: http://localhost:8000/api/v1/
Production:  https://api.aiacademy.com/api/v1/
```

### Supported HTTP Methods
- `GET` - Retrieve resources
- `POST` - Create resources
- `PUT/PATCH` - Update resources
- `DELETE` - Remove resources

### Content Type
All requests should include:
```
Content-Type: application/json
```

---

## Base Configuration

### Current Settings (backend/academy/settings/base.py)

```python
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
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
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 10,
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],
    "EXCEPTION_HANDLER": "api.exceptions.standardized_exception_handler",
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}
```

### CORS Configuration
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",      # React dev server (if used)
    "http://127.0.0.1:3000",
    "http://localhost:5173",      # Vite dev server
]
```

**Note:** Development settings use `CORS_ALLOW_ALL_ORIGINS = True`

---

## Authentication

### JWT Token Authentication (Fully Operational) ✅

The API uses **JWT (JSON Web Token)** authentication via `djangorestframework-simplejwt`.

#### Token Lifetimes
- **Access Token:** 30 minutes
- **Refresh Token:** 7 days (with rotation and blacklist)

### Obtain Token Pair
```http
POST /api/v1/auth/token/
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response (200 OK):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### Refresh Access Token
```http
POST /api/v1/auth/token/refresh/
Content-Type: application/json

{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

**Response (200 OK):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### Verify Token
```http
POST /api/v1/auth/token/verify/
Content-Type: application/json

{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
}
```

### Using Tokens
All protected endpoints require the access token in the Authorization header:

```http
GET /api/v1/enrollments/
Authorization: Bearer <access_token>
```

### Session Authentication (Admin Only)
For Django admin and browsable API:
```bash
# Login via Django admin
POST /admin/login/
```

---

## Payment Processing

### Overview

The API supports Stripe payment processing for course enrollments. The flow involves:
1. Creating a PaymentIntent on the server
2. Confirming payment on the frontend with Stripe Elements
3. Handling webhook events for async confirmation

### Endpoints

#### Create Payment Intent
```http
POST /api/v1/payments/create-intent/
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "enrollment_id": "uuid-string"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "client_secret": "pi_xxx_secret_xxx",
    "payment_intent_id": "pi_xxx",
    "status": "requires_payment_method"
  },
  "message": "Payment intent created successfully",
  "errors": {},
  "meta": {
    "timestamp": "2026-03-21T12:00:00Z",
    "request_id": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

#### Check Payment Status
```http
GET /api/v1/payments/{enrollment_id}/status/
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "enrollment_id": "uuid-string",
    "status": "confirmed",
    "payment_intent_status": "succeeded",
    "amount_received": 2499.00
  },
  "message": "Payment status retrieved",
  "errors": {},
  "meta": {
    "timestamp": "2026-03-21T12:00:00Z",
    "request_id": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

#### Stripe Webhook
```http
POST /api/v1/webhooks/stripe/
Content-Type: application/json
Stripe-Signature: <webhook_signature>

{
  "id": "evt_xxx",
  "object": "event",
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "id": "pi_xxx",
      "status": "succeeded",
      "metadata": {
        "enrollment_id": "uuid-string"
      }
    }
  }
}
```

### Security

- **Webhook Verification:** All webhooks are verified using Stripe-Signature header
- **Idempotency Keys:** Payment intents use enrollment_id + user_id to prevent duplicates
- **Rate Limiting:** 5 payment requests per minute per user
- **Ownership Validation:** Users can only pay for their own enrollments

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `missing_enrollment_id` | 400 | enrollment_id not provided |
| `enrollment_not_found` | 404 | Enrollment does not exist |
| `permission_denied` | 403 | User does not own enrollment |
| `already_confirmed` | 400 | Enrollment already paid |
| `stripe_error` | 502 | Stripe API error |
| `stripe_retrieval_error` | 502 | Unable to retrieve payment status |

---

## API Endpoints Reference

### 1. Courses

#### List All Courses
```http
GET /api/v1/courses/
```

**Query Parameters:**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `level` | string | Filter by difficulty | `?level=intermediate` |
| `categories__slug` | string | Filter by category | `?categories__slug=ai-engineering` |
| `search` | string | Search title/subtitle/description | `?search=machine learning` |
| `ordering` | string | Sort results | `?ordering=-price` (descending) |
| `featured` | boolean | Featured courses only | `?featured=true` |

**Response (200 OK):**
```json
{
  "count": 3,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "81ef745e-1d38-4c49-9cd2-f53f7f434d79",
      "slug": "ai-engineering-bootcamp",
      "title": "AI Engineering Bootcamp",
      "subtitle": "Master production-grade AI development",
      "thumbnail": null,
      "thumbnail_alt": "",
      "categories": [
        {
          "id": 1,
          "name": "AI Engineering",
          "slug": "ai-engineering",
          "description": "",
          "color": "#4f46e5",
          "icon": "Cpu",
          "course_count": 1
        }
      ],
      "level": "intermediate",
      "modules_count": 12,
      "duration_weeks": 8,
      "price": "2499.00",
      "original_price": null,
      "discount_percentage": 0,
      "currency": "USD",
      "rating": "4.8",
      "review_count": 127,
      "enrolled_count": 89,
      "is_featured": true
    }
  ]
}
```

#### Get Course Detail
```http
GET /api/v1/courses/{slug}/
```

**Response (200 OK):**
```json
{
  "id": "81ef745e-1d38-4c49-9cd2-f53f7f434d79",
  "slug": "ai-engineering-bootcamp",
  "title": "AI Engineering Bootcamp",
  "subtitle": "Master production-grade AI development",
  "description": "A comprehensive bootcamp covering transformer architectures...",
  "thumbnail": null,
  "thumbnail_alt": "",
  "categories": [...],
  "level": "intermediate",
  "modules_count": 12,
  "duration_weeks": 8,
  "duration_hours": 40,
  "price": "2499.00",
  "original_price": null,
  "discount_percentage": 0,
  "currency": "USD",
  "rating": "4.8",
  "review_count": 127,
  "enrolled_count": 89,
  "meta_title": "",
  "meta_description": "",
  "created_at": "2026-03-20T12:00:00Z",
  "updated_at": "2026-03-20T12:00:00Z"
}
```

#### Get Course Cohorts (Custom Action)
```http
GET /api/v1/courses/{slug}/cohorts/
```

**Response (200 OK):**
```json
[
  {
    "id": "ac467ab2-fc48-4609-9a71-9706080e08a7",
    "course_title": "AI Engineering Bootcamp",
    "course_slug": "ai-engineering-bootcamp",
    "start_date": "2026-04-19",
    "end_date": "2026-06-14",
    "timezone": "EST",
    "format": "online",
    "location": "",
    "instructor_name": "Jane Smith",
    "spots_total": 50,
    "spots_remaining": 38,
    "availability_status": "available",
    "early_bird_price": null,
    "early_bird_deadline": null,
    "status": "enrolling"
  }
]
```

⚠️ **Note:** This endpoint returns an array directly, not a paginated response.

---

### 2. Categories

#### List All Categories
```http
GET /api/v1/categories/
```

**Response (200 OK):**
```json
{
  "count": 3,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "name": "AI Engineering",
      "slug": "ai-engineering",
      "description": "",
      "color": "#4f46e5",
      "icon": "Cpu",
      "course_count": 1
    }
  ]
}
```

#### Get Category Detail
```http
GET /api/v1/categories/{slug}/
```

---

### 3. Cohorts

#### List All Cohorts
```http
GET /api/v1/cohorts/
```

**Query Parameters:**
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `course` | uuid | Filter by course ID | `?course=81ef745e-...` |
| `format` | string | Format type | `?format=online` |
| `status` | string | Cohort status | `?status=enrolling` |
| `ordering` | string | Sort by date | `?ordering=start_date` |

**Response (200 OK):**
```json
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": "ac467ab2-fc48-4609-9a71-9706080e08a7",
      "course_title": "AI Engineering Bootcamp",
      "course_slug": "ai-engineering-bootcamp",
      "start_date": "2026-04-19",
      "end_date": "2026-06-14",
      "timezone": "EST",
      "format": "online",
      "location": "",
      "instructor_name": "Jane Smith",
      "spots_total": 50,
      "spots_remaining": 38,
      "availability_status": "available",
      "early_bird_price": null,
      "early_bird_deadline": null,
      "status": "enrolling"
    }
  ]
}
```

#### Get Cohort Detail
```http
GET /api/v1/cohorts/{id}/
```

---

### 4. Enrollments (Authenticated Only)

#### List User Enrollments
```http
GET /api/v1/enrollments/
Authorization: Bearer <token>
```

**Description:** Returns a list of the authenticated user's enrollments with course and cohort details.

**Response (200 OK):**
```json
{
  "count": 0,
  "next": null,
  "previous": null,
  "results": []
}
```

#### Create Enrollment
```http
POST /api/v1/enrollments/
Authorization: Bearer <token>
Content-Type: application/json

{
  "course": "81ef745e-1d38-4c49-9cd2-f53f7f434d79",
  "cohort": "ac467ab2-fc48-4609-9a71-9706080e08a7",
  "amount_paid": "2499.00"
}
```

**Business Logic Implemented:**
- ✅ **Capacity Validation:** Returns 400 if cohort is full
- ✅ **Duplicate Prevention:** Returns 400 if already enrolled
- ✅ **Spot Reservation:** Increments `cohort.spots_reserved` atomically
- ✅ **Transaction Safety:** All operations wrapped in `@transaction.atomic`
- ✅ **Status Workflow:** New enrollments start as 'pending'
- ⏳ **Payment Integration:** Stripe integration planned (not yet implemented)

#### Cancel Enrollment
```http
POST /api/v1/enrollments/{id}/cancel/
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "status": "enrollment cancelled"
  },
  "message": "Enrollment cancelled successfully",
  "errors": {},
  "meta": {
    "timestamp": "2026-03-20T12:00:00Z",
    "request_id": "uuid"
  }
}
```

**Response (400 Bad Request):**
```json
{
  "success": false,
  "data": null,
  "message": "Enrollment is already cancelled",
  "errors": {
    "non_field_errors": [
      "Enrollment is already cancelled"
    ]
  },
  "meta": {
    "timestamp": "2026-03-20T12:00:00Z",
    "request_id": "uuid",
    "error_code": "VALIDATION_ERROR"
  }
}
```

---

### 5. User Management

#### Register New User
```http
POST /api/v1/auth/register/
Content-Type: application/json

Request:
{
  "email": "user@example.com",
  "username": "username",
  "password": "SecurePass123!",
  "first_name": "John",
  "last_name": "Doe"
}

Response (201 Created):
{
  "success": true,
  "data": {
    "user_id": "uuid"
  },
  "message": "User registered successfully",
  "errors": {},
  "meta": {
    "timestamp": "2026-03-20T12:00:00Z",
    "request_id": "uuid"
  }
}

Response (400 Bad Request - Validation Error):
{
  "success": false,
  "data": null,
  "message": "Registration failed. Please check your input.",
  "errors": {
    "email": ["user with this email already exists."],
    "username": ["A user with that username already exists."],
    "password": ["Password must be at least 8 characters long."]
  },
  "meta": {
    "timestamp": "2026-03-20T12:00:00Z",
    "request_id": "uuid",
    "error_code": "VALIDATION_ERROR"
  }
}
```

**Validation Rules:**
- **Email:** Required, unique, normalized to lowercase
- **Username:** Required, unique
- **Password:** Required, minimum 8 characters
- **First/Last Name:** Required

**cURL Example:**
```bash
curl -X POST "http://localhost:8000/api/v1/auth/register/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "username": "username",
    "password": "SecurePass123!",
    "first_name": "John",
    "last_name": "Doe"
  }'
```

---

#### Get Current User Profile
```http
GET /api/v1/users/me/
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "first_name": "John",
    "last_name": "Doe",
    "bio": "Software developer",
    "phone": "123-456-7890",
    "avatar_url": "http://localhost:8000/media/avatars/...",
    "company": "Tech Corp",
    "title": "Senior Developer",
    "linkedin_url": "https://linkedin.com/in/...",
    "github_url": "https://github.com/...",
    "is_student": false,
    "is_instructor": false,
    "created_at": "2026-03-20T12:00:00Z",
    "updated_at": "2026-03-20T12:00:00Z"
  },
  "message": "Profile retrieved successfully",
  "errors": {},
  "meta": {
    "timestamp": "2026-03-20T12:00:00Z",
    "request_id": "uuid"
  }
}

Response (401 Unauthorized):
{
  "success": false,
  "data": null,
  "message": "Authentication required",
  "errors": {
    "detail": "Authentication credentials were not provided."
  },
  "meta": {
    "timestamp": "2026-03-20T12:00:00Z",
    "request_id": "uuid",
    "error_code": "AUTHENTICATION_ERROR"
  }
}
```

**cURL Example:**
```bash
curl -X GET "http://localhost:8000/api/v1/users/me/" \
  -H "Authorization: Bearer <token>"
```

---

#### Update User Profile
```http
PATCH /api/v1/users/me/
Authorization: Bearer <token>
Content-Type: application/json

Request:
{
  "first_name": "Jane",
  "bio": "Senior software engineer",
  "company": "New Company"
}

Response (200):
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "username",
    "first_name": "Jane",
    "last_name": "Doe",
    "bio": "Senior software engineer",
    "phone": "123-456-7890",
    "avatar_url": "http://localhost:8000/media/avatars/...",
    "company": "New Company",
    "title": "Senior Developer",
    "linkedin_url": "https://linkedin.com/in/...",
    "github_url": "https://github.com/...",
    "is_student": false,
    "is_instructor": false,
    "created_at": "2026-03-20T12:00:00Z",
    "updated_at": "2026-03-20T12:01:00Z"
  },
  "message": "Profile updated successfully",
  "errors": {},
  "meta": {
    "timestamp": "2026-03-20T12:01:00Z",
    "request_id": "uuid"
  }
}
```

**Updatable Fields:**
- `first_name`
- `last_name`
- `bio`
- `phone`
- `company`
- `title`
- `linkedin_url`
- `github_url`

**Read-Only Fields:** (Cannot be updated)
- `id`, `email`, `username`
- `is_student`, `is_instructor`
- `created_at`, `updated_at`

**cURL Example:**
```bash
curl -X PATCH "http://localhost:8000/api/v1/users/me/" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "Jane",
    "bio": "Updated bio"
  }'
```

---

#### Request Password Reset
```http
POST /api/v1/auth/password-reset/
Content-Type: application/json

Request:
{
  "email": "user@example.com"
}

Response (200):
{
  "success": true,
  "data": {
    "message": "Password reset email sent."
  },
  "message": "Password reset email sent if account exists.",
  "errors": {},
  "meta": {
    "timestamp": "2026-03-20T12:00:00Z",
    "request_id": "uuid"
  }
}
```

**Security Note:** Returns 200 even if email doesn't exist to prevent user enumeration.

**cURL Example:**
```bash
curl -X POST "http://localhost:8000/api/v1/auth/password-reset/" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com"
  }'
```

---

#### Confirm Password Reset
```http
POST /api/v1/auth/password-reset/confirm/
Content-Type: application/json

Request:
{
  "token": "reset-token-from-email",
  "uid": "user-uid-from-email",
  "new_password": "NewSecurePass123!"
}

Response (200):
{
  "success": true,
  "data": {
    "message": "Password reset successful."
  },
  "message": "Password has been reset successfully.",
  "errors": {},
  "meta": {
    "timestamp": "2026-03-20T12:00:00Z",
    "request_id": "uuid"
  }
}

Response (400 Bad Request - Invalid Token):
{
  "success": false,
  "data": null,
  "message": "Invalid reset token.",
  "errors": {
    "token": ["Invalid or expired token."]
  },
  "meta": {
    "timestamp": "2026-03-20T12:00:00Z",
    "request_id": "uuid",
    "error_code": "VALIDATION_ERROR"
  }
}
```

**cURL Example:**
```bash
curl -X POST "http://localhost:8000/api/v1/auth/password-reset/confirm/" \
  -H "Content-Type: application/json" \
  -d '{
    "token": "reset-token",
    "uid": "user-uid",
    "new_password": "NewSecurePass123!"
  }'
```

---

### 6. Admin Interface

```http
GET /admin/
```

**Authentication:** Session-based (requires superuser)

---

## Request/Response Examples

### Example 1: Search Courses
```bash
curl -X GET "http://localhost:8000/api/v1/courses/?search=AI&ordering=-rating" \
  -H "Content-Type: application/json"
```

### Example 2: Filter by Level and Category
```bash
curl -X GET "http://localhost:8000/api/v1/courses/?level=intermediate&categories__slug=ai-engineering" \
  -H "Content-Type: application/json"
```

### Example 3: Get Upcoming Cohorts for a Course
```bash
curl -X GET "http://localhost:8000/api/v1/courses/ai-engineering-bootcamp/cohorts/" \
  -H "Content-Type: application/json"
```

---

## Filtering & Search

### Available Filters by Endpoint

| Endpoint | Filters |
|----------|---------|
| `/courses/` | `level`, `categories__slug` |
| `/courses/` | `?featured=true` (custom query param) |
| `/cohorts/` | `course`, `format`, `status` |
| All List | `?search=<term>` (search filter) |
| All List | `?ordering=<field>` (ordering filter) |

### Ordering Fields

**Courses:**
- `price`, `-price` (ascending/descending)
- `rating`, `-rating`
- `created_at`, `-created_at`
- `enrolled_count`, `-enrolled_count`

**Cohorts:**
- `start_date`, `-start_date`

### Search Scope

The `?search=` parameter searches across:
- Course: `title`, `subtitle`, `description`

---

## Pagination

### Default Behavior
- **Page Size:** 20 items per page
- **Style:** PageNumberPagination

### Response Format
```json
{
  "success": true,
  "data": [...],
  "message": "Records retrieved successfully",
  "errors": {},
  "meta": {
    "timestamp": "2026-03-20T12:00:00Z",
    "request_id": "uuid",
    "pagination": {
      "count": 50,
      "page": 1,
      "pages": 5,
      "page_size": 10,
      "has_next": true,
      "has_previous": false
    }
  }
}
```

### Query Parameters
| Parameter | Description | Example |
|-----------|-------------|---------|
| `page` | Page number | `?page=2` |
| `page_size` | Items per page (if allowed) | `?page_size=50` |

### Non-Paginated Endpoints
The following endpoints return data arrays directly (still wrapped in standardized response):
- `GET /api/v1/courses/{slug}/cohorts/` → Returns `{success: true, data: [...], message: "...", meta: {...}}`

---

## Standardized Response Format

All API responses follow a consistent envelope structure for predictability and ease of client-side handling.

### Response Envelope

Every response includes these top-level fields:

| Field | Type | Description |
|-------|------|-------------|
| `success` | Boolean | `true` for 2xx status codes, `false` for 4xx/5xx |
| `data` | Any | Response payload (object, array, or null) |
| `message` | String | Human-readable status message |
| `errors` | Object | Validation errors by field name |
| `meta` | Object | Metadata including timestamp and request_id |

### Success Response (2xx)

```json
{
  "success": true,
  "data": {
    "id": "abc-123",
    "title": "Introduction to AI",
    ...
  },
  "message": "Record retrieved successfully",
  "errors": {},
  "meta": {
    "timestamp": "2026-03-20T12:00:00Z",
    "request_id": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

### List Response with Pagination

```json
{
  "success": true,
  "data": [
    { "id": "1", "title": "Course 1" },
    { "id": "2", "title": "Course 2" }
  ],
  "message": "Records retrieved successfully",
  "errors": {},
  "meta": {
    "timestamp": "2026-03-20T12:00:00Z",
    "request_id": "550e8400-e29b-41d4-a716-446655440000",
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

### Error Response (4xx/5xx)

```json
{
  "success": false,
  "data": null,
  "message": "Validation failed - please check your input",
  "errors": {
    "cohort": [
      "This cohort is full. Please join the waitlist."
    ],
    "non_field_errors": [
      "You are already enrolled in this cohort."
    ]
  },
  "meta": {
    "timestamp": "2026-03-20T12:00:00Z",
    "request_id": "550e8400-e29b-41d4-a716-446655440000",
    "error_code": "VALIDATION_ERROR"
  }
}
```

### HTTP Status Codes

| Code | Meaning | Typical Causes |
|------|---------|----------------|
| 200 | OK | Successful GET/PUT/PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Invalid data, validation errors |
| 401 | Unauthorized | Missing/invalid credentials |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource doesn't exist |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Unhandled exception |

### Request ID

Every response includes a unique `request_id` in the `meta` section. Include this in support requests for faster debugging:

```
X-Request-ID: 550e8400-e29b-41d4-a716-446655440000
```

### Error Codes

| Code | Description |
|------|-------------|
| `BAD_REQUEST` | Malformed request |
| `VALIDATION_ERROR` | Field validation failed |
| `AUTHENTICATION_ERROR` | Invalid/missing credentials |
| `PERMISSION_DENIED` | Insufficient permissions |
| `NOT_FOUND` | Resource not found |
| `RATE_LIMIT_EXCEEDED` | Too many requests |

---

## Caching

### Overview

The API implements Redis-based caching for high-traffic endpoints using django-redis. Caching significantly improves response times for frequently accessed data.

### Cached Endpoints

| Endpoint | Cache Duration | Cache Key Format |
|----------|----------------|------------------|
| `GET /api/v1/courses/` | 5 minutes | `course:list` or `course:list:level=beginner` |
| `GET /api/v1/categories/` | 30 minutes | `category:list` |
| `GET /api/v1/courses/{slug}/` | 1 hour | `course:detail:{slug}` |
| `GET /api/v1/courses/{slug}/cohorts/` | 10 minutes | `course:{slug}:cohorts` |

### Cache Behavior

**Course List Caching:**
- Cache key includes query parameters for proper isolation
- `?level=beginner` and `?level=intermediate` have separate cache entries
- First request populates cache, subsequent requests return cached data

**Cache Invalidation:**
- Course list cache invalidated when any course is created, updated, or deleted
- Course detail cache invalidated when specific course is modified
- Automatic via Django signals (`courses/signals.py`)

### Performance Impact

| Scenario | Response Time | Database Queries |
|----------|---------------|------------------|
| Cache Miss | ~200ms | 3 queries |
| Cache Hit | ~20ms | 0 queries |
| **Improvement** | **10x faster** | **100% reduction** |

### Cache Headers

Responses do not include cache headers as caching is handled server-side. Clients should not implement their own caching for these endpoints to ensure data freshness.

### Bypassing Cache (Development)

To bypass cache during testing:
```python
from django.core.cache import cache
cache.clear()  # Clear all cache
cache.delete('course:list')  # Delete specific key
```

---

## Known Issues & Limitations

### Critical Issues (RESOLVED)

| Issue | Status | Description |
|-------|--------|-------------|
| **JWT Not Implemented** | ✅ FIXED | SimpleJWT configured with 30min/7day token lifetimes |
| **N+1 Query Problem** | ✅ FIXED | 82% query reduction with prefetch_related/select_related |
| **No Throttling** | ✅ FIXED | Rate limiting configured for anon/user/enrollment operations |

### API Design Issues (FIXED)

| Issue | Status | Description | Priority |
|-------|--------|-------------|----------|
| **Inconsistent Response Format** | ✅ FIXED | All endpoints now return standardized envelope | High |
| **Inconsistent Pagination** | ✅ FIXED | `/cohorts/` action now returns wrapped response | High |
| **Missing Error Format** | ✅ FIXED | Standardized error responses with error codes | Medium |
| **No API Versioning** | ⏳ PENDING | Only URL path versioning implemented | Low |
| **Missing Endpoints** | ✅ FIXED | User registration, password reset, profile endpoints complete | High |

### Security Concerns

| Issue | Status | Description | Priority |
|-------|--------|-------------|----------|
| **No Rate Limiting** | ✅ FIXED | Throttling configured for anon/user/enrollment operations | High |
| **CORS Wide Open** | ✅ ACCEPTABLE | Dev settings allow all origins (expected in development) | Medium |
| **No Request Logging** | ✅ FIXED | Comprehensive audit trail implemented | Low |
| **Missing Permissions** | ✅ FIXED | Enrollment create now has business logic | High |

### Performance Issues (FIXED)

| Issue | Status | Before | After | Solution |
|-------|--------|--------|-------|----------|
| **N+1 Queries** | ✅ FIXED | 17 queries | 3 queries | Added `prefetch_related('categories')` to CourseViewSet |
| **Cohort N+1** | ✅ FIXED | 12 queries | 2 queries | Added `select_related('course', 'instructor')` |
| **No Caching** | ✅ FIXED | - | 10x faster | Redis caching with django-redis |
| **Large Payloads** | ⏳ PENDING | - | - | Field filtering (?fields=) planned |

---

## Best Practices

### For Frontend Developers

1. **Cache Category Data**: Categories change infrequently, cache them locally
2. **Use Pagination**: Always handle `next` and `previous` URLs
3. **Handle Errors Gracefully**: Implement retry logic for 500 errors
4. **Debounce Search**: Wait 300ms before sending search requests
5. **Optimistic Updates**: Update UI before API confirmation for better UX

### For API Consumers

1. **Use Query Parameters**: Filter on server, not client
2. **Request Only Needed Fields**: Consider implementing `?fields=` parameter
3. **Respect Rate Limits**: Implement exponential backoff
4. **Handle Partial Failures**: Some endpoints may succeed while others fail

### Authentication (Future)

```javascript
// Store tokens securely (not localStorage for production)
const tokens = {
  access: sessionStorage.getItem('access_token'),
  refresh: sessionStorage.getItem('refresh_token')
};

// Add to request headers
fetch('/api/v1/enrollments/', {
  headers: {
    'Authorization': `Bearer ${tokens.access}`,
    'Content-Type': 'application/json'
  }
});
```

---

## Appendix: Data Models

### Course Model Fields
| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `slug` | Slug | URL-friendly identifier |
| `title` | Char(200) | Course title |
| `subtitle` | Char(300) | Short description |
| `description` | Text | Full description |
| `level` | Choice | beginner/intermediate/advanced |
| `status` | Choice | draft/published/archived |
| `price` | Decimal | Current price |
| `original_price` | Decimal | Strikethrough price |
| `rating` | Decimal(2,1) | Average rating |
| `enrolled_count` | Integer | Total enrollments |
| `is_featured` | Boolean | Featured on homepage |
| `created_at` | DateTime | Creation timestamp |
| `updated_at` | DateTime | Last modified |

### Cohort Model Fields
| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `course` | FK | Related course |
| `start_date` | Date | Cohort start |
| `end_date` | Date | Cohort end |
| `format` | Choice | online/in_person/hybrid |
| `instructor` | FK | Teaching user |
| `spots_total` | Integer | Maximum capacity |
| `spots_reserved` | Integer | Currently enrolled |
| `status` | Choice | upcoming/enrolling/etc. |

### Enrollment Model Fields
| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Primary key |
| `user` | FK | Enrolled student |
| `course` | FK | Enrolled course |
| `cohort` | FK | Specific cohort |
| `amount_paid` | Decimal | Payment amount |
| `status` | Choice | pending/confirmed/etc. |
| `created_at` | DateTime | Enrollment time |

---

## Testing

### Test Suite Overview

The backend includes **227** automated tests covering all API functionality:

| Category | Tests | Coverage |
|----------|-------|----------|
| Course API | 30 | List, filter, search, order, detail |
| Category API | 10 | List, detail, ordering, fields |
| Cohort API | 16 | List, filter, order, fields |
| Caching | 16 | Hit/miss, invalidation, TTL |
| Enrollment | 9 | Business logic, capacity |
| JWT Auth | 6 | Token obtain, refresh, verify |
| Performance | 4 | Query count optimization |
| Response Format | 17 | Standardized envelope |
| Throttling | 5 | Rate limiting |
| Image Upload | 23 | Validation, processing |
| User Management | 24 | Registration, profile, password reset |
| API Documentation | 15 | drf-spectacular schema generation |
| Admin Fieldset Corrections | 13 | Fieldset type safety, decorators |
| Request Logging Middleware | 22 | Comprehensive audit trail logging |
| Field-Level Permissions | 17 | Anonymous vs authenticated field visibility |
| Soft Delete Implementation | 20 | Soft delete, hard delete, restore |
| **Total** | **227** | **✅ All passing** |

### Running Tests

```bash
# Run all tests
DJANGO_SETTINGS_MODULE=academy.settings.test python manage.py test --no-input

# Run specific test category
DJANGO_SETTINGS_MODULE=academy.settings.test python manage.py test api.tests.test_courses
DJANGO_SETTINGS_MODULE=academy.settings.test python manage.py test api.tests.test_caching

# Run with verbose output
DJANGO_SETTINGS_MODULE=academy.settings.test python manage.py test -v 2
```

### Test Configuration

Tests use a dedicated settings file (`academy/settings/test.py`) that:
- Preserves throttle rates for views with explicit `throttle_classes`
- Uses local filesystem storage instead of S3
- Uses fast password hashing (MD5) for test speed
- Uses in-memory email backend
- Provides custom test throttle classes with low rates for rate limiting tests

### Resolved Test Issues (March 21, 2026)

All test failures have been resolved. Key fixes applied:

**1. Throttle Scope Configuration:**
- Views with explicit `throttle_classes` now have their scope defined in test settings
- `RegisterView`, `PasswordResetRequestView`, `PasswordResetConfirmView` all have `AnonRateThrottle`
- Test settings preserve `DEFAULT_THROTTLE_RATES` with high limits

**2. Custom Test Throttle Classes:**
- `TestAnonRateThrottle` - 3/minute rate for anonymous testing
- `TestEnrollmentThrottle` - 5/minute rate for enrollment testing
- Tests patch views directly with these classes for predictable behavior

**3. Request ID Uniqueness:**
- Cache cleared between requests to ensure unique request IDs
- Tests verify `meta.request_id` differs between requests

**4. Password Hash Format:**
- Tests accept both `pbkdf2_sha256$` (production) and `md5$` (test) formats

### Reserved Parameter Notes

**`format` Query Parameter:**
- `format` is a reserved DRF query parameter
- Cannot be used for filtering by cohort format
- Tests avoid this parameter to prevent 404 errors

---

**Document Version:** 1.4.0
**Status:** All 227 tests passing
**Next Review:** After Frontend-Backend Integration

---

### ✅ Step 14: Soft Delete Implementation (COMPLETED)

Implemented reversible deletion with soft delete functionality.

**Features:**
- Soft delete via `is_deleted` flag and `deleted_at` timestamp
- Hard delete capability for permanent removal
- Restore functionality to recover deleted items
- Custom manager that filters deleted objects by default
- Applies to Course, Category, Cohort, and Enrollment models

**API Changes:**
- DELETE endpoints perform soft delete by default
- Deleted items excluded from list views automatically
- Admin interface shows deleted status

### ✅ Step 13: Field-Level Permissions (COMPLETED)

Implemented conditional field visibility based on user authentication.

**Features:**
- Anonymous users see limited fields (no `enrolled_count`, timestamps)
- Authenticated users see all fields
- Staff/instructors see complete data
- Automatic filtering via `to_representation()` methods

**Affected Serializers:**
- `CourseListSerializer`: Hides `enrolled_count` from anonymous users
- `CourseDetailSerializer`: Hides `enrolled_count`, `created_at`, `updated_at` from anonymous users

### ✅ Step 12: Request Logging Middleware (COMPLETED)

Implemented comprehensive API request logging with structured audit trails.

**Features:**
- Structured logging: `METHOD path - status - duration - user - ip - request_id - user_agent`
- Smart filtering: Skips static, media, admin, and non-API paths
- Performance: <1ms overhead per request
- Storage: Rotating file handler (10MB per file, 10 backups)

**Log Location:**
```
Console: Real-time API request stream
File: backend/logs/api_requests.log
```

**Example Log Entry:**
```
INFO GET /api/v1/courses/ - 200 - 3.22ms - testuser - 127.0.0.1 - 550e8400-e29b-41d4-a716-446655440000 - Mozilla/5.0...
```

### ✅ Step 11: Admin Fieldset Corrections (COMPLETED)

Fixed type errors in Django admin configurations for better IDE support.

**Changes:**
- `users/admin.py`: Converted fieldsets from tuples to lists
- `courses/admin.py`: Fixed @admin.display decorator usage
- Improved LSP compatibility and IDE autocomplete support

### ✅ Test Suite Expansion

| Test Category | Tests Added | Total |
|--------------|-------------|-------|
| Admin Fieldset Corrections | 13 | 188 |
| Request Logging Middleware | 22 | 210 |
| Field-Level Permissions | 17 | 227 |
| Soft Delete Implementation | 20 | **247** |

---

## Lessons Learned

### Request Logging Middleware

**1. Middleware Ordering Matters**
```python
MIDDLEWARE = [
    # ... other middleware
    "api.middleware.RequestIDMiddleware",      # Must come before logging
    "api.middleware.APILoggingMiddleware",       # Logs request_id from above
    "api.middleware.ResponseFormatMiddleware",
]
```

**2. Log Directory Must Exist**
```bash
# Before starting server
mkdir -p backend/logs
```

**3. Testing Mock Strategy**
```python
# Mock getLogger, not the logger module
@patch("api.middleware.logging.getLogger")
def test_logs_api_request(self, mock_get_logger):
    mock_logger = MagicMock()
    mock_get_logger.return_value = mock_logger
    # ... test code
```

### Admin Fieldset Type Safety

**1. Tuple vs List**
```python
# Bad - Causes LSP warnings
fieldsets = UserAdmin.fieldsets + (("Profile", {...}),)

# Good - List type for LSP compatibility
fieldsets = list(UserAdmin.fieldsets) + [("Profile", {...})]
```

**2. @admin.display Decorator**
```python
# Old pattern - Deprecated
@property
def spots_remaining(self, obj):
    return obj.spots_remaining
spots_remaining.short_description = "Spots Left"

# New pattern - Preferred
@admin.display(description="Spots Left")
def spots_remaining(self, obj):
    return obj.spots_remaining
```

---

## Troubleshooting Guide

### Request Logging Issues

**Issue: Logs not appearing**
- Check `backend/logs/` directory exists and is writable
- Verify middleware is registered: `"api.middleware.APILoggingMiddleware"` in MIDDLEWARE
- Ensure `api.requests` logger is configured in settings

**Issue: Missing request_id in logs**
- RequestIDMiddleware must come before APILoggingMiddleware in MIDDLEWARE
- Check request.request_id is being set

### Admin Panel Issues

**Issue: LSP errors in admin.py**
- Convert all fieldsets to list type: `list(UserAdmin.fieldsets) + [...]`
- Replace `method.attribute = value` with `@decorator` pattern

### Field-Level Permissions

**Issue: Fields missing in API response**
- Check authentication status: Anonymous users see limited fields
- Authenticated users see `enrolled_count`, `created_at`, `updated_at`
- Ensure request is passed in serializer context

### Soft Delete

**Issue: Deleted items still appearing**
- Soft delete marks items as `is_deleted=True` without removing from database
- Query using `.filter(is_deleted=False)` or rely on default manager
- Use `Model.objects.all_with_deleted()` to include deleted items
- Use `hard_delete()` for permanent removal

---

---

## 🚀 Latest API Changes (March 2026)

### Major Enhancements

#### 1. Soft Delete Support (March 22, 2026)

All core models now support soft delete:

```python
# Models with soft delete
- Course
- Category  
- Cohort
- Enrollment
```

**Manager Methods:**
```python
# Get active records only (default)
Course.objects.all()

# Get all records including deleted
Course.objects.all_objects()

# Get only deleted records
Course.objects.only_deleted()
```

**Instance Methods:**
```python
course = Course.objects.get(id=1)
course.delete()  # Soft delete
course.restore()  # Restore deleted
```

#### 2. Payment Processing (Phase 7)

**New Endpoints:**
```http
POST /api/v1/payments/create-intent/
GET  /api/v1/payments/{id}/status/
POST /api/v1/webhooks/stripe/
```

**Security Features:**
- Webhook signature verification
- Idempotency key protection
- Rate limiting (5 requests/minute)
- Ownership validation

#### 3. Request Logging (Step 12)

All API requests are logged with:
- Method, path, status code
- Duration (milliseconds)
- User ID, IP address
- User agent string

---

## 📝 Code Changes Summary

### Backend Changes

| Component | File | Changes |
|-----------|------|---------|
| Soft Delete | `courses/models.py` | Added `deleted_at` fields, managers |
| Payment | `api/views/payments.py` | PaymentIntent creation |
| Logging | `api/middleware/logging.py` | Request audit trail |
| Testing | `courses/tests/test_soft_delete.py` | 18 TDD tests |

### Frontend Changes

| Component | File | Changes |
|-----------|------|---------|
| Type Imports | 20+ files | `import type` syntax |
| Vite Config | `vite.config.ts` | Removed incompatible plugin |
| Payment | `src/services/api/payments.ts` | Payment API client |
| Hooks | `src/hooks/usePayment.ts` | Payment React Query hooks |

---

## 🎓 LESSONS LEARNED

### API Design

1. **Response Standardization**
   - Always return consistent envelope format
   - Include `success`, `data`, `message`, `errors`, `meta`
   - Pagination metadata in `meta.pagination`

2. **Error Handling**
   - Use custom exception handler
   - Include `request_id` for tracking
   - Return meaningful error messages

3. **Caching Strategy**
   - Cache high-traffic endpoints (courses, categories)
   - Use signal-based invalidation
   - Set appropriate TTLs (5min, 30min, 1hr)

### Performance

1. **Query Optimization**
   - Use `select_related` for foreign keys
   - Use `prefetch_related` for many-to-many
   - Achieve 82-83% query reduction

2. **Pagination**
   - PageNumberPagination for predictable URLs
   - Include total count in metadata
   - Default page size: 10 items

3. **Filtering**
   - Use `django-filter` for complex queries
   - Support multiple filter combinations
   - Document filter parameters

### Security

1. **Authentication**
   - JWT with short-lived access tokens (30min)
   - Refresh tokens with rotation (7 days)
   - Token blacklisting on logout

2. **Authorization**
   - IsAuthenticatedOrReadOnly default
   - Custom permissions per endpoint
   - Ownership validation on writes

3. **Rate Limiting**
   - Anonymous: 100/hour
   - Authenticated: 1000/hour
   - Special limits for sensitive endpoints

---

## 🔧 TROUBLESHOOTING GUIDE

### API Issues

#### 401 Unauthorized

**Symptom:** Request returns 401 status  
**Cause:** Missing or invalid JWT token  
**Solution:**
```bash
# Get new token
curl -X POST http://localhost:8000/api/v1/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

#### 429 Too Many Requests

**Symptom:** Request returns 429 status  
**Cause:** Rate limit exceeded  
**Solution:**
- Wait for rate limit window to reset
- Use authenticated user for higher limits
- Implement exponential backoff

#### 400 Validation Error

**Symptom:** Request returns 400 with validation errors  
**Cause:** Invalid request data  
**Solution:**
- Check `errors` field in response
- Validate data matches API schema
- Refer to OpenAPI documentation

### Database Issues

#### Migration Errors

**Symptom:** `python manage.py migrate` fails  
**Cause:** Schema conflicts or missing dependencies  
**Solution:**
```bash
# Reset migrations
python manage.py migrate --fake zero
python manage.py migrate
```

#### Cache Stale Data

**Symptom:** API returns outdated information  
**Cause:** Cache not invalidated on update  
**Solution:**
```bash
# Clear cache manually
redis-cli FLUSHDB

# Or wait for TTL expiration
# Courses: 5 minutes
# Categories: 30 minutes
```

---

## 📊 API Performance Metrics

### Response Times

| Endpoint | Average | P95 | P99 |
|----------|---------|-----|-----|
| `/courses/` | 45ms | 120ms | 250ms |
| `/courses/{slug}/` | 35ms | 90ms | 180ms |
| `/categories/` | 25ms | 60ms | 120ms |
| `/auth/token/` | 150ms | 300ms | 500ms |

### Cache Hit Rates

| Endpoint | Hit Rate | TTL |
|----------|----------|-----|
| Course List | 85% | 5 min |
| Category List | 95% | 30 min |
| Course Detail | 70% | 1 hour |

---

## 🚀 RECOMMENDED NEXT STEPS

### Immediate

1. **Production Deployment**
   - Deploy to staging environment
   - Run smoke tests
   - Verify Stripe webhooks

2. **Load Testing**
   - Test 100+ concurrent users
   - Monitor API response times
   - Identify bottlenecks

### Short-term

3. **Security Audit**
   - Penetration testing
   - OWASP compliance check
   - Dependency scan

4. **Performance Tuning**
   - Query optimization review
   - Cache strategy refinement
   - Bundle size optimization

### Long-term

5. **Advanced Features**
   - GraphQL API (optional)
   - WebSocket support
   - Real-time notifications

6. **Monitoring**
   - APM integration (New Relic, DataDog)
   - Error tracking (Sentry)
   - Uptime monitoring

