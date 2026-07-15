# Guía de imágenes

Cómo agregar fotos al sitio de forma correcta: dónde guardarlas, cómo nombrarlas, qué formato y tamaño usar, y cómo evitar imágenes pesadas.

## Dónde guardar las imágenes

Hay **dos ubicaciones** según el uso:

```
public/
└── gallery/            # Fotos de la GALERÍA → se enlazan con /gallery/archivo.jpg

src/assets/
├── logo-edr.png        # Logo de la iglesia (import)
└── hero/
    └── hero-cross.jpg  # Imagen de fondo del hero (import)
```

- **Galería → `public/gallery/`**: es la forma más sencilla. Dejas el archivo en esa carpeta y en `GALLERY_PHOTOS` (dentro de `src/data/church.ts`) pones la ruta `/gallery/nombre-archivo`. No hay que escribir `import`.
- **Logo y hero → `src/assets/`**: se **importan** en el código (ej. `import heroCross from "@/assets/hero/hero-cross.jpg"`) y Vite los optimiza y versiona automáticamente.

> Regla práctica: fotos de galería → `public/gallery/`; imágenes fijas del diseño (logo, hero) → `src/assets/` con `import`.

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

1. Optimiza las imágenes (ver arriba: WebP/JPG, ~1200–1600 px, < 300 KB).
2. Cópialas en `public/gallery/`.
3. Abre `src/data/church.ts`, busca `GALLERY_PHOTOS` y agrega (o edita) una fila con la ruta `/gallery/nombre-archivo`:

```ts
{
  id: "g1",
  src: "/gallery/culto-dominical-2025.jpg",
  alt: "Congregación reunida en oración durante el culto",
  category: "culto",
  year: 2025,
},
```

> [!IMPORTANT]
> La ruta empieza con `/gallery/...` (sin `public`, sin `src`). Todo lo que está en `public/` se sirve desde la raíz del sitio, así que `public/gallery/foto.jpg` se referencia como `/gallery/foto.jpg`.

- El `id` debe ser único (`g1`, `g2`, …).
- La `category` coloca la foto en los filtros: `culto`, `celebracion`, `comunidad`, `jovenes`, `ninos`.
- Mientras un elemento tenga `src: ""`, el sitio muestra un **placeholder visual** en su lugar (comportamiento intencional).

## Agregar / cambiar la imagen del hero

La imagen de fondo del hero se importa en `src/routes/index.tsx`:

```ts
import heroCross from "@/assets/hero/hero-cross.jpg";
```

Para cambiarla:

1. Coloca la nueva imagen en `src/assets/hero/`.
2. Cambia la ruta del `import`.

> La imagen del hero es **decorativa**: usa `alt=""` y `aria-hidden="true"`. No le pongas alt descriptivo (sería redundante para lectores de pantalla). No cambies ese comportamiento sin motivo.

## Fotos de personas (liderazgo)

Cada persona en `PEOPLE` (dentro de `src/data/church.ts`) puede tener **una** foto en el campo `photo`. Esa foto se usa en **todas** las tarjetas donde la persona aparezca —en cada organización o ministerio en el que tenga un cargo— y en su modal de perfil. Se define **una sola vez**; no hay una foto por cargo.

### Dónde guardar y cómo enlazar

Igual que la galería, las fotos de personas van en `public/` y se enlazan con una ruta que empieza en `/` (sin `public`, sin `src`, sin `import`). Usa la carpeta `public/people/`:

```
public/
└── people/
    └── santiago-chay-perera.jpg
```

En `church.ts`, pon la ruta en el campo `photo`:

```ts
{
  id: "santiago-chay-perera",
  name: "Santiago Chay Perera",
  photo: "/people/santiago-chay-perera.jpg",   // ← se define una vez
  ecclesiasticalRole: "Pastor",
  roles: [
    { organization: CONSISTORIO, position: "Pastor Principal" },
    { organization: CORO, position: "Integrante" },
  ],
}
```

> [!IMPORTANT]
> La ruta empieza con `/people/...`. Todo lo que está en `public/` se sirve desde la raíz del sitio, así que `public/people/foto.jpg` se referencia como `/people/foto.jpg`.

### Se propaga solo a todas las tarjetas

No hay que repetir la foto ni configurar nada por cargo. En cuanto `photo` tiene una ruta válida:

- Aparece en la tarjeta de la persona en **cada** organización o ministerio de su lista `roles`.
- Aparece en su **modal de perfil**.
- Se muestra en los tres tamaños de tarjeta (grande, primaria y compacta) según dónde salga.

Si una persona **no** tiene `photo`, la tarjeta muestra un marcador visual (iniciales/ícono) en su lugar; es intencional y no rompe nada.

### Recomendaciones técnicas

- **Nombre del archivo**: usa el mismo `id` de la persona (kebab-case, sin acentos ni espacios), ej. `juan-daniel-mex-may.webp`. Así es fácil de ubicar.
- **Tamaño**: 400–600 px de lado es suficiente (las tarjetas son pequeñas). Recorta a un encuadre cercano al cuadrado, centrado en el rostro.
- **Formato y peso**: WebP o JPG optimizado, idealmente < 150 KB por foto.

### Privacidad (obligatorio antes de publicar)

> [!IMPORTANT]
> Las fotos de personas son datos sensibles. Antes de asignar `photo`:

- **Pide consentimiento** a la persona (o a sus padres/tutores si es menor).
- Si una persona está como `visibility: "role-only"` o `"hidden"`, **no le pongas foto** (revelaría su identidad). Ver [CONTENT-GUIDE.md](CONTENT-GUIDE.md#privacidad-de-personas-muy-importante).
- Ver también [Privacidad al subir fotos de personas](#privacidad-al-subir-fotos-de-personas) más abajo.

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
