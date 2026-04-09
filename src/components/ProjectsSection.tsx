import { useState } from "react";
import { SectionNumber } from "./ui/SectionNumber";
import SectionTitle from "./ui/SectionTitle";

// Import images
import businessContextImg from "@/assets/img/business-context.png";
import conversionStatImg from "@/assets/img/conversion-stat.png";
import hyperparameterImg from "@/assets/img/abtesting.png";
import goldrecoveryEDAImg from "@/assets/img/gold-recovery-dataset.png";
import concentrationperStageImg from "@/assets/img/distribucion-concentraciones-stage.png";
import goldhyperparameterImg from "@/assets/img/ajuste-de-hiperparametros.png";
import salaryEDAImg from "@/assets/img/eda-salary-analysis.png";
import meanSalaryPerAge from "@/assets/img/mean-salary-per-age.png";
import distributionImg from "@/assets/img/distribution-of-assets.png";
import kmeansImg from "@/assets/img/cluster-with-elbow-method.png";
import cleaningDiagramImg from "@/assets/img/cleaning-pipeline-diagram.svg";
import clusterDistributionImg from "@/assets/img/cluster-distribution.png";
import clusterMeansImg from "@/assets/img/cluster_means_comparison.png";
import pcaComparisonImg from "@/assets/img/pca-comparison.png";
import segmentDriftImg from "@/assets/img/segment-drift.png";
// import btcDashboardImg from "@/assets/img/btc-dashboard.png";
// import btcXAIImg from "@/assets/img/btc-xai.png";
// import btcModelImg from "@/assets/img/btc-model.png";

