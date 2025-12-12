import styles from './TourDetails.module.scss';
import Loader from '@/components/Loader/Loader.tsx';
import HotelDetailsCard from '@/components/HotelDetailsCard/HotelDetailsCard.tsx';
import { useHotelDetails } from '@/modules/hotels/hooks/useHotelDetails.ts';

function TourDetails() {
  const { hotel, price, isLoading } = useHotelDetails();

  if (isLoading) return <Loader size={80} />;

  return (
    <div className={styles.container}>
      {isLoading && <Loader size={80} />}
      {hotel && price && <HotelDetailsCard hotel={hotel} priceOffer={price} />}
    </div>
  );
}

export default TourDetails;
