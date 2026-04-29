import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Folder, Shield, User, Award, ExternalLink, X, Cpu, BadgeCheck, Phone } from "lucide-react";

import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import CurrentWorkSection from "@/components/CurrentWorkSection";
import SkillsSection from "@/components/SkillsSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  content: React.ReactNode;
  isLarge?: boolean;
}

export default function HackerDesktop() {
  const [windows, setWindows] = useState<WindowState[]>([
    {
      id: "about",
      title: "sys_dossier.sh",
      isOpen: false,
      isLarge: true,
      content: (
        <div className="font-mono text-sm text-primary p-6 space-y-4 h-full overflow-y-auto leading-relaxed select-text">
          <p className="text-secondary font-bold animate-blink">&gt; INITIALIZING DATA_SCIENTIST_PROFILE...</p>
          <p>
            Gabriel Caballero - Data Scientist & MLOps Architect specialized in scalable GCP intelligence systems. Expert in architecting FastAPI microservices and automated CI/CD/CT pipelines.
          </p>
          <div className="border-t border-primary/20 pt-4 grid grid-cols-2 gap-4 text-xs">
            <div>[STATUS]: AVAILABLE FOR WORK</div>
            <div>[LOCATION]: MEXICO</div>
          </div>
          <div className="pt-4">
            <AboutSection />
          </div>
        </div>
      ),
    },
    {
      id: "projects",
      title: "network_nodes.db",
      isOpen: false,
      content: (
        <div className="font-mono text-xs text-primary p-4 space-y-2 h-full overflow-y-auto select-text">
          <p className="text-secondary font-bold">&gt; ACCESSING CORE_SERVER_FILES...</p>
          <ProjectsSection />
        </div>
      ),
    },
    {
      id: "current_work",
      title: "live_inference.exe",
      isOpen: false,
      content: (
        <div className="font-mono text-xs text-primary p-4 space-y-2 h-full overflow-y-auto select-text">
          <CurrentWorkSection />
        </div>
      ),
    },
    {
      id: "skills",
      title: "matrix_skills.log",
      isOpen: false,
      content: (
        <div className="font-mono text-xs text-primary p-4 space-y-2 h-full overflow-y-auto select-text">
          <SkillsSection />
        </div>
      ),
    },
    {
      id: "certifications",
      title: "verified_credentials.pem",
      isOpen: false,
      content: (
        <div className="font-mono text-xs text-primary p-4 space-y-2 h-full overflow-y-auto select-text">
          <CertificationsSection />
        </div>
      ),
    },
    {
      id: "contact",
      title: "secure_uplink.bin",
      isOpen: false,
      content: (
        <div className="font-mono text-xs text-primary p-4 space-y-2 h-full overflow-y-auto select-text">
          <ContactSection />
        </div>
      ),
    },
  ]);

  const toggleWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, isOpen: !win.isOpen } : win))
    );
  };

  return (
    <div className="min-h-screen bg-black text-primary font-mono relative overflow-hidden cyber-scanlines flex flex-col select-none">
      {/* Desktop Grid Area - Centered Icons */}
      <div className="flex-1 p-8 flex flex-wrap items-center justify-center gap-12 max-w-5xl mx-auto">
        <button
          onClick={() => toggleWindow("about")}
          className="flex flex-col items-center gap-2 p-6 border border-transparent hover:border-primary/20 hover:bg-primary/5 group transition-all w-32"
        >
          <User className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-[10px] tracking-widest uppercase text-foreground">ABOUT.sh</span>
        </button>

        <button
          onClick={() => toggleWindow("projects")}
          className="flex flex-col items-center gap-2 p-6 border border-transparent hover:border-primary/20 hover:bg-primary/5 group transition-all w-32"
        >
          <Folder className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-[10px] tracking-widest uppercase text-foreground">PROJECTS</span>
        </button>

        <button
          onClick={() => toggleWindow("current_work")}
          className="flex flex-col items-center gap-2 p-6 border border-transparent hover:border-primary/20 hover:bg-primary/5 group transition-all w-32"
        >
          <Cpu className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-[10px] tracking-widest uppercase text-foreground">LIVE_INF</span>
        </button>

        <button
          onClick={() => toggleWindow("skills")}
          className="flex flex-col items-center gap-2 p-6 border border-transparent hover:border-primary/20 hover:bg-primary/5 group transition-all w-32"
        >
          <Terminal className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-[10px] tracking-widest uppercase text-foreground">SKILLS</span>
        </button>

        <button
          onClick={() => toggleWindow("certifications")}
          className="flex flex-col items-center gap-2 p-6 border border-transparent hover:border-primary/20 hover:bg-primary/5 group transition-all w-32"
        >
          <BadgeCheck className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-[10px] tracking-widest uppercase text-foreground">CERTS</span>
        </button>

        <button
          onClick={() => toggleWindow("contact")}
          className="flex flex-col items-center gap-2 p-6 border border-transparent hover:border-primary/20 hover:bg-primary/5 group transition-all w-32"
        >
          <Phone className="w-12 h-12 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-[10px] tracking-widest uppercase text-foreground">CONTACT</span>
        </button>
      </div>

      {/* OS Windows Rendering */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-4">
        <AnimatePresence>
          {windows.map(
            (win) =>
              win.isOpen && (
                <motion.div
                  key={win.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className={`w-full ${win.isLarge ? 'max-w-4xl h-[550px]' : 'max-w-2xl h-[450px]'} bg-black border border-primary p-1 pointer-events-auto shadow-2xl relative flex flex-col`}
                >
                  {/* Window Bar */}
                  <div className="flex items-center justify-between bg-primary text-black px-3 py-1 text-xs font-bold select-none">
                    <span>{win.title}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleWindow(win.id)}>
                        <X className="w-4 h-4 cursor-pointer hover:bg-black hover:text-primary p-0.5 transition-colors" />
                      </button>
                    </div>
                  </div>

                  {/* Window Content */}
                  <div className="bg-neutral-950 flex-1 border-t border-primary mt-1 overflow-hidden">
                    {win.content}
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* System Taskbar */}
      <div className="h-12 bg-neutral-900/90 border-t border-primary/30 flex items-center justify-between px-6 font-mono text-xs select-none">
        <div className="flex items-center gap-4">
          <span className="text-foreground font-bold flex items-center gap-2 select-none">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            AVAILABLE FOR WORK
          </span>
        </div>
        <span className="text-primary/40">GABRIEL_CABALLERO_WORKSTATION_V.2026</span>
      </div>
    </div>
  );
}
