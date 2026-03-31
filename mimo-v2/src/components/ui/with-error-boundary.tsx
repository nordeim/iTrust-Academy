// ═══════════════════════════════════════════════════════════
// withErrorBoundary HOC
// Wraps components with error boundary
// ═══════════════════════════════════════════════════════════

import React, { ReactNode } from "react"
import { ErrorBoundary } from "./error-boundary"

export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}
