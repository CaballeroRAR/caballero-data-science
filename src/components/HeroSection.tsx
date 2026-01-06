import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

const greetings = [
  { intro: "Hi! I am", role: "and I am a" },
  { intro: "Hola! Soy", role: "y soy" },
  { intro: "Привет, я", role: "и я" },
  { intro: "Oi! Eu sou", role: "e eu sou um" },
  { intro: "Hallo! Ich bin", role: "und ich bin ein" },
];

const glitchFragments = ["01", "//", ">>", "<<", "##", "$$", "&&", "**", "[]", "{}", "=>", "!="];

const GlitchText = ({ children }: { children: string }) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [fragments, setFragments] = useState<Array<{ id: number; startX: number; startY: number; char: string }>>([]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Generate fragments from within the text reaching toward cursor
    if (Math.random() > 0.6) {
      const newFragment = {
        id: Date.now() + Math.random(),
        startX: Math.random() * rect.width,
        startY: Math.random() * rect.height,
        char: glitchFragments[Math.floor(Math.random() * glitchFragments.length)],
      };
      setFragments(prev => [...prev.slice(-10), newFragment]);
    }
  };

  useEffect(() => {
    if (!isHovering) {
      setFragments([]);
    }
  }, [isHovering]);

  return (
    <span
      ref={containerRef}
      // Adding padding increases the hit area (proximity) for the hover effect
      className="relative inline-block cursor-default select-none p-6"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Main text */}
      <span className={`relative z-10 transition-all duration-100 ${isHovering ? '[text-shadow:2px_0_0_hsl(var(--primary)),_-2px_0_0_hsl(var(--destructive))]' : ''}`}>
        {children}
      </span>

      {/* Glitch overlay layers */}
      {isHovering && (
        <>
          <span 
            className="absolute inset-0 text-primary opacity-70 animate-pulse p-6"
            style={{ 
              transform: `translate(${(mousePos.x - 100) * 0.02}px, ${(mousePos.y - 20) * 0.02}px)`,
              clipPath: 'inset(20% 0 40% 0)'
            }}
            aria-hidden="true"
          >
            {children}
          </span>
          <span 
            className="absolute inset-0 text-destructive opacity-50 p-6"
            style={{ 
              transform: `translate(${(mousePos.x - 100) * -0.02}px, ${(mousePos.y - 20) * -0.02}px)`,
              clipPath: 'inset(60% 0 10% 0)'
            }}
            aria-hidden="true"
          >
            {children}
          </span>

          {/* Glitch lines from text to cursor */}
          <svg className="absolute overflow-visible pointer-events-none" style={{ left: 0, top: 0, width: '100%', height: '100%' }}>
            {fragments.map((frag) => (
              <line
                key={frag.id}
                x1={frag.startX}
                y1={frag.startY}
                x2={mousePos.x}
                y2={mousePos.y}
                stroke="hsl(var(--primary))"
                strokeWidth="1"
                opacity="0.5"
                className="animate-pulse"
              />
            ))}
          </svg>

          {/* Floating data fragments traveling from text toward cursor */}
          {fragments.map((frag) => {
            const progress = 0.3 + Math.random() * 0.5;
            const x = frag.startX + (mousePos.x - frag.startX) * progress;
            const y = frag.startY + (mousePos.y - frag.startY) * progress;
            return (
              <span
                key={frag.id}
                className="absolute font-mono text-xs text-primary pointer-events-none animate-fade-in"
                style={{
                  left: x,
                  top: y,
                  opacity: 0.7,
                }}
              >
                {frag.char}
              </span>
            );
          })}
        </>
      )}
    </span>
  );
};

const HeroSection = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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
  return <section className="min-h-screen relative flex items-center grid-pattern overflow-hidden">
      {/* Geometric decorations */}
      <div className="absolute top-20 right-10 w-40 h-40 border border-foreground/20 rotate-45 opacity-0 animate-fade-in animation-delay-500" />
      <div className="absolute bottom-40 left-10 w-24 h-24 border border-foreground/20 opacity-0 animate-fade-in animation-delay-400" />
      <div className="absolute top-1/3 right-1/4 w-px h-40 bg-foreground/20 opacity-0 animate-fade-in animation-delay-300" />
      
      {/* Blueprint numbers */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 font-mono text-8xl text-muted/50 hidden lg:block">
        01
      </div>

      <div className="container mx-auto px-6 lg:px-12 pt-20">
        <div className="max-w-5xl">
          {/* Top line with coordinates */}
          

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display leading-[1.1] mb-8">
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
              Gabriel
            </span>
          </h1>

          {/* Role line */}
          <div className="flex items-baseline gap-3 mb-8 opacity-0 animate-fade-up animation-delay-300">
            <span 
              className={`font-body text-lg md:text-xl text-muted-foreground transition-all duration-300 ease-out w-32 md:w-40 text-right ${
                isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}
            >
              {greetings[greetingIndex].role}
            </span>
            <span className="font-display text-xl md:text-2xl lg:text-3xl">
              <GlitchText>Data Scientist</GlitchText>
            </span>
          </div>

          {/* Subtitle */}
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mb-12 opacity-0 animate-fade-up animation-delay-400">
            I architect predictive models with <strong>Machine Learning & Neural Networks</strong>, specializing in turning complex data into measurable outcomes. 
            From business-oriented exploratory analysis that uncovers hidden opportunities to optimizing industrial processes and driving data-informed strategy.
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
          <div className="grid grid-cols-3 gap-8 mt-20 pt-8 border-t border-foreground/20 max-w-lg opacity-0 animate-fade-up animation-delay-500">
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
          }].map(stat => <div key={stat.label}>
                <div className="font-display text-3xl md:text-4xl">{stat.value}</div>
                <div className="font-mono text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>)}
          </div>
        </div>
      </div>

      {/* Bottom architectural line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/20" />
      <div className="absolute bottom-8 left-6 font-mono text-xs text-muted-foreground hidden md:block">
        SCROLL TO EXPLORE
        <span className="inline-block w-4 h-px bg-foreground ml-3 animate-pulse" />
      </div>
    </section>;
};
export default HeroSection;