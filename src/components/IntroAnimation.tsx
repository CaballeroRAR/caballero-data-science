import { useState, useEffect, useCallback } from "react";

const glitchChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?`~";

const dataFragments = [
  "INITIALIZING_NEURAL_NETWORK",
  "LOADING_DATASET",
  "PARSING_FEATURES",
  "TRAINING_MODEL",
  "VALIDATING_ACCURACY",
  "OPTIMIZING_PARAMS",
  "DEPLOYING_PIPELINE",
  "CONNECTING_API",
  "FETCHING_RECORDS",
  "BUILDING_MATRIX",
  "CALIBRATING_WEIGHTS",
  "DECRYPTING_PAYLOAD",
];

const targetTexts = [
  "GABRIEL",
  "DATA SCIENTIST",
  "MACHINE LEARNING",
  "PREDICTIVE MODELS",
];

interface DecryptingTextProps {
  text: string;
  delay: number;
  onComplete?: () => void;
}

const DecryptingText = ({ text, delay, onComplete }: DecryptingTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsDecrypting(true);
      // Start with random characters
      setDisplayText(
        Array(text.length)
          .fill("")
          .map(() => glitchChars[Math.floor(Math.random() * glitchChars.length)])
          .join("")
      );
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay, text.length]);

  useEffect(() => {
    if (!isDecrypting) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex >= text.length) {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
        return;
      }

      setDisplayText((prev) => {
        const chars = prev.split("");
        // Reveal the correct character at currentIndex
        chars[currentIndex] = text[currentIndex];
        // Scramble remaining characters
        for (let i = currentIndex + 1; i < text.length; i++) {
          if (Math.random() > 0.3) {
            chars[i] = glitchChars[Math.floor(Math.random() * glitchChars.length)];
          }
        }
        return chars.join("");
      });
      currentIndex++;
    }, 50);

    return () => clearInterval(interval);
  }, [isDecrypting, text, onComplete]);

  return (
    <span
      className={`font-mono transition-all duration-300 ${
        isComplete ? "text-foreground" : "text-primary/70"
      }`}
    >
      {displayText || Array(text.length).fill("_").join("")}
    </span>
  );
};

interface DataStreamProps {
  isActive: boolean;
}

const DataStream = ({ isActive }: DataStreamProps) => {
  const [streams, setStreams] = useState<
    Array<{ id: number; text: string; x: number; speed: number; opacity: number }>
  >([]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setStreams((prev) => {
        // Add new stream
        const newStreams = [
          ...prev,
          {
            id: Date.now() + Math.random(),
            text: dataFragments[Math.floor(Math.random() * dataFragments.length)],
            x: Math.random() * 100,
            speed: 2 + Math.random() * 3,
            opacity: 0.3 + Math.random() * 0.5,
          },
        ];
        // Remove old streams (keep last 20)
        return newStreams.slice(-20);
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {streams.map((stream) => (
        <div
          key={stream.id}
          className="absolute font-mono text-xs text-primary/40 whitespace-nowrap animate-stream-down"
          style={{
            left: `${stream.x}%`,
            opacity: stream.opacity,
            animationDuration: `${stream.speed}s`,
          }}
        >
          {stream.text}
        </div>
      ))}
    </div>
  );
};

const ScrollIndicator = () => (
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
    <span className="font-mono text-xs text-muted-foreground tracking-widest">
      SCROLL TO EXPLORE
    </span>
    <div className="w-px h-8 bg-gradient-to-b from-foreground/60 to-transparent" />
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="text-foreground/60"
    >
      <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
    </svg>
  </div>
);

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<"loading" | "decrypting" | "revealing" | "complete">("loading");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showScrollHint, setShowScrollHint] = useState(false);

  // Loading phase progress
  useEffect(() => {
    if (phase !== "loading") return;

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase("decrypting");
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [phase]);

  // Auto-transition through phases
  useEffect(() => {
    if (phase === "decrypting") {
      const timeout = setTimeout(() => setPhase("revealing"), 2500);
      return () => clearTimeout(timeout);
    }
    if (phase === "revealing") {
      const timeout = setTimeout(() => {
        setShowScrollHint(true);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  // Listen for scroll to complete animation
  useEffect(() => {
    if (!showScrollHint) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setPhase("complete");
        onComplete();
      }
    };

    // Also allow click/tap to dismiss
    const handleClick = () => {
      setPhase("complete");
      onComplete();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
    };
  }, [showScrollHint, onComplete]);

  if (phase === "complete") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-background flex items-center justify-center transition-opacity duration-700 ${
        phase === "revealing" && showScrollHint ? "bg-background/95" : ""
      }`}
    >
      <DataStream isActive={phase === "loading" || phase === "decrypting"} />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Main content container */}
      <div className="relative z-10 text-center px-6">
        {/* Loading phase */}
        {phase === "loading" && (
          <div className="space-y-6 animate-fade-in">
            <div className="font-mono text-xs text-muted-foreground tracking-widest">
              INITIALIZING DATA ENVIRONMENT
            </div>
            <div className="w-64 h-1 bg-muted/30 mx-auto overflow-hidden">
              <div
                className="h-full bg-foreground transition-all duration-100"
                style={{ width: `${Math.min(loadingProgress, 100)}%` }}
              />
            </div>
            <div className="font-mono text-xs text-primary/60">
              {Math.min(Math.floor(loadingProgress), 100)}%
            </div>
          </div>
        )}

        {/* Decrypting phase */}
        {phase === "decrypting" && (
          <div className="space-y-4">
            <div className="font-mono text-xs text-muted-foreground tracking-widest mb-8 animate-pulse">
              DECRYPTING PORTFOLIO DATA
            </div>
            <div className="space-y-3">
              {targetTexts.map((text, index) => (
                <div
                  key={text}
                  className="text-2xl md:text-4xl font-display"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <DecryptingText text={text} delay={index * 400} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Revealing phase */}
        {phase === "revealing" && (
          <div className="space-y-6">
            <div className="text-4xl md:text-6xl font-display animate-scale-in">
              <span className="text-foreground">GABRIEL</span>
            </div>
            <div className="text-lg md:text-xl font-mono text-muted-foreground animate-fade-in animation-delay-200">
              DATA SCIENTIST
            </div>
            <div className="flex items-center justify-center gap-4 mt-8 animate-fade-in animation-delay-300">
              <div className="w-16 h-px bg-foreground/40" />
              <span className="font-mono text-xs text-muted-foreground">ACCESS GRANTED</span>
              <div className="w-16 h-px bg-foreground/40" />
            </div>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      {showScrollHint && <ScrollIndicator />}

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-12 h-12 border-l border-t border-foreground/20" />
      <div className="absolute top-4 right-4 w-12 h-12 border-r border-t border-foreground/20" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l border-b border-foreground/20" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r border-b border-foreground/20" />

      {/* Binary decoration */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[10px] text-muted-foreground/30 tracking-widest">
        01001101 01001100
      </div>
    </div>
  );
};

export default IntroAnimation;
