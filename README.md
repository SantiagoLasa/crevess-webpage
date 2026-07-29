# Crevess — sitio web

Sitio estático de [Crevess](https://crevess.com) — agencia boutique de social
media y content creation en Miami. Next.js 15 (App Router) en modo
`output: 'export'`, Tailwind CSS v4, Motion, desplegado en Cloudflare Pages.

## Desarrollo

```bash
pnpm install
pnpm images   # pipeline de imágenes (assets-raw/ → public/media/ + manifest)
pnpm dev
```

`/styleguide` documenta el sistema de diseño (noindex, solo interno).

## Build

```bash
pnpm build    # imágenes + OG + next build → out/
```

No correr `pnpm build` con `pnpm dev` activo: comparten `.next/`.

## Deploy — Cloudflare Workers (static assets)

Proyecto de Workers Builds conectado al repo. `wrangler.jsonc` define el
Worker `crevess`: sirve `out/` como assets estáticos (con `_redirects`
nativo) y [worker/index.ts](worker/index.ts) maneja `/api/contact` y los
410 de rutas de spam.

- **Build command:** `pnpm build`
- **Deploy command:** `npx wrangler deploy`
- **Variables de entorno:** ver [.env.example](.env.example). Las del
  formulario van en el Worker (Settings → Variables and Secrets);
  `NEXT_PUBLIC_TURNSTILE_SITE_KEY` va en las variables de *build*.
  Nunca en el repo.

## Contenido

Todo el texto visible vive en `src/content/` — cero strings hardcodeados en
componentes. Los artículos del magazine son `.mdx` en `src/content/magazine/`.
Lo pendiente del cliente está rastreado en [CONTENT-TODO.md](CONTENT-TODO.md).
