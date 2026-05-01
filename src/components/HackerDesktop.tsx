import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Folder, Shield, User, Award, ExternalLink, X, Cpu, BadgeCheck, Phone, ChevronLeft, ChevronRight, Play } from "lucide-react";
import CVDownloadDialog from "./CVDownloadDialog";
import DigitalRipple from "./DigitalRipple";

import profilePhoto from "@/assets/profile-photo.png";

// Project assets
import businessContextImg from "@/assets/img/business-context.png";
import conversionStatImg from "@/assets/img/conversion-stat.png";
import hyperparameterImg from "@/assets/img/abtesting.png";
import goldrecoveryEDAImg from "@/assets/img/gold-recovery-dataset.png";
import concentrationperStageImg from "@/assets/img/distribucion-concentraciones-stage.png";
import goldhyperparameterImg from "@/assets/img/ajuste-de-hiperparametros.png";
import salaryEDAImg from "@/assets/img/eda-salary-analysis.png";
import meanSalaryPerAge from "@/assets/img/mean-salary-per-age.png";
import distributionImg from "@/assets/img/distribution-of-assets.png";
import kmeansImg from "@/assets/img/cluster-with-elbow-method.png";
import cleaningDiagramImg from "@/assets/img/cleaning-pipeline-diagram.svg";
import clusterDistributionImg from "@/assets/img/cluster-distribution.png";
import clusterMeansImg from "@/assets/img/cluster_means_comparison.png";
import pcaComparisonImg from "@/assets/img/pca-comparison.png";
import btcDashboardImg from "@/assets/img/btc-dashboard.png";
import btcXAIImg from "@/assets/img/btc-xai.png";
import btcModelImg from "@/assets/img/btc-model.png";
import segmentDriftImg from "@/assets/img/segment-drift.png";

import btcHud1 from "@/assets/img/WORK_GALLERY_IMG/btc-hud-preview-1.png";
import btcHud2 from "@/assets/img/WORK_GALLERY_IMG/btc-hud-preview-2.png";
import btcHud3 from "@/assets/img/WORK_GALLERY_IMG/btc-hud-preview-3.png";
import btcHud4 from "@/assets/img/WORK_GALLERY_IMG/btc-hud-preview-4.png";

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  content: React.ReactNode;
  isLarge?: boolean;
}

interface GalleryItem {
  id: number;
  text: string;
  image: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  skills: string[];
  demoUrl?: string;
  githubUrl?: string;
  gallery: GalleryItem[];
}

declare global {
  interface Window {
    expandHackerImage?: (src: string) => void;
  }
}

const projectsData = [
  {
    id: 6,
    title: "Industrial Bitcoin Forecasting HUD",
    category: "Deep Learning & XAI",
    year: "2026",
    description: "High-precision Bitcoin price projection engine using a stacked LSTM architecture with Monte Carlo Dropout uncertainty estimation. Synthesizes multi-source data (VADER Sentiment, Google Trends, Macro-Ratios) into a grounded 30-day forecast trajectory.",
    skills: ["Python", "TensorFlow", "Keras", "GCP", "Streamlit", "XAI", "MLOps"],
    demoUrl: "https://btc-dashboard-213564252081.us-central1.run.app",
    githubUrl: "https://github.com/CaballeroRAR/btc-prediction",
    gallery: [
      { id: 1, text: "Real-time market analysis: Pulse Injection for reacting to intraday breakouts.", image: btcDashboardImg },
      { id: 2, text: "Explainable AI engine tracking signal provenance across Firestore collections.", image: btcXAIImg },
      { id: 3, text: "Monte Carlo Dropout simulation (50 iterations) used to quantify statistical uncertainty.", image: btcModelImg }
    ]
  },
  {
    id: 5,
    title: "ML Pipeline Migration to BigQuery",
    category: "Cloud Native ML",
    year: "2026",
    description: "End-to-end migration of a machine learning pipeline to Google Cloud Platform. Leverages BigQuery ML for scalable training and SQL-based feature engineering, transitioning from local processing to a cloud-native architecture.",
    skills: ["Google Cloud Platform", "BigQuery ML", "SQL", "ETL", "Python"],
    demoUrl: "https://prometheus-frontend-kc2uauqyrq-uc.a.run.app/",
    gallery: [
      { id: 1, text: "End-to-End GCP pipeline using BigQuery and Vertex AI.", image: cleaningDiagramImg },
      { id: 2, text: "Distribution analysis of RFM features within clusters.", image: pcaComparisonImg },
      { id: 3, text: "Analysis of cluster stability based on RFM tracking.", image: segmentDriftImg }
    ]
  },
  {
    id: 4,
    title: "Customer Segmentation (KMeans)",
    category: "Machine Learning (Unsupervised)",
    year: "2025",
    description: "End-to-end customer segmentation pipeline using RFM analysis and K-Means clustering to identify high-value wholesaler segments and optimize marketing strategies.",
    skills: ["Python", "Scikit-learn", "RFM Analysis", "K-Means", "PCA"],
    gallery: [
      { id: 1, text: "Modular cleaning pipeline ensuring data quality and reproducibility.", image: cleaningDiagramImg },
      { id: 2, text: "Analysis of segment sizes and volume distribution.", image: clusterDistributionImg },
      { id: 3, text: "Comparison of features across different customer segments.", image: clusterMeansImg }
    ]
  },
  {
    id: 3,
    title: "Employee Salary Analysis",
    category: "Statistical Analysis",
    year: "2025",
    description: "Exploratory analysis on compensation patterns to quantify impact of experience, education, and role on salary structures for HR strategy.",
    skills: ["EDA", "Data Visualization", "Statistical Analysis", "KMeans", "PCA"],
    gallery: [
      { id: 1, text: "First glance at the dataset structures.", image: salaryEDAImg },
      { id: 2, text: "Distribution of salaries per age, describing data skewness.", image: meanSalaryPerAge },
      { id: 3, text: "Employee distribution across departments and salary impact.", image: distributionImg }
    ]
  },
  {
    id: 2,
    title: "Gold Recovery Prediction",
    category: "Machine Learning",
    year: "2025",
    description: "End-to-end regression pipeline to predict gold recovery rates and optimize industrial flotation processes. Identifies optimal parameters for reagent concentration and particle size.",
    skills: ["Regression Modeling", "Feature Engineering", "Ensemble Methods", "Random Forest"],
    gallery: [
      { id: 1, text: "Cleaned multi-stage process data calculating metallurgical recovery rates.", image: goldrecoveryEDAImg },
      { id: 2, text: "Distribution of metals across different stages of the process.", image: concentrationperStageImg },
      { id: 3, text: "Finding optimal hyperparameters for LinearRegression.", image: goldhyperparameterImg }
    ]
  },
  {
    id: 1,
    title: "A/B Testing, UI Change",
    category: "Statistical Analysis",
    year: "2025",
    description: "Designed a hypothesis test with tailored alpha=0.10 for a low-risk UI experiment, prioritizing sensitivity over false positive risk. The test revealed a dramatic conversion increase from 19.9% to over 61%.",
    skills: ["Python", "Statsmodels", "Jupyter Notebook", "Statistical Testing"],
    gallery: [
      { id: 1, text: "Evaluating implementation risk variables against sensitive conversion rates.", image: businessContextImg },
      { id: 2, text: "Treatment metrics proving conversion metrics scaled to over 61%.", image: conversionStatImg },
      { id: 3, text: "Testing power simulations mapping baseline control segments.", image: hyperparameterImg }
    ]
  }
];

