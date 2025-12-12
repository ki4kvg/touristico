import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/store/api.ts';
import { hotelsService } from '@/modules/hotels/services/hotels.service.ts';
import { mapHotel } from '@/modules/hotels/mappers/hotels.mapper.ts';
import type { AppDispatch, RootState } from '@/store/store.ts';
import {
  setCurrentHotel,
  setCurrentPriceOffer,
  setHotels,
  setLinkedHotels,
  startLoading,
  stopLoading,
} from '@/modules/hotels/store/hotels.slice.ts';
import type { NormalisedPriceOffer } from '@/modules/searchPrices/dto/searchPrices.dto.ts';

interface GetHotelsPayload {
  countryId: string;
  prices: NormalisedPriceOffer[];
}

export const getHotelsThunk = createAsyncThunk<void, GetHotelsPayload, { dispatch: AppDispatch; state: RootState }>(
  'getHotels/execute',
  async ({ countryId, prices }, { dispatch }) => {
    dispatch(startLoading());
    try {
      const hotels = await dispatch(api.endpoints.getHotels.initiate({ countryId })).unwrap();

      const mappedHotels = Object.values(hotels).map(mapHotel);

      dispatch(setHotels(mappedHotels));

      const final = hotelsService.linkAndMapOffersWithHotels(prices, mappedHotels);

      dispatch(setLinkedHotels(final));
    } finally {
      dispatch(stopLoading());
    }
  },
);

interface GetHotelDetailsPayload {
  hotelId: string;
  priceId: string;
}

export const getHotelDetailsThunk = createAsyncThunk<
  void,
  GetHotelDetailsPayload,
  { dispatch: AppDispatch; state: RootState }
>('getHotels/execute', async ({ hotelId, priceId }, { dispatch }) => {
  dispatch(startLoading());
  try {
    const hotel = await dispatch(api.endpoints.getHotel.initiate({ hotelId: Number(hotelId) })).unwrap();
    dispatch(setCurrentHotel(hotel));

    const price = await dispatch(api.endpoints.getPrice.initiate({ priceId })).unwrap();
    dispatch(setCurrentPriceOffer(price));
  } finally {
    dispatch(stopLoading());
  }
});
