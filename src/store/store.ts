import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/store/api.ts';
import searchReducer from '@/modules/search/store/search.slice';
import searchPricesReducer from '@/modules/searchPrices/store/searchPrices.slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    search: searchReducer,
    searchPrices: searchPricesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
