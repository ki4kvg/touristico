import styles from './ToursList.module.scss';
import { useHotels } from '@/modules/hotels/hooks/useHotels.ts';
import Loader from '@/components/Loader/Loader.tsx';
import HotelCard from '@/components/HotelCard/HotelCard.tsx';

function ToursList() {
  const { data, isLoading } = useHotels();

  return (
    <div className={styles.container}>
      {isLoading && <Loader size={80} />}
      {data.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} />
      ))}
    </div>
  );
}

export default ToursList;
