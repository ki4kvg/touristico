import type { NormalisedPriceOffer } from '@/modules/searchPrices/dto/searchPrices.dto.ts';

export interface NormalisedHotel {
  id: number;
  name: string;
  img: string;
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
  description?: string;
  services?: Record<string, string>;
}

export interface LinkedHotel {
  id: number;
  name: string;
  img: string;
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
  description?: string;
  services?: Record<string, string>;
  tour: NormalisedPriceOffer | null;
}
