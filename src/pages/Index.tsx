import { motion } from "framer-motion";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import CurrentWorkSection from "@/components/CurrentWorkSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SectionTransition from "@/components/ui/SectionTransition";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen bg-background text-foreground"
    >
      <Header />
      <main>
        <HeroSection />
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
  );
};

export default Index;
