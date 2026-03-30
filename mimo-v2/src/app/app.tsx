// ═══════════════════════════════════════════════════════════
// App Component - Routes Configuration
// ═══════════════════════════════════════════════════════════

import { Routes, Route } from "react-router-dom"
import { Layout } from "./layout"
import { HomePage } from "@/pages/home"
import { CourseDetailPage } from "@/pages/course-detail"
import { AboutPage } from "@/pages/about"
import { FAQPage } from "@/pages/faq"
import { PrivacyPage } from "@/pages/privacy"
import { TermsPage } from "@/pages/terms"
import { DashboardPage } from "@/pages/dashboard"

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses/:slug" element={<CourseDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  )
}
