import { useEffect } from "react";
import type { Ministry, Person } from "@/data/church";
import { getDisplayName, getDisplayPosition } from "@/data/church";
import { MinistryIcon } from "./section-icons";

type Props = {
  ministry: Ministry | null;
  members: Person[];
  onClose: () => void;
  onSelectPerson: (p: Person) => void;
};

export function MinistryModal({ ministry, members, onClose, onSelectPerson }: Props) {
  useEffect(() => {
    if (!ministry) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [ministry, onClose]);

  useEffect(() => {
    document.body.style.overflow = ministry ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ministry]);

  if (!ministry) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ministry-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 bg-card border border-border rounded-xl shadow-lg w-full max-w-lg animate-in zoom-in-95 fade-in duration-200">
        {/* Header */}
        <div className="px-8 pt-8 pb-5 border-b border-border">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary transition"
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

          <div className="flex items-center gap-4">
            <div className="h-12 w-12 shrink-0 rounded-md bg-primary text-primary-foreground flex items-center justify-center">
              <MinistryIcon id={ministry.id} className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Ministerio</p>
              <h3
                id="ministry-modal-title"
                className="font-display text-xl text-primary leading-tight"
              >
                {ministry.name}
              </h3>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{ministry.desc}</p>
        </div>

        {/* Members */}
        <div className="px-8 py-6 max-h-[55vh] overflow-y-auto">
          {members.length > 0 ? (
            <>
              <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
                Integrantes · {members.length}
              </p>
              <ul className="space-y-2">
                {members.map((person) => {
                  const displayName = getDisplayName(person);
                  const displayPos = getDisplayPosition(person, ministry.orgKey);
                  const role = person.roles.find((r) => r.organization === ministry.orgKey);
                  const initials = displayName
                    .replace(/^(Hno\.|Hna\.)\s*/i, "")
                    .split(" ")
                    .map((w) => w[0])
                    .slice(0, 2)
                    .join("");

                  return (
                    <li key={person.id}>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onSelectPerson(person);
                        }}
                        className="w-full flex items-center gap-4 py-2.5 px-3 rounded-xl hover:bg-secondary transition text-left border border-transparent hover:border-border"
                      >
                        <div className="h-10 w-10 shrink-0 rounded-full overflow-hidden bg-secondary border border-border flex items-center justify-center">
                          {person.photo ? (
                            <img
                              src={person.photo}
                              alt={displayName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="font-display text-sm text-primary/70">{initials}</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-display text-primary text-sm leading-tight truncate">
                            {displayName}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {[displayPos, role?.group, role?.schedule].filter(Boolean).join(" · ")}
                          </p>
                        </div>
                        {person.roles.length > 1 && (
                          <span className="text-xs text-gold shrink-0">
                            +{person.roles.length - 1} más
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">Por definir</p>
          )}
        </div>
      </div>
    </div>
  );
}
