// Fuente de verdad de la paleta para assets generados en build (OG images,
// favicon) — esos archivos son recursos HTTP independientes servidos fuera
// del documento HTML, así que NO pueden leer las custom properties de
// globals.css. Este módulo evita que la paleta quede duplicada en más de
// dos lugares: CSS para el sitio vivo, este archivo para todo lo demás.
//
// Al cambiar la paleta: actualizar acá Y en src/app/globals.css (los
// valores deben coincidir), y correr `pnpm og` para regenerar OG + favicon.

export const palette = {
  bone: '#FBF7F1',
  linen: '#F2EAE0',
  sand: '#E0D2C0',
  gold: '#B8935A',
  goldHighlight: '#F7C56B',
  amber: '#F09A38',
  ember: '#E2622F',
  espresso: '#241C16',
};
