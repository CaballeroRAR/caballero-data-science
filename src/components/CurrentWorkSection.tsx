import { useState, useEffect } from "react";
import { SectionNumber } from "./ui/SectionNumber";
import { GitBranch, ExternalLink, FileText, Users, Loader2, GitCommit, ImageOff } from "lucide-react";

const REPO_URL = "https://github.com/CaballeroRAR/ds_projects_collabs";
const README_RAW_URL = "https://raw.githubusercontent.com/CaballeroRAR/ds_projects_collabs/main/1-cluster_retail-uci/README.md"; // Raw URL to the README file 
const COMMITS_API_URL = "https://api.github.com/repos/CaballeroRAR/ds_projects_collabs/commits?per_page=5";

const projectInfo = {
  title: "Customer Clustering for Retail Insights",
  subtitle: "Collaborative Unsupervised Learning Project",
  description: "Collaborative data science project applying RFM analysis and clustering algorithms (K-Means, DBSCAN) to UCI Online Retail transactional data. Identifies actionable customer segments—high-value 'Whales', steady 'Core' customers, and reactivation 'Swing' buyers—to drive targeted marketing, retention, and reactivation strategies. Covers EDA, feature engineering, model comparison, and business interpretation.",
  status: "In Progress",
  collaborators: 2,
  technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "K-Means", "DBSCAN", "PCA", "Matplotlib", "Seaborn", "Jupyter Notebook"],
  previewImage: null as string | null, // Placeholder for uploaded screenshot
};

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

const CurrentWorkSection = () => {
  const [readme, setReadme] = useState<string | null>(null);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCommits, setIsLoadingCommits] = useState(true);
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

    const fetchCommits = async () => {
      try {
        const response = await fetch(COMMITS_API_URL);
        if (!response.ok) throw new Error("Failed to fetch commits");
        const data = await response.json();
        setCommits(data);
      } catch (err) {
        console.error("Could not load commits:", err);
      } finally {
        setIsLoadingCommits(false);
      }
    };

    fetchReadme();
    fetchCommits();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

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
            <div className="border border-foreground/20 bg-background relative">
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

              {/* Preview Image Section */}
              <div className="p-6 lg:p-8 border-b border-foreground/10">
                <h4 className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-4">
                  Latest Preview
                </h4>
                <div className="aspect-video bg-surface-elevated border border-dashed border-foreground/20 flex flex-col items-center justify-center gap-4">
                  {projectInfo.previewImage ? (
                    <img 
                      src={projectInfo.previewImage} 
                      alt="Project Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <ImageOff className="w-12 h-12 text-foreground/20" />
                      <p className="font-mono text-sm text-foreground/40 text-center px-4">
                        Latest Preview Not Available :(
                      </p>
                      <p className="font-mono text-[10px] text-foreground/30 uppercase tracking-wider">
                        Screenshot not uploaded yet
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
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

                {/* Middle: Commit Timeline */}
                <div className="p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-foreground/10">
                  <div className="flex items-center gap-2 mb-4">
                    <GitCommit className="w-4 h-4 text-foreground/60" />
                    <h4 className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
                      Recent Commits
                    </h4>
                  </div>
                  
                  {isLoadingCommits ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-foreground/40" />
                    </div>
                  ) : commits.length > 0 ? (
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-[5px] top-2 bottom-2 w-px bg-foreground/10" />
                      
                      <div className="space-y-4">
                        {commits.map((commit, index) => (
                          <a
                            key={commit.sha}
                            href={commit.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <div className="flex gap-3 relative">
                              {/* Timeline dot */}
                              <div className={`w-[11px] h-[11px] rounded-full border-2 flex-shrink-0 mt-1 z-10 transition-colors ${
                                index === 0 
                                  ? "bg-green-500 border-green-500" 
                                  : "bg-background border-foreground/30 group-hover:border-foreground/60"
                              }`} />
                              
                              <div className="flex-1 min-w-0">
                                <p className="font-mono text-xs text-foreground/80 leading-relaxed line-clamp-2 group-hover:text-foreground transition-colors">
                                  {commit.commit.message.split("\n")[0]}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="font-mono text-[10px] text-foreground/40">
                                    {commit.commit.author.name}
                                  </span>
                                  <span className="text-foreground/20">•</span>
                                  <span className="font-mono text-[10px] text-foreground/40">
                                    {formatDate(commit.commit.author.date)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-foreground/50 text-sm font-mono">No commits found</p>
                  )}
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
