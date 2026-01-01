import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen relative flex items-center grid-pattern overflow-hidden">
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
          <div className="flex items-center gap-4 mb-8 opacity-0 animate-fade-up">
            <div className="w-16 h-px bg-foreground origin-left animate-draw-line" />
            <span className="font-mono text-xs text-muted-foreground tracking-widest">
              52.5200° N, 13.4050° E
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display leading-[0.9] mb-8">
            <span className="block opacity-0 animate-fade-up animation-delay-100">
              DATA
            </span>
            <span className="block opacity-0 animate-fade-up animation-delay-200">
              SCIENTIST
            </span>
            <span className="block text-muted-foreground opacity-0 animate-fade-up animation-delay-300">
              & ARCHITECT
            </span>
          </h1>

          {/* Subtitle */}
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mb-12 opacity-0 animate-fade-up animation-delay-400">
            Building data structures with the precision of architectural blueprints. 
            Transforming complex datasets into elegant, functional solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 opacity-0 animate-fade-up animation-delay-500">
            <Button variant="default" size="lg" onClick={scrollToContact}>
              Get in Touch
            </Button>
            <Button variant="architectural" size="lg" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View Projects
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-20 pt-8 border-t border-foreground/20 max-w-lg opacity-0 animate-fade-up animation-delay-500">
            {[
              { value: "8+", label: "Years Experience" },
              { value: "50+", label: "Projects" },
              { value: "15M+", label: "Data Points Processed" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-3xl md:text-4xl">{stat.value}</div>
                <div className="font-mono text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom architectural line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/20" />
      <div className="absolute bottom-8 left-6 font-mono text-xs text-muted-foreground hidden md:block">
        SCROLL TO EXPLORE
        <span className="inline-block w-4 h-px bg-foreground ml-3 animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
