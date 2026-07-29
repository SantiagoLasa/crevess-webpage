import type { Metadata } from 'next';
import { compileMDX } from 'next-mdx-remote/rsc';
import { magazinePage } from '@/content/magazine-page';
import {
  formatDate,
  getAllArticles,
  getArticle,
  getRelated,
} from '@/lib/magazine';
import { ArticleCard } from '@/components/magazine/ArticleCard';
import { mdxComponents } from '@/components/magazine/MdxComponents';
import { CtaBand } from '@/components/sections/CtaBand';
import { Container } from '@/components/layout/Container';
import { Picture } from '@/components/media/Picture';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { WithItalic } from '@/components/ui/WithItalic';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getArticle(slug);
  return { title: meta.title, description: meta.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { meta, source } = getArticle(slug);
  const related = getRelated(slug);
  const { content } = await compileMDX({ source, components: mdxComponents });

  return (
    <main>
      {/* Layout editorial de una columna, medida 680px */}
      <article className="pb-24 pt-16 md:pb-40 md:pt-24">
        <Container>
          <header className="mx-auto max-w-[680px]">
            <Eyebrow>
              {formatDate(meta.date)} · {meta.tags.join(' · ')}
            </Eyebrow>
            <h1 className="mt-6 font-display text-display-l">{meta.title}</h1>
            <p className="mt-6 text-caption text-stone">{meta.author}</p>
          </header>
          <div className="mx-auto mt-12 max-w-[880px] overflow-hidden">
            <Picture
              src={meta.cover}
              alt=""
              priority
              sizes="(min-width: 1024px) 880px, 100vw"
              imgClassName="aspect-video w-full object-cover"
            />
          </div>
          <div className="mx-auto mt-4 max-w-[680px]">{content}</div>
          <div className="mx-auto mt-16 max-w-[680px]">
            <Button variant="tertiary" href="/magazine">
              {magazinePage.article.backLabel}
            </Button>
          </div>
        </Container>
      </article>

      <section className="border-t border-sand py-24 md:py-32">
        <Container>
          <h2 className="font-display text-display-m">
            <WithItalic
              text={magazinePage.article.relatedTitle}
              italic={magazinePage.article.relatedItalic}
            />
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                dateLabel={formatDate(article.date)}
              />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </main>
  );
}
