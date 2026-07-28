import { home } from '@/content/home';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { AmbientGlow } from '../ui/AmbientGlow';
import { Button } from '../ui/Button';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';

// The Crevess Story — reemplaza la banda naranja sólida del sitio actual.
export function Story() {
  return (
    <Section surface="linen">
      <AmbientGlow size={640} className="-left-64 top-[-120px]" />
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <Eyebrow>{home.story.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-8 max-w-[640px] font-display text-display-m">
            {home.story.body}
          </p>
        </Reveal>
        <Reveal delay={0.16} className="mt-10">
          <Button variant="tertiary" href={home.story.cta.href}>
            {home.story.cta.label}
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
