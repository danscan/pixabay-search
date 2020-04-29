import React, { ReactElement } from 'react';
import AppNavigation from './components/AppNavigation';

declare let global: { HermesInternal: null | {} };

export default function App(): ReactElement {
  return <AppNavigation />;
}
