import { useEffect, useState } from 'react';
import MediaCard from '../../components/MediaCard/MediaCard';
import styles from './movies.module.css';
import Pagination from '../../components/Pagination/Pagination';
import { useNavigate, useLocation } from 'react-router-dom';
import MoviesCategories from '../../components/MoviesCategories/MoviesCategories';
import FavoritesPopUpModal from '../../components/PopUpModal/PopUpModal';

const movieBaseURL = import.meta.env.VITE_API_MOVIE;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Movies() {
  const [movies, setMovies] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [page, setPage] = useState(1);

  const getMovies = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    setMovies(data.results);
    setTotalPages(data.total_pages);
  };

  const handleCategoryChange = (categoryFromButton: string) => {
    setSelectedCategory(categoryFromButton);
    setPage(1);
    navigate(`/movies?category=${categoryFromButton}&page=1`);
  };

  const handleDecreasePage = () => {
    if (page > 1) {
      setPage(page - 1);
      navigate(`/movies?category=${selectedCategory}&page=${page - 1}`);
    }
  };

  const handleIncreasePage = () => {
    setPage(page + 1);
    navigate(`/movies?category=${selectedCategory}&page=${page + 1}`);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const navigatorLanguage = navigator.language;
  const urlParams = new URLSearchParams(location.search);
  const categoryParam = urlParams.get('category') || 'popular';

  useEffect(() => {
    const pageParam = parseInt(urlParams.get('page') || '1');
    const movieURL =
      `${movieBaseURL}${selectedCategory}?api_key=${apiKey}` +
      `&language=${navigatorLanguage}&region=br&page=${page}`;

    setSelectedCategory(categoryParam);
    setPage(pageParam);
    getMovies(movieURL);
  }, [selectedCategory, page]);

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'popular':
        return 'Populares';
      case 'top_rated':
        return 'Melhores Avaliados';
      case 'upcoming':
        return 'Em breve';
      case 'now_playing':
        return 'Em exibição';
    }
  };

  return (
    <div className={styles.MoviesRoot}>
      <Pagination
        decreasePage={handleDecreasePage}
        increasePage={handleIncreasePage}
        page={page}
        totalPages={totalPages}
      />

      <MoviesCategories
        onCategoryChange={handleCategoryChange}
        whatIsTheCategoryOnURL={categoryParam}
      />
      <h1>{getCategoryTitle()}</h1>
      <div className={styles.ListMovies}>
        {movies.map((movie) => {
          return (
            <MediaCard
              movie={movie}
              key={movie.id}
              showLink={true}
              favoriteOrUnfavorite="FAVORITE"
            />
          );
        })}
      </div>

      <Pagination
        decreasePage={handleDecreasePage}
        increasePage={handleIncreasePage}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
}
