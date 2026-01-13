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

const skills = [
  { name: "Python", category: "Language" },
  { name: "SQL", category: "Language" },
  { name: "JSON", category: "Data" },
  { name: "Machine Learning", category: "Core" },
  { name: "Google Cloud", category: "Platform" },
  { name: "Power BI", category: "Visualization" },
  { name: "APIs", category: "Integration" },
  { name: "GitHub", category: "Tools" },
];

const tools = [
  "Scikit-learn",
  "TensorFlow",
  "NumPy",
  "Seaborn",
  "Jupyter Notebook",
  "Power BI",
];

const softSkills = [
  "Clear Communication",
  "Critical Thinking",
  "Problem Solving",
  "Innovation & Creativity",
  "Self-Management",
  "Proactivity",
  "Collaboration",
  "Continuous Learning",
  "Adaptability",
  "Atention to Detail",
];

type IconType = ComponentType<LucideProps>;

const skillIconByName: Record<string, IconType> = {
  Python: Terminal,
  SQL: Database,
  JSON: Braces,
  "Machine Learning": Brain,
  "Google Cloud": Cloud,
  "Power BI": ChartColumn,
  APIs: PlugZap,
  GitHub: GitBranch,
};

const toolIconByName: Record<string, IconType> = {
  "Scikit-learn": Brain,
  TensorFlow: Cpu,
  NumPy: Sigma,
  Seaborn: ChartLine,
  "Jupyter Notebook": NotebookText,
  "Power BI": ChartColumn,
};

const SkillsSection = () => {
  return (
    <section id="skills" className="py-32 relative grid-pattern">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="lg:grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-12">
          <div className="hidden lg:flex justify-end pt-8">
            <SectionNumber number="04" className="text-muted/80" />
          </div>

          <div>
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
              {skills.map((skill, index) => {
                const Icon = skillIconByName[skill.name] ?? Code;

                return (
                  <div
                    key={skill.name}
                    className="relative bg-background p-6 hover:bg-foreground hover:text-background transition-colors duration-300 group cursor-default"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Icon
                      aria-hidden="true"
                      className="absolute top-4 right-4 h-5 w-5 text-muted-foreground/70 opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:text-background/70"
                    />
                    <span className="font-mono text-[10px] text-muted-foreground group-hover:text-background/60 uppercase tracking-widest block mb-2">
                      {skill.category}
                    </span>
                    <span className="font-body text-sm block">{skill.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tools grid */}
          <div>
            <h2 className="text-3xl md:text-4xl font-display mb-12">
              Tools & Technologies
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {tools.map((tool) => {
                const Icon = toolIconByName[tool] ?? Code;

                return (
                  <div
                    key={tool}
                    className="relative aspect-square border border-foreground/20 flex items-center justify-center p-4 hover:bg-foreground hover:text-background transition-colors duration-300 group cursor-default"
                  >
                    <Icon
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-muted-foreground/20 opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 group-hover:text-background/20"
                    />
                    <span className="relative z-10 font-mono text-xs text-center uppercase tracking-wider group-hover:scale-110 transition-transform duration-300">
                      {tool}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="lg:col-span-2 mt-12">
            <h2 className="text-3xl md:text-4xl font-display mb-12">
              Soft Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {softSkills.map((skill) => (
                <div
                  key={skill}
                  className="p-4 border border-foreground/20 bg-surface-elevated hover:bg-foreground hover:text-background transition-colors duration-300 group cursor-default text-center"
                >
                  <span className="font-mono text-xs uppercase tracking-wider">
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
