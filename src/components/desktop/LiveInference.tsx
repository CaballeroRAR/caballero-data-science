import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { liveInferenceImages, projectsData } from "@/data/desktop-data";
import { useLanguage } from "@/contexts/LanguageContext";

interface LiveInferenceProps {
  onExpandImage: (src: string) => void;
}

export default function LiveInference({ onExpandImage }: LiveInferenceProps) {
  const [liveImgIndex, setLiveImgIndex] = useState(0);
  const { language } = useLanguage();
  
  const btcProject = projectsData.find(p => p.id === 6);

  const nextLiveImg = () => setLiveImgIndex((prev) => (prev + 1) % liveInferenceImages.length);
  const prevLiveImg = () => setLiveImgIndex((prev) => (prev - 1 + liveInferenceImages.length) % liveInferenceImages.length);

  return (
    <div className="font-mono text-sm text-foreground/80 p-6 space-y-4 h-full overflow-y-auto leading-relaxed select-text">
      <p className="text-highlight font-bold">&gt; STREAMING LIVE_TELEMETRY...</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <div className="border border-white/10 bg-black overflow-hidden relative h-96 flex items-center justify-center">
            <img 
              src={liveInferenceImages[liveImgIndex]} 
              alt="Telemetry View" 
              className="max-w-full max-h-full object-contain opacity-90 cursor-pointer hover:opacity-100 transition-opacity"
              onClick={() => onExpandImage(liveInferenceImages[liveImgIndex])}
            />
            <div className="absolute inset-0 pointer-events-none cyber-scanlines opacity-25" />
            <button 
              onClick={prevLiveImg} 
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 border border-white/20 p-1 text-white hover:border-highlight hover:text-highlight transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextLiveImg} 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 border border-white/20 p-1 text-white hover:border-highlight hover:text-highlight transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <span className="text-[10px] text-white/40 block text-center uppercase tracking-wider">FIG. 0{liveImgIndex + 1} - {language === 'es' ? 'PROYECCIONES EN VIVO' : 'LIVE PROJECTIONS'}</span>
        </div>

        <div className="space-y-4">
          <div className="border border-white/20 p-4 bg-white/5 space-y-3">
            <h3 className="text-white font-bold text-lg border-b border-white/20 pb-2 flex items-center justify-between flex-wrap gap-2">
              <span>{btcProject?.title[language]}</span>
              <span className="text-xs text-green-400 border border-green-400/30 px-2 py-0.5 bg-green-400/10">{language === 'es' ? 'EN PROGRESO' : 'IN PROGRESS'}</span>
            </h3>
            <p className="text-xs text-white/40 uppercase tracking-widest">[NEURAL INTELLIGENCE & PRODUCTION MLOPS]</p>
            <p className="text-sm text-white/80 leading-relaxed pt-2">
              {btcProject?.description[language]}
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
                <span key={tag} className="text-xs px-2.5 py-1 border border-white/20 bg-white/5 text-white/70 hover:bg-highlight/10 hover:border-highlight hover:text-highlight transition-all duration-200 cursor-default">
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
