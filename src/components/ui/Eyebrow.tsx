import { cn } from '@/lib/cn';

// Satoshi Medium, versalitas, tracking 0.14em, 11px, --gold (token text-eyebrow).
export function Eyebrow({
  className,
  children,
  ...rest
}: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p className={cn('text-eyebrow uppercase text-gold', className)} {...rest}>
      {children}
    </p>
  );
}
