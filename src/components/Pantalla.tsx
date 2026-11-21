import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Palette, Sizes } from '../theme';

type PantallaProps = {
  ayuda: string;
  children: ReactNode;
  pie?: ReactNode;
};

export function Pantalla({ ayuda, children, pie }: PantallaProps) {
  return (
    <View style={estilos.raiz}>
      <Text style={estilos.ayuda}>{ayuda}</Text>
      <View style={estilos.centro}>{children}</View>
      {pie ? <View style={estilos.pie}>{pie}</View> : null}
    </View>
  );
}

const estilos = StyleSheet.create({
  raiz: {
    flex: 1,
    backgroundColor: Palette.fondo,
  },
  ayuda: {
    color: Palette.tintaSuave,
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: Sizes.padding,
    paddingTop: Sizes.padding,
    textAlign: 'center',
  },
  centro: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pie: {
    alignItems: 'center',
    paddingBottom: Sizes.padding * 1.5,
  },
});
