'use client';

import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '@/lib/cn';
import { PlusIcon } from './icons';

const EASE = [0.22, 1, 0.36, 1] as const;

export type AccordionItem = {
  title: string;
  body: string;
};

// Acordeón accesible: un panel abierto a la vez, aria-expanded/controls,
// icono + que rota a × al abrir.
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="border-y border-sand">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.title} className={cn(i > 0 && 'border-t border-sand')}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-body-l font-medium transition-colors duration-200 hover:text-ember"
              >
                {item.title}
                <span
                  aria-hidden
                  className={cn(
                    'shrink-0 text-gold transition-transform duration-300',
                    isOpen && 'rotate-45',
                  )}
                >
                  <PlusIcon />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[640px] pb-6 text-body text-stone">{item.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
