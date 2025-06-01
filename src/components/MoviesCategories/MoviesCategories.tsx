import styles from "./moviesCategories.module.css";

export default function MoviesCategories({
  onCategoryChange,
  whatIsTheCategoryOnURL,
}: any) {
  return (
    <div className={styles.MoviesCategories}>
      <ul className={styles.List}>
        <li>
          <button
            onClick={() => {
              onCategoryChange("now_playing");
            }}
            className={
              whatIsTheCategoryOnURL.includes("now_playing")
                ? styles.activeButton
                : styles.nonActiveButton
            }
          >
            Em exibição
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
              onCategoryChange("upcoming");
            }}
            className={
              whatIsTheCategoryOnURL.includes("upcoming")
                ? styles.activeButton
                : styles.nonActiveButton
            }
          >
            Em breve
          </button>
        </li>
      </ul>
    </div>
  );
}
