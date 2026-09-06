# Arquitectura del proyecto

Este documento explica **cómo está diseñado** el sitio de la Iglesia El Divino Redentor y **por qué**. Está pensado para alguien con conocimientos de desarrollo que llega nuevo al proyecto.

## Idea central

El sitio es una **landing institucional de una sola página**. Su diseño se apoya en una decisión fundamental:

> **El contenido está completamente separado de la presentación.**

Todo el texto, las personas, los eventos y los horarios viven en un único archivo de datos (`src/data/church.ts`). Los componentes de React solo se encargan de **cómo se ve** la información, nunca de **cuál** es. Esto permite actualizar el sitio editando datos, sin tocar el diseño.

## Principios de diseño aplicados

### 1. Fuente única de verdad (Single Source of Truth)

`src/data/church.ts` concentra **todos los datos públicos**: contacto, estadísticas, historia, testimonios, personas, organizaciones, ministerios, horarios, ubicación, eventos y galería.

**Por qué importa:**

- Un dato (por ejemplo, el horario del culto dominical) existe en **un solo lugar**. No hay riesgo de que aparezca distinto en dos secciones.
- Quien actualiza el contenido no necesita saber React ni buscar entre componentes: edita un archivo.
- Reduce errores: el modelo de datos está tipado con TypeScript, así que un cambio inválido se detecta antes de compilar.

### 2. Separación de responsabilidades

Cada parte del proyecto tiene una única responsabilidad clara:

| Capa | Responsabilidad | Ubicación |
|------|----------------|-----------|
| **Datos** | Qué información se muestra | `src/data/church.ts` |
| **Rutas** | Qué secciones existen y en qué orden | `src/routes/` |
| **Componentes de sitio** | Cómo se presenta cada sección | `src/components/site/` |
| **Componentes UI** | Bloques visuales reutilizables de bajo nivel | `src/components/ui/` (shadcn) |
| **Estilos / tokens** | Colores, tipografías y radios | `src/styles.css` |
| **Lógica de presentación** | Animaciones, conteos, intersección, navegación de modales con historial | `src/hooks/` |

Un cambio de contenido toca solo la capa de datos; un cambio visual toca solo componentes o estilos. Las capas no se mezclan.

### 3. Componentes reutilizables

Hay dos niveles de componentes:

