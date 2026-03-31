// ═══════════════════════════════════════════════════════════
// App Component - Routes Configuration with Error Boundaries
// ═══════════════════════════════════════════════════════════

import { Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import { Layout } from "./layout"
import { ErrorBoundary } from "@/components/ui/error-boundary"

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

// Lazy load pages for code splitting
const HomePage = lazy(() => import("@/pages/home").then(m => ({ default: m.HomePage })))
const CourseDetailPage = lazy(() => import("@/pages/course-detail").then(m => ({ default: m.CourseDetailPage })))
const AboutPage = lazy(() => import("@/pages/about").then(m => ({ default: m.AboutPage })))
const FAQPage = lazy(() => import("@/pages/faq").then(m => ({ default: m.FAQPage })))
const PrivacyPage = lazy(() => import("@/pages/privacy").then(m => ({ default: m.PrivacyPage })))
const TermsPage = lazy(() => import("@/pages/terms").then(m => ({ default: m.TermsPage })))
const DashboardPage = lazy(() => import("@/pages/dashboard").then(m => ({ default: m.DashboardPage })))
const NotFoundPage = lazy(() => import("@/pages/not-found").then(m => ({ default: m.NotFoundPage })))

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={
            <Suspense fallback={<PageLoader />}>
              <ErrorBoundary>
                <HomePage />
              </ErrorBoundary>
            </Suspense>
          } />
          <Route path="/courses/:slug" element={
            <Suspense fallback={<PageLoader />}>
              <ErrorBoundary>
                <CourseDetailPage />
              </ErrorBoundary>
            </Suspense>
          } />
          <Route path="/about" element={
            <Suspense fallback={<PageLoader />}>
              <ErrorBoundary>
                <AboutPage />
              </ErrorBoundary>
            </Suspense>
          } />
          <Route path="/faq" element={
            <Suspense fallback={<PageLoader />}>
              <ErrorBoundary>
                <FAQPage />
              </ErrorBoundary>
            </Suspense>
          } />
          <Route path="/privacy" element={
            <Suspense fallback={<PageLoader />}>
              <ErrorBoundary>
                <PrivacyPage />
              </ErrorBoundary>
            </Suspense>
          } />
          <Route path="/terms" element={
            <Suspense fallback={<PageLoader />}>
              <ErrorBoundary>
                <TermsPage />
              </ErrorBoundary>
            </Suspense>
          } />
          <Route path="/dashboard" element={
            <Suspense fallback={<PageLoader />}>
              <ErrorBoundary>
                <DashboardPage />
              </ErrorBoundary>
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<PageLoader />}>
              <NotFoundPage />
            </Suspense>
          } />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}
