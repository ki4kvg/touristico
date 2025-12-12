import { createAsyncThunk } from '@reduxjs/toolkit';
import { setData, setError, setToken, startLoading } from './searchPrices.slice.ts';
import type { NormalisedPriceOffer } from '@/modules/searchPrices/dto/searchPrices.dto.ts';
import { api } from '@/store/api.ts';
import type { AppDispatch, RootState } from '@/store/store.ts';
import { mapPriceResult } from '@/modules/searchPrices/mappers/searchPrices.mapper.ts';
import type { NavigateFunction } from 'react-router-dom';

interface SearchPayload {
  countryId: string;
  navigate: NavigateFunction;
}

export const searchPricesThunk = createAsyncThunk<
  NormalisedPriceOffer[],
  SearchPayload,
  { dispatch: AppDispatch; state: RootState }
>('searchPrices/search', async ({ countryId, navigate }, { dispatch }) => {
  dispatch(startLoading());

  try {
    const startRes = await dispatch(api.endpoints.startSearchPrices.initiate({ countryId: countryId }));
    const token = startRes.data!.token;
    const waitUntil = new Date(startRes.data!.waitUntil).getTime();

    dispatch(setToken({ token }));

    const maxRetries = 2;
    let retries = 0;
    let result: any = null;

    while (true) {
      const now = Date.now();
      const waitTime = waitUntil - now;
      if (waitTime > 0) {
        await new Promise((res) => setTimeout(res, waitTime));
      }

      const res = await dispatch(api.endpoints.getSearchPrices.initiate({ token: token }));

      if (!('code' in res)) {
        result = res;
        break;
      }

      if (res.code === 404) {
        if (retries < maxRetries) {
          retries++;
        } else {
          throw new Error(res.data?.message || 'Search failed after retries');
        }
      }
    }

    const mapped = mapPriceResult(result.prices);

    dispatch(setData(mapped));

    if (mapped.length > 0) navigate(`/tours/${countryId}`);

    return mapped;
  } catch (error: any) {
    dispatch(setError(error.message || 'Unknown error'));
    throw error;
  }
});
