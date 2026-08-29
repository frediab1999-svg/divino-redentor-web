import { useRef, useState } from "react";
import {
  MINISTRIES,
  MINISTRY_GROUPS,
  getMinistryMembersCount,
  type Ministry,
  type Person,
} from "@/data/church";
import { useHistoryModal } from "@/hooks/use-history-modal";
import { SectionTitle } from "./SectionTitle";
import { AnimatedSection } from "./AnimatedSection";
import { MinistryIcon } from "./section-icons";
import { MinistryModal } from "./MinistryModal";
import { ProfileModal } from "./ProfileModal";

export function MinistriesSection() {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const ministryRef = useRef(selectedMinistry);
  ministryRef.current = selectedMinistry;
  const personRef = useRef(selectedPerson);
  personRef.current = selectedPerson;

  const { pushLayer, closeLayer } = useHistoryModal(() => {
    if (personRef.current) setSelectedPerson(null);
    else if (ministryRef.current) setSelectedMinistry(null);
  });

  const openMinistry = (m: Ministry) => {
    setSelectedMinistry(m);
    pushLayer();
  };
  // El perfil se abre ENCIMA del modal de ministerio (no lo cierra).
  const openPerson = (p: Person) => {
    setSelectedPerson(p);
    pushLayer();
  };
  const closeMinistry = () => closeLayer(() => setSelectedMinistry(null));
  const closePerson = () => closeLayer(() => setSelectedPerson(null));

  const ministriesById = new Map(MINISTRIES.map((m) => [m.id, m]));

  return (
    <>
      <section id="ministerios" className="py-24 px-6 lg:px-10 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <SectionTitle
              eyebrow="Ministerios"
              title="Sirviendo juntos al Señor"
              subtitle="Grupos de servicio que sostienen la vida y el culto de la congregación. Selecciona uno para conocer a sus integrantes."
            />
          </AnimatedSection>

          <div className="space-y-12">
            {MINISTRY_GROUPS.map((group) => {
              const items = group.ministryIds
                .map((id) => ministriesById.get(id))
                .filter((m): m is Ministry => Boolean(m));
              if (items.length === 0) return null;

              return (
                <div key={group.id}>
                  <AnimatedSection>
                    <div className="mb-5">
                      <h3 className="font-display text-xl md:text-2xl text-primary leading-tight">
                        {group.heading}
                      </h3>
                      <div className="mt-2 h-px w-12 bg-gold" />
                    </div>
                  </AnimatedSection>

                  <div className="grid sm:grid-cols-2 gap-3">
                    {items.map((m, i) => {
                      const membersCount = getMinistryMembersCount(m);
                      return (
                        <AnimatedSection key={m.id} delay={i * 60} className="h-full min-w-0">
                          <button
                            type="button"
                            onClick={() => openMinistry(m)}
                            className="group h-full w-full text-left flex items-start gap-4 bg-card border border-border rounded-lg p-5 transition-colors hover:border-primary/30 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                          >
                            <span className="shrink-0 h-11 w-11 rounded-lg bg-secondary text-primary group-hover:text-gold flex items-center justify-center transition-colors">
                              <MinistryIcon id={m.id} className="h-5 w-5" />
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-baseline justify-between gap-3">
                                <h3 className="min-w-0 font-display text-base text-primary leading-tight">
                                  {m.name}
                                </h3>
                                <span className="shrink-0 text-xs text-muted-foreground">
                                  {membersCount}
                                </span>
                              </div>
                              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                {m.desc}
                              </p>
                              <p className="mt-2 text-xs text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                                {m.subgroups?.length ? "Ver grupos →" : "Ver integrantes →"}
                              </p>
                            </div>
                          </button>
                        </AnimatedSection>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <MinistryModal
        ministry={selectedMinistry}
        active={!selectedPerson}
        onClose={closeMinistry}
        onSelectPerson={openPerson}
      />

      <ProfileModal person={selectedPerson} onClose={closePerson} />
    </>
  );
}
