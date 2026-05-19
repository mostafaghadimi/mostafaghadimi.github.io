// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import AstroPWA from "@vite-pwa/astro";

const SITE = "https://mostafaghadimi.github.io";

export default defineConfig({
  site: SITE,
  output: "static",
  trailingSlash: "ignore",
  build: {
    inlineStylesheets: "auto",
  },
  vite: {
    // Astro 6 bundles its own pinned Vite under `astro/node_modules/vite`,
    // while `@tailwindcss/vite` returns plugins typed against the
    // top-level Vite. The two `Plugin<T>` types are structurally identical
    // but nominally distinct, so `astro check` flags an assignment error
    // even though everything works fine at runtime. Suppress the noise.
    // @ts-expect-error -- nominal Vite Plugin type mismatch, harmless
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap(),
    AstroPWA({
      registerType: "autoUpdate",
      injectRegister: "script",
      includeAssets: [
        "favicon.svg",
        "favicon.ico",
        "apple-touch-icon.png",
        "robots.txt",
      ],
      manifest: {
        name: "Mostafa Ghadimi — Senior Data & AI Engineer",
        short_name: "Mostafa G.",
        description:
          "Senior Data & AI Engineer (6+ yrs). Building large-scale data platforms and production LLM/agentic systems.",
        theme_color: "#cc5500",
        background_color: "#f7f3ed",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        lang: "en",
        dir: "ltr",
        categories: ["portfolio", "productivity"],
        prefer_related_applications: false,
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/icon-512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/",
        // Never let the SPA-style navigateFallback hijack static assets like
        // /resume.pdf, /sitemap-index.xml, /robots.txt, etc. Without this,
        // clicking a same-tab link to resume.pdf from the installed PWA
        // returns the index page instead of the file.
        navigateFallbackDenylist: [
          /^\/resume\.pdf$/,
          /^\/robots\.txt$/,
          /\.(pdf|xml|txt|webmanifest|json|ico|png|jpg|jpeg|svg|webp|gif|woff2?)$/i,
        ],
        globPatterns: [
          "**/*.{html,css,js,svg,png,jpg,jpeg,webp,woff,woff2,ico}",
        ],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.github\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "github-api",
              expiration: {
                maxEntries: 32,
                maxAgeSeconds: 60 * 60 * 6, // 6 hours
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
              expiration: {
                maxEntries: 16,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: /\.pdf$/,
            handler: "CacheFirst",
            options: {
              cacheName: "pdf-cache",
              expiration: {
                maxEntries: 4,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
});
