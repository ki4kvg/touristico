import type { Hotel } from '@/types/api';
import type { NormalisedHotel } from '@/modules/hotels/dto/hotels.dto.ts';

export const mapHotel = (h: Hotel): NormalisedHotel => ({
  id: h.id,
  name: h.name,
  img: h.img,
  cityId: h.cityId,
  cityName: h.cityName,
  countryId: h.countryId,
  countryName: h.countryName,
  description: h.description,
  services: h.services,
});
