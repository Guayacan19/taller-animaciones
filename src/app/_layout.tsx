import { StatusBar } from 'expo-status-bar';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from 'expo-router/drawer';
import { StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { menu } from '../menu';
import { Palette } from '../theme';
import { ESTUDIANTE, Texts } from '../theme/texts';

function ContenidoMenu(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={estilos.cabecera}>
        <Text style={estilos.logo}>✨</Text>
        <Text style={estilos.titulo}>{Texts.app}</Text>
        <Text style={estilos.subtitulo}>{Texts.subtitulo}</Text>
      </View>
      <DrawerItemList {...props} />
      <Text style={estilos.autor}>{ESTUDIANTE}</Text>
    </DrawerContentScrollView>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={estilos.raiz}>
      <StatusBar style="dark" />
      <Drawer
        drawerContent={(props) => <ContenidoMenu {...props} />}
        screenOptions={{
          headerTintColor: Palette.tinta,
          headerStyle: { backgroundColor: Palette.tarjeta },
          headerShadowVisible: false,
          drawerActiveTintColor: Palette.azul,
          drawerActiveBackgroundColor: '#E3F2F8',
          drawerInactiveTintColor: Palette.tinta,
          drawerLabelStyle: { fontWeight: '600' },
          drawerType: 'slide',
          // Los gestos de los ejercicios no deben abrir el menú por accidente
          swipeEnabled: false,
        }}
      >
        {menu.map((item) => (
          <Drawer.Screen
            key={item.ruta}
            name={item.ruta}
            options={{
              title: item.titulo,
              drawerLabel: `${item.icono}  ${item.titulo}`,
            }}
          />
        ))}
      </Drawer>
    </GestureHandlerRootView>
  );
}

const estilos = StyleSheet.create({
  raiz: { flex: 1 },
  cabecera: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Palette.linea,
  },
  logo: { fontSize: 34 },
  titulo: { fontSize: 20, fontWeight: '800', color: Palette.tinta, marginTop: 6 },
  subtitulo: { fontSize: 13, color: Palette.tintaSuave, marginTop: 2 },
  autor: { textAlign: 'center', color: Palette.tintaSuave, marginTop: 24, fontSize: 12 },
});
