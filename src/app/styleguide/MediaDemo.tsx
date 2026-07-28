'use client';

import { useState } from 'react';
import { Picture } from '@/components/media/Picture';
import { VideoFacade } from '@/components/media/VideoFacade';
import { Lightbox, type LightboxItem } from '@/components/media/Lightbox';

// Demo interno de los componentes de media (fase 3). Las imágenes son
// placeholders generados en la paleta — se reemplazan con fotografía real.
const items: LightboxItem[] = [
  { type: 'image', src: 'samples/golden-01', alt: 'Placeholder golden hour, formato 4:5' },
  { type: 'image', src: 'samples/golden-02', alt: 'Placeholder golden hour, formato 16:9' },
  { type: 'image', src: 'samples/golden-03', alt: 'Placeholder golden hour, formato 9:16' },
];

export function MediaDemo() {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-3">
        {items.map((item, i) =>
          item.type === 'image' ? (
            <button
              key={item.src}
              type="button"
              onClick={() => setIndex(i)}
              className="group block overflow-hidden"
              aria-label={item.alt}
            >
              {/* Hover de portfolio: scale 1.03 dentro de overflow hidden, 500ms */}
              <Picture
                src={item.src}
                alt={item.alt}
                sizes="(min-width: 640px) 33vw, 100vw"
                imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
          ) : null,
        )}
      </div>

      <div className="mt-16 max-w-[880px]">
        {/* TODO: CONTENIDO CLIENTE — reemplazar por el reel real de Crevess.
            Big Buck Bunny (Blender Foundation) solo como demo del facade. */}
        <VideoFacade
          provider="vimeo"
          id="1084537"
          title="Demo — Big Buck Bunny"
          poster="samples/golden-02"
          sizes="(min-width: 1024px) 880px, 100vw"
        />
      </div>

      <Lightbox
        items={items}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </div>
  );
}
