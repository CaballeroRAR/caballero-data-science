const AboutSection = () => {
  return (
    <section id="about" className="py-32 relative">
      {/* Blueprint number */}
      <div className="absolute left-8 top-32 font-mono text-8xl text-muted/30 hidden lg:block">
        02
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Image/Visual */}
          <div className="relative">
            <div className="aspect-[4/5] bg-muted relative overflow-hidden">
              {/* Abstract geometric visualization */}
              <div className="absolute inset-0 grid-pattern-dense opacity-50" />
              <div className="absolute inset-8 border border-foreground/30" />
              <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-foreground/50 rotate-12" />
              <div className="absolute bottom-12 right-12 w-24 h-24 bg-foreground" />
              
              {/* Data visualization lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d="M 10 80 Q 30 60, 50 70 T 90 30"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  fill="none"
                  className="text-foreground/40"
                />
                <path
                  d="M 10 60 Q 40 40, 60 50 T 90 20"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  fill="none"
                  className="text-foreground/30"
                />
              </svg>
            </div>
            
            {/* Caption */}
            <div className="mt-4 font-mono text-xs text-muted-foreground">
              FIG. 01 — STRUCTURAL ANALYSIS
            </div>
          </div>

          {/* Right column - Content */}
          <div className="lg:pt-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                About
              </span>
              <div className="flex-1 h-px bg-foreground/20" />
            </div>

            <h2 className="text-4xl md:text-5xl font-display mb-8 leading-tight">
              Where Data Meets
              <br />
              Design Thinking
            </h2>

            <div className="space-y-6 font-body text-muted-foreground leading-relaxed">
              <p>
                With a background that bridges quantitative analysis and architectural thinking, 
                I approach data science as a form of structural engineering—building robust 
                systems that can support decision-making at scale.
              </p>
              <p>
                My methodology draws from architectural principles: every model must have a 
                solid foundation, clear load-bearing logic, and an elegant interface between 
                complexity and usability.
              </p>
              <p>
                Previously at leading tech firms in Berlin and San Francisco, I now focus on 
                consulting for organizations that value precision, clarity, and sustainable 
                data infrastructure.
              </p>
            </div>

            {/* Expertise tags */}
            <div className="mt-12 flex flex-wrap gap-3">
              {["Machine Learning", "Data Architecture", "Statistical Modeling", "MLOps", "Python", "SQL"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 border border-foreground/30 font-mono text-xs uppercase tracking-wider hover:bg-foreground hover:text-background transition-colors duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
