import type { Metadata } from 'next';
import { legal } from '@/content/legal';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
  title: legal.terms.title,
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <main className="py-24 md:py-40">
      <Container>
        <h1 className="max-w-[16ch] font-display text-display-l">{legal.terms.title}</h1>
        <p className="mt-8 max-w-[640px] text-body text-stone">
          {legal.terms.placeholder}
        </p>
      </Container>
    </main>
  );
}
