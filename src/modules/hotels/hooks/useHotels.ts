import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { getHotelsThunk } from '@/modules/hotels/store/hotels.thunks.ts';
import { selectHotelsIsLoading, selectLinkedHotels } from '@/modules/hotels/store/hotels.selectors.ts';
import { useEffect } from 'react';
import { selectPriceSearchResults } from '@/modules/searchPrices/store/searchPrices.selectors.ts';

export const useHotels = () => {
  const { countryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectLinkedHotels);
  const prices = useAppSelector(selectPriceSearchResults);
  const isLoading = useAppSelector(selectHotelsIsLoading);

  const getHotels = () => {
    if (!countryId || !prices) {
      navigate(-1);
      return;
    }
    dispatch(getHotelsThunk({ countryId: countryId.toString() }));
  };

  useEffect(() => {
    getHotels();
  }, [countryId, dispatch, navigate]);

  return {
    data,
    isLoading,
  };
};
