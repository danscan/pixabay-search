/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosResponse } from 'axios';
import { InfiniteQueryResult, useInfiniteQuery } from 'react-query';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '16281924-f056639bb347e838973c8cedf';

// docs: https://pixabay.com/api/docs/#api_search_images
interface UseImageQueryOptions {
  q: string;
}

interface CancellablePromise<T> extends Promise<T> {
  cancel?: () => void;
}

type ImagesResponse = {
  total: number;
  totalHits: number;
  hits: ImageType[];
};

export default function useImageQuery({
  q,
}: UseImageQueryOptions): InfiniteQueryResult<ImageType[], number> {
  return useInfiniteQuery(q, fetchImages, {
    // Fetch the next page unless the last page was empty
    getFetchMore: (lastPage, allPages) =>
      lastPage.length ? allPages.length + 1 : false,
  });
}

function fetchImages(q: string, page: number) {
  const cancelTokenSource = axios.CancelToken.source();

  const promise: CancellablePromise<ImageType[]> = axios
    .get<any, AxiosResponse<ImagesResponse>>(API_URL, {
      cancelToken: cancelTokenSource.token,
      params: {
        key: API_KEY,
        page,
        q,
      },
    })
    .then(({ data }) => data.hits);

  promise.cancel = (): void =>
    cancelTokenSource.cancel('Query cancelled by React Query');

  return promise;
}
