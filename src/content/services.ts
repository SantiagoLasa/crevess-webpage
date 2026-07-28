// Los 6 servicios. El copy completo llega en fase 5 (página /services).
// TODO: CONTENIDO CLIENTE — copy final de los 6 servicios.

export type Service = {
  id: string;
  title: string;
};

export const services: Service[] = [
  { id: 'social-media-management', title: 'Social Media Management' },
  { id: 'content-creation', title: 'Content Creation' },
  { id: 'event-social-media', title: 'Event Social Media' },
  { id: 'video-production', title: 'Video Production' },
  { id: 'brand-strategy-consulting', title: 'Brand Strategy & Consulting' },
  { id: 'other-services', title: 'Other Services' },
];
