/**
 * Single source of truth for site-wide metadata. Sourced from
 * /Users/mostafa/Desktop/work/personal/resume/resume.tex so the portfolio and
 * the resume always agree.
 */
export const site = {
  url: "https://mostafaghadimi.github.io",
  title: "Mostafa Ghadimi — Senior Data & AI Engineer",
  description:
    "Senior Data & AI Engineer (6+ yrs). Building large-scale data platforms (Kafka, dbt, ClickHouse, Airflow) and production LLM/agentic systems (LangChain, LangGraph).",
  keywords: [
    "Mostafa Ghadimi",
    "Data Engineer",
    "AI Engineer",
    "LangChain",
    "LangGraph",
    "ClickHouse",
    "Apache Kafka",
    "dbt",
    "Airflow",
    "Kubernetes",
    "Senior Data Engineer",
    "Tech Lead",
    "Platform Engineer",
  ],
  author: {
    name: "Mostafa Ghadimi",
    role: "Senior Data & AI Engineer · Tech Lead · Platform & AI",
    location: "Istanbul, Türkiye",
    availability: "Open to Remote",
    currentCompany: "Vendoroo",
    email: "mostafa.ghadimi76@gmail.com",
    phone: "+98 912 072 7175",
    github: "mostafaghadimi",
    githubOrg: "data-burst",
    linkedin: "mostafaghadimi",
    telegram: "MostafaGhadimii",
    stackoverflow: "7310077/mostafa-ghadimi",
  },
} as const;

export type Site = typeof site;
