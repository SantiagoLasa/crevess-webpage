import { fallbackSrc, getMedia, srcSetFor } from '@/lib/media';
import { cn } from '@/lib/cn';

type PictureProps = {
  /** Clave del manifest: ruta en assets-raw/ sin extensión, ej. "samples/golden-01". */
  src: string;
  alt: string;
  /** Atributo sizes — describir el ancho real que ocupa la imagen en el layout. */
  sizes?: string;
  /** Above the fold: eager + fetchpriority high. El resto carga lazy. */
  priority?: boolean;
  className?: string;
  imgClassName?: string;
};

// Reemplazo de next/image para export estático. Renderiza <picture> con
// AVIF → WebP → JPG, width/height explícitos (cero CLS) y blur placeholder.
export function Picture({
  src,
  alt,
  sizes = '100vw',
  priority = false,
  className,
  imgClassName,
}: PictureProps) {
  const media = getMedia(src);

  return (
    <picture className={cn('block', className)}>
      <source type="image/avif" srcSet={srcSetFor(src, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSetFor(src, 'webp')} sizes={sizes} />
      <img
        src={fallbackSrc(src)}
        srcSet={srcSetFor(src, 'jpg')}
        sizes={sizes}
        alt={alt}
        width={media.width}
        height={media.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        className={cn('h-auto w-full', imgClassName)}
        style={{
          backgroundImage: `url(${media.blurDataURL})`,
          backgroundSize: 'cover',
        }}
      />
    </picture>
  );
}
