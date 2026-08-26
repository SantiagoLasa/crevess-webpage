'use client';

import { useEffect, useState } from 'react';
import { home } from '@/content/home';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';
import { Container } from '../layout/Container';
import { Picture } from '../media/Picture';
import { Button } from '../ui/Button';
import { WithItalic } from '../ui/WithItalic';

// La cascada de carga corre una sola vez por sesión de JS, no en cada
// navegación de vuelta a la home (sección 2.6). Sin localStorage: flag en
// scope de módulo. La animación es CSS puro (globals.css) para que el LCP
// no espere la hidratación.
let introPlayed = false;

function bgVideoUrl(video: NonNullable<typeof home.hero.video>) {
  return video.provider === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&mute=1&loop=1&playlist=${video.id}&controls=0&rel=0&playsinline=1`
    : `https://player.vimeo.com/video/${video.id}?background=1&autoplay=1&loop=1&muted=1`;
}

export function Hero() {
  const [runIntro] = useState(() => !introPlayed);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    introPlayed = true;
  }, []);

  // Facade del video de fondo: el poster pinta el LCP; el iframe recién se
  // carga cuando el navegador está ocioso (y solo si hay video configurado).
  useEffect(() => {
    if (!home.hero.video) return;
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => setVideoReady(true));
      return () => cancelIdleCallback(id);
    }
    const t = setTimeout(() => setVideoReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative flex min-h-svh items-center overflow-hidden">
      <div className="absolute inset-0" aria-hidden>
        <Picture
          src={home.hero.poster}
          alt={home.hero.posterAlt}
          priority
          sizes="100vw"
          className="h-full"
          imgClassName="h-full w-full object-cover"
        />
        {videoReady && home.hero.video && (
          <iframe
            src={bgVideoUrl(home.hero.video)}
            title=""
            aria-hidden
            tabIndex={-1}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
            allow="autoplay"
          />
        )}
      </div>

      {/* Overlay — sección 5.1 */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'var(--hero-overlay)' }}
      />

      <Container className="relative z-10 pt-20">
        <h1
          className={cn(
            'max-w-[14ch] font-display text-display-xl text-bone',
            runIntro && 'hero-intro',
          )}
        >
          <WithItalic text={home.hero.headline} italic={home.hero.italic} />
        </h1>
        <p
          className={cn(
            'mt-8 max-w-[520px] text-body-l text-bone/85',
            runIntro && 'hero-intro hero-intro-2',
          )}
        >
          {home.hero.subtitle}
        </p>
        <div
          className={cn(
            'mt-10 flex flex-wrap gap-4',
            runIntro && 'hero-intro hero-intro-3',
          )}
        >
          <Button href={site.cta.href}>{site.cta.label}</Button>
          <Button variant="secondary" tone="light" href={home.hero.secondaryCta.href}>
            {home.hero.secondaryCta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}
