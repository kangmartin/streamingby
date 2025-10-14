export interface Provider {
  id: number;
  name: string;
  logo: string;
  countries: string[];
}

export interface Content {
  id: number;
  name: string;
  overview: string;
  genre_ids: number[];
  poster_path: string;
  availableCountries: string[];
  providers: Provider[];
}

export interface Filters {
  type: 'movie' | 'tv';
  platforms: number[];
  country: string;
}
