import { useState } from "react";
import { User } from "lucide-react";

const AboutSection = () => {
  const [isHovered, setIsHovered] = useState(false);

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
            <div 
              className="aspect-[4/5] bg-muted relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Default: Abstract geometric visualization */}
              <div 
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isHovered ? "opacity-0" : "opacity-100"
                }`}
              >
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

              {/* Hover: Profile picture placeholder */}
              <div 
                className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-muted via-muted/80 to-muted" />
                <div className="relative flex flex-col items-center gap-4">
                  {/* Profile placeholder icon */}
                  <div className="w-32 h-32 rounded-full border-2 border-foreground/30 flex items-center justify-center bg-background/50">
                    <User className="w-16 h-16 text-foreground/40" />
                  </div>
                  <span className="font-mono text-xs text-foreground/50 tracking-wider uppercase">
                    Your Photo Here
                  </span>
                </div>
                {/* Frame corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-foreground/40" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-foreground/40" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-foreground/40" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-foreground/40" />
              </div>
            </div>
            
            {/* Caption */}
            <div className="mt-4 font-mono text-xs text-muted-foreground">
              {isHovered ? "FIG. 01 — PROFILE" : "FIG. 01 — STRUCTURAL ANALYSIS"}
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
              Data Scientist
              <br />
              Based in Mexico
            </h2>

            <div className="space-y-6 font-body text-muted-foreground leading-relaxed">
              <p>
                Data Scientist with experience in predictive and time series modeling, 
                ETL pipeline development in Google Cloud, and design of scalable interactive 
                dashboards.
              </p>
              <p>
                Specialized in Python (Pandas, NumPy, Scikit-learn, Statsmodels, and TensorFlow), 
                SQL, and visualization tools (Power BI), applying advanced Machine Learning 
                techniques, data analytics, and statistics to generate actionable insights 
                and optimize decision-making.
              </p>
              <p>
                Recognized for clear and structured communication, analytical thinking, 
                complex problem-solving, innovation, self-management, and proactivity. 
                Effective collaborator in hybrid and changing environments, with constant 
                curiosity and a focus on continuous improvement.
              </p>
            </div>

            {/* Expertise tags */}
            <div className="mt-12 flex flex-wrap gap-3">
              {["Python", "SQL", "Machine Learning", "Power BI", "Google Cloud", "TensorFlow"].map((tag) => (
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
