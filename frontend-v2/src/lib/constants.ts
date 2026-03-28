export const BRAND_NAME = "iTrust Academy";
export const BRAND_TAGLINE = "Enterprise IT Training Excellence";

export const NAV_ITEMS = [
  { label: "Courses", href: "#courses" },
  { label: "Vendors", href: "#vendors" },
  { label: "Solutions", href: "#solutions" },
  { label: "Schedule", href: "#schedule" },
  { label: "About", href: "#about" },
] as const;

export const VENDORS = [
  { 
    id: "solarwinds", 
    name: "SolarWinds", 
    color: "#F27A1A",
    description: "Network monitoring and IT management solutions",
    courses: 12,
  },
  { 
    id: "securden", 
    name: "Securden", 
    color: "#2BBCB3",
    description: "Privileged access management and security",
    courses: 8,
  },
  { 
    id: "quest", 
    name: "Quest", 
    color: "#3B82F6",
    description: "Database management and data protection",
    courses: 15,
  },
  { 
    id: "ivanti", 
    name: "Ivanti", 
    color: "#7C3AED",
    description: "IT service and asset management",
    courses: 10,
  },
] as const;

export const COURSES = [
  {
    id: "scp-fundamentals",
    title: "SCP Fundamentals",
    subtitle: "SolarWinds Certified Professional",
    vendor: "solarwinds",
    level: "Beginner",
    duration: "4 weeks",
    price: 2499,
    originalPrice: 2999,
    description: "Master the fundamentals of SolarWinds platform administration, monitoring, and optimization.",
    features: ["Official Certification Prep", "Hands-on Labs", "Expert Instructors"],
  },
  {
    id: "network-monitoring",
    title: "Advanced Network Monitoring",
    subtitle: "SolarWinds NPM Deep Dive",
    vendor: "solarwinds",
    level: "Advanced",
    duration: "6 weeks",
    price: 3499,
    description: "Advanced network performance monitoring with SolarWinds Network Performance Monitor.",
    features: ["Real-world Scenarios", "Performance Tuning", "Custom Dashboards"],
  },
  {
    id: "pam-essentials",
    title: "PAM Essentials",
    subtitle: "Privileged Access Management",
    vendor: "securden",
    level: "Intermediate",
    duration: "3 weeks",
    price: 1999,
    description: "Implement and manage privileged access security with Securden PAM solutions.",
    features: ["Security Best Practices", "Compliance Framework", "Implementation Labs"],
  },
  {
    id: "database-admin",
    title: "Database Administration",
    subtitle: "Quest Database Solutions",
    vendor: "quest",
    level: "Intermediate",
    duration: "5 weeks",
    price: 2999,
    originalPrice: 3499,
    description: "Comprehensive database administration with Quest tools for SQL Server and Oracle.",
    features: ["Multi-Platform Support", "Performance Optimization", "Backup Strategies"],
  },
  {
    id: "itam-foundation",
    title: "ITAM Foundation",
    subtitle: "IT Asset Management",
    vendor: "ivanti",
    level: "Beginner",
    duration: "4 weeks",
    price: 2299,
    description: "Foundation course for IT asset management with Ivanti Service Manager.",
    features: ["Asset Lifecycle", "License Management", "Compliance Reporting"],
  },
] as const;

export const SCHEDULE = [
  {
    course: "SCP Fundamentals",
    vendor: "solarwinds",
    startDate: "2026-04-07",
    endDate: "2026-05-02",
    format: "Online",
    spots: 8,
    status: "enrolling",
  },
  {
    course: "PAM Essentials",
    vendor: "securden",
    startDate: "2026-04-14",
    endDate: "2026-05-05",
    format: "Hybrid",
    spots: 12,
    status: "enrolling",
  },
  {
    course: "Database Administration",
    vendor: "quest",
    startDate: "2026-04-21",
    endDate: "2026-05-26",
    format: "In-Person",
    location: "Singapore",
    spots: 6,
    status: "limited",
  },
  {
    course: "ITAM Foundation",
    vendor: "ivanti",
    startDate: "2026-05-05",
    endDate: "2026-06-06",
    format: "Online",
    spots: 15,
    status: "enrolling",
  },
] as const;

export const FEATURES = [
  {
    title: "Expert-Led Training",
    description: "Learn from certified professionals with real-world experience at leading enterprises.",
  },
  {
    title: "Hands-On Labs",
    description: "Practice in simulated environments that mirror actual enterprise scenarios.",
  },
  {
    title: "Official Certifications",
    description: "Prepare for vendor certifications with official courseware and exam prep.",
  },
  {
    title: "Flexible Learning",
    description: "Choose from online, in-person, or hybrid formats to suit your schedule.",
  },
  {
    title: "Enterprise Solutions",
    description: "Customized training programs designed for organizational needs.",
  },
  {
    title: "Career Support",
    description: "Job placement assistance and career guidance for all graduates.",
  },
] as const;

export const STATS = [
  { value: "50,000+", label: "Professionals Trained" },
  { value: "500+", label: "Enterprise Clients" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "45+", label: "Certification Paths" },
] as const;

export const SOCIAL_LINKS = [
  { name: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { name: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { name: "YouTube", href: "https://youtube.com", icon: "youtube" },
] as const;

export const FOOTER_LINKS = {
  courses: [
    { label: "SolarWinds Training", href: "#" },
    { label: "Securden Certification", href: "#" },
    { label: "Quest Database Courses", href: "#" },
    { label: "Ivanti ITAM", href: "#" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Partners", href: "#" },
    { label: "Contact", href: "#" },
  ],
  resources: [
    { label: "Blog", href: "#" },
    { label: "Documentation", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Support", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
} as const;
