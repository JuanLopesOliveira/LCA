import { MovieProps, formateMonetaryValues, spokenLanguages } from "../../utils/utils"
import styles from "./OtherMovieInfo.module.css"

export default function OtherMovieInformation({ movie }: { movie: MovieProps }) {
    return (
        <div className={styles.OtherMovieinformationRoot}>
            <h2>Status: {movie.status === "Released" ? <span>Lançado</span> : "Não lançado"}</h2>
            <h2>Idiomas: {movie.spoken_languages && spokenLanguages(movie.spoken_languages).join(', ')}</h2>

            <div className={styles.MovieGenres}>
                <h2>Gêneros: {movie.genres && movie.genres.map(genre => genre.name).join(', ')}</h2>
            </div>

            <div className={styles.ReleaseDateAndOthers}>
                <h2>Lançamento: {new Intl.DateTimeFormat('pt-BR').format(new Date(movie.release_date))}</h2>
                {movie.runtime !== undefined && (
                    <h2>Duração: {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</h2>
                )}
                <h2>{movie.budget && `Orçamento: ${formateMonetaryValues(movie.budget)}`}</h2>
                <h2>{movie.revenue && `Bilheteria: ${formateMonetaryValues(movie.revenue)}`}</h2>
            </div>

            <h2>Popularidade: {movie.popularity}</h2>
            <h2>Avaliações: {movie.vote_count}</h2>
            <h2>Nota: {movie.vote_average}</h2>

        </div>
    )
}