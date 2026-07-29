import Link from 'next/link';
import type { ArticleMeta } from '@/lib/magazine';
import { Picture } from '../media/Picture';
import { Eyebrow } from '../ui/Eyebrow';

// Tarjeta de artículo — usable en el índice (client) y en relacionados (server).
// La fecha llega formateada para no duplicar la lógica de formato.
export function ArticleCard({
  article,
  dateLabel,
}: {
  article: ArticleMeta;
  dateLabel: string;
}) {
  return (
    <Link href={`/magazine/${article.slug}`} className="group block">
      <div className="overflow-hidden">
        <Picture
          src={article.cover}
          alt=""
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          imgClassName="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="pt-5">
        <Eyebrow>
          {dateLabel} · {article.tags[0]}
        </Eyebrow>
        <p className="mt-2 text-body-l font-medium transition-colors duration-200 group-hover:text-ember">
          {article.title}
        </p>
        <p className="mt-2 text-caption text-stone">{article.excerpt}</p>
      </div>
    </Link>
  );
}
