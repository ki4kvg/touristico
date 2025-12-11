import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { NormalisedPriceOffer } from '@/modules/searchPrices/dto/searchPrices.dto.ts';

type SearchPricesState = {
  data: NormalisedPriceOffer[] | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: SearchPricesState = {
  data: null,
  token: null,
  isLoading: false,
  error: null,
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
    setData(state, action: PayloadAction<NormalisedPriceOffer[]>) {
      state.data = action.payload;
      state.isLoading = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    reset(state) {
      state.data = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { startLoading, setToken, setData, setError, reset } = searchSlice.actions;
export default searchSlice.reducer;
