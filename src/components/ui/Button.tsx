import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'tertiary';
type Size = 'md' | 'sm';
/** 'ink' sobre superficies claras; 'light' sobre el hero oscuro / espresso. */
type Tone = 'ink' | 'light';

const base = 'inline-flex items-center justify-center rounded-[2px] font-medium';

const sizes: Record<Size, string> = {
  md: 'px-7 py-3.5 text-body',
  sm: 'px-5 py-2.5 text-caption',
};

// Hover: solo cambio de color, 200ms. Sin escalado, sin levitación.
function styleFor(variant: Variant, tone: Tone): string {
  if (variant === 'primary') {
    return `${base} bg-ember text-bone transition-colors duration-200 hover:bg-amber`;
  }
  if (variant === 'secondary') {
    return cn(
      `${base} border transition-colors duration-200 hover:border-gold`,
      tone === 'light' ? 'border-bone/40 text-bone' : 'border-sand text-espresso',
    );
  }
  // Terciario: subrayado de 1px en --gold que se extiende de izquierda a derecha.
  return cn(
    'inline font-medium bg-no-repeat transition-[background-size] duration-300 [background-image:linear-gradient(var(--gold),var(--gold))] [background-position:0_100%] [background-size:0%_1px] hover:[background-size:100%_1px]',
    tone === 'light' ? 'text-bone' : 'text-espresso',
  );
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  href?: string;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<'button'>, 'className' | 'children'>;

export function Button({
  variant = 'primary',
  size = 'md',
  tone = 'ink',
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const cls = cn(styleFor(variant, tone), variant !== 'tertiary' && sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
