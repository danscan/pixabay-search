import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useMemo, useState } from 'react';
import { Image, ActivityIndicator, View } from 'react-native';
import {
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native-gesture-handler';
import { t } from 'react-native-tailwindcss';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImageListing from '../components/ImageListing';
import useDebouncedValue from '../hooks/useDebouncedValue';
import useImageQuery from '../hooks/useImageQuery';
import useWindowOrientation, {
  Orientation,
} from '../hooks/useWindowOrientation';
import getDefaultSearch from '../utils/getDefaultSearch';

export default function ScreenImagesIndex(): ReactElement {
  const navigation = useNavigation();
  const [queryText, setQueryText] = useState<string>(getDefaultSearch());
  const query = useDebouncedValue<string>(queryText, 300);

  const windowOrientation = useWindowOrientation();

  const {
    canFetchMore,
    data,
    fetchMore,
    refetch,
    isFetching,
    isFetchingMore,
  } = useImageQuery({
    q: query,
    safeSearch: false,
  });

  const images = useMemo(() => {
    return data.reduce((acc, page) => [...acc, ...page], []);
  }, [data]);

  return (
    <FlatList
      data={images}
      keyExtractor={({ id }) => String(id)}
      key={windowOrientation}
      refreshing={isFetching}
      onRefresh={() => refetch()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('ImageDetails', { image: item })}
        >
          <ImageListing image={item} />
        </TouchableOpacity>
      )}
      onEndReached={() => {
        if (!isFetchingMore && canFetchMore) {
          fetchMore();
        }
      }}
      ListHeaderComponent={
        <SafeAreaView style={[t.pB0]}>
          <View style={[t.p3]}>
            <TextInput
              onChangeText={(text: string): void => setQueryText(text)}
              placeholder={`Search Pixabay for "puppies"`}
              style={[t.p3, t.bgGray400, t.roundedLg, t.textLg]}
              value={queryText}
            />
          </View>
        </SafeAreaView>
      }
      ListFooterComponent={
        isFetchingMore ? (
          <View style={[t.itemsCenter, t.justifyCenter, t.p16]}>
            <ActivityIndicator size="large" />
          </View>
        ) : null
      }
      contentContainerStyle={[t.maxW64]}
      style={t.flex1}
    />
  );
}
