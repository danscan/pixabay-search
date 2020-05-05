import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { ReactElement } from 'react';
import ImageDetails from '../screens/ImageDetails';
import ImagesIndex from '../screens/ImagesIndex';

const Stack = createStackNavigator();

export default function AppNavigation(): ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ImagesIndex">
        <Stack.Screen
          name="ImagesIndex"
          component={ImagesIndex}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="ImageDetails" component={ImageDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
