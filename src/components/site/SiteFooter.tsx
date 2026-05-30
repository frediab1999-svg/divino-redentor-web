import logo from "@/assets/logo-edr.png";
import { LOCATION, WHATSAPP_URL } from "@/data/church";
import { MapPinIcon, WhatsAppIcon } from "./section-icons";

const FOOTER_LINKS: [string, string][] = [
  ["#historia", "Historia"],
  ["#testimonios", "Testimonios"],
  ["#liderazgo", "Liderazgo"],
  ["#ministerios", "Ministerios"],
  ["#eventos", "Eventos"],
  ["#galeria", "Galería"],
  ["#contacto", "Contacto"],
];

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Iglesia / denominación */}
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="" className="h-12 w-12 rounded-full bg-white p-1" />
              <div className="min-w-0">
                <p className="font-display text-lg leading-tight">El Divino Redentor</p>
                <p className="text-xs text-primary-foreground/60">Kimbilá, Izamal, Yucatán</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm text-primary-foreground/70 leading-relaxed">
              Iglesia Nacional Presbiteriana de México A.R. Una comunidad de fe, esperanza y amor.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold mb-4">Navegación</p>
            <nav className="grid grid-cols-2 gap-x-6 gap-y-2.5">
              {FOOTER_LINKS.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm text-primary-foreground/70 hover:text-gold transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Visítanos */}
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-gold mb-4">Visítanos</p>
            <a
              href={LOCATION.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 text-sm text-primary-foreground/70 hover:text-gold transition-colors"
            >
              <span className="mt-0.5 shrink-0">
                <MapPinIcon className="h-4 w-4" />
              </span>
              <span>{LOCATION.address}</span>
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md border border-primary-foreground/25 px-4 py-2 text-sm hover:border-gold hover:text-gold transition-colors"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Iglesia El Divino Redentor. Todos los derechos reservados.
          </p>
          <p className="text-xs text-primary-foreground/50">
            Iglesia Nacional Presbiteriana de México A.R.
          </p>
        </div>
      </div>
    </footer>
  );
}
