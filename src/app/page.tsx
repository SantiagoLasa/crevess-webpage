import { site } from '@/content/site';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Eyebrow } from '@/components/ui/Eyebrow';

// Placeholder temporal de la Home — se reemplaza íntegro en la fase 4.
// La banda oscura existe solo para poder revisar el estado overlay del Nav
// (transparente + texto --bone) hasta que llegue el hero de video real.
export default function Home() {
  return (
    <main>
      <section className="relative flex min-h-svh items-center justify-center bg-espresso">
        <h1 className="font-display text-display-xl text-bone">{site.name}</h1>
      </section>

      <Divider />

      <Section>
        <Container>
          <Eyebrow>Fase 2 · layout global</Eyebrow>
          <p className="mt-6 max-w-[560px] text-body-l text-stone">
            Placeholder de la Home — el hero real llega en la fase 4. Esta
            sección existe para revisar la transición del Nav al hacer scroll.
          </p>
          <div className="mt-10">
            <Button variant="secondary" href="/styleguide">
              Sistema de diseño
            </Button>
          </div>
        </Container>
      </Section>
    </main>
  );
}
