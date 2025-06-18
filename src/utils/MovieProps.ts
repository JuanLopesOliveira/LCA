interface GenreProps {
  id: number;
  name: string;
}

interface ProductionCompaniesProps {
  id: number;
  logo_path: string;
  name: string;
}

interface ProductionCountriesProps {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguagesProps {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieProps {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: object;
  budget?: number;
  genres?: GenreProps[];
  genre_ids?: number[];
  homepage?: string;
  id: number;
  media_type?: string;
  imdb_id?: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies?: ProductionCompaniesProps[];
  production_countries?: ProductionCountriesProps[];
  release_date: string;
  revenue?: number;
  runtime?: number;
  spoken_languages?: SpokenLanguagesProps[];
  status?: string;
  tagline?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
