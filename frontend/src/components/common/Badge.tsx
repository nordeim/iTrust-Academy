import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Badge Variants
 * Space Mono font for uppercase labels
 * Sharp corners for consistency with "Precision Futurism" aesthetic
 */
const badgeVariants = cva(
  "inline-flex items-center font-mono text-xs font-semibold uppercase tracking-widest",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-primary text-primary",
        success: "bg-green-500/10 text-green-700 dark:text-green-400",
        warning: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
        destructive: "bg-destructive/10 text-destructive",
        featured: "bg-primary text-primary-foreground",
      },
      size: {
        default: "px-2.5 py-1",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

/**
 * Badge Component
 * Label/tag component with Space Mono font for technical aesthetic
 * 
 * @example
 * <Badge variant="default">Cloud</Badge>
 * <Badge variant="featured" size="lg">Featured</Badge>
 */
export function Badge({ 
  className, 
  variant, 
  size, 
  icon,
  children,
  ...props 
}: BadgeProps) {
  return (
    <div 
      className={cn(badgeVariants({ variant, size }), className)} 
      {...props}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </div>
  );
}

export { badgeVariants };
