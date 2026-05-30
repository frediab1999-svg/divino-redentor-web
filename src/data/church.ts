// ─── CONTACTO ────────────────────────────────────────────────────────────────
export const WHATSAPP_URL = "https://wa.me/525555555555";

// ─── ESTADÍSTICAS ─────────────────────────────────────────────────────────────
export const CHURCH_STATS = {
  totalMembers: 120,
  foundingYear: 1985,
  organizations: 5,
  ministries: 7,
};

// ─── HISTORIA ─────────────────────────────────────────────────────────────────
export type HistoryBlock = {
  id: string;
  era: string;
  title: string;
  text: string;
  images?: string[];
};

export const HISTORY_BLOCKS: HistoryBlock[] = [
  {
    id: "inicios",
    era: "Inicios",
    title: "Las primeras reuniones",
    text: "Aquí se puede colocar una breve descripción sobre los inicios de la iglesia, los hermanos fundadores y las primeras reuniones de oración en Kimbilá. Un puñado de familias que creyó y se reunió con fe.",
    images: [],
  },
  {
    id: "crecimiento",
    era: "Crecimiento",
    title: "Una comunidad que florece",
    text: "Con el tiempo, la congregación creció. Nuevas familias se unieron, se construyó un templo, se formaron organizaciones internas y la iglesia comenzó a impactar a la comunidad de manera significativa.",
    images: [],
  },
  {
    id: "hoy",
    era: "Hoy",
    title: "Caminando en fe",
    text: "Hoy continuamos sirviendo al Señor con gratitud, con organizaciones consolidadas, ministerios activos y puertas abiertas a toda persona que desee conocer el amor de Cristo.",
    images: [],
  },
];

// ─── TESTIMONIOS ──────────────────────────────────────────────────────────────
export const TESTIMONIES = [
  {
    name: "Hno. Juan Pérez",
    text: "Aquí se puede colocar el testimonio del hermano sobre cómo Dios ha obrado en su vida y en su familia dentro de la iglesia.",
  },
  {
    name: "Hna. María López",
    text: "Espacio para un testimonio personal de fe, gratitud y servicio en la congregación El Divino Redentor.",
  },
  {
    name: "Hno. Pedro Canul",
    text: "Dios ha sido fiel en cada etapa, y esta iglesia ha sido un hogar espiritual para mi familia durante muchos años.",
  },
];

// ─── MODELO CENTRAL DE PERSONAS ──────────────────────────────────────────────
//
// "visibility" controla qué se muestra públicamente:
//   "full"      → nombre, foto, cargo (comportamiento normal)
//   "role-only" → se muestra el cargo pero NO el nombre real de la persona
//   "hidden"    → existe en el sistema pero no se renderiza en la página pública
//
// "publicPosition" permite mostrar un cargo alternativo (ej: "Administración"
// en lugar de "Tesorera") sin cambiar el dato real interno.
//
export type PersonVisibility = "full" | "role-only" | "hidden";

export type PersonRole = {
  organization: string;
  position?: string;
  group?: string;
  schedule?: string;
};

export type Person = {
  id: string;
  name: string;
  photo?: string;
  ecclesiasticalRole: string;
  roles: PersonRole[];
  visibility?: PersonVisibility;
  publicPosition?: string;
};

