// ═══════════════════════════════════════════════════════════
// Coming Soon Modal Component
// Shows placeholder content for features not yet implemented
// Uses shared Dialog components for accessibility compliance
// ═══════════════════════════════════════════════════════════

import { useState } from "react"
import { Bell, Rocket, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface ComingSoonModalProps {
  title: string
  open: boolean
  onClose: () => void
}

export function ComingSoonModal({ title, open, onClose }: ComingSoonModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailError, setEmailError] = useState("")

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return "Email is required"
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Please enter a valid email"
    }
    return ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const error = validateEmail(email)
    if (error) {
      setEmailError(error)
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success("You're on the list!", {
      description: `We'll notify you when ${title} is available.`,
    })

    setIsSubmitting(false)
    setEmail("")
    setEmailError("")
    onClose()
  }

  const handleEmailChange = (value: string) => {
    setEmail(value)
    if (emailError) {
      setEmailError("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-brand-500" />
            {title}
          </DialogTitle>
          <DialogDescription>
            This feature is coming soon. Get notified when it launches!
          </DialogDescription>
        </DialogHeader>

        <div className="text-center py-4">
          <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Rocket className="w-8 h-8 text-brand-500" />
          </div>

          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Coming Soon
          </h3>

          <p className="text-slate-600 dark:text-slate-400 mb-6">
            We're working hard to bring you {title.toLowerCase()}.
            Leave your email and we'll notify you when it's ready!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="coming-soon-email" className="sr-only">
                Email Address
              </Label>
              <div className="flex gap-2">
                <Input
                  id="coming-soon-email"
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="Enter your email"
                  className={cn(
                    "flex-1",
                    emailError && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="shrink-0"
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Bell className="mr-2 h-4 w-4" />
                      Notify Me
                    </>
                  )}
                </Button>
              </div>
              {emailError && (
                <p className="text-sm text-red-500 text-left">{emailError}</p>
              )}
            </div>
          </form>

          <p className="text-xs text-slate-400 mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
