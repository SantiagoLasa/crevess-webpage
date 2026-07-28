import { clients, clientsSection } from '@/content/clients';
import { Container } from '../layout/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';
import { cn } from '@/lib/cn';

// Marquesina infinita de clientes — la única animación en loop del sitio.
// Pausa en hover; prefers-reduced-motion la detiene (kill-switch global).
export function LogoMarquee() {
  const row = (hidden: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-16 pr-16"
    >
      {clients.map((client) => (
        <span
          key={client.name}
          className="whitespace-nowrap text-body-l font-bold uppercase tracking-[0.14em] text-stone opacity-60 transition-opacity duration-200 hover:opacity-100"
        >
          {client.name}
        </span>
      ))}
    </div>
  );

  return (
    <section className={cn('bg-linen py-16 md:py-24')}>
      <Container>
        <Reveal>
          <Eyebrow className="text-center">{clientsSection.eyebrow}</Eyebrow>
        </Reveal>
      </Container>
      <div className="marquee mt-10 overflow-hidden">
        <div className="marquee-track flex w-max">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
