# mostafaghadimi.github.io

Personal portfolio of [Mostafa Ghadimi](https://www.linkedin.com/in/mostafaghadimi/) — Senior Data & AI Engineer.

Live: **<https://mostafaghadimi.github.io>**

## Stack

- **Astro 5** + **TypeScript** — content-first static site, zero JS by default
- **Tailwind CSS v4** — `@theme` directive, no extra config file
- **Content collections** — typed JSON sources (zod-validated) for experience, projects, repos, skills, education, awards, certifications
- **@vite-pwa/astro** — installable PWA, Workbox service worker, auto-update
- **@astrojs/sitemap** — sitemap + robots
- **GitHub Actions** → **GitHub Pages** — push to `master` ships to prod

The legacy Create-React-App version lives on the `legacy-cra` branch.

## Local dev

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static build to ./dist
npm run preview      # serve ./dist locally
npm run typecheck    # astro check
```

Skip the build-time GitHub repo metadata fetch (faster local builds):

```bash
GITHUB_LIVE=0 npm run build
```

## Content updates

The resume and the site share the same source-of-truth content. To update:

| What | Where |
|---|---|
| Hero stats / site-wide copy | [`src/data/site.ts`](src/data/site.ts) |
| Experience timeline | [`src/data/experience.json`](src/data/experience.json) |
| Featured case studies | [`src/data/projects.json`](src/data/projects.json) |
| Open Source repos (curated) | [`src/data/repos.json`](src/data/repos.json) |
| Skills | [`src/data/skills.json`](src/data/skills.json) |
| Education / Awards / Certifications | `src/data/{education,awards,certifications}.json` |

All collections are zod-validated at build time via [`src/content/config.ts`](src/content/config.ts) — if a required field is missing or a URL is malformed, the build fails loudly.

## Resume PDF

`public/resume.pdf` is a copy of the PDF built by the [resume repo](https://github.com/mostafaghadimi/resume).

After rebuilding `resume.pdf` over there, sync it back here:

```bash
./scripts/sync-resume.sh
```

By default the script looks for the resume repo at `../resume`. Override with `RESUME_REPO=/path/to/resume`.

## Icons / OG image

Source SVGs live in `src/assets/`:

- `icon-source.svg` — PWA + favicon source
- `og-source.svg` — Open Graph card source (1200×630)

Regenerate the PNG set after editing either:

```bash
node scripts/generate-icons.mjs
```

Outputs:

- `public/icons/icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `apple-touch-icon.png` (180)
- `public/favicon-{16,32}.png`, `public/favicon.ico`
- `public/og-image.png`

## PWA

The site is installable as a standalone app on iOS, Android, and desktop:

- **Manifest** — generated from the config in [`astro.config.mjs`](astro.config.mjs)
- **Service worker** — Workbox, `autoUpdate` strategy, precache + runtime caches for fonts / GitHub API / PDF
- **Install UX** — Chrome / Edge / Android get a native install prompt via `beforeinstallprompt` (wired in [`src/components/Footer.astro`](src/components/Footer.astro)). iOS Safari users use "Add to Home Screen".

To test the PWA locally, build and preview (the service worker doesn't run via `astro dev`):

```bash
npm run build && npm run preview
```

## Deploy

Pushes to `master` trigger [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which:

1. Checks out the repo
2. Installs deps with `npm ci`
3. Runs `npm run build` (using `GITHUB_TOKEN` so the build-time GitHub API fetch enjoys the 5k/hr authenticated rate limit)
4. Uploads `./dist` as a Pages artifact
5. Deploys via `actions/deploy-pages@v4`

To enable Pages on the repo (one-time): **Settings → Pages → Source: GitHub Actions**.

## Project layout

```
src/
├── assets/              # SVG sources for icons + OG
├── components/          # Astro components (Hero, Nav, sections, etc.)
├── content/config.ts    # Zod-validated content collections
├── data/                # JSON content + site metadata
├── layouts/BaseLayout.astro
├── pages/               # index.astro, 404.astro
├── styles/global.css    # Tailwind v4 @theme + custom utilities
└── utils/github.ts      # Build-time repo metadata fetch
public/
├── favicon.svg, favicon.ico, og-image.png
├── icons/               # PWA icon set
├── resume.pdf
└── robots.txt
scripts/
├── generate-icons.mjs   # SVG → PNG icon set
└── sync-resume.sh       # copy resume.pdf from resume repo
.github/workflows/deploy.yml
```

## License

Content (text, copy, resume) © Mostafa Ghadimi — all rights reserved. The code is MIT — feel free to fork the stack as a starter for your own portfolio.
