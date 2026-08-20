# Despliegue (Cloudflare Workers)

Cómo se construye y se despliega el sitio. **Está preparado para Cloudflare Workers**, pero ver primero la nota de estado.

> [!IMPORTANT]
> **Este repositorio no se va a desplegar todavía.** El despliegue se hará únicamente cuando se decida de forma oficial (típicamente desde la rama `main`, ver [WORKFLOW.md](WORKFLOW.md)). Este documento describe el proceso para cuando llegue ese momento.

## Cómo está configurado

- El sitio usa **SSR** con TanStack Start. El entry de servidor es `src/server.ts`.
- `@cloudflare/vite-plugin` (incluido en el preset de Vite) empaqueta ese entry para **Cloudflare Workers**.
- La configuración del Worker está en `wrangler.jsonc`:
  - `name`: nombre del Worker.
  - `compatibility_date` y `compatibility_flags: ["nodejs_compat"]`: necesarios para que el runtime de Node funcione en Workers.
  - `main: "src/server.ts"`.

## Comandos principales

```bash
npm install         # Instalar dependencias
npm run dev         # Desarrollo local
npm run lint        # Revisar el código
npm run build       # Build de producción (genera el bundle del Worker)
npx wrangler deploy # Desplegar a Cloudflare (solo cuando se decida)
```

> La primera vez que uses Wrangler necesitarás autenticarte con tu cuenta de Cloudflare:
> ```bash
> npx wrangler login
> ```
> (En esta sesión de terminal puedes escribir `! npx wrangler login` para ejecutarlo tú directamente.)

## Qué revisar antes de desplegar

1. `npm run lint` y `npm run build` pasan sin errores.
2. El contenido en `src/data/church.ts` está actualizado y revisado (incluida la **privacidad** de personas).
3. El número de **WhatsApp** y el enlace de **Google Maps** son los reales (no los placeholders).
4. No hay secretos ni archivos `.env` versionados por error.
5. El `name` del Worker en `wrangler.jsonc` es el correcto para el entorno de destino.
6. Probaste el build localmente:
   ```bash
   npm run build
   npm run preview
   ```

(Lista completa en [CHECKLIST.md](CHECKLIST.md).)

## Consideraciones de Cloudflare Workers

- **Runtime, no Node completo**: Workers corre en un runtime tipo V8, no en Node estándar. Por eso se usa `nodejs_compat`. Evita depender de APIs de Node que no estén soportadas.
- **SSR en el edge**: el sitio se renderiza en los servidores de Cloudflare. Mantener las respuestas ligeras y las imágenes optimizadas (ver [IMAGES-GUIDE.md](IMAGES-GUIDE.md)) mejora el rendimiento.
- **Variables de entorno y secretos**: no se ponen en el código. En local van en `.dev.vars` (ignorado por Git); en producción se configuran con `npx wrangler secret put <NOMBRE>` o en el panel de Cloudflare.
- **Logs**: tras desplegar puedes ver la actividad con `npx wrangler tail`.

## Cuando se agregue un dominio

1. En el panel de Cloudflare, agrega el dominio (o usa uno ya gestionado por Cloudflare).
2. Asocia el Worker al dominio mediante una **ruta personalizada (Custom Domain / Route)** en la configuración del Worker.
3. Verifica que el DNS apunte a Cloudflare (los registros se gestionan desde el mismo panel).
4. Prueba el dominio una vez propagado.

## Si el SSL tarda en activarse

Es normal que el certificado SSL/TLS tarde un poco tras agregar un dominio:

- La emisión del certificado puede tardar desde **unos minutos hasta ~24 horas**.
- Verifica que el modo SSL/TLS en Cloudflare esté en **"Full"** (o "Full (strict)" si el origen tiene certificado válido).
- Confirma que el DNS esté correctamente propagado y con el proxy de Cloudflare activado (nube naranja).
- Si tras 24 horas sigue sin activarse, revisa el estado del certificado en **SSL/TLS → Edge Certificates** del panel.
- Mientras tanto, accede por la URL `*.workers.dev` que Cloudflare asigna al Worker para verificar que la app funciona.

## Recordatorio final

Mientras no se decida oficialmente publicar, **no ejecutes `npx wrangler deploy`** desde este repositorio. Primero se completa el sitio, se valida y se fusiona a `main` (ver [WORKFLOW.md](WORKFLOW.md)).
