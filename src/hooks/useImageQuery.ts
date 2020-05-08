/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosResponse } from 'axios';
import { InfiniteQueryResult, useInfiniteQuery } from 'react-query';
import { API_KEY, API_URL } from '../pixabay/api';

type ImagesResponse = {
  total: number;
  totalHits: number;
  hits: PixabayImage[];
};

export default function useImageQuery({
  category,
  q,
  sfw,
}: PixabayImageQueryOptions): InfiniteQueryResult<PixabayImage[], number> {
  return useInfiniteQuery([q, category, sfw], fetchImages, {
    // Don't auto-refetch the query unless the query key changes
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,

    // Fetch the next page unless the last page was empty
    getFetchMore: (lastPage, allPages) =>
      lastPage.length ? allPages.length + 1 : false,
  });
}

interface CancellablePromise<T> extends Promise<T> {
  cancel?: () => void;
}

function fetchImages(
  q?: string,
  category?: PixabayCategory,
  sfw?: boolean,
  page?: number
): CancellablePromise<PixabayImage[]> {
  const cancelTokenSource = axios.CancelToken.source();

  const promise: CancellablePromise<PixabayImage[]> = axios
    .get<unknown, AxiosResponse<ImagesResponse>>(API_URL, {
      cancelToken: cancelTokenSource.token,
      params: {
        category,
        key: API_KEY,
        page,
        per_page: 40,
        q: q || undefined,
        safesearch: sfw,
      },
    })
    .then(({ data }) => data.hits);

  promise.cancel = (): void =>
    cancelTokenSource.cancel('Query cancelled by React Query');

  return promise;
}
