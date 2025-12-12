import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks.ts';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  selectCurrentHotel,
  selectCurrentPriceOffer,
  selectHotelsIsLoading,
} from '@/modules/hotels/store/hotels.selectors.ts';
import { useEffect } from 'react';
import { getHotelDetailsThunk } from '@/modules/hotels/store/hotels.thunks.ts';

export const useHotelDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { search } = useLocation();
  const { hotelId } = useParams();
  const params = new URLSearchParams(search);
  const priceId = params.get('priceId');

  const hotel = useAppSelector(selectCurrentHotel);
  const price = useAppSelector(selectCurrentPriceOffer);
  const isLoading = useAppSelector(selectHotelsIsLoading);

  const getTourDetails = () => {
    if (!hotelId || !priceId) {
      navigate(-1);
      return;
    }

    dispatch(getHotelDetailsThunk({ hotelId: hotelId, priceId: priceId }));
  };

  useEffect(() => {
    getTourDetails();
  }, [priceId, hotelId, dispatch, navigate]);

  return {
    hotel,
    price,
    isLoading,
  };
};
