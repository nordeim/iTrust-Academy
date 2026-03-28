import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: "sm" | "default" | "lg" | "xl" | "full"
}

const sizeClasses = {
  sm: "max-w-3xl",
  default: "max-w-7xl",
  lg: "max-w-[1400px]",
  xl: "max-w-[1600px]",
  full: "max-w-full",
}

export function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div className={cn("w-full mx-auto px-4 sm:px-6 lg:px-8", sizeClasses[size], className)}>
      {children}
    </div>
  )
}
