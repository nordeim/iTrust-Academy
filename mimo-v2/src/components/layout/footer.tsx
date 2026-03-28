import { Container } from "./container"
import { FOOTER_LINKS, BRAND_NAME } from "@/lib/constants"
import { LinkedinIcon, TwitterIcon, YoutubeIcon } from "@/components/icons/social-icons"
import { cn } from "@/lib/utils"
import { Mail, Phone, MapPin } from "lucide-react"

function FooterLogo() {
  return (
    <a href="#" className="flex items-center gap-3 group">
      <div className="w-10 h-10 bg-brand-500 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/30 transition-shadow">
        <span className="text-white font-bold text-xl font-mono">i</span>
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

export function Footer() {
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
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className={cn(
                      "w-10 h-10 flex items-center justify-center rounded-lg",
                      "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
                      "hover:bg-brand-500 hover:text-white dark:hover:bg-brand-500 dark:hover:text-white",
                      "transition-all duration-200"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
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
                      { label: "SolarWinds Training", href: "#courses" },
                      { label: "Securden Certification", href: "#courses" },
                      { label: "Quest Database Courses", href: "#courses" },
                      { label: "Ivanti ITAM", href: "#courses" },
                    ].map((link) => (
                      <li key={link.label}>
                        <a 
                          href={link.href} 
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
                        <a 
                          href={link.href} 
                          className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                        >
                          {link.label}
                        </a>
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
                    {[
                      { label: "Blog", href: "#" },
                      { label: "Documentation", href: "#" },
                      { label: "FAQ", href: "#" },
                      { label: "Support", href: "#" },
                    ].map((link) => (
                      <li key={link.label}>
                        <a 
                          href={link.href} 
                          className="text-sm text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Empty column for balance or could add Newsletter */}
                <div className="hidden md:block">
                  {/* Could add newsletter signup here */}
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
              <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
