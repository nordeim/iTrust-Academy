// ═══════════════════════════════════════════════════════════
// About Us Page - Company information and values
// ═══════════════════════════════════════════════════════════

import { motion } from "framer-motion"
import { Award, Users, Globe, Target, Heart, Zap } from "lucide-react"
import { Container } from "@/components/layout/container"

const values = [
  { icon: Award, title: "Excellence", description: "We deliver the highest quality training with certified instructors and hands-on labs." },
  { icon: Users, title: "Partnership", description: "We work alongside our clients to understand their unique challenges and goals." },
  { icon: Globe, title: "Regional Focus", description: "Deep expertise in APAC markets with training in English, Mandarin, and Bahasa Melayu." },
  { icon: Target, title: "Results-Driven", description: "Our curriculum is aligned with vendor certifications that employers demand." },
  { icon: Heart, title: "Student Success", description: "Your success is our mission. We provide ongoing support throughout your learning journey." },
  { icon: Zap, title: "Innovation", description: "We stay ahead of technology trends to bring you cutting-edge training content." },
]

export function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <Container>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="text-primary">iTrust Academy</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering IT professionals across Asia-Pacific with expert-led, hands-on training
            and industry-recognized certifications since 2010.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div className="bg-brand-50 dark:bg-brand-900/20 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              iTrust Academy exists to bridge the skills gap in enterprise IT by providing world-class
              training programs for SolarWinds, Securden, Quest, and Ivanti platforms. We believe that
              quality education should be accessible, practical, and aligned with real-world business needs.
            </p>
          </div>
        </motion.section>

        {/* Company Story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2010 in Singapore, iTrust Academy began as a small team of IT professionals
                passionate about sharing their expertise with the next generation of technology leaders.
              </p>
              <p>
                Over the years, we've grown to become the Asia-Pacific region's premier provider of
                enterprise IT training, serving over 500 organizations and training more than 10,000
                professionals across 15 countries.
              </p>
              <p>
                Our partnerships with leading technology vendors like SolarWinds, Securden, Quest, and
                Ivanti allow us to deliver authorized training content that directly prepares our students
                for industry certifications.
              </p>
            </div>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Today, iTrust Academy continues to innovate, expanding our course catalog and delivery
                methods to meet the evolving needs of IT professionals in a rapidly changing technology landscape.
              </p>
              <p>
                Whether you're looking to advance your career, upskill your team, or prepare for a vendor
                certification, iTrust Academy is your trusted partner in professional development.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all"
                >
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10,000+", label: "Professionals Trained" },
              { number: "500+", label: "Enterprise Clients" },
              { number: "15+", label: "Countries Served" },
              { number: "4.8", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center bg-primary text-primary-foreground rounded-2xl p-8 md:p-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Join thousands of IT professionals who have advanced their careers with iTrust Academy.
          </p>
          <a href="/#courses" className="inline-block">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-white/90 transition-colors">
              Browse Courses
            </button>
          </a>
        </motion.section>
      </Container>
    </div>
  )
}