// ─── REGISTRO DE PERSONAS ─────────────────────────────────────────────────────
export const PEOPLE: Person[] = [
  // ── CONSISTORIO ────────────────────────────────────────────────────────────
  {
    id: "pastor-1",
    name: "Pastor Activo",
    photo: "",
    ecclesiasticalRole: "Pastor",
    roles: [
      { organization: "Consistorio", position: "Pastor Principal", schedule: "20XX – Presente" },
    ],
  },
  {
    id: "anciano-secretario",
    name: "Hno. Anciano 1",
    ecclesiasticalRole: "Anciano",
    roles: [{ organization: "Consistorio", position: "Secretario" }],
  },
  {
    id: "anciano-educacion",
    name: "Hno. Anciano 2",
    ecclesiasticalRole: "Anciano",
    roles: [{ organization: "Consistorio", position: "Educación" }],
  },
  {
    id: "anciano-relaciones",
    name: "Hno. Anciano 3",
    ecclesiasticalRole: "Anciano",
    roles: [{ organization: "Consistorio", position: "Relaciones" }],
  },
  {
    id: "anciano-evangelismo",
    name: "Hno. Anciano 4",
    ecclesiasticalRole: "Anciano",
    roles: [{ organization: "Consistorio", position: "Evangelismo" }],
  },
  {
    id: "anciano-recursos",
    name: "Hno. Anciano 5",
    ecclesiasticalRole: "Anciano",
    roles: [
      { organization: "Consistorio", position: "Recursos" },
      { organization: "Campo Tezón", position: "Anciano Encargado" },
    ],
  },
  {
    id: "anciano-6",
    name: "Hno. Anciano 6",
    ecclesiasticalRole: "Anciano",
    roles: [
      { organization: "Consistorio", position: "Anciano" },
      { organization: "Campo Citilpech", position: "Anciano Encargado" },
    ],
  },
  {
    id: "anciano-7",
    name: "Hno. Anciano 7",
    ecclesiasticalRole: "Anciano",
    roles: [{ organization: "Consistorio", position: "Anciano" }],
  },

  // ── DIACONADO ──────────────────────────────────────────────────────────────
  {
    id: "diacono-presidente",
    name: "Hno. Diácono 1",
    ecclesiasticalRole: "Diácono",
    roles: [{ organization: "Diaconado", position: "Presidente" }],
  },
  {
    id: "diacono-secretario",
    name: "Hno. Diácono 2",
    ecclesiasticalRole: "Diácono",
    roles: [{ organization: "Diaconado", position: "Secretario" }],
  },
  {
    id: "diacono-beneficencia",
    name: "Hno. Diácono 3",
    ecclesiasticalRole: "Diácono",
    roles: [{ organization: "Diaconado", position: "Beneficencia" }],
  },
  {
    id: "diacono-campo-tezon",
    name: "Hno. Diácono 4",
    ecclesiasticalRole: "Diácono",
    roles: [{ organization: "Diaconado", position: "Campo Tezón" }],
  },
  {
    id: "diacono-campo-citilpech",
    name: "Hno. Diácono 5",
    ecclesiasticalRole: "Diácono",
    roles: [{ organization: "Diaconado", position: "Campo Citilpech" }],
  },
  {
    id: "diacono-6",
    name: "Hno. Diácono 6",
    ecclesiasticalRole: "Diácono",
    roles: [{ organization: "Diaconado", position: "Diácono" }],
  },
  {
    id: "diacono-7",
    name: "Hno. Diácono 7",
    ecclesiasticalRole: "Diácono",
    roles: [{ organization: "Diaconado", position: "Diácono" }],
  },

  // ── ESCUELA DE FORMACIÓN CRISTIANA ─────────────────────────────────────────
  {
    id: "efc-presidente",
    name: "Hno. Presidente EFC",
    ecclesiasticalRole: "Diácono",
    roles: [{ organization: "Escuela de Formación Cristiana", position: "Presidente" }],
  },
  {
    id: "efc-secretaria",
    name: "Hna. Secretaria EFC",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Escuela de Formación Cristiana", position: "Secretaria" }],
  },
  {
    id: "efc-tesorera",
    name: "Hna. Tesorera EFC",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Escuela de Formación Cristiana", position: "Administración" }],
    visibility: "role-only",
    publicPosition: "Administración",
  },
  {
    id: "maestra-parvulos",
    name: "Hna. Maestra 1",
    ecclesiasticalRole: "Miembro",
    roles: [
      {
        organization: "Escuela de Formación Cristiana",
        position: "Maestra",
        group: "Párvulos",
        schedule: "Domingos 10:00 AM",
      },
    ],
  },
  {
    id: "maestro-principiantes",
    name: "Hno. Maestro 2",
    ecclesiasticalRole: "Miembro",
    roles: [
      {
        organization: "Escuela de Formación Cristiana",
        position: "Maestro",
        group: "Principiantes",
        schedule: "Domingos 10:00 AM",
      },
    ],
  },
  {
    id: "maestra-principiantes-2",
    name: "Hna. Maestra 3",
    ecclesiasticalRole: "Miembro",
    roles: [
      {
        organization: "Escuela de Formación Cristiana",
        position: "Maestra",
        group: "Principiantes",
        schedule: "Domingos 10:00 AM",
      },
    ],
  },
  {
    id: "maestro-primarios",
    name: "Hno. Maestro 4",
    ecclesiasticalRole: "Miembro",
    roles: [
      {
        organization: "Escuela de Formación Cristiana",
        position: "Maestro",
        group: "Primarios",
        schedule: "Domingos 10:00 AM",
      },
    ],
  },
  {
    id: "maestra-interjovenes",
    name: "Hna. Maestra 5",
    ecclesiasticalRole: "Miembro",
    roles: [
      {
        organization: "Escuela de Formación Cristiana",
        position: "Maestra",
        group: "Interjóvenes",
        schedule: "Domingos 10:00 AM",
      },
    ],
  },

  // ── SOCIEDAD FEMENIL ────────────────────────────────────────────────────────
  {
    id: "sf-presidenta",
    name: "Hna. Presidenta Femenil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Sociedad Femenil", position: "Presidenta" }],
  },
  {
    id: "sf-vicepresidenta",
    name: "Hna. Vicepresidenta Femenil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Sociedad Femenil", position: "Vicepresidenta" }],
  },
  {
    id: "sf-secretaria",
    name: "Hna. Secretaria Femenil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Sociedad Femenil", position: "Secretaria" }],
  },
  {
    id: "sf-subsecretaria",
    name: "Hna. Subsecretaria Femenil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Sociedad Femenil", position: "Subsecretaria" }],
  },
  {
    id: "sf-tesorera",
    name: "Hna. Tesorera Femenil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Sociedad Femenil", position: "Administración" }],
    visibility: "role-only",
    publicPosition: "Administración",
  },
  {
    id: "sf-educacion",
    name: "Hna. Educación Femenil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Sociedad Femenil", position: "Educación" }],
  },
  {
    id: "sf-relaciones",
    name: "Hna. Relaciones Femenil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Sociedad Femenil", position: "Relaciones" }],
  },
  {
    id: "sf-evangelismo",
    name: "Hna. Evangelismo Femenil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Sociedad Femenil", position: "Evangelismo" }],
  },
  {
    id: "sf-recursos",
    name: "Hna. Recursos Femenil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Sociedad Femenil", position: "Recursos" }],
  },

  // ── SOCIEDAD JUVENIL ────────────────────────────────────────────────────────
  {
    id: "sj-presidenta",
    name: "Hna. Presidenta Juvenil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Sociedad Juvenil", position: "Presidenta" }],
  },
  {
    id: "sj-secretaria",
    name: "Hna. Secretaria Juvenil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Sociedad Juvenil", position: "Secretaria" }],
  },
  {
    id: "sj-tesorero",
    name: "Hno. Administración Juvenil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Sociedad Juvenil", position: "Administración" }],
    visibility: "role-only",
    publicPosition: "Administración",
  },
  {
    id: "sj-educacion",
    name: "Hno. Educación Juvenil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Sociedad Juvenil", position: "Educación" }],
  },
  {
    id: "sj-relaciones",
    name: "Hna. Relaciones Juvenil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Sociedad Juvenil", position: "Relaciones" }],
  },
  {
    id: "sj-evangelismo",
    name: "Hno. Evangelismo Juvenil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Sociedad Juvenil", position: "Evangelismo" }],
  },
  {
    id: "sj-recursos",
    name: "Hna. Recursos Juvenil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Sociedad Juvenil", position: "Recursos" }],
  },

  // ── MINISTERIOS ─────────────────────────────────────────────────────────────
  {
    id: "musica-ministro",
    name: "Hno. Ministro de Música",
    ecclesiasticalRole: "Miembro",
    roles: [
      { organization: "Ministerio de Música", position: "Ministro de Música" },
      { organization: "Coro de la Iglesia", position: "Director" },
    ],
  },
  {
    id: "musica-seminarista",
    name: "Hna. Seminarista de Música",
    ecclesiasticalRole: "Miembro",
    roles: [
      { organization: "Ministerio de Música", position: "Seminarista" },
      { organization: "Coro Infantil", position: "Directora" },
    ],
  },
  {
    id: "alabanza-sab-1",
    name: "Hno. Alabanza Sábados 1",
    ecclesiasticalRole: "Miembro",
    roles: [
      {
        organization: "Ministerio de Alabanza — Sábados",
        position: "Integrante",
        schedule: "Sábados 6:00 PM",
      },
    ],
  },
  {
    id: "alabanza-sab-2",
    name: "Hna. Alabanza Sábados 2",
    ecclesiasticalRole: "Miembro",
    roles: [
      {
        organization: "Ministerio de Alabanza — Sábados",
        position: "Integrante",
        schedule: "Sábados 6:00 PM",
      },
    ],
  },
  {
    id: "alabanza-dom-1",
    name: "Hno. Alabanza Domingos 1",
    ecclesiasticalRole: "Miembro",
    roles: [
      {
        organization: "Ministerio de Alabanza — Domingos",
        position: "Integrante",
        schedule: "Domingos 7:00 PM",
      },
    ],
  },
  {
    id: "alabanza-dom-2",
    name: "Hna. Alabanza Domingos 2",
    ecclesiasticalRole: "Miembro",
    roles: [
      {
        organization: "Ministerio de Alabanza — Domingos",
        position: "Integrante",
        schedule: "Domingos 7:00 PM",
      },
    ],
  },
  {
    id: "audio-1",
    name: "Hno. Audio 1",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Ministerio de Audio", position: "Encargado de Sonido" }],
  },
  {
    id: "audio-2",
    name: "Hno. Audio 2",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Ministerio de Audio", position: "Técnico" }],
  },
  {
    id: "guardatemplo-1",
    name: "Hno. Guardatemplo 1",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Guardatemplo", position: "Guardatemplo" }],
  },
  {
    id: "guardatemplo-2",
    name: "Hno. Guardatemplo 2",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: "Guardatemplo", position: "Guardatemplo" }],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export function getPeopleByOrg(org: string): Person[] {
  return PEOPLE.filter(
    (p) => p.visibility !== "hidden" && p.roles.some((r) => r.organization === org),
  );
}

