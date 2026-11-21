import { useEffect } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Pantalla } from '../components/Pantalla';
import { Palette } from '../theme';
import { Texts } from '../theme/texts';

const TAMANO = 120;
const PUNTOS = 8;
const DURACION_GIRO = 1400;
const DURACION_BARRA = 3500;

const TextoAnimado = Animated.createAnimatedComponent(TextInput);

// Spinner hecho con puntos dispuestos en círculo
function Spinner() {
  const giro = useSharedValue(0);

  useEffect(() => {
    giro.value = withRepeat(
      withTiming(1, { duration: DURACION_GIRO, easing: Easing.bezier(0.45, 0.05, 0.55, 0.95) }),
      -1,
    );
  }, [giro]);

  const estilo = useAnimatedStyle(() => ({
    transform: [{ rotate: `${giro.value * 360}deg` }],
  }));

  return (
    <Animated.View style={[estilos.spinner, estilo]}>
      {Array.from({ length: PUNTOS }).map((_, i) => {
        const angulo = (i / PUNTOS) * 2 * Math.PI;
        const radio = TAMANO / 2 - 12;
        return (
          <View
            key={i}
            style={[
              estilos.punto,
              {
                opacity: (i + 1) / PUNTOS,
                transform: [
                  { translateX: Math.cos(angulo) * radio },
                  { translateY: Math.sin(angulo) * radio },
                  { scale: 0.5 + (i + 1) / PUNTOS / 2 },
                ],
              },
            ]}
          />
        );
      })}
    </Animated.View>
  );
}

// Barra de progreso que avanza en paralelo al spinner
function BarraProgreso() {
  const avance = useSharedValue(0);

  useEffect(() => {
    avance.value = withRepeat(
      withDelay(300, withTiming(1, { duration: DURACION_BARRA, easing: Easing.out(Easing.quad) })),
      -1,
    );
  }, [avance]);

  const estiloRelleno = useAnimatedStyle(() => ({
    transform: [{ scaleX: avance.value }],
    backgroundColor: interpolateColor(avance.value, [0, 0.5, 1], [Palette.rosa, Palette.amarillo, Palette.verde]),
  }));

  // El porcentaje se escribe directamente en el hilo de UI, sin re-renderizar
  const propsTexto = useAnimatedProps(() => {
    const porcentaje = Math.round(avance.value * 100);
    const texto = porcentaje >= 100 ? `${Texts.carga.listo} 100%` : `${Texts.carga.estado} ${porcentaje}%`;
    return { text: texto, defaultValue: texto } as object;
  });

  return (
    <View style={estilos.bloqueBarra}>
      <TextoAnimado
        editable={false}
        underlineColorAndroid="transparent"
        style={estilos.porcentaje}
        animatedProps={propsTexto}
      />
      <View style={estilos.pista}>
        <Animated.View style={[estilos.relleno, estiloRelleno]} />
      </View>
    </View>
  );
}

export default function Carga() {
  return (
    <Pantalla ayuda={Texts.carga.ayuda}>
      <Spinner />
      <BarraProgreso />
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  spinner: {
    width: TAMANO,
    height: TAMANO,
    alignItems: 'center',
    justifyContent: 'center',
  },
  punto: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Palette.azul,
  },
  bloqueBarra: {
    width: '80%',
    marginTop: 40,
  },
  porcentaje: {
    color: Palette.tinta,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    padding: 0,
  },
  pista: {
    height: 18,
    borderRadius: 9,
    backgroundColor: Palette.linea,
    overflow: 'hidden',
  },
  relleno: {
    height: '100%',
    width: '100%',
    borderRadius: 9,
    transformOrigin: 'left',
  },
});
