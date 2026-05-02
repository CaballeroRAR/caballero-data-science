import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { tensorNodes, tensorLinks, logPool } from "@/data/desktop-data";

export default function TensorGraph() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([
    "INITIALIZING NEURAL_GROUNDING...",
    "NODE_X1: STANDBY",
    "NODE_X2: STANDBY",
    "NODE_X3: STANDBY"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-7), `[${new Date().toLocaleTimeString()}] ${logPool[Math.floor(Math.random() * logPool.length)]}`]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const nodeIds = tensorNodes.map(n => n.id);
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        setHoveredNode(nodeIds[Math.floor(Math.random() * nodeIds.length)]);
      } else {
        setHoveredNode(null);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto select-none z-0">
      {/* Selector Indicator */}
      <div className="mb-6 font-mono text-xs text-highlight border border-highlight/20 bg-highlight/5 px-4 py-1.5 animate-pulse flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-highlight rounded-full animate-ping" />
        [SYSTEM_READY] Select a section of the menu above
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Network Graph */}
        <div className="relative w-[340px] h-[350px] border border-white/10 bg-black/60 p-4 backdrop-blur-sm">
          <div className="text-[10px] text-white/40 font-mono mb-4 border-b border-white/10 pb-1 flex justify-between">
            <span>[SYSTEM_MODEL]: NEURAL_EXEC</span>
            <span className="text-highlight animate-pulse">ACTIVE</span>
          </div>
          <svg className="w-full h-full" viewBox="0 0 320 350">
            {tensorLinks.map((link, idx) => {
              const fromNode = tensorNodes.find(n => n.id === link.from)!;
              const toNode = tensorNodes.find(n => n.id === link.to)!;
              const isHovered = hoveredNode === link.from || hoveredNode === link.to;
              return (
                <motion.line
                  key={idx}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={isHovered ? "hsl(var(--accent-green))" : "rgba(34, 197, 94, 0.2)"}
                  strokeWidth={isHovered ? 2 : 1}
                  strokeDasharray="4 4"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ repeat: Infinity, ease: "linear", duration: isHovered ? 1 : 2 }}
                />
              );
            })}

            {tensorNodes.map((node) => (
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
                  stroke={hoveredNode === node.id ? "hsl(var(--accent-green))" : "rgba(255,255,255,0.3)"}
                  strokeWidth={2}
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: Math.random() }}
                />
                <text
                  x={node.type === "output" ? 14 : node.type === "input" ? -10 : 0}
                  y={node.type === "hidden" ? -12 : 3}
                  textAnchor={node.type === "input" ? "end" : node.type === "hidden" ? "middle" : "start"}
                  className="text-[8px] font-mono fill-white/40 group-hover:fill-highlight transition-colors pointer-events-none"
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
