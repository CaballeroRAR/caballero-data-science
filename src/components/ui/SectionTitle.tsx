import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link2 } from "lucide-react";
import { toast } from "sonner";

interface SectionTitleProps {
  children: string;
  className?: string;
  sectionId?: string;
}

const SectionTitle = ({ children, className = "", sectionId }: SectionTitleProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!sectionId) return;
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    navigator.clipboard.writeText(url).then(() => {
      toast("Link copied to clipboard", {
        description: "You can now share this section.",
        duration: 3000,
      });
    });
  };

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={`font-mono text-xs text-primary tracking-widest uppercase flex items-center gap-2 ${className}`}
    >
      <span className="text-secondary animate-pulse-subtle font-bold">[</span>
      <span>{children}</span>
      <span className="text-secondary animate-pulse-subtle font-bold">]</span>
      <span className="text-foreground/30 font-mono text-[9px] ml-2 tracking-normal">
        ACCESS_LEVEL_GRANTED
      </span>
      {sectionId && (
        <button
          onClick={handleShare}
          className="p-1 hover:bg-foreground/10 rounded-md transition-colors group cursor-pointer"
          title="Share this section"
          aria-label="Share this section"
        >
          <Link2 className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
        </button>
      )}
    </motion.span>
  );
};

export default SectionTitle;
