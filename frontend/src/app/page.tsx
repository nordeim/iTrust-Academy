import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { CourseCatalog } from "@/components/sections/CourseCatalog";
import { Features } from "@/components/sections/Features";
import { Testimonials } from "@/components/sections/Testimonials";
import { Partners } from "@/components/sections/Partners";
import { CTA } from "@/components/sections/CTA";

/**
 * iTrust Academy - Home Page
 * Single-page experience showcasing the complete value proposition
 */
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Fixed Header */}
      <Header />
      
      {/* Main Content */}
      <div className="flex-1">
        {/* Hero Section - Primary value proposition */}
        <Hero />
        
        {/* Stats - Trust signals */}
        <Stats />
        
        {/* Course Catalog - Featured courses */}
        <CourseCatalog />
        
        {/* Features - Value proposition */}
        <Features />
        
        {/* Testimonials - Social proof */}
        <Testimonials />
        
        {/* Partners - Credibility indicators */}
        <Partners />
        
        {/* CTA - Final conversion */}
        <CTA />
      </div>
      
      {/* Footer */}
      <Footer />
    </main>
  );
}
 
