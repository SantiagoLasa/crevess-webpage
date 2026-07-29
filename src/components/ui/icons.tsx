// Iconos SVG inline — trazo 1.5px, color via currentColor (--gold por defecto
// en contexto). Nunca emojis como iconos.

type IconProps = React.SVGProps<SVGSVGElement>;

function iconDefaults(props: IconProps): IconProps {
  return {
    viewBox: '0 0 24 24',
    width: 20,
    height: 20,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
    ...props,
  };
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8h.01" />
    </svg>
  );
}

export function TikTokIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M14 4v10.5a4 4 0 1 1-4-4" />
      <path d="M14 5.5a5.5 5.5 0 0 0 5 4.5" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <rect x="2.5" y="6" width="19" height="12.5" rx="3.5" />
      <path d="M10.2 9.6l4.4 2.65-4.4 2.65z" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.85L3.5 20.5l4.3-1.15A8.5 8.5 0 1 0 12 3.5z" />
      <path d="M9.2 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.2-.1.3 0 .5a6 6 0 0 0 2.6 2.4c.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.6-.1l1.5.7c.3.2.4.3.4.5-.1.7-.6 1.4-1.3 1.6-.6.2-1.3.2-2.2-.2a10 10 0 0 1-4.6-4.1c-.5-.8-.7-1.6-.5-2.3.1-.4.3-.7.5-.9z" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M8.5 5.5l10 6.5-10 6.5z" />
    </svg>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M14.5 5.5L8 12l6.5 6.5" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M9.5 5.5L16 12l-6.5 6.5" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M4 9h16" />
      <path d="M4 15h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...iconDefaults(props)}>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}
