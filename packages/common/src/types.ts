export interface StationsInformation {
  last_updated: number;
  ttl: number;
  data: {
    stations: Station[];
  };
}

export interface Station {
  station_id: string;
  name: string;
  short_name?: string;
  lat: number;
  lon: number;
  address?: string;
  cross_street?: string;
  region_id?: string;
  post_code?: string;
  rental_methods?: string[];
  capacity?: number;
}

export interface StationsStatus {
  last_updated: number;
  ttl: number;
  data: {
    stations: StationStatusEntry[];
  };
}

export interface StationStatusEntry {
  station_id: string;
  num_bikes_available: number;
  num_bikes_disabled?: number;
  num_docks_available: number;
  num_docks_disabled?: number;
  is_installed: boolean;
  is_renting: boolean;
  is_returning: boolean;
  last_reported: number;
}
