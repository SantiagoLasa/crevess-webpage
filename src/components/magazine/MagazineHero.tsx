'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { magazinePage } from '@/content/magazine-page';
import { Container } from '../layout/Container';
import { Picture } from '../media/Picture';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';
import { WithItalic } from '../ui/WithItalic';

const EASE = [0.22, 1, 0.36, 1] as const;
const ROTATE_MS = 6000;

type HeroSlide = { cover: string; title: string; slug: string };

// Hero del índice con imagen rotativa entre las portadas recientes.
// Rotación de contenido sancionada por el brief (5.5); con
// prefers-reduced-motion queda fija en la primera portada.
export function MagazineHero({ slides }: { slides: HeroSlide[] }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [reduce, slides.length]);

  const current = slides[index];

  return (
    <header className="pb-16 pt-16 md:pb-24 md:pt-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>{magazinePage.hero.eyebrow}</Eyebrow>
            <h1 className="mt-6 max-w-[14ch] font-display text-display-xl">
              <WithItalic
                text={magazinePage.hero.headline}
                italic={magazinePage.hero.italic}
              />
            </h1>
            <p className="mt-8 max-w-[480px] text-body-l text-stone">
              {magazinePage.hero.intro}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative aspect-video overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.div
                  key={current.slug}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <Picture
                    src={current.cover}
                    alt=""
                    priority={index === 0}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="h-full"
                    imgClassName="h-full w-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <Link
              href={`/magazine/${current.slug}`}
              className="mt-4 inline-block text-caption text-stone transition-colors duration-200 hover:text-ember"
            >
              {current.title}
            </Link>
          </Reveal>
        </div>
      </Container>
    </header>
  );
}
