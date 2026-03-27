"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * DesktopNav Component
 * Horizontal navigation for desktop viewports (md+)
 * Features underline animation on hover
 * 
 * @example
 * <DesktopNav />
 */
export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav 
      className="hidden md:flex items-center gap-8" 
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href || 
          (item.href !== "#" && pathname.startsWith(item.href));
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "relative font-mono text-sm font-medium uppercase tracking-wider",
              "transition-colors duration-200",
              isActive 
                ? "text-primary" 
                : "text-foreground/70 hover:text-foreground",
              "group py-1"
            )}
          >
            {item.label}
            
            {/* Animated underline */}
            <span 
              className={cn(
                "absolute bottom-0 left-0 w-0 h-0.5 bg-primary",
                "transition-all duration-200 ease-out",
                "group-hover:w-full",
                isActive && "w-full"
              )}
              aria-hidden="true"
            />
          </Link>
        );
      })}
    </nav>
  );
}
