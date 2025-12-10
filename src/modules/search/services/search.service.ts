import type { CountriesMap, GeoResponse } from '@/types/api';
import type { NormalizedGeoItem } from '../dto/search.dto';
import { mapCountry, mapGeoEntity } from '../mappers/search.mapper';

export const searchService = {
  normalizeCountries(countriesMap?: CountriesMap): NormalizedGeoItem[] {
    if (!countriesMap) return [];
    return Object.values(countriesMap).map(mapCountry);
  },

  normalizeGeo(geoMap?: GeoResponse): NormalizedGeoItem[] {
    if (!geoMap) return [];
    return Object.values(geoMap).map(mapGeoEntity);
  },

  resolveOptions(params: {
    isOpen: boolean;
    searchValue: string;
    searchType?: 'country' | 'city' | 'hotel' | undefined;
    countryList: NormalizedGeoItem[];
    geoSearchList: NormalizedGeoItem[];
  }): NormalizedGeoItem[] {
    const { searchValue, searchType, countryList, geoSearchList } = params;

    if (!searchValue) return countryList;

    if (searchType === 'country') return countryList;

    if ((geoSearchList && geoSearchList.length > 0) || searchType === 'city' || searchType === 'hotel') {
      return geoSearchList;
    }

    return countryList;
  },

  deriveSelectedPayload(item: NormalizedGeoItem) {
    return {
      searchValue: item.name,
      selectedObject: { countryId: item.countryId },
      searchType: item.type,
    };
  },
};
