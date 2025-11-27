import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const projectsDir = path.resolve('public/images/projects');
const bgFile = path.resolve('public/images/bg.jpg');

const SIZES = [400, 800];

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true }).catch(() => {});
}

async function convertProjectImages() {
  const files = await fs.promises.readdir(projectsDir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const base = path.basename(file, ext);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      continue;
    }
    const inputPath = path.join(projectsDir, file);
    for (const w of SIZES) {
      const webpOut = path.join(projectsDir, `${base}-w${w}.webp`);
      const pngOut = path.join(projectsDir, `${base}-w${w}${ext}`);
      try {
        const img = sharp(inputPath).resize({ width: w });
        await img.webp({ quality: 82 }).toFile(webpOut);
        await img.toFile(pngOut);
        console.log(`Generated: ${path.basename(webpOut)}, ${path.basename(pngOut)}`);
      } catch (e) {
        console.error(`Failed to process ${file} at width ${w}:`, e.message);
      }
    }
  }
}

async function convertBg() {
  if (!fs.existsSync(bgFile)) return;
  for (const w of SIZES) {
    const webpOut = path.resolve(`public/images/bg-w${w}.webp`);
    try {
      await sharp(bgFile).resize({ width: w }).webp({ quality: 80 }).toFile(webpOut);
      console.log(`Generated: ${path.basename(webpOut)}`);
    } catch (e) {
      console.error(`Failed to process bg.jpg at width ${w}:`, e.message);
    }
  }
}

(async () => {
  await ensureDir(projectsDir);
  await convertProjectImages();
  await convertBg();
})();
