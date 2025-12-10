import { configureStore } from '@reduxjs/toolkit';
import { api } from '@/store/api.ts';
import searchReducer from '@/modules/search/store/search.slice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
