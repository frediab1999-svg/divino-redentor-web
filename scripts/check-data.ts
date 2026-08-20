/**
 * Validador de consistencia de datos (`src/data/church.ts`).
 *
 * Atrapa los errores frágiles del modelo persona↔organización antes del build:
 *   1. Un `role.organization` que no existe en ORGS / MINISTRIES / campos (typo u
 *      organización sin declarar).
 *   2. Un `personId` referenciado (campos) que no existe o está oculto.
 *   3. Una persona con rol en una organización cuyo `position` no aparece en
 *      ninguna sección → NO se renderiza (falla silenciosa).
 *   4. Desajustes menores (ids duplicados, conteos de CHURCH_STATS).
 *
 * Uso:  npm run check:data     (Node 24 ejecuta TypeScript directamente)
 */
import {
  PEOPLE,
  ORGS,
  MINISTRIES,
  CHURCH_STATS,
  type Person,
  type OrgConfig,
} from "../src/data/church.ts";

const errors: string[] = [];
const warnings: string[] = [];

const err = (msg: string) => errors.push(msg);
const warn = (msg: string) => warnings.push(msg);

// ── Conjuntos de referencia ────────────────────────────────────────────────
const peopleById = new Map<string, Person>(PEOPLE.map((p) => [p.id, p]));

// Toda etiqueta de organización válida que un rol puede usar.
const validOrgLabels = new Set<string>();
for (const o of ORGS) validOrgLabels.add(o.label);
for (const m of MINISTRIES) validOrgLabels.add(m.orgKey);
for (const o of ORGS) {
  for (const s of o.sections) {
    for (const c of s.campos ?? []) validOrgLabels.add(c.orgLabel);
  }
}

// ── 1. Ids únicos ───────────────────────────────────────────────────────────
{
  const seen = new Set<string>();
  for (const p of PEOPLE) {
    if (seen.has(p.id)) err(`Id de persona duplicado: "${p.id}".`);
    seen.add(p.id);
  }
}

// ── 2. Toda organización usada en un rol debe existir ───────────────────────
for (const p of PEOPLE) {
  for (const r of p.roles) {
    if (!validOrgLabels.has(r.organization)) {
      err(
        `${p.id}: rol con organización desconocida "${r.organization}" ` +
          `(no está en ORGS, MINISTRIES ni campos).`,
      );
    }
  }
}

// ── 3. personId de campos: debe existir, no estar oculto y tener el rol ──────
for (const o of ORGS) {
  for (const s of o.sections) {
    for (const c of s.campos ?? []) {
      const person = peopleById.get(c.personId);
      if (!person) {
        err(`Campo "${c.name}" (${o.label}): personId "${c.personId}" no existe en PEOPLE.`);
        continue;
      }
      if (person.visibility === "hidden") {
        err(`Campo "${c.name}" (${o.label}): referencia a persona oculta "${c.personId}".`);
      }
      if (!person.roles.some((r) => r.organization === c.orgLabel)) {
        warn(
          `Campo "${c.name}": "${c.personId}" no tiene un rol con organización ` +
            `"${c.orgLabel}"; su cargo mostrado saldrá vacío.`,
        );
      }
      for (const memberId of c.members ?? []) {
        const member = peopleById.get(memberId);
        if (!member) {
          err(`Campo "${c.name}" (${o.label}): colaborador "${memberId}" no existe en PEOPLE.`);
          continue;
        }
        if (member.visibility === "hidden") {
          err(`Campo "${c.name}" (${o.label}): colaborador oculto "${memberId}".`);
        }
        if (!member.roles.some((r) => r.organization === c.orgLabel)) {
          warn(
            `Campo "${c.name}": colaborador "${memberId}" no tiene un rol con organización ` +
              `"${c.orgLabel}"; su cargo mostrado saldrá vacío.`,
          );
        }
      }
    }
  }
}

// ── 4. Personas que no se renderizarán en su organización ───────────────────
// Replica la lógica de OrgDetailPanel: una persona aparece si su `position`
// empieza con alguna de las `positions`/`heroPositions` de una sección, o si su
// rol tiene `group` (layout grouped), o si está en un `campos`.
function coverageForOrg(org: OrgConfig) {
  const positions: string[] = [];
  let hasGrouped = false;
  const camposIds = new Set<string>();
  for (const s of org.sections) {
    if (s.layout === "grouped") hasGrouped = true;
    for (const pos of s.positions ?? []) positions.push(pos);
    for (const pos of s.heroPositions ?? []) positions.push(pos);
    for (const c of s.campos ?? []) camposIds.add(c.personId);
  }
  return { positions, hasGrouped, camposIds };
}

const orgsByLabel = new Map<string, OrgConfig>(ORGS.map((o) => [o.label, o]));

for (const p of PEOPLE) {
  if (p.visibility === "hidden") continue;
  for (const r of p.roles) {
    const org = orgsByLabel.get(r.organization);
    if (!org) continue; // ministerios/campos renderizan todo por membresía
    const { positions, hasGrouped, camposIds } = coverageForOrg(org);
    const byPosition = positions.some((sp) => (r.position ?? "").startsWith(sp));
    const byGroup = Boolean(r.group) && hasGrouped;
    const byCampo = camposIds.has(p.id);
    if (!byPosition && !byGroup && !byCampo) {
      warn(
        `${p.id}: tiene rol en "${org.label}" (cargo "${r.position ?? "—"}") pero ` +
          `ninguna sección lo incluye; no se mostrará. Agrega el cargo a section.positions.`,
      );
    }
  }
}

// ── 5. Conteos de CHURCH_STATS ──────────────────────────────────────────────
if (CHURCH_STATS.organizations !== ORGS.length) {
  warn(
    `CHURCH_STATS.organizations = ${CHURCH_STATS.organizations} pero hay ${ORGS.length} en ORGS.`,
  );
}
if (CHURCH_STATS.ministries !== MINISTRIES.length) {
  warn(
    `CHURCH_STATS.ministries = ${CHURCH_STATS.ministries} pero hay ${MINISTRIES.length} en MINISTRIES.`,
  );
}

// ── Reporte ─────────────────────────────────────────────────────────────────
const roleCount = PEOPLE.reduce((n, p) => n + p.roles.length, 0);

for (const w of warnings) console.log(`⚠  ${w}`);
for (const e of errors) console.log(`✖  ${e}`);

console.log(
  `\n${errors.length === 0 ? "✔" : "✖"} ${PEOPLE.length} personas, ` +
    `${roleCount} roles, ${ORGS.length} organizaciones, ${MINISTRIES.length} ministerios validados` +
    ` — ${errors.length} errores, ${warnings.length} avisos.`,
);

if (errors.length > 0) process.exitCode = 1;
