import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { VendorCards } from "@/components/sections/VendorCards";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { FeaturedCourse } from "@/components/sections/FeaturedCourse";
import { TrainingSchedule } from "@/components/sections/TrainingSchedule";
import { ProfessionalServices } from "@/components/sections/ProfessionalServices";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <VendorCards />
        <FeaturesGrid />
        <FeaturedCourse />
        <TrainingSchedule />
        <ProfessionalServices />
      </main>
      <Footer />
    </div>
  );
}
