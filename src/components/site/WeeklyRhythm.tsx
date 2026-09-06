import { useEffect, useState } from "react";
import { SCHEDULE } from "@/data/church";
import { useIntersection } from "@/hooks/use-intersection";

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
 *
 * Su encabezado se mantiene deliberadamente pequeño: el título grande de la
 * sección es "Eventos especiales", y dos títulos del mismo peso competirían.
 */
export function WeeklyRhythm() {
  // El día se calcula tras montar para no desincronizar el HTML del servidor.
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(new Date().getDay()), []);

  // Las columnas entran escalonadas al asomarse la franja, como las demás
  // secciones del sitio (mismo tiempo y curva que `AnimatedSection`).
  const { ref, visible } = useIntersection();

  return (
    <div className="bg-primary text-primary-foreground">
      {/* Filo dorado: cierra la franja con el mismo acento de los títulos. */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12 md:py-14">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-gold mb-2">Nuestra semana</p>
            <h2 className="font-display text-xl md:text-2xl leading-tight">
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

        <ul
          ref={ref as React.RefObject<HTMLUListElement>}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-7 lg:[&>li+li]:border-l lg:[&>li+li]:border-primary-foreground/10"
        >
          {SCHEDULE.map((s, i) => {
            const isToday = today !== null && DAY_INDEX[s.day] === today;
            return (
              <li
                key={s.label}
                style={{ transitionDelay: `${i * 70}ms` }}
                className={`group px-1 lg:px-5 text-center lg:text-left transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <p className="text-[11px] uppercase tracking-[0.2em] text-primary-foreground/50">
                  {DAY_ABBR[s.day] ?? s.day}
                </p>
                <p
                  className={`mt-2 font-display text-xl md:text-2xl leading-none whitespace-nowrap transition-colors duration-500 ${
                    isToday ? "text-gold" : "text-primary-foreground"
                  }`}
                >
                  {s.time}
                </p>
                <p className="mt-1.5 text-[13px] sm:text-sm text-primary-foreground/75 leading-snug">
                  {s.short ?? s.label}
                </p>
                {/* Filete: se dibuja de izquierda a derecha y se alarga en el
                    día en curso (y al pasar el cursor por la columna). */}
                <span
                  aria-hidden="true"
                  className={`mt-3.5 block h-px mx-auto lg:mx-0 origin-center lg:origin-left bg-gold transition-all duration-700 ease-out ${
                    isToday
                      ? "w-10 opacity-100"
                      : "w-6 opacity-25 group-hover:w-10 group-hover:opacity-60"
                  } ${visible ? "scale-x-100" : "scale-x-0"}`}
                  style={{ transitionDelay: `${i * 70 + 200}ms` }}
                />
                {isToday && (
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-gold">Hoy</p>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </div>
  );
}
