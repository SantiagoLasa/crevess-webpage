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

## Cambiar de paleta / marca

Todo el color del sitio vivo sale de los tokens en
[globals.css](src/app/globals.css) (`:root`) — cambiar los 9 valores base ahí
alcanza para repintar todo, incluidos los derivados con transparencia
(`--nav-scrim`, `--hero-overlay`, `--ambient-glow`, `--shadow-soft`, `--glow`),
que están calculados con `color-mix()` a partir de esos mismos tokens. No hay
ningún componente con un hex o `rgba(...)` propio.

Los **assets generados en build** (OG images, `logo.png`, `src/app/icon.svg`)
son recursos servidos fuera del documento HTML — no pueden leer variables CSS.
Su paleta vive aparte, en [scripts/palette.mjs](scripts/palette.mjs); debe
coincidir con `globals.css`. Después de cambiar cualquiera de los dos, correr:

```bash
pnpm og   # regenera OG images, logo.png e icon.svg desde palette.mjs
```

El isotipo (la esfera) también se reconstruye en SVG dentro de
[Logo.tsx](src/components/layout/Logo.tsx) — si el cliente nuevo trae un logo
propio, reemplazar ese componente (y `icon.svg`/`logo.png` si el isotipo ya no
es una esfera).
