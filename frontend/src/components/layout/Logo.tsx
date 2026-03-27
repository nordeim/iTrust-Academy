import Link from "next/link";
import { BRAND_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "default" | "lg";
}

/**
 * Logo Component
 * Brand identity mark with distinctive "i" in orange square
 * Sharp corners for "Precision Futurism" aesthetic
 * 
 * @example
 * <Logo />
 * <Logo showText={false} size="sm" />
 */
export function Logo({ 
  className, 
  showText = true,
  size = "default" 
}: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    default: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const textSizeClasses = {
    sm: "text-lg",
    default: "text-xl",
    lg: "text-2xl",
  };

  const iconTextClasses = {
    sm: "text-lg",
    default: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link 
      href="/" 
      className={cn("flex items-center gap-2.5 group", className)}
      aria-label={`${BRAND_NAME} - Home`}
    >
      {/* Logo Mark */}
      <div 
        className={cn(
          "relative bg-primary flex items-center justify-center",
          "transition-transform duration-200 group-hover:scale-105",
          sizeClasses[size]
        )}
      >
        <span 
          className={cn(
            "text-primary-foreground font-bold font-mono",
            iconTextClasses[size]
          )}
        >
          i
        </span>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <span 
          className={cn(
            "font-sans font-bold tracking-tight text-foreground",
            "transition-colors duration-200 group-hover:text-primary",
            textSizeClasses[size]
          )}
        >
          {BRAND_NAME}
        </span>
      )}
    </Link>
  );
}
