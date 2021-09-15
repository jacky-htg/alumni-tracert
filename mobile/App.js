/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {PAGES} from './src/routes';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        {Object.keys(PAGES).map(key => (
          <Stack.Screen
            key={key}
            name={PAGES[key].path}
            component={PAGES[key].component}
            options={PAGES[key].options}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
