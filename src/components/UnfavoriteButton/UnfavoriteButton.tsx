import styles from "../UnfavoriteButton/unfavorite-button.module.css";

interface FavoriteButtonProps {
  isMovieOrSerie: string;
  mediaID: number;
}

export default function UnfavoriteButton({
  isMovieOrSerie,
  mediaID,
}: FavoriteButtonProps) {
  async function handleSend() {
    try {
      const response = await fetch("https://localhost:3001/unfavorite", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mediaType: isMovieOrSerie,
          mediaID,
        }),
        credentials: "include",
      });

      const result = await response.json();
    } catch (err) {
      throw err;
    }
  }

  return (
    <button className={styles.UnfavoriteButton} onClick={handleSend}>
      Desfavoritar
    </button>
  );
}
