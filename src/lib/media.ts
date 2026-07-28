import manifest from './media-manifest.json';

// Manifest generado por scripts/optimize-images.mjs — no editar a mano.
export type MediaEntry = {
  width: number;
  height: number;
  widths: number[];
  blurDataURL: string;
};

const entries = manifest as Record<string, MediaEntry>;

export function getMedia(key: string): MediaEntry {
  const entry = entries[key];
  if (!entry) {
    throw new Error(
      `Imagen "${key}" no está en el manifest. ¿Existe en assets-raw/ y corriste \`pnpm images\`?`,
    );
  }
  return entry;
}

export function srcSetFor(key: string, format: 'avif' | 'webp' | 'jpg'): string {
  return getMedia(key)
    .widths.map((w) => `/media/${key}-${w}.${format} ${w}w`)
    .join(', ');
}

/** URL del JPG de respaldo en el ancho más grande disponible. */
export function fallbackSrc(key: string): string {
  const { widths } = getMedia(key);
  return `/media/${key}-${widths[widths.length - 1]}.jpg`;
}
