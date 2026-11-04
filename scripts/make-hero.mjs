// Builds the self-hosted hero: AVIF + WebP + JPEG at several widths -> public/assets/hero/
// Source: "Virat Kohli January 2015.jpg" by NAPARAZZI, CC BY-SA 2.0 (Wikimedia Commons). Resized copies are shared under the same licence.
// Usage: node scripts/make-hero.mjs [path-to-original]   (defaults to .cache/hero-original.jpg)
import sharp from 'sharp';
import { mkdirSync, statSync } from 'node:fs';

const src = process.argv[2] || '.cache/hero-original.jpg';
const out = 'public/assets/hero';
const widths = [640, 960, 1280, 1920, 2560];
mkdirSync(out, { recursive: true });
let total = 0;
for (const w of widths) {
  const base = sharp(src).rotate().resize({ width: w, withoutEnlargement: true });
  const jobs = [
    ['avif', base.clone().avif({ quality: 52, effort: 6 })],
    ['webp', base.clone().webp({ quality: 74, effort: 6 })],
    ['jpg', base.clone().jpeg({ quality: 78, mozjpeg: true, progressive: true })],
  ];
  for (const [ext, pipe] of jobs) {
    const file = `${out}/hero-${w}.${ext}`;
    await pipe.toFile(file);
    const kb = Math.round(statSync(file).size / 1024);
    total += kb;
    console.log(file.padEnd(34), `${kb} KB`);
  }
}
console.log(`total ${Math.round(total / 1024 * 10) / 10} MB across ${widths.length * 3} files`);
