import { combineReducers, createStore } from 'redux';
import { createReducer, createAction, PayloadAction } from '@reduxjs/toolkit';

// Actions
export const actions = {
  queryOptionsSetQuery: createAction<
    PixabayImageQueryOptions['q'],
    'query-options-set-query'
  >('query-options-set-query'),

  queryOptionsSetCategory: createAction<
    PixabayImageQueryOptions['category'],
    'query-options-set-category'
  >('query-options-set-category'),

  queryOptionsSetSFW: createAction<
    PixabayImageQueryOptions['sfw'],
    'query-options-set-sfw'
  >('query-options-set-sfw'),
};

// Initial State
const initialQueryOptions: PixabayImageQueryOptions = {
  q: undefined,
  category: undefined,
  sfw: true,
};

// Query Options Reducer
export type RootState = ReturnType<typeof rootReducer>;
const queryOptions = createReducer(initialQueryOptions, {
  [actions.queryOptionsSetQuery.type]: (
    state,
    action: PayloadAction<PixabayImageQueryOptions['q']>
  ) => ({ ...state, q: action.payload }),

  [actions.queryOptionsSetCategory.type]: (
    state,
    action: PayloadAction<PixabayImageQueryOptions['category']>
  ) => ({ ...state, category: action.payload }),

  [actions.queryOptionsSetSFW.type]: (
    state,
    action: PayloadAction<PixabayImageQueryOptions['sfw']>
  ) => ({ ...state, sfw: action.payload }),
});

// Root Reducer
const rootReducer = combineReducers({
  queryOptions,
});

// Store
export default createStore(rootReducer);
