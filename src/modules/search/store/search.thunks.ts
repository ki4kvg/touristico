import { createAsyncThunk } from '@reduxjs/toolkit';
import { setOptions, setError, setCountries, setGeoSearchResults, startLoading } from './search.slice';
import { searchService } from '../services/search.service';
import type { RootState } from '@/store/store.ts';
import { api } from '@/store/api.ts';

export const loadCountriesThunk = createAsyncThunk('search/loadCountries', async (_, { dispatch }) => {
  try {
    dispatch(startLoading());
    const countriesMap = await dispatch(api.endpoints.getCountries.initiate());
    const normalized = searchService.normalizeCountries(countriesMap.data);
    dispatch(setCountries(normalized));
    return normalized;
  } catch (e: any) {
    dispatch(setError(String(e.message ?? e)));
    throw e;
  }
});

export const searchGeoThunk = createAsyncThunk('search/searchGeo', async (query: string, { dispatch }) => {
  try {
    dispatch(startLoading());
    const geoMap = await dispatch(api.endpoints.searchGeo.initiate({ query: query }));
    const normalizedGeo = searchService.normalizeGeo(geoMap.data);
    dispatch(setGeoSearchResults(normalizedGeo));
    return normalizedGeo;
  } catch (e: any) {
    dispatch(setError(String(e.message ?? e)));
    throw e;
  }
});

export const resolveOptionsThunk = createAsyncThunk<
  void,
  { isOpen: boolean; searchValue: string; searchType?: 'country' | 'city' | 'hotel' | undefined },
  { state: RootState }
>('search/resolveOptions', async ({ isOpen, searchValue, searchType }, { dispatch, getState }) => {
  const state = getState().search;
  if (!state.countries.length) {
    await dispatch(loadCountriesThunk());
  }

  if (searchValue) {
    await dispatch(searchGeoThunk(searchValue));
  }

  const finalState = getState().search;
  const options = searchService.resolveOptions({
    isOpen,
    searchValue,
    searchType,
    countryList: finalState.countries,
    geoSearchList: finalState.geoSearchResults,
  });

  dispatch(setOptions(options));
});
