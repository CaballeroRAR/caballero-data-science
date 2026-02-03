import { useState, useEffect, useCallback } from "react";
import { SectionNumber } from "./ui/SectionNumber";
import SectionTitle from "./ui/SectionTitle";
import {
  GitBranch,
  ExternalLink,
  FileText,
  Users,
  Loader2,
  GitCommit,
  ImageOff,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import galleryImg1 from "@/assets/img/WORK_GALLERY_IMG/cleaning-pipeline-diagram.svg";
import galleryImg2 from "@/assets/img/WORK_GALLERY_IMG/image_2026-01-22_23-12-32.png";
import galleryImg3 from "@/assets/img/WORK_GALLERY_IMG/image_2026-01-22_23-12-45.png";
import galleryImg4 from "@/assets/img/WORK_GALLERY_IMG/cluster_means_comparison.png";
import galleryImg5 from "@/assets/img/WORK_GALLERY_IMG/3d_preview.png";
// Gallery images - add more images here as needed
const GALLERY_IMAGES = [
  { src: galleryImg1, alt: "Cleaning Pipeline Diagram" },
  { src: galleryImg2, alt: "Project Preview 2" },
  { src: galleryImg3, alt: "Project Preview 3" },
  { src: galleryImg4, alt: "Cluster Means Comparison" },
  { src: galleryImg5, alt: "Distribution of RFM Data before Clustering" },
];

const AUTOPLAY_INTERVAL = 4000; // 4 seconds

const REPO_URL = "https://github.com/CaballeroRAR/ds_projects_collabs";
const README_RAW_URL =
  "https://raw.githubusercontent.com/CaballeroRAR/ds_projects_collabs/main/1-cluster_retail_uci/README.md";
const COMMITS_API_URL =
  "https://api.github.com/repos/CaballeroRAR/ds_projects_collabs/commits?per_page=7";

const PROJECT_INFO = {
  title: "Customer Clustering for Retail Insights",
  subtitle: "Collaborative Unsupervised Learning Project",
  description:
    "Collaborative data science project applying RFM analysis and clustering algorithms (K-Means, DBSCAN) to UCI Online Retail transactional data. Identifies actionable customer segments to drive targeted marketing and retention strategies.",
  status: "In Progress",
  collaborators: 2,
  technologies: [
    "Python",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "K-Means",
    "DBSCAN",
    "PCA",
    "Matplotlib",
    "Seaborn",
  ],
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

const CurrentWorkSection = () => {
  const [readme, setReadme] = useState<string | null>(null);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCommits, setIsLoadingCommits] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Gallery navigation
  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }, []);

  // Autoplay effect
  useEffect(() => {
    if (isPaused || GALLERY_IMAGES.length <= 1) return;
    
    const interval = setInterval(goToNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [readmeRes, commitsRes] = await Promise.all([
          fetch(README_RAW_URL),
          fetch(COMMITS_API_URL),
        ]);

        if (readmeRes.ok) {
          const text = await readmeRes.text();
          setReadme(text);
        } else {
          setError("Could not load README");
        }

        if (commitsRes.ok) {
          const data = await commitsRes.json();
          setCommits(data);
        }
      } catch (err) {
        setError("Could not load README");
        console.error(err);
      } finally {
        setIsLoading(false);
        setIsLoadingCommits(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section id="current-work" className="py-16 md:py-32 bg-surface-elevated relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="lg:grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-12">
          <div className="hidden lg:flex justify-end pt-8">
            <SectionNumber number="03.5" className="text-muted/80" />
          </div>

          <div>
            {/* Section header */}
            <div className="flex items-center gap-4 mb-10 md:mb-16">
              <SectionTitle>Current Work</SectionTitle>
              <div className="flex-1 h-px bg-foreground/20" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-mono text-[10px] md:text-xs text-green-500/80 uppercase">
                  {PROJECT_INFO.status}
                </span>
              </div>
            </div>

            {/* Project Card */}
            <div className="border border-foreground/20 bg-background relative">
              {/* Header */}
              <div className="p-4 md:p-6 lg:p-8 border-b border-foreground/10">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl mb-2">
                      {PROJECT_INFO.title}
                    </h2>
                    <p className="font-mono text-[10px] md:text-xs text-foreground/60 uppercase tracking-wider">
                      {PROJECT_INFO.subtitle}
                    </p>
                  </div>
                  <a
                    href={REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 md:px-4 py-2 border border-foreground/20 hover:bg-foreground hover:text-background transition-colors duration-300 font-mono text-[10px] md:text-xs uppercase tracking-wider self-start"
                  >
                    <GitBranch className="w-3 md:w-4 h-3 md:h-4" />
                    <span className="hidden sm:inline">View on</span> GitHub
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Preview Gallery Section */}
              <div className="p-4 md:p-6 lg:p-8 border-b border-foreground/10">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <h4 className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
                    Latest Preview
                  </h4>
                  {GALLERY_IMAGES.length > 1 && (
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] text-foreground/40">
                        {currentImageIndex + 1} / {GALLERY_IMAGES.length}
                      </span>
                    </div>
                  )}
                </div>
                <div 
                  className="relative aspect-video bg-surface-elevated border border-dashed border-foreground/20 flex items-center justify-center overflow-hidden"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  {GALLERY_IMAGES.length > 0 ? (
                    <>
                      {/* Image display with fade transition */}
                      <button
                        onClick={() => setIsImageOpen(true)}
                        className="relative group w-full h-full flex items-center justify-center p-2 md:p-4 cursor-zoom-in"
                      >
                        <img
                          key={currentImageIndex}
                          src={GALLERY_IMAGES[currentImageIndex].src}
                          alt={GALLERY_IMAGES[currentImageIndex].alt}
                          className="max-w-full max-h-full object-contain animate-fade-in"
                        />
                        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex items-center gap-2 text-foreground/80">
                            <ZoomIn className="w-5 md:w-6 h-5 md:h-6" />
                            <span className="font-mono text-xs md:text-sm uppercase tracking-wider">
                              Click to expand
                            </span>
                          </div>
                        </div>
                      </button>

                      {/* Navigation arrows */}
                      {GALLERY_IMAGES.length > 1 && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 md:p-2 border border-foreground/20 bg-background/80 backdrop-blur-sm hover:bg-foreground hover:text-background transition-colors duration-200 opacity-0 group-hover:opacity-100"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); goToNext(); }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 md:p-2 border border-foreground/20 bg-background/80 backdrop-blur-sm hover:bg-foreground hover:text-background transition-colors duration-200 opacity-0 group-hover:opacity-100"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </>
                      )}

                      {/* Progress dots */}
                      {GALLERY_IMAGES.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                          {GALLERY_IMAGES.map((_, index) => (
                            <button
                              key={index}
                              onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                              className={`w-1.5 h-1.5 transition-all duration-300 ${
                                index === currentImageIndex 
                                  ? "bg-foreground w-4" 
                                  : "bg-foreground/30 hover:bg-foreground/50"
                              }`}
                              aria-label={`Go to image ${index + 1}`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Autoplay progress bar */}
                      {GALLERY_IMAGES.length > 1 && !isPaused && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground/10">
                          <div 
                            className="h-full bg-foreground/40 animate-[progress_4s_linear_infinite]"
                            style={{ 
                              animation: `progress ${AUTOPLAY_INTERVAL}ms linear infinite`,
                            }}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 md:gap-4">
                      <ImageOff className="w-10 md:w-12 h-10 md:h-12 text-foreground/20" />
                      <p className="font-mono text-xs md:text-sm text-foreground/40 text-center px-4">
                        Latest Preview Not Available :(
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Lightbox Dialog */}
              <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
                <DialogContent className="max-w-[95vw] md:max-w-[90vw] w-full max-h-[90vh] p-4 md:p-8 bg-background border-foreground/20">
                  <VisuallyHidden>
                    <DialogTitle>Project Preview</DialogTitle>
                  </VisuallyHidden>
                  <div className="w-full h-full flex items-center justify-center relative">
                    <img
                      src={GALLERY_IMAGES[currentImageIndex]?.src}
                      alt={GALLERY_IMAGES[currentImageIndex]?.alt || "Project Preview - Full Size"}
                      className="w-full h-auto max-h-[75vh] object-contain"
                    />
                    {/* Lightbox navigation */}
                    {GALLERY_IMAGES.length > 1 && (
                      <>
                        <button
                          onClick={goToPrev}
                          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 md:p-3 border border-foreground/20 bg-background/80 hover:bg-foreground hover:text-background transition-colors duration-200"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={goToNext}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 md:p-3 border border-foreground/20 bg-background/80 hover:bg-foreground hover:text-background transition-colors duration-200"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs text-foreground/60">
                          {currentImageIndex + 1} / {GALLERY_IMAGES.length}
                        </div>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              {/* Content Grid - Top Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Project Info */}
                <div className="p-4 md:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-foreground/10">
                  <p className="font-body text-xs md:text-sm text-foreground/80 leading-relaxed mb-4 md:mb-6">
                    {PROJECT_INFO.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4 md:mb-6">
                    <h4 className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-2 md:mb-3">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {PROJECT_INFO.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-1.5 md:px-2 py-0.5 md:py-1 border border-foreground/20 font-mono text-[9px] md:text-[10px] uppercase tracking-wider text-foreground/70"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Collaborators */}
                  <div className="flex items-center gap-2 text-foreground/60">
                    <Users className="w-3 md:w-4 h-3 md:h-4" />
                    <span className="font-mono text-[10px] md:text-xs">
                      {PROJECT_INFO.collaborators} Collaborators
                    </span>
                  </div>
                </div>

                {/* Commit Timeline */}
                <div className="p-4 md:p-6 lg:p-8 border-b border-foreground/10">
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <GitCommit className="w-3 md:w-4 h-3 md:h-4 text-foreground/60" />
                    <h4 className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
                      Recent Commits
                    </h4>
                  </div>

                  {isLoadingCommits ? (
                    <div className="flex items-center justify-center py-6 md:py-8">
                      <Loader2 className="w-5 md:w-6 h-5 md:h-6 animate-spin text-foreground/40" />
                    </div>
                  ) : commits.length > 0 ? (
                    <div className="relative">
                      <div className="absolute left-[5px] top-2 bottom-2 w-px bg-foreground/10" />
                      <div className="space-y-3 md:space-y-4">
                        {commits.slice(0, 5).map((commit, index) => (
                          <a
                            key={commit.sha}
                            href={commit.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <div className="flex gap-2 md:gap-3 relative">
                              <div
                                className={`w-[9px] md:w-[11px] h-[9px] md:h-[11px] rounded-full border-2 flex-shrink-0 mt-1 z-10 transition-colors ${
                                  index === 0
                                    ? "bg-green-500 border-green-500"
                                    : "bg-background border-foreground/30 group-hover:border-foreground/60"
                                }`}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="font-mono text-[10px] md:text-xs text-foreground/80 leading-relaxed line-clamp-2 group-hover:text-foreground transition-colors">
                                  {commit.commit.message.split("\n")[0]}
                                </p>
                                <div className="flex items-center gap-1.5 md:gap-2 mt-0.5 md:mt-1">
                                  <span className="font-mono text-[9px] md:text-[10px] text-foreground/40 truncate max-w-[80px]">
                                    {commit.commit.author.name}
                                  </span>
                                  <span className="text-foreground/20">•</span>
                                  <span className="font-mono text-[9px] md:text-[10px] text-foreground/40">
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
                    <p className="text-foreground/50 text-xs font-mono">No commits found</p>
                  )}
                </div>
              </div>

              {/* Documentation - Full Width */}
              <div className="p-4 md:p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-4 md:mb-5">
                  <FileText className="w-3 md:w-4 h-3 md:h-4 text-foreground/60" />
                  <h4 className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest">
                    Documentation
                  </h4>
                </div>

                <div className="max-h-[28rem] md:max-h-[36rem] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-foreground/20 scrollbar-track-transparent">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8 md:py-12">
                      <Loader2 className="w-5 md:w-6 h-5 md:h-6 animate-spin text-foreground/40" />
                    </div>
                  ) : error ? (
                    <p className="text-foreground/50 text-sm font-mono">{error}</p>
                  ) : readme ? (
                    <div className="
                      prose prose-sm md:prose-base prose-invert max-w-none
                      prose-headings:font-display prose-headings:text-foreground prose-headings:font-medium
                      prose-h1:text-xl prose-h1:md:text-2xl prose-h1:mb-4 prose-h1:pb-3 prose-h1:border-b prose-h1:border-foreground/10
                      prose-h2:text-lg prose-h2:md:text-xl prose-h2:mt-8 prose-h2:mb-4
                      prose-h3:text-base prose-h3:md:text-lg prose-h3:mt-6 prose-h3:mb-3
                      prose-p:text-sm prose-p:md:text-base prose-p:text-foreground/75 prose-p:leading-relaxed prose-p:mb-4
                      prose-li:text-sm prose-li:md:text-base prose-li:text-foreground/75 prose-li:leading-relaxed prose-li:my-1.5
                      prose-ul:my-4 prose-ul:pl-5 prose-ol:my-4 prose-ol:pl-5
                      prose-code:text-xs prose-code:md:text-sm prose-code:bg-foreground/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono
                      prose-pre:bg-foreground/5 prose-pre:border prose-pre:border-foreground/10 prose-pre:rounded-md prose-pre:p-4 prose-pre:my-5
                      prose-a:text-foreground/80 prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-foreground
                      prose-strong:text-foreground prose-strong:font-semibold
                      prose-blockquote:border-l-2 prose-blockquote:border-foreground/30 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-foreground/60
                      prose-table:text-sm prose-th:text-left prose-th:font-mono prose-th:text-foreground/60 prose-th:pb-2 prose-td:py-2
                      prose-hr:border-foreground/10 prose-hr:my-8
                    ">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
                    </div>
                  ) : null}
                </div>
              </div>

              {/* Frame corners */}
              <div className="absolute top-0 left-0 w-3 md:w-4 h-3 md:h-4 border-t-2 border-l-2 border-foreground/30 pointer-events-none" />
              <div className="absolute top-0 right-0 w-3 md:w-4 h-3 md:h-4 border-t-2 border-r-2 border-foreground/30 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-3 md:w-4 h-3 md:h-4 border-b-2 border-l-2 border-foreground/30 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-3 md:w-4 h-3 md:h-4 border-b-2 border-r-2 border-foreground/30 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentWorkSection;