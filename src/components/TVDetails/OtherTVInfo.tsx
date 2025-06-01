import {
    TVProps,
    dateformat,
    languages,
    tvRuntimeCalculator,
    verifyTypeOfLastEpisodeOnAir
} from "../../utils/utils"

import styles from "./OtherTVInfo.module.css"

export default function OtherTVInfo({ tv }: { tv: TVProps }) {
    return (
        <div className={styles.OtherTVInfoRoot}>
            <h2>Status: {tv.in_production === true ? "Em lançamento" : "Finalizado"}</h2>
            <h2>Idiomas: {tv.languages && languages(tv.languages).join(', ')}</h2>

            <div className={styles.MovieGenres}>
                <h2>Gêneros: {tv?.genres && tv.genres.map(genre => genre.name).join(', ')}</h2>
            </div>

            <div className={styles.ReleaseDateAndOthers}>
                <h2>Primeira vez ao ar: {dateformat(tv.first_air_date)}</h2>
                <h2>Última vez ao ar: {tv.last_air_date && dateformat(tv.last_air_date)}</h2>
                <h2>Duração: {tv.episode_run_time && tv.number_of_episodes && tvRuntimeCalculator(tv.episode_run_time, tv.number_of_episodes)}</h2>
                <h2>Temporadas: {tv.number_of_seasons}</h2>
                <h2>Episódios: {tv.number_of_episodes}</h2>
                <h2>Popularidade: {tv.popularity}</h2>
                <h2>Avaliações: {tv.vote_count}</h2>
                <h2>Nota: {tv.vote_average}</h2>

                <div className={styles.LastAndNExtEpisodeToAir}>
                    <h2>Último episódio lançado: {tv.last_episode_to_air && tv.last_episode_to_air.name}</h2>
                    <h2>Episódio: {tv.last_episode_to_air && tv.last_episode_to_air.episode_number}</h2>
                    <h2>Tipo de episódio: {tv.last_episode_to_air && verifyTypeOfLastEpisodeOnAir(tv.last_episode_to_air)}</h2>
                    <h2>Sinopse:
                        {tv.last_episode_to_air &&
                            (tv.last_episode_to_air.overview == ''
                                ? ' Indisponível'
                                : " " + tv.last_episode_to_air.overview)
                        }
                    </h2>
                    <h2>Duração: {tv.last_episode_to_air && tv.last_episode_to_air.runtime} minutos</h2>
                    <h2>Temporada: {tv.seasons && tv.last_episode_to_air && (tv.seasons[0].name == "Especiais" ? tv.seasons[tv.last_episode_to_air.season_number]?.name : tv.seasons[tv.last_episode_to_air.season_number - 1].name)}</h2>

                </div>

                {tv.next_episode_to_air && (
                    <div className={styles.LastAndNExtEpisodeToAir}>
                        <h2>Próximo episódio: {tv.next_episode_to_air.name}</h2>
                        <h2>Episódio: {tv.next_episode_to_air.episode_number}</h2>
                        <h2>Tipo de episódio: {tv.next_episode_to_air.episode_type == 'standard' ? 'Padrão' : 'Final'}</h2>
                        <h2>Sinopse: {tv.next_episode_to_air.overview === "" ? "Indisponível" : tv.next_episode_to_air.overview}</h2>
                        <h2>Duração: {tv.next_episode_to_air.runtime === null ? 'Indisponível' : tv.next_episode_to_air.runtime + ' minutos'}</h2>
                        <h2>Temporada: {tv.seasons && tv.last_episode_to_air && (tv.seasons[tv.last_episode_to_air.season_number]?.name)}</h2>
                    </div>
                )}


            </div>

        </div>
    )
}