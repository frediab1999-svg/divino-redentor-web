import { useIntersection } from "@/hooks/use-intersection";
import { useCountUp } from "@/hooks/use-count-up";
import { CHURCH_STATS } from "@/data/church";
import { AnimatedSection } from "./AnimatedSection";

function StatCard({
  label,
  value,
  suffix = "",
  index,
  delay = 0,
}: {
  label: string;
  value: number;
  suffix?: string;
  index: number;
  delay?: number;
}) {
  const { ref, visible } = useIntersection();
  const count = useCountUp(value, 2000, visible);
  return (
    <AnimatedSection delay={delay}>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`text-center px-4 py-8 sm:py-10 border-border ${
          index % 2 === 0 ? "border-r" : ""
        } ${index < 2 ? "border-b" : ""} md:border-b-0 md:border-r-0 ${
          index !== 0 ? "md:border-l" : ""
        }`}
      >
        <p className="font-display text-5xl md:text-6xl text-primary tabular-nums leading-none">
          {count}
          <span className="text-gold">{suffix}</span>
        </p>
        <p className="mt-3 text-xs sm:text-sm text-muted-foreground uppercase tracking-[0.2em]">
          {label}
        </p>
      </div>
    </AnimatedSection>
  );
}

export function StatsSection() {
  const years = new Date().getFullYear() - CHURCH_STATS.foundingYear;

  return (
    <section className="py-24 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <p className="text-xs uppercase tracking-[0.28em] text-gold text-center mb-10">
            La iglesia en números
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-2 md:grid-cols-4 rounded-lg border border-border bg-card overflow-hidden">
          <StatCard
            label="Miembros activos"
            value={CHURCH_STATS.totalMembers}
            index={0}
            delay={0}
          />
          <StatCard label="Años de historia" value={years} suffix="+" index={1} delay={80} />
          <StatCard
            label="Organizaciones"
            value={CHURCH_STATS.organizations}
            index={2}
            delay={160}
          />
          <StatCard label="Ministerios" value={CHURCH_STATS.ministries} index={3} delay={240} />
        </div>
      </div>
    </section>
  );
}
