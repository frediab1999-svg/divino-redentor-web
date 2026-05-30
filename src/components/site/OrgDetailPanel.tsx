import { useEffect } from "react";
import type { OrgConfig, Person } from "@/data/church";
import { getOrgPeople, getRoleInOrg } from "@/data/church";
import { PersonCard } from "./PersonCard";

type Props = {
  org: OrgConfig | null;
  onClose: () => void;
  onSelectPerson: (p: Person) => void;
};

export function OrgDetailPanel({ org, onClose, onSelectPerson }: Props) {
  useEffect(() => {
    if (!org) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [org, onClose]);

  useEffect(() => {
    document.body.style.overflow = org ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [org]);

  if (!org) return null;

  const allPeople = getOrgPeople(org);

  const featured = allPeople.filter((p) => {
    const pos = getRoleInOrg(p, org.label)?.position ?? "";
    return org.featuredPositions.some((fp) => pos.startsWith(fp));
  });

  const primary = allPeople.filter((p) => {
    const pos = getRoleInOrg(p, org.label)?.position ?? "";
    return (
      !org.featuredPositions.some((fp) => pos.startsWith(fp)) &&
      org.primaryPositions.some((pp) => pos.startsWith(pp))
    );
  });

  const secondary = allPeople.filter((p) => {
    const pos = getRoleInOrg(p, org.label)?.position ?? "";
    return (
      !org.featuredPositions.some((fp) => pos.startsWith(fp)) &&
      !org.primaryPositions.some((pp) => pos.startsWith(pp))
    );
  });

  // For orgs with groups (EFC), separate teachers by group
  const hasGroups = org.groupsLabel && secondary.some((p) => getRoleInOrg(p, org.label)?.group);

  const groupedSecondary = hasGroups
    ? secondary.reduce<Record<string, Person[]>>((acc, p) => {
        const group = getRoleInOrg(p, org.label)?.group ?? "General";
        if (!acc[group]) acc[group] = [];
        acc[group].push(p);
        return acc;
      }, {})
    : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="org-panel-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 bg-card border border-border rounded-t-2xl sm:rounded-xl shadow-lg w-full sm:max-w-3xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-300 sm:mx-4">
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

        <p className="px-6 pt-4 pb-2 text-sm text-muted-foreground leading-relaxed shrink-0">
          {org.description}
        </p>

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 pb-6 flex-1">
          {/* Featured — liderazgo principal */}
          {featured.length > 0 && (
            <div className="mb-8 mt-2">
              <p className="text-xs uppercase tracking-[0.25em] text-gold text-center mb-4">
                Liderazgo
              </p>
              <div className="flex justify-center">
                <div
                  className={`grid gap-4 w-full ${featured.length >= 2 ? "grid-cols-2" : "grid-cols-1"} max-w-xs sm:max-w-sm`}
                >
                  {featured.map((p) => (
                    <PersonCard
                      key={p.id}
                      person={p}
                      contextOrg={org.label}
                      variant="featured"
                      onClick={() => {
                        onClose();
                        onSelectPerson(p);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Separador */}
          {featured.length > 0 && primary.length > 0 && (
            <div className="w-12 h-px bg-gold mx-auto mb-8" />
          )}

          {/* Primary — directiva */}
          {primary.length > 0 && (
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.25em] text-gold text-center mb-4">
                Directiva
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {primary.map((p) => (
                  <PersonCard
                    key={p.id}
                    person={p}
                    contextOrg={org.label}
                    variant="primary"
                    onClick={() => {
                      onClose();
                      onSelectPerson(p);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Secondary — miembros / maestros */}
          {secondary.length > 0 && (
            <div>
              {(primary.length > 0 || featured.length > 0) && (
                <div className="w-12 h-px bg-border mx-auto mb-8" />
              )}

              {groupedSecondary ? (
                Object.entries(groupedSecondary).map(([group, people]) => (
                  <div key={group} className="mb-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                      {org.groupsLabel} · {group}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {people.map((p) => (
                        <PersonCard
                          key={p.id}
                          person={p}
                          contextOrg={org.label}
                          variant="secondary"
                          onClick={() => {
                            onClose();
                            onSelectPerson(p);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <p className="text-xs uppercase tracking-[0.25em] text-gold text-center mb-4">
                    Miembros
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {secondary.map((p) => (
                      <PersonCard
                        key={p.id}
                        person={p}
                        contextOrg={org.label}
                        variant="secondary"
                        onClick={() => {
                          onClose();
                          onSelectPerson(p);
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
