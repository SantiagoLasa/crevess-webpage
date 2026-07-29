import type { MDXComponents } from 'mdx/types';

// Mapeo tipográfico del cuerpo de artículo — layout editorial de una columna,
// medida 680px (la impone el contenedor del artículo).
export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-12 font-display text-display-m" {...props} />,
  h3: (props) => <h3 className="mt-10 text-body-l font-bold" {...props} />,
  p: (props) => <p className="mt-5 text-body" {...props} />,
  ul: (props) => <ul className="mt-5 space-y-3" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal space-y-3 pl-5" {...props} />,
  li: (props) => (
    <li
      className="flex items-baseline gap-4 text-body before:h-px before:w-6 before:shrink-0 before:translate-y-[-3px] before:bg-gold [ol_&]:block [ol_&]:before:hidden"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-8 border-l border-gold pl-6 font-display text-display-m italic text-stone [&_p]:mt-0 [&_p]:text-inherit [&_p]:[font-size:inherit] [&_p]:[line-height:inherit]"
      {...props}
    />
  ),
  a: (props) => (
    <a
      className="font-medium underline decoration-gold decoration-1 underline-offset-4 transition-colors duration-200 hover:text-ember"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-bold" {...props} />,
  hr: () => (
    <div
      aria-hidden
      className="my-12 h-px w-full"
      style={{
        background: 'linear-gradient(90deg, transparent, var(--gold), transparent)',
      }}
    />
  ),
};
