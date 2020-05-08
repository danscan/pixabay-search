/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, useState } from 'react';
import { Animated, ImageProperties, View } from 'react-native';
import { t } from 'react-native-tailwindcss';

export default function FadeImage(imageProps: ImageProperties): ReactElement {
  const [opacity] = useState(new Animated.Value(0));

  return (
    <View style={imageProps.style}>
      <Animated.Image
        {...imageProps}
        progressiveRenderingEnabled
        onLoad={(): void => {
          Animated.spring(opacity, {
            toValue: 1,
            bounciness: 0,
            useNativeDriver: true,
          }).start();
        }}
        style={[t.absolute, t.inset0, { opacity }]}
      />
    </View>
  );
}
