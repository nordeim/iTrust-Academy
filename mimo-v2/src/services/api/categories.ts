// ═══════════════════════════════════════════════════════════
// Category API Service
// ═══════════════════════════════════════════════════════════

import { getPaginated, getOne } from "./client"
import { transformCategory } from "./transformers"
import type { Category, BackendCategory } from "./types"

// ─────────────────────────────────────────────────────────
// 1. List All Categories
// ─────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const { data } = await getPaginated<BackendCategory>("/categories/")
  return data.map(transformCategory)
}

// ─────────────────────────────────────────────────────────
// 2. Get Single Category (by slug)
// ─────────────────────────────────────────────────────────

export async function getCategory(slug: string): Promise<Category> {
  const backend = await getOne<BackendCategory>(`/categories/${slug}/`)
  return transformCategory(backend)
}
