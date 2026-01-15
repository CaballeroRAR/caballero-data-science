import { useState } from "react";
import profilePhoto from "@/assets/profile-photo.png";
import { SectionNumber } from "./ui/SectionNumber";
import DataBinsAnimation from "./ui/DataBinsAnimation";

const AboutSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="lg:grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-12">
          <div className="hidden lg:flex justify-end pt-8">
            <SectionNumber number="02" className="text-muted/80" />
          </div>

          <div>
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
                <div className="absolute inset-0 grid-pattern-dense opacity-50 animate-pulse" />
                <div className="absolute inset-8 border border-foreground/30" />
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-foreground/50 rotate-45 animate-[spin_10s_linear_infinite]" />
                <div className="absolute bottom-12 right-12 w-24 h-24 bg-foreground" />
                
                {/* Data visualization lines */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <style>
                    {`
                      @keyframes flow {
                        to { stroke-dashoffset: -20; }
                      }
                    `}
                  </style>
                  <path
                    d="M 10 80 Q 30 60, 50 70 T 90 30"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    fill="none"
                    className="text-foreground/40"
                    strokeDasharray="4 4"
                    style={{ animation: 'flow 2s linear infinite' }}
                  />
                  <path
                    d="M 10 60 Q 40 40, 60 50 T 90 20"
                    stroke="currentColor"
                    strokeWidth="0.3"
                    fill="none"
                    className="text-foreground/30"
                    strokeDasharray="3 3"
                    style={{ animation: 'flow 3s linear infinite reverse' }}
                  />
                </svg>
              </div>

              {/* Hover: Profile picture */}
              <div 
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <img 
                  src={profilePhoto} 
                  alt="Profile photo" 
                  className="w-full h-full object-cover object-top"
                />
                {/* Frame corners */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-foreground/40" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-foreground/40" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-foreground/40" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-foreground/40" />
              </div>
            </div>
            
            {/* Caption */}
            <div className="mt-4 font-mono text-xs text-muted-foreground">
              {isHovered ? "FIG. 01 — PROFILE" : "FIG. 01 — ANALYSIS"}
            </div>

            {/* Data bins animation */}
            <DataBinsAnimation />
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
                Transforming raw data into strategic value through predictive modeling, 
                time series analysis, and Google Cloud ETL pipelines. I utilize a 
                robust stack including Python (Pandas, NumPy, Scikit-learn, Statsmodels, 
                TensorFlow), SQL, and Power BI to build scalable analytics and machine 
                learning solutions.

              </p>
              <p>
                Known for combining analytical rigor with clear communication, I 
                autonomously navigate complex challenges in hybrid settings. My work is 
                driven by a passion for innovation and continuous learning.

              </p>
              <p className="font-body text-muted-foreground">
              This portfolio embodies that drive. Web dev isn't my core skill, but every 
              line here reflects hands-on learning and iteration—check the live evolution on GitHub
  <a 
    href="https://github.com/CaballeroRAR/caballero-data-science" 
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:text-blue-800 underline ml-1"
  >
    here
  </a>.
</p>
            </div>

            {/* Expertise tags */}
            <div className="mt-12 flex flex-wrap gap-3">
              {["Python", "SQL", "Machine Learning", "Power BI", "Google Cloud", "TensorFlow", "ETL", "Data Pipelines", "Time Series", "Predictive Modeling", "Pandas", "Scikit-learn", "Business Intelligence"].map((tag) => (
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
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
