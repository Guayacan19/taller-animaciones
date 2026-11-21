import { Accelerometer } from 'expo-sensors';
import { useEffect, useRef, useState } from 'react';

type Lectura = { x: number; y: number; z: number };

const INTERVALO_MS = 80;
// Cambio brusco entre dos lecturas consecutivas (en g) que se considera sacudida
const UMBRAL_CAMBIO = 1.2;
const ESPERA_MS = 700;

/**
 * Escucha el acelerómetro y ejecuta `alAgitar` cuando detecta una sacudida.
 * Se compara cada lectura con la anterior, así la gravedad no influye.
 */
export function useShake(alAgitar: () => void) {
  const [disponible, setDisponible] = useState<boolean | null>(null);
  const [lectura, setLectura] = useState<Lectura>({ x: 0, y: 0, z: 0 });
  const anterior = useRef<Lectura | null>(null);
  const ultimo = useRef(0);
  const callback = useRef(alAgitar);
  callback.current = alAgitar;

  useEffect(() => {
    let suscripcion: { remove: () => void } | undefined;
    let activo = true;

    (async () => {
      const ok = await Accelerometer.isAvailableAsync().catch(() => false);
      if (!activo) return;
      setDisponible(ok);
      if (!ok) return;

      try {
        Accelerometer.setUpdateInterval(INTERVALO_MS);
        suscripcion = Accelerometer.addListener((dato) => {
          setLectura(dato);
          const previo = anterior.current;
          anterior.current = dato;
          if (!previo) return;

          const cambio = Math.abs(dato.x - previo.x) + Math.abs(dato.y - previo.y) + Math.abs(dato.z - previo.z);
          const ahora = Date.now();
          if (cambio > UMBRAL_CAMBIO && ahora - ultimo.current > ESPERA_MS) {
            ultimo.current = ahora;
            callback.current();
          }
        });
      } catch {
        setDisponible(false);
      }
    })();

    return () => {
      activo = false;
      suscripcion?.remove();
    };
  }, []);

  return { disponible, lectura };
}
