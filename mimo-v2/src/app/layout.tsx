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
      <Toaster position="bottom-right" richColors />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
