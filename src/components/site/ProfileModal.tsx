import { useEffect } from "react";
import type { Person } from "@/data/church";
import { getDisplayName } from "@/data/church";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";

type Props = {
  person: Person | null;
  onClose: () => void;
};

export function ProfileModal({ person, onClose }: Props) {
  useEffect(() => {
    if (!person) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [person, onClose]);

  useBodyScrollLock(!!person);

  if (!person) return null;

  const displayName = getDisplayName(person);
  const isAnonymous = person.visibility === "role-only";

  const initials = isAnonymous
    ? "?"
    : displayName
        .replace(/^(Hno\.|Hna\.|Pastor)\s*/i, "")
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("");

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 bg-card border border-border rounded-xl shadow-lg w-full max-w-sm max-h-[90dvh] flex flex-col animate-in zoom-in-95 fade-in duration-200">
        {/* Close */}
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

        {/* Photo + name */}
        <div className="px-8 pt-8 pb-5 text-center border-b border-border shrink-0">
          <div className="mx-auto mb-4 h-24 w-24 rounded-full overflow-hidden bg-secondary ring-1 ring-border flex items-center justify-center">
            {person.photo ? (
              <img src={person.photo} alt={displayName} className="h-full w-full object-cover" />
            ) : (
              <span className="font-display text-3xl text-primary/70">{initials}</span>
            )}
          </div>
          <h3 id="profile-modal-title" className="font-display text-xl text-primary">
            {displayName}
          </h3>
          <p className="mt-1 text-sm font-medium text-gold">{person.ecclesiasticalRole}</p>
          {isAnonymous && (
            <p className="mt-2 text-xs text-muted-foreground italic">
              La persona que ocupa este cargo prefiere mantener privacidad.
            </p>
          )}
        </div>

        {/* All roles */}
        <div className="px-8 py-6 flex-1 min-h-0 overflow-y-auto">
          {person.roles.length > 0 && (
            <>
              <p className="text-xs uppercase tracking-[0.2em] text-gold mb-4">
                Participación en la iglesia
              </p>
              <ul className="space-y-3">
                {person.roles.map((role, i) => {
                  // Cargo de ESTA fila (no getDisplayPosition, que devuelve el primer
                  // cargo de la organización y duplicaría cuando hay dos en la misma).
                  const displayPos = person.publicPosition ?? role.position;
                  return (
                    <li key={i} className="border border-border rounded-md p-4">
                      <p className="font-display text-sm text-primary">{role.organization}</p>
                      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                        {displayPos && (
                          <span className="text-xs text-muted-foreground">{displayPos}</span>
                        )}
                        {role.group && (
                          <span className="text-xs text-muted-foreground">· {role.group}</span>
                        )}
                        {role.schedule && (
                          <span className="text-xs text-gold">{role.schedule}</span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
