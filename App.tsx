import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import FoundAnimalsScreen from './src/screens/FoundAnimalsScreen';
import HomeScreen from './src/screens/HomeScreen';
import LogoutScreen from './src/screens/LogoutScreen';
import LostAnimalsScreen from './src/screens/LostAnimalsScreen';

import RegisterFoundAnimalScreen from './src/screens/RegisterFoundAnimalScreen';
import RegisterLostAnimalScreen from './src/screens/RegisterLostAnimalScreen';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Login">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Animais Encontrados" component={FoundAnimalsScreen} />
          <Drawer.Screen name="Animais Perdidos" component={LostAnimalsScreen} />
          <Drawer.Screen name="Sair" component={LogoutScreen} />
          
          {}
          <Drawer.Screen
            name="RegisterFound"
            component={RegisterFoundAnimalScreen}
            options={{ drawerLabel: () => null, title: null, drawerItemStyle: { height: 0 } }}
          />
          <Drawer.Screen
            name="RegisterLost"
            component={RegisterLostAnimalScreen}
            options={{ drawerLabel: () => null, title: null, drawerItemStyle: { height: 0 } }}
          />

          {}
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{ drawerLabel: () => null, title: null, drawerItemStyle: { height: 0 } }}
          />
          <Drawer.Screen
            name="Register"
            component={RegisterScreen}
            options={{ drawerLabel: () => null, title: null, drawerItemStyle: { height: 0 } }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}