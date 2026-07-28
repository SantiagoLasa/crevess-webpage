import type { Metadata } from 'next';
import { portfolioPage } from '@/content/portfolio';
import { CtaBand } from '@/components/sections/CtaBand';
import { PageHero } from '@/components/sections/PageHero';
import { PortfolioGrid } from '@/components/sections/PortfolioGrid';

export const metadata: Metadata = {
  title: portfolioPage.seo.title,
  description: portfolioPage.seo.description,
};

export default function PortfolioPage() {
  return (
    <main>
      <PageHero
        eyebrow={portfolioPage.hero.eyebrow}
        headline={portfolioPage.hero.headline}
        italic={portfolioPage.hero.italic}
        intro={portfolioPage.hero.intro}
      />
      <PortfolioGrid />
      <CtaBand />
    </main>
  );
}
