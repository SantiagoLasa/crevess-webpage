import type { Metadata } from 'next';
import { instrumentSerif, satoshi } from './fonts';
import { site } from '@/content/site';
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
      <body>{children}</body>
    </html>
  );
}
