import React, { ReactElement } from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigation from './components/AppNavigation';
import store from './redux';

declare let global: { HermesInternal: null | {} };

export default function App(): ReactElement {
  return (
    <Provider store={store}>
      {/* This app doesn't use the system appearance API, so it should 
          render a dark-content status bar atop its light-themed UI, 
          except where inverted on the ImageDetails screen. */}
      <StatusBar barStyle="dark-content" />
      {/* App Root Stack Navigation */}
      <AppNavigation />
    </Provider>
  );
}
