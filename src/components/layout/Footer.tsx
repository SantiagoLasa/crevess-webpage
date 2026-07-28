import Link from 'next/link';
import { site } from '@/content/site';
import { Container } from './Container';
import { LogoMark } from './Logo';
import { Eyebrow } from '../ui/Eyebrow';
import { InstagramIcon, TikTokIcon, YouTubeIcon } from '../ui/icons';

// Única superficie oscura del sitio: --espresso con texto --linen.
export function Footer() {
  const socials = [
    { label: 'Instagram', href: site.social.instagram, Icon: InstagramIcon },
    { label: 'TikTok', href: site.social.tiktok, Icon: TikTokIcon },
    { label: 'YouTube', href: site.social.youtube, Icon: YouTubeIcon },
  ];

  return (
    <footer className="bg-espresso text-linen">
      <Container>
        <div className="grid gap-16 py-24 md:py-32 lg:grid-cols-[220px_1fr] lg:gap-24">
          <div className="flex flex-col items-start gap-8">
            <LogoMark className="h-20 w-20" />
            <div className="flex gap-5">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  // TODO: CONTENIDO CLIENTE — URLs reales de redes en site.ts
                  href={href ?? '#'}
                  aria-label={label}
                  className="text-gold transition-colors duration-200 hover:text-gold-lt"
                  {...(href ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
            {site.footer.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <Eyebrow>{col.title}</Eyebrow>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-body text-linen/80 transition-colors duration-200 hover:text-gold-lt"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <Eyebrow>{site.footer.contactTitle}</Eyebrow>
              <ul className="mt-5 space-y-3 text-body text-linen/80">
                {site.contact.email && (
                  <li>
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="transition-colors duration-200 hover:text-gold-lt"
                    >
                      {site.contact.email}
                    </a>
                  </li>
                )}
                {site.contact.phone && (
                  <li>
                    <a
                      href={`tel:${site.contact.phone.replace(/[^+\d]/g, '')}`}
                      className="transition-colors duration-200 hover:text-gold-lt"
                    >
                      {site.contact.phone}
                    </a>
                  </li>
                )}
                <li>{site.location}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 border-t border-linen/15 py-8 text-caption text-linen/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.footer.rights}
          </p>
          <div className="flex gap-8">
            {site.footer.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-gold-lt"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
