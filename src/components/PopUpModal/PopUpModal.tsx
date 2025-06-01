import styles from "./popUpModal.module.css";

interface PopUpModalInterface {
  color: "GREEN" | "BLUE";
  message: string;
  hidden: "YES" | "NO";
}

export default function PopUpModal({
  color,
  message,
  hidden,
}: PopUpModalInterface) {
  return (
    <div
      className={`${styles.PopUpModal} 
      ${styles[color]} ${hidden == "YES" && styles.hidden}`}
    >
      {message}
    </div>
  );
}
