import styles from './HotelCard.module.scss';
import { formatPrice } from '@/helpers/formatPrice.ts';
import { useNavigate } from 'react-router-dom';
import type { LinkedHotel } from '@/modules/hotels/dto/hotels.dto.ts';

type Props = {
  hotel: LinkedHotel;
};

function HotelCard(props: Props) {
  const { hotel } = props;
  const navigate = useNavigate();

  return (
    <div className={styles.card} onClick={() => navigate(`/tour/${hotel.tour?.hotelID}?priceId=${hotel.tour?.id}`)}>
      <img src={hotel.img} alt="Hotel" />
      <div className={styles.info_wrapper}>
        <h2>{hotel.name}</h2>
        <p>{`${hotel.countryName}, ${hotel.cityName}`}</p>
        <p>Дата початку</p>
        <p>{hotel.tour?.startDate}</p>
        <h2>{`${hotel.tour && formatPrice(hotel.tour.amount)} ${hotel.tour?.currency.toUpperCase()}`}</h2>
        <a className={styles.link} href={''}>
          Відкрити ціну
        </a>
      </div>
    </div>
  );
}

export default HotelCard;
