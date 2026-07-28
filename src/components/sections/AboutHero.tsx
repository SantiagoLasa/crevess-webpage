'use client';

import { motion } from 'motion/react';
import { about } from '@/content/about';
import { Container } from '../layout/Container';
import { Picture } from '../media/Picture';
import { WithItalic } from '../ui/WithItalic';

const EASE = [0.22, 1, 0.36, 1] as const;

// Hero de About: imagen del equipo a pantalla (casi) completa con overlay,
// mismo tratamiento de luz que la home. El Nav arranca transparente acá.
export function AboutHero() {
  return (
    <section className="relative flex min-h-[70svh] items-end overflow-hidden pb-16 md:min-h-[80svh] md:pb-24">
      <div className="absolute inset-0" aria-hidden>
        <Picture
          src={about.hero.image}
          alt={about.hero.imageAlt}
          priority
          sizes="100vw"
          className="h-full"
          imgClassName="h-full w-full object-cover"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(36,28,22,0.55), rgba(36,28,22,0.25))',
        }}
      />
      <Container className="relative z-10 pt-20">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-[16ch] font-display text-display-xl text-bone"
        >
          <WithItalic text={about.hero.headline} italic={about.hero.italic} />
        </motion.h1>
      </Container>
    </section>
  );
}
