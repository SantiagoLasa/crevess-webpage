import localFont from 'next/font/local';

// Display — Instrument Serif (Google Fonts, OFL). Autoalojada, sin CDN externo.
// adjustFontFallback genera un fallback serif con métricas ajustadas: si la
// fuente llega tarde, el swap no mueve el layout.
export const instrumentSerif = localFont({
  src: [
    {
      path: '../../public/fonts/InstrumentSerif-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/InstrumentSerif-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-instrument-serif',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
});

// Cuerpo / UI — Satoshi (Fontshare, ITF Free Font License). Autoalojada.
export const satoshi = localFont({
  src: [
    {
      path: '../../public/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});
