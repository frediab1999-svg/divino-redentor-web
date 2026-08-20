import { useCallback, useEffect, useRef } from "react";

/**
 * Integra una pila de modales con el historial del navegador para que el botón
 * "Atrás" (o el gesto de retroceso en móvil) cierre el modal superior en lugar
 * de abandonar la página.
 *
 * Uso:
 * - `pushLayer()` cada vez que abras una capa de modal (organización, perfil…).
 * - `closeLayer(fn)` para cerrar una capa desde la UI (botón X, fondo, Escape):
 *   ejecuta `fn` (que actualiza tu estado) y retrocede una entrada del historial.
 * - `onBack` se ejecuta cuando el usuario pulsa "Atrás": debe cerrar la capa
 *   superior que esté abierta.
 */
export function useHistoryModal(onBack: () => void) {
  const onBackRef = useRef(onBack);
  onBackRef.current = onBack;
  // Evita que el retroceso programático (cierre desde la UI) dispare onBack.
  const skipPop = useRef(false);

  useEffect(() => {
    const handlePop = () => {
      if (skipPop.current) {
        skipPop.current = false;
        return;
      }
      onBackRef.current();
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const pushLayer = useCallback(() => {
    window.history.pushState({ modalLayer: true }, "");
  }, []);

  const closeLayer = useCallback((fn: () => void) => {
    fn();
    skipPop.current = true;
    window.history.back();
  }, []);

  return { pushLayer, closeLayer };
}
