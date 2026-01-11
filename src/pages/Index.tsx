import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import IntroAnimation from "@/components/IntroAnimation";

const INTRO_SHOWN_KEY = "portfolio_intro_shown";

const Index = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [introComplete, setIntroComplete] = useState(true);

  useEffect(() => {
    // Check if intro was already shown in this session
    const wasShown = sessionStorage.getItem(INTRO_SHOWN_KEY);
    if (!wasShown) {
      setShowIntro(true);
      setIntroComplete(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    sessionStorage.setItem(INTRO_SHOWN_KEY, "true");
    // Small delay before hiding to allow for smooth transition
    setTimeout(() => setShowIntro(false), 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {showIntro && !introComplete && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
