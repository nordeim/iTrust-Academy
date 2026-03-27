import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: "default" | "muted" | "dark" | "accent";
  padding?: "sm" | "default" | "lg" | "xl" | "none";
}

/**
 * Section Component
 * Page section wrapper with consistent spacing and background options
 * 
 * @example
 * <Section id="features" background="muted" padding="lg">
 *   <h2>Features</h2>
 * </Section>
 */
export function Section({ 
  children, 
  className, 
  id, 
  background = "default",
  padding = "default"
}: SectionProps) {
  const bgClasses = {
    default: "bg-background",
    muted: "bg-muted/30",
    dark: "bg-neutral-900 text-white",
    accent: "bg-primary/5",
  };

  const paddingClasses = {
    none: "",
    sm: "py-8 md:py-12",
    default: "py-16 md:py-24 lg:py-32",
    lg: "py-20 md:py-28 lg:py-36",
    xl: "py-24 md:py-32 lg:py-40",
  };

  return (
    <section 
      id={id} 
      className={cn(
        paddingClasses[padding], 
        bgClasses[background], 
        className
      )}
    >
      {children}
    </section>
  );
}
