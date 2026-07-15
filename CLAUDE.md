# CLAUDE.md — divine-redentor-hub

## Descripción del proyecto

Landing page institucional de la **Iglesia Nacional Presbiteriana El Divino Redentor**, ubicada en Kimbilá, Izamal, Yucatán, México. El sitio muestra información pública de la iglesia: historia, estadísticas, liderazgo, ministerios, eventos y galería fotográfica.

## Stack tecnológico

- **Framework**: TanStack Start (React 19 + TanStack Router v1)
- **Build**: Vite 7 + `@cloudflare/vite-plugin` (target: Cloudflare Workers)
- **Estilos**: Tailwind CSS v4
- **Componentes UI**: shadcn/ui (Radix UI primitives)
- **Lenguaje**: TypeScript 5
- **Linting/Formato**: ESLint + Prettier

## Estructura del proyecto

```
src/
├── assets/              # Imágenes estáticas (logo-edr.png)
├── components/
│   ├── ui/              # Componentes shadcn/ui (no modificar directamente)
│   └── site/            # Componentes propios del sitio
├── data/
│   └── church.ts        # FUENTE ÚNICA DE VERDAD de todos los datos
├── hooks/               # Hooks personalizados
├── lib/                 # Utilidades
├── routes/
│   ├── __root.tsx       # Layout raíz
│   └── index.tsx        # Página principal (landing de una sola página)
└── styles.css           # Estilos globales y tokens CSS
```

## Fuente de datos: `src/data/church.ts`

Todos los datos de la iglesia viven aquí. Para actualizar cualquier información del sitio, editar solo este archivo.

### Exports principales

| Export | Tipo | Descripción |
|--------|------|-------------|
| `PEOPLE` | `Person[]` | Todos los miembros con roles |
| `ORGS` | `OrgConfig[]` | Organizaciones (Consistorio, Diaconado, EFC, Femenil, Juvenil) |
| `MINISTRIES` | `Ministry[]` | Ministerios de servicio |
| `EVENTS` | `ChurchEvent[]` | Eventos con fecha, hora y categoría |
| `SCHEDULE` | array | Horarios semanales de culto |
| `LOCATION` | object | Nombre, dirección y link a Google Maps |
| `GALLERY_PHOTOS` | `GalleryPhoto[]` | Fotos de galería (archivos en `public/gallery/`, ruta `/gallery/...`; src vacío = placeholder) |
| `HISTORY_BLOCKS` | `HistoryBlock[]` | Bloques de historia; cada uno con `content: (párrafo \| cita)[]` |
| `TESTIMONIES` | array | Testimonios de miembros |
| `CHURCH_STATS` | object | Estadísticas: miembros, año de fundación, etc. |
| `WHATSAPP_URL` | string | URL de contacto de WhatsApp |
| `FACEBOOK_URL` | string | URL de la página oficial de Facebook |

### Modelo `Person` y visibilidad

```ts
type PersonVisibility = "full" | "role-only" | "hidden";
// "full"      → muestra nombre, foto y cargo
// "role-only" → muestra cargo pero no el nombre real (privacidad)
// "hidden"    → existe en datos pero no se renderiza públicamente
```

`publicPosition` permite mostrar un cargo alternativo (ej. "Administración" en lugar de "Tesorera") sin cambiar el dato real.

### Modelo `OrgConfig` y secciones

Cada organización en `ORGS` define un arreglo `sections`; cada sección tiene su `heading` (encabezado visible, distinto por organización) y un `layout`:

- `"people"` — personas por cargo (`positions`); `heroPositions` = tarjeta grande; `compact` = tarjeta compacta.
- `"grouped"` — agrupadas por `group` (maestros de la EFC), con `groupOrder`.
- `"campos"` — campos/misiones con su encargado (`campos: { name, orgLabel, personId, area? }[]`).

Opcionales de `OrgConfig`: `bibleRefs` (base bíblica bajo la descripción) y `countLabel` (reemplaza el conteo de la tarjeta, ej. Diaconado "10 diáconos"). Detalle en `docs/CONTENT-GUIDE.md`.

## Componentes del sitio (`src/components/site/`)

