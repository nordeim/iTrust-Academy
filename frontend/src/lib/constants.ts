/**
 * iTrust Academy - Application Constants
 * Brand identity, navigation, and configuration data
 */

// ============================================
// BRAND IDENTITY
// ============================================

export const BRAND_NAME = "iTrust Academy";
export const BRAND_TAGLINE = "Enterprise IT Training Excellence";
export const BRAND_DESCRIPTION = "Transform your workforce with cutting-edge IT training in cloud, cybersecurity, AI/ML, and DevOps. Trusted by 500+ enterprises across Asia.";

// ============================================
// NAVIGATION
// ============================================

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Courses", href: "#courses" },
  { label: "Solutions", href: "#solutions" },
  { label: "About", href: "#about" },
  { label: "Resources", href: "#resources" },
  { label: "Contact", href: "#contact" },
];

// ============================================
// SOCIAL LINKS
// ============================================

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "LinkedIn", href: "https://linkedin.com/company/itrust-academy", icon: "linkedin" },
  { name: "Twitter", href: "https://twitter.com/itrustacademy", icon: "twitter" },
  { name: "YouTube", href: "https://youtube.com/itrustacademy", icon: "youtube" },
  { name: "Facebook", href: "https://facebook.com/itrustacademy", icon: "facebook" },
];

// ============================================
// CONTACT INFORMATION
// ============================================

export const CONTACT_INFO = {
  email: "contact@itrust-academy.com",
  phone: "+65 6123 4567",
  address: {
    line1: "1 Raffles Place",
    line2: "Tower One, #30-01",
    city: "Singapore",
    postalCode: "048616",
    country: "Singapore",
  },
  offices: [
    { city: "Singapore", country: "Singapore", headquarters: true },
    { city: "Hong Kong", country: "Hong Kong" },
    { city: "Kuala Lumpur", country: "Malaysia" },
    { city: "Bangkok", country: "Thailand" },
  ],
};

// ============================================
// SEO & META
// ============================================

export const SITE_CONFIG = {
  name: BRAND_NAME,
  description: BRAND_DESCRIPTION,
  url: "https://itrust-academy.com",
  ogImage: "/og-image.jpg",
  links: {
    linkedin: "https://linkedin.com/company/itrust-academy",
    twitter: "https://twitter.com/itrustacademy",
  },
};

// ============================================
// FEATURE FLAGS
// ============================================

export const FEATURES = {
  darkMode: true,
  animations: true,
  newsletter: true,
  liveChat: false,
};

// ============================================
// ANIMATION CONFIG
// ============================================

export const ANIMATION_CONFIG = {
  duration: {
    fast: 0.15,
    normal: 0.25,
    slow: 0.4,
    slower: 0.6,
  },
  ease: {
    default: [0.4, 0, 0.2, 1],
    in: [0.4, 0, 1, 1],
    out: [0, 0, 0.2, 1],
    bounce: [0.34, 1.56, 0.64, 1],
  },
  stagger: {
    default: 0.1,
    fast: 0.05,
    slow: 0.15,
  },
};

// ============================================
// BREAKPOINTS (for reference)
// ============================================

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  "3xl": 1920,
} as const;

// ============================================
// Z-INDEX SCALE
// ============================================

export const Z_INDEX = {
  base: 0,
  dropdown: 200,
  sticky: 300,
  modal: 400,
  popover: 500,
  tooltip: 600,
  toast: 700,
} as const;
