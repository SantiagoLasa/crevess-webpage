import Link from 'next/link';
import { home } from '@/content/home';
import { services } from '@/content/services';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';
import { WithItalic } from '../ui/WithItalic';

// Grilla de 6 pills-enlace, cada una a su ancla en /services.
export function WhatWeDo() {
  return (
    <Section>
      <Container>
        <Reveal>
          <Eyebrow>{home.whatWeDo.eyebrow}</Eyebrow>
          <h2 className="mt-6 max-w-[20ch] font-display text-display-l">
            <WithItalic text={home.whatWeDo.headline} italic={home.whatWeDo.italic} />
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.08}>
              <Link
                href={`/services#${service.id}`}
                className="flex items-center justify-between gap-4 rounded-[2px] border border-sand px-6 py-5 text-body font-medium text-espresso transition-colors duration-200 hover:border-gold"
              >
                {service.title}
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
