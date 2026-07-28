// Contenido de About. Los textos marcados BORRADOR son drafts de trabajo;
// bios y fotos del equipo están pendientes del cliente (CONTENT-TODO.md).

export const about = {
  seo: {
    title: 'About',
    description:
      'Meet Crevess — the boutique social media and content creation agency behind brands that lead with image.',
  },

  hero: {
    // Errata corregida: el sitio actual dice "band"; es "brand".
    headline: 'The visionaries behind the brand',
    italic: 'visionaries',
    image: 'about/team-hero',
    imageAlt: '', // TODO: CONTENIDO CLIENTE — foto real del equipo + alt
  },

  story: {
    eyebrow: 'The Crevess Story',
    headline: 'Born in Miami, built on light',
    italic: 'light',
    // TODO: CONTENIDO CLIENTE — BORRADOR
    paragraphs: [
      'Crevess started with a simple observation: most brands post more than they say. We built a studio that treats every feed like a campaign — strategy first, then craft.',
      'Today we partner with beauty, fashion, lifestyle and hospitality brands, producing content with the warmth and intention of golden hour.',
    ],
    image: 'about/story',
    imageAlt: 'Placeholder — imagen de la historia de Crevess',
  },

  code: {
    eyebrow: 'The Crevess Code',
    headline: 'The method behind the magic',
    italic: 'method',
    pillars: [
      {
        number: '01',
        title: 'Creation',
        // TODO: CONTENIDO CLIENTE — versión expandida pendiente
        body: '[Expanded copy pending — client to provide]',
      },
      {
        number: '02',
        title: 'Vision',
        // TODO: CONTENIDO CLIENTE — versión expandida pendiente
        body: '[Expanded copy pending — client to provide]',
      },
      {
        number: '03',
        title: 'Essence',
        // TODO: CONTENIDO CLIENTE — versión expandida pendiente
        body: '[Expanded copy pending — client to provide]',
      },
    ],
  },

  team: {
    eyebrow: 'The team',
    headline: 'Faces behind the frames',
    italic: 'frames',
    // TODO: CONTENIDO CLIENTE — bios y fotos reales del equipo. Cantidad de
    // integrantes por confirmar; tres tarjetas placeholder para el layout.
    members: [
      {
        name: '[Name pending]',
        role: '[Role pending]',
        bio: '[Bio pending — client to provide]',
        image: 'team/member-01',
        imageAlt: 'Placeholder — retrato de integrante del equipo',
      },
      {
        name: '[Name pending]',
        role: '[Role pending]',
        bio: '[Bio pending — client to provide]',
        image: 'team/member-02',
        imageAlt: 'Placeholder — retrato de integrante del equipo',
      },
      {
        name: '[Name pending]',
        role: '[Role pending]',
        bio: '[Bio pending — client to provide]',
        image: 'team/member-03',
        imageAlt: 'Placeholder — retrato de integrante del equipo',
      },
    ],
  },
};
