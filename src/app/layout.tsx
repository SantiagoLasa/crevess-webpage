import type { Metadata } from 'next';
import { instrumentSerif, satoshi } from './fonts';
import { site } from '@/content/site';
import { MotionProvider } from '@/components/layout/MotionProvider';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.defaultTitle,
    template: `%s — ${site.name}`,
  },
  description: site.seo.defaultDescription,
  openGraph: {
    siteName: site.name,
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/og/default.jpg', width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

// Schema.org — Organization + LocalBusiness (sección 8 del brief).
// sameAs se completa cuando lleguen las URLs de redes (CONTENT-TODO.md).
const schema = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: `${site.url}/og/logo.png`,
    sameAs: Object.values(site.social).filter(Boolean),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: site.name,
    url: site.url,
    image: `${site.url}/og/default.jpg`,
    description: site.seo.defaultDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${satoshi.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <MotionProvider>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-bone focus:px-4 focus:py-2 focus:text-espresso"
          >
            {site.a11y.skipToContent}
          </a>
          <Nav />
          <div id="content">{children}</div>
          <Footer />
          <WhatsAppButton />
        </MotionProvider>
      </body>
    </html>
  );
}