export function getRoleInOrg(person: Person, org: string): PersonRole | undefined {
  return person.roles.find((r) => r.organization === org);
}

export function getDisplayName(person: Person): string {
  if (person.visibility === "role-only") return "Hermano/a de la congregación";
  return person.name;
}

export function getDisplayPosition(person: Person, org: string): string | undefined {
  if (person.publicPosition) return person.publicPosition;
  return getRoleInOrg(person, org)?.position;
}

// ─── ESTRUCTURA DE ORGANIZACIONES ─────────────────────────────────────────────
//
// "featuredPositions" → tarjeta grande (liderazgo máximo).
// "primaryPositions"  → tarjeta mediana (directiva).
// El resto             → tarjeta compacta.
//
export type OrgConfig = {
  id: string;
  label: string;
  description: string;
  icon: string;
  logoLabel: string;
  positionOrder: string[];
  featuredPositions: string[];
  primaryPositions: string[];
  groupsLabel?: string;
};

export const ORGS: OrgConfig[] = [
  {
    id: "consistorio",
    label: "Consistorio",
    description:
      "El consistorio está formado por el pastor y los ancianos. Son los llamados a gobernar, enseñar y cuidar espiritualmente la congregación.",
    icon: "✝",
    logoLabel: "C",
    positionOrder: [
      "Pastor Principal",
      "Secretario",
      "Educación",
      "Relaciones",
      "Evangelismo",
      "Recursos",
      "Anciano",
    ],
    featuredPositions: ["Pastor Principal"],
    primaryPositions: ["Secretario", "Educación", "Relaciones", "Evangelismo", "Recursos"],
  },
  {
    id: "diaconado",
    label: "Diaconado",
    description:
      "Los diáconos sirven la iglesia en los aspectos prácticos y materiales, atendiendo las necesidades de los hermanos y el cuidado del templo y los campos.",
    icon: "🤝",
    logoLabel: "D",
    positionOrder: [
      "Presidente",
      "Secretario",
      "Beneficencia",
      "Campo Tezón",
      "Campo Citilpech",
      "Diácono",
    ],
    featuredPositions: ["Presidente"],
    primaryPositions: ["Secretario", "Beneficencia", "Campo Tezón", "Campo Citilpech"],
  },
  {
    id: "escuela-formacion",
    label: "Escuela de Formación Cristiana",
    description:
      "Ministerio de educación bíblica para todas las edades. Cada domingo a las 10:00 AM, con grupos desde párvulos hasta interjóvenes.",
    icon: "📖",
    logoLabel: "EFC",
    positionOrder: ["Presidente", "Secretaria", "Administración", "Maestro", "Maestra"],
    featuredPositions: ["Presidente"],
    primaryPositions: ["Secretaria", "Administración"],
    groupsLabel: "Maestros",
  },
  {
    id: "femenil",
    label: "Sociedad Femenil",
    description:
      "Hermanas unidas en oración, servicio y crecimiento espiritual. Un espacio de comunión, formación y testimonio para las mujeres de la congregación.",
    icon: "🌸",
    logoLabel: "SF",
    positionOrder: [
      "Presidenta",
      "Vicepresidenta",
      "Secretaria",
      "Subsecretaria",
      "Administración",
      "Educación",
      "Relaciones",
      "Evangelismo",
      "Recursos",
    ],
    featuredPositions: ["Presidenta"],
    primaryPositions: ["Vicepresidenta", "Secretaria", "Subsecretaria", "Administración"],
  },
  {
    id: "juvenil",
    label: "Sociedad Juvenil",
    description:
      "Jóvenes comprometidos con Cristo, la comunidad y el servicio. Se reúnen cada sábado a las 7:30 PM para alabanza, palabra y compañerismo.",
    icon: "🔥",
    logoLabel: "SJ",
    positionOrder: [
      "Presidenta",
      "Secretaria",
      "Administración",
      "Educación",
      "Relaciones",
      "Evangelismo",
      "Recursos",
    ],
    featuredPositions: ["Presidenta"],
    primaryPositions: ["Secretaria", "Administración"],
  },
];

