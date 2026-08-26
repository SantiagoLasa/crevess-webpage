// Genera las imágenes Open Graph (1200×630), el logo para Schema.org y el
// favicon (src/app/icon.svg) — todos leen scripts/palette.mjs, la única
// fuente de verdad para assets de build (ver ese archivo para el porqué).
// Composición 100% vectorial (sin texto) para que el resultado sea idéntico
// en cualquier entorno de build — las fuentes del sistema varían entre CI y
// local. Se encadena en `pnpm build`.
//
// TODO: CONTENIDO CLIENTE — si llegan assets de marca definitivos (wordmark
// vectorial), sumarlos acá para OGs con tipografía.

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { palette } from './palette.mjs';

const { bone, linen, gold, goldHighlight, amber, ember } = palette;

const OUT = path.resolve(import.meta.dirname, '..', 'public', 'og');
await mkdir(OUT, { recursive: true });

// La esfera del isotipo como fuente de luz sobre papel cálido — cada página
// con una posición de luz distinta.
const og = (cx, cy, sphereX, sphereY, r) => `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bone}"/>
      <stop offset="100%" stop-color="${linen}"/>
    </linearGradient>
    <linearGradient id="sphere" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${goldHighlight}"/>
      <stop offset="45%" stop-color="${amber}"/>
      <stop offset="100%" stop-color="${ember}"/>
    </linearGradient>
    <radialGradient id="glow" cx="${cx}%" cy="${cy}%" r="70%">
      <stop offset="0%" stop-color="${amber}" stop-opacity="0.35"/>
      <stop offset="45%" stop-color="${ember}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${ember}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <circle cx="${sphereX}" cy="${sphereY}" r="${r}" fill="url(#sphere)"/>
  <rect x="80" y="524" width="240" height="2" fill="${gold}"/>
</svg>`;

const pages = [
  ['default', 70, 40, 990, 210, 120],
  ['home', 70, 40, 990, 210, 120],
  ['about', 25, 30, 210, 190, 110],
  ['services', 80, 70, 1000, 440, 130],
  ['portfolio', 50, 20, 600, 150, 100],
  ['magazine', 20, 70, 220, 460, 120],
  ['contact', 85, 25, 1010, 170, 105],
];

for (const [name, cx, cy, sx, sy, r] of pages) {
  await sharp(Buffer.from(og(cx, cy, sx, sy, r)))
    .jpeg({ quality: 88, progressive: true })
    .toFile(path.join(OUT, `${name}.jpg`));
}

// Isotipo 512×512 para el logo de Schema.org — misma esfera que el favicon.
const sphereSvg = (id) => `
  <defs>
    <linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${goldHighlight}"/>
      <stop offset="45%" stop-color="${amber}"/>
      <stop offset="100%" stop-color="${ember}"/>
    </linearGradient>
  </defs>`;

const logo = `
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  ${sphereSvg('s')}
  <rect width="512" height="512" fill="${bone}"/>
  <circle cx="256" cy="256" r="200" fill="url(#s)"/>
</svg>`;
await sharp(Buffer.from(logo)).png().toFile(path.join(OUT, 'logo.png'));

// Favicon — src/app/icon.svg (convención de Next). Se commitea (Next lo
// necesita en dev, no solo en build) pero se regenera con este script.
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  ${sphereSvg('g')}
  <circle cx="24" cy="24" r="24" fill="url(#g)"/>
</svg>
`;
const iconPath = path.resolve(import.meta.dirname, '..', 'src', 'app', 'icon.svg');
await writeFile(iconPath, icon);

console.log(`OG: ${pages.length} imágenes + logo.png + icon.svg`);
