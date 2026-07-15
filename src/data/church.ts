// ─── CONTACTO ────────────────────────────────────────────────────────────────
export const WHATSAPP_URL = "https://wa.me/5219881053003";
export const FACEBOOK_URL = "https://www.facebook.com/eldivinoredentorkimbila";

// ─── ESTADÍSTICAS ─────────────────────────────────────────────────────────────
export const CHURCH_STATS = {
  totalMembers: 150,
  // Origen de la congregación. "Años de historia" se calcula a partir de este año.
  foundingYear: 1973,
  organizations: 5,
  ministries: 7,
};

// ─── HISTORIA ─────────────────────────────────────────────────────────────────
export type HistoryContent =
  | { type: "p"; text: string }
  | { type: "quote"; text: string; author: string };

export type HistoryBlock = {
  id: string;
  era: string;
  title: string;
  content: HistoryContent[];
  images?: string[];
};

export const HISTORY_BLOCKS: HistoryBlock[] = [
  {
    id: "inicios",
    era: "Inicios",
    title: "Las primeras reuniones",
    content: [
      {
        type: "p",
        text: "La historia de la Iglesia Presbiteriana Divino Redentor comenzó gracias a la fe, la unidad y el esfuerzo de un grupo de hermanos que anhelaban contar con un lugar donde reunirse para adorar a Dios.",
      },
      {
        type: "p",
        text: "Entre los primeros creyentes se encontraban Pedro Celestino Itzá, uno de los primeros ancianos de nuestra iglesia; Luciano Uitzil May; Anastacio Can; Emilio May y su familia; don Nicolás May y su familia, así como la familia Uitzil.",
      },
      {
        type: "p",
        text: "Con la participación de estas familias se construyó una pequeña casa de oración cerca del lugar donde actualmente se encuentran las instalaciones de nuestra iglesia. El terreno fue donado generosamente por nuestro hermano Francisco Javier Uitzil Canché. Sobre él se levantó una sencilla construcción de madera y tablas, al estilo de bajareque.",
      },
      {
        type: "p",
        text: "Aunque aquel primer lugar de reunión era humilde, se convirtió en el espacio donde los hermanos celebraban sus devocionales, compartían la Palabra de Dios y fortalecían su fe.",
      },
      {
        type: "p",
        text: "Al principio, la congregación todavía no tenía un nombre. Después de buscar uno que expresara su identidad y su esperanza en Cristo, los hermanos decidieron llamarla «El Divino Redentor».",
      },
      {
        type: "p",
        text: "A partir de entonces, comenzaron a visitar a más personas y familias de la comunidad, entre ellas la familia Canché y don Nicanor. Por medio de estas visitas, del testimonio de los creyentes y de la predicación del Evangelio, nuevas personas comenzaron a acercarse.",
      },
      { type: "quote", text: "La iglesia fue floreciendo.", author: "Hno. Luciano Uitzil" },
      {
        type: "p",
        text: "Con el paso del tiempo, la congregación creció hasta reunir aproximadamente cincuenta miembros y fue constituida formalmente como iglesia. Su primer consistorio estuvo integrado por los ancianos Luciano Uitzil, Bernabé Pech, Ricardo Can y Pedro Itzá. También sirvieron como diáconos Benjamín Uitzil, Augusto May y don Santos Valentín Pech.",
      },
      {
        type: "quote",
        text: "Se sentía una unidad muy preciosa como hermanos en Cristo.",
        author: "Celestino Itzá",
      },
      {
        type: "p",
        text: "La iglesia continuó creciendo y desarrollando diferentes grupos, devocionales y actividades durante casi todos los días de la semana. Esto hizo necesario contar con más ancianos, diáconos y servidores que ayudaran en el cuidado de la congregación.",
      },
      {
        type: "p",
        text: "Los hermanos siguieron visitando a las familias, compartiendo el Evangelio y trabajando unidos. Estas acciones, acompañadas de la oración y del servicio, fueron fundamentales para el crecimiento de la Iglesia Presbiteriana Divino Redentor.",
      },
      {
        type: "p",
        text: "Así comenzó nuestra historia: en una sencilla casa de oración construida con madera, pero sostenida por una fe firme, por el amor entre los hermanos y por el deseo de anunciar a Cristo como nuestro Salvador.",
      },
    ],
    images: [],
  },
  {
    id: "crecimiento",
    era: "Crecimiento",
    title: "La iglesia floreciendo",
    content: [
      {
        type: "p",
        text: "Con el paso del tiempo, nuestra iglesia ha atravesado diversos desafíos. Hemos enfrentado una pandemia que nos llevó a realizar cultos de manera virtual, temporadas de desánimo entre la membresía, la necesidad de buscar un pastor y el importante proceso de reconstrucción de nuestro templo.",
      },
      {
        type: "p",
        text: "También hemos visto surgir ideas y corrientes del mundo que no concuerdan con nuestra fe. Ante estos cambios, hemos procurado mantenernos firmes en la Palabra de Dios, reconociendo que la Biblia es nuestra única regla de fe y práctica.",
      },
      {
        type: "p",
        text: "A pesar de cada dificultad, Dios ha sido fiel y nos ha permitido seguir floreciendo. Nuevas familias se han unido a la congregación y, por su gracia, logramos concluir la reconstrucción de nuestro templo.",
      },
      {
        type: "p",
        text: "Cada desafío ha fortalecido nuestra fe y nos ha enseñado que, aun en los momentos más difíciles, Dios continúa guiando, sosteniendo y haciendo crecer a la Iglesia Presbiteriana Divino Redentor.",
      },
    ],
    images: [],
  },
  {
    id: "hoy",
    era: "Hoy",
    title: "Caminando en fe",
    content: [
      {
        type: "p",
        text: "Hoy continuamos sirviendo al Señor con gratitud, mediante los diferentes ministerios de nuestra iglesia y con las puertas abiertas a toda persona que desee conocer el amor de Cristo.",
      },
    ],
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

// Etiquetas de organización reutilizables (deben coincidir en PEOPLE y ORGS).
const CONSISTORIO = "Consistorio";
const DIACONADO = "Diaconado";
const EFC = "Escuela de Formación Cristiana";
const FEMENIL = "Sociedad Femenil";
const JUVENIL = "Sociedad Juvenil";
const CAMPO_TZON = "Campo San Francisco Tzon";
const CAMPO_SITILPECH = "Campo Sitilpech";
const ALABANZA_SAB = "Ministerio de Alabanza — Sábados";
const ALABANZA_DOM = "Ministerio de Alabanza — Domingos";
const AUDIO = "Ministerio de Audio";
const MUSICA = "Ministerio de Música";
const CORO = "Coro de la Iglesia";
const CORO_INFANTIL = "Coro Infantil";
const GUARDATEMPLO = "Guardatemplo";

const HORARIO_EFC = "Domingos 10:00 AM";
const HORARIO_SAB = "Sábados 6:00 PM";
const HORARIO_DOM = "Domingos 6:00 PM";

// ─── REGISTRO DE PERSONAS ─────────────────────────────────────────────────────
export const PEOPLE: Person[] = [
  // ── CONSISTORIO ────────────────────────────────────────────────────────────
  {
    id: "santiago-chay-perera",
    name: "Santiago Chay Perera",
    ecclesiasticalRole: "Pastor",
    roles: [{ organization: CONSISTORIO, position: "Pastor" }],
  },
  {
    id: "juan-daniel-mex-may",
    name: "Juan Daniel Mex May",
    ecclesiasticalRole: "Anciano",
    roles: [
      { organization: CONSISTORIO, position: "Secretario del H. Consistorio" },
      { organization: AUDIO, position: "Integrante" },
      { organization: ALABANZA_DOM, position: "Integrante", schedule: HORARIO_DOM },
    ],
  },
  {
    id: "jose-humberto-escalante-coral",
    name: "José Humberto Escalante Coral",
    ecclesiasticalRole: "Anciano",
    roles: [
      { organization: CONSISTORIO, position: "Ministro de Educación" },
      { organization: EFC, position: "Maestro", group: "Adultos", schedule: HORARIO_EFC },
      { organization: JUVENIL, position: "Consejero" },
    ],
  },
  {
    id: "jose-sebastian-uitzil-can",
    name: "José Sebastián Uitzil Can",
    ecclesiasticalRole: "Anciano",
    roles: [{ organization: CONSISTORIO, position: "Ministro de Relaciones" }],
  },
  {
    id: "francisco-uitzil-may",
    name: "Francisco Uitzil May",
    ecclesiasticalRole: "Anciano",
    roles: [
      { organization: CONSISTORIO, position: "Ministro de Relaciones" },
      { organization: CAMPO_SITILPECH, position: "Encargado" },
      { organization: FEMENIL, position: "Consejero" },
    ],
  },
  {
    id: "freddie-uitzil-uitz",
    name: "Freddie Uitzil Uitz",
    ecclesiasticalRole: "Anciano",
    roles: [
      { organization: CONSISTORIO, position: "Ministro de Evangelismo" },
      { organization: CAMPO_TZON, position: "Anciano Encargado" },
    ],
  },
  {
    id: "alan-darwin-uitzil-may",
    name: "Alan Darwin Uitzil May",
    ecclesiasticalRole: "Anciano",
    roles: [{ organization: CONSISTORIO, position: "Ministro de Recursos" }],
  },

  // ── ESCUELA DE FORMACIÓN CRISTIANA — DIRECTIVA ─────────────────────────────
  {
    id: "josias-bernardo-mex-uitzil",
    name: "Josías Bernardo Mex Uitzil",
    ecclesiasticalRole: "Miembro",
    roles: [
      { organization: EFC, position: "Presidente" },
      { organization: AUDIO, position: "Integrante" },
      { organization: ALABANZA_DOM, position: "Integrante", schedule: HORARIO_DOM },
      { organization: JUVENIL, position: "Educación" },
    ],
  },
  {
    id: "nicolas-canche",
    name: "Nicolás Canché",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: EFC, position: "Subdirector" }],
  },
  {
    id: "liliana-de-la-cruz-leyba",
    name: "Liliana de la Cruz Leyba",
    ecclesiasticalRole: "Miembro",
    roles: [
      { organization: EFC, position: "Secretaria" },
      { organization: FEMENIL, position: "Secretaria" },
    ],
  },
  {
    id: "allan-uitzil",
    name: "Allan Uitzil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: EFC, position: "Tesorero" }],
  },

  // ── ESCUELA DE FORMACIÓN CRISTIANA — MAESTROS ──────────────────────────────
  // Preescolar
  {
    id: "madai-itza-uitzil",
    name: "Madai Itzá Uitzil",
    ecclesiasticalRole: "Miembro",
    roles: [
      { organization: EFC, position: "Maestra", group: "Preescolar", schedule: HORARIO_EFC },
      { organization: JUVENIL, position: "Presidenta" },
      { organization: ALABANZA_DOM, position: "Integrante", schedule: HORARIO_DOM },
    ],
  },
  {
    id: "esmeralda",
    name: "Esmeralda",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: EFC, position: "Maestra", group: "Preescolar", schedule: HORARIO_EFC }],
  },
  {
    id: "lili-uitzil",
    name: "Lili Uitzil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: EFC, position: "Maestra", group: "Preescolar", schedule: HORARIO_EFC }],
  },
  // Párvulos
  {
    id: "jade-beatriz-itza-uitzil",
    name: "Jade Beatriz Itzá Uitzil",
    ecclesiasticalRole: "Miembro",
    roles: [
      { organization: EFC, position: "Maestra", group: "Párvulos", schedule: HORARIO_EFC },
      { organization: JUVENIL, position: "Recursos" },
      { organization: ALABANZA_DOM, position: "Integrante", schedule: HORARIO_DOM },
    ],
  },
  {
    id: "margelly",
    name: "Margelly",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: EFC, position: "Maestra", group: "Párvulos", schedule: HORARIO_EFC }],
  },
  {
    id: "amanda",
    name: "Amanda",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: EFC, position: "Maestra", group: "Párvulos", schedule: HORARIO_EFC }],
  },
  // Principiantes
  {
    id: "yohali-aremi-mex-uitzil",
    name: "Yohali Aremi Mex Uitzil",
    ecclesiasticalRole: "Miembro",
    roles: [
      { organization: EFC, position: "Maestra", group: "Principiantes", schedule: HORARIO_EFC },
      { organization: JUVENIL, position: "Relaciones" },
      { organization: ALABANZA_DOM, position: "Integrante", schedule: HORARIO_DOM },
    ],
  },
  {
    id: "jr-freddie-uitzil",
    name: "Jr. Freddie Uitzil",
    ecclesiasticalRole: "Miembro",
    roles: [
      { organization: EFC, position: "Maestro", group: "Principiantes", schedule: HORARIO_EFC },
      { organization: AUDIO, position: "Integrante" },
      { organization: JUVENIL, position: "Tesorero" },
    ],
  },
  // Primarios
  {
    id: "norma-uitzil",
    name: "Norma Uitzil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: EFC, position: "Maestra", group: "Primarios", schedule: HORARIO_EFC }],
  },
  {
    id: "nimsi",
    name: "Nimsi",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: EFC, position: "Maestra", group: "Primarios", schedule: HORARIO_EFC }],
  },
  // Intermedios
  {
    id: "keyla-may",
    name: "Keyla May",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: EFC, position: "Maestra", group: "Intermedios", schedule: HORARIO_EFC }],
  },
  {
    id: "alonso-chuc-pat",
    name: "Alonso Chuc Pat",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: EFC, position: "Maestro", group: "Intermedios", schedule: HORARIO_EFC }],
  },
  {
    id: "gladis-pat-may",
    name: "Gladis Pat May",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: EFC, position: "Maestra", group: "Intermedios", schedule: HORARIO_EFC }],
  },
  // Adultos
  {
    id: "genaro-oxte",
    name: "Genaro Oxte",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: EFC, position: "Maestro", group: "Adultos", schedule: HORARIO_EFC }],
  },
  {
    id: "adriano",
    name: "Adriano",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: EFC, position: "Maestro", group: "Adultos", schedule: HORARIO_EFC }],
  },
  {
    id: "freddie-uitzil",
    name: "Freddie Uitzil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: EFC, position: "Maestro", group: "Adultos", schedule: HORARIO_EFC }],
  },

  // ── SOCIEDAD FEMENIL ────────────────────────────────────────────────────────
  {
    id: "luci-aremi-uitzil-uitz",
    name: "Luci Aremi Uitzil Uitz",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: FEMENIL, position: "Presidenta" }],
  },
  {
    id: "miriam-may-medina",
    name: "Miriam May Medina",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: FEMENIL, position: "Vicepresidenta" }],
  },
  {
    id: "martha-alicia-uitzil-canche",
    name: "Martha Alicia Uitzil Canché",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: FEMENIL, position: "Subsecretaria" }],
  },
  {
    id: "maria-de-lourdes-pat-can",
    name: "María de Lourdes Pat Can",
    ecclesiasticalRole: "Miembro",
    roles: [
      { organization: FEMENIL, position: "Tesorera" },
      { organization: CAMPO_TZON, position: "Maestra de niños" },
    ],
  },
  {
    id: "martha-may-colli",
    name: "Martha May Colli",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: FEMENIL, position: "Educación" }],
  },
  {
    id: "cecilia-ek",
    name: "Cecilia Ek",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: FEMENIL, position: "Evangelismo" }],
  },
  {
    id: "alma-rosa-uitzil",
    name: "Alma Rosa Uitzil",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: FEMENIL, position: "Relaciones" }],
  },
  {
    id: "carminia-moo-chunab",
    name: "Carminia Moo Chunab",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: FEMENIL, position: "Recursos" }],
  },

  // ── SOCIEDAD JUVENIL ────────────────────────────────────────────────────────
  {
    id: "arley-abisai-uitzil-moo",
    name: "Arley Abisai Uitzil Moo",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: JUVENIL, position: "Secretario" }],
  },
  {
    id: "mildred-estefania-mex-uitzil",
    name: "Mildred Estefanía Mex Uitzil",
    ecclesiasticalRole: "Seminarista",
    roles: [
      { organization: JUVENIL, position: "Evangelismo" },
      { organization: ALABANZA_SAB, position: "Integrante", schedule: HORARIO_SAB },
      { organization: AUDIO, position: "Integrante" },
      { organization: ALABANZA_DOM, position: "Integrante", schedule: HORARIO_DOM },
      { organization: CORO, position: "Integrante" },
      { organization: MUSICA, position: "Integrante" },
      { organization: CORO_INFANTIL, position: "Integrante" },
    ],
  },

  // ── MINISTERIOS (integrantes) ──────────────────────────────────────────────
  {
    id: "addy-uitzil",
    name: "Addy Uitzil",
    ecclesiasticalRole: "Ministra de Música",
    roles: [
      { organization: MUSICA, position: "Ministra de Música" },
      { organization: CORO, position: "Directora" },
      { organization: CORO_INFANTIL, position: "Responsable" },
    ],
  },
  {
    id: "diego-uitzil",
    name: "Diego Uitzil",
    ecclesiasticalRole: "Joven",
    roles: [
      { organization: ALABANZA_SAB, position: "Integrante", schedule: HORARIO_SAB },
      { organization: AUDIO, position: "Integrante" },
    ],
  },
  {
    id: "alex-uitzil",
    name: "Alex Uitzil",
    ecclesiasticalRole: "Joven",
    roles: [{ organization: ALABANZA_SAB, position: "Integrante", schedule: HORARIO_SAB }],
  },
  {
    id: "jezreel-herrera-llanos",
    name: "Jezreel Herrera Llanos",
    ecclesiasticalRole: "Joven",
    roles: [
      { organization: ALABANZA_SAB, position: "Integrante", schedule: HORARIO_SAB },
      { organization: AUDIO, position: "Integrante" },
    ],
  },
  {
    id: "erick-ek-may",
    name: "Erick Ek May",
    ecclesiasticalRole: "Joven",
    roles: [{ organization: ALABANZA_SAB, position: "Integrante", schedule: HORARIO_SAB }],
  },
  {
    id: "valeria-ek-may",
    name: "Valeria Ek May",
    ecclesiasticalRole: "Joven",
    roles: [{ organization: ALABANZA_SAB, position: "Integrante", schedule: HORARIO_SAB }],
  },
  {
    id: "eliezer-azarias-mex-may",
    name: "Eliezer Azarías Mex May",
    ecclesiasticalRole: "Miembro",
    roles: [
      { organization: AUDIO, position: "Integrante" },
      { organization: ALABANZA_DOM, position: "Integrante", schedule: HORARIO_DOM },
    ],
  },
  {
    id: "jafet-may",
    name: "Jafet May",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: AUDIO, position: "Integrante" }],
  },
  {
    id: "felipe-canche-llanos",
    name: "Felipe Canché Llanos",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: ALABANZA_DOM, position: "Integrante", schedule: HORARIO_DOM }],
  },
  {
    id: "esteher-pat",
    name: "Esteher Pat",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: GUARDATEMPLO, position: "Guardatemplo" }],
  },
  {
    id: "wilberth-canche-may",
    name: "Wilberth Canché May",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: GUARDATEMPLO, position: "Guardatemplo" }],
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export function getPersonById(id: string): Person | undefined {
  return PEOPLE.find((p) => p.id === id);
}

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
// Cada organización define sus propias "sections" (secciones) con su encabezado
// y la forma de listar a las personas. Layouts disponibles:
//   "people"  → tarjetas de personas por cargo (heroPositions = tarjeta grande).
//   "grouped" → maestros/integrantes agrupados por "group" (groupOrder define el orden).
//   "campos"  → campos/misiones con su encargado.
//
export type OrgCampo = {
  name: string;
  orgLabel: string; // organización del rol del encargado (para mostrar su cargo)
  personId: string;
  area?: string;
  members?: string[]; // colaboradores adicionales (ids); su cargo sale de su rol en orgLabel
};

