// Contenido global del sitio. Regla dura: cero strings de contenido
// hardcodeados en componentes JSX — todo texto visible sale de src/content/.

export const site = {
  name: 'Crevess',
  location: 'Miami, FL',

  seo: {
    // TODO: CONTENIDO CLIENTE — revisar title/description finales con el cliente
    defaultTitle: 'Crevess — Social Media & Content Creation Agency in Miami',
    defaultDescription:
      'Boutique social media and content creation agency in Miami. High-end visual content for beauty, fashion, lifestyle and hospitality brands.',
  },

  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Services', href: '/services' },
    { label: 'Magazine', href: '/magazine' },
    { label: 'Contact', href: '/contact' },
  ],

  cta: {
    label: 'Book a Strategy Call',
    href: '/contact',
  },

  hero: {
    // TODO: CONTENIDO CLIENTE — el H1 del sitio actual dice literalmente "TBD".
    // Cuando llegue el titular final, definir acá también qué palabra va en itálica.
    headline: null as string | null,
  },

  contact: {
    email: null as string | null, // TODO: CONTENIDO CLIENTE — email de destino del formulario
    phone: null as string | null, // TODO: CONTENIDO CLIENTE
    whatsapp: null as string | null, // TODO: CONTENIDO CLIENTE — número de WhatsApp
  },

  social: {
    // TODO: CONTENIDO CLIENTE — confirmar URLs exactas de redes
    instagram: null as string | null,
    tiktok: null as string | null,
    youtube: null as string | null,
  },

  footer: {
    columns: [
      {
        title: 'Quick Links',
        links: [
          { label: 'Portfolio', href: '/portfolio' },
          { label: 'Services', href: '/services' },
          { label: 'About', href: '/about' },
        ],
      },
      {
        title: 'Resources',
        links: [{ label: 'Magazine', href: '/magazine' }],
      },
      {
        title: 'Connect',
        links: [{ label: 'Contact', href: '/contact' }],
      },
    ],
    contactTitle: 'Contact Us',
    rights: 'All rights reserved.',
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },

  // Bloque reutilizable al final de cada página.
  ctaBand: {
    headline: 'Ready to elevate your brand?',
    italic: 'elevate',
    subtitle: 'Let’s build it — strategically.',
  },

  a11y: {
    skipToContent: 'Skip to content',
    mainNav: 'Main navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    playVideo: 'Play video',
    closeLightbox: 'Close viewer',
    prevItem: 'Previous item',
    nextItem: 'Next item',
  },
};
