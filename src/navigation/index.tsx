import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LostAnimalsScreen from '../screens/LostAnimalsScreen';
import FoundAnimalsScreen from '../screens/FoundAnimalsScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Perdidos" component={LostAnimalsScreen} />
        <Tab.Screen name="Encontrados" component={FoundAnimalsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}