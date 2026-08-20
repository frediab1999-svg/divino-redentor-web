import { AnimatedSection } from "./AnimatedSection";

type GuideItem = {
  href: string;
  key: "historia" | "liderazgo" | "ministerios" | "eventos" | "galeria" | "contacto";
  label: string;
  desc: string;
};

const GUIDE_ITEMS: GuideItem[] = [
  { href: "#historia", key: "historia", label: "Historia", desc: "Nuestros inicios y crecimiento" },
  { href: "#liderazgo", key: "liderazgo", label: "Liderazgo", desc: "Organizaciones y directivas" },
  {
    href: "#ministerios",
    key: "ministerios",
    label: "Ministerios",
    desc: "Grupos de servicio y música",
  },
  { href: "#eventos", key: "eventos", label: "Eventos", desc: "Próximas actividades" },
  { href: "#galeria", key: "galeria", label: "Galería", desc: "Momentos de la congregación" },
  { href: "#contacto", key: "contacto", label: "Contacto", desc: "Horarios y ubicación" },
];

function GuideIcon({ name }: { name: GuideItem["key"] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "historia":
      return (
        <svg {...common}>
          <path d="M12 7v14" />
          <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
        </svg>
      );
    case "liderazgo":
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "ministerios":
      return (
        <svg {...common}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );
    case "eventos":
      return (
        <svg {...common}>
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M3 10h18" />
        </svg>
      );
    case "galeria":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="9" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      );
    case "contacto":
      return (
        <svg {...common}>
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
  }
}

export function NavigationGuide() {
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 mt-12 sm:mt-16">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {GUIDE_ITEMS.map((item, i) => (
          <AnimatedSection key={item.href} delay={i * 60}>
            <a
              href={item.href}
              className="group flex h-full flex-col items-center gap-2 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors text-center"
            >
              <span className="text-gold group-hover:text-primary transition-colors">
                <GuideIcon name={item.key} />
              </span>
              <span className="font-display text-sm font-semibold text-primary leading-tight">
                {item.label}
              </span>
              <span className="text-[11px] text-muted-foreground leading-tight hidden sm:block">
                {item.desc}
              </span>
            </a>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
