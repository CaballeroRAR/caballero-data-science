import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "A/B Testing, UI Change",
    category: "Statistical Analysis",
    description: "Designed a hypothesis test with tailored α=0.10 for a low-risk UI experiment, prioritizing sensitivity over false positive risk. The test revealed a dramatic conversion increase from 19.9% to over 61%.",
    skills: ["Python", "Statsmodels", "Jupyter Notebook", "Statistical Testing", "Power Analysis"],
    link: "https://lnkd.in/gpcmjuuW",
    year: "2024",
  },
];

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

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
                  <p
                    className={`font-body text-sm text-foreground/70 transition-opacity duration-300 ${
                      hoveredProject === project.id ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Year */}
                <div className="lg:col-span-2 text-right">
                  <span className="font-mono text-sm text-foreground/40">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Skills - shown on hover */}
              <div
                className={`grid lg:grid-cols-12 gap-6 lg:gap-8 mt-6 overflow-hidden transition-all duration-300 ${
                  hoveredProject === project.id ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="lg:col-start-2 lg:col-span-10 flex flex-wrap gap-3">
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
              </div>
            </div>
          ))}
        </div>

        {/* Bottom border */}
        <div className="border-t border-foreground/20 mt-1" />
      </div>
    </section>
  );
};

export default ProjectsSection;
