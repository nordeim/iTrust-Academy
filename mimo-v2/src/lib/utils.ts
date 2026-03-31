import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Smooth scroll to a section by ID
 */
export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

/**
 * Scroll to top of page
 */
export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" })
}

/**
 * Parse a duration string like "5 days" or "2 weeks" into value and unit
 */
export function parseDuration(duration: string): { value: number; unit: string } {
  const match = duration.match(/^(\d+)\s*(days?|weeks?|hours?)$/i)
  if (match) {
    return { value: parseInt(match[1], 10), unit: match[2].toLowerCase() }
  }
  return { value: 1, unit: "weeks" }
}

/**
 * Format a duration string, returning a default for empty/invalid input
 */
export function formatDuration(duration: string): string {
  return duration || "1 week"
}
