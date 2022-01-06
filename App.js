import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import SortScreen from './src/screens/SortScreen';

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
          name = "Sort"
          component={SortScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
