import { contact } from '@/content/contact';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Reveal } from '../ui/Reveal';

// Mapa embebido de Miami — lazy, con tratamiento cálido para no romper la
// paleta. Sin API key: embed público de Google Maps.
export function MapEmbed() {
  return (
    <Section className="pb-0 md:pb-0">
      <Container className="px-0 md:px-0">
        <Reveal>
          <iframe
            src={contact.map.embedSrc}
            title={contact.map.title}
            loading="lazy"
            className="h-[400px] w-full border-0 [filter:grayscale(0.85)_sepia(0.15)]"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>
      </Container>
    </Section>
  );
}
