import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const imageURL = import.meta.env.VITE_IMG;

<<<<<<< HEAD
import styles from "./media.module.css";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import UnfavoriteButton from "../UnfavoriteButton/UnfavoriteButton";

interface MovieProps {
  id: number;
  media_type: string;
  title?: string;
  name?: string;
  poster_path: string;
  vote_average: number;
}

interface MovieCardProps {
  movie: MovieProps;
  showLink: boolean;
  favoriteOrUnfavorite: "FAVORITE" | "UNFAVORITE";
}

export default function MediaCard({
  movie,
  showLink = true,
  favoriteOrUnfavorite = "FAVORITE",
}: MovieCardProps) {
  //"title" is a property that only movies have,
  // series (tv) have a "name" property

  const isMovieOrSerie: any = movie.title ? "movie" : "serie";

  return (
    <div className={styles.MovieRoot}>
      <img src={imageURL + movie.poster_path} alt={movie.title} />
      <span>{isMovieOrSerie.includes("movie") ? movie.title : movie.name}</span>

      <p className={styles.VoteAverage}>
        <FaStar />
        {movie.vote_average}
      </p>
      <div className={styles.DetailsAndFavoriteButton}>
        {showLink && (
          <Link
            className={styles.MovieDetails}
            to={
              isMovieOrSerie.includes("movie")
                ? `/movies/${movie.id}`
                : `/tv/${movie.id}`
            }
          >
            Detalhes
          </Link>
        )}
        {favoriteOrUnfavorite == "FAVORITE" ? (
          <FavoriteButton isMovieOrSerie={isMovieOrSerie} mediaID={movie.id} />
        ) : (
          <UnfavoriteButton
            isMovieOrSerie={isMovieOrSerie}
            mediaID={movie.id}
          />
        )}
      </div>
    </div>
  );
}
=======
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
>>>>>>> c31e0de1390ac30764829db2cd82d048839763b7
