import { useEffect } from "react";

// Contador global para soportar modales apilados: el scroll del fondo solo se
// restaura cuando se cierra la última capa abierta.
let lockCount = 0;

/**
 * Bloquea el scroll del `body` mientras `active` sea true. Usa un contador
 * compartido para que dos modales abiertos a la vez (ej. organización + perfil)
 * no se pisen: al cerrar el de arriba, el de abajo mantiene el bloqueo.
 */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockCount += 1;
    document.body.style.overflow = "hidden";
    return () => {
      lockCount -= 1;
      if (lockCount <= 0) {
        lockCount = 0;
        document.body.style.overflow = "";
      }
    };
  }, [active]);
}
