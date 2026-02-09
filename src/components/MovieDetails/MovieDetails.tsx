const imageURL = import.meta.env.VITE_IMG_TO_MEDIA_DETAILS;

import { monetaryValuesFormatter } from '../../utils/MonetaryValuesFormatter';
import { MovieProps } from '../../utils/MovieProps';
import { spokenLanguagesFormatter } from '../../utils/SpokenLanguagesFormatter';
import styles from './movieDetails.module.css';

export default function MovieDetails({ media }: { media: MovieProps }) {
  return (
    <div className={styles.MovieDetailsRoot}>
      <div className={styles.BannerDiv}>
        <img src={imageURL + media.backdrop_path} alt={media.title} />
      </div>

      <div className={styles.Details}>
        <div className={styles.PosterImage}>
          <img src={imageURL + media.poster_path} alt={media.title} />
        </div>

        <div className={styles.mediaTitles}>
          <h1>{media.title}</h1>
          {media.tagline !== '' && (
            <div className={styles.Tagline}>
              <h3 style={{ fontStyle: 'italic' }}>"{media.tagline}"</h3>
            </div>
          )}
          <h2>Título Original: {media.original_title}</h2>
          <h4>"{media.overview}"</h4>
        </div>
      </div>

      <div className={styles.OtherMovieInformation}>
        <h2>
          Status:{' '}
          {media.status === 'Released' ? <span>Lançado</span> : 'Não lançado'}
        </h2>
        <h2>
          Idiomas:{' '}
          {media.spoken_languages &&
            spokenLanguagesFormatter(media.spoken_languages).join(', ')}
        </h2>

        <div className={styles.MovieGenres}>
          <h2>
            Gêneros:{' '}
            {media.genres && media.genres.map((genre) => genre.name).join(', ')}
          </h2>
        </div>

        <div className={styles.ReleaseDateAndOthers}>
          <h2>
            Lançamento:{' '}
            {media.release_date
              ? new Intl.DateTimeFormat('pt-BR').format(
                  new Date(media.release_date),
                )
              : 'Indisponível'}
          </h2>
          {media.runtime !== undefined && (
            <h2>
              Duração: {Math.floor(media.runtime / 60)}h{media.runtime % 60}m
            </h2>
          )}
          <h2>
            {typeof media.budget === 'number' &&
              media.budget != 0 &&
              `Orçamento: ${monetaryValuesFormatter(media.budget)}`}
          </h2>
          <h2>
            {typeof media.revenue === 'number' &&
              media.budget != 0 &&
              `Bilheteria: ${monetaryValuesFormatter(media.revenue)}`}
          </h2>
        </div>

        <h2>Popularidade: {media.popularity.toFixed(1)}</h2>
        <h2>Avaliações: {media.vote_count}</h2>
        <h2>Nota: {media.vote_average.toFixed(1)}</h2>
      </div>
    </div>
  );
}