interface GalleryItem {
  id: number;
  placeholder: string;
  modalText: React.ReactNode;
  image: string;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  skills: string[];
  link: string;
  year: string;
  gallery: GalleryItem[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "A/B Testing, UI Change",
    category: "Statistical Analysis",
    description:
      "Designed a hypothesis test with tailored α=0.10 for a low-risk UI experiment, prioritizing sensitivity over false positive risk. The test revealed a dramatic conversion increase from 19.9% to over 61%.",
    skills: ["Python", "Statsmodels", "Jupyter Notebook", "Statistical Testing", "Power Analysis"],
    link: "https://lnkd.in/gpcmjuuW",
    year: "2025",
    gallery: [
      {
        id: 1,
        placeholder: "Business Rationale",
        modalText: (
          <>
            To evaluate this low-risk UI change:
            <ul className="list-disc list-inside text-left mt-2 space-y-1">
              <li>Minor UI button tweak (low implementation cost)</li>
              <li>Primary Risk: Missing a real improvement &gt; Cost of false positive</li>
              <li>Current: 19.9% conversion rate</li>
            </ul>
          </>
        ),
        image: businessContextImg,
      },
      {
        id: 2,
        placeholder: "Conversion Stats",
        modalText:
          "Control: 19.9% conversion, Treatment: 61%+ — statistically significant improvement.",
        image: conversionStatImg,
      },
      {
        id: 3,
        placeholder: "Groups Visualization",
        modalText: "Visual comparison of control vs treatment conversion rates.",
        image: hyperparameterImg,
      },
    ],
  },
  {
    id: 2,
    title: "Gold Recovery Prediction",
    category: "Machine Learning",
    description:
      "End-to-end regression pipeline to predict gold recovery rates and optimize industrial flotation processes. Identifies optimal parameters for reagent concentration and particle size.",
    skills: [
      "Regression Modeling",
      "Feature Engineering",
      "Ensemble Methods",
      "Random Forest",
      "Custom Metrics (sMAPE)",
    ],
    link: "https://lnkd.in/eZMdm3_V",
    year: "2025",
    gallery: [
      {
        id: 1,
        placeholder: "EDA & Features",
        modalText: (
          <>
            Processed industrial data:
            <ul className="list-disc list-inside text-left mt-2 space-y-1">
              <li>Cleaned multi-stage process data with Pandas</li>
              <li>Calculated recovery rates using metallurgical formulas</li>
              <li>Split data by process stages</li>
            </ul>
          </>
        ),
        image: goldrecoveryEDAImg,
      },
      {
        id: 2,
        placeholder: "Data Visualization",
        modalText: "Distribution of metals across different stages of the process.",
        image: concentrationperStageImg,
      },
      {
        id: 3,
        placeholder: "Hyperparameter Tuning",
        modalText: "Finding optimal hyperparameters for LinearRegression with MAE.",
        image: goldhyperparameterImg,
      },
    ],
  },
  {
    id: 3,
    title: "Employee Salary Analysis",
    category: "Statistical Analysis",
    description:
      "Exploratory analysis on compensation patterns to quantify impact of experience, education, and role on salary structures for HR strategy.",
    skills: ["EDA", "Data Visualization", "Statistical Analysis", "KMeans Clustering", "PCA"],
    link: "https://lnkd.in/eaUVU9yg",
    year: "2025",
    gallery: [
      {
        id: 1,
        placeholder: "EDA Overview",
        modalText: "First glance at the dataset.",
        image: salaryEDAImg,
      },
      {
        id: 2,
        placeholder: "Salary by Age",
        modalText: "Distribution of salaries per age, describing data skewness.",
        image: meanSalaryPerAge,
      },
      {
        id: 3,
        placeholder: "Distribution",
        modalText: "Employee distribution across departments and salary impact.",
        image: distributionImg,
      },
      {
        id: 4,
        placeholder: "KMeans + PCA",
        modalText: "KMeans Clustering visualization using PCA.",
        image: kmeansImg,
      },
    ],
  },
  {
    id: 4,
    title: "Customer Segmentation (KMeans)",
    category: "Machine Learning (Unsupervised)",
    description:
      "End-to-end customer segmentation pipeline using RFM analysis and K-Means clustering to identify high-value wholesaler segments and optimize marketing strategies.",
    skills: ["Python", "Scikit-learn", "RFM Analysis", "K-Means Clustering", "PCA", "Data Visualization"],
    link: "https://github.com/CaballeroRAR/ds_projects_collabs/tree/main/1-cluster_retail_uci",
    year: "2025",
    gallery: [
      {
        id: 1,
        placeholder: "Cleaning Pipeline",
        modalText: "Modular cleaning pipeline ensuring data quality and reproducibility.",
        image: cleaningDiagramImg,
      },
      {
        id: 2,
        placeholder: "Cluster Distribution",
        modalText: "Analysis of segment sizes and volume distribution.",
        image: clusterDistributionImg,
      },
      {
        id: 3,
        placeholder: "Cluster Comparison",
        modalText: "Comparison of features across different customer segments (after clustering).",
        image: clusterMeansImg,
      }

    ],
  },
  {
    id: 5,
    title: "ML Pipeline Migration to BigQuery",
    category: "Cloud Native Data Warehousing & ML",
    description:
      "End-to-end migration of a machine learning pipeline to Google Cloud Platform. Leverages BigQuery ML for scalable training and SQL-based feature engineering, transitioning from local processing to a cloud-native architecture.",
    skills: ["Google Cloud Platform", "BigQuery ML", "SQL", "ETL", "Python", "Cloud Migration"],
    link: "https://github.com/CaballeroRAR/ds_projects/tree/main/1_ml-pipeline-migration-bigquery",
    year: "2026",
    gallery: [
      {
        id: 1,
        placeholder: "Architecture Diagram",
        modalText: "End-to-End GCP pipeline using BigQuery and Vertex AI.",
        image: cleaningDiagramImg,
      },
      {
        id: 2,
        placeholder: "PCA Visualization",
        modalText: "Distribution analysis of RFM features within clusters.",
        image: pcaComparisonImg,
      },
      {
        id: 3,
        placeholder: "Segment Drift Analysis",
        modalText: "Analysis of cluster stability based on RFM tracking.",
        image: segmentDriftImg,
      },
    ],
  },
/*
  {
    id: 6,
    title: "Bitcoin Predictor: XAI & MLOps",
    category: "Deep Learning & Explainable AI",
    description:
      "Advanced forecasting system featuring a stacked LSTM engine and Explainable AI (XAI) for signal attribution. Implements a 50-iteration Monte Carlo uncertainty model and automated GCP orchestration (Vertex AI/Cloud Run).",
    skills: ["Python", "TensorFlow", "Keras", "GCP", "Streamlit", "XAI", "MLOps", "Vertex AI"],
    link: "https://github.com/CaballeroRAR/btc-predictor",
    year: "2026",
    gallery: [
      {
        id: 1,
        placeholder: "Live Dashboard",
        modalText: (
          <>
            Real-time market analysis:
            <ul className="list-disc list-inside text-left mt-2 space-y-1">
              <li>High-frequency data ingestion from 12 macro signals</li>
              <li>0.5-sigma high-confidence execution channels</li>
              <li>Investment Journal with real-time ROI tracking</li>
            </ul>
          </>
        ),
        image: btcDashboardImg,
      },
      {
        id: 2,
        placeholder: "XAI: Signal Attribution",
        modalText: "Explainable AI engine using Feature Ablation to isolate the USD impact of Macro vs. Psychological market forces.",
        image: btcXAIImg,
      },
      {
        id: 3,
        placeholder: "Prediction Model",
        modalText: "Monte Carlo Dropout simulation (50 iterations) used to quantify statistical uncertainty in volatile markets.",
        image: btcModelImg,
      },
    ],
  },
*/
];

