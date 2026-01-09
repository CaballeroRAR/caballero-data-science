import { useState } from "react";
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
import { SectionNumber } from "./ui/SectionNumber";

const projects = [
  {
    id: 1,
    title: "A/B Testing, UI Change",
    category: "Statistical Analysis",
    description: "Designed a hypothesis test with tailored α=0.10 for a low-risk UI experiment, prioritizing sensitivity over false positive risk. The test revealed a dramatic conversion increase from 19.9% to over 61%.",
    skills: ["Python", "Statsmodels", "Jupyter Notebook", "Statistical Testing", "Power Analysis"],
    link: "https://lnkd.in/gpcmjuuW",
    year: "2025",
    gallery: [
      {
        id: 1,
        placeholder: "Business Rationale | Parameter Selection",
        modalText: (
          <>
            To evaluate this low-risk UI change, taking into account the following business context:
            <ul className="list-disc list-inside text-left mt-2 space-y-1">
              <li>Test Type: Minor UI button tweak (low implementation cost)</li>
              <li>Primary Risk Concern: Missing a real improvement &gt; Cost of false positive</li>
              <li>Current Performance: 19.9% conversion rate (clicks)</li>
              <li>Business Goal: Increase non-client to client conversions</li>
            </ul>
          </>
        ),
        image: businessContextImg,
      },
      { id: 2, placeholder: "Conversion Statistics", modalText: "The control group had a 19.9% conversion rate, while the treatment group achieved over 61%, demonstrating a statistically significant improvement. Thus the implementation is suggested.", image: conversionStatImg },
      { id: 3, placeholder: "Groups Visualization", modalText: "Visual comparison of conversion rates between control and treatment groups, clearly showing the dramatic improvement from the UI change.", image: hyperparameterImg },
    ],
  },
  {
    id: 2,
    title: "Gold Recovery Prediction",
    category: "Machine Learning",
    description: "Developed an end-to-end regression pipeline to predict gold recovery rates and optimize industrial flotation processes. The model identifies optimal parameter ranges for reagent concentration and particle size to maximize extraction efficiency and reduce waste.",
    skills: ["Regression Modeling", "Feature Engineering", "Ensemble Methods", "Linear Regression", "Random Forest Regression", "Decision Tree Regression", "Custom Metrics (sMAPE)"],
    link: "https://lnkd.in/eZMdm3_V",
    year: "2025",
    gallery: [
      {
        id: 1,
        placeholder: "EDA & Feature Engineering",
        modalText: (
          <>
            Processed industrial production data by cleaning, engineering key features like recovery rates, and removing outliers. The refined dataset was then segmented by specific process stages for targeted analysis and modeling.
            <ul className="list-disc list-inside text-left mt-2 space-y-1">
              <li>Cleaned multi-stage process data with Pandas: handled missing values and anomalies</li>
              <li>Feature engineering: calculated recovery rates using metallurgical formulas</li>
              <li>Removed outliers in concentration measurements</li>
              <li>Split data by process stages (rougher, primary cleaner, final)</li>
            </ul>
          </>
        ),
        image: goldrecoveryEDAImg,
      },
      { id: 2, placeholder: "Data Visualization", modalText: "By grouping the data given, it is possible to visualize the distribution of the three different metals in the different stages of the process.", image: concentrationperStageImg },
      { id: 3, placeholder: "Hyperparameter Tunning with MAE", modalText: "Output of the custom function to find the best hyperparameters for a LinearRegression model", image: goldhyperparameterImg },
    ],
  },
  {
    id: 3,
    title: "Employee Salary Analysis",
    category: "Statistical Analysis",
    description: "Conducted exploratory data analysis on compensation patterns to quantify the impact of experience, education, and role on salary structures. Delivered visual benchmarks and statistical insights to support HR strategy and talent acquisition planning.",
    skills: ["Exploratory Data Analysis (EDA)", "Data Visualization", "Statistical Analysis", "Business Analytics", "Data Cleaning", "KMeans Clustering", "Principal Component Analysis (PCA)"],
    link: "https://lnkd.in/eaUVU9yg",
    year: "2025",
    gallery: [
      { id: 1, placeholder: "EDA Overview", modalText: "First glance to the dataset.", image: salaryEDAImg },
      { id: 2, placeholder: "Mean Salary by Age", modalText: "Visualization of distribution of salaries per age. This graphice allows to describe skewness of the data.", image: meanSalaryPerAge },
      { id: 3, placeholder: "Distribution of employees", modalText: "Quick glance to how are employees distributed in the different departments, whats the impact of the department salary-wise.", image: distributionImg },
      { id: 4, placeholder: "KMeans Clustering with PCA", modalText: "Visualization of the KMeans Clustering using the PCA method", image: kmeansImg },
    ],
  },
];

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<{ image: string; text: React.ReactNode } | null>(null);

  return (
    <section id="projects" className="py-32 bg-background text-foreground relative">
      <div className="container mx-auto px-6 lg:px-12 relative">
        {/* Blueprint number */}
        <SectionNumber number="03" className="absolute -left-4 lg:left-0 top-0 text-muted/80" />
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
                  <div
                    className={`font-body text-sm text-foreground/70 transition-opacity duration-300 ${
                      hoveredProject === project.id ? "opacity-100" : "opacity-60"
                    }`}
                  >
                    {project.description}
                  </div>
                </div>

                {/* Year */}
                <div className="lg:col-span-2 text-right">
                  <span className="font-mono text-sm text-foreground/40">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Skills & Gallery - shown on hover */}
              <div
                className={`grid lg:grid-cols-12 gap-6 lg:gap-8 mt-6 overflow-hidden transition-all duration-500 ${
                  hoveredProject === project.id ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="lg:col-start-2 lg:col-span-10 space-y-4">
                  {/* Skills */}
                  <div className="flex flex-wrap gap-3">
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

                  {/* Gallery */}
                  <div className="flex gap-3 mt-4">
                    {project.gallery.map((item, idx) => (
                      <div
                        key={item.id}
                        className={`relative w-32 h-20 bg-muted border border-foreground/20 overflow-hidden group/gallery ${
                          item.image ? "cursor-pointer" : ""
                        }`}
                        style={{ animationDelay: `${idx * 100}ms` }}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.image) setSelectedImage({ image: item.image, text: item.modalText || item.placeholder });
                        }}
                      >
                        {/* Placeholder content - shown when no image */}
                        {!item.image && (
                          <>
                            <div className="absolute inset-0 grid-pattern-dense opacity-30" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="font-mono text-[10px] text-foreground/50 text-center px-2">
                                {item.placeholder}
                              </span>
                            </div>
                          </>
                        )}
                        {/* Image with click-to-view text overlay */}
                        {item.image && (
                          <>
                            <img
                              src={item.image}
                              alt={item.placeholder}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            {/* Click to view overlay */}
                            <div className="absolute inset-0 bg-background/80 opacity-0 group-hover/gallery:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                              <span className="font-mono text-[10px] text-foreground/90 text-center px-2 mb-1">
                                {item.placeholder}
                              </span>
                              <span className="font-mono text-[8px] text-foreground/60 uppercase tracking-wider">
                                Click to view
                              </span>
                            </div>
                          </>
                        )}
                        {/* Frame corners */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-foreground/40" />
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-foreground/40" />
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-foreground/40" />
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-foreground/40" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom border */}
        <div className="border-t border-foreground/20 mt-1" />
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full flex flex-col items-center justify-center">
            <img 
              src={selectedImage.image} 
              alt="Project detail" 
              className="max-w-full max-h-[80vh] object-contain border border-foreground/20 shadow-2xl"
            />
            <div className="mt-4 text-center max-w-2xl px-4">
              <div className="font-body text-sm text-foreground/80">
                {selectedImage.text}
              </div>
            </div>
            <button className="absolute top-4 right-4 md:-top-12 md:right-0 text-foreground hover:text-foreground/70 transition-colors">
              <span className="font-mono text-sm uppercase tracking-widest">Close</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
