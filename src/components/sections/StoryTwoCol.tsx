import { about } from '@/content/about';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Picture } from '../media/Picture';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';
import { WithItalic } from '../ui/WithItalic';

// The Crevess Story en dos columnas texto/imagen (About).
export function StoryTwoCol() {
  return (
    <Section>
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>{about.story.eyebrow}</Eyebrow>
            <h2 className="mt-6 max-w-[18ch] font-display text-display-l">
              <WithItalic text={about.story.headline} italic={about.story.italic} />
            </h2>
            <div className="mt-8 space-y-5">
              {about.story.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="max-w-[520px] text-body text-stone">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="overflow-hidden">
              <Picture
                src={about.story.image}
                alt={about.story.imageAlt}
                sizes="(min-width: 1024px) 50vw, 100vw"
                imgClassName="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
