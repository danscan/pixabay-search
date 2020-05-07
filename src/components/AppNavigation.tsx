import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { ReactElement } from 'react';
import ImageDetails from '../screens/ImageDetails';
import ImageSearch from '../screens/ImageSearch';

const Stack = createStackNavigator();

export default function AppNavigation(): ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ImageSearch">
        <Stack.Screen
          name="ImageSearch"
          component={ImageSearch}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ImageDetails" component={ImageDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
