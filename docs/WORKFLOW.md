# Flujo de trabajo (Git)

Cómo trabajar de forma ordenada en este repositorio: ramas, commits, validación y publicación.

## Modelo de ramas

| Rama | Propósito | Estado |
|------|-----------|--------|
| **`main`** | Versión **oficial** del proyecto completo. | Reservada para cuando el sitio esté terminado y aprobado. **Todavía no es la versión oficial.** |
| **`develop`** | Rama de **trabajo actual**. Aquí se integra todo mientras el sitio sigue en preparación. | Activa. Es la rama a la que se sube hoy. |
| **`feature/*`** | Ramas temporales para cambios grandes o arriesgados. | Se crean desde `develop` y se fusionan de vuelta a `develop`. |

> Mientras el proyecto esté en preparación, el trabajo del día a día ocurre en **`develop`**. `main` solo recibe contenido vía Pull Request cuando se decida publicar oficialmente.

## Primera vez: inicializar y subir

Si el repositorio aún no está inicializado:

```bash
git init
git add .
git commit -m "chore: estructura inicial y documentación del proyecto"

# Crear la rama develop y subirla
git branch -M develop
git remote add origin <URL-del-repo-en-GitHub>
git push -u origin develop
```

> Verifica que `.gitignore` esté funcionando: `node_modules`, `dist`, `.wrangler` y archivos `.env` **no** deben aparecer en `git status`.

## Cuándo crear una rama feature

Para cambios pequeños (corregir un texto, agregar un evento) puedes trabajar directamente en `develop`.

Crea una rama `feature/*` cuando el cambio sea **grande o pueda romper algo**: rediseñar una sección, agregar la galería de fotos, cambiar componentes.

```bash
git switch -c feature/galeria-fotos     # parte de develop
# ...trabajas y haces commits...
git push -u origin feature/galeria-fotos
```

Nombres sugeridos: `feature/galeria-fotos`, `feature/eventos-2026`, `fix/horario-juvenil`.

## Commits claros

- Un commit = **un cambio con sentido propio**. No mezcles "agregué fotos" con "cambié el color del navbar".
- Mensaje en presente, breve y descriptivo. Convención sugerida (Conventional Commits):

| Prefijo | Para qué |
|---------|----------|
| `feat:` | Funcionalidad o contenido nuevo |
| `fix:` | Corrección |
| `docs:` | Solo documentación |
| `style:` | Formato/estilos sin cambio de lógica |
| `chore:` | Mantenimiento (configuración, limpieza) |

Ejemplos:

```
feat: agregar eventos de 2026
fix: corregir número de WhatsApp
docs: ampliar guía de contenido
content: actualizar liderazgo de la Sociedad Juvenil
```

## Validar SIEMPRE antes de subir

Antes de cada `git push`, corre:

```bash
npm run lint
npm run build
```

- `lint` detecta errores de código y formato.
- `build` confirma que el sitio compila para producción. Si el build falla, **no subas**: arregla primero.

Solo después de que ambos pasen, sube los cambios. (Lista completa en [CHECKLIST.md](CHECKLIST.md).)

## Cómo revisar cambios antes de aceptar

Antes de commitear, revisa qué vas a incluir:

```bash
git status        # qué archivos cambiaron
git diff          # qué cambió exactamente (sin --staged)
git diff --staged # qué cambió en lo que ya agregaste con git add
```

- Confirma que **no** se cuela nada que no deba versionarse (archivos de entorno, builds, secretos).
- Revisa que los cambios de contenido respeten la **privacidad de las personas** (ver [CONTENT-GUIDE.md](CONTENT-GUIDE.md)).
- Si usas Pull Requests, revisa el diff completo en GitHub antes de fusionar.

## Publicar: Pull Request de `develop` a `main`

Cuando el sitio esté completo, validado y se decida que es la **versión oficial**:

1. Asegúrate de que `develop` pasa `lint` y `build`.
2. En GitHub, abre un **Pull Request de `develop` → `main`**.
3. Revisa el diff completo (todo lo que entrará a `main`).
4. Fusiona el PR.
5. `main` queda como la versión oficial. El despliegue (si se decide) parte de ahí — ver [DEPLOYMENT.md](DEPLOYMENT.md).

> No se hace `push` directo a `main`. Todo entra por Pull Request, para que siempre haya una revisión.

## Resumen visual

```
feature/* ──(PR / merge)──▶ develop ──(PR cuando sea oficial)──▶ main
   │                           │                                   │
trabajo arriesgado       trabajo actual                  versión oficial
                         (lint + build                  (futuro deploy)
                          antes de subir)
```
