import { SCHEDULE, LOCATION, WHATSAPP_URL } from "@/data/church";
import { SectionTitle } from "./SectionTitle";
import { AnimatedSection } from "./AnimatedSection";
import { MapPinIcon, WhatsAppIcon } from "./section-icons";

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
            <div className="bg-card border border-border rounded-lg p-7 h-full">
              <p className="text-xs uppercase tracking-[0.25em] text-gold mb-5">
                Horarios de culto
              </p>
              <ul className="space-y-0">
                {SCHEDULE.map((s) => (
                  <li
                    key={s.label}
                    className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-b-0"
                  >
                    <div className="min-w-0">
                      <span className="font-display text-primary text-sm">{s.label}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{s.day}</span>
                    </div>
                    <span className="text-sm font-medium text-gold shrink-0">{s.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Ubicación + WhatsApp */}
          <div className="flex flex-col gap-5">
            <AnimatedSection delay={80}>
              <MapPreview />
            </AnimatedSection>

            <AnimatedSection delay={160}>
              <div className="bg-card border border-border rounded-lg p-7">
                <p className="text-xs uppercase tracking-[0.25em] text-gold mb-4">Contáctanos</p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors text-sm"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Enviar mensaje por WhatsApp
                </a>
                <p className="mt-4 text-xs text-muted-foreground">Redes sociales: próximamente</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
