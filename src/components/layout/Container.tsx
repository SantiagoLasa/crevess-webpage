import { cn } from '@/lib/cn';

// Contenedor máximo 1320px, gutter 24px móvil / 40px escritorio.
export function Container({
  className,
  children,
  ...rest
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={cn('mx-auto w-full max-w-site px-6 md:px-10', className)} {...rest}>
      {children}
    </div>
  );
}
