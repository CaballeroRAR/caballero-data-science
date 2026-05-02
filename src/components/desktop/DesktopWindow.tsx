import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface DesktopWindowProps {
  id: string;
  title: string;
  isOpen: boolean;
  isLarge?: boolean;
  zIndex?: number;
  position?: { x: number; y: number };
  onClose: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

const DesktopWindow: React.FC<DesktopWindowProps> = ({
  id,
  title,
  isOpen,
  isLarge,
  zIndex,
  position,
  onClose,
  onFocus,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      onMouseDown={onFocus}
      style={{
        zIndex: zIndex || 1,
        transform: position ? `translate(${position.x}px, ${position.y}px)` : "none",
      }}
      className={`bg-black border border-primary p-1 pointer-events-auto shadow-2xl absolute flex flex-col ${
        id === "profile"
          ? "w-96 h-[512px] bottom-10 right-10"
          : isLarge
          ? "w-full max-w-[75vw] h-[78vh] left-10"
          : "w-full max-w-[70vw] h-[60vh]"
      }`}
    >
      <div className="flex items-center justify-between bg-primary text-black px-3 py-1 text-xs font-bold select-none">
        <span>{title}</span>
        <div className="flex items-center gap-2">
          <button onClick={(e) => { e.stopPropagation(); onClose(); }}>
            <X className="w-4 h-4 cursor-pointer hover:bg-black hover:text-primary p-0.5 transition-colors" />
          </button>
        </div>
      </div>

      <div className="bg-neutral-950 flex-1 border-t border-primary mt-1 overflow-y-auto">
        {children}
      </div>
    </motion.div>
  );
};

export default DesktopWindow;
