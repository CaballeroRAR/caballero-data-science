import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Folder } from "lucide-react";
import { projectsData, Project } from "@/data/desktop-data";

interface ProjectExplorerProps {
  onExpandImage: (src: string) => void;
}

export default function ProjectExplorer({ onExpandImage }: ProjectExplorerProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const nextImage = () => {
    if (!selectedProject) return;
    setCurrentImgIndex((prev) => (prev + 1) % selectedProject.gallery.length);
  };

  const prevImage = () => {
    if (!selectedProject) return;
    setCurrentImgIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
  };

  if (selectedProject) {
    return (
      <div className="font-mono text-sm text-foreground/80 p-6 space-y-4 h-full flex flex-col select-text relative">
        <button 
          onClick={() => { setSelectedProject(null); setCurrentImgIndex(0); }} 
          className="text-xs text-highlight hover:underline mb-2 flex items-center gap-1 flex-shrink-0"
        >
          &lt; BACK_TO_LIST
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-2">
            <div className="border border-white/10 bg-black overflow-hidden relative h-96 flex items-center justify-center">
              <img 
                src={selectedProject.gallery[currentImgIndex].image} 
                alt="Project View" 
                className="max-w-full max-h-full object-contain opacity-90 cursor-pointer hover:opacity-100 transition-opacity" 
                onClick={() => onExpandImage(selectedProject.gallery[currentImgIndex].image)}
              />
              <div className="absolute inset-0 pointer-events-none cyber-scanlines opacity-25" />
              <button 
                onClick={prevImage} 
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 border border-white/20 p-1 text-white hover:border-highlight hover:text-highlight transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextImage} 
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 border border-white/20 p-1 text-white hover:border-highlight hover:text-highlight transition-colors"
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
              <span className="text-sm text-highlight tracking-wider border border-highlight/30 px-2 py-0.5">{selectedProject.category}</span>
              <h3 className="text-white font-bold text-2xl">{selectedProject.title} ({selectedProject.year})</h3>
              <p className="text-base text-white/80 leading-relaxed">{selectedProject.description}</p>
              {(selectedProject.demoUrl || selectedProject.githubUrl) && (
                <div className="flex flex-wrap gap-4 pt-2">
                  {selectedProject.demoUrl && (
                    <a href={selectedProject.demoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs bg-highlight/10 border border-highlight/40 text-highlight px-3 py-1.5 hover:bg-highlight/20 transition-colors">
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
                  <span key={s} className="text-xs px-2.5 py-1 border border-white/20 bg-white/5 text-white/70 hover:bg-highlight/10 hover:border-highlight hover:text-highlight transition-all duration-200 cursor-default">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-mono text-sm text-foreground/80 p-6 space-y-4 h-full select-text relative">
      <p className="text-highlight font-bold mb-4">&gt; ACCESSING ENCRYPTED_WORK_FILES...</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectsData.map((proj) => (
          <div 
            key={proj.id} 
            onClick={() => setSelectedProject(proj)}
            className="border border-white/20 p-2 bg-white/5 hover:bg-highlight/5 hover:border-highlight transition-colors flex flex-col gap-2 cursor-pointer group"
          >
            <div className="w-full h-32 overflow-hidden border border-white/10 bg-black relative">
              <img src={proj.gallery[0].image} alt={proj.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <div className="flex justify-between text-[9px] text-white/40 mb-1">
                <span>PROJECT_0{proj.id}</span>
                <span>{proj.year}</span>
              </div>
              <h4 className="text-white font-bold text-xs truncate group-hover:text-highlight">{proj.title}</h4>
              <p className="text-[10px] text-white/60 mt-1 line-clamp-2">{proj.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
