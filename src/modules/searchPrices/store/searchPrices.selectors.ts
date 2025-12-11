import type { RootState } from '@/store/store.ts';

export const selectPriceSearchResults = (state: RootState) => state.searchPrices.data;
export const selectPriceSearchIsLoading = (state: RootState) => state.searchPrices.isLoading;
export const selectPriceSearchToken = (state: RootState) => state.searchPrices.token;
export const selectPriceSearchError = (state: RootState) => state.searchPrices.error;
