import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface WelcomeScreenProps {
  onComplete: () => void;
}

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

const DecryptText = ({ 
  text, 
  delay = 0, 
  duration = 500 
}: { 
  text: string; 
  delay?: number; 
  duration?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const revealIndex = Math.floor(easedProgress * text.length);

        if (progress >= 1) {
          setIsComplete(true);
          setDisplayText(text);
          return;
        }

        setDisplayText(
          text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < revealIndex) return text[i];
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            })
            .join("")
        );

        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, delay, duration]);

  return (
    <span className={`transition-colors duration-200 ${!isComplete ? "text-primary/70" : ""}`}>
      {displayText || "\u00A0"}
    </span>
  );
};

const WelcomeScreen = ({ onComplete }: WelcomeScreenProps) => {
  const [phase, setPhase] = useState<"greeting" | "name" | "role" | "exit">("greeting");

  useEffect(() => {
    // Faster timing for snappier experience
    const timers = [
      setTimeout(() => setPhase("name"), 400),
      setTimeout(() => setPhase("role"), 900),
      setTimeout(() => setPhase("exit"), 1800),
      setTimeout(() => onComplete(), 2400),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 grid-pattern opacity-30 hidden sm:block" />
          
          {/* Geometric decorations */}
          <motion.div
            initial={{ opacity: 0, rotate: 45 }}
            animate={{ opacity: 0.15, rotate: 45 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="hidden sm:block absolute top-1/4 right-1/4 w-24 sm:w-32 h-24 sm:h-32 border border-foreground/30"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hidden sm:block absolute bottom-1/3 left-1/4 w-16 sm:w-20 h-16 sm:h-20 border border-foreground/20"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="hidden sm:block absolute left-1/3 top-1/4 w-px h-24 sm:h-32 bg-foreground/20 origin-top"
          />

          {/* Main content */}
          <div className="relative text-center px-4 sm:px-6">
            {/* Greeting line */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="font-mono text-xs sm:text-sm md:text-base text-muted-foreground mb-3 sm:mb-4 tracking-wider"
            >
              <DecryptText text="Hi!" delay={50} duration={250} />
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: phase === "name" || phase === "role" ? 1 : 0, 
                y: phase === "name" || phase === "role" ? 0 : 20 
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-4 sm:mb-6"
            >
              <span className="text-muted-foreground font-body text-base sm:text-lg md:text-xl block mb-1 sm:mb-2">
                {phase !== "greeting" && <DecryptText text="I am" delay={0} duration={200} />}
              </span>
              {phase !== "greeting" && <DecryptText text="Gabriel" delay={100} duration={400} />}
            </motion.h1>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ 
                opacity: phase === "role" ? 1 : 0, 
                y: phase === "role" ? 0 : 15 
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3"
            >
              <span className="font-body text-sm sm:text-base md:text-lg text-muted-foreground">
                {phase === "role" && <DecryptText text="and I am a" delay={0} duration={200} />}
              </span>
              <span className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl">
                {phase === "role" && <DecryptText text="Data Scientist" delay={100} duration={350} />}
              </span>
            </motion.div>

            {/* Subtle loading indicator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.6, ease: "linear" }}
              className="absolute -bottom-10 sm:-bottom-16 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-px bg-foreground/30 origin-left"
            />
          </div>

          {/* Corner accents - smaller on mobile */}
          <div className="absolute top-4 sm:top-8 left-4 sm:left-8 w-6 sm:w-8 h-6 sm:h-8 border-l border-t border-foreground/20" />
          <div className="absolute top-4 sm:top-8 right-4 sm:right-8 w-6 sm:w-8 h-6 sm:h-8 border-r border-t border-foreground/20" />
          <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 w-6 sm:w-8 h-6 sm:h-8 border-l border-b border-foreground/20" />
          <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-6 sm:w-8 h-6 sm:h-8 border-r border-b border-foreground/20" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
