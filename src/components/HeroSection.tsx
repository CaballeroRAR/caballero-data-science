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
  const [fragments, setFragments] = useState<Array<{ id: number; x: number; y: number; char: string; angle: number }>>([]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    // Generate fragments pointing toward cursor
    if (Math.random() > 0.7) {
      const newFragment = {
        id: Date.now() + Math.random(),
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        char: glitchFragments[Math.floor(Math.random() * glitchFragments.length)],
        angle: Math.atan2(y - Math.random() * rect.height, x - Math.random() * rect.width) * (180 / Math.PI),
      };
      setFragments(prev => [...prev.slice(-8), newFragment]);
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
      className="relative inline-block cursor-default select-none"
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
            className="absolute inset-0 text-primary opacity-70 animate-pulse"
            style={{ 
              transform: `translate(${(mousePos.x - 100) * 0.02}px, ${(mousePos.y - 20) * 0.02}px)`,
              clipPath: 'inset(20% 0 40% 0)'
            }}
            aria-hidden="true"
          >
            {children}
          </span>
          <span 
            className="absolute inset-0 text-destructive opacity-50"
            style={{ 
              transform: `translate(${(mousePos.x - 100) * -0.02}px, ${(mousePos.y - 20) * -0.02}px)`,
              clipPath: 'inset(60% 0 10% 0)'
            }}
            aria-hidden="true"
          >
            {children}
          </span>

          {/* Glitch lines reaching to cursor */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none" style={{ left: '-50%', top: '-100%', width: '200%', height: '300%' }}>
            {fragments.map((frag) => (
              <g key={frag.id}>
                <line
                  x1={`${frag.x + 50}%`}
                  y1={`${frag.y + 100}%`}
                  x2={`${mousePos.x / 2}%`}
                  y2={`${mousePos.y + 100}%`}
                  stroke="hsl(var(--primary))"
                  strokeWidth="1"
                  opacity="0.4"
                  className="animate-pulse"
                />
              </g>
            ))}
          </svg>

          {/* Floating data fragments */}
          {fragments.map((frag) => (
            <span
              key={frag.id}
              className="absolute font-mono text-xs text-primary opacity-60 pointer-events-none animate-fade-in"
              style={{
                left: frag.x,
                top: frag.y,
                transform: `rotate(${frag.angle}deg)`,
              }}
            >
              {frag.char}
            </span>
          ))}

          {/* Underline glitch */}
          <span 
            className="absolute -bottom-1 left-0 h-px bg-primary"
            style={{ 
              width: `${Math.min(100, Math.abs(mousePos.x / 2))}%`,
              opacity: 0.8 
            }} 
          />
          <span 
            className="absolute -bottom-2 right-0 h-px bg-destructive opacity-40"
            style={{ 
              width: `${Math.min(60, Math.abs((200 - mousePos.x) / 3))}%`
            }} 
          />
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
            Building predictive models with the structured precision of an architect. 
            Specializing in Machine Learning algorithms and Neural Networks to turn complex data into actionable insights—from optimizing industrial processes to driving strategic decisions.            
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