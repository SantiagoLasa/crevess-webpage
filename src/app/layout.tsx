import type { Metadata } from 'next';
import { instrumentSerif, satoshi } from './fonts';
import { site } from '@/content/site';
import { MotionProvider } from '@/components/layout/MotionProvider';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: site.seo.defaultTitle,
    template: `%s — ${site.name}`,
  },
  description: site.seo.defaultDescription,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${satoshi.variable}`}>
      <body>
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
        </MotionProvider>
      </body>
    </html>
  );
}