export type OrgSection = {
  heading: string;
  layout: "people" | "grouped" | "campos";
  positions?: string[]; // "people": cargos incluidos (en orden)
  heroPositions?: string[]; // "people": cargos que se muestran como tarjeta grande
  compact?: boolean; // "people": el resto se muestra como tarjeta compacta
  groupOrder?: string[]; // "grouped": orden de los grupos
  campos?: OrgCampo[]; // "campos"
  roleAbbrev?: string; // "people": abrevia el rol eclesiástico en la tarjeta e inlínea el cargo (ej. "A.I." en Ancianos, ya que el encabezado dice "Ancianos")
};

export type OrgConfig = {
  id: string;
  label: string;
  description: string;
  icon: string;
  logoLabel: string;
  bibleRefs?: string;
  countLabel?: string; // reemplaza el conteo de integrantes en la tarjeta
  positionOrder: string[];
  sections: OrgSection[];
};

export const ORGS: OrgConfig[] = [
  {
    id: "consistorio",
    label: CONSISTORIO,
    description:
      "El consistorio está formado por el pastor y los ancianos, quienes son llamados a gobernar y servir al pueblo de Dios.",
    bibleRefs: "Números 11:16-17; Hechos 14:23; Tito 1:9.",
    icon: "✝",
    logoLabel: "C",
    positionOrder: [
      "Pastor",
      "Secretario del H. Consistorio",
      "Ministro de Educación",
      "Ministro de Relaciones",
      "Ministro de Evangelismo",
      "Ministro de Recursos",
    ],
    sections: [
      {
        heading: "Liderazgo",
        layout: "people",
        heroPositions: ["Pastor"],
        positions: ["Pastor"],
      },
      {
        heading: "Ancianos",
        layout: "people",
        roleAbbrev: "A.I.",
        positions: [
          "Secretario del H. Consistorio",
          "Ministro de Educación",
          "Ministro de Relaciones",
          "Ministro de Evangelismo",
          "Ministro de Recursos",
        ],
      },
      {
        heading: "Campos",
        layout: "campos",
        campos: [
          {
            name: "San Francisco Tzon",
            orgLabel: CAMPO_TZON,
            personId: "freddie-uitzil-uitz",
            area: "Evangelismo",
            members: ["maria-de-lourdes-pat-can"],
          },
          { name: "Sitilpech", orgLabel: CAMPO_SITILPECH, personId: "francisco-uitzil-may" },
        ],
      },
    ],
  },
  {
    id: "diaconado",
    label: DIACONADO,
    description:
      "Los diáconos sirven a la iglesia promoviendo la mayordomía, administrando fielmente sus recursos y atendiendo a quienes atraviesan necesidades.\n\nTambién cuidan el templo, mantienen el orden, colaboran con pastores y ancianos, y dan ejemplo con su servicio, ofrendas y diezmos.",
    bibleRefs: "1 Crónicas 29:11-14; 1 Corintios 16:2-3; 2 Corintios 8–9; Gálatas 6:10; Santiago 1:27.",
    icon: "🤝",
    logoLabel: "D",
    countLabel: "10 diáconos",
    positionOrder: ["Presidente", "Secretario"],
    sections: [
      {
        heading: "Directiva",
        layout: "people",
        heroPositions: ["Presidente", "Secretario"],
        positions: ["Presidente", "Secretario"],
      },
    ],
  },
  {
    id: "escuela-formacion",
    label: EFC,
    description:
      "Ministerio de educación bíblica para todas las edades. Cada domingo a las 10:00 AM, con grupos desde preescolar hasta adultos.",
    icon: "📖",
    logoLabel: "EFC",
    positionOrder: ["Presidente", "Subdirector", "Secretaria", "Tesorero", "Maestra", "Maestro"],
    sections: [
      {
        heading: "Directiva",
        layout: "people",
        heroPositions: ["Presidente"],
        positions: ["Presidente", "Subdirector", "Secretaria", "Tesorero"],
      },
      {
        heading: "Maestros",
        layout: "grouped",
        groupOrder: [
          "Preescolar",
          "Párvulos",
          "Principiantes",
          "Primarios",
          "Intermedios",
          "Adultos",
        ],
      },
    ],
  },
  {
    id: "femenil",
    label: FEMENIL,
    description:
      "Hermanas en servicio y crecimiento espiritual para la gloria de Dios. Un espacio de comunión, formación y testimonio para las mujeres de nuestra iglesia y para aquellas que desean integrarse a nuestra iglesia.",
    icon: "🌸",
    logoLabel: "SF",
    positionOrder: [
      "Presidenta",
      "Vicepresidenta",
      "Secretaria",
      "Subsecretaria",
      "Tesorera",
      "Educación",
      "Evangelismo",
      "Relaciones",
      "Recursos",
      "Consejero",
    ],
    sections: [
      {
        heading: "Directiva",
        layout: "people",
        heroPositions: ["Presidenta"],
        positions: ["Presidenta", "Vicepresidenta", "Secretaria", "Subsecretaria", "Tesorera"],
      },
      {
        heading: "Ministerios",
        layout: "people",
        positions: ["Educación", "Evangelismo", "Relaciones", "Recursos"],
        compact: true,
      },
      {
        heading: "Consejero",
        layout: "people",
        positions: ["Consejero"],
      },
    ],
  },
  {
    id: "juvenil",
    label: JUVENIL,
    description:
      "Jóvenes comprometidos con Cristo, la comunidad y el servicio. Se reúnen cada sábado a las 7:30 PM para alabanza, palabra y compañerismo.",
    icon: "🔥",
    logoLabel: "SJ",
    positionOrder: [
      "Presidenta",
      "Secretario",
      "Tesorero",
      "Educación",
      "Evangelismo",
      "Relaciones",
      "Recursos",
      "Consejero",
    ],
    sections: [
      {
        heading: "Directiva",
        layout: "people",
        heroPositions: ["Presidenta"],
        positions: ["Presidenta", "Secretario", "Tesorero"],
      },
      {
        heading: "Ministerios",
        layout: "people",
        positions: ["Educación", "Evangelismo", "Relaciones", "Recursos"],
        compact: true,
      },
      {
        heading: "Consejero",
        layout: "people",
        positions: ["Consejero"],
      },
    ],
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
    orgKey: ALABANZA_SAB,
  },
  {
    id: "audio",
    name: "Ministerio de Audio",
    desc: "Equipo encargado del sonido y la imagen en cada culto y actividad de la iglesia.",
    icon: "🎚",
    orgKey: AUDIO,
  },
  {
    id: "guardatemplo",
    name: "Guardatemplo",
    desc: "Hermanos responsables del cuidado, orden y seguridad del templo en cada actividad.",
    icon: "🏛",
    orgKey: GUARDATEMPLO,
  },
  {
    id: "alabanza-domingos",
    name: "Ministerio de Alabanza — Domingos",
    desc: "Hermanos que sirven al Señor con música y canto en el culto dominical de los domingos a las 6:00 PM.",
    icon: "🎶",
    orgKey: ALABANZA_DOM,
  },
  {
    id: "coro",
    name: "Coro de la Iglesia",
    desc: "El coro principal de la congregación que ministra en cultos especiales y celebraciones.",
    icon: "🎤",
    orgKey: CORO,
  },
  {
    id: "musica",
    name: "Ministerio de Música",
    desc: "Dirección musical de la iglesia, formación del coro y acompañamiento instrumental en los cultos.",
    icon: "🎼",
    orgKey: MUSICA,
  },
  {
    id: "coro-infantil",
    name: "Coro Infantil",
    desc: "Niños y jóvenes que alaban al Señor con sus voces. Dirigido por la Ministra de Música.",
    icon: "👼",
    orgKey: CORO_INFANTIL,
  },
];

