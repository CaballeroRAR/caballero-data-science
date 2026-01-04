import { useState } from "react";
import businessContextImg from "@/assets/img/business-context.png";
import conversionStatImg from "@/assets/img/conversion-stat.png";
import abtestingImg from "@/assets/img/abtesting.png";

const projects = [
  {
    id: 1,
    title: "A/B Testing, UI Change",
    category: "Statistical Analysis",
    description: (
      <div className="space-y-2">
        <p>Recommend using α = 0.10 significance level (90% confidence) with our current sample of 10,000 users per variant. This strategy optimally balances statistical rigor with business agility, specifically addressing our concern about missing real improvements in a low-risk UI test.</p>
        <ul className="list-disc pl-4 space-y-1">
          <li><strong className="text-foreground/90">Test Type:</strong> Minor UI button tweak (low implementation cost)</li>
          <li><strong className="text-foreground/90">Primary Risk Concern:</strong> Missing a real improvement &gt; Cost of false positive</li>
          <li><strong className="text-foreground/90">Current Performance:</strong> 19.9% conversion rate (clicks)</li>
          <li><strong className="text-foreground/90">Sample Available:</strong> 10,000 users per variant (20,000 total)</li>
          <li><strong className="text-foreground/90">Business Goal:</strong> Increase non-client to client conversions</li>
        </ul>
      </div>
    ),
    skills: ["Python", "Statsmodels", "Jupyter Notebook", "Statistical Testing", "Power Analysis"],
    link: "https://lnkd.in/gpcmjuuW",
    year: "2025",
    gallery: [
      { id: 1, placeholder: "Business Rationale | Parameter Selection", modalText: "A higher alpha (0.10) was chosen because the business risk of a false positive (rolling out an ineffective change) is low—it's a minor UI tweak, easily reversible, with minimal cost.", image: businessContextImg },
      { id: 2, placeholder: "Conversion Statistics", modalText: "The control group had a 19.9% conversion rate, while the treatment group achieved over 61%, demonstrating a statistically significant improvement.", image: conversionStatImg },
      { id: 3, placeholder: "Groups Visualization", modalText: "Visual comparison of conversion rates between control and treatment groups, clearly showing the dramatic improvement from the UI change.", image: abtestingImg },
    ],
  },
  {
    id: 2,
    title: "Gold Recovery Prediction",
    category: "Machine Learning",
    description: "Developed an end-to-end regression pipeline to predict gold recovery rates and optimize industrial flotation processes. The model identifies optimal parameter ranges for reagent concentration and particle size to maximize extraction efficiency and reduce waste.",
    skills: ["Regression Modeling", "Feature Engineering", "Ensemble Methods", "Scikit-learn", "Custom Metrics (sMAPE)"],
    link: "https://lnkd.in/eZMdm3_V",
    year: "2025",
    gallery: [
      { id: 1, placeholder: "Data Pipeline" },
      { id: 2, placeholder: "Model Performance" },
      { id: 3, placeholder: "Feature Importance" },
    ],
  },
  {
    id: 3,
    title: "Employee Salary Analysis",
    category: "Statistical Analysis",
    description: "Conducted exploratory data analysis on compensation patterns to quantify the impact of experience, education, and role on salary structures. Delivered visual benchmarks and statistical insights to support HR strategy and talent acquisition planning.",
    skills: ["Exploratory Data Analysis (EDA)", "Data Visualization", "Statistical Analysis", "Business Analytics", "Data Cleaning"],
    link: "https://lnkd.in/eaUVU9yg",
    year: "2025",
    gallery: [
      { id: 1, placeholder: "EDA Overview" },
      { id: 2, placeholder: "Salary Distribution" },
      { id: 3, placeholder: "Key Insights" },
    ],
  },
];

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ image: string; text: string } | null>(null);

  return (
    <section id="projects" className="py-32 bg-background text-foreground relative">
      {/* Blueprint number */}
      <div className="absolute right-8 top-32 font-mono text-8xl text-foreground/10 hidden lg:block">
        03
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-foreground/60 tracking-widest uppercase">
            Selected Work
          </span>
          <div className="flex-1 h-px bg-foreground/20" />
          <span className="font-mono text-xs text-foreground/60">
            {projects.length} PROJECTS
          </span>
        </div>

        {/* Projects grid */}
        <div className="space-y-1">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group border-t border-foreground/20 py-8 cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Number */}
                <div className="lg:col-span-1">
                  <span className="font-mono text-sm text-foreground/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title & Category */}
                <div className="lg:col-span-5">
                  <h3 className="font-display text-2xl md:text-3xl mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-foreground/60 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                {/* Description */}
                <div className="lg:col-span-4">
                  <div
                    className={`font-body text-sm text-foreground/70 transition-opacity duration-300 ${
                      hoveredProject === project.id ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    {project.description}
                  </div>
                </div>

                {/* Year */}
                <div className="lg:col-span-2 text-right">
                  <span className="font-mono text-sm text-foreground/40">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Skills & Gallery - shown on hover */}
              <div
                className={`grid lg:grid-cols-12 gap-6 lg:gap-8 mt-6 overflow-hidden transition-all duration-500 ${
                  hoveredProject === project.id ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="lg:col-start-2 lg:col-span-10 space-y-4">
                  {/* Skills */}
                  <div className="flex flex-wrap gap-3">
                    {project.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-foreground/60" />
                        <span className="font-mono text-xs text-foreground/80">{skill}</span>
                      </div>
                    ))}
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-foreground/60 hover:text-foreground underline underline-offset-2 ml-4"
                      >
                        View Project →
                      </a>
                    )}
                  </div>

                  {/* Gallery */}
                  <div className="flex gap-3 mt-4">
                    {project.gallery.map((item, idx) => (
                      <div
                        key={item.id}
                        className={`relative w-32 h-20 bg-muted border border-foreground/20 overflow-hidden group/gallery ${
                          item.image ? "cursor-pointer" : ""
                        }`}
                        style={{ animationDelay: `${idx * 100}ms` }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.image) setSelectedImage({ image: item.image, text: item.modalText || item.placeholder });
                        }}
                      >
                        {/* Placeholder content - shown when no image */}
                        {!item.image && (
                          <>
                            <div className="absolute inset-0 grid-pattern-dense opacity-30" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="font-mono text-[10px] text-foreground/50 text-center px-2">
                                {item.placeholder}
                              </span>
                            </div>
                          </>
                        )}
                        {/* Image with click-to-view text overlay */}
                        {item.image && (
                          <>
                            <img
                              src={item.image}
                              alt={item.placeholder}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            {/* Click to view overlay */}
                            <div className="absolute inset-0 bg-background/80 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                              <span className="font-mono text-[10px] text-foreground/90 text-center px-2 mb-1">
                                {item.placeholder}
                              </span>
                              <span className="font-mono text-[8px] text-foreground/60 uppercase tracking-wider">
                                Click to view
                              </span>
                            </div>
                          </>
                        )}
                        {/* Frame corners */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-foreground/40" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-foreground/40" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-foreground/40" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-foreground/40" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom border */}
        <div className="border-t border-foreground/20 mt-1" />
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full flex flex-col items-center justify-center">
            <img 
              src={selectedImage.image} 
              alt="Project detail" 
              className="max-w-full max-h-[80vh] object-contain border border-foreground/20 shadow-2xl"
            />
            <div className="mt-4 text-center max-w-2xl px-4">
              <p className="font-body text-sm text-foreground/80">
                {selectedImage.text}
              </p>
            </div>
            <button className="absolute top-4 right-4 md:-top-12 md:right-0 text-foreground hover:text-foreground/70 transition-colors">
              <span className="font-mono text-sm uppercase tracking-widest">Close</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
