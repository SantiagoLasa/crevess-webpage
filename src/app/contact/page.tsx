import type { Metadata } from 'next';
import { contact } from '@/content/contact';
import { ContactSection } from '@/components/sections/ContactSection';
import { MapEmbed } from '@/components/sections/MapEmbed';
import { PageHero } from '@/components/sections/PageHero';
import { ProcessSteps } from '@/components/sections/ProcessSteps';
import { ReelStrip } from '@/components/sections/ReelStrip';

export const metadata: Metadata = {
  title: contact.seo.title,
  description: contact.seo.description,
  alternates: { canonical: '/contact/' },
  openGraph: {
    url: '/contact/',
    images: [{ url: '/og/contact.jpg', width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow={contact.hero.eyebrow}
        headline={contact.hero.headline}
        italic={contact.hero.italic}
        intro={contact.hero.intro}
      />
      <ContactSection />
      <ProcessSteps />
      <MapEmbed />
      <ReelStrip />
    </main>
  );
}