| Componente | Sección | Descripción |
|-----------|---------|-------------|
| `Navbar` | — | Barra de navegación sticky con scroll spy |
| `AnimatedSection` | — | Wrapper con animación de entrada por intersección |
| `SectionTitle` | — | Encabezado de sección (eyebrow + title + subtitle) |
| `NavigationGuide` | Hero | Guía visual de navegación de secciones |
| `HistoryTimeline` | Historia | Timeline de 3 eras de la iglesia |
| `StatsSection` | Stats | Contador animado de estadísticas |
| `LeadershipSection` | Liderazgo | Panel de organizaciones con `OrgDetailPanel` y `PersonCard` |
| `OrgDetailPanel` | Liderazgo | Detalle de una organización con tarjetas de personas |
| `PersonCard` | Liderazgo | Tarjeta de persona (featured/primary/compact) |
| `ProfileModal` | Liderazgo | Modal con detalle de una persona |
| `MinistriesSection` | Ministerios | Grid de ministerios con `MinistryModal` |
| `MinistryModal` | Ministerios | Modal con miembros de un ministerio |
| `EventsSection` | Eventos | Eventos próximos y pasados con filtros |
| `GallerySection` | Galería | Galería con filtro por categoría |

## Hooks personalizados

- `use-intersection.ts` — detecta cuando un elemento entra al viewport (IntersectionObserver)
- `use-count-up.ts` — animación de conteo numérico para `StatsSection`
- `use-history-modal.ts` — integra los modales con el historial: el botón "Atrás" (o el gesto de retroceso en móvil) cierra el modal superior en vez de salir de la página. Lo usan `LeadershipSection` y `MinistriesSection`.
- `use-body-scroll-lock.ts` — bloqueo de scroll del `body` con contador compartido, para modales apilados (organización/ministerio + perfil).

## Estructura de la página (`routes/index.tsx`)

Single-page con secciones en este orden, navegables por anchor:

1. `#inicio` — Hero con logo, bienvenida y botón de WhatsApp
2. `#historia` — Timeline histórico
3. (Stats) — Estadísticas de la congregación
4. `#testimonios` — Testimonios de miembros
5. `#liderazgo` — Organizaciones y liderazgo
6. `#ministerios` — Ministerios de servicio
7. `#eventos` — Próximos eventos
8. `#galeria` — Galería fotográfica
9. `#contacto` — Horarios, ubicación y WhatsApp
10. Footer con navegación

## Convenciones de desarrollo

- Todo dato de la iglesia va en `src/data/church.ts`, nunca hardcodeado en componentes.
- Los componentes `ui/` son de shadcn y no se modifican directamente; extender en `site/`.
- Estilos con clases Tailwind; tokens personalizados definidos en `styles.css` (ej. `gradient-navy`, `text-gold`).
- No hay rutas adicionales actualmente; el sitio es una sola página.
- Las fotos de galería viven en `public/gallery/` y se enlazan con la ruta `/gallery/archivo` en `GALLERY_PHOTOS` (no se importan). El logo y el hero sí van en `src/assets/` con `import`.

## Comandos

```bash
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción (Cloudflare)
npm run preview   # Preview del build
npm run lint      # ESLint
npm run format    # Prettier
```

## Información de la iglesia

- **Nombre oficial**: Iglesia Nacional Presbiteriana El Divino Redentor
- **Denominación**: Iglesia Nacional Presbiteriana de México A.R.
- **Ubicación**: Kimbilá, Izamal, Yucatán, México
- **Años de historia**: 53 (se calcula en la web desde `foundingYear: 1973`, origen de la congregación)
- **Miembros aprox.**: 150
- **Campos**: San Francisco Tzon y Sitilpech (bajo cuidado de ancianos encargados)
- **Pastor**: Santiago Chay Perera
- **Contacto**: WhatsApp +52 1 988 105 3003 · Facebook /eldivinoredentorkimbila
- **Cultos**: Viernes 6pm (oración), Sábado 6pm (ordinario), Sábado 7:30pm (juvenil), Domingo 10am (EFC), Domingo 7pm (dominical)
## Reglas para rediseño UI/UX

Cuando se pidan cambios visuales o de experiencia de usuario:

1. No modificar código de inmediato.
2. Primero hacer diagnóstico del diseño actual.
3. Preguntar antes de decisiones visuales importantes.
4. Proponer máximo 2 o 3 direcciones visuales.
5. Explicar ventajas y desventajas de cada dirección.
6. Esperar aprobación antes de aplicar cambios grandes.
7. Mantener la lógica de negocio existente.
8. No hardcodear datos fuera de `src/data/church.ts`.
9. No modificar componentes base de `src/components/ui`.
10. Crear o adaptar componentes en `src/components/site`.
11. Antes de terminar, correr `npm run lint` y `npm run build` si es posible.

