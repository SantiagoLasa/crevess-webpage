import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { getAllArticles } from '@/lib/magazine';

export const dynamic = 'force-static';

// Generado en build (export estático). /styleguide, /privacy y /terms
// quedan fuera deliberadamente (noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/about', '/services', '/portfolio', '/magazine', '/contact'].map(
    (route) => ({
      url: `${site.url}${route}/`,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.7,
    }),
  );

  const articles = getAllArticles().map((article) => ({
    url: `${site.url}/magazine/${article.slug}/`,
    lastModified: new Date(`${article.date}T00:00:00Z`),
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...articles];
}
