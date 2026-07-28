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
