import { cva, type VariantProps } from "class-variance-authority"

// ═══════════════════════════════════════════════════════════
// BUTTON VARIANTS — Enhanced with depth and warmth
// ═══════════════════════════════════════════════════════════

export const buttonVariants = cva(
  "inline-flex items-center justify-center font-mono text-sm font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer rounded-md",
  {
    variants: {
      variant: {
        default: "bg-brand-500 text-white hover:bg-brand-600 shadow-md hover:shadow-lg hover:shadow-brand/30 hover:-translate-y-0.5",
        outline: "border-2 border-brand-500 text-brand-600 hover:bg-brand-500 hover:text-white hover:shadow-md",
        ghost: "text-brand-600 hover:bg-brand-50",
        secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 hover:shadow-sm",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg hover:-translate-y-0.5",
        link: "text-brand-600 underline-offset-4 hover:underline hover:text-brand-700",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs rounded",
        lg: "h-14 px-8 text-base rounded-lg",
        xl: "h-16 px-10 text-lg rounded-lg",
        icon: "h-11 w-11 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>

// ═══════════════════════════════════════════════════════════
// BADGE VARIANTS — Enhanced with warmth and consistency
// ═══════════════════════════════════════════════════════════

export const badgeVariants = cva(
  "inline-flex items-center font-mono text-xs font-semibold uppercase tracking-widest rounded-full",
  {
    variants: {
      variant: {
        default: "bg-brand-100 text-brand-700 border border-brand-200",
        secondary: "bg-slate-100 text-slate-700 border border-slate-200",
        outline: "border border-brand-500 text-brand-600",
        success: "bg-emerald-100 text-emerald-700 border border-emerald-200",
        warning: "bg-amber-100 text-amber-700 border border-amber-200",
        danger: "bg-red-100 text-red-700 border border-red-200",
      },
      size: {
        default: "px-3 py-1",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type BadgeVariants = VariantProps<typeof badgeVariants>