- **`src/components/ui/`** — primitivas de [shadcn/ui](https://ui.shadcn.com) (botón, diálogo, tabs, etc.). Son genéricas y **no se modifican directamente**; se actualizan solo a través de la herramienta de shadcn.
- **`src/components/site/`** — componentes propios del sitio que **componen** las primitivas para resolver necesidades concretas (ej. `PersonCard`, `EventsSection`). Aquí es donde se construye y se ajusta la interfaz.

Patrones reutilizables transversales:

- `SectionTitle` — encabezado consistente de cada sección (eyebrow + título + subtítulo).
- `AnimatedSection` — anima la entrada de cualquier bloque al hacer scroll.
- `PersonCard` — una sola tarjeta de persona con tres variantes (featured / primary / compact), reutilizada por todas las organizaciones.
- `WeeklyRhythm` — franja azul "Nuestra semana" al inicio de Eventos. Lee `SCHEDULE` y marca el día en curso.

### 4. Bajo acoplamiento

Los componentes **no dependen entre sí**; dependen de los datos y de tipos compartidos.

- `LeadershipSection` no sabe quién es el pastor: pregunta a `church.ts` mediante helpers (`getOrgPeople`, `getDisplayName`).
- Agregar un ministerio nuevo no requiere modificar `MinistriesSection`: basta con añadir una entrada a `MINISTRIES`.

Los **helpers** de `church.ts` (`getPeopleByOrg`, `getDisplayName`, `getDisplayPosition`, `getUpcomingEvents`, `getEventStatus`, etc.) son la frontera entre los datos y la vista. Si la forma de los datos cambia, se ajusta el helper y los componentes siguen funcionando.

### 5. Mantenibilidad

- **TypeScript** tipa cada estructura (`Person`, `OrgConfig`, `Ministry`, `ChurchEvent`, `GalleryPhoto`…). Editar mal un dato produce un error de compilación, no un bug silencioso en producción.
- La estructura de carpetas es predecible: una sección = un componente en `site/`.
- Los comentarios en `church.ts` agrupan las secciones con separadores visuales, lo que facilita encontrar qué editar.

### 6. Escalabilidad

El modelo crece sin reescrituras:

- **Nuevas personas** → añadir objetos a `PEOPLE`.
- **Nuevos ministerios / organizaciones** → añadir a `MINISTRIES` / `ORGS`.
- **Nuevos eventos** → añadir a `EVENTS`; el sitio los clasifica solo en "próximos" o "pasados" según la fecha.
- **Nuevas fotos** → dejarlas en `public/gallery/` y añadir la ruta `/gallery/...` a `GALLERY_PHOTOS`.

Si en el futuro hubiera mucho contenido o muchas imágenes, el diseño permite migrar los datos a un CMS o las fotos a almacenamiento externo (ver [IMAGES-GUIDE.md](IMAGES-GUIDE.md)) sin rediseñar los componentes.

### 7. Consistencia visual

El aspecto del sitio se controla con **tokens** definidos una sola vez en `src/styles.css`:

- Paleta derivada del logo en formato OKLCH: navy (`--primary`), crema cálido (`--background`), bronce/oro (`--gold`).
- Tipografías: **Playfair Display** para títulos (`--font-display`), **Montserrat** para texto (`--font-body`).
- Radios y variantes de color expuestos como variables CSS y clases de utilidad (`text-gold`, `bg-gold`, `font-display`).

Cambiar un color de marca se hace en un solo lugar y se propaga a todo el sitio.

### 8. Accesibilidad

Decisiones presentes en el código actual:

- El documento declara su idioma (`<html lang="es">` en `__root.tsx`).
- La imagen de fondo del hero es decorativa: usa `alt=""` y `aria-hidden="true"` para que los lectores de pantalla la ignoren.
- Las imágenes con contenido (galería, logo) usan **alt text descriptivo** definido en los datos.
- Metadatos SEO/Open Graph centralizados en `__root.tsx`.

Al agregar contenido nuevo, mantener estos criterios (ver guías de contenido e imágenes).

### 9. Privacidad de las personas

El modelo `Person` incluye un mecanismo de privacidad de primera clase:

```ts
type PersonVisibility = "full" | "role-only" | "hidden";
```

- `"full"` — muestra nombre, foto y cargo.
- `"role-only"` — muestra el cargo pero **no el nombre real** (se reemplaza por "Hermano/a de la congregación").
- `"hidden"` — la persona existe en los datos pero **no se renderiza** públicamente.

Además, `publicPosition` permite mostrar un cargo alternativo (ej. "Administración" en lugar de "Tesorera") sin alterar el dato interno. Esto está implementado en los helpers `getDisplayName` y `getDisplayPosition`, de modo que **la privacidad se respeta automáticamente** en todos los componentes.

## Cómo se relacionan rutas, componentes, estilos y datos

```
                    src/data/church.ts
              (datos + tipos + helpers)
                          │
                          │  importa datos y helpers
                          ▼
   src/routes/index.tsx  ──compone──▶  src/components/site/*
   (orden de secciones)                (presentación de cada sección)
                          │                      │
                          │                      │ usan primitivas
                          │                      ▼
                          │              src/components/ui/* (shadcn)
                          │                      │
                          ▼                      ▼
                    src/styles.css (tokens de color, tipografía, radios)
                          ▲
                          │ shell HTML, <head>, fuentes, manejo de errores
                    src/routes/__root.tsx
```

**Flujo concreto, de arriba hacia abajo:**

1. `__root.tsx` define el shell HTML (SSR), el `<head>` (título, SEO, fuentes de Google) y las pantallas de error / 404.
2. `index.tsx` define el **orden de las secciones** de la página y delega cada una a su componente en `site/`.
3. Cada componente de `site/` **lee los datos** que necesita desde `church.ts` (a través de helpers) y los renderiza usando primitivas de `ui/`.
4. Todo se pinta con los **tokens** de `styles.css`, garantizando consistencia visual.

## Orden de secciones (página principal)

Definido en `src/routes/index.tsx`:

1. `#inicio` — Hero (logo, bienvenida, botón de WhatsApp, guía de navegación)
2. `#historia` — Timeline histórico
3. Estadísticas (contadores animados)
4. `#testimonios` — Testimonios de miembros
5. `#liderazgo` — Organizaciones y personas
6. `#ministerios` — Ministerios de servicio
7. `#eventos` — Franja "Nuestra semana" (ritmo semanal) + eventos especiales, próximos y pasados
8. `#galeria` — Galería con filtro por categoría
9. `#contacto` — Horarios, ensayos de coro, ubicación y redes
10. Footer

### 10. Dos tipos de tiempo, dos tratamientos visuales

La sección Eventos distingue dos clases de información que **no se mezclan**:

| | Qué responde | Dónde vive | Cómo se ve |
|---|---|---|---|
| **Recurrente** (`SCHEDULE`, `CHOIR_REHEARSALS`) | "¿Cuándo puedo venir?" | Franja `WeeklyRhythm` + tarjeta de Contacto | Franja azul (`bg-primary`) a todo lo ancho, sin marcos de tarjeta |
| **Datado** (`EVENTS`) | "¿Qué pasa pronto?" | Tarjetas de `EventsSection` | Fondo claro, tarjeta con bloque de calendario y estado |

El cambio de fondo es lo que los separa: un culto semanal no tiene fecha única, así que no puede compartir el componente `EventCard`, que se apoya en `date` para ordenar, clasificar y mostrar el estado. Por eso el ritmo semanal se resuelve con una pieza propia, deliberadamente más pequeña y de encabezado menor, para no competir con el título "Eventos especiales".

### 11. Modales apilados y botón "Atrás"

Los modales del sitio (organización, ministerio, subgrupo y perfil) se apilan, y cada capa que se abre **empuja una entrada en el historial** del navegador mediante `useHistoryModal`:

```
Ministerio  →  Subgrupo (coro / grupo de alabanza)  →  Perfil de persona
```

- El gesto "Atrás" del móvil, la tecla `Escape` y la **X** retroceden **una** capa: desde un coro se vuelve al listado de grupos, no se sale del sitio.
- Clic en el fondo oscuro = descartar todo; al cerrar varias capas de golpe, `closeLayer(fn, n)` descarta las `n` entradas del historial para que no quede desalineado.
- `useBodyScrollLock` mantiene un contador compartido, de modo que el scroll del `body` se libera solo cuando se cierra la última capa.

## Despliegue y SSR

El sitio usa **renderizado del lado del servidor (SSR)** mediante TanStack Start. El entry de servidor es `src/server.ts`, que `@cloudflare/vite-plugin` empaqueta para **Cloudflare Workers** (configurado en `wrangler.jsonc`, con `nodejs_compat`). Los detalles operativos están en [DEPLOYMENT.md](DEPLOYMENT.md).

> Nota: `vite.config.ts` usa `@lovable.dev/vite-tanstack-config`, un preset que ya incluye TanStack Start, React, Tailwind, el alias `@ → src/` y el plugin de Cloudflare. **No agregar esos plugins manualmente**: duplicarlos rompe el build.
