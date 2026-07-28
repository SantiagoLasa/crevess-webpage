'use client';

import { useState } from 'react';
import { home } from '@/content/home';
import { reels } from '@/content/portfolio';
import { site } from '@/content/site';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Lightbox, type LightboxItem } from '../media/Lightbox';
import { Picture } from '../media/Picture';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';
import { WithItalic } from '../ui/WithItalic';
import { PlayIcon } from '../ui/icons';

// Carrusel horizontal de reels 9:16. Miniaturas estáticas — nada de feed en
// vivo de Instagram (sección 7.3). Clic abre el Lightbox.
const items: LightboxItem[] = reels.map((reel) =>
  reel.video
    ? { type: 'video', ...reel.video, title: reel.title, aspect: '9 / 16' }
    : { type: 'image', src: reel.image, alt: reel.alt },
);

export function ReelStrip() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <Section>
      <Container>
        <Reveal>
          <Eyebrow>{home.reelStrip.eyebrow}</Eyebrow>
          <h2 className="mt-6 font-display text-display-m">
            <WithItalic text={home.reelStrip.headline} italic={home.reelStrip.italic} />
          </h2>
        </Reveal>
        <div className="-mx-6 mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] md:-mx-10 md:px-10 [&::-webkit-scrollbar]:hidden">
          {reels.map((reel, i) => (
            <Reveal key={reel.id} delay={i * 0.08} className="shrink-0 snap-start">
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${site.a11y.playVideo}: ${reel.title}`}
                className="group block w-[220px] text-left md:w-[260px]"
              >
                <div className="relative overflow-hidden">
                  <Picture
                    src={reel.image}
                    alt={reel.alt}
                    sizes="260px"
                    imgClassName="aspect-[9/16] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span
                    aria-hidden
                    className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full border border-gold bg-espresso/40 text-bone backdrop-blur-[2px] transition-colors duration-200 group-hover:bg-espresso/60"
                  >
                    <PlayIcon width={18} height={18} />
                  </span>
                </div>
                <p className="mt-3 text-caption text-stone">{reel.title}</p>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>
      <Lightbox
        items={items}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </Section>
  );
}
