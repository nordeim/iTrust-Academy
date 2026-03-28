import { cn } from "@/lib/utils"
import { badgeVariants, type BadgeVariants } from "./variants"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BadgeVariants {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
}

// Consumers should import variants from "./variants" directly
// Do NOT re-export here to comply with fast refresh rules
