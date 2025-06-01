import styles from "./seriesCategories.module.css";

export default function SeriesCategories({
  onCategoryChange,
  whatIsTheCategoryOnURL,
}: any) {
  return (
    <div className={styles.SeriesCategories}>
      <ul className={styles.List}>
        <li>
          <button
            onClick={() => {
              onCategoryChange("airing_today");
            }}
            className={
              whatIsTheCategoryOnURL.includes("airing_today")
                ? styles.activeButton
                : styles.nonActiveButton
            }
          >
            Em exibição hoje
          </button>
        </li>

        <li>
          <button
            onClick={() => {
              onCategoryChange("popular");
            }}
            className={
              whatIsTheCategoryOnURL.includes("popular")
                ? styles.activeButton
                : styles.nonActiveButton
            }
          >
            Populares
          </button>
        </li>

        <li>
          <button
            onClick={() => {
              onCategoryChange("top_rated");
            }}
            className={
              whatIsTheCategoryOnURL.includes("top_rated")
                ? styles.activeButton
                : styles.nonActiveButton
            }
          >
            Melhores Avaliados
          </button>
        </li>

        <li>
          <button
            onClick={() => {
              onCategoryChange("on_the_air");
            }}
            className={
              whatIsTheCategoryOnURL.includes("on_the_air")
                ? styles.activeButton
                : styles.nonActiveButton
            }
          >
            Em transmissão
          </button>
        </li>
      </ul>
    </div>
  );
}