// Agrupación visual de los ministerios en la sección pública.
// Cada grupo muestra un título propio; los ministerios se listan por su `id`.
export type MinistryGroup = {
  id: string;
  heading: string;
  ministryIds: string[];
};

export const MINISTRY_GROUPS: MinistryGroup[] = [
  {
    id: "cantos-alabanza",
    heading: "Ministerio de Cantos de Alabanza",
    ministryIds: ["coro", "coro-infantil", "alabanza-domingos", "alabanza-sabados", "musica"],
  },
  {
    id: "logistica",
    heading: "Logística",
    ministryIds: ["audio", "guardatemplo"],
  },
];

// ─── HORARIOS ─────────────────────────────────────────────────────────────────
export const SCHEDULE = [
  { day: "Viernes", time: "6:00 PM", label: "Noche de Oración" },
  { day: "Sábado", time: "6:00 PM", label: "Culto Ordinario" },
  { day: "Sábado", time: "7:30 PM", label: "Reunión Juvenil" },
  { day: "Domingo", time: "10:00 AM", label: "Escuela de Formación Cristiana" },
  { day: "Domingo", time: "6:00 PM", label: "Culto Dominical" },
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

// Las fotos viven en public/gallery/ y se referencian con la ruta /gallery/...
// Para agregar más: coloca la imagen en public/gallery/ y añade una fila aquí.
export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    src: "/gallery/605230236_846495228018946_4792313000231839081_n.jpg",
    alt: "Congregación reunida en oración durante el culto",
    category: "culto",
    year: 2025,
  },
  {
    id: "g2",
    src: "/gallery/669127475_927212439947224_6784849490962793041_n.jpg",
    alt: "Coro de la iglesia ministrando durante el culto",
    category: "culto",
    year: 2025,
  },
  {
    id: "g3",
    src: "/gallery/686502190_943394981662303_1001827876680462858_n.jpg",
    alt: "Momento de oración en el culto dominical",
    category: "culto",
    year: 2025,
  },
  {
    id: "g4",
    src: "/gallery/515283682_713285388006598_8274687130702415659_n.jpg",
    alt: "Acto solemne en el templo El Divino Redentor",
    category: "culto",
    year: 2025,
  },
  {
    id: "g5",
    src: "/gallery/547701775_768456945822775_5663542039639473301_n.jpg",
    alt: "Honores a la bandera con niñas en hipil yucateco",
    category: "celebracion",
    year: 2025,
  },
  {
    id: "g6",
    src: "/gallery/607250891_851470290854773_8894590473987977992_n.jpg",
    alt: "Coro de la iglesia en traje típico frente a la cruz",
    category: "celebracion",
    year: 2025,
  },
  {
    id: "g7",
    src: "/gallery/606456797_852391730762629_6796961850102864953_n.jpg",
    alt: "Jóvenes celebrando el Año Nuevo 2026",
    category: "jovenes",
    year: 2026,
  },
  {
    id: "g8",
    src: "/gallery/605544134_846495118018957_1709259024682932637_n.jpg",
    alt: "Familias de la congregación frente a la cruz",
    category: "comunidad",
    year: 2025,
  },
  {
    id: "g9",
    src: "/gallery/634808617_886061737395628_8100998993713503181_n.jpg",
    alt: "Hermanos de la congregación reunidos después del culto",
    category: "comunidad",
    year: 2025,
  },
];
