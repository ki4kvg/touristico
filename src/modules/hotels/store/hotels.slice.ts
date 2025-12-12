import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LinkedHotel, NormalisedHotel } from '@/modules/hotels/dto/hotels.dto.ts';
import type { Hotel, PriceOffer } from '@/types/api.ts';

type HotelsState = {
  hotels: NormalisedHotel[];
  linkedHotels: LinkedHotel[];
  hotelDetails: Hotel | null;
  priceOffer: PriceOffer | null;
  isLoading: boolean;
};

const initialState: HotelsState = {
  hotels: [],
  linkedHotels: [],
  hotelDetails: null,
  priceOffer: null,
  isLoading: false,
};

const slice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setHotels(state, action: PayloadAction<NormalisedHotel[]>) {
      state.hotels = action.payload;
    },
    setLinkedHotels(state, action: PayloadAction<LinkedHotel[]>) {
      state.linkedHotels = action.payload;
    },
    setCurrentHotel(state, action: PayloadAction<Hotel>) {
      state.hotelDetails = action.payload;
    },
    setCurrentPriceOffer(state, action: PayloadAction<PriceOffer>) {
      state.priceOffer = action.payload;
    },
    startLoading(state) {
      state.isLoading = true;
    },
    stopLoading(state) {
      state.isLoading = false;
    },
  },
});

export const { setHotels, setLinkedHotels, startLoading, setCurrentHotel, stopLoading, setCurrentPriceOffer } =
  slice.actions;

export default slice.reducer;
