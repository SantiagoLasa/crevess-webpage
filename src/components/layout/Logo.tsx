import { useId } from 'react';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';

// Isotipo: la esfera con gradiente naranja-dorado — la fuente de luz del sitio.
// TODO: CONTENIDO CLIENTE — reemplazar por los archivos de logo definitivos
// si difieren de esta reconstrucción en SVG.
export function LogoMark({ className }: { className?: string }) {
  const gradId = `crevess-glow-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`;
  return (
    <svg viewBox="0 0 48 48" className={cn('block', className)} aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7C56B" />
          <stop offset="45%" stopColor="#F09A38" />
          <stop offset="100%" stopColor="#E2622F" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="24" fill={`url(#${gradId})`} />
    </svg>
  );
}

export function Logo({
  tone = 'dark',
  className,
}: {
  tone?: 'light' | 'dark';
  className?: string;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <LogoMark className="h-8 w-8" />
      <span
        className={cn(
          'font-display text-2xl leading-none tracking-[-0.02em] transition-colors duration-300',
          tone === 'light' ? 'text-bone' : 'text-espresso',
        )}
      >
        {site.name}
      </span>
    </span>
  );
}
