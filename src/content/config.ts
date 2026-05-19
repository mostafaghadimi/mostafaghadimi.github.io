import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";

const experience = defineCollection({
  loader: file("src/data/experience.json"),
  schema: z.object({
    id: z.string(),
    company: z.string(),
    role: z.string(),
    location: z.string(),
    period: z.object({
      start: z.string(),
      end: z.string().nullable(),
      label: z.string(),
    }),
    context: z.string(),
    bullets: z.array(z.string()).min(1),
    tags: z.array(z.string()).default([]),
    href: z.string().url().optional(),
  }),
});

const projects = defineCollection({
  loader: file("src/data/projects.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string(),
    company: z.string(),
    period: z.string(),
    summary: z.string(),
    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .min(1)
      .max(4),
    stack: z.array(z.string()).min(1),
    accentColor: z
      .enum(["violet", "emerald", "amber", "sky", "rose"])
      .default("violet"),
  }),
});

const repos = defineCollection({
  loader: file("src/data/repos.json"),
  schema: z.object({
    id: z.string(),
    full_name: z.string(), // e.g. "data-burst/data-engineering-roadmap"
    description: z.string(),
    language: z.string().nullable().default(null),
    stargazers_count: z.number().int().default(0),
    forks_count: z.number().int().default(0),
    html_url: z.string().url(),
    featured: z.boolean().default(false),
  }),
});

const skills = defineCollection({
  loader: file("src/data/skills.json"),
  schema: z.object({
    id: z.string(),
    category: z.string(),
    items: z.array(z.string()).min(1),
  }),
});

const education = defineCollection({
  loader: file("src/data/education.json"),
  schema: z.object({
    id: z.string(),
    degree: z.string(),
    school: z.string(),
    detail: z.string().optional(),
    location: z.string(),
    period: z.string(),
  }),
});

const awards = defineCollection({
  loader: file("src/data/awards.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    source: z.string(),
    location: z.string().optional(),
    year: z.string(),
  }),
});

const certifications = defineCollection({
  loader: file("src/data/certifications.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    issuer: z.string(),
    location: z.string().optional(),
    date: z.string(),
  }),
});

export const collections = {
  experience,
  projects,
  repos,
  skills,
  education,
  awards,
  certifications,
};
