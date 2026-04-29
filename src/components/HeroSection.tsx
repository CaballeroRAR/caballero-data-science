import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { Play, X, Linkedin, Mail, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?";

// ==========================================
// VIDEO URL - Add your YouTube embed URL here
// Example: "https://www.youtube.com/embed/VIDEO_ID"
// Leave empty or null if no video available
// ==========================================
const YOUTUBE_EMBED_URL: string | null = "https://www.youtube.com/embed/IBwpqhPF5rs";

interface HeroSectionProps {
  animateContent?: boolean;
}

const GREETINGS = [
  { intro: "Hi! I am", role: "and I am a" },
  { intro: "Hola! Soy", role: "y soy" },
  { intro: "Привет, я", role: "и я" },
  { intro: "Oi! Eu sou", role: "e eu sou um" },
  { intro: "Hallo! Ich bin", role: "und ich bin ein" },
  { intro: "مرحباً! أنا", role: "وأنا" },
];

const STATS = [
  { value: "8+", label: "Years as Architect" },
  { value: "1+", label: "Years as Data Scientist" },
  { value: "50+", label: "Projects" },
];

const SOCIAL_LINKS = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/datacaballero", label: "LinkedIn" },
  { icon: Mail, href: "mailto:caballero.data.scientist@gmail.com", label: "Email" },
  { icon: Github, href: "https://github.com/CaballeroRAR", label: "GitHub" },
];

const HISTOGRAM_BAR_COUNT = 31;

interface DecryptingTextProps {
  children: string;
  delay?: number;
  shouldDecrypt?: boolean;
  className?: string;
}

const DecryptingText = ({
  children,
  delay = 0,
  shouldDecrypt = true,
  className = "",
}: DecryptingTextProps) => {
  const [displayText, setDisplayText] = useState(shouldDecrypt ? "" : children);
  const [isComplete, setIsComplete] = useState(!shouldDecrypt);
  const animationRef = useRef<number>();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!shouldDecrypt) {
      setIsComplete(true);
      setDisplayText(children);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      const startTime = performance.now();
      const totalDuration = 400;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 2);
        const revealIndex = Math.floor(easedProgress * children.length);

        if (progress >= 1) {
          setIsComplete(true);
          setDisplayText(children);
          return;
        }

        setDisplayText(
          children
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < revealIndex) return children[i];
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            })
            .join("")
        );

        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [children, delay, shouldDecrypt]);

  return (
    <span className={`${className} relative inline-block`}>
      <span className="invisible" aria-hidden="true">
        {children}
      </span>
      <span
        className={`absolute inset-0 transition-colors duration-200 ${!isComplete ? "text-primary/70" : ""
          }`}
        aria-live="polite"
      >
        {displayText}
      </span>
    </span>
  );
};

const HistogramBar = ({ index, total }: { index: number; total: number }) => {
  const center = Math.floor(total / 2);
  const distFromCenter = Math.abs(index - center);
  const height = Math.max(2, 8 - distFromCenter * 0.5);

  return (
    <span
      className="w-[2px] bg-foreground/40 animate-blink"
      style={{
        height: `${height}px`,
        animationDelay: `${index * 40}ms`,
      }}
    />
  );
};

const RhombusVideoPlayer = ({
  hasVideo,
  isExpanded,
  onExpand,
  onCollapse,
}: {
  hasVideo: boolean;
  isExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
}) => (
  <div
    className={`relative transition-all duration-500 ease-out ${isExpanded
      ? "w-[280px] sm:w-[400px] xl:w-[500px] h-[158px] sm:h-[225px] xl:h-[281px] rotate-0"
      : "w-24 sm:w-32 lg:w-40 xl:w-48 h-24 sm:h-32 lg:h-40 xl:h-48 rotate-45 cursor-pointer hover:scale-105"
      }`}
    onClick={() => hasVideo && !isExpanded && onExpand()}
  >
    <div
      className={`absolute inset-0 border-2 border-foreground/30 bg-background/80 backdrop-blur-sm transition-all duration-500 ${isExpanded ? "rounded-lg" : ""
        }`}
    >
      {isExpanded ? (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCollapse();
            }}
            className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-background border border-foreground/30 rounded-full flex items-center justify-center hover:bg-foreground/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          {hasVideo ? (
            <iframe
              src={`${YOUTUBE_EMBED_URL}?autoplay=1&mute=1`}
              title="Video CV"
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-mono text-sm text-muted-foreground">
                Video not available yet :(
              </span>
            </div>
          )}
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center -rotate-45">
          {hasVideo ? (
            <>
              <Play className="w-8 h-8 mb-2 text-foreground/70" />
              <span className="font-mono text-xs text-muted-foreground text-center">
                Click to play
              </span>
            </>
          ) : (
            <span className="font-mono text-xs text-muted-foreground text-center px-4 leading-relaxed">
              Video not available yet :(
            </span>
          )}
        </div>
      )}
    </div>
  </div>
);

