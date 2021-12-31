import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import SortingScreen from './src/screens/SortingScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'dodgerblue',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTintColor: 'black',
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Sorting"
          component={SortingScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
