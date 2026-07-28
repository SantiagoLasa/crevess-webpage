import { Container } from '../layout/Container';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';
import { WithItalic } from '../ui/WithItalic';

type PageHeroProps = {
  eyebrow: string;
  headline: string;
  italic?: string;
  intro?: string;
};

// Hero corto y claro para páginas internas sin imagen a pantalla completa.
export function PageHero({ eyebrow, headline, italic, intro }: PageHeroProps) {
  return (
    <header className="pb-16 pt-16 md:pb-24 md:pt-24">
      <Container>
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-[16ch] font-display text-display-xl">
            <WithItalic text={headline} italic={italic} />
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-[560px] text-body-l text-stone">{intro}</p>
          </Reveal>
        )}
      </Container>
    </header>
  );
}
