import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionTitleProps {
  children: string;
  className?: string;
}

const SectionTitle = ({ children, className = "" }: SectionTitleProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`font-mono text-xs text-muted-foreground tracking-widest uppercase ${className}`}
    >
      {children}
    </motion.span>
  );
};

export default SectionTitle;
