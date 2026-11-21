import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Pantalla } from '../components/Pantalla';
import { Palette, Sizes, sombra } from '../theme';
import { Texts } from '../theme/texts';

type Tarjeta = (typeof Texts.carrusel.tarjetas)[number];

const fondos = [Palette.marino, Palette.rosa, Palette.verde, Palette.azul, Palette.amarillo, Palette.azul];

type ItemProps = {
  item: Tarjeta;
  indice: number;
  desplazamiento: SharedValue<number>;
  anchoPagina: number;
};

function Item({ item, indice, desplazamiento, anchoPagina }: ItemProps) {
  // Posición relativa de la tarjeta: -1 izquierda, 0 centro, 1 derecha
  const estiloTarjeta = useAnimatedStyle(() => {
    const p = desplazamiento.value / anchoPagina - indice;
    return {
      opacity: interpolate(p, [-1, 0, 1], [0.4, 1, 0.4], 'clamp'),
      transform: [
        { scale: interpolate(p, [-1, 0, 1], [0.75, 1, 0.75], 'clamp') },
        { rotate: `${interpolate(p, [-1, 0, 1], [-15, 0, 15], 'clamp')}deg` },
        { translateY: interpolate(Math.abs(p), [0, 1], [0, 50], 'clamp') },
      ],
    };
  });

  // Efecto parallax del emoji
  const estiloEmoji = useAnimatedStyle(() => {
    const p = desplazamiento.value / anchoPagina - indice;
    return {
      transform: [
        { translateX: interpolate(p, [-1, 0, 1], [-90, 0, 90], 'clamp') },
        { scale: interpolate(p, [-1, 0, 1], [0.5, 1, 0.5], 'clamp') },
      ],
    };
  });

  return (
    <View style={[estilos.pagina, { width: anchoPagina }]}>
      <Animated.View style={[estilos.tarjeta, { backgroundColor: fondos[indice % fondos.length] }, estiloTarjeta]}>
        <Animated.Text style={[estilos.emoji, estiloEmoji]}>{item.emoji}</Animated.Text>
        <Text style={estilos.nombre}>{item.nombre}</Text>
        <Text style={estilos.detalle}>{item.detalle}</Text>
      </Animated.View>
    </View>
  );
}

function Indicador({ indice, desplazamiento, anchoPagina }: Omit<ItemProps, 'item'>) {
  const estilo = useAnimatedStyle(() => {
    const p = Math.abs(desplazamiento.value / anchoPagina - indice);
    return {
      transform: [{ scale: interpolate(p, [0, 1], [1.6, 1], 'clamp') }],
      backgroundColor: p < 0.5 ? Palette.azul : Palette.linea,
    };
  });
  return <Animated.View style={[estilos.punto, estilo]} />;
}

export default function Carrusel() {
  const { width } = useWindowDimensions();
  const desplazamiento = useSharedValue(0);
  const tarjetas = Texts.carrusel.tarjetas;

  const alDesplazar = useAnimatedScrollHandler((e) => {
    desplazamiento.value = e.contentOffset.x;
  });

  return (
    <Pantalla
      ayuda={Texts.carrusel.ayuda}
      pie={
        <View style={estilos.puntos}>
          {tarjetas.map((t, i) => (
            <Indicador key={t.nombre} indice={i} desplazamiento={desplazamiento} anchoPagina={width} />
          ))}
        </View>
      }
    >
      <Animated.FlatList
        data={tarjetas}
        keyExtractor={(t) => t.nombre}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={alDesplazar}
        scrollEventThrottle={16}
        style={estilos.lista}
        renderItem={({ item, index }) => (
          <Item item={item} indice={index} desplazamiento={desplazamiento} anchoPagina={width} />
        )}
      />
    </Pantalla>
  );
}

const estilos = StyleSheet.create({
  lista: {
    alignSelf: 'stretch',
    flexGrow: 0,
  },
  pagina: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  tarjeta: {
    width: '72%',
    aspectRatio: 0.75,
    borderRadius: Sizes.corner + 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Sizes.padding,
    ...sombra,
  },
  emoji: { fontSize: 90 },
  nombre: { color: Palette.blanco, fontSize: 28, fontWeight: '900', marginTop: 16 },
  detalle: { color: Palette.blanco, fontSize: 15, marginTop: 4, opacity: 0.9 },
  puntos: { flexDirection: 'row', gap: 10, paddingVertical: 6 },
  punto: { width: 10, height: 10, borderRadius: 5 },
});
