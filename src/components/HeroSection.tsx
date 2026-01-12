import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { SectionNumber } from "@/components/ui/SectionNumber";
const glitchChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?";

const greetings = [
  { intro: "Hi! I am", role: "and I am a" },
  { intro: "Hola! Soy", role: "y soy" },
  { intro: "Привет, я", role: "и я" },
  { intro: "Oi! Eu sou", role: "e eu sou um" },
  { intro: "Hallo! Ich bin", role: "und ich bin ein" },
  { intro: "مرحباً! أنا", role: "وأنا" },
];

// Decrypting text effect for first load
const DecryptingText = ({
  children,
  delay = 0,
  shouldDecrypt = true,
  className = ""
}: {
  children: string;
  delay?: number;
  shouldDecrypt?: boolean;
  className?: string;
}) => {
  const [displayText, setDisplayText] = useState(children);
  const [phase, setPhase] = useState(shouldDecrypt ? "placeholder" : "complete");
  const animationRef = useRef<number>();
  const timeoutRef = useRef<any>();

  useEffect(() => {
    if (!shouldDecrypt) {
      setPhase("complete");
      setDisplayText(children);
      return;
    }

    setPhase("placeholder");
    const placeholder = Array(children.length).fill("_").join("");
    setDisplayText(placeholder);

    timeoutRef.current = setTimeout(() => {
      setPhase("revealing");
      const startTime = performance.now();
      const totalDuration = 1200; // Smoother, longer duration
      const scrambleDuration = 400; // Initial scramble phase
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / totalDuration, 1);
        
        // Eased progress for smoother reveal
        const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        const revealIndex = Math.floor(easedProgress * children.length);
        
        if (progress >= 1) {
          setPhase("complete");
          setDisplayText(children);
          return;
        }
        
        setDisplayText(
          children
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' ';
              if (i < revealIndex) return children[i];
              // Gentler scramble - less frequent changes
              if (elapsed < scrambleDuration || Math.random() < 0.3) {
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
              }
              return children[i];
            })
            .join('')
        );
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [children, delay, shouldDecrypt]);

  return (
    <span className={`${className} transition-colors duration-300 ${phase !== "complete" ? "text-primary/70" : ""}`}>
      {displayText}
    </span>
  );
};

const HeroSection = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDecrypt] = useState(true);
  const [showScrollHint, setShowScrollHint] = useState(false);

  // Show scroll hint after decryption completes
  useEffect(() => {
    const timeout = setTimeout(() => setShowScrollHint(true), 2500);
    return () => clearTimeout(timeout);
  }, []);

  // Hide scroll hint on scroll
  useEffect(() => {
    if (!showScrollHint) return;
    
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollHint(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showScrollHint]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setGreetingIndex((prev) => (prev + 1) % greetings.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="min-h-screen relative flex items-center grid-pattern overflow-hidden">
      {/* Geometric decorations */}
      <div className="absolute top-20 right-10 w-40 h-40 border border-foreground/20 rotate-45 opacity-0 animate-fade-in animation-delay-500" />
      <div className="absolute bottom-40 left-10 w-24 h-24 border border-foreground/20 opacity-0 animate-fade-in animation-delay-400" />
      <div className="absolute top-1/3 right-1/4 w-px h-40 bg-foreground/20 opacity-0 animate-fade-in animation-delay-300" />
      
      {/* Blueprint numbers */}
      <SectionNumber number="01" className="absolute right-8 top-1/2 -translate-y-1/2 text-muted/80" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 pt-16 md:pt-20">
        <div className="max-w-5xl">
          {/* Main headline */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display leading-[1.1] mb-6 md:mb-8">
            <span className="block text-muted-foreground opacity-0 animate-fade-up animation-delay-100 mb-2">
              <span 
                className={`inline-block transition-all duration-300 ease-out ${
                  isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                }`}
              >
                {greetings[greetingIndex].intro}
              </span>
            </span>
            <span className="block opacity-0 animate-fade-up animation-delay-200">
              <DecryptingText shouldDecrypt={showDecrypt} delay={300}>
                Gabriel
              </DecryptingText>
            </span>
          </h1>

          {/* Role line */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-6 md:mb-8 opacity-0 animate-fade-up animation-delay-300">
            <span 
              className={`font-body text-base sm:text-lg md:text-xl text-muted-foreground transition-all duration-300 ease-out sm:w-32 md:w-40 sm:text-right ${
                isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              {greetings[greetingIndex].role}
            </span>
            <span className="font-display text-xl sm:text-2xl lg:text-3xl">
              <DecryptingText shouldDecrypt={showDecrypt} delay={800}>
                Data Scientist
              </DecryptingText>
            </span>
          </div>

          {/* Subtitle */}
          <p className="font-body text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mb-8 md:mb-12 opacity-0 animate-fade-up animation-delay-400">
            <DecryptingText shouldDecrypt={showDecrypt} delay={1400}>
              I architect predictive models with Machine Learning & Neural Networks, specializing in turning complex data into measurable outcomes.
            </DecryptingText>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up animation-delay-500">
            <Button variant="default" size="lg" onClick={scrollToContact}>
              Get in Touch
            </Button>
            <Button variant="architectural" size="lg" onClick={() => document.getElementById("projects")?.scrollIntoView({
            behavior: "smooth"
          })}>
              View Projects
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 md:mt-20 pt-6 md:pt-8 border-t border-foreground/20 max-w-lg opacity-0 animate-fade-up animation-delay-500">
            {[{
            value: "8+",
            label: "Years Experience as Architect"
          },{
            value: "1+",
            label: "Years Experience as Data Scientist"
          }, 
          {
            value: "50+",
            label: "Projects"
          }].map((stat, index) => (
              <div key={stat.label}>
                <div className="font-display text-2xl sm:text-3xl md:text-4xl">
                  <DecryptingText shouldDecrypt={showDecrypt} delay={1800 + index * 200}>
                    {stat.value}
                  </DecryptingText>
                </div>
                <div className="font-mono text-[10px] sm:text-xs text-muted-foreground mt-1 uppercase tracking-wider leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom architectural line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/20" />
      
      {/* Scroll indicator - blinks like the underscore */}
      <div 
        className={`absolute bottom-8 left-6 font-mono text-xs text-muted-foreground hidden md:flex items-center gap-3 transition-opacity duration-500 ${
          showScrollHint ? "opacity-100" : "opacity-60"
        }`}
      >
        <span className="animate-blink">SCROLL TO EXPLORE</span>
        <span className="inline-block w-4 h-px bg-foreground animate-blink" />
      </div>

      {/* Mobile scroll indicator - enhanced layout */}
      {showScrollHint && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden flex flex-col items-center gap-3">
          <span className="font-mono text-xs text-muted-foreground animate-blink tracking-wider">
            SCROLL TO EXPLORE
          </span>
          <div className="flex flex-col items-center gap-1 animate-blink">
            <div className="w-px h-6 bg-foreground/40" />
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-foreground/60"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;