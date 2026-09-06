import { useEffect, useState } from "react";
import { SCHEDULE } from "@/data/church";

// Abreviatura de tres letras para la columna de cada culto.
const DAY_ABBR: Record<string, string> = {
  Miércoles: "Mié",
  Sábado: "Sáb",
  Domingo: "Dom",
};

// Día de la semana según Date.getDay() (0 = domingo).
const DAY_INDEX: Record<string, number> = {
  Domingo: 0,
  Lunes: 1,
  Martes: 2,
  Miércoles: 3,
  Jueves: 4,
  Viernes: 5,
  Sábado: 6,
};

/**
 * Banda "Cada semana": el ritmo semanal de la congregación en un vistazo, al
 * inicio de la agenda. No sustituye a los horarios de Contacto (que llevan el
 * detalle y los ensayos de coro): los anticipa y enlaza hacia ellos.
 */
export function WeeklyRhythm() {
  // El día se calcula tras montar para no desincronizar el HTML del servidor.
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(new Date().getDay()), []);

  return (
    <div className="bg-card border border-border rounded-lg p-6 sm:p-7 mb-10">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 mb-5">
        <p className="text-[11px] uppercase tracking-[0.25em] text-gold">Cada semana</p>
        <a
          href="#contacto"
          className="text-xs text-muted-foreground hover:text-gold transition-colors"
        >
          Ensayos de coro y ubicación →
        </a>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {SCHEDULE.map((s) => {
          const isToday = today !== null && DAY_INDEX[s.day] === today;
          return (
            <li
              key={s.label}
              className={`rounded-lg border p-3 text-center transition-colors ${
                isToday ? "border-gold bg-gold/5" : "border-border bg-secondary/40"
              }`}
            >
              <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                {DAY_ABBR[s.day] ?? s.day}
              </p>
              <p className="mt-1 font-display text-lg sm:text-xl text-primary leading-none">
                {s.time.replace(" ", " ")}
              </p>
              <p className="mt-1.5 text-xs text-primary/70 leading-snug">{s.short ?? s.label}</p>
              {isToday && (
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-gold">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                  Hoy
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
