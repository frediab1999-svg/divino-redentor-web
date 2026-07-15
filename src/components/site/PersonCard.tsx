import type { Person, PersonRole } from "@/data/church";
import { getDisplayName, getDisplayPosition } from "@/data/church";

export type CardVariant = "featured" | "primary" | "secondary";

type Props = {
  person: Person;
  contextOrg: string;
  onClick?: () => void;
  variant?: CardVariant;
  // Si se define, se muestra esta abreviatura del rol (dorado) e inlínea el cargo,
  // en vez del rol eclesiástico completo (ej. "A.I." para ancianos).
  roleAbbrev?: string;
  // Cargo explícito a mostrar. Necesario cuando una persona tiene varios cargos en
  // la misma organización (ej. Tesorero y Mayordomía en el Diaconado).
  positionOverride?: string;
};

export function PersonCard({
  person,
  contextOrg,
  onClick,
  variant = "primary",
  roleAbbrev,
  positionOverride,
}: Props) {
  const displayName = getDisplayName(person);
  // publicPosition (privacidad) tiene prioridad; si no, el cargo explícito de la sección.
  const displayPos = person.publicPosition ?? positionOverride ?? getDisplayPosition(person, contextOrg);
  const role: PersonRole | undefined = person.roles.find((r) => r.organization === contextOrg);
  // Evita repetir el cargo cuando coincide con el rol eclesiástico (ej. Pastor / Pastor).
  const posLabel = displayPos && displayPos !== person.ecclesiasticalRole ? displayPos : undefined;
  const subtitle = [posLabel, role?.group].filter(Boolean).join(" · ");
  // Punto dorado = participa en más de UNA organización (no dos cargos del mismo grupo).
  const hasMultipleRoles = new Set(person.roles.map((r) => r.organization)).size > 1;
  const isAnonymous = person.visibility === "role-only";

  const initials = isAnonymous
    ? "?"
    : displayName
        .replace(/^(Hno\.|Hna\.|Pastor)\s*/i, "")
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("");

  if (variant === "featured") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group relative w-full max-w-xs mx-auto text-center bg-card border border-border rounded-lg p-7 hover:border-primary/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
      >
        {hasMultipleRoles && (
          <span
            className="absolute top-4 right-4 h-2 w-2 rounded-full bg-gold"
            title="Participa en varios ministerios"
          />
        )}
        <div className="mx-auto mb-5 h-28 w-28 rounded-full overflow-hidden bg-secondary ring-1 ring-border flex items-center justify-center">
          {person.photo ? (
            <img src={person.photo} alt={displayName} className="h-full w-full object-cover" />
          ) : (
            <span className="font-display text-4xl text-primary/60">{initials}</span>
          )}
        </div>
        <h4 className="font-display text-2xl text-primary leading-tight">{displayName}</h4>
        {roleAbbrev ? (
          <p className="mt-1.5 text-sm leading-relaxed">
            <span className="font-medium text-gold">{roleAbbrev}</span>
            {subtitle && <span className="text-muted-foreground"> {subtitle}</span>}
          </p>
        ) : (
          <>
            <p className="mt-1.5 text-sm font-medium text-gold">{person.ecclesiasticalRole}</p>
            {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
          </>
        )}
        {hasMultipleRoles && (
          <p className="mt-3 text-xs text-gold/80 opacity-0 group-hover:opacity-100 transition-opacity">
            Ver todos los cargos →
          </p>
        )}
      </button>
    );
  }

  if (variant === "secondary") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group relative w-full text-left flex items-center gap-3 bg-card border border-border rounded-md p-3 hover:border-primary/30 hover:bg-secondary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
      >
        {hasMultipleRoles && (
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-gold" />
        )}
        <div className="shrink-0 h-10 w-10 rounded-full overflow-hidden bg-secondary ring-1 ring-border flex items-center justify-center">
          {person.photo ? (
            <img src={person.photo} alt={displayName} className="h-full w-full object-cover" />
          ) : (
            <span className="font-display text-sm text-primary/60">{initials}</span>
          )}
        </div>
        <div className="min-w-0">
          <p className="font-display text-sm text-primary leading-tight truncate">{displayName}</p>
          {subtitle && <p className="text-xs text-muted-foreground truncate">{subtitle}</p>}
        </div>
      </button>
    );
  }

  // primary (default)
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full text-left bg-card border border-border rounded-md p-5 text-center hover:border-primary/30 hover:bg-secondary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
    >
      {hasMultipleRoles && (
        <span
          className="absolute top-3 right-3 h-2 w-2 rounded-full bg-gold"
          title="Participa en varios ministerios"
        />
      )}
      <div className="mx-auto mb-4 h-20 w-20 rounded-full overflow-hidden bg-secondary ring-1 ring-border flex items-center justify-center">
        {person.photo ? (
          <img src={person.photo} alt={displayName} className="h-full w-full object-cover" />
        ) : (
          <span className="font-display text-xl text-primary/60">{initials}</span>
        )}
      </div>
      <h4 className="font-display text-base text-primary leading-tight">{displayName}</h4>
      {roleAbbrev ? (
        <p className="mt-1 text-xs leading-relaxed">
          <span className="font-medium text-gold">{roleAbbrev}</span>
          {subtitle && <span className="text-muted-foreground"> {subtitle}</span>}
        </p>
      ) : (
        <>
          <p className="mt-1 text-xs font-medium text-gold">{person.ecclesiasticalRole}</p>
          {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
        </>
      )}
    </button>
  );
}
