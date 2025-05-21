import {Region} from 'react-native-maps';

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface SelectLocationParams {
  latitude?: number;
  longitude?: number;
  manual?: boolean;
  searchText?: string;
  region?: Region;
}

export interface GeocodeResult {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

export interface LocationSearchResult {
  title: string;
  subtitle: string;
}
