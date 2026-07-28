import type { Metadata } from 'next';
import { AmbientGlow } from '@/components/ui/AmbientGlow';
import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Eyebrow } from '@/components/ui/Eyebrow';

// Página interna de aprobación del sistema de diseño (fase 1).
// No es contenido del sitio: las anotaciones en español son para revisión
// interna, por eso viven acá y no en src/content/.

export const metadata: Metadata = {
  title: 'Sistema de diseño',
  robots: { index: false, follow: false },
};

const surfaces = [
  { token: '--bone', hex: '#FBF7F1', use: 'Fondo de página', cls: 'bg-bone' },
  { token: '--linen', hex: '#F2EAE0', use: 'Secciones alternas, cards', cls: 'bg-linen' },
  { token: '--sand', hex: '#E0D2C0', use: 'Bordes, divisores, fills apagados', cls: 'bg-sand' },
];

const accents = [
  { token: '--gold', hex: '#B8935A', use: 'Filetes 1px, versalitas, iconos. Nunca fondo', cls: 'bg-gold' },
  { token: '--gold-lt', hex: '#D9BC8B', use: 'Hover del dorado', cls: 'bg-gold-lt' },
  { token: '--amber', hex: '#F09A38', use: 'Naranja de marca', cls: 'bg-amber' },
  { token: '--ember', hex: '#E2622F', use: 'Solo botón primario y enlace activo', cls: 'bg-ember' },
];

const inks = [
  { token: '--espresso', hex: '#241C16', use: 'Titulares, footer. Nunca #000', cls: 'bg-espresso' },
  { token: '--stone', hex: '#6F6257', use: 'Texto de cuerpo secundario', cls: 'bg-stone' },
];

const spacing = [8, 16, 24, 40, 64, 96, 160];

const typeSpecs = [
  { name: 'display-xl', spec: 'Instrument Serif 400 · clamp(3rem, 9vw, 7.5rem) · lh 0.92 · ls −0.03em' },
  { name: 'display-l', spec: 'Instrument Serif 400 · clamp(2.25rem, 6vw, 4.5rem) · lh 0.98 · ls −0.02em' },
  { name: 'display-m', spec: 'Instrument Serif 400 · clamp(1.75rem, 4vw, 2.75rem) · lh 1.08' },
  { name: 'body-l', spec: 'Satoshi 400 · 1.125rem · lh 1.6' },
  { name: 'body', spec: 'Satoshi 400 · 1rem · lh 1.65' },
  { name: 'caption', spec: 'Satoshi 400 · 0.8125rem · lh 1.5' },
  { name: 'eyebrow', spec: 'Satoshi 500 · 0.6875rem · versalitas · ls 0.14em' },
];

function SpecLabel({ name, spec }: { name: string; spec: string }) {
  return (
    <p className="text-caption text-stone">
      <span className="font-medium text-gold">{name}</span>
      <span className="mx-2 text-sand">·</span>
      {spec}
    </p>
  );
}

function Swatch({
  token,
  hex,
  use,
  cls,
}: {
  token: string;
  hex: string;
  use: string;
  cls: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className={`h-28 border border-sand ${cls}`} />
      <div>
        <p className="text-body font-medium">{token}</p>
        <p className="text-caption uppercase text-stone">{hex}</p>
        <p className="text-caption text-stone">{use}</p>
      </div>
    </div>
  );
}

