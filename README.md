# Taller de Animaciones — React Native Reanimated + Expo

Aplicación móvil que reúne seis ejercicios de animación y gestos en una sola app, navegables desde un menú lateral (Drawer) construido con **Expo Router**.

**Estudiante:** Nombre del estudiante

## Tecnologías

- Expo SDK 58 con **Expo Router** (navegación basada en archivos)
- React Native Reanimated 4 / React Native Worklets
- React Native Gesture Handler 3 (gestos con hooks)
- expo-sensors (acelerómetro)
- TypeScript

## Ejercicios

| Ruta | Ejercicio | Técnica principal |
|------|-----------|-------------------|
| `src/app/arrastre.tsx` | **Arrastrar y rotar.** La tarjeta se arrastra libremente; su ángulo depende de la posición horizontal (izquierda → gira a la izquierda, derecha → gira a la derecha) y cambia de color. Al soltar regresa con un resorte que conserva la velocidad del gesto. | `usePanGesture`, `useDerivedValue`, `interpolate`, `interpolateColor`, `withSpring` |
| `src/app/carga.tsx` | **Animación de carga.** Al montar el componente arranca un spinner de puntos que gira infinitamente y, en paralelo, una barra de progreso que cambia de color. El porcentaje se actualiza en el hilo de UI sin re-renderizar. | `useEffect`, `withRepeat`, `withTiming`, `Easing.bezier`, `useAnimatedProps` |
| `src/app/multitouch.tsx` | **Gestos multitáctiles.** Zoom (pellizco), rotación con dos dedos y desplazamiento simultáneos sobre una imagen. Doble toque para restablecer. | `usePinchGesture`, `useRotationGesture`, `usePanGesture`, `useSimultaneousGestures` |
| `src/app/rebote.tsx` | **Rebote.** El cuadro se encoge al presionarlo y, al soltarlo, crece un poco más de su tamaño y se asienta rebotando. | `Pressable` (`onPressIn` / `onPressOut`), `withSequence`, `withSpring` |
| `src/app/carrusel.tsx` | **Carrusel animado.** Lista horizontal paginada con escala, rotación, desplazamiento vertical, opacidad y efecto parallax en el contenido; indicadores animados. | `Animated.FlatList`, `useAnimatedScrollHandler`, `interpolate` |
| `src/app/agitar.tsx` | **Acelerómetro.** Al sacudir el dispositivo la campana oscila. La detección compara lecturas consecutivas del sensor (hook `useShake`). | `expo-sensors`, `withRepeat`, `withSequence` |
| `src/app/_layout.tsx` | **Drawer Navigation.** Menú lateral personalizado que permite abrir cada ejercicio de forma independiente. | `expo-router/drawer` |

## Estructura

```
src/
├── app/            # Pantallas (cada archivo es una ruta) y _layout con el Drawer
├── components/     # Pantalla y Boton reutilizables
├── hooks/          # useShake (lógica del acelerómetro)
├── theme/          # Colores, medidas y textos
└── menu.ts         # Orden y etiquetas del menú
```

## Cómo ejecutar

```bash
npm install
npx expo start
```

Escanear el QR con **Expo Go** (SDK 58) o presionar `a` (Android) / `i` (iOS).
El acelerómetro necesita un dispositivo físico; en emulador se puede usar el botón **"Probar animación"**.
