import type { RootState } from '@/store/store.ts';

export const selectHotels = (state: RootState) => state.hotels.hotels;
export const selectLinkedHotels = (state: RootState) => state.hotels.linkedHotels;
export const selectHotelsIsLoading = (state: RootState) => state.hotels.isLoading;
export const selectCurrentHotel = (state: RootState) => state.hotels.hotelDetails;
export const selectCurrentPriceOffer = (state: RootState) => state.hotels.priceOffer;
