// Todos los textos visibles de la aplicación
export const ESTUDIANTE = 'Nombre del estudiante';

export const Texts = {
  app: 'Taller de Animaciones',
  subtitulo: 'Reanimated · Gesture Handler · Expo',

  inicio: {
    menu: 'Inicio',
    titulo: 'Bienvenido',
    intro: 'Cada ejercicio está en el menú lateral. Toque el ícono ☰ o una de las tarjetas para abrirlo.',
  },

  arrastre: {
    menu: 'Arrastrar y rotar',
    ayuda: 'Arrastre la tarjeta. Si la lleva a la izquierda se inclina a la izquierda; si la lleva a la derecha se inclina a la derecha. Al soltar regresa a su sitio.',
    tarjeta: 'Arrástrame',
    izquierda: '⬅ Izquierda',
    derecha: 'Derecha ➡',
    centro: 'Centro',
  },

  carga: {
    menu: 'Cargando',
    ayuda: 'La animación comienza sola al entrar. El círculo gira sin parar y la barra muestra el avance al mismo tiempo.',
    estado: 'Procesando datos',
    listo: 'Completado',
  },

  multitouch: {
    menu: 'Multitouch',
    ayuda: 'Use dos dedos para hacer zoom y girar la imagen; un dedo para moverla. Toque dos veces para volver al inicio.',
  },

  rebote: {
    menu: 'Rebote',
    ayuda: 'Presione el cuadro: se encoge. Suéltelo y regresa a su tamaño rebotando.',
    boton: 'Toca aquí',
    presionado: 'Presionado',
  },

  carrusel: {
    menu: 'Carrusel',
    ayuda: 'Deslice a los lados para cambiar de tarjeta.',
    tarjetas: [
      { nombre: 'Café', detalle: 'Origen colombiano', emoji: '☕' },
      { nombre: 'Música', detalle: 'Ritmos del Caribe', emoji: '🎶' },
      { nombre: 'Fútbol', detalle: 'Pasión nacional', emoji: '⚽' },
      { nombre: 'Flores', detalle: 'Exportación mundial', emoji: '🌺' },
      { nombre: 'Montaña', detalle: 'Cordillera de los Andes', emoji: '🏔️' },
      { nombre: 'Mar', detalle: 'Dos océanos', emoji: '🌊' },
    ],
  },

  agitar: {
    menu: 'Agitar dispositivo',
    ayuda: 'Sacuda el celular y la campana se agitará. Funciona con el acelerómetro.',
    sinSensor: 'Este dispositivo no tiene acelerómetro disponible. Pruebe con el botón.',
    probar: 'Probar animación',
    contador: 'Veces agitado',
    lectura: 'Lectura x / y / z',
  },
};
