import { useState } from "react"
import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ContactModal } from "@/components/modals/contact-modal"

export function CTA() {
  const [demoModalOpen, setDemoModalOpen] = useState(false)
  const [salesModalOpen, setSalesModalOpen] = useState(false)

  return (
    <section id="contact" className="py-20 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" />
      
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
          >
            Ready to Upskill Your IT Team?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg opacity-90 mb-10 leading-relaxed"
          >
            Join 500+ enterprises across Asia-Pacific who have elevated their workforce
            with iTrust Academy's expert-led, hands-on training programs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 group"
              onClick={() => setDemoModalOpen(true)}
            >
              Request Corporate Demo
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white"
              onClick={() => setSalesModalOpen(true)}
            >
              Contact Sales
            </Button>
          </motion.div>
        </div>
      </Container>

      <ContactModal
        type="demo"
        open={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
      <ContactModal
        type="sales"
        open={salesModalOpen}
        onClose={() => setSalesModalOpen(false)}
      />
    </section>
  )
}
