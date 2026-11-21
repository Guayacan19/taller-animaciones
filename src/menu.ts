import { Texts } from './theme/texts';

// Orden de las opciones del menú lateral. `ruta` coincide con el archivo en src/app
export const menu = [
  { ruta: 'index', titulo: Texts.inicio.menu, icono: '🏠' },
  { ruta: 'arrastre', titulo: Texts.arrastre.menu, icono: '👆' },
  { ruta: 'carga', titulo: Texts.carga.menu, icono: '🔄' },
  { ruta: 'multitouch', titulo: Texts.multitouch.menu, icono: '🖐️' },
  { ruta: 'rebote', titulo: Texts.rebote.menu, icono: '🟦' },
  { ruta: 'carrusel', titulo: Texts.carrusel.menu, icono: '🃏' },
  { ruta: 'agitar', titulo: Texts.agitar.menu, icono: '🔔' },
] as const;
