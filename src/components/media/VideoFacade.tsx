'use client';

import { useState } from 'react';
import { site } from '@/content/site';
import { cn } from '@/lib/cn';
import { Picture } from './Picture';
import { PlayIcon } from '../ui/icons';

// Facade: miniatura estática + botón de play; el iframe del proveedor recién
// se carga al hacer clic. El video nunca se sirve desde nuestro CDN.
export type VideoSource = {
  provider: 'youtube' | 'vimeo';
  id: string;
  title: string;
};

type VideoFacadeProps = VideoSource & {
  /** Clave del manifest para la miniatura. */
  poster: string;
  posterAlt?: string;
  /** Relación de aspecto CSS, ej. "16 / 9" o "9 / 16" (reels). */
  aspect?: string;
  sizes?: string;
  className?: string;
};

export function embedUrl({ provider, id }: Pick<VideoSource, 'provider' | 'id'>) {
  return provider === 'youtube'
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
    : `https://player.vimeo.com/video/${id}?autoplay=1`;
}

export function VideoFacade({
  provider,
  id,
  title,
  poster,
  posterAlt = '',
  aspect = '16 / 9',
  sizes,
  className,
}: VideoFacadeProps) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn('relative overflow-hidden bg-espresso', className)}
      style={{ aspectRatio: aspect }}
    >
      {playing ? (
        <iframe
          src={embedUrl({ provider, id })}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${site.a11y.playVideo}: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          <Picture
            src={poster}
            alt={posterAlt}
            sizes={sizes}
            className="absolute inset-0 h-full"
            imgClassName="h-full object-cover"
          />
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-espresso/40 text-bone backdrop-blur-[2px] transition-colors duration-200 group-hover:bg-espresso/60">
              <PlayIcon width={24} height={24} />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
