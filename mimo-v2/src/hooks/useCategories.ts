// ═══════════════════════════════════════════════════════════
// Category Query Hooks
// ═══════════════════════════════════════════════════════════

import { useQuery } from "@tanstack/react-query"
import { getCategories, getCategory } from "@/services/api/categories"

// ─────────────────────────────────────────────────────────
// 1. List All Categories
// ─────────────────────────────────────────────────────────

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 30 * 60 * 1000, // 30 minutes (categories rarely change)
  })
}

// ─────────────────────────────────────────────────────────
// 2. Single Category
// ─────────────────────────────────────────────────────────

export function useCategory(slug: string) {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: () => getCategory(slug),
    enabled: !!slug,
    staleTime: 30 * 60 * 1000,
  })
}
