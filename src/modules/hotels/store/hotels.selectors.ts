import type { RootState } from '@/store/store.ts';

export const selectHotels = (state: RootState) => state.hotels.hotels;
export const selectLinkedHotels = (state: RootState) => state.hotels.linkedHotels;
export const selectHotelsIsLoading = (state: RootState) => state.hotels.isLoading;
