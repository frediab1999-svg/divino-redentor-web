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
 * Franja "Nuestra semana": el ritmo semanal de la congregación en un vistazo,
 * al entrar a la agenda. Va sobre el navy de la marca y a todo lo ancho para
 * que el color —y no un marco de tarjeta— la separe de los eventos con fecha
 * que vienen debajo. El detalle completo (y los ensayos) sigue en Contacto.
 */
export function WeeklyRhythm() {
  // El día se calcula tras montar para no desincronizar el HTML del servidor.
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(new Date().getDay()), []);

  return (
    <div className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14 md:py-16">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4 mb-9">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-gold mb-3">Nuestra semana</p>
            <h2 className="font-display text-2xl md:text-3xl leading-tight">
              Te esperamos cada semana
            </h2>
          </div>
          <a
            href="#contacto"
            className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
          >
            Ensayos de coro y ubicación →
          </a>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-8 lg:[&>li+li]:border-l lg:[&>li+li]:border-primary-foreground/10">
          {SCHEDULE.map((s) => {
            const isToday = today !== null && DAY_INDEX[s.day] === today;
            return (
              <li key={s.label} className="px-1 lg:px-5 text-center lg:text-left">
                <p className="text-[11px] uppercase tracking-[0.2em] text-primary-foreground/50">
                  {DAY_ABBR[s.day] ?? s.day}
                </p>
                <p
                  className={`mt-2 font-display text-2xl md:text-[1.75rem] leading-none whitespace-nowrap ${
                    isToday ? "text-gold" : "text-primary-foreground"
                  }`}
                >
                  {s.time}
                </p>
                <p className="mt-2 text-sm text-primary-foreground/75 leading-snug">
                  {s.short ?? s.label}
                </p>
                {/* Subrayado dorado: marca el día en curso sin agregar un marco. */}
                <span
                  aria-hidden="true"
                  className={`mt-4 block h-px mx-auto lg:mx-0 transition-all ${
                    isToday ? "w-10 bg-gold" : "w-6 bg-primary-foreground/15"
                  }`}
                />
                {isToday && (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-gold">Hoy</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
