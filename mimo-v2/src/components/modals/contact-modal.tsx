// ═══════════════════════════════════════════════════════════
// Contact Modal Component
// Handles corporate inquiry forms (consultation, demo, sales)
// ═══════════════════════════════════════════════════════════

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Send, Loader2 } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
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
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
        </Dialog.Overlay>
        
        <Dialog.Content asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                <Dialog.Title className="text-xl font-bold text-slate-900 dark:text-white">
                  {config.title}
                </Dialog.Title>
                <Dialog.Close asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <X className="w-5 h-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </Dialog.Close>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  {config.description}
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
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
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
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
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
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
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
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
              </div>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
