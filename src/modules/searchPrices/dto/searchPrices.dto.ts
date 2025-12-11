export interface NormalisedPriceOffer {
  id: string;
  amount: number;
  currency: 'usd';
  startDate: string;
  endDate: string;
  hotelID?: string;
}
