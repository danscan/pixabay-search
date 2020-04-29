import React, { ReactElement } from 'react';
import { Text, View, Button, Image } from 'react-native';
import { t } from 'react-native-tailwindcss';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import useImageQuery from '../hooks/useImageQuery';

export default function ScreenImagesIndex(): ReactElement {
  const navigation = useNavigation();

  const { loading, images, error } = useImageQuery({
    q: 'puppy',
    page: 1,
  });

  return (
    <FlatList
      data={images}
      refreshing={loading}
      renderItem={({ item }) => (
        // <Text style={[t.fontMono]}>{JSON.stringify(item, null, 2)}</Text>
        <Image style={[t.wFull, t.h16]} source={{ uri: item.previewURL }} />
      )}
      style={t.flex1}
    />
  );
}
