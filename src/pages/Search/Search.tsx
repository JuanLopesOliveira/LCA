import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MovieCard from "../../components/MediaCard/MediaCard";
import styles from "./search.module.css";
import Pagination from "../../components/Pagination/Pagination";
import PopUpModal from "../../components/PopUpModal/PopUpModal";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Search() {
  const [searchParams] = useSearchParams();
  const [searchedMedia, setSearchedMedia] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isPopUpHidden, setIsPopUpHidden] = useState<"YES" | "NO">("YES");
  const [resultFounded, setResultFounded] = useState<"YES" | "NO" | "">("");

  const getSearchedMedia = async (url: string) => {
    try {
      /**
       * The array with results is cleaned, the message is hidded,
       * and the pop up is showed
       */
      searchedMedia.length = 0;
      setResultFounded("");
      setIsPopUpHidden("NO");

      const response = await fetch(url);
      setIsPopUpHidden("YES");
      const data = await response.json();

      if (data.results.length == 0) {
        setResultFounded("NO");
        return;
      }

      /**
       * If exists some result from fetch the code will not enter in the
       * previously if, so, the pop up is hided, the message is displayed,
       * and the states of results is total pages is updated
       */
      setResultFounded("YES");
      setSearchedMedia(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      throw err;
    }
  };

  const handleDecreasePage = () => {
    if (page > 1) {
      setPage(page - 1);
      navigate(`/search?q=${query}&page=${page - 1}`);
    }
  };

  const handleIncreasePage = () => {
    setPage(page + 1);
    navigate(`/search?q=${query}&page=${page + 1}`);
  };

  const navigate = useNavigate();
  const query = searchParams.get("q");
  const pageParam = parseInt(searchParams.get("page") || "1");
  const navigatorLanguage = navigator.language;

  useEffect(() => {
    const searchWithQueryURL =
      `${searchURL}?api_key=${apiKey}&query=${query}` +
      `&language=${navigatorLanguage}&page=${page}`;
    getSearchedMedia(searchWithQueryURL);
    setPage(pageParam);
  }, [query, page]);

  return (
    <div className={styles.SearchRoot}>
      <div className={styles.resultMessageAndModal}>
        {resultFounded == "YES" && (
          <h2>
            Resultados para: <span>{query}</span>
          </h2>
        )}
        {resultFounded == "NO" && <h2>Não encontrado</h2>}
        <PopUpModal
          color="GREEN"
          hidden={isPopUpHidden}
          message="Carregando..."
        />
      </div>

      <div className={styles.ListMovies}>
        {searchedMedia.length > 0 &&
          searchedMedia.map((media) => {
            return (
              <MovieCard
                key={media.id}
                movie={media}
                showLink={true}
                favoriteOrUnfavorite="FAVORITE"
              />
            );
          })}
      </div>
      {searchedMedia.length > 0 && (
        <Pagination
          increasePage={handleIncreasePage}
          decreasePage={handleDecreasePage}
          page={page}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
