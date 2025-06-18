interface GenreProps {
    id: number;
    name: string;
}

interface LastAndNextEpisodeToAirProps {
    air_date: string
    episode_number: number
    episode_type: string
    id: number
    name: string
    overview: string
    runtime: number | number[] | null
    season_number: number
    vote_average: number
    vote_count: number
}

interface SeasonsProps {
    air_date: string | null
    episode_count: number
    name: string
    overview: string
    poster_path: string
    season_number: number
    vote_average: number
}

interface SpokenLanguagesProps {
    english_name: string
    iso_639_1: string
    name: string
}

export interface TVProps {
    adult: boolean;
    backdrop_path: string;
    created_by?: [];
    episode_run_time?: [];
    first_air_date: string;
    genres?: GenreProps[];
    genre_ids?: []
    homepage?: string
    id: number
    in_production?: boolean;
    languages?: [] | null;
    last_air_date?: string;
    last_episode_to_air?: LastAndNextEpisodeToAirProps;
    name: string;
    networks?: []
    next_episode_to_air?: LastAndNextEpisodeToAirProps | null;
    number_of_episodes?: number;
    number_of_seasons?: number;
    origin_country: []
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    seasons?: SeasonsProps[];
    spoken_languages?: SpokenLanguagesProps[]
    status?: string;
    tagline?: string;
    type?: string;
    vote_average: string;
    vote_count: string;
}