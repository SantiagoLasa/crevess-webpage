// Contenido de la Home. Los textos marcados como BORRADOR son drafts de
// trabajo para poder revisar el diseño — el cliente confirma o reemplaza
// (registrados en CONTENT-TODO.md).

export const home = {
  hero: {
    // TODO: CONTENIDO CLIENTE — el H1 del sitio actual dice literalmente
    // "TBD". Esto es un BORRADOR nuestro para revisar el diseño.
    headline: 'Content that feels like light',
    italic: 'light',
    // TODO: CONTENIDO CLIENTE — BORRADOR
    subtitle:
      'Boutique social media & content creation for beauty, fashion, lifestyle and hospitality brands in Miami.',
    poster: 'home/hero-poster',
    posterAlt: '',
    // TODO: CONTENIDO CLIENTE — ID del reel de fondo (YouTube o Vimeo).
    // Con null, el hero muestra solo el poster.
    video: null as { provider: 'youtube' | 'vimeo'; id: string } | null,
    secondaryCta: { label: 'View Our Work', href: '/portfolio' },
  },

  story: {
    eyebrow: 'The Crevess Story',
    // TODO: CONTENIDO CLIENTE — BORRADOR
    body: 'Crevess is a boutique social media and content creation agency based in Miami. We partner with brands that lead with image — and we make sure the image leads.',
    cta: { label: 'Read the story', href: '/about' },
  },

  whatWeDo: {
    eyebrow: 'What we do',
    headline: 'Six ways we shape a brand',
    italic: 'shape',
  },

  code: {
    eyebrow: 'The Crevess Code',
    headline: 'Three principles, one method',
    italic: 'method',
    // Ojo: el sitio actual dice "Crevess / Vision / Essence" — el primer
    // pilar es un error; debe decir "Creation".
    pillars: [
      {
        number: '01',
        title: 'Creation',
        // TODO: CONTENIDO CLIENTE — hoy lorem ipsum en producción
        body: '[Copy pending — client to provide]',
      },
      {
        number: '02',
        title: 'Vision',
        // TODO: CONTENIDO CLIENTE — hoy lorem ipsum en producción
        body: '[Copy pending — client to provide]',
      },
      {
        number: '03',
        title: 'Essence',
        // TODO: CONTENIDO CLIENTE — hoy lorem ipsum en producción
        body: '[Copy pending — client to provide]',
      },
    ],
  },

  selectedWork: {
    eyebrow: 'Selected Work',
    headline: 'What we’ve been crafting',
    italic: 'crafting',
    cta: { label: 'View all work', href: '/portfolio' },
  },

  reelStrip: {
    eyebrow: 'On the feed',
    headline: 'Latest reels',
    italic: 'reels',
  },
};
