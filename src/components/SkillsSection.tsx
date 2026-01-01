const skills = [
  { name: "Python", category: "Language" },
  { name: "Machine Learning", category: "Core" },
  { name: "SQL & Data Engineering", category: "Data" },
  { name: "Statistical Analysis", category: "Core" },
  { name: "Deep Learning", category: "Core" },
  { name: "Data Visualization", category: "Data" },
  { name: "MLOps & Deployment", category: "Ops" },
  { name: "Cloud Platforms", category: "Ops" },
];

const tools = [
  "TensorFlow",
  "PyTorch",
  "Scikit-learn",
  "Pandas",
  "Apache Spark",
  "Airflow",
  "Docker",
  "Kubernetes",
  "PostgreSQL",
  "MongoDB",
  "Tableau",
  "dbt",
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-32 relative grid-pattern">
      {/* Blueprint number */}
      <div className="absolute left-8 top-32 font-mono text-8xl text-muted/30 hidden lg:block">
        04
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
            Technical Expertise
          </span>
          <div className="flex-1 h-px bg-foreground/20" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Skills grid - architectural approach */}
          <div>
            <h2 className="text-3xl md:text-4xl font-display mb-12">
              Core Competencies
            </h2>
            <div className="grid grid-cols-2 gap-px bg-foreground/20">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="bg-background p-6 hover:bg-foreground hover:text-background transition-colors duration-300 group cursor-default"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="font-mono text-[10px] text-muted-foreground group-hover:text-background/60 uppercase tracking-widest block mb-2">
                    {skill.category}
                  </span>
                  <span className="font-body text-sm block">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools grid */}
          <div>
            <h2 className="text-3xl md:text-4xl font-display mb-12">
              Tools & Technologies
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {tools.map((tool) => (
                <div
                  key={tool}
                  className="aspect-square border border-foreground/20 flex items-center justify-center p-4 hover:bg-foreground hover:text-background transition-colors duration-300 group cursor-default"
                >
                  <span className="font-mono text-xs text-center uppercase tracking-wider group-hover:scale-110 transition-transform duration-300">
                    {tool}
                  </span>
                </div>
              ))}
            </div>

            {/* Additional info */}
            <div className="mt-12 p-6 border border-foreground/20 bg-surface-elevated">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 border border-foreground flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-xs">+</span>
                </div>
                <div>
                  <h3 className="font-display text-lg mb-2">Continuous Learning</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    Currently exploring advanced topics in generative AI, 
                    large language models, and scalable ML infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
