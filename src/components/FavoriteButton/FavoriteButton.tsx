import { useContext, useState } from "react";
import styles from "../FavoriteButton/favorite-button.module.css";
import AuthContext from "../../context/AuthContext";

interface FavoriteButtonProps {
  isMovieOrSerie: string;
  mediaID: number;
}

export default function FavoriteButton({
  isMovieOrSerie,
  mediaID,
}: FavoriteButtonProps) {
  async function handleSend() {
    try {
      const response = await fetch("https://localhost:3001/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mediaType: isMovieOrSerie,
          mediaID,
        }),
        credentials: "include",
      });

      if (response.ok) {
        setButtonMessageAfterHandleSend("Favoritado");
        setButtonColorAfterHandleSend("GREEN");
      }

      setTimeout(() => {
        setButtonColorAfterHandleSend(undefined);
        setButtonMessageAfterHandleSend(undefined);
      }, 3000);

      const result = await response.json();
      console.log(result);
    } catch (err) {
      throw err;
    }
  }

  const [buttonMessageAfterHandleSend, setButtonMessageAfterHandleSend] =
    useState<string>();

  const [buttonColorAfterHandleSend, setButtonColorAfterHandleSend] = useState<
    "RED" | "GREEN" | "BLUE"
  >();

  const authContext = useContext(AuthContext);

  return (
    <>
      <button
        className={`${styles.FavoriteButton}
                ${
                  buttonColorAfterHandleSend
                    ? styles[buttonColorAfterHandleSend]
                    : styles.NORMAL
                }
                ${!authContext?.logged && styles.disabled}   
                  `}
        onClick={handleSend}
      >
        {buttonMessageAfterHandleSend
          ? buttonMessageAfterHandleSend
          : "Favoritar"}
      </button>
    </>
  );
}
