'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/cn';

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  /** Para stagger entre hermanos: delay = índice * 0.08. */
  delay?: number;
  className?: string;
};

// Reveal al scroll — sección 2.6: opacity 0→1 + translateY 24px→0, 600ms.
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
