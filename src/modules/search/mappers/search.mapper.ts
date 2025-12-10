import type { Country, GeoEntity } from '@/types/api';
import type { NormalizedGeoItem } from '../dto/search.dto';

export const mapCountry = (c: Country): NormalizedGeoItem => ({
  id: c.id,
  name: c.name,
  countryId: c.countryId,
  icon: c.flag,
  type: 'country',
});

export const mapGeoEntity = (g: GeoEntity): NormalizedGeoItem => ({
  id: g.id,
  name: g.name,
  type: g.type,
  countryId: g.countryId,
  icon: 'flag' in g ? (g.flag as string) : undefined,
});
