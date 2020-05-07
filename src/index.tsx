import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import AppNavigation from './components/AppNavigation';
import store from './redux';

declare let global: { HermesInternal: null | {} };

export default function App(): ReactElement {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
