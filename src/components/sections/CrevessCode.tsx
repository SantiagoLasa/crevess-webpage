import { home } from '@/content/home';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';
import { WithItalic } from '../ui/WithItalic';

// Tres pilares: Creation · Vision · Essence. La numeración es una secuencia
// metodológica real, por eso se justifica el 01/02/03.
export function CrevessCode() {
  return (
    <Section>
      <Container>
        <Reveal>
          <Eyebrow>{home.code.eyebrow}</Eyebrow>
          <h2 className="mt-6 max-w-[20ch] font-display text-display-l">
            <WithItalic text={home.code.headline} italic={home.code.italic} />
          </h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {home.code.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.08}>
              <div className="border-t border-gold pt-8">
                <p className="font-display text-display-m text-sand">{pillar.number}</p>
                <h3 className="mt-4 font-display text-display-m">{pillar.title}</h3>
                <p className="mt-4 text-body text-stone">{pillar.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
