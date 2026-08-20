import { useState, useEffect, useCallback } from "react";
import {
  GALLERY_PHOTOS,
  GALLERY_CATEGORY_LABELS,
  type GalleryCategory,
  type GalleryPhoto,
} from "@/data/church";
import { SectionTitle } from "./SectionTitle";
import { AnimatedSection } from "./AnimatedSection";
import { CameraIcon } from "./section-icons";

const CATEGORIES = ["all", "culto", "celebracion", "comunidad", "jovenes", "ninos"] as const;
const INITIAL_VISIBLE = 9;

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const photo = photos[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Nav prev */}
      <button
        type="button"
        aria-label="Anterior"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Image */}
      <div
        className="max-w-4xl max-h-[85vh] mx-12 sm:mx-16 relative px-2 sm:px-0"
        onClick={(e) => e.stopPropagation()}
      >
        {photo.src ? (
          <img
            src={photo.src}
            alt={photo.alt}
            className="max-h-[85vh] max-w-full rounded-md object-contain"
          />
        ) : (
          <div className="w-full max-w-xs sm:max-w-lg h-48 sm:h-[400px] rounded-md bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 text-white/40">
            <CameraIcon className="h-10 w-10" />
            <p className="text-white/60 text-sm text-center px-4">{photo.alt}</p>
          </div>
        )}
        <p className="mt-3 text-center text-white/70 text-sm">{photo.alt}</p>
        <p className="text-center text-white/40 text-xs mt-0.5">
          {index + 1} / {photos.length}
        </p>
      </div>

      {/* Nav next */}
      <button
        type="button"
        aria-label="Siguiente"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Close */}
      <button
        type="button"
        aria-label="Cerrar"
        onClick={onClose}
        className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// ── GallerySection ────────────────────────────────────────────────────────────
export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory | "all">("all");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "all"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevPhoto = useCallback(
    () =>
      setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length)),
    [filtered.length],
  );
  const nextPhoto = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length)),
    [filtered.length],
  );

  // Keyboard navigation for lightbox — listener global mientras está abierto
  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevPhoto();
      else if (e.key === "ArrowRight") nextPhoto();
      else if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxIndex, prevPhoto, nextPhoto, closeLightbox]);

  return (
    <>
      <section id="galeria" className="py-24 px-6 lg:px-10 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection>
            <SectionTitle
              eyebrow="Galería"
              title="Momentos que atesoramos"
              subtitle="Fotografías de cultos, celebraciones y la vida de la congregación."
            />
          </AnimatedSection>

          {/* Filtros */}
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat);
                    setVisibleCount(INITIAL_VISIBLE);
                  }}
                  className={`px-4 py-1.5 rounded-md text-sm transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {GALLERY_CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Grid — álbum comunitario sobrio */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3">
            {visible.map((photo, i) => (
              <AnimatedSection key={photo.id} delay={(i % 9) * 40}>
                <button
                  type="button"
                  onClick={() => openLightbox(filtered.indexOf(photo))}
                  className="group relative aspect-square rounded-md overflow-hidden border border-border bg-secondary w-full transition-colors hover:border-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {photo.src ? (
                    <>
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      {/* Overlay caliza sutil */}
                      <div className="absolute inset-0 bg-primary/5 mix-blend-multiply" />
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/40">
                      <CameraIcon className="h-7 w-7" />
                    </div>
                  )}

                  {/* Leyenda en hover */}
                  <div className="absolute inset-x-0 bottom-0 flex items-end">
                    <p className="w-full px-3 py-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-transparent">
                      {photo.alt}
                    </p>
                  </div>
                </button>
              </AnimatedSection>
            ))}
          </div>

          {/* Load more */}
          {visibleCount < filtered.length && (
            <AnimatedSection>
              <div className="text-center mt-8">
                <button
                  type="button"
                  onClick={() => setVisibleCount((c) => c + INITIAL_VISIBLE)}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md border border-border text-sm text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors"
                >
                  Cargar más fotos
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>
            </AnimatedSection>
          )}

          {filtered.length === 0 && (
            <AnimatedSection>
              <div className="flex flex-col items-center gap-3 text-center py-16 text-muted-foreground">
                <CameraIcon className="h-8 w-8 text-muted-foreground/40" />
                <p className="font-display text-lg text-primary">
                  Sin fotografías en esta categoría
                </p>
              </div>
            </AnimatedSection>
          )}

          {GALLERY_PHOTOS.every((p) => !p.src) && (
            <p className="text-center text-xs text-muted-foreground mt-4">
              Espacio reservado para fotografías. Agrega las imágenes en{" "}
              <code>src/assets/gallery/</code> y actualiza <code>GALLERY_PHOTOS</code> en{" "}
              <code>church.ts</code>.
            </p>
          )}
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          photos={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </>
  );
}
