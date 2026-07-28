'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { cn } from '@/lib/cn';

// Elemento signature: la esfera del logo actuando como fuente de luz.
// Deriva lentamente con el scroll (parallax 0.15). Nunca loop infinito.
// Máximo tres instancias en toda la home — si aparece en cada sección,
// deja de ser un gesto y se vuelve textura.
type AmbientGlowProps = {
  /** Diámetro en px, entre 600 y 900. */
  size?: number;
  /** Posicionamiento (top/right/left/bottom) — el padre debe ser relative. */
  className?: string;
};

export function AmbientGlow({ size = 760, className }: AmbientGlowProps) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => (reduce ? 0 : v * 0.15));

  return (
    <motion.div
      aria-hidden
      className={cn('pointer-events-none absolute -z-10', className)}
      style={{
        width: size,
        height: size,
        y,
        background:
          'radial-gradient(circle at center, rgba(240,154,56,0.28) 0%, rgba(226,98,47,0.10) 40%, transparent 70%)',
        filter: 'blur(80px)',
      }}
    />
  );
}
