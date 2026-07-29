// Catch-all de Cloudflare Pages: solo corre cuando la request NO matchea un
// asset estático (el sitio exportado). Su único trabajo es devolver 410 Gone
// para las rutas de spam inyectadas en el WordPress viejo — le indica a
// Google que las elimine del índice más rápido que un 404.

const SPAM_PREFIXES = [
  '/disonanciamexicana.org',
  '/ecosh.org',
  '/sanamares.es',
  '/azafrandelpirineo.es',
  '/hackathonrural.es',
];

type PagesContext = {
  request: Request;
  env: { ASSETS: { fetch: (request: Request) => Promise<Response> } };
};

export async function onRequest(context: PagesContext): Promise<Response> {
  const { pathname } = new URL(context.request.url);

  if (SPAM_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return new Response('Gone', {
      status: 410,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  // Cualquier otra ruta sin asset: servir el 404 estático del sitio.
  return context.env.ASSETS.fetch(context.request);
}