const HeroSection = ({ animateContent = true }: HeroSectionProps) => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [showContactMenu, setShowContactMenu] = useState(false);

  const hasVideo = !!YOUTUBE_EMBED_URL;

  // Only start animations when content is ready
  const shouldAnimate = animateContent;

  useEffect(() => {
    if (!shouldAnimate) return;
    const timeout = setTimeout(() => setShowScrollHint(true), 1200);
    return () => clearTimeout(timeout);
  }, [shouldAnimate]);

  useEffect(() => {
    if (!showScrollHint) return;

    const handleScroll = () => {
      if (window.scrollY > 100) setShowScrollHint(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showScrollHint]);

  useEffect(() => {
    if (!shouldAnimate) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [shouldAnimate]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen relative flex items-center grid-pattern cyber-scanlines overflow-hidden pt-16 md:pt-0">
      {/* Geometric decorations - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, rotate: 45 }}
        animate={shouldAnimate ? { opacity: 1, rotate: 45 } : { opacity: 0, rotate: 45 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="hidden md:block absolute top-20 right-10 w-40 h-40 border border-foreground/20"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="hidden md:block absolute bottom-40 left-10 w-24 h-24 border border-foreground/20"
      />
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={shouldAnimate ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="hidden md:block absolute top-1/3 right-1/4 w-px h-40 bg-foreground/20 origin-top"
      />

      {/* Section number - desktop only */}
      <SectionNumber
        number="01"
        className="absolute right-8 top-1/2 -translate-y-1/2 text-muted/80 hidden lg:block"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Left content */}
          <div className="max-w-3xl flex-1">
            {/* Main headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display leading-[1.1] mb-4 md:mb-8">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
                className="block text-muted-foreground mb-1 md:mb-2"
              >
                <span
                  className={`inline-block transition-all duration-200 ease-out ${isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                    }`}
                >
                  {GREETINGS[greetingIndex].intro}
                </span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
                className="block"
              >
                <DecryptingText shouldDecrypt={shouldAnimate} delay={100}>
                  Gabriel
                </DecryptingText>
              </motion.span>
            </h1>

            {/* Role line */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
              className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-4 md:mb-8"
            >
              <span
                className={`font-body text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground transition-all duration-200 ease-out sm:min-w-[8rem] md:min-w-[10rem] sm:text-right ${isAnimating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                  }`}
              >
                {GREETINGS[greetingIndex].role}
              </span>
              <span className="font-display text-xl sm:text-2xl lg:text-3xl">
                <DecryptingText shouldDecrypt={shouldAnimate} delay={200}>
                  Data Scientist
                </DecryptingText>
              </span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
              className="font-body text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mb-6 md:mb-10 leading-relaxed"
            >
              <DecryptingText shouldDecrypt={shouldAnimate} delay={350}>
                I approach analytics with an architectural focus, transforming complex
                challenges into scalable solutions that go beyond visualizations.
              </DecryptingText>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.35, delay: 0.25, ease: "easeOut" }}
              className="flex flex-col sm:flex-row flex-wrap gap-3"
            >
              {/* Get in Touch with hover menu */}
              <div
                className="relative w-full sm:w-auto"
                onMouseEnter={() => setShowContactMenu(true)}
                onMouseLeave={() => setShowContactMenu(false)}
              >
                <Button
                  variant="glass"
                  size="lg"
                  onClick={() => {
                    // On mobile, toggle menu; on desktop, go to contact
                    if (window.innerWidth < 640) {
                      setShowContactMenu(!showContactMenu);
                    } else {
                      scrollToSection("contact");
                    }
                  }}
                  className="bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto"
                >
                  Get in Touch
                </Button>

                {/* Social mini-menu - orthogonal design */}
                <AnimatePresence>
                  {showContactMenu && (
                    <motion.div
                      initial={{ opacity: 0, scaleY: 0 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      exit={{ opacity: 0, scaleY: 0 }}
                      transition={{ duration: 0.12, ease: "easeOut" }}
                      style={{ transformOrigin: "top" }}
                      className="absolute left-0 right-0 sm:right-auto top-full mt-1 bg-background/95 backdrop-blur-md border border-foreground/20 z-50"
                    >
                      {/* Corner accents */}
                      <div className="absolute -top-px -left-px w-2 h-2 border-t border-l border-foreground/60" />
                      <div className="absolute -top-px -right-px w-2 h-2 border-t border-r border-foreground/60" />
                      <div className="absolute -bottom-px -left-px w-2 h-2 border-b border-l border-foreground/60" />
                      <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-foreground/60" />

                      <div className="flex">
                        {SOCIAL_LINKS.map((link, index) => (
                          <motion.a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith("mailto") ? undefined : "_blank"}
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.04, duration: 0.1 }}
                            className="group/icon flex-1 flex flex-col items-center gap-1 px-4 py-3 border-r border-foreground/10 last:border-r-0 hover:bg-foreground/5 transition-colors duration-150"
                            aria-label={link.label}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <link.icon className="w-4 h-4 text-foreground/70 group-hover/icon:text-foreground transition-colors" />
                            <span className="font-mono text-[8px] uppercase tracking-wider text-foreground/50 group-hover/icon:text-foreground/80 transition-colors">
                              {link.label}
                            </span>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Button
                variant="glass"
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="w-full sm:w-auto"
              >
                View Projects
              </Button>
              <Button
                variant="architectural"
                size="lg"
                onClick={() => scrollToSection("current-work")}
                className="relative group w-full sm:w-auto"
              >
                {/* Top histogram skyline - extends upward from top edge */}
                <span className="absolute bottom-full left-2 right-2 h-2 flex items-end justify-between pointer-events-none">
                  {[...Array(HISTOGRAM_BAR_COUNT)].map((_, i) => (
                    <HistogramBar key={`top-${i}`} index={i} total={HISTOGRAM_BAR_COUNT} />
                  ))}
                </span>
                <span className="relative z-10">View Latest Project</span>
                {/* Bottom histogram skyline - extends downward from bottom edge */}
                <span className="absolute top-full left-2 right-2 h-2 flex items-start justify-between pointer-events-none">
                  {[...Array(HISTOGRAM_BAR_COUNT)].map((_, i) => (
                    <HistogramBar key={`bottom-${i}`} index={i} total={HISTOGRAM_BAR_COUNT} />
                  ))}
                </span>
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.35, delay: 0.3, ease: "easeOut" }}
              className="grid grid-cols-3 gap-4 sm:gap-6 mt-10 md:mt-16 pt-6 border-t border-foreground/20 max-w-md"
            >
              {STATS.map((stat, index) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl sm:text-3xl md:text-4xl">
                    <DecryptingText shouldDecrypt={shouldAnimate} delay={500 + index * 60}>
                      {stat.value}
                    </DecryptingText>
                  </div>
                  <div className="font-mono text-[9px] sm:text-[10px] text-muted-foreground mt-1 uppercase tracking-wider leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right side - Rhombus Video Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
            className="flex flex-1 items-center justify-center mt-8 lg:mt-0"
          >
            <RhombusVideoPlayer
              hasVideo={hasVideo}
              isExpanded={isVideoExpanded}
              onExpand={() => setIsVideoExpanded(true)}
              onCollapse={() => setIsVideoExpanded(false)}
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom architectural line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/20" />

      {/* Scroll indicator - desktop */}
      <div
        className={`absolute bottom-8 left-6 font-mono text-xs text-muted-foreground hidden md:flex items-center gap-3 transition-opacity duration-500 ${showScrollHint ? "opacity-100" : "opacity-60"
          }`}
      >
        <span className="animate-blink">SCROLL TO EXPLORE</span>
        <span className="inline-block w-4 h-px bg-foreground animate-blink" />
      </div>

      {/* Mobile scroll indicator */}
      {showScrollHint && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] text-muted-foreground animate-blink tracking-wider">
            SCROLL
          </span>
          <div className="w-px h-4 bg-foreground/40 animate-blink" />
        </div>
      )}
    </section>
  );
};

export default HeroSection;