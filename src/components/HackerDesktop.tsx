import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Folder, Shield, User, X } from "lucide-react";
import CVDownloadDialog from "./CVDownloadDialog";
import AnimatedGrid from "./AnimatedGrid";

// Modular Desktop Components
import DesktopWindow from "./desktop/DesktopWindow";
import TensorGraph from "./desktop/TensorGraph";
import ProjectExplorer from "./desktop/ProjectExplorer";
import LiveInference from "./desktop/LiveInference";
import ProfileStream from "./desktop/ProfileStream";
import BootScreen from "./desktop/BootScreen";

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isLarge?: boolean;
  zIndex?: number;
  position?: { x: number; y: number };
  content?: React.ReactNode;
}

declare global {
  interface Window {
    expandHackerImage?: (src: string) => void;
  }
}

function DecryptedText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

  useEffect(() => {
    const originalText = text;
    let iterations = 0;
    
    const decryptInterval = setInterval(() => {
      setDisplayText(prev => 
        prev.split("").map((char, index) => {
          if (index < iterations) return originalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );

      if (iterations >= originalText.length) {
        clearInterval(decryptInterval);
      }
      iterations += 1/5;
    }, 30);

    return () => clearInterval(decryptInterval);
  }, [text]);

  return <span className="text-white">{displayText}</span>;
}

function Typewriter({ text, delay = 0, speed = 15, onComplete }: { text: string; delay?: number; speed?: number; onComplete?: () => void }) {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(text.substring(0, i));
      i++;
      if (i > text.length) {
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [started, text, speed, onComplete]);

  return <span>{displayText}</span>;
}

function StaggeredReveal({ children, delay = 0, stagger = 0.1 }: { children: React.ReactNode; delay?: number; stagger?: number }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay / 1000,
            staggerChildren: stagger
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

function RevealItem({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 5 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {children}
    </motion.div>
  );
}

export default function HackerDesktop() {
  const [booting, setBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [expandedImg, setExpandedImg] = useState<string | null>(null);
  const [windows, setWindows] = useState<WindowState[]>([]);

  const handleExpandImage = (src: string) => setExpandedImg(src);

  useEffect(() => {
    window.expandHackerImage = handleExpandImage;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedImg(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    setWindows([
      {
        id: "about",
        title: "sys_dossier.sh",
        isOpen: true,
        isLarge: true,
        content: (
          <div className="font-mono text-sm text-foreground/80 p-4 space-y-3 h-full overflow-y-auto leading-relaxed select-text">
            <StaggeredReveal delay={100}>
              <RevealItem>
                <div className="border border-white/10 p-4 bg-white/[0.02] space-y-3">
                  <h3 className="text-white font-bold text-xl border-b border-white/10 pb-2 flex items-center gap-2 tracking-tight">
                    <span className="w-2 h-2 bg-highlight rounded-full animate-pulse" /> GABRIEL CABALLERO
                  </h3>
                  <p className="text-2xl font-bold leading-tight text-white tracking-tighter">
                    <DecryptedText text="Data Scientist | MLOps" /> <br />
                    <span className="text-lg text-white/50 font-medium">Based in Mexico</span>
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12 text-sm pt-3 text-white/70 border-t border-white/10 mt-3 font-mono">
                    <div className="flex items-center gap-3"><span className="text-white/50 min-w-[140px] uppercase tracking-tighter">[DS / MLOPS EXP]:</span> <span className="text-highlight font-bold">1+ YEARS</span></div>
                    <div className="flex items-center gap-3"><span className="text-white/50 min-w-[140px] uppercase tracking-tighter">[ARCHITECT EXP]:</span> <span className="text-highlight font-bold">8+ YEARS</span></div>
                    <div className="flex items-center gap-3"><span className="text-white/50 min-w-[140px] uppercase tracking-tighter">[AGE]:</span> <span className="text-white/90">29</span></div>
                    <div className="flex items-center gap-3"><span className="text-white/50 min-w-[140px] uppercase tracking-tighter">[NATIONALITY]:</span> <span className="text-white/90">MEXICAN</span></div>
                  </div>
                </div>
              </RevealItem>

              <RevealItem>
                <div className="space-y-3 text-[16px] text-white/80 leading-relaxed border border-white/10 p-4 bg-black/40 backdrop-blur-md mt-3">
                  <p>
                    <Typewriter 
                      text="From construction sites and budget meetings to cloud-native pipelines and production ML — I got into data the long way, and it shaped how I think. I build end-to-end data science solutions that go from messy raw data to insights that actually get used: customer segmentation, time series forecasting, NLP pipelines, and GCP-based ETL built on BigQuery ML and medallion architecture. My stack spans Python, SQL, scikit-learn, TensorFlow, Kedro, and Polars, structured for reproducibility and scale." 
                      delay={600}
                      speed={5}
                    />
                  </p>
                  <p>
                    <Typewriter 
                      text="I ask the right question first: does this problem need ML, or is a well-structured pipeline and a good SQL query enough? That diagnostic thinking shapes everything I build." 
                      delay={2400}
                      speed={5}
                    />
                  </p>
                  <p className="relative">
                    <Typewriter 
                      text="This portfolio embodies that drive. Web dev isn't my core skill, but every line here reflects hands-on learning and iteration — check the live evolution on GitHub"
                      delay={4000}
                      speed={5}
                      onComplete={() => {
                        const target = document.getElementById("github-link-placeholder");
                        if (target) target.style.opacity = "1";
                      }}
                    />
                    <a 
                      id="github-link-placeholder"
                      href="https://github.com/CaballeroRAR/caballero-data-science" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-highlight hover:text-highlight/80 underline decoration-highlight/30 underline-offset-4 transition-colors ml-1 opacity-0 pointer-events-auto relative z-[100]"
                    >
                      here
                    </a>.
                  </p>
                </div>
              </RevealItem>

              <RevealItem>
                <div className="pt-4 mt-4">
                  <span className="text-white/40 text-[11px] block mb-3 uppercase tracking-widest">[CORE_EXPERTISE]</span>
                  <div className="flex flex-wrap gap-2.5">
                    {["Python", "SQL", "Machine Learning", "Power BI", "Google Cloud", "TensorFlow", "ETL", "Data Pipelines", "Time Series", "Predictive Modeling", "Pandas", "Scikit-learn", "Business Intelligence"].map((tag) => (
                      <span key={tag} className="text-sm px-3.5 py-1.5 border border-white/20 bg-white/5 text-white/70 hover:bg-highlight/10 hover:border-highlight hover:text-highlight transition-all duration-200 cursor-default font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealItem>
            </StaggeredReveal>
          </div>
        ),
      },
      { id: "profile", title: "live_feed.cam", isOpen: true, content: <ProfileStream /> },
      { id: "projects", title: "network_nodes.db", isOpen: false, isLarge: true, content: <ProjectExplorer onExpandImage={handleExpandImage} /> },
      { id: "current_work", title: "live_inference.exe", isOpen: false, content: <LiveInference onExpandImage={handleExpandImage} /> },
      {
        id: "skills",
        title: "matrix_skills.log",
        isOpen: false,
        content: (
          <div className="font-mono text-sm text-foreground/80 p-6 space-y-4 h-full overflow-y-auto leading-relaxed select-text">
            <p className="text-highlight font-bold">&gt; PARSING CAPABILITIES...</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/70">
              <div className="border border-white/10 p-3 bg-black/40 hover:border-highlight/40 transition-all">
                <h5 className="text-white font-bold mb-3 border-b border-white/10 pb-1 flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-highlight" /> PROGRAMMING
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {["Python", "SQL"].map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 border border-white/20 bg-white/5 text-white/70 hover:bg-highlight/10 hover:border-highlight hover:text-highlight transition-all duration-200 cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 p-3 bg-black/40 hover:border-highlight/40 transition-all">
                <h5 className="text-white font-bold mb-3 border-b border-white/10 pb-1 flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-highlight" /> AI & ML
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {["Scikit-learn", "XGBoost", "ARIMA+", "TensorFlow", "PyTorch", "BigQuery ML", "GenAI", "NLP", "Clustering"].map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 border border-white/20 bg-white/5 text-white/70 hover:bg-highlight/10 hover:border-highlight hover:text-highlight transition-all duration-200 cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 p-3 bg-black/40 hover:border-highlight/40 transition-all">
                <h5 className="text-white font-bold mb-3 border-b border-white/10 pb-1 flex items-center gap-1">
                  <Folder className="w-3 h-3 text-highlight" /> DATA ANALYSIS
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {["Pandas", "Polars", "NumPy", "Matplotlib", "Seaborn", "Plotly", "Power BI", "Jupyter Notebook"].map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 border border-white/20 bg-white/5 text-white/70 hover:bg-highlight/10 hover:border-highlight hover:text-highlight transition-all duration-200 cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 p-3 bg-black/40 hover:border-highlight/40 transition-all">
                <h5 className="text-white font-bold mb-3 border-b border-white/10 pb-1 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-highlight" /> CLOUD & INFRA
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {["Google Cloud", "AWS", "Snowflake", "ETL/ELT Pipelines", "Web Scraping", "APIs"].map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 border border-white/20 bg-white/5 text-white/70 hover:bg-highlight/10 hover:border-highlight hover:text-highlight transition-all duration-200 cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 p-3 bg-black/40 hover:border-highlight/40 transition-all">
                <h5 className="text-white font-bold mb-3 border-b border-white/10 pb-1 flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-highlight" /> DEVELOPMENT
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {["FastAPI", "Docker", "Kedro", "Git", "GitHub"].map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 border border-white/20 bg-white/5 text-white/70 hover:bg-highlight/10 hover:border-highlight hover:text-highlight transition-all duration-200 cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 p-3 bg-black/40 hover:border-highlight/40 transition-all">
                <h5 className="text-white font-bold mb-3 border-b border-white/10 pb-1 flex items-center gap-1">
                  <User className="w-3 h-3 text-highlight" /> SOFT SKILLS
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {["Stakeholder Management", "Technical Leadership", "Agile Methodology", "Problem Solving", "Cross-functional Collaboration", "Innovation", "Proactivity", "Continuous Learning"].map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 border border-white/20 bg-white/5 text-white/70 hover:bg-highlight/10 hover:border-highlight hover:text-highlight transition-all duration-200 cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "certifications",
        title: "verified_credentials.pem",
        isOpen: false,
        content: (
          <div className="font-mono text-sm text-foreground/80 p-6 space-y-4 h-full overflow-y-auto leading-relaxed select-text">
            <p className="text-highlight font-bold">&gt; AUTHENTICATING DEGREES...</p>
            <div className="space-y-3">
              <div className="p-3 border border-white/10 bg-white/5 hover:border-highlight/40 transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                  <span className="font-bold text-white text-sm">Gestión de Proyectos y Fundamentos de metodología Agile</span>
                  <span className="text-[10px] text-highlight border border-highlight/30 px-2 py-0.5 bg-highlight/10">2026</span>
                </div>
                <span className="text-[10px] text-white/40 block mb-2 uppercase tracking-widest">[ISSUER: SANTANDER OPEN ACADEMY]</span>
                <p className="text-xs text-white/70 leading-relaxed mb-3">Fundamentos y masterclass. Fundamentos de la agilidad. Entender la agilidad a través de Scrum. Combinar Agile con design thinking y Lean Startup para generar innovación. Cuestiones éticas y responsabilidad en el diseño y desarrollo de productos. Objetivos de aprendizaje: Aprender los fundamentos de la gestión de proyectos por metodología Agile. Enfocar de manera práctica y con ejemplos los fundamentos de Scrum y entender qué es, qué no es, qué hacer y qué no hacer.</p>
                <div className="flex flex-wrap gap-1">
                  {["Agile", "Scrum", "Project Management", "Design Thinking", "Lean Startup"].map(s => (
                    <span key={s} className="text-[9px] px-1.5 py-0.5 border border-white/10 bg-black/40 text-white/50">{s}</span>
                  ))}
                </div>
              </div>

              <div className="p-3 border border-white/10 bg-white/5 hover:border-highlight/40 transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                  <span className="font-bold text-white text-sm">Power BI Intermediate: Data Analysis and Modeling</span>
                  <span className="text-[10px] text-highlight border border-highlight/30 px-2 py-0.5 bg-highlight/10">2026</span>
                </div>
                <span className="text-[10px] text-white/40 block mb-2 uppercase tracking-widest">[ISSUER: SANTANDER OPEN ACADEMY]</span>
                <p className="text-xs text-white/70 leading-relaxed mb-3">Build and publish optimized data models using DAX and Power BI Services, learning to create relationships, star schemas, measures and calculated columns, and to keep cloud reports updated to facilitate access and collaboration. Deepen the use of advanced visualizations to represent complex data using custom charts, time hierarchies, geographical maps, gauges, and dynamic interactions, thereby improving visual analysis capability. Master intermediate data transformation techniques with Power Query, including merging and appending queries, creating custom and conditional columns, as well as efficiently importing data from multiple sources and formats.</p>
                <div className="flex flex-wrap gap-1">
                  {["Power BI", "DAX", "Power Query", "Data Modeling", "Data Visualization"].map(s => (
                    <span key={s} className="text-[9px] px-1.5 py-0.5 border border-white/10 bg-black/40 text-white/50">{s}</span>
                  ))}
                </div>
              </div>

              <div className="p-3 border border-white/10 bg-white/5 hover:border-highlight/40 transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                  <span className="font-bold text-white text-sm">ETL Processing on Google Cloud Using Dataflow and BigQuery</span>
                  <span className="text-[10px] text-highlight border border-highlight/30 px-2 py-0.5 bg-highlight/10">2025</span>
                </div>
                <span className="text-[10px] text-white/40 block mb-2 uppercase tracking-widest">[ISSUER: GOOGLE CLOUD]</span>
                <p className="text-xs text-white/70 leading-relaxed mb-3">Built serverless data pipelines on Google Cloud Platform. Developed Python data pipelines to ingest, process, and load datasets into BigQuery using Dataflow.</p>
                <div className="flex flex-wrap gap-1">
                  {["Python", "GCP", "Dataflow", "BigQuery", "ETL"].map(s => (
                    <span key={s} className="text-[9px] px-1.5 py-0.5 border border-white/10 bg-black/40 text-white/50">{s}</span>
                  ))}
                </div>
              </div>

              <div className="p-3 border border-white/10 bg-white/5 hover:border-highlight/40 transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                  <span className="font-bold text-white text-sm">Data Science Methodology</span>
                  <span className="text-[10px] text-highlight border border-highlight/30 px-2 py-0.5 bg-highlight/10">2023</span>
                </div>
                <span className="text-[10px] text-white/40 block mb-2 uppercase tracking-widest">[ISSUER: IBM]</span>
                <p className="text-xs text-white/70 leading-relaxed mb-3">Mastered the CRISP-DM framework. Application of the end-to-end CRISP-DM methodology used to structure ML projects from business problem to deployment.</p>
                <div className="flex flex-wrap gap-1">
                  {["CRISP-DM", "Machine Learning", "Data Science Methodology", "Project Lifecycle"].map(s => (
                    <span key={s} className="text-[9px] px-1.5 py-0.5 border border-white/10 bg-black/40 text-white/50">{s}</span>
                  ))}
                </div>
              </div>

              <div className="p-3 border border-white/10 bg-white/5 hover:border-highlight/40 transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                  <span className="font-bold text-white text-sm">Construction Project Management</span>
                  <span className="text-[10px] text-highlight border border-highlight/30 px-2 py-0.5 bg-highlight/10">2022</span>
                </div>
                <span className="text-[10px] text-white/40 block mb-2 uppercase tracking-widest">[ISSUER: COLUMBIA UNIVERSITY]</span>
                <p className="text-xs text-white/70 leading-relaxed mb-3">Fundamentals of construction management, LEAN projects, and sustainability. Mastered management for construction industry, contract types, and project delivery methods.</p>
                <div className="flex flex-wrap gap-1">
                  {["LEAN", "Project Management", "Construction Analytics", "Budgeting"].map(s => (
                    <span key={s} className="text-[9px] px-1.5 py-0.5 border border-white/10 bg-black/40 text-white/50">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "contact",
        title: "secure_uplink.bin",
        isOpen: false,
        content: (
          <div className="font-mono text-base text-foreground/80 p-6 space-y-6 h-full overflow-y-auto leading-relaxed select-text">
            <StaggeredReveal delay={100}>
              <RevealItem>
                <p className="text-highlight font-bold text-lg">&gt; ESTABLISHING CHANNEL...</p>
              </RevealItem>
              
              <RevealItem>
                <div className="space-y-4">
                  <h2 className="text-2xl md:text-3xl text-white font-bold tracking-tight">
                    <Typewriter text="Let's Find Something Together" delay={400} speed={20} />
                  </h2>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    <Typewriter text="Whether you need regression modeling for process optimization, forecasting solutions for demand planning, or data-driven insights to support decision-making. I'd love to discuss how I can help." delay={1000} speed={10} />
                  </p>
                  <p className="text-white/40 text-xs md:text-sm italic font-mono">
                    <Typewriter text="// Open to consulting engagements, advisory roles, and select full-time opportunities." delay={2500} speed={10} />
                  </p>
                </div>
              </RevealItem>

              <RevealItem>
                <div className="space-y-4 text-sm mt-6 max-w-xl mx-auto">
                  <div className="border border-white/10 p-3 hover:bg-white/5 transition-colors flex items-center justify-between">
                    <span className="font-bold">EMAIL:</span>
                    <a href="mailto:caballero.data.scientist@gmail.com" className="text-highlight hover:underline text-xs md:text-sm">caballero.data.scientist@gmail.com</a>
                  </div>
                  <div className="border border-white/10 p-3 hover:bg-white/5 transition-colors flex items-center justify-between">
                    <span className="font-bold">LINKEDIN:</span>
                    <a href="https://linkedin.com/in/datacaballero" target="_blank" rel="noreferrer" className="text-highlight hover:underline text-xs md:text-sm">linkedin.com/in/datacaballero</a>
                  </div>
                  <div className="border border-white/10 p-3 hover:bg-white/5 transition-colors flex items-center justify-between">
                    <span className="font-bold">GITHUB:</span>
                    <a href="https://github.com/CaballeroRAR" target="_blank" rel="noreferrer" className="text-highlight hover:underline text-xs md:text-sm">github.com/CaballeroRAR</a>
                  </div>
                  <div className="border border-white/10 p-3 hover:bg-white/5 transition-colors flex items-center justify-between">
                    <span className="font-bold">KAGGLE:</span>
                    <a href="https://www.kaggle.com/datacaballero" target="_blank" rel="noreferrer" className="text-highlight hover:underline text-xs md:text-sm">kaggle.com/datacaballero</a>
                  </div>
                </div>
              </RevealItem>

              <RevealItem>
                <div className="flex justify-center">
                  <CVDownloadDialog />
                </div>
              </RevealItem>
            </StaggeredReveal>
          </div>
        ),
      },
    ]);

    const timer = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setBooting(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const toggleWindow = (id: string) => {
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map(w => w.zIndex || 0), 0);
      const openWindowsCount = prev.filter(w => w.isOpen).length;
      const cascadeOffset = 20;
      
      return prev.map((win) => {
        if (win.id === id) {
          const isOpening = !win.isOpen;
          return { 
            ...win, 
            isOpen: isOpening, 
            zIndex: isOpening ? maxZ + 1 : win.zIndex,
            position: isOpening && win.id !== "profile" && win.id !== "about" 
              ? { x: openWindowsCount * cascadeOffset, y: openWindowsCount * cascadeOffset }
              : win.position || { x: 0, y: 0 }
          };
        }
        return win;
      });
    });
  };

  const bringToFront = (id: string) => {
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map(w => w.zIndex || 0), 0);
      const win = prev.find(w => w.id === id);
      if (win && win.zIndex === maxZ) return prev;
      return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w);
    });
  };

  const openCount = windows.filter((w) => w.isOpen && w.id !== "profile").length;

  if (booting) {
    return <BootScreen progress={bootProgress} />;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-highlight font-mono relative overflow-hidden cyber-scanlines flex flex-col select-none">
      <AnimatedGrid />
      
      {/* Desktop Grid Area */}
      <div className="p-2 flex flex-wrap items-center justify-center gap-3 max-w-5xl mx-auto z-[100] relative bg-black/80 border-b border-primary/20 backdrop-blur-md w-full">
        <button
          onClick={() => {
            toggleWindow("about");
            setWindows(prev => prev.map(w => w.id === "profile" ? { ...w, isOpen: true } : w));
          }}
          className="px-4 py-2 border border-white/5 bg-white/5 hover:border-highlight/40 hover:bg-highlight/10 group transition-all flex items-center gap-2"
        >
          <span className="text-[10px] text-white/40 group-hover:text-highlight transition-colors">[01]</span>
          <span className="text-xs tracking-widest uppercase text-foreground group-hover:text-highlight">ABOUT.sh</span>
        </button>

        <button onClick={() => toggleWindow("projects")} className="px-4 py-2 border border-white/5 bg-white/5 hover:border-highlight/40 hover:bg-highlight/10 group transition-all flex items-center gap-2">
          <span className="text-[10px] text-white/40 group-hover:text-highlight transition-colors">[02]</span>
          <span className="text-xs tracking-widest uppercase text-foreground group-hover:text-highlight">PROJECTS.db</span>
        </button>

        <button onClick={() => toggleWindow("current_work")} className="px-4 py-2 border border-white/5 bg-white/5 hover:border-highlight/40 hover:bg-highlight/10 group transition-all flex items-center gap-2">
          <span className="text-[10px] text-white/40 group-hover:text-highlight transition-colors">[03]</span>
          <span className="text-xs tracking-widest uppercase text-foreground group-hover:text-highlight">LIVE_INF.exe</span>
        </button>

        <button onClick={() => toggleWindow("skills")} className="px-4 py-2 border border-white/5 bg-white/5 hover:border-highlight/40 hover:bg-highlight/10 group transition-all flex items-center gap-2">
          <span className="text-[10px] text-white/40 group-hover:text-highlight transition-colors">[04]</span>
          <span className="text-xs tracking-widest uppercase text-foreground group-hover:text-highlight">SKILLS.log</span>
        </button>

        <button onClick={() => toggleWindow("certifications")} className="px-4 py-2 border border-white/5 bg-white/5 hover:border-highlight/40 hover:bg-highlight/10 group transition-all flex items-center gap-2">
          <span className="text-[10px] text-white/40 group-hover:text-highlight transition-colors">[05]</span>
          <span className="text-xs tracking-widest uppercase text-foreground group-hover:text-highlight">CERTS.pem</span>
        </button>

        <button onClick={() => toggleWindow("contact")} className="px-4 py-2 border border-white/5 bg-white/5 hover:border-highlight/40 hover:bg-highlight/10 group transition-all flex items-center gap-2">
          <span className="text-[10px] text-white/40 group-hover:text-highlight transition-colors">[06]</span>
          <span className="text-xs tracking-widest uppercase text-foreground group-hover:text-highlight">CONTACT.bin</span>
        </button>
      </div>

      {/* Render Tensor Graph if all central windows are closed */}
      {openCount === 0 && <TensorGraph />}

      {/* OS Windows Rendering */}
      <div className="absolute bottom-16 left-0 right-0 top-20 pointer-events-none flex items-center justify-center p-4">
        <AnimatePresence>
          {windows.map((win) => win.isOpen && (
            <DesktopWindow
              key={win.id}
              id={win.id}
              title={win.title}
              isOpen={win.isOpen}
              isLarge={win.isLarge}
              zIndex={win.zIndex}
              position={win.position}
              onClose={() => toggleWindow(win.id)}
              onFocus={() => bringToFront(win.id)}
            >
              {win.content}
            </DesktopWindow>
          ))}
        </AnimatePresence>
      </div>

      {/* Expanded Image Modal Overlay */}
      <AnimatePresence>
        {expandedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[200] flex items-center justify-center p-6 select-none pointer-events-auto"
          >
            <div className="absolute top-4 right-6 flex items-center gap-4 font-mono text-xs z-50">
              <button 
                onClick={() => setExpandedImg(null)} 
                className="text-white hover:text-highlight border border-white/20 hover:border-highlight bg-black/60 px-3 py-1 flex items-center gap-1 transition-all"
              >
                <X className="w-4 h-4" /> CLOSE [ESC]
              </button>
            </div>
            <div className="relative max-w-5xl max-h-[85vh] overflow-hidden border border-white/10 bg-black/50 flex items-center justify-center">
              <img src={expandedImg} alt="Full Resolution Layout" className="max-w-full max-h-full object-contain" />
              <div className="absolute inset-0 pointer-events-none cyber-scanlines opacity-25" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* System Taskbar */}
      <div className="h-12 bg-neutral-900/90 border-t border-primary/30 flex items-center justify-between px-6 font-mono text-xs select-none mt-auto z-50">
        <div className="flex items-center gap-4">
          <span className="text-foreground font-bold flex items-center gap-2 select-none">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            AVAILABLE FOR WORK
          </span>
        </div>
        <span className="text-highlight/40">GABRIEL_CABALLERO_WORKSTATION_V.2026</span>
      </div>
    </div>
  );
}
