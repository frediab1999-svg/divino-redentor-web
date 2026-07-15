// Iconos SVG de línea, SOLO presentacionales, para los ministerios.
// No contiene datos de la iglesia: mapea el `id` del ministerio a un glifo.
// Si un id no está mapeado, usa el ícono de respaldo (comunidad).

type IconProps = { className?: string };

function Svg({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const ICONS: Record<string, (p: IconProps) => React.ReactElement> = {
  // Alabanza (sábados) — nota musical
  "alabanza-sabados": ({ className }) => (
    <Svg className={className}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </Svg>
  ),
  // Alabanza (domingos) — notas con barra
  "alabanza-domingos": ({ className }) => (
    <Svg className={className}>
      <path d="M9 18V5l12-2v13" />
      <path d="m9 9 12-2" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </Svg>
  ),
  // Audio — niveles / mezcladora
  audio: ({ className }) => (
    <Svg className={className}>
      <line x1="21" x2="14" y1="4" y2="4" />
      <line x1="10" x2="3" y1="4" y2="4" />
      <line x1="21" x2="12" y1="12" y2="12" />
      <line x1="8" x2="3" y1="12" y2="12" />
      <line x1="21" x2="16" y1="20" y2="20" />
      <line x1="12" x2="3" y1="20" y2="20" />
      <line x1="14" x2="14" y1="2" y2="6" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="16" x2="16" y1="18" y2="22" />
    </Svg>
  ),
  // Música — nota individual
  musica: ({ className }) => (
    <Svg className={className}>
      <circle cx="8" cy="18" r="4" />
      <path d="M12 18V2l7 4" />
    </Svg>
  ),
  // Coro — micrófono
  coro: ({ className }) => (
    <Svg className={className}>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </Svg>
  ),
  // Coro infantil — corazón (cercanía/calidez)
  "coro-infantil": ({ className }) => (
    <Svg className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </Svg>
  ),
  // Guardatemplo — escudo (cuidado/seguridad)
  guardatemplo: ({ className }) => (
    <Svg className={className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" />
    </Svg>
  ),
};

function FallbackIcon({ className }: IconProps) {
  // Respaldo: comunidad / personas
  return (
    <Svg className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </Svg>
  );
}

export function MinistryIcon({ id, className = "h-5 w-5" }: { id: string; className?: string }) {
  const Icon = ICONS[id] ?? FallbackIcon;
  return <Icon className={className} />;
}

// Glifos sueltos reutilizables (galería, ubicación, eventos).
export function CameraIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
      <circle cx="12" cy="13" r="3" />
    </Svg>
  );
}

export function MapPinIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  );
}

// Facebook — glifo sólido (red social).
export function FacebookIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  );
}

// WhatsApp — glifo sólido (CTA de contacto).
export function WhatsAppIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12 0C5.37 0 .01 5.36.01 12c0 2.11.55 4.16 1.6 5.97L0 24l6.2-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52ZM12 21.82a9.79 9.79 0 0 1-4.99-1.36l-.36-.21-3.68.96.98-3.59-.23-.37A9.79 9.79 0 1 1 21.82 12 9.8 9.8 0 0 1 12 21.82Zm5.37-7.34c-.29-.15-1.74-.86-2.01-.96-.27-.1-.46-.15-.66.15s-.76.96-.93 1.16c-.17.2-.34.22-.63.07-.29-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.03-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.59-.91-2.18-.24-.58-.49-.5-.66-.51l-.56-.01c-.2 0-.51.07-.78.37s-1.02 1-1.02 2.43 1.05 2.83 1.2 3.02c.15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.67.62.7.22 1.34.19 1.84.12.56-.08 1.74-.71 1.99-1.4.24-.69.24-1.27.17-1.4-.07-.12-.27-.2-.56-.34Z" />
    </svg>
  );
}
