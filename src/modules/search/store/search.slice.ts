import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NormalizedGeoItem } from '../dto/search.dto';

type SearchState = {
  countries: NormalizedGeoItem[];
  geoSearchResults: NormalizedGeoItem[];
  options: NormalizedGeoItem[];
  selected?: { countryId: string | number } | null;
  searchType?: 'country' | 'city' | 'hotel' | undefined;
  isLoading: boolean;
  error?: string | null;
};

const initialState: SearchState = {
  countries: [],
  geoSearchResults: [],
  options: [],
  selected: null,
  searchType: undefined,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCountries(state, action: PayloadAction<NormalizedGeoItem[]>) {
      state.countries = action.payload;
    },
    setGeoSearchResults(state, action: PayloadAction<NormalizedGeoItem[]>) {
      state.geoSearchResults = action.payload;
    },
    setOptions(state, action: PayloadAction<NormalizedGeoItem[]>) {
      state.options = action.payload;
    },
    setSelected(state, action: PayloadAction<{ countryId: string | number } | null>) {
      state.selected = action.payload;
    },
    setSearchType(state, action: PayloadAction<SearchState['searchType']>) {
      state.searchType = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    clearOptions(state) {
      state.options = [];
    },
  },
});

export const {
  setCountries,
  setGeoSearchResults,
  setOptions,
  setSelected,
  setSearchType,
  setLoading,
  setError,
  clearOptions,
} = slice.actions;

export default slice.reducer;
