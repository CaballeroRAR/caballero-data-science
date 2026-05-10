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
  title: { en: string; es: string };
  category: string;
  year: string;
  description: { en: string; es: string };
  skills: string[];
  demoUrl?: string;
  githubUrl?: string;
  gallery: GalleryItem[];
}

export const projectsData: Project[] = [
  {
    id: 7,
    title: {
      en: "Reddit Astroturfing NLP Analysis",
      es: "Análisis NLP de Astroturfing en Reddit"
    },
    category: "NLP & Data Engineering",
    year: "2026",
    description: {
      en: "End-to-end pipeline designed to scrape, enrich, and ingest Reddit comments to analyze potential astroturfing campaigns. Features local scraping to bypass API limits, data consolidation, and automated ingestion into Google Cloud BigQuery for NLP modeling.",
      es: "Pipeline de extremo a extremo diseñado para extraer, enriquecer e ingerir comentarios de Reddit para analizar posibles campañas de astroturfing. Cuenta con extracción local para evitar límites de API, consolidación de datos e ingesta automatizada en Google Cloud BigQuery para modelado NLP."
    },
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
    title: {
      en: "Industrial Bitcoin Forecasting HUD",
      es: "HUD de Pronóstico Industrial de Bitcoin"
    },
    category: "Deep Learning & XAI",
    year: "2026",
    description: {
      en: "High-precision Bitcoin price projection engine using a stacked LSTM architecture with Monte Carlo Dropout uncertainty estimation. Synthesizes multi-source data (VADER Sentiment, Google Trends, Macro-Ratios) into a grounded 30-day forecast trajectory.",
      es: "Motor de proyección de precios de Bitcoin de alta precisión que utiliza una arquitectura LSTM apilada con estimación de incertidumbre Monte Carlo Dropout. Sintetiza datos de múltiples fuentes (VADER Sentiment, Google Trends, Macro-Ratios) en una trayectoria de pronóstico de 30 días fundamentada."
    },
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
    title: {
      en: "ML Pipeline Migration to BigQuery",
      es: "Migración de Pipeline de ML a BigQuery"
    },
    category: "Cloud Native ML",
    year: "2026",
    description: {
      en: "End-to-end migration of a machine learning pipeline to Google Cloud Platform. Leverages BigQuery ML for scalable training and SQL-based feature engineering, transitioning from local processing to a cloud-native architecture.",
      es: "Migración de extremo a extremo de un pipeline de aprendizaje automático a Google Cloud Platform. Aprovecha BigQuery ML para entrenamiento escalable e ingeniería de características basada en SQL, pasando del procesamiento local a una arquitectura nativa en la nube."
    },
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
    title: {
      en: "Customer Segmentation (KMeans)",
      es: "Segmentación de Clientes (KMeans)"
    },
    category: "Machine Learning (Unsupervised)",
    year: "2025",
    description: {
      en: "End-to-end customer segmentation pipeline using RFM analysis and K-Means clustering to identify high-value wholesaler segments and optimize marketing strategies.",
      es: "Pipeline de segmentación de clientes de extremo a extremo que utiliza análisis RFM y clustering K-Means para identificar segmentos de mayoristas de alto valor y optimizar las estrategias de marketing."
    },
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
    title: {
      en: "Employee Salary Analysis",
      es: "Análisis de Salarios de Empleados"
    },
    category: "Statistical Analysis",
    year: "2025",
    description: {
      en: "Exploratory analysis on compensation patterns to quantify impact of experience, education, and role on salary structures for HR strategy.",
      es: "Análisis exploratorio sobre patrones de compensación para cuantificar el impacto de la experiencia, la educación y el rol en las estructuras salariales para la estrategia de RR.HH."
    },
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
    title: {
      en: "Gold Recovery Prediction",
      es: "Predicción de Recuperación de Oro"
    },
    category: "Machine Learning",
    year: "2025",
    description: {
      en: "End-to-end regression pipeline to predict gold recovery rates and optimize industrial flotation processes. Identifies optimal parameters for reagent concentration and particle size.",
      es: "Pipeline de regresión de extremo a extremo para predecir las tasas de recuperación de oro y optimizar los procesos de flotación industrial. Identifica los parámetros óptimos para la concentración de reactivos y el tamaño de partícula."
    },
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
    title: {
      en: "A/B Testing, UI Change",
      es: "A/B Testing, Cambio de UI"
    },
    category: "Statistical Analysis",
    year: "2025",
    description: {
      en: "Designed a hypothesis test with tailored alpha=0.10 for a low-risk UI experiment, prioritizing sensitivity over false positive risk. The test revealed a dramatic conversion increase from 19.9% to over 61%.",
      es: "Diseñó una prueba de hipótesis con un alfa adaptado de 0.10 para un experimento de UI de bajo riesgo, priorizando la sensibilidad sobre el riesgo de falsos positivos. La prueba reveló un aumento dramático en la conversión de 19.9% a más del 61%."
    },
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
