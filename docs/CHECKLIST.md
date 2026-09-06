# Checklists

Listas de verificación rápidas. Úsalas antes de cada acción importante.

## ✅ Antes de hacer commit

- [ ] El cambio tiene un solo propósito claro.
- [ ] El contenido nuevo está en `src/data/church.ts`, no hardcodeado en componentes.
- [ ] No se modificó nada en `src/components/ui/` (componentes base shadcn).
- [ ] `npm run lint` pasa sin errores.
- [ ] `npm run build` compila sin errores.
- [ ] `git status` no muestra archivos que no deban versionarse (`.env`, `dist`, `.wrangler`…).
- [ ] El mensaje de commit es claro (ver [WORKFLOW.md](WORKFLOW.md)).

## ✅ Antes de subir a GitHub

- [ ] Estás en la rama que corresponde al cambio (`develop` o una `feat/*`; `main` solo para lo aprobado).
- [ ] Revisaste el diff (`git diff`, `git diff --staged`).
- [ ] No hay secretos, números privados ni datos reales que no deban publicarse.
- [ ] La privacidad de las personas está respetada (`role-only` / `hidden` donde corresponde).
- [ ] Lint y build pasan.

## ✅ Antes de modificar datos públicos (`church.ts`)

- [ ] Sé en qué sección del archivo voy a editar (estadísticas, eventos, liderazgo…).
- [ ] Respeto la estructura: comas, llaves y comillas balanceadas.
- [ ] Los valores de `organization` coinciden con el `label` en `ORGS` o el `orgKey` en `MINISTRIES`.
- [ ] Las fechas de eventos usan el formato `AAAA-MM-DD`.
- [ ] Las personas que no autorizaron su nombre usan `visibility: "role-only"` o `"hidden"`.
- [ ] Tras editar, revisé la sección en `npm run dev`.

## ✅ Antes de agregar fotos

- [ ] La imagen está optimizada (WebP o JPG comprimido, < ~300 KB).
- [ ] El ancho es razonable (≤ 1600 px para galería/hero).
- [ ] El nombre del archivo es descriptivo, en minúsculas y sin espacios ni acentos.
- [ ] La imagen está en la subcarpeta correcta de `src/assets/`.
- [ ] Tengo **consentimiento** para publicar fotos de personas (especial cuidado con menores).
- [ ] El `alt` describe la foto de forma útil.

## ✅ Antes de hacer deploy

> El despliegue **reemplaza el sitio en vivo**. Revisa esta lista cada vez.

- [ ] El cambio está revisado y aprobado.
- [ ] Estoy en `main` y con todo fusionado (ver [WORKFLOW.md](WORKFLOW.md)).
- [ ] `npm run lint` y `npm run build` pasan.
- [ ] Probé el resultado con `npm run dev` (o `npm run preview`), **en escritorio y en móvil**.
- [ ] WhatsApp, Facebook, Instagram y el enlace de Google Maps son los reales.
- [ ] La privacidad de las personas está respetada (`role-only` / `hidden`).
- [ ] Estoy autenticado en Cloudflare (`npx wrangler login`).
- [ ] Tras desplegar, abrí el sitio y revisé la sección que cambié.
- [ ] Si algo falla, sé cómo volver atrás: `npx wrangler rollback`.
