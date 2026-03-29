import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronRight, GraduationCap } from "lucide-react"
import { Container } from "./container"
import { Button } from "@/components/ui/button"
import { cn, scrollToSection, scrollToTop } from "@/lib/utils"
import { NAV_ITEMS, BRAND_NAME } from "@/lib/constants"

function Logo({ className }: { className?: string }) {
  return (
    <a 
      href="#" 
      onClick={(e) => { e.preventDefault(); scrollToTop(); }}
      className={cn("flex items-center gap-2.5 group", className)}
    >
      <div 
        className="relative w-10 h-10 bg-brand-500 flex items-center justify-center rounded-lg shadow-md group-hover:shadow-lg group-hover:shadow-brand-500/20 transition-all duration-300"
        aria-hidden="true"
      >
        <GraduationCap className="text-white h-5 w-5" />
      </div>
      <div className="flex flex-col">
        <span className="font-sans font-bold text-lg leading-tight tracking-tight text-foreground">
          {BRAND_NAME}
        </span>
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest hidden sm:block">
          Training Excellence
        </span>
      </div>
    </a>
  )
}

function DesktopNav() {
  return (
    <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
      {NAV_ITEMS.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={(e) => {
            e.preventDefault()
            const sectionId = item.href.replace("#", "")
            scrollToSection(sectionId)
          }}
          className={cn(
            "relative px-4 py-2 font-mono text-sm font-medium uppercase tracking-wider rounded-md",
            "text-foreground-secondary hover:text-brand-600 transition-colors duration-200",
            "hover:bg-brand-50/50",
            "after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5",
            "after:bg-brand-500 after:transition-all after:duration-300 after:rounded-full",
            "hover:after:w-6"
          )}
        >
          {item.label}
        </a>
      ))}
    </nav>
  )
}

function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [isOpen])

  return (
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="relative z-50 hover:bg-brand-50"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-background border-l border-border shadow-2xl rounded-l-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <Logo />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="hover:bg-brand-50 rounded-lg"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <nav className="flex-1 overflow-y-auto p-6">
                  <ul className="space-y-1">
                    {NAV_ITEMS.map((item, index) => (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <a
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-between py-4 px-4 font-mono text-base font-medium uppercase tracking-wider text-foreground-secondary hover:text-brand-600 hover:bg-brand-50/50 rounded-lg transition-colors"
                        >
                          {item.label}
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                <div className="p-6 border-t border-border space-y-3">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => {
                      scrollToSection("courses")
                      setIsOpen(false)
                    }}
                  >
                    Get Started
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="lg"
                    onClick={() => {
                      scrollToSection("contact")
                      setIsOpen(false)
                    }}
                  >
                    Request Demo
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo />
          <DesktopNav />
          <div className="flex items-center gap-3">
            <Button 
              className="hidden md:inline-flex" 
              size="default"
              onClick={() => scrollToSection("courses")}
            >
              Get Started
            </Button>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  )
}
