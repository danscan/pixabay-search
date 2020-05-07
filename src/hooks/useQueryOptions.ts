import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions, RootState } from '../redux';

type UseQueryOptionsReturnType = [
  PixabayImageQueryOptions,
  {
    setQuery: (query: PixabayImageQueryOptions['q']) => void;
    setCategory: (category: PixabayImageQueryOptions['category']) => void;
    setSFW: (sfw: PixabayImageQueryOptions['sfw']) => void;
  }
];

export default function useQueryOptions(): UseQueryOptionsReturnType {
  const queryOptions = useSelector((state: RootState) => state.queryOptions);
  const dispatch = useDispatch();

  const setQuery = useCallback(
    (query: PixabayImageQueryOptions['q']) =>
      dispatch(actions.queryOptionsSetQuery(query)),
    [dispatch]
  );

  const setCategory = useCallback(
    (category: PixabayImageQueryOptions['category']) =>
      dispatch(actions.queryOptionsSetCategory(category)),
    [dispatch]
  );

  const setSFW = useCallback(
    (sfw: PixabayImageQueryOptions['sfw']) =>
      dispatch(actions.queryOptionsSetSFW(sfw)),
    [dispatch]
  );

  return [
    queryOptions,
    {
      setQuery,
      setCategory,
      setSFW,
    },
  ];
}
