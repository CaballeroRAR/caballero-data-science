import { SectionNumber } from "./ui/SectionNumber";
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import {
  Brain,
  Braces,
  ChartColumn,
  ChartLine,
  Cloud,
  Code,
  Cpu,
  Database,
  GitBranch,
  NotebookText,
  PlugZap,
  Sigma,
  Terminal,
} from "lucide-react";

type IconType = ComponentType<LucideProps>;

const SKILLS = [
  { name: "Python", category: "Language", icon: Terminal },
  { name: "SQL", category: "Language", icon: Database },
  { name: "JSON", category: "Data", icon: Braces },
  { name: "Machine Learning", category: "Core", icon: Brain },
  { name: "Google Cloud", category: "Platform", icon: Cloud },
  { name: "Power BI", category: "Visualization", icon: ChartColumn },
  { name: "APIs", category: "Integration", icon: PlugZap },
  { name: "GitHub", category: "Tools", icon: GitBranch },
] as const;

const TOOLS = [
  { name: "Scikit-learn", icon: Brain },
  { name: "TensorFlow", icon: Cpu },
  { name: "NumPy", icon: Sigma },
  { name: "Seaborn", icon: ChartLine },
  { name: "Jupyter Notebook", icon: NotebookText },
  { name: "Power BI", icon: ChartColumn },
] as const;

const SOFT_SKILLS = [
  "Clear Communication",
  "Critical Thinking",
  "Problem Solving",
  "Innovation & Creativity",
  "Self-Management",
  "Proactivity",
  "Collaboration",
  "Continuous Learning",
  "Adaptability",
  "Attention to Detail",
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 md:py-32 relative grid-pattern">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="lg:grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-12">
          <div className="hidden lg:flex justify-end pt-8">
            <SectionNumber number="04" className="text-muted/80" />
          </div>

          <div>
            {/* Section header */}
            <div className="flex items-center gap-4 mb-10 md:mb-16">
              <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                Technical Expertise
              </span>
              <div className="flex-1 h-px bg-foreground/20" />
            </div>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-24">
              {/* Skills grid */}
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display mb-8 md:mb-12">
                  Core Competencies
                </h2>
                <div className="grid grid-cols-2 gap-px bg-foreground/20">
                  {SKILLS.map((skill) => {
                    const Icon = skill.icon || Code;
                    return (
                      <div
                        key={skill.name}
                        className="relative bg-background p-4 md:p-6 hover:bg-foreground hover:text-background transition-colors duration-300 group cursor-default"
                      >
                        <Icon
                          aria-hidden="true"
                          className="absolute top-3 md:top-4 right-3 md:right-4 h-4 md:h-5 w-4 md:w-5 text-muted-foreground/70 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:text-background/70"
                        />
                        <span className="font-mono text-[9px] md:text-[10px] text-muted-foreground group-hover:text-background/60 uppercase tracking-widest block mb-1 md:mb-2">
                          {skill.category}
                        </span>
                        <span className="font-body text-xs md:text-sm block">{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tools grid */}
              <div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display mb-8 md:mb-12">
                  Tools & Technologies
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  {TOOLS.map((tool) => {
                    const Icon = tool.icon || Code;
                    return (
                      <div
                        key={tool.name}
                        className="relative aspect-square border border-foreground/20 flex items-center justify-center p-3 md:p-4 hover:bg-foreground hover:text-background transition-colors duration-300 group cursor-default"
                      >
                        <Icon
                          aria-hidden="true"
                          className="absolute left-1/2 top-1/2 h-8 md:h-10 w-8 md:w-10 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/20 opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:text-background/20"
                        />
                        <span className="relative z-10 font-mono text-[10px] md:text-xs text-center uppercase tracking-wider group-hover:scale-110 transition-transform duration-300">
                          {tool.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Soft Skills */}
              <div className="lg:col-span-2 mt-6 md:mt-12">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display mb-8 md:mb-12">
                  Soft Skills
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
                  {SOFT_SKILLS.map((skill) => (
                    <div
                      key={skill}
                      className="p-3 md:p-4 border border-foreground/20 bg-surface-elevated hover:bg-foreground hover:text-background transition-colors duration-300 group cursor-default text-center"
                    >
                      <span className="font-mono text-[10px] md:text-xs uppercase tracking-wider">
                        {skill}
                      </span>
                    </div>
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

export default SkillsSection;