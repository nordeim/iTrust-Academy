export const BRAND_NAME = "iTrust Academy"
export const BRAND_TAGLINE = "Enterprise IT Training Excellence"

export const NAV_ITEMS = [
  { label: "Courses", href: "#courses" },
  { label: "Solutions", href: "#solutions" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const

export const VENDOR_LOGOS = [
  "SolarWinds",
  "Securden",
  "Quest",
  "Ivanti",
] as const

export const FOOTER_LINKS = {
  courses: [
    { label: "SolarWinds Training", href: "#courses" },
    { label: "Securden Training", href: "#courses" },
    { label: "Quest Training", href: "#courses" },
    { label: "Ivanti Training", href: "#courses" },
    { label: "All Courses", href: "#courses" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Partners", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Press", href: "#" },
  ],
  resources: [
    { label: "Learning Platform", href: "#" },
    { label: "Certification Guide", href: "#" },
    { label: "Case Studies", href: "#" },
    { label: "Webinars", href: "#" },
    { label: "Documentation", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Support", href: "#contact" },
    { label: "Training Calendar", href: "#" },
    { label: "Corporate Inquiries", href: "#contact" },
  ],
} as const

// ═══════════════════════════════════════════════════════════
// API Configuration
// Uses Vite's env variables with type-safe fallback
// ═══════════════════════════════════════════════════════════

// Type-safe access to Vite environment variables
// See: https://vitejs.dev/guide/env-and-mode.html
export const API_URL: string = (import.meta.env?.VITE_API_URL as string) || "http://localhost:8000/api/v1"
