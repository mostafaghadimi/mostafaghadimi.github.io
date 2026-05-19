/**
 * Build-time GitHub repo metadata fetcher with a hand-curated fallback.
 *
 * - Iterates the repos we want to feature (declared in src/data/repos.json).
 * - Calls https://api.github.com/repos/{owner}/{name} for each (unauthenticated
 *   so we stay within the 60 req/hr rate limit; we only have ~10 repos).
 * - If any call fails, returns the seeded JSON as-is.
 *
 * The fetch happens once at build, then the result is precached by the PWA
 * service worker — no client-side API calls at runtime.
 */
import { getCollection } from "astro:content";

export interface RepoCard {
  full_name: string;
  description: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  featured: boolean;
  /** Set when we successfully hit the API; lets us show a "live" footnote. */
  isLive?: boolean;
}

const ENDPOINT = "https://api.github.com/repos/";

async function fetchOne(fullName: string): Promise<Partial<RepoCard> | null> {
  try {
    const res = await fetch(ENDPOINT + fullName, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "mostafaghadimi.github.io build",
      },
    });
    if (!res.ok) {
      console.warn(`[github] ${fullName}: HTTP ${res.status} — using fallback`);
      return null;
    }
    const data = (await res.json()) as {
      description?: string | null;
      language?: string | null;
      stargazers_count?: number;
      forks_count?: number;
      html_url?: string;
    };
    return {
      description: data.description ?? "",
      language: data.language ?? null,
      stargazers_count: data.stargazers_count ?? 0,
      forks_count: data.forks_count ?? 0,
      html_url: data.html_url ?? `https://github.com/${fullName}`,
    };
  } catch (err) {
    console.warn(`[github] ${fullName}: fetch error — using fallback`, err);
    return null;
  }
}

export async function getRepoCards(): Promise<RepoCard[]> {
  const seeded = (await getCollection("repos")).map((r) => r.data as RepoCard);

  // Allow opt-out for local dev (set GITHUB_LIVE=0 to skip network).
  if (process.env.GITHUB_LIVE === "0") {
    return seeded;
  }

  const results = await Promise.all(
    seeded.map(async (seed) => {
      const live = await fetchOne(seed.full_name);
      if (!live) return seed;
      return {
        ...seed,
        // Prefer live where present, fall back to seed (description copy is
        // intentionally curated, so we keep ours over GitHub's).
        description: seed.description || live.description || "",
        language: live.language ?? seed.language,
        stargazers_count: live.stargazers_count ?? seed.stargazers_count,
        forks_count: live.forks_count ?? seed.forks_count,
        html_url: live.html_url ?? seed.html_url,
        isLive: true,
      };
    }),
  );

  // Sort: featured first, then by stars desc
  results.sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.stargazers_count - a.stargazers_count;
  });

  return results;
}

/**
 * Map a tiny set of common languages to a brand-ish dot colour. Anything not
 * in the map falls back to a neutral colour — that's fine, the chip still
 * shows the language name.
 */
export const languageColor: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  Shell: "#89E051",
  Jinja: "#A52A22",
  Markdown: "#083FA1",
  Docker: "#384D54",
  HCL: "#844FBA",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Java: "#B07219",
};

export function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return String(n);
}
