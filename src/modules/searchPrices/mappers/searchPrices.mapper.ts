import type { PricesMap } from '@/types/api.ts';
import type { NormalisedPriceOffer } from '@/modules/searchPrices/dto/searchPrices.dto.ts';

export const mapPriceResult = (result: PricesMap): NormalisedPriceOffer[] =>
  Object.values(result).map((item) => ({
    id: item.id,
    amount: item.amount,
    currency: item.currency,
    startDate: item.startDate,
    endDate: item.endDate,
    hotelID: item.hotelID,
  }));
