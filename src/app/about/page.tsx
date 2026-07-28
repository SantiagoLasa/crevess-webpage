import type { Metadata } from 'next';
import { about } from '@/content/about';
import { AboutHero } from '@/components/sections/AboutHero';
import { CrevessCode } from '@/components/sections/CrevessCode';
import { CtaBand } from '@/components/sections/CtaBand';
import { LogoMarquee } from '@/components/sections/LogoMarquee';
import { ReelStrip } from '@/components/sections/ReelStrip';
import { StoryTwoCol } from '@/components/sections/StoryTwoCol';
import { Team } from '@/components/sections/Team';
import { Divider } from '@/components/ui/Divider';

export const metadata: Metadata = {
  title: about.seo.title,
  description: about.seo.description,
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <StoryTwoCol />
      <Divider />
      <CrevessCode content={about.code} />
      <LogoMarquee />
      <Team />
      <CtaBand />
      <ReelStrip />
    </main>
  );
}
