import type { RootState } from '@/store/store.ts';

export const selectSearchOptions = (state: RootState) => state.search.options;
export const selectCountries = (state: RootState) => state.search.countries;
export const selectGeoSearchResults = (state: RootState) => state.search.geoSearchResults;
export const selectSearchIsLoading = (state: RootState) => state.search.isLoading;
export const selectSearchType = (state: RootState) => state.search.searchType;
