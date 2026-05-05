// Project assets
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
import btcDashboardImg from "@/assets/img/btc-dashboard.png";
import btcXAIImg from "@/assets/img/btc-xai.png";
import btcModelImg from "@/assets/img/btc-model.png";
import segmentDriftImg from "@/assets/img/segment-drift.png";

import btcHud1 from "@/assets/img/WORK_GALLERY_IMG/btc-hud-preview-1.png";
import btcHud2 from "@/assets/img/WORK_GALLERY_IMG/btc-hud-preview-2.png";
import btcHud3 from "@/assets/img/WORK_GALLERY_IMG/btc-hud-preview-3.png";
import btcHud4 from "@/assets/img/WORK_GALLERY_IMG/btc-hud-preview-4.png";
import astroturfingPipelineImg from "@/assets/img/WORK_GALLERY_IMG/astroturfing-pipeline.png";
import commentDensityMapImg from "@/assets/img/WORK_GALLERY_IMG/comment-density-map.png";
import narrativeVolumeImg from "@/assets/img/WORK_GALLERY_IMG/coordinated-narrative-volume-over-time.png";


export interface GalleryItem {
  id: number;
  text: string;
  image: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  skills: string[];
  demoUrl?: string;
  githubUrl?: string;
  gallery: GalleryItem[];
}

export const projectsData: Project[] = [
  {
    id: 7,
    title: "Reddit Astroturfing NLP Analysis",
    category: "NLP & Data Engineering",
    year: "2026",
    description: "End-to-end pipeline designed to scrape, enrich, and ingest Reddit comments to analyze potential astroturfing campaigns. Features local scraping to bypass API limits, data consolidation, and automated ingestion into Google Cloud BigQuery for NLP modeling.",
    skills: ["Python", "GCP", "BigQuery", "Data Engineering", "Pandas", "NLP"],
    githubUrl: "https://github.com/CaballeroRAR/ds_projects_collabs/tree/main/2-nlp-astroturfing-report",
    gallery: [
      { id: 1, text: "Pipeline architecture showing local scraping and cloud ingestion layers.", image: astroturfingPipelineImg },
      { id: 2, text: "Comment density map used to identify bursty, non-organic activity patterns.", image: commentDensityMapImg },
      { id: 3, text: "Coordinated narrative volume analysis tracking signal synchronization across subreddits.", image: narrativeVolumeImg }
    ]
  },
  {

    id: 6,
    title: "Industrial Bitcoin Forecasting HUD",
    category: "Deep Learning & XAI",
    year: "2026",
    description: "High-precision Bitcoin price projection engine using a stacked LSTM architecture with Monte Carlo Dropout uncertainty estimation. Synthesizes multi-source data (VADER Sentiment, Google Trends, Macro-Ratios) into a grounded 30-day forecast trajectory.",
    skills: ["Python", "TensorFlow", "Keras", "GCP", "Streamlit", "XAI", "MLOps"],
    demoUrl: "https://btc-dashboard-213564252081.us-central1.run.app",
    githubUrl: "https://github.com/CaballeroRAR/btc-predictor",
    gallery: [
      { id: 1, text: "Real-time market analysis: Pulse Injection for reacting to intraday breakouts.", image: btcDashboardImg },
      { id: 2, text: "Explainable AI engine tracking signal provenance across Firestore collections.", image: btcXAIImg },
      { id: 3, text: "Monte Carlo Dropout simulation (50 iterations) used to quantify statistical uncertainty.", image: btcModelImg }
    ]
  },
  {
    id: 5,
    title: "ML Pipeline Migration to BigQuery",
    category: "Cloud Native ML",
    year: "2026",
    description: "End-to-end migration of a machine learning pipeline to Google Cloud Platform. Leverages BigQuery ML for scalable training and SQL-based feature engineering, transitioning from local processing to a cloud-native architecture.",
    skills: ["Google Cloud Platform", "BigQuery ML", "SQL", "ETL", "Python"],
    demoUrl: "https://prometheus-frontend-kc2uauqyrq-uc.a.run.app/",
    githubUrl: "https://github.com/CaballeroRAR/ds_projects/tree/main/1_ml-pipeline-migration-bigquery",
    gallery: [
      { id: 1, text: "End-to-End GCP pipeline using BigQuery and Vertex AI.", image: cleaningDiagramImg },
      { id: 2, text: "Distribution analysis of RFM features within clusters.", image: pcaComparisonImg },
      { id: 3, text: "Analysis of cluster stability based on RFM tracking.", image: segmentDriftImg }
    ]
  },
  {
    id: 4,
    title: "Customer Segmentation (KMeans)",
    category: "Machine Learning (Unsupervised)",
    year: "2025",
    description: "End-to-end customer segmentation pipeline using RFM analysis and K-Means clustering to identify high-value wholesaler segments and optimize marketing strategies.",
    githubUrl: "https://github.com/CaballeroRAR/ds_projects_collabs/tree/main/1-cluster_retail_uci",
    skills: ["Python", "Scikit-learn", "RFM Analysis", "K-Means", "PCA"],
    gallery: [
      { id: 1, text: "Modular cleaning pipeline ensuring data quality and reproducibility.", image: cleaningDiagramImg },
      { id: 2, text: "Analysis of segment sizes and volume distribution.", image: clusterDistributionImg },
      { id: 3, text: "Comparison of features across different customer segments.", image: clusterMeansImg }
    ]
  },
  {
    id: 3,
    title: "Employee Salary Analysis",
    category: "Statistical Analysis",
    year: "2025",
    description: "Exploratory analysis on compensation patterns to quantify impact of experience, education, and role on salary structures for HR strategy.",
    githubUrl: "https://lnkd.in/eaUVU9yg",
    skills: ["EDA", "Data Visualization", "Statistical Analysis", "KMeans", "PCA"],
    gallery: [
      { id: 1, text: "First glance at the dataset structures.", image: salaryEDAImg },
      { id: 2, text: "Distribution of salaries per age, describing data skewness.", image: meanSalaryPerAge },
      { id: 3, text: "Employee distribution across departments and salary impact.", image: distributionImg }
    ]
  },
  {
    id: 2,
    title: "Gold Recovery Prediction",
    category: "Machine Learning",
    year: "2025",
    description: "End-to-end regression pipeline to predict gold recovery rates and optimize industrial flotation processes. Identifies optimal parameters for reagent concentration and particle size.",
    githubUrl: "https://lnkd.in/eZMdm3_V",
    skills: ["Regression Modeling", "Feature Engineering", "Ensemble Methods", "Random Forest"],
    gallery: [
      { id: 1, text: "Cleaned multi-stage process data calculating metallurgical recovery rates.", image: goldrecoveryEDAImg },
      { id: 2, text: "Distribution of metals across different stages of the process.", image: concentrationperStageImg },
      { id: 3, text: "Finding optimal hyperparameters for LinearRegression.", image: goldhyperparameterImg }
    ]
  },
  {
    id: 1,
    title: "A/B Testing, UI Change",
    category: "Statistical Analysis",
    year: "2025",
    description: "Designed a hypothesis test with tailored alpha=0.10 for a low-risk UI experiment, prioritizing sensitivity over false positive risk. The test revealed a dramatic conversion increase from 19.9% to over 61%.",
    githubUrl: "https://lnkd.in/gpcmjuuW",
    skills: ["Python", "Statsmodels", "Jupyter Notebook", "Statistical Testing"],
    gallery: [
      { id: 1, text: "Evaluating implementation risk variables against sensitive conversion rates.", image: businessContextImg },
      { id: 2, text: "Treatment metrics proving conversion metrics scaled to over 61%.", image: conversionStatImg },
      { id: 3, text: "Testing power simulations mapping baseline control segments.", image: hyperparameterImg }
    ]
  }
];

