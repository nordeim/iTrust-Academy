"use client";

import { useState, useEffect, useRef, RefObject } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook to detect if an element is in the viewport
 * Useful for scroll-based animations
 * 
 * @example
 * const { ref, isInView } = useInView({ threshold: 0.5 });
 * <div ref={ref} className={isInView ? 'animate-in' : ''} />
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): { ref: RefObject<T>; isInView: boolean } {
  const { threshold = 0, rootMargin = "0px", triggerOnce = false } = options;
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<T>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If triggerOnce and already triggered, don't observe
    if (triggerOnce && hasTriggered.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        
        if (inView) {
          setIsInView(true);
          hasTriggered.current = true;
          
          // If triggerOnce, unobserve after first trigger
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView };
}

/**
 * Hook to track scroll progress (0-1) within a container
 * 
 * @example
 * const { ref, progress } = useScrollProgress();
 * <div ref={ref} style={{ opacity: 1 - progress }} />
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(): {
  ref: RefObject<T>;
  progress: number;
} {
  const [progress, setProgress] = useState(0);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on element position
      const start = rect.top + windowHeight;
      const end = rect.top - rect.height;
      const current = rect.top;
      
      const scrollProgress = 1 - (current - end) / (start - end);
      setProgress(Math.max(0, Math.min(1, scrollProgress)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { ref, progress };
}
