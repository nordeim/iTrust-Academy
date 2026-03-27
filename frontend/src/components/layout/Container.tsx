import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "default" | "lg" | "xl" | "full";
}

/**
 * Container Component
 * Responsive container with consistent padding and max-width
 * 
 * @example
 * <Container size="lg">
 *   <h1>Content here</h1>
 * </Container>
 */
export function Container({ 
  children, 
  className, 
  size = "default" 
}: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-3xl",
    default: "max-w-7xl",
    lg: "max-w-[1400px]",
    xl: "max-w-[1600px]",
    full: "max-w-full",
  };

  return (
    <div 
      className={cn(
        "w-full mx-auto px-4 sm:px-6 lg:px-8", 
        sizeClasses[size], 
        className
      )}
    >
      {children}
    </div>
  );
}
