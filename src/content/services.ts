// Los 6 servicios con sus bloques anclados en /services.
// TODO: CONTENIDO CLIENTE — copy final de los 6 servicios. Los blurbs y
// entregables son BORRADORES de trabajo para revisar el layout.

export type Service = {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
  deliverables: string[];
  image: string;
  alt: string;
};

export const servicesPage = {
  seo: {
    title: 'Services',
    description:
      'Social media management, content creation, video production and brand strategy — six ways Crevess shapes a brand.',
  },
  hero: {
    eyebrow: 'Services',
    headline: 'Everything a brand needs to glow',
    italic: 'glow',
    // TODO: CONTENIDO CLIENTE — BORRADOR
    intro:
      'Six disciplines, one standard: content that looks intentional, feels premium and works strategically.',
  },
};

export const services: Service[] = [
  {
    id: 'social-media-management',
    eyebrow: 'Service 01',
    title: 'Social Media Management',
    blurb:
      'End-to-end management of your social presence — strategy, calendar, publishing and community, held to an editorial standard.',
    deliverables: [
      'Monthly content calendar & publishing',
      'Community management & response guidelines',
      'Analytics reporting with clear next steps',
    ],
    image: 'services/social-media-management',
    alt: 'Placeholder — Social Media Management',
  },
  {
    id: 'content-creation',
    eyebrow: 'Service 02',
    title: 'Content Creation',
    blurb:
      'Photo and short-form content produced on location — planned, art-directed and edited to feel unmistakably yours.',
    deliverables: [
      'Monthly content days on location',
      'Art direction & shot lists',
      'Edited stills and reels, delivery-ready',
    ],
    image: 'services/content-creation',
    alt: 'Placeholder — Content Creation',
  },
  {
    id: 'event-social-media',
    eyebrow: 'Service 03',
    title: 'Event Social Media',
    blurb:
      'Live coverage that turns an evening into a week of content — capture, edit and publish while the night is still trending.',
    deliverables: [
      'On-site capture team',
      'Same-night stories & recap reels',
      'Post-event content package',
    ],
    image: 'services/event-social-media',
    alt: 'Placeholder — Event Social Media',
  },
  {
    id: 'video-production',
    eyebrow: 'Service 04',
    title: 'Video Production',
    blurb:
      'Brand films and campaign video with full production values — concept, shoot, edit, color and sound.',
    deliverables: [
      'Concept & script development',
      'Full production day(s)',
      'Master edit + social cutdowns',
    ],
    image: 'services/video-production',
    alt: 'Placeholder — Video Production',
  },
  {
    id: 'brand-strategy-consulting',
    eyebrow: 'Service 05',
    title: 'Brand Strategy & Consulting',
    blurb:
      'The thinking before the making: positioning, audience, voice and a content system your team can actually run.',
    deliverables: [
      'Brand & competitor audit',
      'Positioning and voice definition',
      'Content system playbook',
    ],
    image: 'services/brand-strategy-consulting',
    alt: 'Placeholder — Brand Strategy & Consulting',
  },
  {
    id: 'other-services',
    eyebrow: 'Service 06',
    title: 'Other Services',
    blurb:
      'Influencer coordination, UGC programs, paid content support — if it touches your brand’s image, we can help.',
    deliverables: [
      'Influencer & UGC coordination',
      'Paid social creative',
      'Custom scopes on request',
    ],
    image: 'services/other-services',
    alt: 'Placeholder — Other Services',
  },
];