function TensorGraph() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([
    "INITIALIZING NEURAL_GROUNDING...",
    "NODE_X1: STANDBY",
    "NODE_X2: STANDBY",
    "NODE_X3: STANDBY"
  ]);

  useEffect(() => {
    const logPool = [
      "EXEC: FETCHING MACRO_RATIOS...",
      "EXEC: PARSING SENTIMENT_V...",
      "EXEC: LOADING HISTORICAL_P...",
      "COMPILING WEIGHTS [L1/L2/L3/L4]...",
      "WARN: DRIFT DETECTED - RE-GROUNDING",
      "SUCCESS: PREDICTION TRAJECTORY COMPILED",
      "METRIC: L2 LOSS -> 0.0421",
      "STATUS: LATENCY < 14MS",
      "CHECK: DATA INTEGRITY 100%",
    ];
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-7), `[${new Date().toLocaleTimeString()}] ${logPool[Math.floor(Math.random() * logPool.length)]}`]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nodeIds = ["X1", "X2", "X3", "H1", "H2", "H3", "H4", "Y1"];
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        setHoveredNode(nodeIds[Math.floor(Math.random() * nodeIds.length)]);
      } else {
        setHoveredNode(null);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const nodes = [
    { id: "X1", x: 40, y: 100, type: "input", label: "MACRO_RATIOS" },
    { id: "X2", x: 40, y: 180, type: "input", label: "SENTIMENT_V" },
    { id: "X3", x: 40, y: 260, type: "input", label: "HISTORICAL_P" },
    
    { id: "H1", x: 160, y: 70, type: "hidden", label: "LSTM_L1" },
    { id: "H2", x: 160, y: 140, type: "hidden", label: "LSTM_L2" },
    { id: "H3", x: 160, y: 210, type: "hidden", label: "LSTM_L3" },
    { id: "H4", x: 160, y: 280, type: "hidden", label: "LSTM_L4" },

    { id: "Y1", x: 280, y: 180, type: "output", label: "PRICE_FCST" },
  ];

  const links = [
    { from: "X1", to: "H1" },
    { from: "X1", to: "H2" },
    { from: "X2", to: "H2" },
    { from: "X2", to: "H3" },
    { from: "X3", to: "H3" },
    { from: "X3", to: "H4" },
    { from: "H1", to: "Y1" },
    { from: "H2", to: "Y1" },
    { from: "H3", to: "Y1" },
    { from: "H4", to: "Y1" },
  ];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto select-none z-0">
      {/* Selector Indicator */}
      <div className="mb-6 font-mono text-xs text-cyan-400 border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 animate-pulse flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
        [SYSTEM_READY] Select a section of the menu above
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Network Graph */}
        <div className="relative w-[340px] h-[350px] border border-white/10 bg-black/60 p-4 backdrop-blur-sm">
          <div className="text-[10px] text-white/40 font-mono mb-4 border-b border-white/10 pb-1 flex justify-between">
            <span>[SYSTEM_MODEL]: NEURAL_EXEC</span>
            <span className="text-cyan-400 animate-pulse">ACTIVE</span>
          </div>
          <svg className="w-full h-full" viewBox="0 0 320 350">
            {links.map((link, idx) => {
              const fromNode = nodes.find(n => n.id === link.from)!;
              const toNode = nodes.find(n => n.id === link.to)!;
              const isHovered = hoveredNode === link.from || hoveredNode === link.to;
              return (
                <motion.line
                  key={idx}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isHovered ? "#22d3ee" : "rgba(34,211,238,0.2)"}
                  strokeWidth={isHovered ? 2 : 1}
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: isHovered ? 1 : 2 }}
                />
              );
            })}

            {nodes.map((node) => (
              <g 
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer group"
              >
                <motion.circle 
                  r={node.type === "output" ? 10 : 6} 
                  fill="#000" 
                  stroke={hoveredNode === node.id ? "#22d3ee" : "rgba(255,255,255,0.3)"}
                  strokeWidth={2}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: Math.random() }}
                />
                <text
                  x={node.type === "output" ? 14 : node.type === "input" ? -10 : 0}
                  y={node.type === "hidden" ? -12 : 3}
                  textAnchor={node.type === "input" ? "end" : node.type === "hidden" ? "middle" : "start"}
                  className="text-[8px] font-mono fill-white/40 group-hover:fill-cyan-400 transition-colors pointer-events-none"
                >
                  {node.label}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Live Execution Logs */}
        <div className="w-[300px] h-[350px] border border-white/10 bg-black/60 p-4 font-mono text-[10px] text-white/60 flex flex-col justify-between backdrop-blur-sm">
          <div className="border-b border-white/10 pb-1 mb-2 text-white/40 flex justify-between uppercase">
            <span>[RUNTIME_FEED]</span>
            <span>OK</span>
          </div>
          <div className="flex-1 overflow-hidden space-y-1 text-left leading-relaxed">
            {logs.map((log, idx) => (
              <div key={idx} className={log.includes("WARN") ? "text-yellow-500 animate-pulse" : log.includes("SUCCESS") ? "text-green-400 font-bold" : "text-white/60"}>
                {log}
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-1 mt-2 text-[8px] text-white/30 text-right">
            SECURE ACCESS PROTOCOL v4.0
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveInferenceContent() {
  const liveImages = [btcHud1, btcHud2, btcHud3, btcHud4];
  const [liveImgIndex, setLiveImgIndex] = useState(0);

  const nextLiveImg = () => setLiveImgIndex((prev) => (prev + 1) % liveImages.length);
  const prevLiveImg = () => setLiveImgIndex((prev) => (prev - 1 + liveImages.length) % liveImages.length);

  return (
    <div className="font-mono text-sm text-foreground/80 p-6 space-y-4 h-full overflow-y-auto leading-relaxed select-text">
      <p className="text-cyan-400 font-bold">&gt; STREAMING LIVE_TELEMETRY...</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <div className="border border-white/10 bg-black overflow-hidden relative h-96 flex items-center justify-center">
            <img 
              src={liveImages[liveImgIndex]} 
              alt="Telemetry View" 
              className="max-w-full max-h-full object-contain opacity-90 cursor-pointer hover:opacity-100 transition-opacity"
              onClick={() => window.expandHackerImage?.(liveImages[liveImgIndex])}
            />
            <div className="absolute inset-0 pointer-events-none cyber-scanlines opacity-25" />
            <button 
              onClick={prevLiveImg} 
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 border border-white/20 p-1 text-white hover:border-cyan-400 hover:text-cyan-400 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextLiveImg} 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 border border-white/20 p-1 text-white hover:border-cyan-400 hover:text-cyan-400 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <span className="text-[10px] text-white/40 block text-center uppercase tracking-wider">FIG. 0{liveImgIndex + 1} - LIVE PROJECTIONS</span>
        </div>

        <div className="space-y-4">
          <div className="border border-white/20 p-4 bg-white/5 space-y-3">
            <h3 className="text-white font-bold text-lg border-b border-white/20 pb-2 flex items-center justify-between flex-wrap gap-2">
              <span>INDUSTRIAL BITCOIN FORECASTING HUD</span>
              <span className="text-xs text-green-400 border border-green-400/30 px-2 py-0.5 bg-green-400/10">IN PROGRESS</span>
            </h3>
            <p className="text-xs text-white/40 uppercase tracking-widest">[NEURAL INTELLIGENCE & PRODUCTION MLOPS]</p>
            <p className="text-sm text-white/80 leading-relaxed pt-2">
              A high-precision Bitcoin price projection engine built on a stacked LSTM architecture with Monte Carlo Dropout uncertainty estimation. Decoupled, three-tier serverless environment in GCP including Vertex AI, Cloud Run, and Firestore for real-time market grounding and drift calibration.
            </p>
          </div>

          <div className="bg-black/50 p-4 border border-white/10 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span>[PROCESS_ID]: 40e533be</span>
              <span className="text-green-400 font-bold">ONLINE</span>
            </div>
            <div className="flex items-center justify-between">
              <span>[CURRENT_PIPELINE]: BTC-PREDICTOR</span>
              <span className="text-white/60">GCP Core</span>
            </div>
            <div className="w-full bg-white/10 h-2 mt-4 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 bg-white/40 w-[85%]" />
            </div>
          </div>

          <div className="pt-2">
            <span className="text-white/40 text-[10px] block mb-2 uppercase tracking-widest">[STACK_MAPPED]</span>
            <div className="flex flex-wrap gap-1.5">
              {["Python", "TensorFlow", "GCP", "Vertex AI", "Cloud Run", "Firestore", "Streamlit", "MLOps"].map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 border border-white/20 bg-white/5 text-white/70 hover:bg-cyan-400/10 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200 cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileContent() {
  const [isPlaying, setIsPlaying] = useState(false);
  const YOUTUBE_EMBED_URL = "https://www.youtube.com/embed/IBwpqhPF5rs";

  return (
    <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden group">
      {!isPlaying ? (
        <>
          <div className="absolute inset-0 pointer-events-none bg-neutral-950/20 mix-blend-color-burn z-10" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_20%,rgba(0,0,0,0.8)_80%)] z-20" />
          <div className="absolute inset-0 pointer-events-none cyber-scanlines z-30 opacity-80" />
          <img
            src={profilePhoto}
            alt="Workspace stream"
            className="w-full h-full object-cover grayscale-[40%] contrast-125 opacity-70 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 z-40">
            <button 
              onClick={() => setIsPlaying(true)}
              className="w-16 h-16 bg-cyan-400/20 border border-cyan-400/40 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-cyan-400/40 hover:scale-110 transition-all duration-300 group/play"
            >
              <Play className="w-8 h-8 text-cyan-400 fill-cyan-400/20 group-hover/play:fill-cyan-400 transition-all" />
            </button>
            <span className="mt-4 font-mono text-[10px] text-cyan-400 tracking-[0.2em] uppercase animate-pulse">Initialize_Stream.exe</span>
          </div>
          <div className="absolute top-3 left-3 text-[10px] font-mono text-white/70 bg-black/70 px-2 py-0.5 border border-white/10 z-40 flex items-center gap-1.5">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> LIVE_FEED
          </div>
        </>
      ) : (
        <div className="w-full h-full relative z-50">
          <iframe
            src={`${YOUTUBE_EMBED_URL}?autoplay=1`}
            title="Old Webpage Video"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <button 
            onClick={() => setIsPlaying(false)}
            className="absolute top-3 right-3 z-[60] bg-black/60 border border-white/20 p-1.5 text-white hover:border-red-500 hover:text-red-500 transition-colors backdrop-blur-md"
            title="Stop Stream"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function HackerDesktop() {
  const [booting, setBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [expandedImg, setExpandedImg] = useState<string | null>(null);

  const [windows, setWindows] = useState<WindowState[]>([]);

  useEffect(() => {
    window.expandHackerImage = (src: string) => {
      setExpandedImg(src);
    };

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpandedImg(null);
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  useEffect(() => {
    setWindows([
      {
        id: "about",
        title: "sys_dossier.sh",
        isOpen: true,
        isLarge: true,
        content: (
          <div className="font-mono text-sm text-foreground/80 p-6 space-y-4 h-full overflow-y-auto leading-relaxed select-text">
            <p className="text-cyan-400 font-bold tracking-widest text-[10px] uppercase">&gt; INITIALIZING DATA_SCIENTIST_PROFILE...</p>
            <div className="border border-white/10 p-6 bg-white/[0.02] space-y-4">
              <h3 className="text-white font-bold text-xl border-b border-white/10 pb-3 flex items-center gap-2 tracking-tight">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" /> GABRIEL CABALLERO
              </h3>
              <p className="text-3xl font-bold leading-tight text-white tracking-tighter">
                Data Scientist <br />
                <span className="text-xl text-white/50 font-medium">Based in Mexico</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-xs pt-4 text-white/70 border-t border-white/10 mt-4 font-mono">
                <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-white/30">[ARCHITECT EXP]:</span> <span className="text-white/90">8+ YEARS</span></div>
                <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-white/30">[DS / MLOPS EXP]:</span> <span className="text-white/90">1+ YEARS</span></div>
                <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-white/30">[AGE]:</span> <span className="text-white/90">29</span></div>
                <div className="flex justify-between border-b border-white/5 pb-1"><span className="text-white/30">[NATIONALITY]:</span> <span className="text-white/90">MEXICAN</span></div>
              </div>
            </div>

            <div className="space-y-6 text-[15px] text-white/80 leading-relaxed border border-white/10 p-6 bg-black/40 backdrop-blur-md">
              <p>
                Transforming raw data into strategic value through predictive modeling, time series analysis, and Google Cloud ETL pipelines. I utilize a robust stack including Python (Pandas, NumPy, Scikit-learn, Statsmodels, TensorFlow), SQL, and Power BI to build scalable analytics and machine learning solutions.
              </p>
              <p>
                Known for combining analytical rigor with clear communication, I autonomously navigate complex challenges in hybrid settings. My work is driven by a passion for innovation and continuous learning.
              </p>
              <p>
                This portfolio embodies that drive. Web dev isn't my core skill, but every line here reflects hands-on learning and iteration—check the live evolution on GitHub <a href="https://github.com/CaballeroRAR/caballero-data-science" target="_blank" rel="noreferrer" className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/30 underline-offset-4 transition-colors">here</a>.
              </p>
            </div>

            <div className="pt-2">
              <span className="text-white/40 text-xs block mb-2 uppercase tracking-widest">[CORE_EXPERTISE]</span>
              <div className="flex flex-wrap gap-2">
                {["Python", "SQL", "Machine Learning", "Power BI", "Google Cloud", "TensorFlow", "ETL", "Data Pipelines", "Time Series", "Predictive Modeling", "Pandas", "Scikit-learn", "Business Intelligence"].map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 border border-white/20 bg-white/5 text-white/70 hover:bg-cyan-400/10 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200 cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "profile",
        title: "live_feed.cam",
        isOpen: true,
        content: <ProfileContent />,
      },
      {
        id: "projects",
        title: "network_nodes.db",
        isOpen: false,
        isLarge: true,
        content: null
      },
      {
        id: "current_work",
        title: "live_inference.exe",
        isOpen: false,
        content: <LiveInferenceContent />
      },
      {
        id: "skills",
        title: "matrix_skills.log",
        isOpen: false,
        content: (
          <div className="font-mono text-sm text-foreground/80 p-6 space-y-4 h-full overflow-y-auto leading-relaxed select-text">
            <p className="text-cyan-400 font-bold">&gt; PARSING CAPABILITIES...</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-white/70">
              <div className="border border-white/10 p-3 bg-black/40 hover:border-cyan-400/40 transition-all">
                <h5 className="text-white font-bold mb-3 border-b border-white/10 pb-1 flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-cyan-400" /> PROGRAMMING
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {["Python", "SQL"].map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 border border-white/20 bg-white/5 text-white/70 hover:bg-cyan-400/10 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200 cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 p-3 bg-black/40 hover:border-cyan-400/40 transition-all">
                <h5 className="text-white font-bold mb-3 border-b border-white/10 pb-1 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-cyan-400" /> AI & ML
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {["Scikit-learn", "XGBoost", "ARIMA+", "TensorFlow", "PyTorch", "BigQuery ML", "GenAI", "NLP", "Clustering"].map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 border border-white/20 bg-white/5 text-white/70 hover:bg-cyan-400/10 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200 cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 p-3 bg-black/40 hover:border-cyan-400/40 transition-all">
                <h5 className="text-white font-bold mb-3 border-b border-white/10 pb-1 flex items-center gap-1">
                  <Folder className="w-3 h-3 text-cyan-400" /> DATA ANALYSIS
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {["Pandas", "Polars", "NumPy", "Matplotlib", "Seaborn", "Plotly", "Power BI", "Jupyter Notebook"].map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 border border-white/20 bg-white/5 text-white/70 hover:bg-cyan-400/10 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200 cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 p-3 bg-black/40 hover:border-cyan-400/40 transition-all">
                <h5 className="text-white font-bold mb-3 border-b border-white/10 pb-1 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-cyan-400" /> CLOUD & INFRA
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {["Google Cloud", "AWS", "Snowflake", "ETL/ELT Pipelines", "Web Scraping", "APIs"].map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 border border-white/20 bg-white/5 text-white/70 hover:bg-cyan-400/10 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200 cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 p-3 bg-black/40 hover:border-cyan-400/40 transition-all">
                <h5 className="text-white font-bold mb-3 border-b border-white/10 pb-1 flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-cyan-400" /> DEVELOPMENT
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {["FastAPI", "Docker", "Kedro", "Git", "GitHub"].map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 border border-white/20 bg-white/5 text-white/70 hover:bg-cyan-400/10 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200 cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border border-white/10 p-3 bg-black/40 hover:border-cyan-400/40 transition-all">
                <h5 className="text-white font-bold mb-3 border-b border-white/10 pb-1 flex items-center gap-1">
                  <User className="w-3 h-3 text-cyan-400" /> SOFT SKILLS
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {["Stakeholder Management", "Technical Leadership", "Agile Methodology", "Problem Solving", "Cross-functional Collaboration", "Innovation", "Proactivity", "Continuous Learning"].map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 border border-white/20 bg-white/5 text-white/70 hover:bg-cyan-400/10 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200 cursor-default">
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
            <p className="text-cyan-400 font-bold">&gt; AUTHENTICATING DEGREES...</p>
            <div className="space-y-3">
              <div className="p-3 border border-white/10 bg-white/5 hover:border-cyan-400/40 transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                  <span className="font-bold text-white text-sm">ETL Processing on Google Cloud Using Dataflow and BigQuery</span>
                  <span className="text-[10px] text-cyan-400 border border-cyan-400/30 px-2 py-0.5 bg-cyan-400/10">2025</span>
                </div>
                <span className="text-[10px] text-white/40 block mb-2 uppercase tracking-widest">[ISSUER: GOOGLE CLOUD]</span>
                <p className="text-xs text-white/70 leading-relaxed mb-3">Built serverless data pipelines on Google Cloud Platform. Developed Python data pipelines to ingest, process, and load datasets into BigQuery using Dataflow.</p>
                <div className="flex flex-wrap gap-1">
                  {["Python", "GCP", "Dataflow", "BigQuery", "ETL"].map(s => (
                    <span key={s} className="text-[9px] px-1.5 py-0.5 border border-white/10 bg-black/40 text-white/50">{s}</span>
                  ))}
                </div>
              </div>

              <div className="p-3 border border-white/10 bg-white/5 hover:border-cyan-400/40 transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                  <span className="font-bold text-white text-sm">Data Science Methodology</span>
                  <span className="text-[10px] text-cyan-400 border border-cyan-400/30 px-2 py-0.5 bg-cyan-400/10">2023</span>
                </div>
                <span className="text-[10px] text-white/40 block mb-2 uppercase tracking-widest">[ISSUER: IBM]</span>
                <p className="text-xs text-white/70 leading-relaxed mb-3">Mastered the CRISP-DM framework. Application of the end-to-end CRISP-DM methodology used to structure ML projects from business problem to deployment.</p>
                <div className="flex flex-wrap gap-1">
                  {["CRISP-DM", "Machine Learning", "Data Science Methodology", "Project Lifecycle"].map(s => (
                    <span key={s} className="text-[9px] px-1.5 py-0.5 border border-white/10 bg-black/40 text-white/50">{s}</span>
                  ))}
                </div>
              </div>

              <div className="p-3 border border-white/10 bg-white/5 hover:border-cyan-400/40 transition-all">
                <div className="flex justify-between items-start flex-wrap gap-2 mb-1">
                  <span className="font-bold text-white text-sm">Construction Project Management</span>
                  <span className="text-[10px] text-cyan-400 border border-cyan-400/30 px-2 py-0.5 bg-cyan-400/10">2022</span>
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
            <p className="text-cyan-400 font-bold text-lg">&gt; ESTABLISHING CHANNEL...</p>
            
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl text-white font-bold tracking-tight">Let's Find Something Together</h2>
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                Whether you need regression modeling for process optimization, forecasting solutions for demand planning, or data-driven insights to support decision-making. I'd love to discuss how I can help.
              </p>
              <p className="text-white/40 text-xs md:text-sm italic font-mono">
                // Open to consulting engagements, advisory roles, and select full-time opportunities.
              </p>
            </div>

            <div className="space-y-4 text-sm mt-6 max-w-xl mx-auto">
              <div className="border border-white/10 p-3 hover:bg-white/5 transition-colors flex items-center justify-between">
                <span className="font-bold">EMAIL:</span>
                <a href="mailto:caballero.data.scientist@gmail.com" className="text-cyan-400 hover:underline text-xs md:text-sm">caballero.data.scientist@gmail.com</a>
              </div>
              <div className="border border-white/10 p-3 hover:bg-white/5 transition-colors flex items-center justify-between">
                <span className="font-bold">LINKEDIN:</span>
                <a href="https://linkedin.com/in/datacaballero" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline text-xs md:text-sm">linkedin.com/in/datacaballero</a>
              </div>
              <div className="border border-white/10 p-3 hover:bg-white/5 transition-colors flex items-center justify-between">
                <span className="font-bold">GITHUB:</span>
                <a href="https://github.com/CaballeroRAR" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline text-xs md:text-sm">github.com/CaballeroRAR</a>
              </div>
              <div className="border border-white/10 p-3 hover:bg-white/5 transition-colors flex items-center justify-between">
                <span className="font-bold">KAGGLE:</span>
                <a href="https://www.kaggle.com/datacaballero" target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline text-xs md:text-sm">kaggle.com/datacaballero</a>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex justify-center">
              <CVDownloadDialog />
            </div>
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
    setWindows((prev) =>
      prev.map((win) => (win.id === id ? { ...win, isOpen: !win.isOpen } : win))
    );
  };

  const openCount = windows.filter((w) => w.isOpen && w.id !== "profile").length;

  const nextImage = () => {
    if (!selectedProject) return;
    setCurrentImgIndex((prev) => (prev + 1) % selectedProject.gallery.length);
  };

  const prevImage = () => {
    if (!selectedProject) return;
    setCurrentImgIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
  };

  if (booting) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-white p-6 cyber-scanlines">
        <div className="w-full max-w-md space-y-4">
          <div className="space-y-1 text-xs">
            <p className="text-white/40">GABRIEL_CABALLERO OS V.2026</p>
            <p className="text-white/40">INITIALIZING SECURE PROTOCOLS...</p>
            <p className="text-white animate-pulse">&gt; DECRYPTING CORE INFRASTRUCTURE</p>
          </div>
          <div className="w-full h-1 bg-white/10 relative">
            <div 
              className="absolute left-0 top-0 bottom-0 bg-white transition-all duration-200"
              style={{ width: `${bootProgress}%` }}
            />
          </div>
          <span className="text-[10px] text-white/40 block text-right">{bootProgress}%</span>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-black text-primary font-mono relative overflow-hidden cyber-scanlines flex flex-col select-none">
      <DigitalRipple />
      {/* Desktop Grid Area */}
      <div className="p-4 flex flex-wrap items-center justify-center gap-6 max-w-5xl mx-auto z-50 relative bg-black/60 border border-white/5 backdrop-blur-sm mt-4">
        <button
          onClick={() => {
            toggleWindow("about");
            setWindows(prev => prev.map(w => w.id === "profile" ? { ...w, isOpen: true } : w));
          }}
          className="flex flex-col items-center gap-1 p-2 border border-white/10 bg-black/40 hover:border-cyan-400/40 hover:bg-cyan-400/10 group transition-all w-24"
        >
          <pre className="text-xs leading-[1.1] font-mono text-white group-hover:text-cyan-400 h-8 flex items-center justify-center">
{` [O] 
/---\\`}
          </pre>
          <span className="text-xs tracking-widest uppercase text-foreground">ABOUT.sh</span>
        </button>

        <button
          onClick={() => toggleWindow("projects")}
          className="flex flex-col items-center gap-1 p-2 border border-white/10 bg-black/40 hover:border-cyan-400/40 hover:bg-cyan-400/10 group transition-all w-24"
        >
          <pre className="text-xs leading-[1.1] font-mono text-white group-hover:text-cyan-400 h-8 flex items-center justify-center">
{`/---/
|___|`}
          </pre>
          <span className="text-xs tracking-widest uppercase text-foreground">PROJECTS</span>
        </button>

        <button
          onClick={() => toggleWindow("current_work")}
          className="flex flex-col items-center gap-1 p-2 border border-white/10 bg-black/40 hover:border-cyan-400/40 hover:bg-cyan-400/10 group transition-all w-24"
        >
          <pre className="text-xs leading-[1.1] font-mono text-white group-hover:text-cyan-400 h-8 flex items-center justify-center">
{` -+- 
-+-+-
 -+- `}
          </pre>
          <span className="text-xs tracking-widest uppercase text-foreground">LIVE_INF</span>
        </button>

        <button
          onClick={() => toggleWindow("skills")}
          className="flex flex-col items-center gap-1 p-2 border border-white/10 bg-black/40 hover:border-cyan-400/40 hover:bg-cyan-400/10 group transition-all w-24"
        >
          <pre className="text-xs leading-[1.1] font-mono text-white group-hover:text-cyan-400 h-8 flex items-center justify-center">
{`  >_ 
[___]`}
          </pre>
          <span className="text-xs tracking-widest uppercase text-foreground">SKILLS</span>
        </button>

        <button
          onClick={() => toggleWindow("certifications")}
          className="flex flex-col items-center gap-1 p-2 border border-white/10 bg-black/40 hover:border-cyan-400/40 hover:bg-cyan-400/10 group transition-all w-24"
        >
          <pre className="text-xs leading-[1.1] font-mono text-white group-hover:text-cyan-400 h-8 flex items-center justify-center">
{` [*] 
/___\\`}
          </pre>
          <span className="text-xs tracking-widest uppercase text-foreground">CERTS</span>
        </button>

        <button
          onClick={() => toggleWindow("contact")}
          className="flex flex-col items-center gap-1 p-2 border border-white/10 bg-black/40 hover:border-cyan-400/40 hover:bg-cyan-400/10 group transition-all w-24"
        >
          <pre className="text-xs leading-[1.1] font-mono text-white group-hover:text-cyan-400 h-8 flex items-center justify-center">
{` (o) 
~---~`}
          </pre>
          <span className="text-xs tracking-widest uppercase text-foreground">CONTACT</span>
        </button>
      </div>

      {/* Render Tensor Graph if all central windows are closed */}
      {openCount === 0 && <TensorGraph />}

      {/* OS Windows Rendering */}
      <div className={`absolute bottom-20 left-0 right-0 top-24 pointer-events-none flex p-4 ${openCount >= 2 ? "flex-row items-center justify-center gap-6 max-w-[95vw] mx-auto" : "items-center justify-center"}`}>
        <AnimatePresence>
          {windows.map(
            (win) =>
              win.isOpen && (
                <motion.div
                  key={win.id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className={`bg-black border border-primary p-1 pointer-events-auto shadow-2xl relative flex flex-col ${
                    openCount >= 2 
                      ? "flex-1 h-[65vh] max-w-none" 
                      : win.id === "profile"
                        ? "w-96 h-[512px] absolute bottom-10 right-10"
                        : win.isLarge 
                          ? "w-full max-w-[85vw] h-[70vh]" 
                          : "w-full max-w-[70vw] h-[60vh]"
                  }`}
                >
                  <div className="flex items-center justify-between bg-primary text-black px-3 py-1 text-xs font-bold select-none">
                    <span>{win.title}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleWindow(win.id)}>
                        <X className="w-4 h-4 cursor-pointer hover:bg-black hover:text-primary p-0.5 transition-colors" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-neutral-950 flex-1 border-t border-primary mt-1 overflow-y-auto">
                    {win.id === "projects" ? (
                      <div className="font-mono text-sm text-foreground/80 p-6 space-y-4 h-full select-text relative">
                        {selectedProject ? (
                          <div className="space-y-4 h-full flex flex-col">
                            <button onClick={() => { setSelectedProject(null); setCurrentImgIndex(0); }} className="text-xs text-cyan-400 hover:underline mb-2 flex items-center gap-1 flex-shrink-0">
                              &lt; BACK_TO_LIST
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-y-auto">
                              <div className="flex flex-col gap-2">
                                <div className="border border-white/10 bg-black overflow-hidden relative h-96 flex items-center justify-center">
                                  <img 
                                    src={selectedProject.gallery[currentImgIndex].image} 
                                    alt="Project View" 
                                    className="max-w-full max-h-full object-contain opacity-90 cursor-pointer hover:opacity-100 transition-opacity" 
                                    onClick={() => setExpandedImg(selectedProject.gallery[currentImgIndex].image)}
                                  />
                                  <div className="absolute inset-0 pointer-events-none cyber-scanlines opacity-25" />
                                  <button 
                                    onClick={prevImage} 
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 border border-white/20 p-1 text-white hover:border-cyan-400 hover:text-cyan-400 transition-colors"
                                  >
                                    <ChevronLeft className="w-5 h-5" />
                                  </button>
                                  <button 
                                    onClick={nextImage} 
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 border border-white/20 p-1 text-white hover:border-cyan-400 hover:text-cyan-400 transition-colors"
                                  >
                                    <ChevronRight className="w-5 h-5" />
                                  </button>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-4 text-base text-white/80 leading-relaxed italic">
                                  {selectedProject.gallery[currentImgIndex].text}
                                </div>
                              </div>

                              <div className="space-y-6 flex flex-col justify-between">
                                <div className="space-y-4">
                                  <span className="text-sm text-cyan-400 tracking-wider border border-cyan-400/30 px-2 py-0.5">{selectedProject.category}</span>
                                  <h3 className="text-white font-bold text-2xl">{selectedProject.title} ({selectedProject.year})</h3>
                                  <p className="text-base text-white/80 leading-relaxed">{selectedProject.description}</p>
                                  {(selectedProject.demoUrl || selectedProject.githubUrl) && (
                                    <div className="flex flex-wrap gap-4 pt-2">
                                      {selectedProject.demoUrl && (
                                        <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs bg-cyan-400/10 border border-cyan-400/40 text-cyan-400 px-3 py-1.5 hover:bg-cyan-400/20 transition-colors">
                                          <ExternalLink className="w-3.5 h-3.5" /> LIVE DEMO
                                        </a>
                                      )}
                                      {selectedProject.githubUrl && (
                                        <a href={selectedProject.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs bg-white/5 border border-white/20 text-white px-3 py-1.5 hover:bg-white/10 transition-colors">
                                          <Folder className="w-3.5 h-3.5" /> GITHUB REPO
                                        </a>
                                      )}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <span className="text-white/40 text-xs block mb-2 uppercase tracking-wider">[SKILLS MAPPED]</span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {selectedProject.skills.map((s: string) => (
                                      <span key={s} className="text-xs px-2.5 py-1 border border-white/20 bg-white/5 text-white/70 hover:bg-cyan-400/10 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-200 cursor-default">
                                        {s}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-cyan-400 font-bold mb-4">&gt; ACCESSING ENCRYPTED_WORK_FILES...</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {projectsData.map((proj) => (
                                <div 
                                  key={proj.id} 
                                  onClick={() => setSelectedProject(proj)}
                                  className="border border-white/20 p-2 bg-white/5 hover:bg-cyan-400/5 hover:border-cyan-400 transition-colors flex flex-col gap-2 cursor-pointer group"
                                >
                                  <div className="w-full h-32 overflow-hidden border border-white/10 bg-black relative">
                                    <img src={proj.gallery[0].image} alt={proj.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                                  </div>
                                  <div>
                                    <div className="flex justify-between text-[9px] text-white/40 mb-1">
                                      <span>PROJECT_0{proj.id}</span>
                                      <span>{proj.year}</span>
                                    </div>
                                    <h4 className="text-white font-bold text-xs truncate group-hover:text-cyan-400">{proj.title}</h4>
                                    <p className="text-[10px] text-white/60 mt-1 line-clamp-2">{proj.description}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      win.content
                    )}
                  </div>
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>

      {/* Expanded Image Modal Overlay */}
      <AnimatePresence>
        {expandedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-6 select-none pointer-events-auto"
          >
            <div className="absolute top-4 right-6 flex items-center gap-4 font-mono text-xs z-50">
              <button 
                onClick={() => setExpandedImg(null)} 
                className="text-white hover:text-cyan-400 border border-white/20 hover:border-cyan-400 bg-black/60 px-3 py-1 flex items-center gap-1 transition-all"
              >
                <X className="w-4 h-4" /> CLOSE [ESC]
              </button>
            </div>
            <div className="relative max-w-5xl max-h-[85vh] overflow-hidden border border-white/10 bg-black/50 flex items-center justify-center">
              <img 
                src={expandedImg} 
                alt="Full Resolution Layout" 
                className="max-w-full max-h-full object-contain" 
              />
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
        <span className="text-primary/40">GABRIEL_CABALLERO_WORKSTATION_V.2026</span>
      </div>
    </div>
  );
}
