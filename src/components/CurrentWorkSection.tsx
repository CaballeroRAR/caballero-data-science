import { useState, useEffect } from "react";
import { SectionNumber } from "./ui/SectionNumber";
import { GitBranch, ExternalLink, FileText, Users, Loader2 } from "lucide-react";

const REPO_URL = "https://github.com/CaballeroRAR/ds_projects_collabs";
const README_RAW_URL = "https://raw.githubusercontent.com/CaballeroRAR/ds_projects_collabs/main/rol-responsabilidades.md";

const projectInfo = {
  title: "Customer Segmentation & Clustering",
  subtitle: "Collaborative Data Science Project",
  description: "A collaborative project focused on identifying key customer segments using clustering algorithms on the UCI Online Retail dataset. The goal is to identify 'Whales' (high-value), 'Core' (retention-focused), and 'Swing' (reactivation-focused) customer segments.",
  status: "In Progress",
  collaborators: 2,
  technologies: ["Python", "Scikit-learn", "K-Means", "DBSCAN", "PCA", "Jupyter Notebook"],
};

const CurrentWorkSection = () => {
  const [readme, setReadme] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReadme = async () => {
      try {
        const response = await fetch(README_RAW_URL);
        if (!response.ok) throw new Error("Failed to fetch README");
        const text = await response.text();
        setReadme(text);
      } catch (err) {
        setError("Could not load README");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReadme();
  }, []);

  // Simple markdown to JSX converter for basic formatting
  const renderMarkdown = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      // Headers
      if (line.startsWith("### ")) {
        return <h4 key={i} className="font-display text-lg mt-4 mb-2">{line.replace("### ", "")}</h4>;
      }
      if (line.startsWith("## ")) {
        return <h3 key={i} className="font-display text-xl mt-6 mb-3 text-foreground/90">{line.replace("## ", "")}</h3>;
      }
      if (line.startsWith("# ")) {
        return <h2 key={i} className="font-display text-2xl mt-6 mb-4">{line.replace("# ", "")}</h2>;
      }
      // Lists
      if (line.startsWith("- ") || line.startsWith("* ")) {
        return (
          <li key={i} className="ml-4 text-foreground/70 text-sm font-body flex items-start gap-2">
            <span className="w-1.5 h-1.5 bg-foreground/40 mt-2 flex-shrink-0" />
            <span>{line.replace(/^[-*] /, "")}</span>
          </li>
        );
      }
      // Code blocks
      if (line.startsWith("```")) {
        return null;
      }
      // Bold text
      const boldProcessed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      // Empty lines
      if (line.trim() === "") {
        return <div key={i} className="h-2" />;
      }
      return (
        <p 
          key={i} 
          className="text-foreground/70 text-sm font-body leading-relaxed"
          dangerouslySetInnerHTML={{ __html: boldProcessed }}
        />
      );
    });
  };

  return (
    <section id="current-work" className="py-32 bg-surface-elevated relative">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="lg:grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-12">
          <div className="hidden lg:flex justify-end pt-8">
            <SectionNumber number="03.5" className="text-muted/80" />
          </div>

          <div>
            {/* Section header */}
            <div className="flex items-center gap-4 mb-16">
              <span className="font-mono text-xs text-foreground/60 tracking-widest uppercase">
                Current Work
              </span>
              <div className="flex-1 h-px bg-foreground/20" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-mono text-xs text-green-500/80 uppercase">
                  {projectInfo.status}
                </span>
              </div>
            </div>

            {/* Project Card */}
            <div className="border border-foreground/20 bg-background">
              {/* Header */}
              <div className="p-6 lg:p-8 border-b border-foreground/10">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <h2 className="font-display text-3xl md:text-4xl mb-2">
                      {projectInfo.title}
                    </h2>
                    <p className="font-mono text-xs text-foreground/60 uppercase tracking-wider">
                      {projectInfo.subtitle}
                    </p>
                  </div>
                  <a
                    href={REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-foreground/20 hover:bg-foreground hover:text-background transition-colors duration-300 font-mono text-xs uppercase tracking-wider"
                  >
                    <GitBranch className="w-4 h-4" />
                    View on GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left: Project Info */}
                <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-foreground/10">
                  <p className="font-body text-sm text-foreground/80 leading-relaxed mb-6">
                    {projectInfo.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-3">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {projectInfo.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 border border-foreground/20 font-mono text-[10px] uppercase tracking-wider text-foreground/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Collaborators */}
                  <div className="flex items-center gap-2 text-foreground/60">
                    <Users className="w-4 h-4" />
                    <span className="font-mono text-xs">
                      {projectInfo.collaborators} Collaborators
                    </span>
                  </div>
                </div>

                {/* Right: README Preview */}
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-4 h-4 text-foreground/60" />
                    <h4 className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
                      Project Documentation
                    </h4>
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-foreground/20 scrollbar-track-transparent">
                    {isLoading ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-6 h-6 animate-spin text-foreground/40" />
                      </div>
                    ) : error ? (
                      <p className="text-foreground/50 text-sm font-mono">{error}</p>
                    ) : readme ? (
                      <div className="space-y-1">
                        {renderMarkdown(readme)}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Frame corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-foreground/30 pointer-events-none" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-foreground/30 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-foreground/30 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-foreground/30 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentWorkSection;
