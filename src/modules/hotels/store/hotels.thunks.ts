import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/store/api.ts';
import { hotelsService } from '@/modules/hotels/services/hotels.service.ts';
import { mapHotel } from '@/modules/hotels/mappers/hotels.mapper.ts';
import type { NavigateFunction } from 'react-router-dom';
import type { AppDispatch, RootState } from '@/store/store.ts';
import { setHotels, setLinkedHotels, setLoading } from '@/modules/hotels/store/hotels.slice.ts';
import type { NormalisedPriceOffer } from '@/modules/searchPrices/dto/searchPrices.dto.ts';

interface GetHotelsPayload {
  countryId: string;
  navigate: NavigateFunction;
  prices: NormalisedPriceOffer[];
}

export const getHotelsThunk = createAsyncThunk<void, GetHotelsPayload, { dispatch: AppDispatch; state: RootState }>(
  'getHotels/execute',
  async ({ countryId, navigate, prices }, { dispatch }) => {
    dispatch(setLoading(true));
    const hotels = await dispatch(api.endpoints.getHotels.initiate({ countryId })).unwrap();

    const mappedHotels = Object.values(hotels).map(mapHotel);

    dispatch(setHotels(mappedHotels));

    if (!prices || !hotels || mappedHotels.length === 0 || prices.length === 0) {
      navigate(-1);
      dispatch(setLoading(false));
      return;
    }

    const final = hotelsService.linkAndMapOffersWithHotels(prices, mappedHotels);

    dispatch(setLinkedHotels(final));
    dispatch(setLoading(false));
  },
);
