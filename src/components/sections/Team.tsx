import { about } from '@/content/about';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Picture } from '../media/Picture';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';
import { WithItalic } from '../ui/WithItalic';

// Bios del equipo — tarjetas placeholder hasta que lleguen fotos y bios.
export function Team() {
  return (
    <Section>
      <Container>
        <Reveal>
          <Eyebrow>{about.team.eyebrow}</Eyebrow>
          <h2 className="mt-6 max-w-[20ch] font-display text-display-l">
            <WithItalic text={about.team.headline} italic={about.team.italic} />
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {about.team.members.map((member, i) => (
            <Reveal key={member.image} delay={i * 0.08}>
              <div className="overflow-hidden">
                <Picture
                  src={member.image}
                  alt={member.imageAlt}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  imgClassName="aspect-square w-full object-cover"
                />
              </div>
              <p className="mt-5 text-body-l font-medium">{member.name}</p>
              <Eyebrow className="mt-1">{member.role}</Eyebrow>
              <p className="mt-3 text-body text-stone">{member.bio}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
