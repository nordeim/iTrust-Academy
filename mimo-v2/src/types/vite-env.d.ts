/// <reference types="vite/client" />

// ═══════════════════════════════════════════════════════════
// Vite Environment Type Declarations
// ═══════════════════════════════════════════════════════════

/**
 * Extend ImportMeta interface for Vite environment variables
 */
interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_VERSION: string
  // Add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/**
 * CSS Module declarations for Tailwind and custom CSS
 * Allows importing .css files in TypeScript
 */
declare module "*.css" {
  const content: { [className: string]: string }
  export default content
}

declare module "*.scss" {
  const content: { [className: string]: string }
  export default content
}

declare module "*.sass" {
  const content: { [className: string]: string }
  export default content
}

/**
 * Static asset declarations
 */
declare module "*.svg" {
  const content: string
  export default content
}

declare module "*.png" {
  const content: string
  export default content
}

declare module "*.jpg" {
  const content: string
  export default content
}

declare module "*.jpeg" {
  const content: string
  export default content
}

declare module "*.gif" {
  const content: string
  export default content
}

declare module "*.webp" {
  const content: string
  export default content
}

declare module "*.avif" {
  const content: string
  export default content
}

declare module "*.ico" {
  const content: string
  export default content
}
