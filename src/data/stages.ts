/**
 * Each section of the page is a "stage" in the visualised data pipeline.
 * The PipelineRail, SectionHeading, and the hero diagram all use this list
 * as the single source of truth.
 */
export type StageId =
  | "intro"
  | "about"
  | "experience"
  | "projects"
  | "open-source"
  | "skills"
  | "education"
  | "contact";

export type StageKey =
  | "source"
  | "stream"
  | "store"
  | "serve"
  | "agent"
  | "sink";

export interface Stage {
  id: StageId;
  index: string; // "00", "01", ...
  label: string;
  hint: string;
  stage: StageKey;
  cmd: string;
}

export const stages: Stage[] = [
  {
    id: "intro",
    index: "00",
    label: "Intro",
    hint: "the source",
    stage: "source",
    cmd: "$ kafka-console-consumer --topic profile",
  },
  {
    id: "about",
    index: "01",
    label: "About",
    hint: "the engineer",
    stage: "source",
    cmd: "$ cat README.md",
  },
  {
    id: "experience",
    index: "02",
    label: "Experience",
    hint: "the topic log",
    stage: "stream",
    cmd: "$ kafka-console-consumer --topic experience --from-beginning",
  },
  {
    id: "projects",
    index: "03",
    label: "Case Studies",
    hint: "the warehouse",
    stage: "store",
    cmd: "$ dbt run --select marts.projects",
  },
  {
    id: "open-source",
    index: "04",
    label: "Open Source",
    hint: "the registry",
    stage: "serve",
    cmd: "$ gh repo list --json name,stars",
  },
  {
    id: "skills",
    index: "05",
    label: "Skills",
    hint: "the schema",
    stage: "serve",
    cmd: "$ \\d+ public.skills",
  },
  {
    id: "education",
    index: "06",
    label: "Education",
    hint: "the lineage",
    stage: "agent",
    cmd: "$ datahub lineage --upstream",
  },
  {
    id: "contact",
    index: "07",
    label: "Contact",
    hint: "the sink",
    stage: "sink",
    cmd: "$ echo $EMAIL",
  },
];
