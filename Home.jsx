import Navbar from "../components/landing/Navbar";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import InteractiveDemo from "../components/landing/InteractiveDemo";
import SubjectsSection from "../components/landing/SubjectsSection";
import HowItWorks from "../components/landing/HowItWorks";
import TestimonialsSection from "../components/landing/TestimonialsSection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-nunito">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <InteractiveDemo />
        <SubjectsSection />
        <HowItWorks />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