export function getOrgById(id: string): OrgConfig | undefined {
  return ORGS.find((o) => o.id === id);
}

export function getOrgPeople(org: OrgConfig): Person[] {
  return getPeopleByOrg(org.label).sort((a, b) => {
    const posA = getRoleInOrg(a, org.label)?.position ?? "";
    const posB = getRoleInOrg(b, org.label)?.position ?? "";
    const iA = org.positionOrder.findIndex((p) => posA.startsWith(p));
    const iB = org.positionOrder.findIndex((p) => posB.startsWith(p));
    return (iA === -1 ? 999 : iA) - (iB === -1 ? 999 : iB);
  });
}

// ─── MINISTERIOS ──────────────────────────────────────────────────────────────
export type Ministry = {
  id: string;
  name: string;
  desc: string;
  icon: string;
  orgKey: string;
};

export const MINISTRIES: Ministry[] = [
  {
    id: "alabanza-sabados",
    name: "Ministerio de Alabanza — Sábados",
    desc: "Hermanos que sirven al Señor con música y canto en el culto ordinario de los sábados a las 6:00 PM.",
    icon: "🎵",
    orgKey: "Ministerio de Alabanza — Sábados",
  },
  {
    id: "alabanza-domingos",
    name: "Ministerio de Alabanza — Domingos",
    desc: "Hermanos que sirven al Señor con música y canto en el culto dominical de los domingos a las 7:00 PM.",
    icon: "🎶",
    orgKey: "Ministerio de Alabanza — Domingos",
  },
  {
    id: "audio",
    name: "Ministerio de Audio",
    desc: "Equipo encargado del sonido y la imagen en cada culto y actividad de la iglesia.",
    icon: "🎚",
    orgKey: "Ministerio de Audio",
  },
  {
    id: "musica",
    name: "Ministerio de Música",
    desc: "Dirección musical de la iglesia, formación del coro y acompañamiento instrumental en los cultos.",
    icon: "🎼",
    orgKey: "Ministerio de Música",
  },
  {
    id: "coro",
    name: "Coro de la Iglesia",
    desc: "El coro principal de la congregación que ministra en cultos especiales y celebraciones.",
    icon: "🎤",
    orgKey: "Coro de la Iglesia",
  },
  {
    id: "coro-infantil",
    name: "Coro Infantil",
    desc: "Niños y jóvenes que alaban al Señor con sus voces. Dirigido por la seminarista de música.",
    icon: "👼",
    orgKey: "Coro Infantil",
  },
  {
    id: "guardatemplo",
    name: "Guardatemplo",
    desc: "Hermanos responsables del cuidado, orden y seguridad del templo en cada actividad.",
    icon: "🏛",
    orgKey: "Guardatemplo",
  },
];

