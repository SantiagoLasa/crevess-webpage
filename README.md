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

## Deploy — Cloudflare Pages

- **Build command:** `pnpm build`
- **Output directory:** `out`
- **Functions:** `/functions` se despliega solo (formulario de contacto + 410
  de rutas de spam).
- **Variables de entorno:** ver [.env.example](.env.example) — claves de
  Resend y Turnstile, correos de destino/remitente. Nunca en el repo.

## Contenido

Todo el texto visible vive en `src/content/` — cero strings hardcodeados en
componentes. Los artículos del magazine son `.mdx` en `src/content/magazine/`.
Lo pendiente del cliente está rastreado en [CONTENT-TODO.md](CONTENT-TODO.md).
