import { useState } from "react";
import {
  EVENTS,
  EVENT_CATEGORY_LABELS,
  getEventStatus,
  getUpcomingEvents,
  getPastEvents,
  type ChurchEvent,
  type EventStatus,
} from "@/data/church";
import { SectionTitle } from "./SectionTitle";
import { AnimatedSection } from "./AnimatedSection";
import { MapPinIcon } from "./section-icons";
import { WeeklyRhythm } from "./WeeklyRhythm";

const STATUS_CONFIG: Record<EventStatus, { label: string; dot: string }> = {
  today: { label: "Hoy", dot: "bg-gold" },
  upcoming: { label: "Próximo", dot: "bg-primary" },
  finished: { label: "Finalizado", dot: "bg-muted-foreground/50" },
};

function formatDate(dateStr: string): { day: string; month: string; year: string } {
  const d = new Date(dateStr + "T00:00:00");
  return {
    day: d.getDate().toString(),
    month: d.toLocaleString("es-MX", { month: "short" }).replace(".", ""),
    year: d.getFullYear().toString(),
  };
}

function formatTime(time?: string): string {
  if (!time) return "";
  const [h, m] = time.split(":");
  const hour = parseInt(h, 10);
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${display}:${m} ${suffix}`;
}

function EventCard({ event, delay }: { event: ChurchEvent; delay: number }) {
  const status = getEventStatus(event);
  const { label: statusLabel, dot } = STATUS_CONFIG[status];
  const { day, month, year } = formatDate(event.date);
  const categoryLabel = EVENT_CATEGORY_LABELS[event.category];

  return (
    <AnimatedSection delay={delay} className="h-full">
      <article
        className={`h-full bg-card border rounded-lg overflow-hidden flex flex-col sm:flex-row transition-colors hover:border-primary/30 ${
          event.featured ? "border-border border-l-4 border-l-primary" : "border-border"
        }`}
      >
        {/* Bloque de fecha — calendario editorial sobrio */}
        <div className="sm:w-24 shrink-0 bg-secondary/40 border-b border-border sm:border-b-0 sm:border-r px-4 py-3 sm:py-5 flex flex-row sm:flex-col items-center sm:justify-center gap-3 sm:gap-0 text-center">
          <div className="flex items-baseline sm:block gap-2 sm:gap-0">
            <p className="font-display text-2xl sm:text-3xl text-primary leading-none">{day}</p>
            <p className="text-xs uppercase tracking-wider text-gold sm:mt-1">{month}</p>
          </div>
          <p className="text-[11px] text-muted-foreground hidden sm:block sm:mt-0.5">{year}</p>
          {event.time && (
            <p className="text-[11px] text-muted-foreground sm:mt-2 shrink-0">
              {formatTime(event.time)}
            </p>
          )}
        </div>

        {/* Contenido */}
        <div className="p-5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-2">
            {/* Estado: etiqueta fina con punto */}
            <span className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
              {statusLabel}
            </span>
            {/* Un solo chip de categoría */}
            <span className="inline-flex items-center text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-md bg-secondary text-primary/80 border border-border">
              {categoryLabel}
            </span>
          </div>

          <h3 className="font-display text-lg text-primary leading-tight">{event.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{event.description}</p>

          {event.location && (
            <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
              <MapPinIcon className="h-3.5 w-3.5 shrink-0" />
              {event.location}
            </div>
          )}
        </div>
      </article>
    </AnimatedSection>
  );
}

export function EventsSection() {
  const [showPast, setShowPast] = useState(false);
  const upcoming = getUpcomingEvents(EVENTS);
  const past = getPastEvents(EVENTS);

  return (
    <section id="eventos">
      {/* Franja navy a todo lo ancho: el ritmo semanal, separado por color de
          los eventos con fecha que vienen debajo sobre fondo claro. */}
      <WeeklyRhythm />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24">
        <AnimatedSection>
          <SectionTitle
            eyebrow="Agenda"
            title="Eventos especiales"
            subtitle="Fechas puntuales del calendario de la congregación. Toda la comunidad está cordialmente invitada."
          />
        </AnimatedSection>

        {upcoming.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {upcoming.map((e, i) => (
              <EventCard key={e.id} event={e} delay={i * 80} />
            ))}
          </div>
        ) : (
          <AnimatedSection>
            <div className="text-center py-14 bg-card border border-border rounded-lg mb-8">
              <p className="font-display text-xl text-primary">Próximamente</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Pronto se anunciarán los próximos eventos de la congregación.
              </p>
            </div>
          </AnimatedSection>
        )}

        {/* Eventos pasados */}
        {past.length > 0 && (
          <AnimatedSection>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowPast((v) => !v)}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform ${showPast ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
                {showPast
                  ? "Ocultar"
                  : `Ver ${past.length} evento${past.length !== 1 ? "s" : ""} anterior${past.length !== 1 ? "es" : ""}`}
              </button>

              {showPast && (
                <div className="mt-6 grid md:grid-cols-2 gap-5 text-left">
                  {past.map((e, i) => (
                    <EventCard key={e.id} event={e} delay={i * 60} />
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
