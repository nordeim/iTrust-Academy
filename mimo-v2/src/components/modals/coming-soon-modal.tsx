// ═══════════════════════════════════════════════════════════
// Coming Soon Modal Component
// Shows placeholder content for features not yet implemented
// ═══════════════════════════════════════════════════════════

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Bell, Rocket, Loader2 } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
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
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl w-full max-w-md">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                <Dialog.Title className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-brand-500" />
                  {title}
                </Dialog.Title>
                <Dialog.Close asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <X className="w-5 h-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </Dialog.Close>
              </div>
              
              {/* Content */}
              <div className="p-6 text-center">
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
                    <Label htmlFor="notify-email" className="sr-only">
                      Email Address
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="notify-email"
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
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
