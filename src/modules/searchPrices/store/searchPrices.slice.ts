import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NormalisedPriceOffer } from '@/modules/searchPrices/dto/searchPrices.dto.ts';

type SearchPricesState = {
  prices: NormalisedPriceOffer[] | null;
  token: string | null;
  isLoading: boolean;
  isAborting: boolean;
  error: string | null;
  activeRequestId: string | null;
};

const initialState: SearchPricesState = {
  prices: null,
  token: null,
  isLoading: false,
  isAborting: false,
  error: null,
  activeRequestId: null,
};

const searchSlice = createSlice({
  name: 'searchPrices',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
      state.error = null;
    },
    setToken(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
    },
    setPrices(state, action: PayloadAction<NormalisedPriceOffer[]>) {
      state.prices = action.payload;
      state.isLoading = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    setIsAborting(state, action: PayloadAction<boolean>) {
      state.isAborting = action.payload;
    },
    resetPrices(state) {
      state.prices = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
      state.isAborting = false;
    },
  },
});

export const { startLoading, setToken, setPrices, setError, resetPrices, setIsAborting } = searchSlice.actions;
export default searchSlice.reducer;
