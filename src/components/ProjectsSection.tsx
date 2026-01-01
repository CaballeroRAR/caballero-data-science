import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Neural Network for Urban Planning",
    category: "Deep Learning",
    description: "Predictive model for city infrastructure optimization using satellite imagery and demographic data.",
    metrics: ["97.3% Accuracy", "2.4M Predictions", "12 Cities"],
    year: "2024",
  },
  {
    id: 2,
    title: "Real-Time Fraud Detection System",
    category: "ML Engineering",
    description: "End-to-end pipeline processing millions of transactions with sub-100ms latency.",
    metrics: ["99.9% Uptime", "5M+ Daily Transactions", "< 100ms Latency"],
    year: "2023",
  },
  {
    id: 3,
    title: "Climate Data Analysis Platform",
    category: "Data Engineering",
    description: "Scalable platform for analyzing 50 years of global climate data for research institutions.",
    metrics: ["500TB Data", "15+ Research Papers", "3 Continents"],
    year: "2023",
  },
  {
    id: 4,
    title: "Recommendation Engine Architecture",
    category: "System Design",
    description: "Designed recommendation system serving 10M users with personalized content delivery.",
    metrics: ["10M Users", "40% Engagement Lift", "Real-time Updates"],
    year: "2022",
  },
];

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-32 bg-foreground text-background relative">
      {/* Blueprint number */}
      <div className="absolute right-8 top-32 font-mono text-8xl text-background/10 hidden lg:block">
        03
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-background/60 tracking-widest uppercase">
            Selected Work
          </span>
          <div className="flex-1 h-px bg-background/20" />
          <span className="font-mono text-xs text-background/60">
            {projects.length} PROJECTS
          </span>
        </div>

        {/* Projects grid */}
        <div className="space-y-1">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group border-t border-background/20 py-8 cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Number */}
                <div className="lg:col-span-1">
                  <span className="font-mono text-sm text-background/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title & Category */}
                <div className="lg:col-span-5">
                  <h3 className="font-display text-2xl md:text-3xl mb-2 group-hover:translate-x-2 transition-transform duration-300">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-background/60 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                {/* Description */}
                <div className="lg:col-span-4">
                  <p
                    className={`font-body text-sm text-background/70 transition-opacity duration-300 ${
                      hoveredProject === project.id ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Year */}
                <div className="lg:col-span-2 text-right">
                  <span className="font-mono text-sm text-background/40">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Metrics - shown on hover */}
              <div
                className={`grid lg:grid-cols-12 gap-6 lg:gap-8 mt-6 overflow-hidden transition-all duration-300 ${
                  hoveredProject === project.id ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="lg:col-start-2 lg:col-span-10 flex flex-wrap gap-6">
                  {project.metrics.map((metric) => (
                    <div key={metric} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-background/60" />
                      <span className="font-mono text-xs text-background/80">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom border */}
        <div className="border-t border-background/20 mt-1" />
      </div>
    </section>
  );
};

export default ProjectsSection;
