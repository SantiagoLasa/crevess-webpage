import type { Metadata } from 'next';
import { CrevessCode } from '@/components/sections/CrevessCode';
import { CtaBand } from '@/components/sections/CtaBand';
import { Hero } from '@/components/sections/Hero';
import { LogoMarquee } from '@/components/sections/LogoMarquee';
import { ReelStrip } from '@/components/sections/ReelStrip';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { Story } from '@/components/sections/Story';
import { WhatWeDo } from '@/components/sections/WhatWeDo';
import { Divider } from '@/components/ui/Divider';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { url: '/', images: [{ url: '/og/home.jpg', width: 1200, height: 630 }] },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Story />
      <WhatWeDo />
      <Divider />
      <CrevessCode />
      <LogoMarquee />
      <SelectedWork />
      <CtaBand />
      <ReelStrip />
    </main>
  );
}
