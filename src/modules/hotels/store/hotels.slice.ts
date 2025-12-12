import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LinkedHotel, NormalisedHotel } from '@/modules/hotels/dto/hotels.dto.ts';

type HotelsState = {
  hotels: NormalisedHotel[];
  linkedHotels: LinkedHotel[];
  isLoading: boolean;
};

const initialState: HotelsState = {
  hotels: [],
  linkedHotels: [],
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
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setHotels, setLinkedHotels, setLoading } = slice.actions;

export default slice.reducer;
