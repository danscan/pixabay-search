import React from 'react';
import { Image, Text, View, useWindowDimensions } from 'react-native';
import { t } from 'react-native-tailwindcss';
import useWindowOrientation, {
  Orientation,
} from '../hooks/useWindowOrientation';

interface ImageListingProps {
  image: ImageType;
}

export default function ImageListing({ image }: ImageListingProps) {
  return (
    <View style={[]}>
      {/* Image */}
      <Image
        source={{ uri: image.largeImageURL }}
        resizeMode="cover"
        style={[{ aspectRatio: 1 }]}
      />

      {/* Meta Info */}
      <View style={[t.p3, t.pB6, t.flexRow, t.justifyBetween]}>
        <Text style={[t.textlg, t.textGray700]}>{image.user}</Text>
        {/* Likes, comments, open web page? */}
        <Text style={[t.textlg, t.textGray700]}>{image.likes} Likes</Text>
      </View>
    </View>
  );
}
