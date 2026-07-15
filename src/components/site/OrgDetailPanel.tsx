import { useEffect } from "react";
import type { OrgConfig, OrgSection, Person } from "@/data/church";
import { getOrgPeople, getRoleInOrg, getPersonById } from "@/data/church";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { PersonCard } from "./PersonCard";

type Props = {
  org: OrgConfig | null;
  onClose: () => void;
  onSelectPerson: (p: Person) => void;
  // false cuando hay un perfil abierto encima: desactiva su tecla Escape.
  active?: boolean;
};

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs uppercase tracking-[0.25em] text-gold text-center mb-4">{children}</p>
  );
}

export function OrgDetailPanel({ org, onClose, onSelectPerson, active = true }: Props) {
  useEffect(() => {
    if (!org || !active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [org, active, onClose]);

  useBodyScrollLock(!!org);

  if (!org) return null;

  const allPeople = getOrgPeople(org);
  const select = (p: Person) => onSelectPerson(p);

  // ── Renderizado de cada tipo de sección ──────────────────────────────────
  function renderPeople(section: OrgSection) {
    const positions = section.positions ?? [];
    const inSection = allPeople.filter((p) => {
      const pos = getRoleInOrg(p, org!.label)?.position ?? "";
      return positions.some((sp) => pos.startsWith(sp));
    });

    const isHero = (p: Person) => {
      const pos = getRoleInOrg(p, org!.label)?.position ?? "";
      return (section.heroPositions ?? []).some((hp) => pos.startsWith(hp));
    };
    const heroes = inSection.filter(isHero);
    const others = inSection.filter((p) => !isHero(p));

    return (
      <>
        <SectionHeading>{section.heading}</SectionHeading>
        {inSection.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center italic py-2">
            Información por definir.
          </p>
        ) : (
          <div className="space-y-4">
            {heroes.length > 0 && (
              <div className="flex justify-center">
                <div
                  className={`grid gap-4 w-full ${heroes.length >= 2 ? "grid-cols-2" : "grid-cols-1"} max-w-xs sm:max-w-sm`}
                >
                  {heroes.map((p) => (
                    <PersonCard
                      key={p.id}
                      person={p}
                      contextOrg={org!.label}
                      variant="featured"
                      roleAbbrev={section.roleAbbrev}
                      onClick={() => select(p)}
                    />
                  ))}
                </div>
              </div>
            )}
            {others.length > 0 &&
              (section.compact ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {others.map((p) => (
                    <PersonCard
                      key={p.id}
                      person={p}
                      contextOrg={org!.label}
                      variant="secondary"
                      onClick={() => select(p)}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {others.map((p) => (
                    <PersonCard
                      key={p.id}
                      person={p}
                      contextOrg={org!.label}
                      variant="primary"
                      roleAbbrev={section.roleAbbrev}
                      onClick={() => select(p)}
                    />
                  ))}
                </div>
              ))}
          </div>
        )}
      </>
    );
  }

  function renderGrouped(section: OrgSection) {
    const withGroup = allPeople.filter((p) => getRoleInOrg(p, org!.label)?.group);
    const groups = section.groupOrder ?? [];
    const grouped = withGroup.reduce<Record<string, Person[]>>((acc, p) => {
      const g = getRoleInOrg(p, org!.label)?.group ?? "General";
      (acc[g] ??= []).push(p);
      return acc;
    }, {});
    // Grupos en el orden configurado; cualquier grupo extra se agrega al final.
    const ordered = [
      ...groups.filter((g) => grouped[g]),
      ...Object.keys(grouped).filter((g) => !groups.includes(g)),
    ];

    return (
      <>
        <SectionHeading>{section.heading}</SectionHeading>
        <div className="space-y-6">
          {ordered.map((group) => (
            <div key={group}>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                {group}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {grouped[group].map((p) => (
                  <PersonCard
                    key={p.id}
                    person={p}
                    contextOrg={org!.label}
                    variant="secondary"
                    onClick={() => select(p)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  function renderCampos(section: OrgSection) {
    const campos = section.campos ?? [];
    return (
      <>
        <SectionHeading>{section.heading}</SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {campos.map((campo) => {
            const person = getPersonById(campo.personId);
            return (
              <div key={campo.name} className="rounded-lg border border-border bg-card/40 p-4">
                <p className="font-display text-primary text-base leading-tight">{campo.name}</p>
                {campo.area && (
                  <p className="mt-0.5 text-xs text-gold">Área: {campo.area}</p>
                )}
                {person ? (
                  <div className="mt-3">
                    <PersonCard
                      person={person}
                      contextOrg={campo.orgLabel}
                      variant="secondary"
                      onClick={() => select(person)}
                    />
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-muted-foreground italic">Encargado por definir.</p>
                )}
                {(campo.members ?? []).length > 0 && (
                  <div className="mt-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                      Colaboradores
                    </p>
                    <div className="space-y-2">
                      {(campo.members ?? []).map((memberId) => {
                        const member = getPersonById(memberId);
                        if (!member) return null;
                        return (
                          <PersonCard
                            key={memberId}
                            person={member}
                            contextOrg={campo.orgLabel}
                            variant="secondary"
                            onClick={() => select(member)}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  }

  function renderSection(section: OrgSection) {
    if (section.layout === "grouped") return renderGrouped(section);
    if (section.layout === "campos") return renderCampos(section);
    return renderPeople(section);
  }

  const descriptionParagraphs = org.description.split("\n\n");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="org-panel-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 bg-card border border-border rounded-t-2xl sm:rounded-xl shadow-lg w-full sm:max-w-3xl max-h-[90dvh] flex flex-col animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300 sm:mx-4">
        {/* Header */}
        <div className="flex items-center gap-4 px-6 pt-6 pb-4 border-b border-border shrink-0">
          <div className="h-12 w-12 shrink-0 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-display text-base tracking-wide">
            {org.logoLabel}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Organización</p>
            <h3 id="org-panel-title" className="font-display text-xl text-primary leading-tight">
              {org.label}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary transition"
            aria-label="Cerrar"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Descripción + base bíblica */}
        <div className="px-6 pt-4 pb-2 shrink-0">
          {descriptionParagraphs.map((p, i) => (
            <p key={i} className="text-sm text-muted-foreground leading-relaxed [&:not(:first-child)]:mt-2">
              {p}
            </p>
          ))}
          {org.bibleRefs && (
            <p className="mt-3 text-xs text-primary/80">
              <span className="uppercase tracking-[0.15em] text-gold">Base bíblica:</span>{" "}
              {org.bibleRefs}
            </p>
          )}
        </div>

        {/* Cuerpo con secciones */}
        <div className="overflow-y-auto px-6 pb-6 pt-4 flex-1 min-h-0">
          {org.sections.map((section, i) => (
            <div key={section.heading + i}>
              {i > 0 && <div className="w-12 h-px bg-border mx-auto my-8" />}
              {renderSection(section)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
