import { useState } from "react";
import {
  ORGS,
  getOrgPeople,
  getDisplayName,
  getDisplayPosition,
  type OrgConfig,
  type Person,
} from "@/data/church";
import { SectionTitle } from "./SectionTitle";
import { AnimatedSection } from "./AnimatedSection";
import { OrgDetailPanel } from "./OrgDetailPanel";
import { ProfileModal } from "./ProfileModal";

function OrgCard({
  org,
  onClick,
  delay,
  featured = false,
}: {
  org: OrgConfig;
  onClick: () => void;
  delay: number;
  featured?: boolean;
}) {
  const people = getOrgPeople(org);
  const leader = people[0];
  const leaderName = leader ? getDisplayName(leader) : "";
  const leaderPos = leader ? getDisplayPosition(leader, org.label) : "";

  return (
    <AnimatedSection delay={delay} className="h-full">
      <button
        type="button"
        onClick={onClick}
        className={`group h-full w-full text-left flex items-start gap-4 bg-card border border-border rounded-lg transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer ${
          featured ? "p-6 sm:p-7 border-l-4 border-l-primary" : "p-6"
        }`}
      >
        {/* Monograma institucional */}
        <span
          className={`shrink-0 rounded-md bg-primary text-primary-foreground font-display flex items-center justify-center tracking-wide ${
            featured ? "h-16 w-16 text-2xl" : "h-14 w-14 text-lg"
          }`}
        >
          {org.logoLabel}
        </span>

        <div className="min-w-0 flex-1">
          {featured && (
            <p className="text-[11px] uppercase tracking-[0.22em] text-gold mb-1">
              Cuerpo de gobierno
            </p>
          )}
          <div className="flex items-baseline justify-between gap-3">
            <h3
              className={`font-display text-primary leading-tight ${featured ? "text-xl sm:text-2xl" : "text-lg"}`}
            >
              {org.label}
            </h3>
            <span className="shrink-0 text-xs text-muted-foreground">
              {people.length} {people.length === 1 ? "integrante" : "integrantes"}
            </span>
          </div>

          <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {org.description}
          </p>

          <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3">
            {leader ? (
              <p className="min-w-0 truncate text-xs text-muted-foreground">
                <span className="text-primary/80">{leaderPos || leader.ecclesiasticalRole}</span>
                {" · "}
                {leaderName}
              </p>
            ) : (
              <span />
            )}
            <span className="shrink-0 text-xs text-gold opacity-0 group-hover:opacity-100 transition-opacity">
              Ver integrantes →
            </span>
          </div>
        </div>
      </button>
    </AnimatedSection>
  );
}

export function LeadershipSection() {
  const [selectedOrg, setSelectedOrg] = useState<OrgConfig | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const governing = ORGS.find((o) => o.id === "consistorio");
  const rest = ORGS.filter((o) => o.id !== "consistorio");

  return (
    <>
      <section id="liderazgo" className="py-24 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <SectionTitle
              eyebrow="Liderazgo y organizaciones"
              title="Quienes sirven a la congregación"
              subtitle="La iglesia cuenta con cinco organizaciones activas, cada una con su directiva y responsabilidades propias. Selecciona una para conocer a sus integrantes."
            />
          </AnimatedSection>

          {/* Leyenda del punto dorado (multi-rol) */}
          <AnimatedSection>
            <div className="flex items-center justify-center gap-2 mb-10 -mt-4">
              <span className="h-1.5 w-1.5 rounded-full bg-gold inline-block" />
              <span className="text-xs text-muted-foreground">
                El punto dorado indica que la persona participa en más de una organización o
                ministerio
              </span>
            </div>
          </AnimatedSection>

          <div className="space-y-5">
            {governing && (
              <OrgCard
                org={governing}
                featured
                onClick={() => setSelectedOrg(governing)}
                delay={0}
              />
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              {rest.map((org, i) => (
                <OrgCard
                  key={org.id}
                  org={org}
                  onClick={() => setSelectedOrg(org)}
                  delay={(i + 1) * 80}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <OrgDetailPanel
        org={selectedOrg}
        onClose={() => setSelectedOrg(null)}
        onSelectPerson={(p) => {
          setSelectedOrg(null);
          setSelectedPerson(p);
        }}
      />

      <ProfileModal person={selectedPerson} onClose={() => setSelectedPerson(null)} />
    </>
  );
}
