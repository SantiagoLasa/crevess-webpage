import { services } from '@/content/services';
import { cn } from '@/lib/cn';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Picture } from '../media/Picture';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';

// Seis bloques anclados, alternando imagen izquierda/derecha. Entregables
// con viñeta de filete dorado.
export function ServiceBlocks() {
  return (
    <Section className="pt-0 md:pt-0">
      <Container>
        <div className="space-y-24 md:space-y-40">
          {services.map((service, i) => (
            <div
              key={service.id}
              id={service.id}
              className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-20"
            >
              <Reveal className={cn(i % 2 === 1 && 'lg:order-2')}>
                <div className="overflow-hidden">
                  <Picture
                    src={service.image}
                    alt={service.alt}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    imgClassName="aspect-[4/5] w-full object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.08}>
                <Eyebrow>{service.eyebrow}</Eyebrow>
                <h2 className="mt-6 font-display text-display-m">{service.title}</h2>
                <p className="mt-5 max-w-[480px] text-body text-stone">{service.blurb}</p>
                <ul className="mt-8 space-y-3">
                  {service.deliverables.map((deliverable) => (
                    <li key={deliverable} className="flex items-baseline gap-4 text-body">
                      <span aria-hidden className="h-px w-6 shrink-0 translate-y-[-3px] bg-gold" />
                      {deliverable}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
