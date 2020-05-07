import React, { ReactElement } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

export default function FetchingMoreIndicator(): ReactElement {
  return (
    <View style={[t.itemsCenter, t.justifyCenter, t.p8]}>
      <ActivityIndicator size="large" />
    </View>
  );
}
