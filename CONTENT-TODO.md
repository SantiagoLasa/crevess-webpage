# Contenido pendiente del cliente

Registro vivo de todo lo que está como placeholder en el sitio. Actualizar al
cerrar cada ítem, indicando fecha y quién lo confirmó.

## Pendiente

- [ ] **H1 del hero** — el sitio actual dice literalmente "TBD". Definir también qué palabra del titular va en itálica. (`src/content/site.ts`)
- [ ] **Textos de los tres pilares del Crevess Code** (Creation · Vision · Essence) — hoy son lorem ipsum en producción. Ojo: el sitio actual dice "Crevess / Vision / Essence"; el primero es un error, debe decir "Creation".
- [ ] **Logos de clientes** — confirmación escrita de cuáles están autorizados a mostrarse. (`src/content/clients.ts`)
- [ ] **Bios y fotos del equipo** — para About.
- [ ] **Los 5 textos del FAQ** — para Services. (`src/content/faqs.ts`)
- [ ] **Copy final de los 6 servicios**. (`src/content/services.ts`)
- [ ] **Privacy Policy y Terms of Service** — texto legal completo.
- [ ] **Número de WhatsApp** — para el botón flotante y Contact. (`src/content/site.ts`)
- [ ] **Email de destino del formulario** de contacto. (`src/content/site.ts`)
- [ ] **Voz de marca** — el sitio actual mezcla plural ("We bring strategy...") con singular ("Let me immortalize your moments"). Decisión: unificar en plural. Confirmar con el cliente.
- [ ] **Title/description SEO finales** — hay borradores razonables en `src/content/site.ts`, revisar con el cliente.
- [ ] **URLs exactas de redes** (Instagram, TikTok, YouTube). (`src/content/site.ts`)
- [ ] **Fotografía real** — las imágenes en `assets-raw/` son gradientes placeholder generados; reemplazar con material del cliente.
- [ ] **Video reel de Crevess** — IDs de YouTube/Vimeo para el hero y los demos (hoy hay un video de demo de Blender en el styleguide).
- [ ] **Dominio definitivo** — `site.url` asume `https://crevess.com`; confirmar antes del deploy. (`src/content/site.ts`)
- [ ] **Rutas reales del WordPress viejo** — exportar el sitemap del sitio actual y completar los 301 en `public/_redirects` (hoy hay mapeos típicos de WP como punto de partida).
- [ ] **Rangos de presupuesto del formulario** — confirmar los 4 rangos en `src/content/contact.ts`.
- [ ] **Claves de producción** — RESEND_API_KEY, TURNSTILE_SECRET_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL y NEXT_PUBLIC_TURNSTILE_SITE_KEY en Cloudflare Pages (ver `.env.example`).

## Confirmado

(nada todavía)
