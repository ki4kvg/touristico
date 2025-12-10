export interface NormalizedGeoItem {
  id: string | number;
  name: string;
  type: 'country' | 'city' | 'hotel';
  countryId: string | number;
  icon?: string;
}
