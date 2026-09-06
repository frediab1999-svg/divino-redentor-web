import { useEffect, useState } from "react";
import { SCHEDULE, CHOIR_REHEARSALS, LOCATION, WHATSAPP_URL, FACEBOOK_URL } from "@/data/church";
import { SectionTitle } from "./SectionTitle";
import { AnimatedSection } from "./AnimatedSection";
import { MapPinIcon, WhatsAppIcon, FacebookIcon } from "./section-icons";

// Vista visual tipo mapa (inspiración Stitch). Sin iframe real ni librerías:
// fondo navy + líneas sutiles + tarjeta flotante. Enlaza a LOCATION.mapsUrl.
function MapPreview() {
  return (
    <a
      href={LOCATION.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir ubicación en Google Maps"
      className="group relative block h-64 overflow-hidden rounded-lg border border-border bg-primary"
    >
      {/* Líneas sutiles simulando calles */}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 256"
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        className="absolute inset-0 h-full w-full text-primary-foreground/[0.06]"
      >
        <path d="M0 64 H400" strokeWidth="5" />
        <path d="M0 170 H400" strokeWidth="5" />
        <path d="M150 0 V256" strokeWidth="5" />
        <path d="M300 0 V256" strokeWidth="5" />
        <path d="M0 210 L400 70" strokeWidth="3" />
        <g className="text-primary-foreground/[0.05]">
          <path d="M70 0 V256" strokeWidth="1.5" />
          <path d="M230 0 V256" strokeWidth="1.5" />
          <path d="M360 0 V256" strokeWidth="1.5" />
          <path d="M0 30 H400" strokeWidth="1.5" />
          <path d="M0 110 H400" strokeWidth="1.5" />
          <path d="M0 220 H400" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Marcador de ubicación */}
      <span className="absolute left-[38%] top-[40%] -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 -m-2 rounded-full bg-gold/20" />
        <span className="relative text-gold">
          <MapPinIcon className="h-7 w-7" />
        </span>
      </span>

      {/* Tarjeta flotante con la ubicación */}
      <div className="absolute inset-x-3 bottom-3 rounded-lg border border-border bg-card p-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-gold">Ubicación</p>
        <p className="mt-1 font-display text-primary text-sm leading-snug">{LOCATION.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{LOCATION.address}</p>
        <p className="mt-2 text-xs text-gold group-hover:underline">
          Abrir ubicación en Google Maps →
        </p>
      </div>
    </a>
  );
}

// Día de la semana según Date.getDay() (0 = domingo), para marcar "Hoy".
const DAY_INDEX: Record<string, number> = {
  Domingo: 0,
  Lunes: 1,
  Martes: 2,
  Miércoles: 3,
  Jueves: 4,
  Viernes: 5,
  Sábado: 6,
};

// Los cultos se agrupan por día para que el visitante lea la semana de un
// vistazo ("el sábado hay dos") en vez de una lista plana de cinco renglones.
function groupScheduleByDay() {
  const groups: { day: string; items: typeof SCHEDULE }[] = [];
  for (const item of SCHEDULE) {
    const last = groups[groups.length - 1];
    if (last && last.day === item.day) last.items.push(item);
    else groups.push({ day: item.day, items: [item] });
  }
  return groups;
}

function ScheduleCard() {
  // El día se calcula tras montar para no desincronizar el HTML del servidor.
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(new Date().getDay()), []);

  return (
    <div className="bg-card border border-border rounded-lg p-7 h-full">
      <p className="text-xs uppercase tracking-[0.25em] text-gold mb-6">Horarios de culto</p>

      <div className="space-y-5">
        {groupScheduleByDay().map(({ day, items }) => {
          const isToday = today !== null && DAY_INDEX[day] === today;
          return (
            <div key={day} className="border-t border-border pt-4 first:border-t-0 first:pt-0">
              <div className="flex items-center gap-2 mb-2.5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-primary/50">{day}</p>
                {isToday && (
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-gold">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    Hoy
                  </span>
                )}
              </div>
              <ul className="space-y-2">
                {items.map((s) => (
                  <li key={s.label} className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-primary text-sm leading-snug">
                      {s.label}
                    </span>
                    <span className="text-sm font-medium text-gold shrink-0 whitespace-nowrap">
                      {s.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="text-xs uppercase tracking-[0.25em] text-gold mt-8 mb-4">Ensayo de coro</p>
      <ul className="space-y-3">
        {CHOIR_REHEARSALS.map((c) => (
          <li
            key={c.choir}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
          >
            <span className="font-display text-primary text-sm leading-snug min-w-0">
              {c.choir}
            </span>
            <span className="flex flex-wrap items-center gap-x-2 gap-y-1 shrink-0">
              {c.times.map((t) => (
                <span
                  key={`${c.choir}-${t.day}-${t.time}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-2 py-0.5 text-[11px] text-muted-foreground whitespace-nowrap"
                >
                  {t.day}
                  <span className="font-medium text-gold">{t.time}</span>
                </span>
              ))}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ContactSection() {
  return (
    <section id="contacto" className="py-24 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <SectionTitle
            eyebrow="Contacto"
            title="Estamos para servirte"
            subtitle="Escríbenos por WhatsApp o visítanos en nuestros horarios de culto."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Horarios */}
          <AnimatedSection>
            <ScheduleCard />
          </AnimatedSection>

          {/* Ubicación + WhatsApp */}
          <div className="flex flex-col gap-5">
            <AnimatedSection delay={80}>
              <MapPreview />
            </AnimatedSection>

            <AnimatedSection delay={160}>
              <div className="bg-card border border-border rounded-lg p-7">
                <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">Contáctanos</p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors text-sm"
                  >
                    <WhatsAppIcon className="h-4 w-4" />
                    Mensaje por WhatsApp
                  </a>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-primary/30 text-primary px-6 py-3 rounded-md font-medium hover:bg-primary/5 transition-colors text-sm"
                  >
                    <FacebookIcon className="h-4 w-4" />
                    Síguenos en Facebook
                  </a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
