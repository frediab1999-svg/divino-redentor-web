import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/logo-edr.png";
import heroCross from "@/assets/hero/hero-cross.jpg";
import { Navbar } from "@/components/site/Navbar";
import { AnimatedSection } from "@/components/site/AnimatedSection";
import { NavigationGuide } from "@/components/site/NavigationGuide";
import { HistoryTimeline } from "@/components/site/HistoryTimeline";
import { StatsSection } from "@/components/site/StatsSection";
import { LeadershipSection } from "@/components/site/LeadershipSection";
import { MinistriesSection } from "@/components/site/MinistriesSection";
import { EventsSection } from "@/components/site/EventsSection";
import { GallerySection } from "@/components/site/GallerySection";
import { TestimoniesSection } from "@/components/site/TestimoniesSection";
import { ContactSection } from "@/components/site/ContactSection";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppIcon } from "@/components/site/section-icons";
import { WHATSAPP_URL } from "@/data/church";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section id="inicio" className="relative overflow-hidden bg-background pt-28 sm:pt-36 pb-16">
        {/* Imagen de fondo — cruz (identidad visual) */}
        <img
          src={heroCross}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 z-0 h-full w-full object-cover object-[center_30%] sm:object-center pointer-events-none select-none"
        />
        {/* Lavado crema cálido para legibilidad y fundido con la sección siguiente */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/82 via-background/82 to-background pointer-events-none" />
        {/* Capa navy muy sutil para profundidad */}
        <div className="absolute inset-0 z-0 bg-primary/5 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <AnimatedSection>
            <img
              src={logo}
              alt="Logo Iglesia El Divino Redentor"
              className="mx-auto h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 rounded-full bg-white p-2 ring-1 ring-border"
            />
            <p className="mt-6 text-[11px] md:text-sm uppercase tracking-[0.18em] sm:tracking-[0.3em] text-gold">
              Iglesia Nacional Presbiteriana de México A.R.
            </p>
            <h1 className="mt-5 font-display text-primary text-[2.6rem] sm:text-6xl md:text-7xl leading-[1.05]">
              El Divino Redentor
            </h1>
            <p className="mt-4 text-muted-foreground text-lg">Kimbilá, Izamal, Yucatán</p>

            <div className="mx-auto mt-6 h-px w-16 bg-gold" />

            <p className="mt-6 max-w-2xl mx-auto text-foreground/75 leading-relaxed text-lg">
              Te damos la bienvenida a nuestra iglesia, una comunidad de fe, esperanza y amor, donde
              cada persona es recibida con los brazos abiertos para conocer al Señor Jesucristo,
              nuestro Salvador.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                <WhatsAppIcon className="h-[18px] w-[18px]" />
                Contactar por WhatsApp
              </a>
              <a
                href="#historia"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-primary/30 text-primary px-7 py-3 rounded-md hover:bg-primary/5 transition-colors"
              >
                Conocer nuestra historia
              </a>
            </div>
          </AnimatedSection>
        </div>

        <div className="relative z-10">
          <NavigationGuide />
        </div>
      </section>

      {/* ── HISTORIA ──────────────────────────────────────────────────────── */}
      <HistoryTimeline />

      {/* ── ESTADÍSTICAS ──────────────────────────────────────────────────── */}
      <StatsSection />

      {/* ── TESTIMONIOS ───────────────────────────────────────────────────── */}
      <TestimoniesSection />

      {/* ── LIDERAZGO ─────────────────────────────────────────────────────── */}
      <LeadershipSection />

      {/* ── MINISTERIOS ───────────────────────────────────────────────────── */}
      <MinistriesSection />

      {/* ── EVENTOS ───────────────────────────────────────────────────────── */}
      <EventsSection />

      {/* ── GALERÍA ───────────────────────────────────────────────────────── */}
      <GallerySection />

      {/* ── CONTACTO ──────────────────────────────────────────────────────── */}
      <ContactSection />

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <SiteFooter />
    </div>
  );
}
