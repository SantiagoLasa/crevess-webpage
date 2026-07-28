// TODO: CONTENIDO CLIENTE — logos reales pendientes de confirmación escrita
// de qué marcas están autorizadas a mostrarse. Mientras tanto, wordmarks
// placeholder para revisar la mecánica de la marquesina.

export type Client = {
  name: string;
  /** Clave del manifest cuando lleguen los logos reales (SVG/PNG). */
  logo?: string;
};

export const clientsSection = {
  eyebrow: 'Trusted by',
};

export const clients: Client[] = [
  { name: 'Client 01' },
  { name: 'Client 02' },
  { name: 'Client 03' },
  { name: 'Client 04' },
  { name: 'Client 05' },
  { name: 'Client 06' },
  { name: 'Client 07' },
  { name: 'Client 08' },
];
