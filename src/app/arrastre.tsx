import { StyleSheet, Text, View } from 'react-native';
import { GestureDetector, usePanGesture } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Pantalla } from '../components/Pantalla';
import { Palette, Sizes, sombra } from '../theme';
import { Texts } from '../theme/texts';

const ANCHO = 220;
const ALTO = 280;
const GIRO_MAXIMO = 25; // grados
const DISTANCIA_GIRO = 200;

export default function Arrastre() {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const inicioX = useSharedValue(0);
  const inicioY = useSharedValue(0);

  // El ángulo depende de la posición horizontal: negativo = izquierda, positivo = derecha
  const angulo = useDerivedValue(() =>
    interpolate(x.value, [-DISTANCIA_GIRO, 0, DISTANCIA_GIRO], [-GIRO_MAXIMO, 0, GIRO_MAXIMO], 'clamp'),
  );

  const arrastre = usePanGesture({
    onActivate: () => {
      'worklet';
      inicioX.value = x.value;
      inicioY.value = y.value;
    },
    onUpdate: (e) => {
      'worklet';
      x.value = inicioX.value + e.translationX;
      y.value = inicioY.value + e.translationY;
    },
    onDeactivate: (e) => {
      'worklet';
      // Regresa al punto de partida usando la velocidad del gesto
      x.value = withSpring(0, { velocity: e.velocityX, damping: 12 });
      y.value = withSpring(0, { velocity: e.velocityY, damping: 12 });
    },
  });

  const estiloTarjeta = useAnimatedStyle(() => ({
    transform: [{ translateX: x.value }, { translateY: y.value }, { rotateZ: `${angulo.value}deg` }],
    backgroundColor: interpolateColor(
      angulo.value,
      [-GIRO_MAXIMO, 0, GIRO_MAXIMO],
      [Palette.rosa, Palette.azul, Palette.verde],
    ),
  }));

  const estiloIzquierda = useAnimatedStyle(() => ({
    opacity: interpolate(angulo.value, [-GIRO_MAXIMO, 0], [1, 0.25], 'clamp'),
  }));
  const estiloDerecha = useAnimatedStyle(() => ({
    opacity: interpolate(angulo.value, [0, GIRO_MAXIMO], [0.25, 1], 'clamp'),
  }));

  return (
    <Pantalla ayuda={Texts.arrastre.ayuda}>
      <View style={estilos.etiquetas}>
        <Animated.Text style={[estilos.etiqueta, { color: Palette.rosa }, estiloIzquierda]}>
          {Texts.arrastre.izquierda}
        </Animated.Text>
        <Animated.Text style={[estilos.etiqueta, { color: Palette.verde }, estiloDerecha]}>
          {Texts.arrastre.derecha}
        </Animated.Text>
      </View>

      <GestureDetector gesture={arrastre}>
        <Animated.View style={[estilos.tarjeta, estiloTarjeta]}>
          <Text style={estilos.mano}>✋</Text>
          <Text style={estilos.texto}>{Texts.arrastre.tarjeta}</Text>
        </Animated.View>
      </GestureDetector>
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  etiquetas: {
    position: 'absolute',
    top: Sizes.padding,
    left: Sizes.padding,
    right: Sizes.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  etiqueta: { fontSize: 16, fontWeight: '800' },
  tarjeta: {
    width: ANCHO,
    height: ALTO,
    borderRadius: Sizes.corner + 6,
    alignItems: 'center',
    justifyContent: 'center',
    ...sombra,
  },
  mano: { fontSize: 64 },
  texto: { color: Palette.blanco, fontSize: 20, fontWeight: '800', marginTop: 12 },
});
