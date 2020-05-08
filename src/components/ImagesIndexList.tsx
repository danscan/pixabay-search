/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement } from 'react';
import {
  FlatList,
  FlatListProperties,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { colors, t } from 'react-native-tailwindcss';
import useWindowIsLandscape from '../hooks/useWindowIsLandscape';
import Image from './Image';

interface ImagesIndexListProps
  extends Omit<FlatListProperties<PixabayImage>, 'data' | 'renderItem'> {
  images: PixabayImage[];
  onPressImage: (image: PixabayImage) => void;
}

export default function ImagesIndexList({
  images,
  onPressImage,
  ...flatListProps
}: ImagesIndexListProps): ReactElement {
  const windowIsLandscape = useWindowIsLandscape();
  const windowDimensions = useWindowDimensions();

  const aspectRatio = windowDimensions.width / windowDimensions.height;
  const squareSize = windowIsLandscape
    ? (windowDimensions.height / 3) * (aspectRatio * 0.5)
    : windowDimensions.width / 3;

  return (
    <FlatList
      data={images}
      numColumns={3}
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="handled"
      keyExtractor={({ id }): string => String(id)}
      initialNumToRender={12}
      {...flatListProps}
      columnWrapperStyle={[t.justifyCenter]}
      renderItem={({ item }): ReactElement => (
        <TouchableOpacity onPress={(): void => onPressImage(item)}>
          <Image
            source={{ uri: item.largeImageURL }}
            style={[
              { aspectRatio: 1, width: squareSize },
              {
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: colors.white,
              },
              t.bgGray400,
            ]}
          />
        </TouchableOpacity>
      )}
      style={t.flex1}
    />
  );
}
