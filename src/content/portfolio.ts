// Piezas de portfolio. Decisión deliberada (sección 7.3 del brief): nada de
// API de Instagram — lista curada manualmente, miniatura local + URL del post.
//
// TODO: CONTENIDO CLIENTE — todas las piezas son placeholders generados en la
// paleta. Reemplazar imágenes (assets-raw/work, assets-raw/reels), títulos,
// URLs de Instagram e IDs de video reales.

export type WorkCategory = 'social' | 'content' | 'events' | 'video';

export type WorkItem = {
  id: string;
  title: string;
  category: WorkCategory;
  /** Clave del manifest de imágenes. */
  image: string;
  alt: string;
  video?: { provider: 'youtube' | 'vimeo'; id: string };
};

export type ReelItem = {
  id: string;
  title: string;
  image: string;
  alt: string;
  instagramUrl?: string;
  video?: { provider: 'youtube' | 'vimeo'; id: string };
};

export const categoryLabels: Record<WorkCategory, string> = {
  social: 'Social Media Management',
  content: 'Content Creation',
  events: 'Events',
  video: 'Video Storytelling',
};

export const work: WorkItem[] = [
  {
    id: 'work-01',
    title: 'Beauty — Editorial Series',
    category: 'content',
    image: 'work/work-01',
    alt: 'Placeholder — pieza de portfolio en tonos golden hour',
  },
  {
    id: 'work-02',
    title: 'Fashion — Seasonal Campaign',
    category: 'social',
    image: 'work/work-02',
    alt: 'Placeholder — pieza de portfolio en tonos cálidos claros',
  },
  {
    id: 'work-03',
    title: 'Hospitality — Brand Film',
    category: 'video',
    image: 'work/work-03',
    alt: 'Placeholder — pieza de portfolio apaisada en tonos tierra',
  },
  {
    id: 'work-04',
    title: 'Lifestyle — Product Story',
    category: 'content',
    image: 'work/work-04',
    alt: 'Placeholder — pieza de portfolio cuadrada en dorados profundos',
  },
  {
    id: 'work-05',
    title: 'Events — Launch Coverage',
    category: 'events',
    image: 'work/work-05',
    alt: 'Placeholder — pieza de portfolio vertical en ámbar y espresso',
  },
];

export const reels: ReelItem[] = [
  {
    id: 'reel-01',
    title: 'Golden hour on set',
    image: 'reels/reel-01',
    alt: 'Placeholder — reel vertical en espresso y ámbar',
  },
  {
    id: 'reel-02',
    title: 'Behind the campaign',
    image: 'reels/reel-02',
    alt: 'Placeholder — reel vertical en tonos claros y ember',
  },
  {
    id: 'reel-03',
    title: 'Studio process',
    image: 'reels/reel-03',
    alt: 'Placeholder — reel vertical en dorado y espresso',
  },
  {
    id: 'reel-04',
    title: 'Miami light test',
    image: 'reels/reel-04',
    alt: 'Placeholder — reel vertical en bone y dorado',
  },
];
