'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  categoryLabels,
  portfolioPage,
  work,
  type WorkCategory,
} from '@/content/portfolio';
import { cn } from '@/lib/cn';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Lightbox, type LightboxItem } from '../media/Lightbox';
import { Picture } from '../media/Picture';
import { Eyebrow } from '../ui/Eyebrow';

const EASE = [0.22, 1, 0.36, 1] as const;

type Tab = 'all' | WorkCategory;

const tabs: { key: Tab; label: string }[] = [
  { key: 'all', label: portfolioPage.allLabel },
  ...(Object.entries(categoryLabels) as [WorkCategory, string][]).map(
    ([key, label]) => ({ key: key as Tab, label }),
  ),
];

// Filtrado del lado del cliente con transición layout de Motion — sin
// recarga, sin router. Estado vacío explícito: nunca una grilla en blanco.
export function PortfolioGrid() {
  const [tab, setTab] = useState<Tab>('all');
  const [index, setIndex] = useState<number | null>(null);

  const filtered = tab === 'all' ? work : work.filter((w) => w.category === tab);

  const lightboxItems: LightboxItem[] = filtered.map((item) =>
    item.video
      ? { type: 'video', ...item.video, title: item.title }
      : { type: 'image', src: item.image, alt: item.alt },
  );

  return (
    <Section className="pt-0 md:pt-0">
      <Container>
        <div
          className="flex flex-wrap gap-x-8 gap-y-3 border-b border-sand pb-4"
          role="group"
        >
          {tabs.map(({ key, label }) => {
            const active = tab === key;
            return (
              <button
                key={key}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setTab(key);
                  setIndex(null);
                }}
                className={cn(
                  'relative pb-1 text-eyebrow uppercase transition-colors duration-200',
                  active ? 'text-espresso' : 'text-stone hover:text-espresso',
                )}
              >
                {label}
                {active && (
                  <motion.span
                    layoutId="portfolio-tab"
                    className="absolute inset-x-0 bottom-0 h-px bg-ember"
                    transition={{ duration: 0.3, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p className="pt-12 text-body text-stone">{portfolioPage.emptyState}</p>
        ) : (
          <div className="columns-1 gap-6 pt-12 sm:columns-2 lg:columns-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="mb-6 break-inside-avoid"
                >
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={item.title}
                    className="group block w-full text-left"
                  >
                    <div className="overflow-hidden">
                      <Picture
                        src={item.image}
                        alt={item.alt}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        imgClassName="w-full transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="pt-4">
                      <Eyebrow>{categoryLabels[item.category]}</Eyebrow>
                      <p className="mt-1 text-body font-medium">{item.title}</p>
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </Container>

      <Lightbox
        items={lightboxItems}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </Section>
  );
}
