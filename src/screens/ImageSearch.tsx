import { useNavigation } from '@react-navigation/native';
import flatten from 'lodash/flatten';
import React, { ReactElement, useMemo } from 'react';
import { View } from 'react-native';
import { t } from 'react-native-tailwindcss';
import ErrorRetry from '../components/ErrorRetry';
import FetchingMoreIndicator from '../components/FetchingMoreIndicator';
import ImagesIndexList from '../components/ImagesIndexList';
import NoResults from '../components/NoResults';
import QueryOptionsInputHeader from '../components/QueryOptionsInputHeader';
import useImageQuery from '../hooks/useImageQuery';
import useQueryOptions from '../hooks/useQueryOptions';

export default function ScreenImageSearch(): ReactElement {
  const navigation = useNavigation();

  // Query Options
  const [queryOptions] = useQueryOptions();

  const {
    canFetchMore,
    data,
    error,
    fetchMore,
    refetch,
    isFetching,
    isFetchingMore,
  } = useImageQuery(queryOptions);

  // Flatten array of page result arrays
  const images = useMemo(() => flatten(data), [data]);

  return (
    <View style={t.flex1}>
      <QueryOptionsInputHeader />
      {/* Error-Retry UI */}
      {error && (
        <ErrorRetry
          onPressRetry={(): void => {
            refetch({ force: true });
          }}
          title="Failed to search Pixabay"
        />
      )}
      {/* Images List */}
      <ImagesIndexList
        images={images}
        onPressImage={(image: PixabayImage): void =>
          navigation.navigate('ImageDetails', { image })
        }
        refreshing={isFetching}
        onRefresh={(): void => {
          refetch();
        }}
        onEndReached={(): void => {
          if (!isFetching && canFetchMore) {
            fetchMore();
          }
        }}
        ListFooterComponent={isFetchingMore ? FetchingMoreIndicator : null}
        ListEmptyComponent={(): ReactElement | null =>
          !isFetching ? <NoResults /> : null
        }
        style={t.flex1}
      />
    </View>
  );
}
