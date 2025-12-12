import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import {
  selectPriceSearchAborting,
  selectPriceSearchError,
  selectPriceSearchIsLoading,
  selectPriceSearchResults,
} from '@/modules/searchPrices/store/searchPrices.selectors.ts';
import { searchPricesThunk } from '@/modules/searchPrices/store/searchPrices.thunks.ts';
import { useNavigate } from 'react-router-dom';

export const useSearchPrices = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectPriceSearchResults);
  const isLoading = useAppSelector(selectPriceSearchIsLoading);
  const error = useAppSelector(selectPriceSearchError);
  const isAborting = useAppSelector(selectPriceSearchAborting);
  const isEmpty = data ? data.length === 0 : false;

  const startSearch = (countryId: string | number) => {
    dispatch(searchPricesThunk({ countryId: countryId.toString(), navigate: navigate }));
  };

  return {
    data,
    isLoading,
    isAborting,
    isEmpty,
    error,
    startSearch,
  };
};
