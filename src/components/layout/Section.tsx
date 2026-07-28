import { cn } from '@/lib/cn';

type SectionProps = React.ComponentPropsWithoutRef<'section'> & {
  // Fondos siempre --bone / --linen, nunca blanco puro.
  surface?: 'bone' | 'linen';
};

// Padding vertical de sección: 96px móvil / 160px escritorio.
// relative para poder posicionar AmbientGlow adentro.
export function Section({
  surface = 'bone',
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn('relative py-24 md:py-40', surface === 'linen' && 'bg-linen', className)}
      {...rest}
    >
      {children}
    </section>
  );
}
