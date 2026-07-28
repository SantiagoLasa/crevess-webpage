'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/cn';

// Filete de 1px "atrapando la luz": transparent → --gold → transparent.
// Al entrar en viewport se revela de centro hacia afuera en 700ms.
export function Divider({ className }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={cn('h-px w-full', className)}
      style={{
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
        transformOrigin: 'center',
      }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
