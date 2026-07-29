import { contact } from '@/content/contact';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';
import { WithItalic } from '../ui/WithItalic';

// Los tres pasos del proceso, numerados 01/02/03 — misma gramática visual
// que el Crevess Code.
export function ProcessSteps() {
  return (
    <Section surface="linen">
      <Container>
        <Reveal>
          <Eyebrow>{contact.process.eyebrow}</Eyebrow>
          <h2 className="mt-6 max-w-[20ch] font-display text-display-l">
            <WithItalic text={contact.process.headline} italic={contact.process.italic} />
          </h2>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {contact.process.steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.08}>
              <div className="border-t border-gold pt-8">
                <p className="font-display text-display-m text-sand">{step.number}</p>
                <h3 className="mt-4 font-display text-display-m">{step.title}</h3>
                <p className="mt-4 text-body text-stone">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
