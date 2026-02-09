/* eslint-disable no-useless-catch */
import styles from '../UnfavoriteButton/unfavorite-button.module.css';

interface FavoriteButtonProps {
  isMovieOrSerie: string;
  mediaID: number;
  onSuccess: () => Promise<void>;
  onError: (message: string) => void;
}

export default function UnfavoriteButton({
  isMovieOrSerie,
  mediaID,
  onSuccess,
  onError
}: FavoriteButtonProps) {
  async function handleSend() {
    try {
      const response = await fetch('https://localhost:3001/unfavorite', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaType: isMovieOrSerie, mediaID }),
        credentials: 'include',
      });

      if (!response.ok) {
        const result = await response.json();
        onError(result.message); // ← AQUI
        return;
      }

      await onSuccess();
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
