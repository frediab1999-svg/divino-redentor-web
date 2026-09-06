// ─── CONTACTO ────────────────────────────────────────────────────────────────
export const WHATSAPP_URL = "https://wa.me/5219881053003";
export const FACEBOOK_URL = "https://www.facebook.com/eldivinoredentorkimbila";

// ─── ESTADÍSTICAS ─────────────────────────────────────────────────────────────
export const CHURCH_STATS = {
  totalMembers: 150,
  // Origen de la congregación. "Años de historia" se calcula a partir de este año.
  foundingYear: 1973,
  organizations: 5,
  ministries: 4,
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
        text: "La historia de la Iglesia Presbiteriana Divino Redentor comenzó con la fe y el esfuerzo de un grupo de hermanos que anhelaban tener un lugar donde reunirse para adorar a Dios.",
      },
      {
        type: "p",
        text: "Entre los primeros creyentes estuvieron Pedro Celestino Itzá, Luciano Uitzil May, Anastacio Can, Emilio May y su familia, don Nicolás May y su familia, así como la familia Uitzil.",
      },
      {
        type: "p",
        text: "Gracias a la participación de estas familias y a la generosa donación de un terreno por parte del hermano Francisco Javier Uitzil Canché, se construyó una pequeña casa de oración de madera y tablas, cerca de donde hoy se encuentran las instalaciones de nuestra iglesia.",
      },
      {
        type: "p",
        text: "Aunque era un lugar sencillo, allí los hermanos celebraban sus devocionales, compartían la Palabra de Dios y fortalecían su fe. Tiempo después, la congregación adoptó el nombre «El Divino Redentor».",
      },
      {
        type: "p",
        text: "Los hermanos comenzaron a visitar a más familias de la comunidad y, por medio de la predicación del Evangelio y su testimonio, nuevas personas se acercaron a la iglesia.",
      },
      { type: "quote", text: "La iglesia fue floreciendo.", author: "Hno. Luciano Uitzil" },
      {
        type: "p",
        text: "Con el paso del tiempo, la congregación creció hasta alcanzar aproximadamente cincuenta miembros y fue constituida formalmente como iglesia. Su primer consistorio estuvo integrado por Luciano Uitzil, Bernabé Pech, Ricardo Can y Pedro Itzá; y como diáconos sirvieron Benjamín Uitzil, Augusto May y Santos Valentín Pech.",
      },
      {
        type: "quote",
        text: "Se sentía una unidad muy preciosa como hermanos en Cristo.",
        author: "Celestino Itzá",
      },
      {
        type: "p",
        text: "La iglesia continuó creciendo mediante la oración, el servicio, los devocionales y la predicación del Evangelio.",
      },
      {
        type: "p",
        text: "Así comenzó nuestra historia: en una sencilla casa de oración, sostenida por una fe firme, el amor entre los hermanos y el deseo de anunciar a Cristo como nuestro Salvador.",
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
export type Testimony = { name: string; text: string };

// Sin testimonios publicados por el momento: la sección muestra "Próximamente".
export const TESTIMONIES: Testimony[] = [];

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
const ALABANZA_SAB = "Grupo de Alabanza — Sábados";
const ALABANZA_DOM = "Grupo de Alabanza — Domingos";
const AUDIO = "Equipo de Audio";
const MUSICA = "Ministerio de Música";
const CORO = "Coro Iglesia Canto de Libertad";
const CORO_INFANTIL = "Coro Infantil Joyas de Cristo";
const SEMINARIO_MUSICA = "Seminarista de Música";
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
      { organization: EFC, position: "Maestro", group: "Adultos", schedule: HORARIO_EFC },
    ],
  },
  {
    id: "alan-darwin-uitzil-may",
    name: "Alan Darwin Uitzil May",
    ecclesiasticalRole: "Anciano",
    roles: [
      { organization: CONSISTORIO, position: "Ministro de Recursos" },
      { organization: DIACONADO, position: "Consejero" },
    ],
  },

  // ── DIACONADO ──────────────────────────────────────────────────────────────
  {
    id: "israel-uitzil-canche",
    name: "Israel Uitzil Canche",
    ecclesiasticalRole: "Diácono",
    roles: [{ organization: DIACONADO, position: "Presidente" }],
  },
  {
    id: "jorge-abizai-may-may",
    name: "Jorge Abizai May May",
    ecclesiasticalRole: "Diácono",
    roles: [
      { organization: DIACONADO, position: "Vicepresidente" },
      { organization: DIACONADO, position: "Construcción" },
    ],
  },
  {
    id: "cinthia-lizeth-uitzil-may",
    name: "Cinthia Lizeth Uitzil May",
    ecclesiasticalRole: "Diaconisa",
    roles: [{ organization: DIACONADO, position: "Beneficencia" }],
  },
  {
    id: "abdi-israel-ruiz-can",
    name: "Abdi Israel Ruiz Can",
    ecclesiasticalRole: "Diácono",
    roles: [{ organization: DIACONADO, position: "Insumos" }],
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
    id: "lili-margarita-uitzil-can",
    name: "Lili Margarita Uitzil Can",
    ecclesiasticalRole: "Diaconisa",
    roles: [
      { organization: DIACONADO, position: "Orden y reverencia" },
      { organization: EFC, position: "Maestra", group: "Preescolar", schedule: HORARIO_EFC },
    ],
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
    id: "jr-freddie-uitzil-pat",
    name: "Jr. Freddie Uitzil Pat",
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
    id: "nimci-yolanda-can-llanos",
    name: "Nimci Yolanda Can Llanos",
    ecclesiasticalRole: "Diaconisa",
    roles: [
      { organization: DIACONADO, position: "Beneficencia" },
      { organization: EFC, position: "Maestra", group: "Primarios", schedule: HORARIO_EFC },
    ],
  },
  // Intermedios
  {
    id: "keyla-merari-may-medina",
    name: "Keyla Merari May Medina",
    ecclesiasticalRole: "Diaconisa",
    roles: [
      { organization: DIACONADO, position: "Orden y reverencia" },
      { organization: EFC, position: "Maestra", group: "Intermedios", schedule: HORARIO_EFC },
    ],
  },
  {
    id: "jose-alonso-chuc-ortiz",
    name: "José Alonso Chuc Ortiz",
    ecclesiasticalRole: "Diácono",
    roles: [
      { organization: DIACONADO, position: "Tesorero" },
      { organization: DIACONADO, position: "Mayordomía" },
      { organization: EFC, position: "Maestro", group: "Intermedios", schedule: HORARIO_EFC },
    ],
  },
  {
    id: "gladis-pat-may",
    name: "Gladis Pat May",
    ecclesiasticalRole: "Miembro",
    roles: [
      { organization: EFC, position: "Maestra", group: "Intermedios", schedule: HORARIO_EFC },
    ],
  },
  // Adultos
  {
    id: "genaro-oxte",
    name: "Genaro Oxte",
    ecclesiasticalRole: "Miembro",
    roles: [{ organization: EFC, position: "Maestro", group: "Adultos", schedule: HORARIO_EFC }],
  },
  {
    id: "adriano-canche-may",
    name: "Adriano Canche May",
    ecclesiasticalRole: "Diácono",
    roles: [
      { organization: DIACONADO, position: "Secretario" },
      { organization: EFC, position: "Maestro", group: "Adultos", schedule: HORARIO_EFC },
    ],
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
    ecclesiasticalRole: "Seminarista de Música",
    roles: [
      { organization: SEMINARIO_MUSICA, position: "Seminarista de Música" },
      { organization: CORO_INFANTIL, position: "Seminarista de Música" },
      { organization: JUVENIL, position: "Evangelismo" },
      { organization: ALABANZA_SAB, position: "Integrante", schedule: HORARIO_SAB },
      { organization: ALABANZA_DOM, position: "Integrante", schedule: HORARIO_DOM },
      { organization: AUDIO, position: "Integrante" },
    ],
  },

  // ── MINISTERIOS (integrantes) ──────────────────────────────────────────────
  {
    id: "addy-uitzil",
    name: "Addy Uitzil",
    ecclesiasticalRole: "Ministro de Música",
    roles: [
      { organization: MUSICA, position: "Ministro de Música" },
      { organization: CORO, position: "Directora" },
      { organization: CORO_INFANTIL, position: "Directora" },
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
    id: "luis-felipe-canche-llanos",
    name: "Luis Felipe Canché Llanos",
    ecclesiasticalRole: "Diácono",
    roles: [
      { organization: DIACONADO, position: "Apoyo" },
      { organization: ALABANZA_DOM, position: "Integrante", schedule: HORARIO_DOM },
    ],
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
    bibleRefs:
      "1 Crónicas 29:11-14; 1 Corintios 16:2-3; 2 Corintios 8–9; Gálatas 6:10; Santiago 1:27.",
    icon: "🤝",
    logoLabel: "D",
    countLabel: "10 diáconos",
    positionOrder: [
      "Presidente",
      "Vicepresidente",
      "Secretario",
      "Tesorero",
      "Consejero",
      "Beneficencia",
      "Mayordomía",
      "Orden y reverencia",
      "Insumos",
      "Construcción",
      "Apoyo",
    ],
    sections: [
      {
        heading: "Directiva",
        layout: "people",
        heroPositions: ["Presidente"],
        positions: ["Presidente", "Vicepresidente", "Secretario", "Tesorero", "Consejero"],
      },
      {
        heading: "Áreas de servicio",
        layout: "people",
        positions: [
          "Beneficencia",
          "Mayordomía",
          "Orden y reverencia",
          "Insumos",
          "Construcción",
          "Apoyo",
        ],
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
// Un ministerio puede dividirse en subgrupos (ej. Grupo de Alabanza →
// Sábados / Domingos). En ese caso `orgKey` queda vacío y los integrantes
// se toman de cada subgrupo.
export type MinistrySubgroup = {
  id: string;
  name: string;
  desc: string;
  orgKey: string;
};

export type Ministry = {
  id: string;
  name: string;
  desc: string;
  icon: string;
  orgKey: string;
  subgroups?: MinistrySubgroup[];
};

export const MINISTRIES: Ministry[] = [
  {
    id: "grupo-alabanza",
    name: "Grupo de Alabanza",
    desc: "Hermanos que sirven al Señor con música y canto en los cultos. Se organiza en dos grupos: sábados y domingos.",
    icon: "🎵",
    orgKey: "",
    subgroups: [
      {
        id: "alabanza-sabados",
        name: "Grupo de Alabanza — Sábados",
        desc: "Hermanos que sirven al Señor con música y canto en el culto ordinario de los sábados a las 6:00 PM.",
        orgKey: ALABANZA_SAB,
      },
      {
        id: "alabanza-domingos",
        name: "Grupo de Alabanza — Domingos",
        desc: "Hermanos que sirven al Señor con música y canto en el culto dominical de los domingos a las 6:00 PM.",
        orgKey: ALABANZA_DOM,
      },
    ],
  },
  {
    id: "audio",
    name: "Equipo de Audio",
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
    id: "musica",
    name: "Ministro de Música",
    desc: "Dirección musical de la iglesia, formación del coro y acompañamiento instrumental en los cultos.",
    icon: "🎼",
    orgKey: MUSICA,
    subgroups: [
      {
        id: "coro",
        name: "Coro Iglesia Canto de Libertad",
        desc: "El coro principal de la congregación que ministra en cultos especiales y celebraciones.",
        orgKey: CORO,
      },
      {
        id: "coro-infantil",
        name: "Coro Infantil Joyas de Cristo",
        desc: "Niños y jóvenes que alaban al Señor con sus voces. Dirigido por el Ministro de Música.",
        orgKey: CORO_INFANTIL,
      },
    ],
  },
  {
    id: "seminarista-musica",
    name: "Seminarista de Música",
    desc: "Hermana en formación musical dentro del área de Música: apoya la dirección del ministerio, acompaña al Coro Infantil Joyas de Cristo y sirve en la alabanza de la iglesia.",
    icon: "📖",
    orgKey: SEMINARIO_MUSICA,
  },
];

// Total de integrantes de un ministerio (suma los subgrupos sin duplicar personas).
export function getMinistryMembersCount(ministry: Ministry): number {
  if (ministry.subgroups?.length) {
    const ids = new Set<string>();
    if (ministry.orgKey) {
      for (const person of getPeopleByOrg(ministry.orgKey)) ids.add(person.id);
    }
    for (const sub of ministry.subgroups) {
      for (const person of getPeopleByOrg(sub.orgKey)) ids.add(person.id);
    }
    return ids.size;
  }
  return getPeopleByOrg(ministry.orgKey).length;
}

// Agrupación visual de los ministerios en la sección pública.
// Cada grupo muestra un título propio; los ministerios se listan por su `id`.
export type MinistryGroup = {
  id: string;
  heading: string;
  ministryIds: string[];
};

export const MINISTRY_GROUPS: MinistryGroup[] = [
  {
    id: "musica",
    heading: "Música",
    ministryIds: ["musica", "seminarista-musica", "grupo-alabanza"],
  },
  {
    id: "logistica",
    heading: "Logística",
    ministryIds: ["audio", "guardatemplo"],
  },
];

// Encabezado del grupo al que pertenece un ministerio (ej. "Música", "Logística").
export function getMinistryGroupHeading(ministryId: string): string | undefined {
  return MINISTRY_GROUPS.find((g) => g.ministryIds.includes(ministryId))?.heading;
}

// ─── HORARIOS ─────────────────────────────────────────────────────────────────
// `short` es el nombre corto para la banda "Cada semana" de la agenda, donde
// cada culto ocupa una columna angosta. Si falta, se usa `label`.
export const SCHEDULE = [
  { day: "Miércoles", time: "7:00 PM", label: "Noche de Oración", short: "Oración" },
  { day: "Sábado", time: "6:00 PM", label: "Culto Ordinario", short: "Culto Ordinario" },
  { day: "Sábado", time: "7:30 PM", label: "Reunión Juvenil", short: "Juvenil" },
  {
    day: "Domingo",
    time: "10:00 AM",
    label: "Escuela de Formación Cristiana",
    short: "Escuela de Formación",
  },
  { day: "Domingo", time: "6:00 PM", label: "Culto Dominical", short: "Culto Dominical" },
];

// Ensayos de los coros (se muestran junto a los horarios de culto en Contacto).
export const CHOIR_REHEARSALS = [
  {
    choir: "Coro Iglesia Canto de Libertad",
    times: [
      { day: "Viernes", time: "7:00 PM" },
      { day: "Sábado", time: "7:40 PM" },
    ],
  },
  {
    choir: "Coro Infantil Joyas de Cristo",
    times: [{ day: "Sábado", time: "10:30 AM" }],
  },
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
    id: "dia-del-pastor-2026",
    title: "Día del Pastor",
    date: "2026-08-29",
    time: "18:00",
    location: "Divino Redentor",
    description:
      "Celebramos el Día del Pastor, agradeciendo a nuestro pastor Santiago Chay por cuidar y enseñar a la iglesia.",
    category: "especial",
    featured: true,
  },
  {
    id: "noche-mexicana-2026",
    title: "Noche Mexicana",
    date: "2026-09-15",
    location: "Divino Redentor",
    description:
      "Celebración de la Noche Mexicana con la congregación: convivencia, música y tradición en el marco de las fiestas patrias.",
    category: "especial",
  },
  {
    id: "comunion-2026-09",
    title: "Comunión",
    date: "2026-09-27",
    location: "Divino Redentor",
    description:
      "Culto de Santa Cena, donde la congregación se reúne para participar de la mesa del Señor.",
    category: "culto",
  },
  {
    id: "reunion-consistorio-2026-09",
    title: "Reunión de Consistorio",
    date: "2026-09-28",
    location: "Divino Redentor",
    description:
      "Reunión ordinaria del Consistorio para el gobierno y cuidado pastoral de la iglesia.",
    category: "reunion",
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
