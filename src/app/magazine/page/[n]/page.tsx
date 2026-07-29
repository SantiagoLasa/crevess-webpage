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

export const dynamicParams = false;

// Paginación estática: /magazine es la página 1 canónica. Acá se
// pre-renderizan todas (el export estático exige al menos un param, así que
// /magazine/page/1 existe con canonical a /magazine — nada enlaza a ella).
export function generateStaticParams() {
  const totalPages = Math.max(1, Math.ceil(getAllArticles().length / ARTICLES_PER_PAGE));
  return Array.from({ length: totalPages }, (_, i) => ({ n: String(i + 1) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ n: string }>;
}): Promise<Metadata> {
  const { n } = await params;
  return {
    title: magazinePage.seo.title,
    description: magazinePage.seo.description,
    alternates: { canonical: n === '1' ? '/magazine/' : `/magazine/page/${n}/` },
  };
}

export default async function MagazinePaged({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const page = Number(n);
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
        page={page}
        totalPages={Math.max(1, Math.ceil(articles.length / ARTICLES_PER_PAGE))}
        perPage={ARTICLES_PER_PAGE}
      />
      <CtaBand />
    </main>
  );
}