export default function Styleguide() {
  return (
    <main className="overflow-x-clip">
      {/* ------------------------------------------------ Portada */}
      <header className="relative">
        <AmbientGlow size={700} className="-top-52 -right-52" />
        <div className="mx-auto max-w-site px-6 py-24 md:px-10 md:py-40">
          <Eyebrow>Crevess — Sistema de diseño</Eyebrow>
          <h1 className="mt-6 font-display text-display-xl">
            Golden <em>hour</em>
          </h1>
          <p className="mt-8 max-w-[560px] text-body-l text-stone">
            La luz de las últimas dos horas de sol: cálida, baja, dorada, con
            sombras largas y suaves. Los fondos son papel claro y cálido; el
            color aparece como luz que se filtra, no como bloques planos.
          </p>
          <p className="mt-10 text-caption text-stone">
            Fase 1 · andamiaje — para aprobación antes de continuar
          </p>
        </div>
      </header>

      <Divider />

      {/* ------------------------------------------------ Paleta */}
      <section className="bg-linen">
        <div className="mx-auto max-w-site px-6 py-24 md:px-10 md:py-40">
          <Eyebrow>01 — Paleta</Eyebrow>

          <h2 className="mt-6 font-display text-display-m">Superficies</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {surfaces.map((s) => (
              <Swatch key={s.token} {...s} />
            ))}
          </div>

          <h2 className="mt-16 font-display text-display-m">Acentos</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            {accents.map((s) => (
              <Swatch key={s.token} {...s} />
            ))}
          </div>

          <h2 className="mt-16 font-display text-display-m">Tinta</h2>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {inks.map((s) => (
              <Swatch key={s.token} {...s} />
            ))}
          </div>

          <h2 className="mt-16 font-display text-display-m">Gradiente de marca</h2>
          <div className="mt-8 flex flex-col gap-3">
            <div className="h-28" style={{ background: 'var(--glow)' }} />
            <p className="text-caption text-stone">
              --glow · 135° · #F7C56B → #F09A38 → #E2622F · derivado del
              isotipo. La esfera del logo es la fuente de luz del sitio entero.
            </p>
          </div>

          <ul className="mt-16 max-w-[640px] space-y-2 border-t border-sand pt-8 text-caption text-stone">
            <li>— --ember solo en botones primarios y subrayado del enlace activo.</li>
            <li>— --gold nunca como fondo: exclusivo para líneas de 1px, versalitas y trazos de icono.</li>
            <li>— Ningún bloque de color plano supera el 25% del alto de viewport.</li>
            <li>— El footer (--espresso) es la única superficie oscura del sitio.</li>
            <li>— Fondos siempre --bone / --linen, nunca blanco puro.</li>
          </ul>
        </div>
      </section>

      <Divider />

      {/* ------------------------------------------------ Tipografía */}
      <section>
        <div className="mx-auto max-w-site px-6 py-24 md:px-10 md:py-40">
          <Eyebrow>02 — Tipografía</Eyebrow>

          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="border-t border-sand pt-6">
              <SpecLabel name="Instrument Serif" spec="display · 400 + italic" />
              <p className="mt-4 font-display text-display-m">
                AaBbCc <em>AaBbCc</em> 0123456789 &amp;
              </p>
            </div>
            <div className="border-t border-sand pt-6">
              <SpecLabel name="Satoshi" spec="cuerpo / UI · 400 / 500 / 700" />
              <p className="mt-4 text-display-m">
                AaBbCc <span className="font-medium">AaBbCc</span>{' '}
                <span className="font-bold">AaBbCc</span>
              </p>
            </div>
          </div>

          <div className="mt-20 space-y-16">
            <div>
              <SpecLabel {...typeSpecs[0]} />
              <p className="mt-4 font-display text-display-xl">
                Content that feels like <em>light</em>
              </p>
            </div>
            <div>
              <SpecLabel {...typeSpecs[1]} />
              <p className="mt-4 font-display text-display-l">
                The visionaries behind the brand
              </p>
            </div>
            <div>
              <SpecLabel {...typeSpecs[2]} />
              <p className="mt-4 font-display text-display-m">
                Strategy, story &amp; craft
              </p>
            </div>
            <div>
              <SpecLabel {...typeSpecs[3]} />
              <p className="mt-4 max-w-[640px] text-body-l">
                We partner with beauty, fashion, lifestyle and hospitality
                brands to produce content that looks the way their product
                feels — considered, warm, unmistakably premium.
              </p>
            </div>
            <div>
              <SpecLabel {...typeSpecs[4]} />
              <p className="mt-4 max-w-[640px] text-body text-stone">
                Every shoot begins with strategy. We study the brand, its
                audience and its competitors before a single frame is captured,
                so the content works as hard as it looks good.
              </p>
            </div>
            <div>
              <SpecLabel {...typeSpecs[5]} />
              <p className="mt-4 text-caption text-stone">
                Shot on location — Wynwood, Miami
              </p>
            </div>
            <div>
              <SpecLabel {...typeSpecs[6]} />
              <p className="mt-4 text-eyebrow uppercase text-gold">What we do</p>
            </div>
          </div>

          <div className="mt-20 border-t border-sand pt-8">
            <SpecLabel
              name="Numeración metodológica"
              spec="display-m · --sand · The Crevess Code, pasos del proceso"
            />
            <div className="mt-4 flex gap-10 font-display text-display-m text-sand">
              <span>01</span>
              <span>02</span>
              <span>03</span>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ------------------------------------------------ Espaciado */}
      <section className="bg-linen">
        <div className="mx-auto max-w-site px-6 py-24 md:px-10 md:py-40">
          <Eyebrow>03 — Espaciado</Eyebrow>
          <p className="mt-6 max-w-[560px] text-body text-stone">
            Múltiplos de 8. Padding vertical de sección: 96px móvil / 160px
            escritorio. Contenedor máximo 1320px, gutter 24px móvil / 40px
            escritorio.
          </p>
          <div className="mt-10 space-y-4">
            {spacing.map((s) => (
              <div key={s} className="flex items-center gap-6">
                <span className="w-10 text-caption text-stone">{s}</span>
                <div className="h-4 bg-sand" style={{ width: `${s}px` }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ------------------------------------------------ Detalles */}
      <section id="detalles">
        <div className="mx-auto max-w-site px-6 py-24 md:px-10 md:py-40">
          <Eyebrow>04 — Detalles</Eyebrow>

          <h2 className="mt-6 font-display text-display-m">Botones</h2>
          <p className="mt-3 text-caption text-stone">
            Componentes reales de fase 2. Radio 2px, hover solo de color,
            200ms. Tab para ver el anillo de foco.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button>Book a Strategy Call</Button>
            <Button variant="secondary">View Our Work</Button>
            <Button variant="tertiary" href="#detalles">
              Read the story
            </Button>
          </div>

          <h2 className="mt-20 font-display text-display-m">Sombra y radios</h2>
          <div className="mt-8 grid max-w-[880px] grid-cols-1 gap-10 md:grid-cols-2">
            <div className="flex flex-col gap-3">
              <div className="bg-bone p-10 shadow-soft">
                <p className="text-body text-stone">
                  Única sombra permitida: muy difusa, sin capas.
                </p>
                <p className="mt-2 text-caption uppercase text-stone">
                  0 24px 60px −20px rgba(36,28,22,0.18)
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="border border-sand p-10">
                <p className="text-body text-stone">
                  Imágenes y cards: radio 0. La estética editorial vive en los
                  ángulos rectos.
                </p>
                <p className="mt-2 text-caption uppercase text-stone">
                  border-radius: 0 · botones: 2px
                </p>
              </div>
            </div>
          </div>

          <h2 className="mt-20 font-display text-display-m">Divisor de sección</h2>
          <p className="mt-3 max-w-[560px] text-caption text-stone">
            Filete de 1px que atrapa la luz: transparent → --gold → transparent.
            En fase 2 se revela de centro hacia afuera al entrar en viewport.
          </p>
          <div className="mt-8 max-w-[640px]">
            <Divider />
          </div>
        </div>
      </section>

      <footer className="border-t border-sand">
        <div className="mx-auto max-w-site px-6 py-10 md:px-10">
          <p className="text-caption text-stone">
            Crevess · Sistema de diseño · Fase 1 — documento interno de revisión
          </p>
        </div>
      </footer>
    </main>
  );
}
