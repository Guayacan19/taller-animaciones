import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Boton } from '../components/Boton';
import { Pantalla } from '../components/Pantalla';
import { useShake } from '../hooks/useShake';
import { Palette, Sizes, sombra } from '../theme';
import { Texts } from '../theme/texts';

const LADO = 150;
const VAIVEN = 20; // grados
const PASO_MS = 70;

export default function Agitar() {
  const angulo = useSharedValue(0);
  const salto = useSharedValue(0);
  const [veces, setVeces] = useState(0);

  const sacudir = () => {
    setVeces((v) => v + 1);
    const t = { duration: PASO_MS, easing: Easing.linear };
    // Vaivén tipo campana: va a un lado, oscila varias veces y vuelve al centro
    angulo.value = withSequence(
      withTiming(-VAIVEN, t),
      withRepeat(withTiming(VAIVEN, t), 6, true),
      withTiming(0, t),
    );
    salto.value = withSequence(withTiming(-14, { duration: 120 }), withTiming(0, { duration: 260 }));
  };

  const { disponible, lectura } = useShake(sacudir);

  const estilo = useAnimatedStyle(() => ({
    transform: [{ translateY: salto.value }, { rotate: `${angulo.value}deg` }],
  }));

  return (
    <Pantalla
      ayuda={disponible === false ? Texts.agitar.sinSensor : Texts.agitar.ayuda}
      pie={<Boton texto={Texts.agitar.probar} alPresionar={sacudir} />}
    >
      <Animated.View style={[estilos.campana, estilo]}>
        <Text style={estilos.emoji}>🔔</Text>
      </Animated.View>

      <View style={estilos.datos}>
        <Text style={estilos.dato}>
          {Texts.agitar.contador}: <Text style={estilos.fuerte}>{veces}</Text>
        </Text>
        <Text style={estilos.dato}>
          {Texts.agitar.lectura}: {lectura.x.toFixed(2)} / {lectura.y.toFixed(2)} / {lectura.z.toFixed(2)}
        </Text>
      </View>
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  campana: {
    width: LADO,
    height: LADO,
    borderRadius: LADO / 2,
    backgroundColor: Palette.tarjeta,
    alignItems: 'center',
    justifyContent: 'center',
    transformOrigin: 'top',
    ...sombra,
  },
  emoji: { fontSize: 72 },
  datos: { marginTop: Sizes.padding * 2, alignItems: 'center', gap: 6 },
  dato: { color: Palette.tintaSuave, fontSize: 14 },
  fuerte: { color: Palette.tinta, fontWeight: '800' },
});
