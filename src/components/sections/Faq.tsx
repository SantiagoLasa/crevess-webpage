import { faqSection, faqs } from '@/content/faqs';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Accordion } from '../ui/Accordion';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';
import { WithItalic } from '../ui/WithItalic';

export function Faq() {
  return (
    <Section surface="linen">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{faqSection.eyebrow}</Eyebrow>
            <h2 className="mt-6 max-w-[14ch] font-display text-display-l">
              <WithItalic text={faqSection.headline} italic={faqSection.italic} />
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Accordion
              items={faqs.map((faq) => ({ title: faq.question, body: faq.answer }))}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
