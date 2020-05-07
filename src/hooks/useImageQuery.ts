/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosResponse } from 'axios';
import { InfiniteQueryResult, useInfiniteQuery } from 'react-query';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '16281924-f056639bb347e838973c8cedf';

type ImagesResponse = {
  total: number;
  totalHits: number;
  hits: PixabayImage[];
};

export default function useImageQuery({
  category,
  color,
  q,
  sfw,
}: PixabayImageQueryOptions): InfiniteQueryResult<PixabayImage[], number> {
  return useInfiniteQuery([q, category, color, sfw], fetchImages, {
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
  color?: PixabayColor,
  sfw?: boolean,
  page?: number
): CancellablePromise<PixabayImage[]> {
  const cancelTokenSource = axios.CancelToken.source();

  const promise: CancellablePromise<PixabayImage[]> = axios
    .get<any, AxiosResponse<ImagesResponse>>(API_URL, {
      cancelToken: cancelTokenSource.token,
      params: {
        category,
        colors: color,
        key: API_KEY,
        page,
        q: q || undefined,
        safesearch: sfw,
      },
    })
    .then(({ data }) => data.hits);

  promise.cancel = (): void =>
    cancelTokenSource.cancel('Query cancelled by React Query');

  return promise;
}
