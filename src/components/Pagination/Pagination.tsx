import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import styles from "./pagination.module.css";

export default function Pagination({
  increasePage,
  decreasePage,
  page,
  totalPages,
}: any) {
  return (
    <div className={styles.Pagination}>
      <button onClick={decreasePage}>
        <FaArrowLeft />
      </button>
      <div className={styles.PageNumber}>{page}</div>
      <button
        onClick={increasePage}
        style={{ display: page == totalPages ? "none" : "block" }}
      >
        <FaArrowRight />
      </button>
    </div>
  );
}
