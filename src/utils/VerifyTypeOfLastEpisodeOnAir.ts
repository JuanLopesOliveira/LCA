interface LastAndNextEpisodeToAirProps {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  runtime: number | number[] | null;
  season_number: number;
  vote_average: number;
  vote_count: number;
}

export function verifyTypeOfLastEpisodeOnAir(
  episode: LastAndNextEpisodeToAirProps
) {
  if (episode.episode_type === "standard") {
    return "Padrão";
  } else if (episode.episode_type === "finale") {
    return "Final";
  } else {
    return "Outro";
  }
}
