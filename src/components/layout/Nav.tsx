'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';
import { Container } from './Container';
import { Logo } from './Logo';
import { Button } from '../ui/Button';
import { CloseIcon, MenuIcon } from '../ui/icons';

// Rutas con hero oscuro a pantalla completa: ahí el Nav arranca transparente
// con texto --bone. Agregar '/about' en fase 5 cuando exista su hero.
const DARK_HERO_ROUTES = ['/'];

const EASE = [0.22, 1, 0.36, 1] as const;

function normalize(pathname: string) {
  // Con trailingSlash, usePathname puede devolver '/about/' — normalizamos.
  return pathname !== '/' && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function Nav() {
  const pathname = normalize(usePathname());
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Transparente sobre el hero; pasado los 80px transiciona a fondo translúcido.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // El panel móvil se cierra al navegar y bloquea el scroll del documento.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const overlay = DARK_HERO_ROUTES.includes(pathname) && !scrolled && !open;

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300',
          scrolled && 'bg-[rgba(251,247,241,0.88)] backdrop-blur-[12px]',
        )}
      >
        <Container>
          <div className="flex h-20 items-center justify-between">
            <Link href="/" aria-label={site.name}>
              <Logo tone={overlay ? 'light' : 'dark'} />
            </Link>

            <nav className="hidden items-center gap-10 lg:flex" aria-label={site.a11y.mainNav}>
              {site.nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative py-1 text-eyebrow uppercase transition-colors duration-300',
                      overlay
                        ? 'text-bone hover:text-gold-lt'
                        : 'text-espresso hover:text-ember',
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-0 bottom-0 h-px bg-ember"
                        transition={{ duration: 0.3, ease: EASE }}
                      />
                    )}
                  </Link>
                );
              })}
              <Button href={site.cta.href} size="sm">
                {site.cta.label}
              </Button>
            </nav>

            <button
              type="button"
              className={cn(
                'transition-colors duration-300 lg:hidden',
                overlay ? 'text-bone' : 'text-espresso',
              )}
              aria-label={open ? site.a11y.closeMenu : site.a11y.openMenu}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <CloseIcon width={24} height={24} /> : <MenuIcon width={24} height={24} />}
            </button>
          </div>
        </Container>
      </header>

      {/* Reserva la altura del nav en páginas sin hero oscuro. */}
      {!DARK_HERO_ROUTES.includes(pathname) && <div aria-hidden className="h-20" />}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col bg-bone lg:hidden"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <motion.nav
              className="flex flex-1 flex-col items-start justify-center gap-8 px-6 pt-20"
              aria-label={site.a11y.mainNav}
              initial="closed"
              animate="open"
              variants={{ open: { transition: { staggerChildren: 0.06 } } }}
            >
              {site.nav.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    closed: { opacity: 0, y: 24 },
                    open: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                  }}
                >
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={cn(
                      'font-display text-display-m',
                      pathname === item.href ? 'text-ember' : 'text-espresso',
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                variants={{
                  closed: { opacity: 0, y: 24 },
                  open: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                }}
                className="pt-4"
              >
                <Button href={site.cta.href}>{site.cta.label}</Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
