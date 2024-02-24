import { MovieProps } from "../../utils/utils"
import styles from "./ImportantMovieInfo.module.css"

export default function ImportantMovieinfo({ movie }: {movie: MovieProps}) {
    return (
        <div className={styles.Info}>
            <h1>{movie.title}</h1>

            <div className={styles.Tagline}>
                <h3>{movie.tagline}</h3>
            </div>

            <h2>Título Original: {movie.original_title}</h2>
            <h4>{movie.overview}</h4>
        </div>
    )
}