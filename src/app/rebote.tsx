import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Pantalla } from '../components/Pantalla';
import { Palette, Sizes, sombra } from '../theme';
import { Texts } from '../theme/texts';

const LADO = 160;
const ESCALA_PRESIONADO = 0.7;

export default function Rebote() {
  const escala = useSharedValue(1);
  const inclinacion = useSharedValue(0);
  const [presionado, setPresionado] = useState(false);

  const alPresionar = () => {
    setPresionado(true);
    // Se encoge rápidamente
    escala.value = withTiming(ESCALA_PRESIONADO, { duration: 150 });
    inclinacion.value = withTiming(-8, { duration: 150 });
  };

  const alSoltar = () => {
    setPresionado(false);
    // Vuelve a su tamaño con un rebote: se pasa un poco y luego se asienta
    escala.value = withSequence(
      withTiming(1.12, { duration: 140 }),
      withSpring(1, { damping: 3, stiffness: 160, mass: 0.6 }),
    );
    inclinacion.value = withSpring(0, { damping: 4, stiffness: 140 });
  };

  const estilo = useAnimatedStyle(() => ({
    transform: [{ scale: escala.value }, { rotate: `${inclinacion.value}deg` }],
  }));

  return (
    <Pantalla ayuda={Texts.rebote.ayuda}>
      <Pressable onPressIn={alPresionar} onPressOut={alSoltar}>
        <Animated.View style={[estilos.cuadro, presionado && estilos.cuadroActivo, estilo]}>
          <Text style={estilos.emoji}>{presionado ? '😖' : '😄'}</Text>
          <Text style={estilos.texto}>{presionado ? Texts.rebote.presionado : Texts.rebote.boton}</Text>
        </Animated.View>
      </Pressable>
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  cuadro: {
    width: LADO,
    height: LADO,
    borderRadius: Sizes.corner + 10,
    backgroundColor: Palette.amarillo,
    alignItems: 'center',
    justifyContent: 'center',
    ...sombra,
  },
  cuadroActivo: {
    backgroundColor: Palette.rosa,
  },
  emoji: { fontSize: 52 },
  texto: { marginTop: 8, fontSize: 16, fontWeight: '800', color: Palette.tinta },
});
