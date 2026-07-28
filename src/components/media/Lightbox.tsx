'use client';

import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';
import { Picture } from './Picture';
import { embedUrl, type VideoSource } from './VideoFacade';
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from '../ui/icons';

export type LightboxItem =
  | { type: 'image'; src: string; alt: string }
  | ({ type: 'video' } & VideoSource & { aspect?: string });

type LightboxProps = {
  items: LightboxItem[];
  /** Índice abierto, o null si está cerrado. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

const EASE = [0.22, 1, 0.36, 1] as const;
const SWIPE_THRESHOLD = 80;

// Visor de portfolio: navegación por teclado (flechas + Escape) y gestos
// táctiles (swipe horizontal). Los videos cargan su iframe recién acá.
export function Lightbox({ items, index, onClose, onIndexChange }: LightboxProps) {
  const open = index !== null;
  const closeRef = useRef<HTMLButtonElement>(null);

  const step = useCallback(
    (delta: number) => {
      if (index === null || items.length < 2) return;
      onIndexChange((index + delta + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, step]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  const item = index !== null ? items[index] : null;

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-espresso/95"
          role="dialog"
          aria-modal="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <div className="flex items-center justify-between p-6">
            <p className="text-caption text-linen/60">
              {(index ?? 0) + 1} / {items.length}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={site.a11y.closeLightbox}
              className="text-linen transition-colors duration-200 hover:text-gold-lt"
            >
              <CloseIcon width={24} height={24} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-6 pb-6 md:px-20">
            {items.length > 1 && (
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={site.a11y.prevItem}
                className="absolute left-4 z-10 hidden text-gold transition-colors duration-200 hover:text-gold-lt md:block"
              >
                <ChevronLeftIcon width={28} height={28} />
              </button>
            )}

            <motion.div
              key={index}
              className="flex max-h-full w-full items-center justify-center"
              drag={items.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -SWIPE_THRESHOLD) step(1);
                else if (info.offset.x > SWIPE_THRESHOLD) step(-1);
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {item.type === 'image' ? (
                <Picture
                  src={item.src}
                  alt={item.alt}
                  sizes="(min-width: 768px) 80vw, 100vw"
                  className="max-h-full"
                  imgClassName="max-h-[80svh] w-auto max-w-full object-contain"
                />
              ) : (
                <div
                  className="w-full max-w-[min(80svh*16/9,100%)]"
                  style={{ aspectRatio: item.aspect ?? '16 / 9' }}
                >
                  <iframe
                    src={embedUrl(item)}
                    title={item.title}
                    className="h-full w-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </motion.div>

            {items.length > 1 && (
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={site.a11y.nextItem}
                className="absolute right-4 z-10 hidden text-gold transition-colors duration-200 hover:text-gold-lt md:block"
              >
                <ChevronRightIcon width={28} height={28} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