// ─── HORARIOS ─────────────────────────────────────────────────────────────────
export const SCHEDULE = [
  { day: "Viernes", time: "6:00 PM", label: "Noche de Oración" },
  { day: "Sábado", time: "6:00 PM", label: "Culto Ordinario" },
  { day: "Sábado", time: "7:30 PM", label: "Reunión Juvenil" },
  { day: "Domingo", time: "10:00 AM", label: "Escuela de Formación Cristiana" },
  { day: "Domingo", time: "7:00 PM", label: "Culto Dominical" },
];

export const LOCATION = {
  name: "Iglesia Nacional Presbiteriana El Divino Redentor",
  address: "Kimbilá, Izamal, Yucatán, México",
  mapsUrl: "https://maps.app.goo.gl/qw8LZamk9oTwChQ89",
};

// ─── EVENTOS ──────────────────────────────────────────────────────────────────
export type EventCategory =
  | "culto"
  | "reunion"
  | "juvenil"
  | "femenil"
  | "formacion"
  | "especial"
  | "aniversario";

export type ChurchEvent = {
  id: string;
  title: string;
  date: string;
  time?: string;
  endTime?: string;
  location?: string;
  description: string;
  image?: string;
  category: EventCategory;
  featured?: boolean;
};

export type EventStatus = "upcoming" | "today" | "finished";

