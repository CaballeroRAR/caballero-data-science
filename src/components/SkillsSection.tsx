const skills = [
  { name: "Python", level: 95 },
  { name: "Machine Learning", level: 92 },
  { name: "SQL & Data Engineering", level: 90 },
  { name: "Statistical Analysis", level: 88 },
  { name: "Deep Learning", level: 85 },
  { name: "Data Visualization", level: 87 },
  { name: "MLOps & Deployment", level: 82 },
  { name: "Cloud Platforms (AWS/GCP)", level: 80 },
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
          {/* Skills bars */}
          <div>
            <h2 className="text-3xl md:text-4xl font-display mb-12">
              Core Competencies
            </h2>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={skill.name} className="group">
                  <div className="flex justify-between mb-2">
                    <span className="font-body text-sm">{skill.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1 bg-muted relative overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-foreground transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        transitionDelay: `${index * 100}ms`,
                      }}
                    />
                  </div>
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
              {tools.map((tool, index) => (
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
