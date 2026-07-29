'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { magazinePage } from '@/content/magazine-page';
import type { ArticleMeta } from '@/lib/magazine';
import { cn } from '@/lib/cn';
import { Container } from '../layout/Container';
import { Section } from '../layout/Section';
import { ArticleCard } from './ArticleCard';

type IndexProps = {
  /** Todos los artículos (frontmatter), para que la búsqueda cruce páginas. */
  articles: ArticleMeta[];
  /** Fechas preformateadas por slug (el formateo vive en el server). */
  dateLabels: Record<string, string>;
  page: number;
  totalPages: number;
  perPage: number;
};

// Buscador Fuse.js sobre el frontmatter, sin llamadas de red: el índice viaja
// embebido en la página. Mientras hay búsqueda activa, la paginación se
// suspende y se busca sobre el total.
export function MagazineIndex({ articles, dateLabels, page, totalPages, perPage }: IndexProps) {
  const [query, setQuery] = useState('');

  const fuse = useMemo(
    () =>
      new Fuse(articles, {
        keys: [
          { name: 'title', weight: 2 },
          { name: 'excerpt', weight: 1 },
          { name: 'tags', weight: 1.5 },
          { name: 'author', weight: 0.5 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [articles],
  );

  const searching = query.trim().length > 0;
  const visible = searching
    ? fuse.search(query.trim()).map((r) => r.item)
    : articles.slice((page - 1) * perPage, page * perPage);

  return (
    <Section className="pt-0 md:pt-0">
      <Container>
        <div className="max-w-[420px]">
          <label htmlFor="magazine-search" className="sr-only">
            {magazinePage.search.label}
          </label>
          <input
            id="magazine-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={magazinePage.search.placeholder}
            className="w-full rounded-[2px] border border-sand bg-transparent px-4 py-3 text-body placeholder:text-stone/70"
          />
          <p aria-live="polite" className="mt-2 min-h-5 text-caption text-stone">
            {searching && `${visible.length} ${magazinePage.search.resultsSuffix}`}
          </p>
        </div>

        {visible.length === 0 ? (
          <p className="pt-8 text-body text-stone">{magazinePage.search.noResults}</p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                dateLabel={dateLabels[article.slug]}
              />
            ))}
          </div>
        )}

        {!searching && totalPages > 1 && (
          <nav className="mt-16 flex items-center gap-6" aria-label={magazinePage.pagination.navLabel}>
            {page > 1 && (
              <Link
                href={page === 2 ? '/magazine' : `/magazine/page/${page - 1}`}
                className="text-eyebrow uppercase text-gold transition-colors duration-200 hover:text-gold-lt"
              >
                ← {magazinePage.pagination.prev}
              </Link>
            )}
            <span className="text-caption text-stone">
              {page} / {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/magazine/page/${page + 1}`}
                className={cn(
                  'text-eyebrow uppercase text-gold transition-colors duration-200 hover:text-gold-lt',
                )}
              >
                {magazinePage.pagination.next} →
              </Link>
            )}
          </nav>
        )}
      </Container>
    </Section>
  );
}
