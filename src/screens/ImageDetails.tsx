import { useRoute } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import Image from '../components/Image';

export default function ScreenImageDetails(): ReactElement {
  const { params } = useRoute();
  const image = params?.image as PixabayImage;

  return (
    <View style={t.flex1}>
      <StatusBar barStyle="light-content" />
      {/* (Background) Image */}
      <Image
        resizeMode="contain"
        source={{ uri: image.largeImageURL }}
        style={[t.absolute, t.bgBlack, t.inset0]}
      />
      {/* Details View */}
      <SafeAreaView
        style={[
          { backgroundColor: 'rgba(0,0,0,0.3)' },
          t.justifyEnd,
          t.absolute,
          t.inset0,
          t.pT0,
        ]}
      >
        {/* Details Wrapper */}
        <View style={[t.p8]}>
          <Text
            style={[
              t.mB4,
              t.textXs,
              t.textGray300,
              t.trackingWider,
              t.uppercase,
            ]}
          >
            Image by @{image.user}
          </Text>
          {/* Tags */}
          <View style={[t.flexRow, t.flexWrap]}>
            {image.tags.split(', ').map((tag) => (
              <View
                key={tag}
                style={[t.bgGray700, t.p2, t.rounded, t.mB3, t.mR3]}
              >
                <Text style={t.textWhite}>#{tag}</Text>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
