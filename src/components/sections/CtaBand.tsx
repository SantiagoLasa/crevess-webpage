import { site } from '@/content/site';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { AmbientGlow } from '../ui/AmbientGlow';
import { Button } from '../ui/Button';
import { Reveal } from '../ui/Reveal';
import { WithItalic } from '../ui/WithItalic';

// Bloque reutilizable al final de cada página. Fondo --linen con una
// instancia de AmbientGlow — nunca gradiente naranja a pantalla completa.
export function CtaBand() {
  return (
    <Section surface="linen" className="overflow-hidden">
      <AmbientGlow size={700} className="left-1/2 top-[-160px] ml-[-350px]" />
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <h2 className="max-w-[18ch] font-display text-display-l">
            <WithItalic text={site.ctaBand.headline} italic={site.ctaBand.italic} />
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-6 text-body-l text-stone">{site.ctaBand.subtitle}</p>
        </Reveal>
        <Reveal delay={0.16} className="mt-10">
          <Button href={site.cta.href}>{site.cta.label}</Button>
        </Reveal>
      </Container>
    </Section>
  );
}
