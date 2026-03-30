// ═══════════════════════════════════════════════════════════
// User Dashboard Page - Enhanced with achievements and actions
// ═══════════════════════════════════════════════════════════

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import {
  BookOpen, Clock, Award, TrendingUp, Play, ChevronRight,
  Flame, Target, Zap, Trophy, Calendar, Bell, Search, Settings
} from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuthStore } from "@/store/useAuthStore"
import { COURSES } from "@/data/courses"

// Dummy enrolled courses for demo
const ENROLLED_COURSES = [
  {
    ...COURSES[0],
    progress: 75,
    lastAccessed: "2 hours ago",
    nextModule: "Module 10: Advanced Alerting",
  },
  {
    ...COURSES[1],
    progress: 45,
    lastAccessed: "Yesterday",
    nextModule: "Module 5: Session Recording",
  },
  {
    ...COURSES[3],
    progress: 20,
    lastAccessed: "3 days ago",
    nextModule: "Module 3: Patch Management",
  },
]

// Achievement badges data
const ACHIEVEMENTS = [
  { icon: Flame, label: "7-Day Streak", description: "Learned 7 days in a row", earned: true, color: "#f97316" },
  { icon: Target, label: "First Course", description: "Completed your first course", earned: true, color: "#22c55e" },
  { icon: Zap, label: "Quick Learner", description: "Finished 3 modules in one day", earned: true, color: "#eab308" },
  { icon: Trophy, label: "Certified", description: "Earned your first certification", earned: false, color: "#6366f1" },
]

// Quick actions
const QUICK_ACTIONS = [
  { icon: Search, label: "Browse Courses", href: "/#courses", description: "Find new courses" },
  { icon: Calendar, label: "Training Calendar", href: "/#schedule", description: "View upcoming sessions" },
  { icon: Bell, label: "Notifications", href: "#", description: "3 new updates" },
  { icon: Settings, label: "Settings", href: "#", description: "Manage your account" },
]

function CourseProgressCard({ course }: { course: typeof ENROLLED_COURSES[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all"
    >
      {/* Color bar */}
      <div className="h-1.5" style={{ backgroundColor: course.color }} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <Badge style={{ backgroundColor: course.color, color: "white" }} className="mb-2">
              {course.vendor}
            </Badge>
            <h3 className="font-bold text-lg">{course.title}</h3>
          </div>
          <Link to={`/courses/${course.slug}`}>
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{course.progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full transition-all duration-500"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>

        {/* Next Module */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Play className="w-4 h-4" />
          <span>Next: {course.nextModule}</span>
        </div>

        {/* Last Accessed */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last accessed: {course.lastAccessed}</span>
          <Button size="sm">Continue</Button>
        </div>
      </div>
    </motion.div>
  )
}

function AchievementBadge({ achievement }: { achievement: typeof ACHIEVEMENTS[0] }) {
  const Icon = achievement.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative flex flex-col items-center p-4 rounded-xl border transition-all ${
        achievement.earned
          ? "bg-card border-border hover:border-primary/50 hover:shadow-lg"
          : "bg-muted/50 border-dashed border-muted-foreground/30 opacity-50"
      }`}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
          achievement.earned ? "shadow-lg" : ""
        }`}
        style={{ backgroundColor: achievement.earned ? `${achievement.color}20` : undefined }}
      >
        <Icon
          className="w-6 h-6"
          style={{ color: achievement.earned ? achievement.color : "currentColor" }}
        />
      </div>
      <h4 className="font-medium text-sm text-center">{achievement.label}</h4>
      <p className="text-xs text-muted-foreground text-center mt-1">{achievement.description}</p>
      {achievement.earned && (
        <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] px-1.5 py-0.5">
          Earned
        </Badge>
      )}
    </motion.div>
  )
}

function QuickActionButton({ action }: { action: typeof QUICK_ACTIONS[0] }) {
  const Icon = action.icon

  return (
    <Link
      to={action.href}
      className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all group"
    >
      <div className="w-10 h-10 bg-brand-100 dark:bg-brand-900/20 rounded-lg flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-brand-500" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium group-hover:text-brand-600 transition-colors">{action.label}</h4>
        <p className="text-sm text-muted-foreground truncate">{action.description}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-brand-500 transition-colors" />
    </Link>
  )
}

export function DashboardPage() {
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="pt-24 pb-16">
        <Container>
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Please Sign In</h1>
            <p className="text-muted-foreground mb-6">
              You need to be logged in to access your dashboard.
            </p>
            <Link to="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </Container>
      </div>
    )
  }

  const firstName = user?.firstName || "Student"

  return (
    <div className="pt-24 pb-16">
      <Container>
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Welcome back, <span className="text-primary">{firstName}</span>!
              </h1>
              <p className="text-lg text-muted-foreground">
                Continue your learning journey. You're making great progress!
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Flame className="w-5 h-5 text-orange-500" />
                <span className="font-mono font-bold text-orange-600">7 day streak</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { icon: BookOpen, label: "Courses Enrolled", value: "3" },
            { icon: Clock, label: "Hours Learned", value: "47" },
            { icon: Award, label: "Certificates", value: "1" },
            { icon: TrendingUp, label: "Avg. Progress", value: "47%" },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="bg-card border border-border rounded-xl p-6"
              >
                <Icon className="w-8 h-8 text-brand-500 mb-3" />
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - My Courses */}
          <div className="lg:col-span-2">
            {/* My Courses */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">My Courses</h2>
                <Link to="/#courses">
                  <Button variant="outline" size="sm">Browse More Courses</Button>
                </Link>
              </div>

              <div className="space-y-6">
                {ENROLLED_COURSES.map((course) => (
                  <CourseProgressCard key={course.id} course={course} />
                ))}
              </div>
            </motion.section>

            {/* Recommended Courses */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12"
            >
              <h2 className="text-2xl font-bold mb-6">Recommended For You</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {COURSES.slice(4, 8).map((course) => (
                  <Link
                    key={course.id}
                    to={`/courses/${course.slug}`}
                    className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 hover:shadow-lg transition-all"
                  >
                    <Badge style={{ backgroundColor: course.color, color: "white" }} className="mb-2">
                      {course.vendor}
                    </Badge>
                    <h3 className="font-medium mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">{course.duration}</p>
                  </Link>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {QUICK_ACTIONS.map((action, index) => (
                  <QuickActionButton key={index} action={action} />
                ))}
              </div>
            </motion.div>

            {/* Achievement Badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-lg font-bold mb-4">Achievements</h3>
              <div className="grid grid-cols-2 gap-4">
                {ACHIEVEMENTS.map((achievement, index) => (
                  <AchievementBadge key={index} achievement={achievement} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  )
}
