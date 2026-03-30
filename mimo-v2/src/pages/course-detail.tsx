// ═══════════════════════════════════════════════════════════
// Course Detail Page - Enhanced with tabs and rich content
// ═══════════════════════════════════════════════════════════

import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, BarChart3, Users, Star, BookOpen, Award, CheckCircle, Share2 } from "lucide-react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import { COURSES } from "@/data/courses"
import { CourseTabs } from "@/components/course/course-tabs"
import { CourseCurriculum } from "@/components/course/course-curriculum"
import { CourseInstructor } from "@/components/course/course-instructor"
import { CourseCertification } from "@/components/course/course-certification"
import { RelatedCourses } from "@/components/course/related-courses"

export function CourseDetailPage() {
  const { slug } = useParams()
  const course = COURSES.find((c) => c.slug === slug)

  if (!course) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
        <p className="text-muted-foreground mb-6">The course you're looking for doesn't exist.</p>
        <Link to="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    )
  }

  // Define tabs content
  const tabs = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="space-y-8">
          {/* Course Description */}
          <section>
            <h3 className="text-xl font-bold mb-4">Course Description</h3>
            <p className="text-muted-foreground leading-relaxed">{course.description}</p>
          </section>

          {/* What You'll Learn */}
          <section>
            <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {course.learningOutcomes.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Prerequisites */}
          <section>
            <h3 className="text-xl font-bold mb-4">Prerequisites</h3>
            <ul className="space-y-2">
              {course.prerequisites.map((prereq, index) => (
                <li key={index} className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                  {prereq}
                </li>
              ))}
            </ul>
          </section>

          {/* Tags */}
          <section>
            <h3 className="text-xl font-bold mb-4">Topics Covered</h3>
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </section>
        </div>
      ),
    },
    {
      id: "curriculum",
      label: "Curriculum",
      content: <CourseCurriculum modules={course.curriculum} color={course.color} />,
    },
    {
      id: "instructor",
      label: "Instructor",
      content: <CourseInstructor instructor={course.instructor} />,
    },
    ...(course.certification
      ? [
          {
            id: "certification",
            label: "Certification",
            content: <CourseCertification certification={course.certification} vendorColor={course.color} />,
          },
        ]
      : []),
  ]

  return (
    <div className="pt-24 pb-16">
      <Container>
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="inline-block mr-2 h-4 w-4" />
            Back to Courses
          </Link>
        </nav>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="mb-8">
                <div className="flex gap-2 mb-4">
                  <Badge style={{ backgroundColor: course.color, color: "white" }}>
                    {course.vendor}
                  </Badge>
                  <Badge variant="outline">{course.level}</Badge>
                  {course.featured && <Badge className="bg-brand-100 text-brand-700">Featured</Badge>}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
                <p className="text-lg text-muted-foreground">{course.subtitle}</p>
              </div>

              {/* Course Stats */}
              <div className="flex flex-wrap gap-6 mb-8 p-6 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-500" />
                  <span className="font-mono">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-brand-500" />
                  <span className="font-mono">{course.modules} modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-brand-500" />
                  <span className="font-mono">{course.enrolled.toLocaleString()} enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span className="font-mono">{course.rating}</span>
                </div>
              </div>

              {/* Tabbed Content */}
              <CourseTabs tabs={tabs} />
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-24 bg-card border border-border rounded-xl p-6"
            >
              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold">{formatPrice(course.price)}</span>
                  {course.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {formatPrice(course.originalPrice)}
                    </span>
                  )}
                </div>
                {course.originalPrice && (
                  <Badge className="bg-green-100 text-green-700">
                    Save {formatPrice(course.originalPrice - course.price)}
                  </Badge>
                )}
              </div>

              {/* CTA */}
              <Button size="lg" className="w-full mb-4">
                <BookOpen className="mr-2 h-5 w-5" />
                Enroll Now
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                <Award className="mr-2 h-5 w-5" />
                Request Demo
              </Button>

              {/* Share Button */}
              <Button variant="ghost" size="sm" className="w-full mt-4">
                <Share2 className="mr-2 h-4 w-4" />
                Share Course
              </Button>

              {/* Course Includes */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-semibold mb-4">This Course Includes:</h4>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {course.duration} of instruction
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    {course.modules} learning modules
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Certificate of completion
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Lifetime access
                  </li>
                </ul>
              </div>

              {/* Tags */}
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-semibold mb-3">Topics Covered:</h4>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Courses */}
        <div className="mt-16">
          <RelatedCourses currentCourse={course} />
        </div>
      </Container>
    </div>
  )
}
