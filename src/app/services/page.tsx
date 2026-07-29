import type { Metadata } from 'next';
import { servicesPage } from '@/content/services';
import { CtaBand } from '@/components/sections/CtaBand';
import { Faq } from '@/components/sections/Faq';
import { PageHero } from '@/components/sections/PageHero';
import { ServiceBlocks } from '@/components/sections/ServiceBlocks';

export const metadata: Metadata = {
  title: servicesPage.seo.title,
  description: servicesPage.seo.description,
  alternates: { canonical: '/services/' },
  openGraph: {
    url: '/services/',
    images: [{ url: '/og/services.jpg', width: 1200, height: 630 }],
  },
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow={servicesPage.hero.eyebrow}
        headline={servicesPage.hero.headline}
        italic={servicesPage.hero.italic}
        intro={servicesPage.hero.intro}
      />
      <ServiceBlocks />
      <Faq />
      <CtaBand />
    </main>
  );
}
