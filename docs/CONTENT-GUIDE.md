# Guía de contenido

Cómo actualizar el contenido del sitio. **Casi todo se edita en un solo archivo:** `src/data/church.ts`.

> [!IMPORTANT]
> Regla de oro: **el contenido nunca se escribe "a mano" dentro de los componentes**. Siempre se edita en `src/data/church.ts`. Si un texto que quieres cambiar no está ahí, pregunta antes de modificar un componente.

## Antes de empezar

1. Abre `src/data/church.ts`.
2. El archivo está dividido en secciones con separadores (`// ─── ESTADÍSTICAS ───`). Busca la sección que quieres editar.
3. Respeta la estructura (comas, llaves, comillas). Es TypeScript: un error de sintaxis impide compilar.
4. Al terminar, valida los cambios (ver [Qué validar](#qué-validar-después-de-modificar-contenido)).

> Los ejemplos de abajo muestran datos **que ya existen en el archivo**. No se inventan datos nuevos: solo se ilustra dónde y cómo editar.

---

## Cambiar textos descriptivos

Los textos viven dentro de cada estructura. Por ejemplo, la descripción de una organización está en `ORGS`:

```ts
{
  id: "consistorio",
  label: "Consistorio",
  description:
    "El consistorio está formado por el pastor y los ancianos. Son los llamados a gobernar, enseñar y cuidar espiritualmente la congregación.",
  // ...
}
```

Edita solo el texto entre comillas. No cambies `id`, `icon` ni los arreglos de posiciones salvo que sepas lo que haces.

El texto de bienvenida del **Hero** es la única excepción: está en `src/routes/index.tsx` (no es un dato repetible). Si necesitas cambiarlo, pídelo explícitamente.

---

## Historia

Sección `HISTORY_BLOCKS`. Son tres bloques (Inicios, Crecimiento, Hoy). Cada bloque tiene un `title` y un arreglo `content` con párrafos y, opcionalmente, testimonios destacados:

```ts
{
  id: "inicios",
  era: "Inicios",
  title: "Las primeras reuniones",
  content: [
    { type: "p", text: "Primer párrafo de la historia..." },
    { type: "p", text: "Segundo párrafo..." },
    { type: "quote", text: "La iglesia fue floreciendo.", author: "Hno. Luciano Uitzil" },
  ],
  images: [],
}
```

- `type: "p"` → párrafo normal. `type: "quote"` → testimonio resaltado (requiere `author`).
- Para agregar un párrafo o una cita, añade otro objeto al arreglo `content`, en el orden en que debe aparecer.
- `id` y `era` no se tocan (controlan el timeline).
- `images` se deja `[]` por ahora; ver [IMAGES-GUIDE.md](IMAGES-GUIDE.md) para agregar fotos.

---

## Estadísticas

Objeto `CHURCH_STATS`. Son números:

```ts
export const CHURCH_STATS = {
  totalMembers: 150,
  foundingYear: 1973, // "Años de historia" = año actual − foundingYear
  organizations: 5,
  ministries: 7,
};
```

Cambia solo los valores numéricos. Si agregas o quitas organizaciones/ministerios reales, actualiza también estos contadores para que coincidan.

> El contador **"Años de historia"** no es un número fijo: se calcula como `año actual − foundingYear`. Con `foundingYear: 1973` muestra 53 en 2026 y crece solo cada año.

---

## Testimonios

Arreglo `TESTIMONIES`. Cada testimonio tiene `name` y `text`:

```ts
{
  name: "Hno. Juan Pérez",
  text: "Aquí va el testimonio...",
}
```

**Para agregar uno**, copia un bloque completo (incluida la coma final) y edítalo:

```ts
export const TESTIMONIES = [
  // ...existentes...
  {
    name: "Hna. Nueva Hermana",
    text: "Su testimonio aquí.",
  },
];
```

> Privacidad: usa solo el testimonio y el nombre que la persona haya autorizado a publicar.

---

## Liderazgo (personas y organizaciones)

Esta es la parte más estructurada. Hay **dos** registros relacionados:

- `PEOPLE` — todas las personas.
- `ORGS` — la configuración de cada organización (cómo se ordenan y destacan los cargos).

### Editar o agregar una persona

Cada persona se ve así:

```ts
{
  id: "juan-daniel-mex-may",
  name: "Juan Daniel Mex May",
  ecclesiasticalRole: "Anciano",
  roles: [{ organization: "Consistorio", position: "Secretario" }],
}
```

| Campo | Qué es |
|-------|--------|
| `id` | Identificador único (kebab-case). No repetir. |
| `name` | Nombre que se mostrará (si la visibilidad lo permite). |
| `photo` | Ruta de la foto (opcional), ej. `/people/nombre.jpg`. Se define una vez y aparece en **todas** las tarjetas y el modal de la persona. Cómo agregarla: [IMAGES-GUIDE.md → Fotos de personas](IMAGES-GUIDE.md#fotos-de-personas-liderazgo). |
| `ecclesiasticalRole` | Rol eclesiástico (`Pastor`, `Anciano`, `Diácono`, `Miembro`). |
| `roles` | Uno o más cargos. Cada cargo indica a qué `organization` pertenece y su `position`. Puede incluir `group` y `schedule`. |

Una persona puede pertenecer a **varias** organizaciones agregando más objetos a `roles`:

```ts
roles: [
  { organization: "Ministerio de Música", position: "Ministro de Música" },
  { organization: "Coro Iglesia Canto de Libertad", position: "Directora" },
],
```

> El valor de `organization` debe coincidir **exactamente** con el `label` de una organización en `ORGS` (para liderazgo) o con el `orgKey` de un ministerio en `MINISTRIES`. Un error de texto hace que la persona no aparezca.

### Agregar a una persona a otra organización (paso a paso)

Ejemplo: el pastor ya está en el Consistorio y ahora **además** entra al Coro.

1. Busca a la persona en `PEOPLE`.
2. Agrega **un objeto más** a su arreglo `roles` (no borres el que ya tenía):

```ts
{
  id: "santiago-chay-perera",
  name: "Santiago Chay Perera",
  ecclesiasticalRole: "Pastor",
  roles: [
    { organization: CONSISTORIO, position: "Pastor Principal" },
    { organization: CORO, position: "Integrante" }, // ← única línea que se agrega
  ],
},
```

Eso es **todo**. No se toca ningún otro archivo ni se activa nada más: el sitio deriva el resto solo a partir de `roles`.

| Se hace solo | Cómo |
|---|---|
| El **punto dorado** en su tarjeta ("participa en varios ministerios") | Aparece automáticamente en cuanto `roles` tiene 2 o más entradas. |
| Aparecer también en la nueva organización (el Coro) | Los componentes filtran a las personas por `organization`. |
| El modal de la persona lista **todos** sus cargos | Se arma desde el mismo arreglo `roles`. |

> No existe ninguna bandera manual para el punto ni para "está en varias organizaciones": **todo se calcula desde `roles`**. Solo agregas la línea del cargo.

**Cuidados:**

- Usa la **constante** que ya existe para esa organización (ej. `CORO`, `AUDIO`, `CONSISTORIO`), definida al inicio de `church.ts`. Si escribes el texto a mano, debe ser idéntico al `label` de `ORGS` o al `orgKey` de `MINISTRIES`.
- Si la organización es de **liderazgo** (no un ministerio), el `position` debe existir en las `positions` de alguna sección de esa organización; de lo contrario la persona **no se mostrará** ahí (ver [Estructura de cada organización](#estructura-de-cada-organización-secciones)). Los **ministerios** muestran a todos sus integrantes sin ese requisito.
- Al terminar, corre `npm run check:data` para confirmar que el enlace quedó bien.

### Privacidad de personas (muy importante)

El campo `visibility` controla qué se muestra. Ejemplo (hipotético) de una persona que pide reserva de su nombre:

```ts
{
  id: "ejemplo-privado",
  name: "Nombre real de la persona",
  ecclesiasticalRole: "Miembro",
  roles: [{ organization: "Sociedad Femenil", position: "Tesorera" }],
  visibility: "role-only",
  publicPosition: "Administración",
}
```

| Valor de `visibility` | Resultado |
|----------------------|-----------|
| `"full"` (o sin campo) | Muestra nombre, foto y cargo. |
| `"role-only"` | Muestra el cargo, **oculta el nombre real** (aparece "Hermano/a de la congregación"). |
| `"hidden"` | La persona **no aparece** en el sitio. |

- `publicPosition` muestra un cargo alternativo (ej. "Administración" en vez de "Tesorera") sin cambiar el dato real.
- **No elimines a una persona** para ocultarla: usa `visibility: "hidden"`. Así no se pierde el dato y la privacidad queda controlada.

> Nota: actualmente todas las personas están como `"full"` (nombres visibles), porque la iglesia proporcionó y autorizó esos nombres. El mecanismo `role-only` / `hidden` sigue disponible para quien lo solicite.

### Estructura de cada organización (secciones)

El orden, los encabezados y el tamaño de las tarjetas se controlan en `ORGS`, no en la persona. Cada organización define un arreglo `sections`; cada sección tiene su propio `heading` (encabezado visible) y su forma de listar personas:

```ts
{
  id: "femenil",
  label: "Sociedad Femenil",
  description: "...",
  bibleRefs: "...",           // opcional: base bíblica bajo la descripción
  countLabel: "10 diáconos",  // opcional: reemplaza el conteo de la tarjeta
  positionOrder: ["Presidenta", "Vicepresidenta", "..."],
  sections: [
    {
      heading: "Directiva",
      layout: "people",
      heroPositions: ["Presidenta"], // tarjeta grande (líder)
      positions: ["Presidenta", "Vicepresidenta", "Secretaria", "Subsecretaria", "Tesorera"],
    },
    {
      heading: "Ministerios",
      layout: "people",
      positions: ["Educación", "Evangelismo", "Relaciones", "Recursos"],
      compact: true,                 // tarjetas compactas
    },
    { heading: "Consejero", layout: "people", positions: ["Consejero"] },
  ],
}
```

| Campo de la sección | Qué hace |
|---|---|
| `heading` | Encabezado visible (ej. "Directiva", "Ancianos", "Ministerios", "Campos", "Maestros"). |
| `layout` | `"people"` (personas por cargo), `"grouped"` (agrupadas por `group`, como los maestros de la EFC) o `"campos"` (campos con su encargado). |
| `heroPositions` | Cargos que se muestran como tarjeta grande (líder). |
| `positions` | Cargos incluidos en la sección, en orden. |
| `compact` | `true` = tarjetas compactas. |
| `groupOrder` | En `layout: "grouped"`, orden de los grupos (ej. Preescolar → Adultos). |
| `campos` | En `layout: "campos"`, lista de `{ name, orgLabel, personId, area?, members? }`. `personId` es el encargado; `members` (opcional) son ids de colaboradores extra que se muestran bajo el encargado con el encabezado "Colaboradores" (su cargo sale de su rol en `orgLabel`). |

Normalmente basta con dar a la persona un `position` que ya exista en las `positions` de alguna sección. Cambiar la estructura de secciones sí requiere cuidado (o pídelo como cambio).

---

## Ministerios

Arreglo `MINISTRIES`. Cada ministerio:

```ts
{
  id: "audio",
  name: "Equipo de Audio",
  desc: "Equipo encargado del sonido y la imagen en cada culto y actividad de la iglesia.",
  icon: "🎚",
  orgKey: "Ministerio de Audio",
}
```

- `orgKey` conecta el ministerio con las personas: debe coincidir con el `organization` que esas personas tengan en su lista `roles`.
- `icon` es un emoji (el ícono que se dibuja en pantalla se elige por `id` en `section-icons.tsx`).

Para **agregar miembros** a un ministerio, no se editan aquí: se agregan en `PEOPLE` con un `role` cuyo `organization` sea igual al `orgKey`.

### Ministerios con subgrupos

Un ministerio puede tener varios grupos dentro. Se declaran en `subgroups`, y cada uno tiene su propio `orgKey`:

```ts
{
  id: "grupo-alabanza",
  name: "Grupo de Alabanza",
  desc: "Hermanos que sirven al Señor con música y canto en los cultos...",
  icon: "🎵",
  orgKey: "",                       // vacío = el ministerio no tiene miembros propios
  subgroups: [
    { id: "alabanza-sabados",  name: "Grupo de Alabanza — Sábados",  desc: "...", orgKey: "Alabanza Sábados" },
    { id: "alabanza-domingos", name: "Grupo de Alabanza — Domingos", desc: "...", orgKey: "Alabanza Domingos" },
  ],
}
```

Al pulsar el ministerio, el modal muestra primero la lista de grupos; al elegir uno, sus integrantes. Hoy tienen subgrupos **Ministro de Música** (Coro Canto de Libertad y Coro Infantil Joyas de Cristo) y **Grupo de Alabanza** (sábados y domingos).

El conteo que aparece en la tarjeta lo calcula `getMinistryMembersCount()`: suma los subgrupos **sin duplicar** a quien sirve en más de uno.

### Agrupación en pantalla: `MINISTRY_GROUPS`

Los ministerios se muestran agrupados bajo encabezados. Esa agrupación es **solo visual** y se define aparte:

```ts
export const MINISTRY_GROUPS = [
  { id: "musica",    heading: "Música",    ministryIds: ["musica", "seminarista-musica", "grupo-alabanza"] },
  { id: "logistica", heading: "Logística", ministryIds: ["audio", "guardatemplo"] },
];
```

- `heading` es el título visible del grupo. También es la etiqueta dorada que aparece dentro del modal (por eso ahí dice "Música" o "Logística", **no** "Ministerio").
- `ministryIds` lista los `id` de `MINISTRIES` que caen en ese grupo, en orden.
- Un ministerio que no esté en ningún grupo **no se muestra**. Al agregar uno nuevo, recuerda incluir su `id` aquí.

---

## Eventos

Arreglo `EVENTS`. El sitio decide automáticamente si un evento es "próximo" o "pasado" según su fecha; no hay que marcarlo a mano.

```ts
{
  id: "ebv-2026",
  title: "Escuela Bíblica de Vacaciones",
  date: "2026-07-07",
  time: "09:00",
  endTime: "12:00",
  location: "Templo El Divino Redentor",
  description: "Una semana de aprendizaje, juegos y enseñanza bíblica...",
  category: "formacion",
  featured: true,
}
```

| Campo | Notas |
|-------|-------|
| `date` | **Formato obligatorio `AAAA-MM-DD`**. Es lo que usa el sitio para ordenar y clasificar. |
| `time` / `endTime` | Opcionales, formato 24h `HH:MM`. |
| `location` | Opcional. |
| `category` | Una de: `culto`, `reunion`, `juvenil`, `femenil`, `formacion`, `especial`, `aniversario`. |
| `featured` | Opcional. `true` lo resalta. |

**Para agregar un evento**, copia un bloque completo, dale un `id` único y ajusta los campos. Los eventos cuya fecha ya pasó se mueven solos a "pasados".

---

## Horarios de culto

Arreglo `SCHEDULE`. Cada renglón es un culto semanal:

```ts
export const SCHEDULE = [
  { day: "Miércoles", time: "7:00 PM", label: "Noche de Oración", short: "Oración" },
  { day: "Sábado", time: "6:00 PM", label: "Culto Ordinario", short: "Culto Ordinario" },
  // ...
];
```

| Campo | Qué hace |
|---|---|
| `day` | Día escrito completo y con acento (`Miércoles`, `Sábado`, `Domingo`). **Debe escribirse así**: con ese texto el sitio detecta si el culto es hoy. |
| `time` | Hora tal como se muestra (ej. `7:00 PM`). |
| `label` | Nombre completo del culto. Es el que aparece en Contacto. |
| `short` | Opcional. Nombre corto para la franja "Nuestra semana", donde cada culto ocupa una columna angosta. Si falta, se usa `label`. |

**Dónde aparecen estos horarios (en dos lugares, con el mismo dato):**

1. **Franja "Nuestra semana"** — banda azul al inicio de la sección Eventos. Muestra los cultos en columnas, para verlos de un vistazo.
2. **Contacto** — la tarjeta "Horarios de culto", agrupada por día y con el detalle completo.

En ambos, el **día en curso se marca solo** en dorado con la etiqueta "Hoy". Se calcula en el navegador del visitante y marca el día completo (no la hora): el sábado se marcan a la vez el Culto Ordinario y la Reunión Juvenil. No hay nada que actualizar a mano.

Para agregar un culto, añade un objeto con el mismo formato. Ten en cuenta que la franja está pensada para **cinco columnas**: si agregas muchos más, conviene revisar cómo se ve.

---

## Ensayos de coro

Arreglo `CHOIR_REHEARSALS`. Cada coro puede tener varios ensayos:

```ts
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
```

Aparecen **solo en Contacto**, bajo los horarios de culto, como etiquetas con día y hora. No se muestran en la franja "Nuestra semana" a propósito: esa franja responde "¿cuándo puedo visitar la iglesia?" y los ensayos son información para quien ya sirve en el coro. Desde la franja se llega a ellos con el enlace "Ensayos de coro y ubicación →".

---

## Contacto (WhatsApp, Facebook, Instagram) y ubicación

Al inicio del archivo:

```ts
export const WHATSAPP_URL = "https://wa.me/5219881053003";
export const FACEBOOK_URL = "https://www.facebook.com/eldivinoredentorkimbila";
export const INSTAGRAM_URL = "https://www.instagram.com/el_divino_redentor_kimbila";

export const LOCATION = {
  name: "Iglesia Nacional Presbiteriana El Divino Redentor",
  address: "Kimbilá, Izamal, Yucatán, México",
  mapsUrl: "https://maps.app.goo.gl/qw8LZamk9oTwChQ89",
};
```

- **WhatsApp**: formato `https://wa.me/` + código de país + número, sin espacios ni signos (`52` = México; el `1` después del `52` es el prefijo de celular). Aparece como botón en el Hero, la barra de navegación, Contacto y el pie de página.
- **Facebook**: URL de la página oficial. Aparece como botón en Contacto y en el pie de página.
- **Instagram**: URL del perfil oficial. Aparece junto a Facebook, en Contacto y en el pie de página. Usa siempre la dirección limpia del perfil (`instagram.com/usuario`): los enlaces que copia el botón "Compartir" traen parámetros de rastreo (`utm_source`, `stkn`) que no sirven aquí y pueden caducar.
- **Mapa**: pega el enlace corto de Google Maps de la iglesia en `mapsUrl`.

---

## Galería

Arreglo `GALLERY_PHOTOS`. Las fotos se guardan en `public/gallery/` y se enlazan con la ruta `/gallery/nombre-archivo`:

```ts
{
  id: "g1",
  src: "/gallery/culto-dominical-2025.jpg",
  alt: "Congregación reunida en oración durante el culto",
  category: "culto",
  year: 2025,
},
```

| Campo | Notas |
|-------|-------|
| `src` | Ruta pública `/gallery/...` (el archivo vive en `public/gallery/`). Vacío `""` = placeholder visual. |
| `alt` | Descripción de la foto (importante para accesibilidad). |
| `category` | Una de: `culto`, `celebracion`, `comunidad`, `jovenes`, `ninos`. |
| `year` | Opcional. |

El **cómo** agregar imágenes (dónde guardarlas, formatos, tamaños) está en [IMAGES-GUIDE.md](IMAGES-GUIDE.md).

---

## Qué validar después de modificar contenido

Después de cualquier cambio en `church.ts`:

1. **Revisa la sintaxis**: comas entre objetos, llaves cerradas, comillas balanceadas.
2. **Corre el sitio en local** y revisa visualmente la sección afectada:
   ```bash
   npm run dev
   ```
3. **Verifica los enlaces automáticamente** con el validador de datos:
   ```bash
   npm run check:data
   ```
   Revisa que cada `roles[].organization` coincida con `ORGS[].label` / `MINISTRIES[].orgKey`, que los `personId` de los campos existan y no estén ocultos, y avisa si una persona no se mostrará porque su cargo no está en ninguna sección. Un `✖` (error) hay que corregirlo; un `⚠` (aviso) conviene revisarlo.
   - Lo que el validador **no** juzga: confirma tú mismo que ninguna persona privada (`role-only` / `hidden`) muestre el nombre por error.
4. **Corre lint y build** antes de subir:
   ```bash
   npm run lint
   npm run build
   ```
5. Si cambiaste estadísticas, confirma que los números coincidan con la realidad (organizaciones, ministerios, miembros).

Si algo no compila, el mensaje de TypeScript suele señalar la línea exacta del problema.
