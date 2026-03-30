// ═══════════════════════════════════════════════════════════
// Footer Component - Updated with react-router-dom Link
// ═══════════════════════════════════════════════════════════

import { Link, useNavigate, useLocation } from "react-router-dom"
import { Container } from "./container"
import { FOOTER_LINKS, BRAND_NAME } from "@/lib/constants"
import { LinkedinIcon, TwitterIcon, YoutubeIcon } from "@/components/icons/social-icons"
import { ComingSoonModal } from "@/components/modals/coming-soon-modal"
import { cn, scrollToSection, scrollToTop } from "@/lib/utils"
import { Mail, Phone, MapPin, GraduationCap } from "lucide-react"
import { useState } from "react"

// Social media URLs
const SOCIAL_URLS: Record<string, string> = {
  "LinkedIn": "https://linkedin.com/company/itrust-academy",
  "Twitter": "https://twitter.com/itrustacademy",
  "YouTube": "https://youtube.com/@itrustacademy",
}

// Links that should trigger ComingSoonModal
const COMING_SOON_LINKS = ["Careers", "Partners", "Blog", "Documentation"]

function FooterLogo() {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToTop()
    navigate("/")
  }

  return (
    <a
      href="/"
      onClick={handleClick}
      className="flex items-center gap-3 group"
    >
      <div
        className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/30 transition-shadow"
        aria-hidden="true"
      >
        <GraduationCap className="text-white h-5 w-5" />
      </div>
      <div className="flex flex-col">
        <span className="font-sans font-bold text-lg text-slate-900 dark:text-white leading-tight">
          {BRAND_NAME}
        </span>
        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          Enterprise IT Training Excellence
        </span>
      </div>
    </a>
  )
}

interface FooterLinkProps {
  href: string
  children: React.ReactNode
  onComingSoon?: (title: string) => void
  isComingSoon?: boolean
}

function FooterLink({ href, children, onComingSoon, isComingSoon }: FooterLinkProps) {
  const location = useLocation()
  const navigate = useNavigate()

  // If it's a Coming Soon link, show button
  if (isComingSoon && onComingSoon) {
    return (
      <button
        onClick={() => onComingSoon(children as string)}
        className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors text-left"
      >
        {children}
      </button>
    )
  }

  // Handle hash links (scroll to section)
  if (href.includes("#")) {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault()
      const [path, hash] = href.split("#")

      // If we're on a different page, navigate first then scroll
      if (path && path !== "/" && location.pathname !== path) {
        navigate(path)
        setTimeout(() => hash && scrollToSection(hash), 100)
      } else if (hash) {
        // If we're on the same page, just scroll
        if (location.pathname !== "/") {
          navigate("/")
          setTimeout(() => scrollToSection(hash), 100)
        } else {
          scrollToSection(hash)
        }
      }
    }

    return (
      <a
        href={href}
        onClick={handleClick}
        className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
      >
        {children}
      </a>
    )
  }

  // Regular link
  return (
    <Link
      to={href}
      className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  const [comingSoonTitle, setComingSoonTitle] = useState<string | null>(null)
  const location = useLocation()
  const navigate = useNavigate()

  const handleComingSoon = (title: string) => {
    setComingSoonTitle(title)
  }

  const isComingSoonLink = (label: string) => COMING_SOON_LINKS.includes(label)

  const handleCourseClick = (e: React.MouseEvent, vendor: string) => {
    e.preventDefault()
    // Navigate to home and scroll to courses with filter
    if (location.pathname !== "/") {
      navigate("/")
      setTimeout(() => {
        scrollToSection("courses")
        // Dispatch vendor filter event
        window.dispatchEvent(new CustomEvent("vendorFilter", { detail: vendor }))
      }, 100)
    } else {
      scrollToSection("courses")
      window.dispatchEvent(new CustomEvent("vendorFilter", { detail: vendor }))
    }
  }

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800">
      <Container>
        {/* Main Footer Content */}
        <div className="py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column - Takes up 4 columns */}
            <div className="lg:col-span-4">
              <FooterLogo />
              <p className="mt-6 text-sm text-slate-600 dark:text-slate-400 max-w-xs leading-relaxed">
                Empowering IT professionals with industry-leading training and certifications since 2010.
              </p>

              {/* Contact Info */}
              <div className="mt-6 space-y-3">
                <a
                  href="mailto:info@itrustacademy.com"
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@itrustacademy.com
                </a>
                <a
                  href="tel:+6512345678"
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +65 1234 5678
                </a>
                <div className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>1 Raffles Place, Tower 2<br />Singapore 048616</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-2 mt-8">
                {[
                  { icon: LinkedinIcon, label: "LinkedIn" },
                  { icon: TwitterIcon, label: "Twitter" },
                  { icon: YoutubeIcon, label: "YouTube" },
                ].map(({ icon: Icon, label }) => {
                  const url = SOCIAL_URLS[label]
                  const isPlaceholder = !url || url.includes("example")

                  if (isPlaceholder) {
                    return (
                      <button
                        key={label}
                        onClick={() => handleComingSoon(`${label} Profile`)}
                        aria-label={`${label} - Coming Soon`}
                        className={cn(
                          "w-10 h-10 flex items-center justify-center rounded-lg",
                          "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
                          "hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 dark:hover:text-white",
                          "transition-all duration-200"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </button>
                    )
                  }

                  return (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit our ${label} page`}
                      className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-lg",
                        "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
                        "hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 dark:hover:text-white",
                        "transition-all duration-200"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Link Columns - Takes up 8 columns */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {/* Courses */}
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white mb-5">
                    Courses
                  </h4>
                  <ul className="space-y-3">
                    {[
                      { label: "SolarWinds Training", vendor: "SolarWinds" },
                      { label: "Securden Certification", vendor: "Securden" },
                      { label: "Quest Database Courses", vendor: "Quest" },
                      { label: "Ivanti ITAM", vendor: "Ivanti" },
                    ].map((link) => (
                      <li key={link.label}>
                        <a
                          href={`/#courses`}
                          onClick={(e) => handleCourseClick(e, link.vendor)}
                          className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white mb-5">
                    Company
                  </h4>
                  <ul className="space-y-3">
                    {FOOTER_LINKS.company.slice(0, 4).map((link) => (
                      <li key={link.label}>
                        <FooterLink
                          href={link.href}
                          isComingSoon={isComingSoonLink(link.label)}
                          onComingSoon={handleComingSoon}
                        >
                          {link.label}
                        </FooterLink>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white mb-5">
                    Resources
                  </h4>
                  <ul className="space-y-3">
                    {FOOTER_LINKS.resources.slice(0, 4).map((link) => (
                      <li key={link.label}>
                        <FooterLink
                          href={link.href}
                          isComingSoon={isComingSoonLink(link.label)}
                          onComingSoon={handleComingSoon}
                        >
                          {link.label}
                        </FooterLink>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support */}
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-900 dark:text-white mb-5">
                    Support
                  </h4>
                  <ul className="space-y-3">
                    {FOOTER_LINKS.support.slice(0, 4).map((link) => (
                      <li key={link.label}>
                        <FooterLink href={link.href}>
                          {link.label}
                        </FooterLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <Container>
          <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
              <Link
                to="/privacy"
                className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                Terms of Service
              </Link>
              <button
                onClick={() => handleComingSoon("Cookie Policy")}
                className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Coming Soon Modal */}
      <ComingSoonModal
        title={comingSoonTitle || ""}
        open={!!comingSoonTitle}
        onClose={() => setComingSoonTitle(null)}
      />
    </footer>
  )
}
