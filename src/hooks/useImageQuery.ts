/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '16281924-f056639bb347e838973c8cedf';

// docs: https://pixabay.com/api/docs/#api_search_images
interface UseImageQueryOptions {
  colors?: string[]; // TODO: enum
  imageType?: string; // TODO: enum
  page: number;
  perPage?: number;
  q: string;
  safeSearch?: boolean;
}

type Image = {
  comments: number;
  downloads: number;
  favorites: number;
  id: number;
  imageHeight: number;
  imageSize: number;
  imageWidth: number;
  largeImageURL: string;
  likes: number;
  pageURL: string;
  previewHeight: number;
  previewURL: string;
  previewWidth: number;
  tags: string;
  type: string;
  user_id: number;
  user: string;
  userImageURL: string;
  views: number;
  webformatHeight: number;
  webformatURL: string;
  webformatWidth: number;
};

type ImagesResponse = {
  total: number;
  totalHits: number;
  hits: Image[];
};

type UseImageQueryReturnValue = {
  error: AxiosError | null;
  loading: boolean;
  images: Image[] | null;
};

// This is architected to support canceling pending requests when:
// 1. the component unmounts
// 2. the query options change
// ^^ both are handled via useEffect's cleanup (https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1)

// TODO: Return a refetch function
export default function useImageQuery({
  colors = [],
  imageType = 'all', // TODO: enum
  page = 1,
  perPage = 20,
  q,
  safeSearch = true,
}: UseImageQueryOptions): UseImageQueryReturnValue {
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [images, setImages] = useState<Image[] | null>(null);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    // Begin loading
    setLoading(true);

    axios
      .get<any, AxiosResponse<ImagesResponse>>(API_URL, {
        cancelToken: cancelTokenSource.token,
        params: {
          // colors,
          image_type: imageType,
          key: API_KEY,
          page,
          per_page: perPage,
          q,
          safesearch: safeSearch,
        },
      })
      .then(({ data }) => setImages(data.hits)) // set images
      .catch((_error) => setError(_error)) // set error
      .then(() => setLoading(false)); // stop loading upon response/error

    // TODO: Refine the cancellation message
    return (): void => {
      cancelTokenSource.cancel('Request canceled by cleanup');
    };
  }, [imageType, page, perPage, q, safeSearch]);

  console.log('error', error);
  console.log('loading', loading);
  console.log('images', images);

  return {
    error,
    loading,
    images,
  };
}
