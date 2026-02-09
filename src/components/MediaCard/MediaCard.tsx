import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const imageURL = import.meta.env.VITE_IMG;

import styles from './media.module.css';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import UnfavoriteButton from '../UnfavoriteButton/UnfavoriteButton';

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
  favoriteOrUnfavorite: 'FAVORITE' | 'UNFAVORITE';
  onUnfavorite: () => Promise<void>;
  onError: (message: string) => void;
}

export default function MediaCard({
  movie,
  showLink = true,
  favoriteOrUnfavorite = 'FAVORITE',
  onUnfavorite,
  onError
}: MovieCardProps) {
  //"title" is a property that only movies have,
  // series (tv) have a "name" property

  const isMovieOrSerie: any = movie.title ? 'movie' : 'serie';

  return (
    <div className={styles.MovieRoot}>
      <img src={imageURL + movie.poster_path} alt={movie.title} />
      <span>{isMovieOrSerie.includes('movie') ? movie.title : movie.name}</span>

      <p className={styles.VoteAverage}>
        <FaStar />
        {movie.vote_average}
      </p>
      <div className={styles.DetailsAndFavoriteButton}>
        {showLink && (
          <Link
            className={styles.MovieDetails}
            to={
              isMovieOrSerie.includes('movie')
                ? `/movies/${movie.id}`
                : `/tv/${movie.id}`
            }
          >
            Detalhes
          </Link>
        )}
        {favoriteOrUnfavorite == 'FAVORITE' ? (
          <FavoriteButton isMovieOrSerie={isMovieOrSerie} mediaID={movie.id} />
        ) : (
          <UnfavoriteButton
            isMovieOrSerie={isMovieOrSerie}
            mediaID={movie.id}
            onSuccess={onUnfavorite}
            onError={onError}
          />
        )}
      </div>
    </div>
  );
}