export const liveInferenceImages = [btcHud1, btcHud2, btcHud3, btcHud4];

export const tensorNodes = [
  { id: "X1", x: 40, y: 100, type: "input", label: "MACRO_RATIOS" },
  { id: "X2", x: 40, y: 180, type: "input", label: "SENTIMENT_V" },
  { id: "X3", x: 40, y: 260, type: "input", label: "HISTORICAL_P" },
  { id: "H1", x: 160, y: 70, type: "hidden", label: "LSTM_L1" },
  { id: "H2", x: 160, y: 140, type: "hidden", label: "LSTM_L2" },
  { id: "H3", x: 160, y: 210, type: "hidden", label: "LSTM_L3" },
  { id: "H4", x: 160, y: 280, type: "hidden", label: "LSTM_L4" },
  { id: "Y1", x: 280, y: 180, type: "output", label: "PRICE_FCST" },
];

export const tensorLinks = [
  { from: "X1", to: "H1" },
  { from: "X1", to: "H2" },
  { from: "X2", to: "H2" },
  { from: "X2", to: "H3" },
  { from: "X3", to: "H3" },
  { from: "X3", to: "H4" },
  { from: "H1", to: "Y1" },
  { from: "H2", to: "Y1" },
  { from: "H3", to: "Y1" },
  { from: "H4", to: "Y1" },
];

export const logPool = [
  "EXEC: FETCHING MACRO_RATIOS...",
  "EXEC: PARSING SENTIMENT_V...",
  "EXEC: LOADING HISTORICAL_P...",
  "COMPILING WEIGHTS [L1/L2/L3/L4]...",
  "WARN: DRIFT DETECTED - RE-GROUNDING",
  "SUCCESS: PREDICTION TRAJECTORY COMPILED",
  "METRIC: L2 LOSS -> 0.0421",
  "STATUS: LATENCY < 14MS",
  "CHECK: DATA INTEGRITY 100%",
];
