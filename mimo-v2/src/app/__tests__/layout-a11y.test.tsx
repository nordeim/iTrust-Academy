import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Layout } from "../layout"

function wrapper({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
  )
}

describe("Layout accessibility", () => {
  it("has a skip-to-content link", () => {
    const { container } = render(<Layout />, { wrapper })
    const skipLink = container.querySelector('a[href="#main-content"]')
    expect(skipLink).not.toBeNull()
    expect(skipLink?.textContent).toBe("Skip to content")
  })

  it("main element has id for skip link target", () => {
    const { container } = render(<Layout />, { wrapper })
    const main = container.querySelector("main")
    expect(main).toHaveAttribute("id", "main-content")
  })
})
