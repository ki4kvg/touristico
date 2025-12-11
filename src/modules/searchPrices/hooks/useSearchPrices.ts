import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import {
  selectPriceSearchError,
  selectPriceSearchIsLoading,
  selectPriceSearchResults,
} from '@/modules/searchPrices/store/searchPrices.selectors.ts';
import { searchPricesThunk } from '@/modules/searchPrices/store/searchPrices.thunks.ts';

export const useSearchPrices = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectPriceSearchResults);
  const isLoading = useAppSelector(selectPriceSearchIsLoading);
  const error = useAppSelector(selectPriceSearchError);
  const isEmpty = data ? data.length === 0 : false;

  const startSearch = (countryId: string | number) => {
    dispatch(searchPricesThunk({ countryId: countryId.toString() }));
  };

  return {
    data,
    isLoading,
    isEmpty,
    error,
    startSearch,
  };
};
