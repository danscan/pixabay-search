import { useRoute } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { Image, Text, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

export default function ScreenImageDetails(): ReactElement {
  const {
    params: { image },
  } = useRoute();

  return (
    <View>
      <Image source={{ uri: image.largeImageURL }} style={[t.h64]} />
      <Text style={[t.fontMono, t.text2]}>
        {JSON.stringify(image, null, 2)}
      </Text>
    </View>
  );
}
