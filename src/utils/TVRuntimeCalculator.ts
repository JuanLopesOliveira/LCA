export function tvRuntimeCalculator(
  episodeRunTime: number | [] | null,
  numberOfEpisodes: number
): string {
  if (episodeRunTime === null) {
    return "n/a";
  }

  if (Array.isArray(episodeRunTime)) {
    if (episodeRunTime.length == 0) {
      return "Indisponível";
    }

    const averageEpisodeRunTime = episodeRunTime.reduce(
      (totalAcumulator, currentValue) => totalAcumulator + currentValue,
      0
    );

    return (
      "Aproximadamente " +
      (
        (Math.floor(averageEpisodeRunTime / episodeRunTime.length) *
          numberOfEpisodes) /
        60
      ).toFixed(1) +
      " horas"
    );
  }

  return Math.floor(episodeRunTime / 60) + "h" + (episodeRunTime % 60) + "m";
}