export function getEventStatus(event: ChurchEvent): EventStatus {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(event.date + "T00:00:00");
  if (eventDate.getTime() === today.getTime()) return "today";
  if (eventDate > today) return "upcoming";
  return "finished";
}

export function getUpcomingEvents(events: ChurchEvent[], limit?: number): ChurchEvent[] {
  const result = events
    .filter((e) => getEventStatus(e) !== "finished")
    .sort((a, b) => a.date.localeCompare(b.date));
  return limit ? result.slice(0, limit) : result;
}

export function getPastEvents(events: ChurchEvent[]): ChurchEvent[] {
  return events
    .filter((e) => getEventStatus(e) === "finished")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const EVENT_CATEGORY_LABELS: Record<EventCategory, string> = {
  culto: "Culto",
  reunion: "Reunión",
  juvenil: "Juvenil",
  femenil: "Femenil",
  formacion: "Formación",
  especial: "Especial",
  aniversario: "Aniversario",
};

export const EVENTS: ChurchEvent[] = [
  {
    id: "ebv-2026",
    title: "Escuela Bíblica de Vacaciones",
    date: "2026-07-07",
    time: "09:00",
    endTime: "12:00",
    location: "Templo El Divino Redentor",
    description:
      "Una semana de aprendizaje, juegos y enseñanza bíblica para los niños de la congregación y la comunidad.",
    category: "formacion",
    featured: true,
  },
  {
    id: "semana-hogar-2026",
    title: "Semana del Hogar",
    date: "2026-08-10",
    time: "19:00",
    location: "Templo El Divino Redentor",
    description:
      "Mensajes especiales dedicados a la familia cristiana y al fortalecimiento del hogar.",
    category: "especial",
  },
  {
    id: "aniversario-2026",
    title: "Aniversario de la Iglesia",
    date: "2026-09-20",
    time: "10:00",
    location: "Templo El Divino Redentor",
    description:
      "Celebración de gratitud por los años de fidelidad del Señor a nuestra congregación.",
    category: "aniversario",
    featured: true,
  },
  {
    id: "reunion-juvenil-mayo",
    title: "Reunión Juvenil",
    date: "2026-05-30",
    time: "19:30",
    location: "Templo El Divino Redentor",
    description:
      "Encuentro semanal de jóvenes con alabanza, palabra y comunión. Todos los sábados a las 7:30 PM.",
    category: "juvenil",
  },
];

// ─── GALERÍA ──────────────────────────────────────────────────────────────────
export type GalleryCategory = "culto" | "celebracion" | "comunidad" | "jovenes" | "ninos";

export type GalleryPhoto = {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  year?: number;
};

export const GALLERY_CATEGORY_LABELS: Record<GalleryCategory | "all", string> = {
  all: "Todas",
  culto: "Cultos",
  celebracion: "Celebraciones",
  comunidad: "Comunidad",
  jovenes: "Jóvenes",
  ninos: "Niños",
};

// Agrega las rutas reales de tus imágenes (src/assets/gallery/).
// Mientras no haya imágenes, se muestra un placeholder visual.
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: "g1", src: "", alt: "Culto dominical", category: "culto", year: 2024 },
  { id: "g2", src: "", alt: "Escuela Bíblica de Vacaciones", category: "ninos", year: 2024 },
  { id: "g3", src: "", alt: "Reunión juvenil", category: "jovenes", year: 2024 },
  { id: "g4", src: "", alt: "Celebración de aniversario", category: "celebracion", year: 2023 },
  { id: "g5", src: "", alt: "Comunidad después del culto", category: "comunidad", year: 2023 },
  { id: "g6", src: "", alt: "Culto de Semana Santa", category: "culto", year: 2023 },
  { id: "g7", src: "", alt: "Coro infantil", category: "ninos", year: 2024 },
  { id: "g8", src: "", alt: "Sociedad juvenil", category: "jovenes", year: 2024 },
  { id: "g9", src: "", alt: "Culto ordinario sábado", category: "culto", year: 2024 },
  { id: "g10", src: "", alt: "Día de la familia", category: "comunidad", year: 2023 },
  { id: "g11", src: "", alt: "Semana del Hogar", category: "celebracion", year: 2023 },
  { id: "g12", src: "", alt: "Niños Escuela de Formación", category: "ninos", year: 2024 },
];
