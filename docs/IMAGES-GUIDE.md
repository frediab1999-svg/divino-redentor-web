# Guía de imágenes

Cómo agregar fotos al sitio de forma correcta: dónde guardarlas, cómo nombrarlas, qué formato y tamaño usar, y cómo evitar imágenes pesadas.

## Dónde guardar las imágenes

Las imágenes estáticas viven en `src/assets/`:

```
src/assets/
├── logo-edr.png        # Logo de la iglesia
├── hero/
│   └── hero-cross.jpg  # Imagen de fondo del hero
└── gallery/            # (crear) fotos de la galería
```

- Crea subcarpetas por propósito: `gallery/`, `hero/`, `history/`, etc.
- Las imágenes en `src/assets/` se **importan** en el código y Vite las optimiza y versiona automáticamente.

## Cómo nombrar los archivos

- Usa **minúsculas, sin espacios ni acentos**, separando palabras con guiones:
  - ✅ `culto-dominical-2024.webp`
  - ✅ `aniversario-40.jpg`
  - ❌ `Foto Culto (1).JPG`
- Nombres **descriptivos**: que el nombre diga qué es la foto.
- Para la galería, ayuda incluir categoría o año: `jovenes-retiro-2024.webp`.

## Formatos recomendados

| Formato | Cuándo usarlo |
|---------|---------------|
| **WebP** | Preferido para fotos. Buen balance calidad/peso. |
| **JPG** (optimizado) | Alternativa para fotografías si no puedes generar WebP. |
| **PNG** | Solo para logos o gráficos con transparencia (como el logo actual). |
| **SVG** | Iconos y vectores (no fotos). |

> Regla simple: **fotos → WebP o JPG**; **logos/transparencias → PNG o SVG**.

## Tamaño recomendado

- **Galería / hero**: ancho máximo de **1600 px** (suele bastar 1200–1600 px). Más allá no se nota en pantalla y solo aumenta el peso.
- **Tarjetas de persona**: 400–600 px de lado es suficiente.
- **Peso objetivo por imagen**: idealmente **< 300 KB**, y nunca más de ~500 KB para fotos de galería.

## Cómo evitar imágenes pesadas

Antes de agregar una foto:

1. **Redimensiónala** al ancho recomendado (no subas fotos de 4000 px de la cámara).
2. **Conviértela a WebP** o comprime el JPG. Herramientas gratuitas:
   - [Squoosh](https://squoosh.app) (en el navegador, sin instalar nada).
   - `cwebp` (línea de comandos) si prefieres automatizar.
3. **Verifica el peso** del archivo final antes de incluirlo.

Imágenes ligeras = sitio más rápido, mejor experiencia y menor costo de ancho de banda.

## Agregar fotos a la galería

1. Guarda las imágenes optimizadas en `src/assets/gallery/`.
2. Abre `src/data/church.ts` y busca `GALLERY_PHOTOS`.
3. Reemplaza el `src: ""` (placeholder) por la **ruta importada con el alias `@`**:

```ts
{ id: "g1", src: "/src/assets/gallery/culto-dominical-2024.webp", alt: "Culto dominical", category: "culto", year: 2024 },
```

> [!NOTE]
> La forma exacta de referenciar la imagen (import directo vs. ruta) depende de cómo esté implementado `GallerySection`. La práctica más segura, consistente con el hero y el logo, es **importar la imagen al inicio de un archivo** y pasar la variable. Si al agregar una ruta la imagen no aparece, revisa cómo se importan `logo-edr.png` y `hero-cross.jpg` en `src/routes/index.tsx` y sigue el mismo patrón, o pídelo como cambio puntual.

Mientras un elemento de la galería tenga `src: ""`, el sitio muestra un **placeholder visual** en su lugar (comportamiento intencional).

## Agregar / cambiar la imagen del hero

La imagen de fondo del hero se importa en `src/routes/index.tsx`:

```ts
import heroCross from "@/assets/hero/hero-cross.jpg";
```

Para cambiarla:

1. Coloca la nueva imagen en `src/assets/hero/`.
2. Cambia la ruta del `import`.

> La imagen del hero es **decorativa**: usa `alt=""` y `aria-hidden="true"`. No le pongas alt descriptivo (sería redundante para lectores de pantalla). No cambies ese comportamiento sin motivo.

## Alt text: cómo escribirlo bien

El **alt text** describe la imagen para personas que usan lectores de pantalla y para buscadores.

- **Imágenes con contenido** (galería, fotos de personas): describe lo esencial, breve y concreto.
  - ✅ `alt="Coro infantil cantando en el culto dominical"`
  - ❌ `alt="imagen1"` / `alt="foto"`
- **Imágenes decorativas** (fondos): usa `alt=""` para que se ignoren.
- No empieces con "Imagen de…": el lector de pantalla ya anuncia que es una imagen.

En la galería, el alt se edita en el campo `alt` de cada objeto de `GALLERY_PHOTOS`.

## Privacidad al subir fotos de personas

> [!IMPORTANT]
> Las fotos de personas son datos sensibles. Antes de publicar:

- **Pide consentimiento** a la persona (o a sus padres/tutores si son menores) antes de mostrar su rostro en un sitio público.
- Para **menores de edad**, sé especialmente cuidadoso: preferir fotos grupales, de espaldas o sin rostros identificables si no hay autorización explícita.
- Si una persona pidió no aparecer, usa el sistema de privacidad en los datos: `visibility: "role-only"` o `"hidden"` (ver [CONTENT-GUIDE.md](CONTENT-GUIDE.md)). **No publiques su foto.**
- No incluyas en las fotos información que exponga a las personas (direcciones, matrículas, documentos).

## Si en el futuro hay muchas fotos: Cloudflare R2

Guardar todas las imágenes dentro del repositorio funciona bien para **pocas decenas** de fotos optimizadas. Si la galería crece mucho (cientos de imágenes o videos), conviene **no** versionarlas en Git, porque infla el repositorio y ralentiza los clones.

En ese caso, la opción natural —ya que el sitio se despliega en Cloudflare— es **[Cloudflare R2](https://developers.cloudflare.com/r2/)** (almacenamiento de objetos):

- Las imágenes se suben a un bucket R2 y se sirven por URL pública o vía Cloudflare Images.
- En `GALLERY_PHOTOS`, el `src` pasaría a ser una URL absoluta en lugar de una ruta local.
- El repositorio se mantiene ligero y el contenido visual se gestiona aparte.

Esto es una recomendación a futuro: **hoy no es necesario** y no se debe implementar sin decidirlo explícitamente (implica configuración de Cloudflare).
