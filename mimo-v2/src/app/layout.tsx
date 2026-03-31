// ═══════════════════════════════════════════════════════════
// Layout Wrapper - Shared layout for all pages
// ═══════════════════════════════════════════════════════════

import { Outlet } from "react-router-dom"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Toaster } from "sonner"

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-white focus:rounded-md focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <Toaster position="bottom-right" richColors />
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
