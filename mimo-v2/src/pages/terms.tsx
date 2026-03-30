// ═══════════════════════════════════════════════════════════
// Terms of Service Page
// ═══════════════════════════════════════════════════════════

import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"

export function TermsPage() {
  return (
    <div className="pt-24 pb-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: March 30, 2026</p>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using iTrust Academy's platform and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Services Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                iTrust Academy provides enterprise IT training and certification preparation services for SolarWinds, Securden, Quest, and Ivanti platforms. Our services include instructor-led training, self-paced courses, hands-on labs, and certification preparation materials.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>You must provide accurate and complete registration information</li>
                <li>You are responsible for maintaining account security</li>
                <li>You must notify us immediately of any unauthorized account use</li>
                <li>One account per individual; sharing accounts is prohibited</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Enrollment & Payment</h2>
              <h3 className="text-lg font-semibold mb-2">Enrollment</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Enrollment is confirmed upon receipt of full payment or approved purchase order. Course access is provided within 24 hours of enrollment confirmation.
              </p>
              <h3 className="text-lg font-semibold mb-2">Payment</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>All prices are listed in USD unless otherwise specified</li>
                <li>Payment is due at time of enrollment</li>
                <li>Corporate accounts may qualify for NET-30 terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Cancellation & Refunds</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Cancellations 7+ days before course start: Full refund</li>
                <li>Cancellations 3-6 days before course start: 50% refund or course credit</li>
                <li>Cancellations within 48 hours: No refund, course credit only</li>
                <li>No-shows: No refund or credit</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All course materials, including videos, documents, labs, and assessments, are the intellectual property of iTrust Academy and/or our technology partners. You may not reproduce, distribute, or create derivative works without written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Acceptable Use</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Share account credentials with others</li>
                <li>Download or redistribute course content</li>
                <li>Use the platform for illegal purposes</li>
                <li>Attempt to circumvent security measures</li>
                <li>Interfere with other users' access</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                iTrust Academy is not liable for indirect, incidental, or consequential damages. Our total liability is limited to the amount paid for the specific service giving rise to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium">iTrust Academy</p>
                <p className="text-muted-foreground">1 Raffles Place, Tower 2</p>
                <p className="text-muted-foreground">Singapore 048616</p>
                <p className="text-muted-foreground mt-2">Email: legal@itrustacademy.com</p>
              </div>
            </section>
          </div>
        </motion.div>
      </Container>
    </div>
  )
}
