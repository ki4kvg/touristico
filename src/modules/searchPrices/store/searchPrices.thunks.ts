import { createAsyncThunk } from '@reduxjs/toolkit';
import { resetPrices, setPrices, setError, setToken, startLoading, setIsAborting } from './searchPrices.slice.ts';
import { api } from '@/store/api.ts';
import type { AppDispatch, RootState } from '@/store/store.ts';
import { mapPriceResult } from '@/modules/searchPrices/mappers/searchPrices.mapper.ts';
import type { NavigateFunction } from 'react-router-dom';

interface SearchPayload {
  countryId: string;
  navigate: NavigateFunction;
}

const MAX_RETRIES = 2;
const MAX_425_ATTEMPTS = 5;

export const searchPricesThunk = createAsyncThunk<void, SearchPayload, { dispatch: AppDispatch; state: RootState }>(
  'searchPrices/search',
  async ({ countryId, navigate }, { dispatch, getState }) => {
    const activeToken = getState().searchPrices.token;
    if (activeToken) {
      await dispatch(abortAndResetSearchThunk());
    }
    dispatch(startLoading());

    try {
      const startRes = await dispatch(api.endpoints.startSearchPrices.initiate({ countryId: countryId })).unwrap();

      if (!startRes || !startRes.token || !startRes.waitUntil) {
        throw new Error('Failed to start search');
      }

      const token = startRes.token;
      const waitUntil = new Date(startRes.waitUntil).getTime();

      dispatch(setToken({ token }));

      let retries = 0;
      let dataNotReadyAttempts = 0;
      let result: any = null;

      while (true) {
        const now = Date.now();
        const waitTime = waitUntil - now;
        if (waitTime > 0) {
          await new Promise((res) => setTimeout(res, waitTime));
        }

        const res = await dispatch(api.endpoints.getSearchPrices.initiate({ token: token })).unwrap();

        if (!res) {
          return;
        }

        if (!('code' in res)) {
          result = res;
          break;
        }

        if (res.code === 404) {
          if (retries < MAX_RETRIES) {
            retries++;
          } else {
            throw new Error(res.message || 'Search failed after retries');
          }
        }

        if (res.code === 425) {
          dataNotReadyAttempts++;
          if (dataNotReadyAttempts >= MAX_425_ATTEMPTS) {
            throw new Error('Search not ready after maximum attempts');
          }
        }
      }

      const mapped = mapPriceResult(result.prices);

      dispatch(setPrices(mapped));

      if (mapped.length > 0) navigate(`/tours/${countryId}`);
    } catch (error: any) {
      dispatch(setError(error.message || 'Unknown error'));
      throw error;
    }
  },
);

export const abortAndResetSearchThunk = createAsyncThunk<void, void, { dispatch: AppDispatch; state: RootState }>(
  'searchPrices/abortReset',
  async (_, { dispatch, getState }) => {
    dispatch(setIsAborting(true));
    const { token: activeToken } = getState().searchPrices;
    if (activeToken) {
      try {
        await dispatch(api.endpoints.stopSearchPrices.initiate({ token: activeToken }));
      } catch (error) {
        console.error(error, 'Aborting thunk error');
      }
    }
    dispatch(resetPrices());
  },
);
