import React, { ReactElement } from 'react';
import { Text, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

export default function NoResults(): ReactElement {
  return (
    <View style={[t.flex1, t.itemsCenter, t.justifyCenter, t.p8, t.pX6]}>
      <Text style={[t.fontBold, t.mB4, t.textGray900, t.textXl, t.uppercase]}>
        Hmmmm…
      </Text>
      <Text style={[t.pX4, t.textCenter, t.textGray600]}>
        That didn’t return any results. Try another search term.
      </Text>
    </View>
  );
}
