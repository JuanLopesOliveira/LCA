export interface MovieProps {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection?: object;
    budget?: number;
    genres?: GenreProps[];
    genre_ids?: number[];
    homepage?: string;
    id: number;
    media_type?: string
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

interface ProductionCompaniesProps {
    id: number
    logo_path: string
    name: string
}

interface ProductionCountriesProps {
    iso_3166_1: string
    name: string
}

interface SpokenLanguagesProps {
    english_name: string
    iso_639_1: string
    name: string
}

export function dateformat(date: string) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
}

export function tvRuntimeCalculator(episodeRunTime: number | [] | null, numberOfEpisodes: number) {
    if (episodeRunTime === null) {
        return 'n/a'
    } else if (Array.isArray(episodeRunTime)) {
        if (episodeRunTime.length == 0) {
            return 'Indisponível'
        } else {
            const averageEpisodeRunTime = episodeRunTime.reduce((totalAcumulator, currentValue) => totalAcumulator + currentValue, 0)
            return "Aproximadamente " + (((Math.floor(averageEpisodeRunTime / episodeRunTime.length)) * numberOfEpisodes) / 60).toFixed(1) + ' horas'
        }
    } else {
        return Math.floor(episodeRunTime / 60) + "h" + (episodeRunTime % 60) + "m"
    }
}

export function languages(languages: []) {
    const formattedLanguages: any = []

    if (!languages) {
        console.log('bilaada')
    }
    languages.map(language => {
        formattedLanguages.push(new Intl.DisplayNames('pt-BR', { type: 'language' }).of(language))
    });

    return formattedLanguages
}

export function spokenLanguages(languages: SpokenLanguagesProps[]) {
    const formattedLanguages: any = []
    languages.map(language => {
        formattedLanguages.push(new Intl.DisplayNames('pt-BR', { type: 'language' }).of(language.iso_639_1))
    });

    return formattedLanguages
}

export function formateMonetaryValues(monetaryValue: number) {
    return monetaryValue.toLocaleString('pt-BR', { style: 'currency', currency: 'USD' })
}

export function verifyTypeOfLastEpisodeOnAir(episode: LastAndNextEpisodeToAirProps) {
    if (episode.episode_type === 'standard') {
        return 'Padrão'
    } else if (episode.episode_type === 'finale') {
        return 'Final'
    } else {
        return 'Outro'
    }
}