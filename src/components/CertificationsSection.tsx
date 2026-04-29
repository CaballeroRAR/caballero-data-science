import { SectionNumber } from "./ui/SectionNumber";
import SectionTitle from "./ui/SectionTitle";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  link: string;
}

const CERTIFICATIONS: Certification[] = [
  {
    title: "ETL Processing on Google Cloud Using Dataflow and BigQuery",
    issuer: "Google Cloud",
    date: "2025",
    description: "Built serverless data pipelines on Google Cloud Platform. Developed Python data pipelines to ingest, process, and load datasets into BigQuery using Dataflow.",
    skills: ["Python", "Google Cloud Platform", "Dataflow", "BigQuery", "ETL"],
    link: "#", // Placeholder for GDrive PDF
  },
  {
    title: "Data Science Methodology",
    issuer: "IBM",
    date: "2023",
    description: "Mastered the CRISP-DM framework. Application of the end-to-end CRISP-DM methodology used to structure ML projects from business problem to deployment.",
    skills: ["CRISP-DM", "Machine Learning", "Data Science methodology", "Project Lifecycle"],
    link: "#", // Placeholder for GDrive PDF
  },
  {
    title: "Construction Project Management",
    issuer: "Columbia University",
    date: "2022",
    description: "Fundamentals of construction management, LEAN projects, and sustainability. Mastered management for construction industry, contract types, and project delivery methods.",
    skills: ["LEAN", "Project Management", "Construction Analytics", "Budgeting"],
    link: "#", // Placeholder for GDrive PDF
  },
];

const AnimatedCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="border border-foreground/10 p-6 md:p-8 bg-surface-elevated relative group hover:border-foreground/30 transition-all duration-300 flex flex-col justify-between"
    >
      {children}
    </motion.div>
  );
};

const CertificationsSection = () => {
  return (
    <section id="certifications" className="py-16 md:py-32 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className="lg:grid lg:grid-cols-[10rem_minmax(0,1fr)] lg:gap-12">
          <div className="hidden lg:flex justify-end pt-8">
            <SectionNumber number="05" className="text-muted/80" />
          </div>

          <div>
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-10 md:mb-16">
              <SectionTitle sectionId="certifications">Certifications</SectionTitle>
              <div className="flex-1 h-px bg-foreground/20" />
              <span className="font-mono text-xs text-foreground/60">
                {CERTIFICATIONS.length} CREDENTIALS
              </span>
            </div>

            {/* Grid of Certifications */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {CERTIFICATIONS.map((cert, index) => (
                <AnimatedCard key={index} index={index}>
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <Award className="w-8 h-8 text-foreground/40 group-hover:text-foreground/80 transition-colors" />
                      <span className="font-mono text-xs text-foreground/40">
                        {cert.date}
                      </span>
                    </div>

                    <h3 className="font-display text-lg md:text-xl font-medium mb-1 group-hover:text-foreground transition-colors">
                      {cert.title}
                    </h3>
                    
                    <p className="font-mono text-[10px] md:text-xs text-foreground/60 uppercase tracking-widest mb-4">
                      {cert.issuer}
                    </p>

                    <p className="font-body text-xs md:text-sm text-foreground/70 leading-relaxed mb-6">
                      {cert.description}
                    </p>
                  </div>

                  <div>
                    {/* Related Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-1.5 py-0.5 border border-foreground/10 font-mono text-[9px] uppercase tracking-wider text-foreground/60 bg-foreground/5"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* PDF Link Placeholder */}
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-mono text-xs text-foreground bg-foreground/10 hover:bg-foreground hover:text-background px-3 py-2 border border-foreground/20 transition-all duration-300 w-full justify-center group-hover:border-foreground"
                    >
                      <span>View Credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-foreground/20 group-hover:border-foreground/50 pointer-events-none transition-colors" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-foreground/20 group-hover:border-foreground/50 pointer-events-none transition-colors" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-foreground/20 group-hover:border-foreground/50 pointer-events-none transition-colors" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-foreground/20 group-hover:border-foreground/50 pointer-events-none transition-colors" />
                </AnimatedCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
