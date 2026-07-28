import Link from 'next/link';
import { site } from '@/content/site';

// Placeholder temporal de la Home — se reemplaza íntegro en la fase 4.
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="font-display text-display-l">{site.name}</h1>
      <Link
        href="/styleguide"
        className="text-eyebrow uppercase text-gold underline decoration-1 underline-offset-4 hover:text-gold-lt"
      >
        Sistema de diseño
      </Link>
    </main>
  );
}
