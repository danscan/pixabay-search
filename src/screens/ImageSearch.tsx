import { useNavigation } from '@react-navigation/native';
import React, { ReactElement, useMemo, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import FetchingMoreIndicator from '../components/FetchingMoreIndicator';
import ImagesIndexList from '../components/ImagesIndexList';
import QueryOptionsInputHeader from '../components/QueryOptionsInputHeader';
import useImageQuery from '../hooks/useImageQuery';
import useWindowOrientation from '../hooks/useWindowIsLandscape';
import useQueryOptions from '../hooks/useQueryOptions';

export default function ScreenImageSearch(): ReactElement {
  const navigation = useNavigation();

  // Query Options
  const [queryOptions] = useQueryOptions();

  // Unused for now...
  const windowOrientation = useWindowOrientation();

  const {
    canFetchMore,
    data,
    fetchMore,
    refetch,
    isFetching,
    isFetchingMore,
  } = useImageQuery(queryOptions);

  const images = useMemo(() => {
    return data.reduce((acc, page) => [...acc, ...page], []);
  }, [data]);

  return (
    <View style={t.flex1}>
      <QueryOptionsInputHeader />
      <ImagesIndexList
        images={images}
        onPressImage={(image: PixabayImage): void =>
          navigation.navigate('ImageDetails', { image })
        }
        refreshing={isFetching}
        onRefresh={() => refetch()}
        onEndReached={() => {
          if (!isFetching && canFetchMore) {
            fetchMore();
          }
        }}
        ListFooterComponent={isFetchingMore ? FetchingMoreIndicator : null}
        contentContainerStyle={[t.maxW4xl]}
        style={t.flex1}
      />
    </View>
  );
}
