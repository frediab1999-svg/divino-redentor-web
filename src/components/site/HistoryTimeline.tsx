import { HISTORY_BLOCKS } from "@/data/church";
import { AnimatedSection } from "./AnimatedSection";
import { SectionTitle } from "./SectionTitle";

export function HistoryTimeline() {
  return (
    <section id="historia" className="py-24 px-6 lg:px-10">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <SectionTitle
            eyebrow="Nuestra historia"
            title="Una herencia de fe en Kimbilá"
            subtitle="Conoce los inicios, el crecimiento y los momentos significativos de nuestra congregación."
            center={false}
          />
        </AnimatedSection>

        {/* Línea editorial única, alineada a la izquierda */}
        <div className="relative mt-4 border-l-2 border-border pl-8 sm:pl-10 space-y-14">
          {HISTORY_BLOCKS.map((block, i) => (
            <AnimatedSection key={block.id} delay={i * 100}>
              <article className="relative">
                {/* Punto sobre la línea */}
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-[38px] sm:-left-[46px] h-3 w-3 rounded-full bg-gold ring-4 ring-background"
                />

                <p className="text-xs uppercase tracking-[0.25em] text-gold">{block.era}</p>
                <h3 className="mt-1.5 font-display text-2xl md:text-3xl text-primary leading-tight">
                  {block.title}
                </h3>
                <div className="mt-3 space-y-4">
                  {block.content.map((item, k) =>
                    item.type === "quote" ? (
                      <blockquote
                        key={k}
                        className="border-l-2 border-gold pl-4 py-1 my-2"
                      >
                        <p className="font-display text-lg md:text-xl text-primary/90 leading-snug italic">
                          &ldquo;{item.text}&rdquo;
                        </p>
                        <cite className="mt-1.5 block not-italic text-xs uppercase tracking-[0.18em] text-gold">
                          {item.author}
                        </cite>
                      </blockquote>
                    ) : (
                      <p key={k} className="text-muted-foreground leading-relaxed">
                        {item.text}
                      </p>
                    ),
                  )}
                </div>

                {/* Imágenes reales cuando existan (overlay caliza sutil) */}
                {block.images && block.images.length > 0 && (
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {block.images.map((src, j) => (
                      <div
                        key={j}
                        className="relative aspect-[4/3] overflow-hidden rounded-md border border-border bg-secondary"
                      >
                        <img
                          src={src}
                          alt={j === 0 ? block.title : ""}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
                      </div>
                    ))}
                  </div>
                )}
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
