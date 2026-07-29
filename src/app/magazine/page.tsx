import type { Metadata } from 'next';
import { magazinePage } from '@/content/magazine-page';
import {
  ARTICLES_PER_PAGE,
  formatDate,
  getAllArticles,
} from '@/lib/magazine';
import { MagazineHero } from '@/components/magazine/MagazineHero';
import { MagazineIndex } from '@/components/magazine/MagazineIndex';
import { CtaBand } from '@/components/sections/CtaBand';

export const metadata: Metadata = {
  title: magazinePage.seo.title,
  description: magazinePage.seo.description,
};

export default function MagazinePage() {
  const articles = getAllArticles();
  const dateLabels = Object.fromEntries(
    articles.map((a) => [a.slug, formatDate(a.date)]),
  );

  return (
    <main>
      <MagazineHero
        slides={articles.slice(0, 3).map((a) => ({
          cover: a.cover,
          title: a.title,
          slug: a.slug,
        }))}
      />
      <MagazineIndex
        articles={articles}
        dateLabels={dateLabels}
        page={1}
        totalPages={Math.max(1, Math.ceil(articles.length / ARTICLES_PER_PAGE))}
        perPage={ARTICLES_PER_PAGE}
      />
      <CtaBand />
    </main>
  );
}
