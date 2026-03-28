import { cn } from "@/lib/utils"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: "default" | "muted" | "dark" | "brand"
}

const bgClasses = {
  default: "bg-background",
  muted: "bg-muted/30",
  dark: "bg-neutral-900 text-white",
  brand: "bg-primary text-primary-foreground",
}

export function Section({ children, className, id, background = "default" }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 md:py-24 lg:py-32", bgClasses[background], className)}
    >
      {children}
    </section>
  )
}
