import { contact } from '@/content/contact';
import { site } from '@/content/site';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { Eyebrow } from '../ui/Eyebrow';
import { Reveal } from '../ui/Reveal';
import { ContactForm } from './ContactForm';

// Formulario + datos de contacto en dos columnas.
export function ContactSection() {
  return (
    <Section className="pt-0 md:pt-0">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[2fr_1fr] lg:gap-24">
          <Reveal>
            <h2 className="font-display text-display-m">{contact.form.title}</h2>
            <div className="mt-10">
              <ContactForm />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <aside>
              <Eyebrow>{contact.details.eyebrow}</Eyebrow>
              <ul className="mt-6 space-y-4 text-body text-stone">
                {site.contact.email && (
                  <li>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="transition-colors duration-200 hover:text-ember"
                    >
                      {site.contact.email}
                    </a>
                  </li>
                )}
                {site.contact.phone && (
                  <li>
                    <a
                      href={`tel:${site.contact.phone.replace(/[^+\d]/g, '')}`}
                      className="transition-colors duration-200 hover:text-ember"
                    >
                      {site.contact.phone}
                    </a>
                  </li>
                )}
                <li>{site.location}</li>
              </ul>
            </aside>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
