import { useState } from "react";
import { Play, X } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.png";

export default function ProfileStream() {
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
              className="w-16 h-16 bg-highlight/20 border border-highlight/40 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-highlight/40 hover:scale-110 transition-all duration-300 group/play"
            >
              <Play className="w-8 h-8 text-highlight fill-highlight/20 group-hover/play:fill-highlight transition-all" />
            </button>
            <span className="mt-4 font-mono text-[10px] text-highlight tracking-[0.2em] uppercase animate-pulse">Initialize_Stream.exe</span>
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
