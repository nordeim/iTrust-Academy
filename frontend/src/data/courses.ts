/**
 * iTrust Academy - Course Data
 * Training programs and categories
 */

// Course level types
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";

// Course interface
export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: CourseLevel;
  duration: string;
  image?: string;
  featured?: boolean;
  tags?: string[];
  instructor?: string;
  rating?: number;
  students?: number;
}

// Course categories
export const COURSE_CATEGORIES = [
  "All",
  "Cloud & Infrastructure",
  "Cybersecurity",
  "Data & AI",
  "Software Development",
  "Project Management",
] as const;

export type CourseCategory = typeof COURSE_CATEGORIES[number];

// Course data
export const COURSES: Course[] = [
  // Cloud & Infrastructure
  {
    id: "aws-solutions-architect",
    title: "AWS Solutions Architect Professional",
    description: "Master AWS architecture patterns, security best practices, and cost optimization strategies for enterprise deployments.",
    category: "Cloud & Infrastructure",
    level: "Advanced",
    duration: "40 hours",
    featured: true,
    tags: ["AWS", "Cloud", "Architecture"],
    rating: 4.9,
    students: 2840,
  },
  {
    id: "kubernetes-admin",
    title: "Kubernetes Administrator (CKA)",
    description: "Learn container orchestration, cluster management, and deployment strategies for production Kubernetes environments.",
    category: "Cloud & Infrastructure",
    level: "Intermediate",
    duration: "35 hours",
    featured: true,
    tags: ["Kubernetes", "DevOps", "Containers"],
    rating: 4.8,
    students: 1950,
  },
  {
    id: "azure-administrator",
    title: "Azure Administrator Associate",
    description: "Comprehensive Azure administration covering identity, governance, storage, compute, and network solutions.",
    category: "Cloud & Infrastructure",
    level: "Intermediate",
    duration: "32 hours",
    tags: ["Azure", "Microsoft", "Cloud"],
    rating: 4.7,
    students: 1620,
  },
  {
    id: "terraform-infrastructure",
    title: "Terraform Infrastructure as Code",
    description: "Automate infrastructure provisioning across multiple cloud providers using Terraform best practices.",
    category: "Cloud & Infrastructure",
    level: "Intermediate",
    duration: "24 hours",
    tags: ["Terraform", "IaC", "Automation"],
    rating: 4.8,
    students: 1180,
  },

  // Cybersecurity
  {
    id: "cybersecurity-essentials",
    title: "Cybersecurity Essentials",
    description: "Comprehensive security fundamentals covering threat analysis, vulnerability assessment, and incident response.",
    category: "Cybersecurity",
    level: "Beginner",
    duration: "24 hours",
    tags: ["Security", "Compliance", "Risk"],
    rating: 4.7,
    students: 2340,
  },
  {
    id: "cissp-certification",
    title: "CISSP Certification Preparation",
    description: "Prepare for the Certified Information Systems Security Professional exam with expert-led training.",
    category: "Cybersecurity",
    level: "Advanced",
    duration: "48 hours",
    featured: true,
    tags: ["CISSP", "Certification", "Security"],
    rating: 4.9,
    students: 1560,
  },
  {
    id: "ethical-hacking",
    title: "Certified Ethical Hacker (CEH)",
    description: "Learn penetration testing, vulnerability assessment, and ethical hacking methodologies.",
    category: "Cybersecurity",
    level: "Intermediate",
    duration: "40 hours",
    tags: ["Ethical Hacking", "Pen Testing", "Security"],
    rating: 4.8,
    students: 1890,
  },

  // Data & AI
  {
    id: "ml-engineering",
    title: "Machine Learning Engineering",
    description: "Build and deploy production ML systems using MLOps best practices, model monitoring, and scalable architectures.",
    category: "Data & AI",
    level: "Advanced",
    duration: "48 hours",
    featured: true,
    tags: ["ML", "AI", "MLOps"],
    rating: 4.9,
    students: 1420,
  },
  {
    id: "data-analytics",
    title: "Data Analytics Professional",
    description: "Master data analysis techniques using Python, SQL, and visualization tools for business intelligence.",
    category: "Data & AI",
    level: "Beginner",
    duration: "32 hours",
    tags: ["Analytics", "Python", "SQL"],
    rating: 4.7,
    students: 2680,
  },
  {
    id: "generative-ai",
    title: "Generative AI for Enterprise",
    description: "Implement generative AI solutions including LLMs, prompt engineering, and enterprise AI governance.",
    category: "Data & AI",
    level: "Intermediate",
    duration: "28 hours",
    featured: true,
    tags: ["GenAI", "LLM", "Enterprise AI"],
    rating: 4.9,
    students: 890,
  },

  // Software Development
  {
    id: "devops-fundamentals",
    title: "DevOps Engineering Fundamentals",
    description: "CI/CD pipelines, infrastructure as code, monitoring, and automation for modern software delivery.",
    category: "Software Development",
    level: "Intermediate",
    duration: "32 hours",
    tags: ["DevOps", "CI/CD", "Automation"],
    rating: 4.8,
    students: 2240,
  },
  {
    id: "fullstack-development",
    title: "Full-Stack Development Bootcamp",
    description: "Complete web development training covering frontend, backend, databases, and deployment.",
    category: "Software Development",
    level: "Beginner",
    duration: "80 hours",
    tags: ["Full-Stack", "JavaScript", "React"],
    rating: 4.7,
    students: 3120,
  },
  {
    id: "api-development",
    title: "API Design & Development",
    description: "Design, build, and secure RESTful and GraphQL APIs for modern applications.",
    category: "Software Development",
    level: "Intermediate",
    duration: "24 hours",
    tags: ["API", "REST", "GraphQL"],
    rating: 4.6,
    students: 1340,
  },

  // Project Management
  {
    id: "pmp-certification",
    title: "PMP Certification Preparation",
    description: "Project Management Professional exam preparation with hands-on case studies and practice exams.",
    category: "Project Management",
    level: "Intermediate",
    duration: "36 hours",
    tags: ["PMP", "Project Management", "Certification"],
    rating: 4.8,
    students: 2780,
  },
  {
    id: "agile-scrum",
    title: "Agile & Scrum Master Certification",
    description: "Master Agile methodologies and Scrum framework for effective project delivery.",
    category: "Project Management",
    level: "Beginner",
    duration: "20 hours",
    tags: ["Agile", "Scrum", "Certification"],
    rating: 4.7,
    students: 2450,
  },
  {
    id: "itil-foundation",
    title: "ITIL 4 Foundation",
    description: "IT service management best practices aligned with ITIL 4 framework.",
    category: "Project Management",
    level: "Beginner",
    duration: "18 hours",
    tags: ["ITIL", "ITSM", "Service Management"],
    rating: 4.6,
    students: 1920,
  },
];

// Get courses by category
export function getCoursesByCategory(category: CourseCategory): Course[] {
  if (category === "All") return COURSES;
  return COURSES.filter((course) => course.category === category);
}

// Get featured courses
export function getFeaturedCourses(): Course[] {
  return COURSES.filter((course) => course.featured);
}

// Get course by ID
export function getCourseById(id: string): Course | undefined {
  return COURSES.find((course) => course.id === id);
}
