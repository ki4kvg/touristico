import type { NormalisedPriceOffer } from '@/modules/searchPrices/dto/searchPrices.dto.ts';
import type { LinkedHotel, NormalisedHotel } from '@/modules/hotels/dto/hotels.dto.ts';

export const hotelsService = {
  linkAndMapOffersWithHotels(prices: NormalisedPriceOffer[], hotels: NormalisedHotel[]): LinkedHotel[] {
    return hotels
      .map((hotel) => ({
        ...hotel,
        tour: prices.find((price) => price.hotelID === hotel.id.toString()) || null,
      }))
      .sort((a, b) => {
        const priceA = a.tour?.amount ?? Infinity;
        const priceB = b.tour?.amount ?? Infinity;
        return priceA - priceB;
      });
  },
};
