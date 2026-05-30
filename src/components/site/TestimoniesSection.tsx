import { TESTIMONIES } from "@/data/church";
import { SectionTitle } from "./SectionTitle";
import { AnimatedSection } from "./AnimatedSection";

export function TestimoniesSection() {
  return (
    <section id="testimonios" className="py-24 px-6 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <SectionTitle
            eyebrow="Testimonios"
            title="Voces de nuestra congregación"
            subtitle="Hermanos y hermanas comparten cómo el Señor ha obrado en sus vidas."
          />
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-x-10 gap-y-12">
          {TESTIMONIES.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 80}>
              <figure className="h-full flex flex-col border-t border-border pt-6">
                <span
                  aria-hidden="true"
                  className="font-display text-5xl leading-none text-gold/70"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-1 flex-1 font-display text-xl md:text-[1.35rem] leading-snug text-foreground/85">
                  {t.text}
                </blockquote>
                <figcaption className="mt-5 text-sm uppercase tracking-[0.18em] text-primary">
                  {t.name}
                </figcaption>
              </figure>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
