import React, { ReactElement } from 'react';
import { Text } from 'react-native';
import { t } from 'react-native-tailwindcss';

export default function ScreenImageDetails(): ReactElement {
  return <Text style={[t.text4xl, t.textGray800]}>Image Details</Text>;
}
