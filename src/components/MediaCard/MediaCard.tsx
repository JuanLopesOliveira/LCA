import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const imageURL = import.meta.env.VITE_IMG;

import styles from "./media.module.css"

interface MovieProps {
    id: number;
    media_type: string
    title?: string;
    name?: string
    poster_path: string;
    vote_average: number;
}

interface MovieCardProps {
    movie: MovieProps;
    showLink: boolean
}

export default function MediaCard({ movie, showLink = true }: MovieCardProps) {
    return (
        <div className={styles.MovieRoot}>
            <img src={imageURL + movie.poster_path} alt={movie.title} />
            <span>
                {
                    movie.media_type
                        ? (movie.media_type == 'tv' ? movie.name : movie.title)
                        : (movie.title ? movie.title : movie.name)
                }
            </span>

            <p className={styles.VoteAverage}><FaStar />{movie.vote_average}</p>
            {showLink &&
                <Link className={styles.MovieDetails} to={
                    movie.media_type
                        ? (movie.media_type == 'tv' ? `/tv/${movie.id}` : `/movie/${movie.id}`)
                        : (movie.title ? `/movies/${movie.id}` : `/tv/${movie.id}`)}>
                    Detalhes
                </Link>
            }
        </div>
    )
}