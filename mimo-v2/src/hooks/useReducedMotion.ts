import { useSyncExternalStore } from "react"

// ═══════════════════════════════════════════════════════════
// Reduced Motion Hook - React 19 Pattern
// Uses useSyncExternalStore for SSR-safe media query subscriptions
// ═══════════════════════════════════════════════════════════

function getMediaQuerySnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function subscribeToReducedMotion(callback: () => void): () => void {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
  
  // Modern browsers
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", callback)
    return () => mediaQuery.removeEventListener("change", callback)
  }
  
  // Legacy browsers
  mediaQuery.addListener(callback)
  return () => mediaQuery.removeListener(callback)
}

/**
 * Hook to detect if user prefers reduced motion
 * Uses useSyncExternalStore for SSR-safe subscription (React 19 pattern)
 * 
 * @returns true if user prefers reduced motion, false otherwise
 * 
 * @example
 * ```tsx
 * const prefersReducedMotion = useReducedMotion()
 * 
 * <motion.div
 *   initial={prefersReducedMotion ? {} : { opacity: 0 }}
 *   animate={{ opacity: 1 }}
 * />
 * ```
 */
export function useReducedMotion(): boolean {
  // useSyncExternalStore is the React 19 recommended pattern
  // for subscribing to external browser APIs
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getMediaQuerySnapshot,
    // Server snapshot - defaults to false (no reduced motion on server)
    () => false
  )
}