const ProjectsSection = () => {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    image: string;
    text: React.ReactNode;
  } | null>(null);

  // Expand on hover (desktop) or click (mobile)
  const activeProject = hoveredProject ?? expandedProject;

  const handleMouseEnter = (projectId: number) => {
    setHoveredProject(projectId);
  };

  const handleMouseLeave = () => {
    setHoveredProject(null);
  };

  const toggleProject = (projectId: number) => {
    // For mobile: toggle on click
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  return (
    <section id="projects" className="py-16 md:py-32 bg-background text-foreground relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="lg:grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-12">
          <div className="hidden lg:flex justify-end pt-8">
            <SectionNumber number="03" className="text-muted/80" />
          </div>

          <div>
            {/* Section header */}
            <div className="flex items-center gap-4 mb-10 md:mb-16">
              <SectionTitle sectionId="projects">Selected Work</SectionTitle>
              <div className="flex-1 h-px bg-foreground/20" />
              <span className="font-mono text-xs text-foreground/60">
                {projects.length} PROJECTS
              </span>
            </div>

            {/* Projects list */}
            <div className="space-y-1">
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="group border-t border-foreground/20 py-6 md:py-8 cursor-pointer"
                  onClick={() => toggleProject(project.id)}
                  onMouseEnter={() => handleMouseEnter(project.id)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="grid grid-cols-12 gap-4 lg:gap-8 items-start">
                    {/* Number */}
                    <div className="col-span-2 lg:col-span-1">
                      <span className="font-mono text-xs md:text-sm text-foreground/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Title & Category */}
                    <div className="col-span-10 lg:col-span-5">
                      <h3 className="font-display text-xl md:text-2xl lg:text-3xl mb-1 md:mb-2 group-hover:translate-x-2 transition-transform duration-300">
                        {project.title}
                      </h3>
                      <span className="font-mono text-[10px] md:text-xs text-foreground/60 uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>

                    {/* Description - hidden on mobile, shown when expanded */}
                    <div className="hidden lg:block lg:col-span-4">
                      <div
                        className={`font-body text-sm text-foreground/70 transition-opacity duration-300 ${activeProject === project.id ? "opacity-100" : "opacity-60"
                          }`}
                      >
                        {project.description}
                      </div>
                    </div>

                    {/* Year */}
                    <div className="hidden lg:block lg:col-span-2 text-right">
                      <span className="font-mono text-sm text-foreground/40">{project.year}</span>
                    </div>
                  </div>

                  {/* Expanded content */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${activeProject === project.id
                      ? "max-h-[500px] opacity-100 mt-4 md:mt-6"
                      : "max-h-0 opacity-0"
                      }`}
                  >
                    {/* Mobile description */}
                    <p className="lg:hidden font-body text-sm text-foreground/70 mb-4">
                      {project.description}
                    </p>

                    <div className="space-y-4">
                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 md:gap-3">
                        {project.skills.map((skill) => (
                          <div key={skill} className="flex items-center gap-1.5 md:gap-2">
                            <span className="w-1 md:w-1.5 h-1 md:h-1.5 bg-foreground/60" />
                            <span className="font-mono text-[10px] md:text-xs text-foreground/80">
                              {skill}
                            </span>
                          </div>
                        ))}
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 font-mono text-[10px] md:text-xs text-foreground bg-foreground/10 hover:bg-foreground hover:text-background px-2 md:px-3 py-1 md:py-1.5 border border-foreground/20 transition-colors duration-300 ml-auto"
                          >
                            View Project →
                          </a>
                        )}
                      </div>

                      {/* Gallery */}
                      <div className="relative mt-3 md:mt-4">
                        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 snap-x snap-mandatory lg:overflow-visible lg:flex-wrap">
                          {project.gallery.map((item) => (
                            <button
                              key={item.id}
                              className="relative flex-shrink-0 w-28 h-20 md:w-32 md:h-24 bg-muted border border-foreground/20 overflow-hidden group/gallery snap-start active:scale-95 transition-transform"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage({ image: item.image, text: item.modalText });
                              }}
                            >
                              <img
                                src={item.image}
                                alt={item.placeholder}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-background/70 lg:bg-background/80 flex flex-col items-center justify-center opacity-100 lg:opacity-0 lg:group-hover/gallery:opacity-100 transition-opacity duration-300">
                                <span className="font-mono text-[9px] md:text-[10px] text-foreground/90 text-center px-1 md:px-2 line-clamp-2">
                                  {item.placeholder}
                                </span>
                                <span className="font-mono text-[8px] text-foreground/60 uppercase mt-0.5">
                                  Tap
                                </span>
                              </div>
                              {/* Frame corners */}
                              <div className="absolute top-0 left-0 w-1.5 md:w-2 h-1.5 md:h-2 border-t border-l border-foreground/40" />
                              <div className="absolute top-0 right-0 w-1.5 md:w-2 h-1.5 md:h-2 border-t border-r border-foreground/40" />
                              <div className="absolute bottom-0 left-0 w-1.5 md:w-2 h-1.5 md:h-2 border-b border-l border-foreground/40" />
                              <div className="absolute bottom-0 right-0 w-1.5 md:w-2 h-1.5 md:h-2 border-b border-r border-foreground/40" />
                            </button>
                          ))}
                        </div>
                        {/* Scroll fade for mobile */}
                        <div className="lg:hidden pointer-events-none absolute right-0 top-0 bottom-2 w-6 bg-gradient-to-l from-background to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom border */}
            <div className="border-t border-foreground/20 mt-1" />
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full flex flex-col items-center justify-center">
            <img
              src={selectedImage.image}
              alt="Project detail"
              className="max-w-full max-h-[75vh] object-contain border border-foreground/20 shadow-2xl"
            />
            <div className="mt-4 text-center max-w-2xl px-4">
              <div className="font-body text-sm text-foreground/80">{selectedImage.text}</div>
            </div>
            <button className="absolute top-2 right-2 md:-top-10 md:right-0 text-foreground hover:text-foreground/70 transition-colors p-2">
              <span className="font-mono text-xs md:text-sm uppercase tracking-widest">Close</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;