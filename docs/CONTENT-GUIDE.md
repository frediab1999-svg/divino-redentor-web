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

Sección `HISTORY_BLOCKS`. Son tres bloques (Inicios, Crecimiento, Hoy). Edita el `title` y el `text`:

```ts
{
  id: "inicios",
  era: "Inicios",
  title: "Las primeras reuniones",
  text: "Aquí va la descripción de los inicios de la iglesia...",
  images: [],
}
```

- `id` y `era` no se tocan (controlan el timeline).
- `images` se deja `[]` por ahora; ver [IMAGES-GUIDE.md](IMAGES-GUIDE.md) para agregar fotos.

---

## Estadísticas

Objeto `CHURCH_STATS`. Son números:

```ts
export const CHURCH_STATS = {
  totalMembers: 120,
  foundingYear: 1985,
  organizations: 5,
  ministries: 7,
};
```

Cambia solo los valores numéricos. Si agregas o quitas organizaciones/ministerios reales, actualiza también estos contadores para que coincidan.

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
  id: "anciano-secretario",
  name: "Hno. Anciano 1",
  ecclesiasticalRole: "Anciano",
  roles: [{ organization: "Consistorio", position: "Secretario" }],
}
```

| Campo | Qué es |
|-------|--------|
| `id` | Identificador único (kebab-case). No repetir. |
| `name` | Nombre que se mostrará (si la visibilidad lo permite). |
| `photo` | Ruta de la foto (opcional). Ver [IMAGES-GUIDE.md](IMAGES-GUIDE.md). |
| `ecclesiasticalRole` | Rol eclesiástico (`Pastor`, `Anciano`, `Diácono`, `Miembro`). |
| `roles` | Uno o más cargos. Cada cargo indica a qué `organization` pertenece y su `position`. Puede incluir `group` y `schedule`. |

Una persona puede pertenecer a **varias** organizaciones agregando más objetos a `roles`:

```ts
roles: [
  { organization: "Ministerio de Música", position: "Ministro de Música" },
  { organization: "Coro de la Iglesia", position: "Director" },
],
```

> El valor de `organization` debe coincidir **exactamente** con el `label` de una organización en `ORGS` (para liderazgo) o con el `orgKey` de un ministerio en `MINISTRIES`. Un error de texto hace que la persona no aparezca.

### Privacidad de personas (muy importante)

El campo `visibility` controla qué se muestra:

```ts
{
  id: "efc-tesorera",
  name: "Hna. Tesorera EFC",
  ecclesiasticalRole: "Miembro",
  roles: [{ organization: "Escuela de Formación Cristiana", position: "Administración" }],
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

### Ordenar y destacar cargos

El orden y el tamaño de las tarjetas se controla en `ORGS`, no en la persona:

- `positionOrder` — orden en que aparecen los cargos.
- `featuredPositions` — tarjeta grande (liderazgo máximo).
- `primaryPositions` — tarjeta mediana (directiva).
- El resto → tarjeta compacta.

Normalmente no necesitas tocar esto: basta con dar a la persona un `position` que ya exista en `positionOrder`.

---

## Ministerios

Arreglo `MINISTRIES`. Cada ministerio:

```ts
{
  id: "audio",
  name: "Ministerio de Audio",
  desc: "Equipo encargado del sonido y la imagen en cada culto y actividad de la iglesia.",
  icon: "🎚",
  orgKey: "Ministerio de Audio",
}
```

- `orgKey` conecta el ministerio con las personas: debe coincidir con el `organization` que esas personas tengan en su lista `roles`.
- `icon` es un emoji.

Para **agregar miembros** a un ministerio, no se editan aquí: se agregan en `PEOPLE` con un `role` cuyo `organization` sea igual al `orgKey`.

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

## Horarios

Arreglo `SCHEDULE`. Cada renglón es un culto semanal:

```ts
export const SCHEDULE = [
  { day: "Viernes", time: "6:00 PM", label: "Noche de Oración" },
  { day: "Sábado", time: "6:00 PM", label: "Culto Ordinario" },
  // ...
];
```

Edita `day`, `time` o `label`. Para agregar un culto, añade un objeto con el mismo formato.

---

## Ubicación y WhatsApp

Al inicio y cerca del final del archivo:

```ts
export const WHATSAPP_URL = "https://wa.me/525555555555";

export const LOCATION = {
  name: "Iglesia Nacional Presbiteriana El Divino Redentor",
  address: "Kimbilá, Izamal, Yucatán, México",
  mapsUrl: "https://maps.app.goo.gl/qw8LZamk9oTwChQ89",
};
```

- **WhatsApp**: el formato es `https://wa.me/` + código de país + número, sin espacios ni signos. (`52` = México). El valor actual `525555555555` es un **placeholder** que debe reemplazarse por el número real.
- **Mapa**: pega el enlace corto de Google Maps de la iglesia en `mapsUrl`.

---

## Galería

Arreglo `GALLERY_PHOTOS`. Mientras `src` esté vacío (`""`), se muestra un placeholder visual:

```ts
{ id: "g1", src: "", alt: "Culto dominical", category: "culto", year: 2024 },
```

| Campo | Notas |
|-------|-------|
| `src` | Ruta de la imagen. Vacío `""` = placeholder. |
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
3. **Verifica los enlaces** que dependen de coincidencias de texto:
   - `roles[].organization` ↔ `ORGS[].label` / `MINISTRIES[].orgKey`.
   - Que ninguna persona privada (`role-only` / `hidden`) muestre el nombre por error.
4. **Corre lint y build** antes de subir:
   ```bash
   npm run lint
   npm run build
   ```
5. Si cambiaste estadísticas, confirma que los números coincidan con la realidad (organizaciones, ministerios, miembros).

Si algo no compila, el mensaje de TypeScript suele señalar la línea exacta del problema.
