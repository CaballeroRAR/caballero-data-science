import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import CurrentWorkSection from "@/components/CurrentWorkSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionTransition from "@/components/ui/SectionTransition";
import WelcomeScreen from "@/components/WelcomeScreen";

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  // Trigger content animations after welcome screen fades out
  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    // Faster handoff to hero animations
    setTimeout(() => setContentReady(true), 150);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <WelcomeScreen onComplete={handleWelcomeComplete} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showWelcome ? 0 : 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="min-h-screen bg-background text-foreground"
      >
        <Header />
        <main>
          <HeroSection animateContent={contentReady} />
          <SectionTransition>
            <AboutSection />
          </SectionTransition>
          <SectionTransition delay={0.1}>
            <ProjectsSection />
          </SectionTransition>
          <SectionTransition delay={0.1}>
            <CurrentWorkSection />
          </SectionTransition>
          <SectionTransition delay={0.1}>
            <SkillsSection />
          </SectionTransition>
          <SectionTransition delay={0.1}>
            <ContactSection />
          </SectionTransition>
        </main>
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
