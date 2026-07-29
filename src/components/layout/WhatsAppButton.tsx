'use client';

import { useEffect, useState } from 'react';
import { contact } from '@/content/contact';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';
import { WhatsAppIcon } from '../ui/icons';

// Botón flotante de WhatsApp — presente en todas las páginas, aparece tras
// 400px de scroll. Si no hay número configurado (site.contact.whatsapp),
// no se renderiza. TODO: CONTENIDO CLIENTE — número y mensaje inicial.
const DEFAULT_MESSAGE = 'Hi! I found you through your website.';

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const number = site.contact.whatsapp;

  useEffect(() => {
    if (!number) return;
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [number]);

  if (!number) return null;

  const digits = number.replace(/[^\d]/g, '');
  const text = encodeURIComponent(DEFAULT_MESSAGE);

  const open = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Detección de dispositivo: app en móvil, WhatsApp Web en escritorio.
    const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const url = mobile
      ? `https://wa.me/${digits}?text=${text}`
      : `https://web.whatsapp.com/send?phone=${digits}&text=${text}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <a
      href={`https://wa.me/${digits}?text=${text}`}
      onClick={open}
      aria-label={contact.details.whatsappCta}
      className={cn(
        'fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full text-bone shadow-soft transition-opacity duration-300',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
      style={{ background: 'var(--glow)' }}
    >
      <WhatsAppIcon width={26} height={26} />
    </a>
  );
}
