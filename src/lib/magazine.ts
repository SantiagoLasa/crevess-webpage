import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

// Acceso a los artículos MDX — solo desde server components (usa fs).
// Los .mdx viven en src/content/magazine/ con frontmatter:
// title, slug, date, excerpt, cover, tags, author.

export type ArticleMeta = {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  cover: string;
  tags: string[];
  author: string;
};

const DIR = path.join(process.cwd(), 'src', 'content', 'magazine');

export const ARTICLES_PER_PAGE = 6;

export function getAllArticles(): ArticleMeta[] {
  return fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(DIR, file), 'utf8'));
      return data as ArticleMeta;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getArticle(slug: string): { meta: ArticleMeta; source: string } {
  const file = path.join(DIR, `${slug}.mdx`);
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return { meta: data as ArticleMeta, source: content };
}

/** Relacionados por solapamiento de tags; completa con los más recientes. */
export function getRelated(slug: string, count = 2): ArticleMeta[] {
  const all = getAllArticles();
  const current = all.find((a) => a.slug === slug);
  if (!current) return all.slice(0, count);

  const scored = all
    .filter((a) => a.slug !== slug)
    .map((a) => ({
      article: a,
      score: a.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || b.article.date.localeCompare(a.article.date));

  return scored.slice(0, count).map((s) => s.article);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
