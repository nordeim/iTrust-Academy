// ═══════════════════════════════════════════════════════════
// Contact Modal Component
// Handles corporate inquiry forms (consultation, demo, sales)
// Uses shared Dialog components for accessibility compliance
// ═══════════════════════════════════════════════════════════

import { useState } from "react"
import { Send, Loader2 } from "lucide-react"
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

export type ContactType = "consultation" | "demo" | "sales"

interface ContactModalProps {
  type: ContactType
  open: boolean
  onClose: () => void
}

const typeConfig: Record<ContactType, { title: string; description: string; buttonText: string }> = {
  consultation: {
    title: "Schedule a Consultation",
    description: "Tell us about your training needs and we'll design a customized program for your team.",
    buttonText: "Request Consultation",
  },
  demo: {
    title: "Request Corporate Demo",
    description: "See our platform in action with a personalized demonstration for your organization.",
    buttonText: "Request Demo",
  },
  sales: {
    title: "Contact Sales",
    description: "Get pricing information and discuss enterprise training packages with our sales team.",
    buttonText: "Contact Sales",
  },
}

export function ContactModal({ type, open, onClose }: ContactModalProps) {
  const config = typeConfig[type]
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success("Thank you! We'll be in touch within 24 hours.", {
      description: `Your ${config.title.toLowerCase()} request has been received.`,
    })

    setIsSubmitting(false)
    setFormData({ name: "", email: "", company: "", message: "" })
    onClose()
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription>
            {config.description}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Full Name</Label>
            <Input
              id="contact-name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="John Smith"
              className={cn(errors.name && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">Email Address</Label>
            <Input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="john@company.com"
              className={cn(errors.email && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-company">Company</Label>
            <Input
              id="contact-company"
              type="text"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              placeholder="Acme Corporation"
              className={cn(errors.company && "border-red-500 focus-visible:ring-red-500")}
            />
            {errors.company && (
              <p className="text-sm text-red-500">{errors.company}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <textarea
              id="contact-message"
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              placeholder="Tell us about your training needs..."
              rows={4}
              className={cn(
                "w-full px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm resize-none",
                "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent",
                "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                errors.message && "border-red-500 focus:ring-red-500"
              )}
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  {config.buttonText}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
