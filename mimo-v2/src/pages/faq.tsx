// ═══════════════════════════════════════════════════════════
// FAQ Page - Frequently Asked Questions
// ═══════════════════════════════════════════════════════════

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Container } from "@/components/layout/container"
import { cn } from "@/lib/utils"

const faqCategories = [
  {
    category: "Training & Courses",
    questions: [
      {
        q: "What types of training do you offer?",
        a: "We offer expert-led training across four major technology platforms: SolarWinds (network monitoring), Securden (privileged access management), Quest (database tools), and Ivanti (endpoint management). Our courses include hands-on labs, instructor-led sessions, and self-paced learning options."
      },
      {
        q: "Are your courses available online?",
        a: "Yes! We offer both live virtual instructor-led training and on-demand self-paced courses. Our virtual classrooms provide the same interactive experience as in-person training, with real-time Q&A and hands-on lab access."
      },
      {
        q: "How long are the courses?",
        a: "Course duration varies by topic and depth. Most courses range from 3-5 days for instructor-led training. Self-paced courses can be completed at your own speed with lifetime access to materials."
      },
      {
        q: "Do you provide course materials?",
        a: "Yes, all courses include comprehensive digital materials, lab guides, and reference documentation. You'll have lifetime access to course content and any future updates."
      }
    ]
  },
  {
    category: "Certification",
    questions: [
      {
        q: "Are your courses aligned with vendor certifications?",
        a: "Absolutely! Our curriculum is specifically designed to prepare you for official vendor certifications from SolarWinds, Securden, Quest, and Ivanti. Our instructors are certified professionals with real-world experience."
      },
      {
        q: "Do you provide certification exam vouchers?",
        a: "Some of our premium training packages include certification exam vouchers. Please check the specific course details or contact our sales team for information about bundled certification options."
      }
    ]
  },
  {
    category: "Enrollment & Pricing",
    questions: [
      {
        q: "How do I enroll in a course?",
        a: "You can enroll directly through our website by clicking the 'Enroll Now' button on any course page. For corporate training or group enrollments, please contact our sales team for customized pricing."
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards, bank transfers, and corporate purchase orders. For enterprise clients, we offer flexible payment terms and volume discounts."
      },
      {
        q: "Do you offer refunds?",
        a: "Yes, we offer a full refund if you cancel at least 7 days before the course start date. Cancellations within 7 days may be eligible for a credit towards future training. Please refer to our Terms of Service for complete details."
      },
      {
        q: "Are there group discounts?",
        a: "Yes! We offer attractive discounts for group enrollments of 3 or more participants from the same organization. Contact our sales team for a customized quote."
      }
    ]
  },
  {
    category: "Technical Requirements",
    questions: [
      {
        q: "What do I need for virtual training?",
        a: "For virtual instructor-led training, you'll need a stable internet connection, a computer with a modern web browser, and audio/video capabilities for participation. Lab environments are provided remotely."
      },
      {
        q: "Do I need to install software for labs?",
        a: "No! Our hands-on labs run in cloud-based environments accessible through your web browser. No local software installation is required."
      }
    ]
  },
  {
    category: "Corporate Training",
    questions: [
      {
        q: "Do you offer on-site training?",
        a: "Yes, we offer on-site training for corporate clients throughout the Asia-Pacific region. Our instructors can deliver customized training programs at your location or at our training centers."
      },
      {
        q: "Can you customize courses for our organization?",
        a: "Absolutely! We specialize in creating customized training programs tailored to your organization's specific platform deployments and team skill gaps. Contact us to discuss your requirements."
      }
    ]
  }
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
        )}
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <p className="p-4 pt-0 text-muted-foreground">{answer}</p>
      </div>
    </div>
  )
}

export function FAQPage() {
  return (
    <div className="pt-24 pb-16">
      <Container>
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked <span className="text-primary">Questions</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our training programs, certifications, and enrollment process.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <motion.section
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * categoryIndex }}
            >
              <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
              <div className="space-y-3">
                {category.questions.map((item, index) => (
                  <FAQItem key={index} question={item.q} answer={item.a} />
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center bg-muted/50 rounded-2xl p-8"
        >
          <h3 className="text-xl font-bold mb-3">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">
            Our team is here to help. Contact us for personalized assistance.
          </p>
          <a href="/#contact" className="inline-block">
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Contact Us
            </button>
          </a>
        </motion.div>
      </Container>
    </div>
  )
}
