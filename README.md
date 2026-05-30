# Iglesia El Divino Redentor — Sitio web

Landing page institucional de la **Iglesia Nacional Presbiteriana El Divino Redentor**, ubicada en Kimbilá, Izamal, Yucatán, México.

## ¿Qué es este proyecto?

Es un sitio web de una sola página (single-page) que presenta la información pública de la iglesia: historia, estadísticas de la congregación, testimonios, liderazgo, ministerios, eventos próximos, galería fotográfica y datos de contacto.

### Objetivo del sitio

- **Informar** a visitantes y miembros sobre la iglesia, sus organizaciones y sus actividades.
- **Invitar** a conocer la congregación y asistir a los cultos.
- **Facilitar el contacto**, principalmente a través de WhatsApp.

El sitio está pensado para ser fácil de mantener: **todo el contenido vive en un solo archivo de datos** (`src/data/church.ts`), de modo que actualizar textos, eventos o liderazgo no requiere tocar el diseño ni la lógica.

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | [TanStack Start](https://tanstack.com/start) (React 19 + TanStack Router v1, con SSR) |
| Build | Vite 7 + `@lovable.dev/vite-tanstack-config` (incluye el plugin de Cloudflare) |
| Estilos | Tailwind CSS v4 + tokens CSS personalizados (`src/styles.css`) |
| Componentes UI | [shadcn/ui](https://ui.shadcn.com) (sobre primitivas Radix UI) |
| Iconos | lucide-react |
| Lenguaje | TypeScript 5 |
| Destino de despliegue | Cloudflare Workers (vía Wrangler) |
| Lint / Formato | ESLint + Prettier |

## Estructura principal

```
.
├── src/
│   ├── assets/            # Imágenes estáticas (logo, hero)
│   ├── components/
│   │   ├── ui/            # Componentes base shadcn/ui — NO modificar
│   │   └── site/          # Componentes propios del sitio
│   ├── data/
│   │   └── church.ts      # FUENTE ÚNICA DE VERDAD de todo el contenido
│   ├── hooks/             # Hooks personalizados
│   ├── lib/               # Utilidades
│   ├── routes/
│   │   ├── __root.tsx     # Layout raíz (head, SSR shell, errores)
│   │   └── index.tsx      # Página principal (compone todas las secciones)
│   ├── server.ts          # Entry SSR para Cloudflare Workers
│   └── styles.css         # Estilos globales y tokens de color
├── docs/                  # Documentación del proyecto (ver abajo)
├── wrangler.jsonc         # Configuración de Cloudflare Workers
├── vite.config.ts         # Configuración de Vite
└── CLAUDE.md              # Guía para asistentes de IA (Claude Code)
```

## Documentación

| Documento | Para qué sirve |
|-----------|----------------|
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Cómo está diseñado el proyecto y por qué |
| [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md) | Cómo editar textos, eventos, liderazgo, ministerios y horarios |
| [docs/IMAGES-GUIDE.md](docs/IMAGES-GUIDE.md) | Cómo agregar y optimizar fotos correctamente |
| [docs/WORKFLOW.md](docs/WORKFLOW.md) | Flujo de trabajo con Git (ramas, commits, pull requests) |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Cómo construir y desplegar en Cloudflare (cuando se decida) |
| [docs/CHECKLIST.md](docs/CHECKLIST.md) | Listas de verificación antes de commitear, subir o desplegar |

## Requisitos previos

- **Node.js 20 o superior** (recomendado LTS).
- npm (incluido con Node). El repositorio incluye `package-lock.json`.

## Instalación

```bash
npm install
```

## Comandos

```bash
npm run dev       # Servidor de desarrollo (http://localhost:3000 por defecto)
npm run build     # Build de producción (target: Cloudflare Workers)
npm run preview   # Previsualiza el build de producción localmente
npm run lint      # Revisa el código con ESLint
npm run format    # Formatea el código con Prettier
```

Para desarrollo del día a día basta con `npm run dev`. Antes de subir cambios, corre `npm run lint` y `npm run build` (ver [docs/WORKFLOW.md](docs/WORKFLOW.md)).

## Estado del repositorio y ramas

> [!IMPORTANT]
> Este proyecto se sube inicialmente a la rama **`develop`**.
>
> - **`develop`** es la rama de trabajo actual. Aquí se integran los cambios mientras el sitio sigue en preparación.
> - **`main`** será la versión oficial del proyecto completo, pero **todavía no lo es**. No se debe asumir que el contenido de `main` está terminado ni listo para publicar.
>
> Cuando el sitio se considere completo y aprobado, se hará un Pull Request de `develop` a `main`. Ver [docs/WORKFLOW.md](docs/WORKFLOW.md).

## Despliegue (resumen)

El proyecto está preparado para desplegarse en **Cloudflare Workers** mediante Wrangler (`npx wrangler deploy`).

> [!NOTE]
> **Este repositorio no se va a desplegar todavía.** El despliegue se hará únicamente cuando se decida de forma oficial. Los detalles completos están en [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Licencia y uso

Proyecto institucional de uso privado para la Iglesia Nacional Presbiteriana El Divino Redentor. El contenido (textos, datos de personas, fotos) es propiedad de la congregación.
