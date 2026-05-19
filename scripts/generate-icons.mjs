#!/usr/bin/env node
/**
 * Generate the PNG icon set + OG image from src/assets/icon-source.svg and
 * src/assets/og-source.svg. Run once whenever the source SVGs change:
 *
 *   node scripts/generate-icons.mjs
 *
 * Writes to:
 *   public/icons/icon-192.png
 *   public/icons/icon-512.png
 *   public/icons/icon-512-maskable.png
 *   public/icons/apple-touch-icon.png  (180x180)
 *   public/favicon-32.png
 *   public/favicon.ico
 *   public/og-image.png  (1200x630)
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const iconSrc = path.join(root, "src/assets/icon-source.svg");
const ogSrc = path.join(root, "src/assets/og-source.svg");
const outIcons = path.join(root, "public/icons");
const outPublic = path.join(root, "public");

const ICONS = [
  { size: 192, file: "icons/icon-192.png", flatten: false },
  { size: 512, file: "icons/icon-512.png", flatten: false },
  // Maskable: padded so the safe zone is the inner 80% (Android adaptive icons).
  { size: 512, file: "icons/icon-512-maskable.png", flatten: true, padding: 0.1 },
  { size: 180, file: "icons/apple-touch-icon.png", flatten: false },
  { size: 32, file: "favicon-32.png", flatten: false, dest: "public" },
  { size: 16, file: "favicon-16.png", flatten: false, dest: "public" },
];

async function ensureDir(p) {
  await fs.mkdir(p, { recursive: true });
}

async function generateIcon(svgBuffer, opts) {
  const { size, padding = 0 } = opts;
  const innerSize = Math.round(size * (1 - padding * 2));
  const inset = Math.round((size - innerSize) / 2);

  // Render the SVG at innerSize, then composite onto a solid background canvas.
  const innerPng = await sharp(svgBuffer, { density: 384 })
    .resize(innerSize, innerSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  if (opts.flatten) {
    // Maskable: solid violet background so the icon survives Android masks.
    return sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 124, g: 58, b: 237, alpha: 1 }, // #7c3aed
      },
    })
      .composite([{ input: innerPng, top: inset, left: inset }])
      .png()
      .toBuffer();
  }

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 10, g: 10, b: 15, alpha: 1 }, // #0a0a0f
    },
  })
    .composite([{ input: innerPng, top: inset, left: inset }])
    .png()
    .toBuffer();
}

async function main() {
  const svg = await fs.readFile(iconSrc);
  await ensureDir(outIcons);

  for (const spec of ICONS) {
    const buf = await generateIcon(svg, spec);
    const targetPath = path.join(outPublic, spec.file);
    await fs.mkdir(path.dirname(targetPath), { recursive: true });
    await fs.writeFile(targetPath, buf);
    console.log(`✓ ${spec.file} (${spec.size}×${spec.size})`);
  }

  // favicon.ico — Windows / older browsers. We embed 16+32+48.
  // Sharp can't write multi-size ICO out of the box, so we just ship a 32px
  // PNG renamed (modern browsers handle PNG in .ico just fine, and we already
  // serve favicon.svg as the primary).
  const ico = await generateIcon(svg, { size: 32 });
  await fs.writeFile(path.join(outPublic, "favicon.ico"), ico);
  console.log("✓ favicon.ico (32×32, PNG-encoded)");

  // OG image
  try {
    const og = await fs.readFile(ogSrc);
    const ogPng = await sharp(og, { density: 144 })
      .resize(1200, 630, { fit: "cover" })
      .png({ quality: 90 })
      .toBuffer();
    await fs.writeFile(path.join(outPublic, "og-image.png"), ogPng);
    console.log("✓ og-image.png (1200×630)");
  } catch (err) {
    console.warn("! skipped og-image.png:", err.message);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
