import debounce from 'lodash/debounce';
import React, { ReactElement } from 'react';
import { SafeAreaView, TextInput, View } from 'react-native';
import { color, t } from 'react-native-tailwindcss';
import useQueryOptions from '../hooks/useQueryOptions';
import QueryOptionsCarousel from './QueryOptionsCarousel';

export default function QueryOptionsInputHeader(): ReactElement {
  const [, { setQuery }] = useQueryOptions();

  return (
    <SafeAreaView style={[t.pB0]}>
      <View style={[t.pX3, t.pT2]}>
        {/* Query Text Input */}
        <TextInput
          onChangeText={debounce((text: string): void => setQuery(text), 300)}
          placeholder="Search Pixabay"
          placeholderTextColor={color.gray600}
          style={[t.p3, t.bgGray400, t.roundedLg, t.textGray900, t.textLg]}
        />
        {/* Carousel */}
        <QueryOptionsCarousel />
      </View>
    </SafeAreaView>
  );
}
