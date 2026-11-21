import { StyleSheet, TextInput, View } from 'react-native';
import {
  GestureDetector,
  usePanGesture,
  usePinchGesture,
  useRotationGesture,
  useSimultaneousGestures,
  useTapGesture,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Pantalla } from '../components/Pantalla';
import { Palette, Sizes, sombra } from '../theme';
import { Texts } from '../theme/texts';

const LADO = 280;
const ZOOM_MIN = 0.4;
const ZOOM_MAX = 5;
const REINICIO_MS = 350;

const Entrada = Animated.createAnimatedComponent(TextInput);

export default function Multitouch() {
  // Valores actuales
  const posX = useSharedValue(0);
  const posY = useSharedValue(0);
  const zoom = useSharedValue(1);
  const giro = useSharedValue(0);
  // Valores al terminar el último gesto
  const posXBase = useSharedValue(0);
  const posYBase = useSharedValue(0);
  const zoomBase = useSharedValue(1);
  const giroBase = useSharedValue(0);

  const gestoMover = usePanGesture({
    onUpdate: (e) => {
      'worklet';
      posX.value = posXBase.value + e.translationX;
      posY.value = posYBase.value + e.translationY;
    },
    onDeactivate: () => {
      'worklet';
      posXBase.value = posX.value;
      posYBase.value = posY.value;
    },
  });

  const gestoZoom = usePinchGesture({
    onUpdate: (e) => {
      'worklet';
      zoom.value = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, zoomBase.value * e.scale));
    },
    onDeactivate: () => {
      'worklet';
      zoomBase.value = zoom.value;
    },
  });

  const gestoGiro = useRotationGesture({
    onUpdate: (e) => {
      'worklet';
      giro.value = giroBase.value + e.rotation;
    },
    onDeactivate: () => {
      'worklet';
      giroBase.value = giro.value;
    },
  });

  const gestoDobleToque = useTapGesture({
    numberOfTaps: 2,
    onActivate: () => {
      'worklet';
      const t = { duration: REINICIO_MS };
      posX.value = withTiming(0, t);
      posY.value = withTiming(0, t);
      zoom.value = withTiming(1, t);
      giro.value = withTiming(0, t);
      posXBase.value = 0;
      posYBase.value = 0;
      zoomBase.value = 1;
      giroBase.value = 0;
    },
  });

  // Mover, hacer zoom y girar pueden ocurrir a la vez
  const gestos = useSimultaneousGestures(gestoMover, gestoZoom, gestoGiro, gestoDobleToque);

  const estiloImagen = useAnimatedStyle(() => ({
    transform: [
      { translateX: posX.value },
      { translateY: posY.value },
      { rotate: `${giro.value}rad` },
      { scale: zoom.value },
    ],
  }));

  // Texto actualizado en el hilo de UI
  const propsResumen = useAnimatedProps(() => {
    const grados = Math.round((giro.value * 180) / Math.PI);
    const texto = `🔍 ${zoom.value.toFixed(1)}x    🔄 ${grados}°`;
    return { text: texto, defaultValue: texto } as object;
  });

  return (
    <Pantalla
      ayuda={Texts.multitouch.ayuda}
      pie={
        <View style={estilos.indicador}>
          <Entrada editable={false} style={estilos.indicadorTexto} animatedProps={propsResumen} />
        </View>
      }
    >
      <GestureDetector gesture={gestos}>
        <View style={estilos.zona} collapsable={false}>
          <Animated.Image source={require('../../assets/mandala.png')} style={[estilos.imagen, estiloImagen]} />
        </View>
      </GestureDetector>
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  zona: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imagen: {
    width: LADO,
    height: LADO,
    borderRadius: LADO / 2,
    ...sombra,
  },
  indicador: {
    backgroundColor: Palette.tarjeta,
    borderRadius: Sizes.corner,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Palette.linea,
  },
  indicadorTexto: {
    color: Palette.tinta,
    fontSize: 16,
    fontWeight: '700',
    padding: 0,
    minWidth: 170,
    textAlign: 'center',
  },
});
