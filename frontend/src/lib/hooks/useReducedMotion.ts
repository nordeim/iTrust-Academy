"use client";

import { useState, useEffect, useSyncExternalStore } from "react";

/**
 * Hook to detect user's motion preference
 * Returns true if user prefers reduced motion
 * Uses useSyncExternalStore for better SSR handling
 * 
 * @example
 * const prefersReducedMotion = useReducedMotion();
 * const duration = prefersReducedMotion ? 0 : 0.5;
 */

// SSR-safe media query check
function getReducedMotionSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

function subscribeToReducedMotion(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  
  return () => mediaQuery.removeEventListener("change", callback);
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
}

/**
 * Hook to get animation variants that respect reduced motion
 * 
 * @example
 * const variants = useAnimationVariants();
 * <motion.div variants={variants.fadeInUp} />
 */
export function useAnimationVariants() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return {
      fadeInUp: {},
      fadeIn: {},
      scaleIn: {},
      slideInRight: {},
      slideInLeft: {},
    };
  }

  return {
    fadeInUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
    },
    slideInRight: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
    },
    slideInLeft: {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
    },
  };
}
