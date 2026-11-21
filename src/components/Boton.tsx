import { Pressable, StyleSheet, Text } from 'react-native';
import { Palette, Sizes } from '../theme';

type BotonProps = {
  texto: string;
  alPresionar: () => void;
};

export function Boton({ texto, alPresionar }: BotonProps) {
  return (
    <Pressable
      onPress={alPresionar}
      style={({ pressed }) => [estilos.boton, pressed && estilos.presionado]}
    >
      <Text style={estilos.texto}>{texto}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  boton: {
    borderWidth: 2,
    borderColor: Palette.azul,
    borderRadius: Sizes.corner,
    paddingVertical: 10,
    paddingHorizontal: 22,
    backgroundColor: Palette.tarjeta,
  },
  presionado: {
    backgroundColor: Palette.linea,
  },
  texto: {
    color: Palette.azul,
    fontWeight: '700',
    fontSize: 15,
  },
});