## Preguntas obligatorias antes de rediseñar

Claude debe preguntar:

- ¿Qué sensación debe transmitir el sitio?
- ¿Debe verse más moderno, más tradicional o equilibrado?
- ¿Qué público principal visitará la página?
- ¿La prioridad es informar, invitar a visitar la iglesia o contactar por WhatsApp?
- ¿Se tienen fotos reales de la iglesia o se usarán placeholders?
- ¿Qué tan visible debe ser el botón de WhatsApp?
- ¿Qué secciones son más importantes?
- ¿Qué colores o estilos se deben evitar?

## Documentación del proyecto

Antes de trabajar, considerar la documentación en `docs/`:

| Documento | Contenido |
|-----------|-----------|
| `README.md` | Visión general, comandos, estado de ramas |
| `docs/ARCHITECTURE.md` | Principios de diseño y relación entre capas |
| `docs/CONTENT-GUIDE.md` | Cómo editar el contenido en `church.ts` |
| `docs/IMAGES-GUIDE.md` | Cómo agregar y optimizar fotos |
| `docs/WORKFLOW.md` | Flujo de Git (ramas, commits, PRs) |
| `docs/DEPLOYMENT.md` | Despliegue en Cloudflare Workers |
| `docs/CHECKLIST.md` | Listas de verificación |

## Reglas técnicas (resumen operativo)

- **Datos**: todo el contenido público va en `src/data/church.ts`. Nunca hardcodear datos en componentes.
- **No agregar librerías nuevas** sin autorización explícita.
- **No borrar componentes** existentes.
- **No modificar** `vite.config.ts`, `wrangler.jsonc`, `tsconfig.json` ni la configuración de Cloudflare sin pedirlo.
- `vite.config.ts` usa `@lovable.dev/vite-tanstack-config`: **no** agregar manualmente TanStack Start, React, Tailwind, el alias `@` ni el plugin de Cloudflare (duplicarlos rompe el build).
- **No hacer deploy** (`wrangler deploy`) salvo decisión explícita. Ver `docs/DEPLOYMENT.md`.
- Antes de terminar cualquier cambio de código: `npm run lint` y `npm run build`.

## Archivos que NO se modifican sin autorización

| Ruta | Motivo |
|------|--------|
| `src/components/ui/**` | Componentes base de shadcn. Extender en `site/`, no editar aquí. |
| `src/data/church.ts` | Solo editar para contenido solicitado. Cambios estructurales o comentarios deben preguntarse antes. |
| `vite.config.ts`, `wrangler.jsonc`, `tsconfig.json` | Configuración de build/deploy. |
| `src/server.ts`, `src/router.tsx`, `src/start.ts`, `routeTree.gen.ts` | Infraestructura del framework (`routeTree.gen.ts` es generado). |
| Lockfiles (`package-lock.json`, `bun.lock`) | No editar a mano. |

## Privacidad (regla no negociable)

- Respetar siempre el modelo `visibility` (`full` / `role-only` / `hidden`) y `publicPosition`.
- Para ocultar a una persona, usar `visibility: "hidden"`; **nunca** borrar el registro.
- No exponer nombres de personas marcadas como `role-only`.
- No publicar fotos de personas sin consentimiento (especial cuidado con menores).

## Cómo trabajar por fases

Para tareas grandes, dividir el trabajo y confirmar entre fases:

1. **Diagnóstico** — leer los archivos relevantes y describir el estado actual. No editar todavía.
2. **Propuesta** — explicar qué se hará, qué archivos se tocan y por qué. Esperar aprobación para cambios grandes.
3. **Implementación** — aplicar el cambio mínimo necesario, respetando las reglas técnicas y de privacidad.
4. **Validación** — `npm run lint` y `npm run build`; revisar la sección afectada.
5. **Cierre** — resumir lo hecho. No commitear ni desplegar salvo que se pida.

## Cómo pedir cambios futuros (para quien usa Claude Code)

Para obtener buenos resultados, al pedir un cambio incluir:

- **Qué** se quiere cambiar y **en qué sección** (ej. "el horario del culto juvenil").
- Si es **contenido** (entonces va en `church.ts`) o **diseño** (entonces aplica el flujo de rediseño UI/UX de arriba).
- Si es un cambio **grande**, pedir primero un diagnóstico y una propuesta antes de editar.
- Indicar la **rama** de trabajo (por defecto `develop`).