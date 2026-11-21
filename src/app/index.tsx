import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { menu } from '../menu';
import { Palette, Sizes, sombra } from '../theme';
import { Texts } from '../theme/texts';

const colores = [Palette.azul, Palette.verde, Palette.rosa, Palette.amarillo, Palette.marino, Palette.azul];

export default function Inicio() {
  const ejercicios = menu.filter((m) => m.ruta !== 'index');

  return (
    <ScrollView style={estilos.raiz} contentContainerStyle={estilos.contenido}>
      <Text style={estilos.titulo}>{Texts.inicio.titulo}</Text>
      <Text style={estilos.intro}>{Texts.inicio.intro}</Text>

      <View style={estilos.rejilla}>
        {ejercicios.map((item, i) => (
          <Animated.View key={item.ruta} entering={ZoomIn.delay(i * 90)} style={estilos.celda}>
            <Pressable
              onPress={() => router.navigate(`/${item.ruta}`)}
              style={({ pressed }) => [estilos.tarjeta, { borderTopColor: colores[i] }, pressed && { opacity: 0.6 }]}
            >
              <Text style={estilos.icono}>{item.icono}</Text>
              <Text style={estilos.numero}>{i + 1}</Text>
              <Text style={estilos.nombre}>{item.titulo}</Text>
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  raiz: { flex: 1, backgroundColor: Palette.fondo },
  contenido: { padding: Sizes.padding },
  titulo: { fontSize: 30, fontWeight: '800', color: Palette.tinta },
  intro: { fontSize: 15, color: Palette.tintaSuave, marginTop: 6, marginBottom: 20, lineHeight: 21 },
  rejilla: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -Sizes.gap / 2 },
  celda: { width: '50%', padding: Sizes.gap / 2 },
  tarjeta: {
    backgroundColor: Palette.tarjeta,
    borderRadius: Sizes.corner,
    borderTopWidth: 6,
    padding: 16,
    minHeight: 130,
    ...sombra,
  },
  icono: { fontSize: 30 },
  numero: { position: 'absolute', right: 14, top: 12, color: Palette.linea, fontSize: 30, fontWeight: '900' },
  nombre: { marginTop: 14, fontSize: 15, fontWeight: '700', color: Palette.tinta },
});
