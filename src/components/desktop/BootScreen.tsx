interface BootScreenProps {
  progress: number;
}

export default function BootScreen({ progress }: BootScreenProps) {
  const barWidth = 20;
  const filledCount = Math.floor((progress / 100) * barWidth);
  const emptyCount = barWidth - filledCount;
  const asciiBar = `[${"=".repeat(filledCount)}${">"}${" ".repeat(Math.max(0, emptyCount - 1))}]`;

  return (
    <div className="min-h-screen bg-[#121414] flex flex-col items-center justify-center font-mono p-6 cyber-scanlines">
      <div className="w-full max-w-lg space-y-6">
        <div className="space-y-2 text-sm border-l-2 border-highlight pl-4">
          <p className="text-white/40 tracking-widest text-[10px]">GABRIEL_CABALLERO // CORE_KERNEL_v2.026</p>
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-highlight animate-pulse font-bold tracking-tighter uppercase text-lg">
                &gt; Initializing_Terminal
              </p>
              <p className="text-white/30 text-[9px] uppercase">Mounting encrypted_assets...</p>
            </div>
            <span className="text-highlight font-bold text-xl tabular-nums">{progress}%</span>
          </div>
        </div>
        
        <div className="bg-black/40 border border-white/10 p-6 space-y-4 backdrop-blur-sm">
          <div className="text-highlight font-mono text-lg tracking-[0.2em] flex justify-center">
            {asciiBar}
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-[9px] text-white/40 uppercase font-mono border-t border-white/5 pt-4">
            <div className="space-y-1">
              <p className={progress > 20 ? "text-highlight/60" : ""}>[OK] Memory_Check</p>
              <p className={progress > 40 ? "text-highlight/60" : ""}>[OK] Network_Handshake</p>
            </div>
            <div className="space-y-1">
              <p className={progress > 60 ? "text-highlight/60" : ""}>[OK] Decrypting_UI</p>
              <p className={progress > 80 ? "text-highlight/60" : ""}>[OK] Establishing_Uplink</p>
            </div>
          </div>
        </div>
        
        <div className="text-[8px] text-white/20 text-center uppercase tracking-[0.5em] animate-pulse">
          Secure_Access_Protocol_Active
        </div>
      </div>
    </div>
  );
}
