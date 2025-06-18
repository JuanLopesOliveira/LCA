import { dateFormatter } from "../../utils/DateFormatter";
import { languagesFormatter } from "../../utils/LanguagesFormatter";
import { TVProps } from "../../utils/TVProps";
import { tvRuntimeCalculator } from "../../utils/TVRuntimeCalculator";
import { verifyTypeOfLastEpisodeOnAir } from "../../utils/VerifyTypeOfLastEpisodeOnAir";
import styles from "./TVDetails.module.css";

const imageURL = import.meta.env.VITE_IMG;

export default function TVDetails({ media }: { media: TVProps }) {
  return (
    <div className={styles.MovieDetailsRoot}>
      <div className={styles.BannerDiv}>
        <img src={imageURL + media.backdrop_path} alt={media.name} />
      </div>

      <div className={styles.Details}>
        <div className={styles.PosterImage}>
          <img src={imageURL + media.poster_path} alt={media.name} />
        </div>

        <div className={styles.mediaDetails}>
          <h1>{media.name}</h1>

          <div className={styles.Tagline}>
            <h3>{media.tagline}</h3>
          </div>

          <h2>Título Original: {media.original_name}</h2>
          <h4>{media.overview}</h4>
        </div>
      </div>

      <div className={styles.OtherMovieInformation}>
        <h2>
          Status:{" "}
          {media.in_production === true ? "Em lançamento" : "Finalizado"}
        </h2>

        <h2>
          Idiomas:{" "}
          {media.languages && languagesFormatter(media.languages).join(", ")}
        </h2>

        <div className={styles.MovieGenres}>
          <h2>
            Gêneros:{" "}
            {media?.genres &&
              media.genres.map((genre) => genre.name).join(", ")}
          </h2>
        </div>

        <div className={styles.ReleaseDateAndOthers}>
          <h2>Primeira vez ao ar: {dateFormatter(media.first_air_date)}</h2>

          <h2>
            Última vez ao ar:{" "}
            {media.last_air_date && dateFormatter(media.last_air_date)}
          </h2>

          <h2>
            Duração:{" "}
            {media.episode_run_time &&
              media.number_of_episodes &&
              tvRuntimeCalculator(
                media.episode_run_time,
                media.number_of_episodes
              )}
          </h2>

          <h2>Temporadas: {media.number_of_seasons}</h2>
          <h2>Episódios: {media.number_of_episodes}</h2>
          <h2>Popularidade: {media.popularity}</h2>
          <h2>Avaliações: {media.vote_count}</h2>
          <h2>Nota: {media.vote_average}</h2>

          <div className={styles.LastAndNextEpisodeToAir}>
            <h2>
              Último episódio lançado:{" "}
              {media.last_episode_to_air && media.last_episode_to_air.name}
            </h2>

            <h2>
              Episódio:{" "}
              {media.last_episode_to_air &&
                media.last_episode_to_air.episode_number}
            </h2>

            <h2>
              Tipo de episódio:{" "}
              {media.last_episode_to_air &&
                verifyTypeOfLastEpisodeOnAir(media.last_episode_to_air)}
            </h2>

            <h2>
              Sinopse:
              {media.last_episode_to_air &&
                (media.last_episode_to_air.overview == ""
                  ? " Indisponível"
                  : " " + media.last_episode_to_air.overview)}
            </h2>

            <h2>
              Duração:{" "}
              {media.last_episode_to_air && media.last_episode_to_air.runtime}{" "}
              minutos
            </h2>

            <h2>
              Temporada:{" "}
              {media.seasons &&
                media.last_episode_to_air &&
                (media.seasons[0].name == "Especiais"
                  ? media.seasons[media.last_episode_to_air.season_number]?.name
                  : media.seasons[media.last_episode_to_air.season_number - 1]
                      .name)}
            </h2>
          </div>

          {media.next_episode_to_air && (
            <div className={styles.LastAndNextEpisodeToAir}>
              <h2>Próximo episódio: {media.next_episode_to_air.name}</h2>

              <h2>Episódio: {media.next_episode_to_air.episode_number}</h2>

              <h2>
                Tipo de episódio:{" "}
                {media.next_episode_to_air.episode_type == "standard"
                  ? "Padrão"
                  : "Final"}
              </h2>

              <h2>
                Sinopse:{" "}
                {media.next_episode_to_air.overview === ""
                  ? "Indisponível"
                  : media.next_episode_to_air.overview}
              </h2>

              <h2>
                Duração:{" "}
                {media.next_episode_to_air.runtime === null
                  ? "Indisponível"
                  : media.next_episode_to_air.runtime + " minutos"}
              </h2>

              <h2>
                Temporada:{" "}
                {media.seasons &&
                  media.last_episode_to_air &&
                  media.seasons[media.last_episode_to_air.season_number]?.name}
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
