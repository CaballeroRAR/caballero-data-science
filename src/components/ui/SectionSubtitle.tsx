import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LucideIcon } from "lucide-react";

interface SectionSubtitleProps {
  children: string;
  icon?: LucideIcon;
  className?: string;
  delay?: number;
}

const SectionSubtitle = ({ children, icon: Icon, className = "", delay = 0 }: SectionSubtitleProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ 
        duration: 0.4, 
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      className={`flex items-center gap-2 ${className}`}
    >
      {Icon && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, delay: delay + 0.1 }}
        >
          <Icon className="w-3 md:w-4 h-3 md:h-4 text-foreground/60" />
        </motion.span>
      )}
      <motion.h4
        initial={{ opacity: 0, x: -8 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
        transition={{ duration: 0.35, delay: delay + 0.05 }}
        className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest"
      >
        {children}
      </motion.h4>
    </motion.div>
  );
};

export default SectionSubtitle;
