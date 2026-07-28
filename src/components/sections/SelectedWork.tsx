import Link from 'next/link';
import { home } from '@/content/home';
import { categoryLabels, work } from '@/content/portfolio';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Picture } from '../media/Picture';
import { Button } from '../ui/Button';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';
import { WithItalic } from '../ui/WithItalic';

function WorkCard({
  item,
  featured = false,
  delay = 0,
}: {
  item: (typeof work)[number];
  featured?: boolean;
  delay?: number;
}) {
  return (
    <Reveal delay={delay} className={featured ? 'lg:h-full' : undefined}>
      <Link href="/portfolio" className="group block h-full">
        <div className={featured ? 'h-[calc(100%-4rem)] overflow-hidden' : 'overflow-hidden'}>
          <Picture
            src={item.image}
            alt={item.alt}
            sizes={featured ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
            className="h-full"
            imgClassName={
              featured
                ? 'aspect-[4/5] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] lg:aspect-auto'
                : 'aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
            }
          />
        </div>
        <div className="h-16 pt-4">
          <Eyebrow>{categoryLabels[item.category]}</Eyebrow>
          <p className="mt-1 text-body font-medium">{item.title}</p>
        </div>
      </Link>
    </Reveal>
  );
}

// Grilla asimétrica: una pieza destacada grande + cuatro.
export function SelectedWork() {
  const [featured, ...rest] = work;

  return (
    <Section>
      <Container>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>{home.selectedWork.eyebrow}</Eyebrow>
              <h2 className="mt-6 max-w-[20ch] font-display text-display-l">
                <WithItalic
                  text={home.selectedWork.headline}
                  italic={home.selectedWork.italic}
                />
              </h2>
            </div>
            <Button variant="tertiary" href={home.selectedWork.cta.href}>
              {home.selectedWork.cta.label}
            </Button>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <WorkCard item={featured} featured />
          <div className="grid grid-cols-2 gap-6">
            {rest.map((item, i) => (
              <WorkCard key={item.id} item={item} delay={(i + 1) * 0.08} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
