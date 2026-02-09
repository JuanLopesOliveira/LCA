import { useEffect, useState } from 'react';
import styles from './series.module.css';
import MediaCard from '../../components/MediaCard/MediaCard';
import Pagination from '../../components/Pagination/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import SeriesCategories from '../../components/SeriesCategories/SeriesCategories';

const seriesBaseURL = import.meta.env.VITE_API_TV;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Series() {
  const [series, setSeries] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('popular');
  const [page, setPage] = useState(1);

  const getSeriesFromTMDB = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    setSeries(data.results);
    setTotalPages(data.total_pages);
  };

  const handleCategoryChange = (categoryFromButton: string) => {
    setSelectedCategory(categoryFromButton);
    setPage(1);
    navigate(`/series?category=${categoryFromButton}&page=1`);
  };

  const handleDecreasePage = () => {
    if (page > 1) {
      setPage(page - 1);
      navigate(`/series?category=${selectedCategory}&page=${page - 1}`);
    }
  };

  const handleIncreasePage = () => {
    setPage(page + 1);
    navigate(`/series?category=${selectedCategory}&page=${page + 1}`);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const navigatorLanguage = navigator.language;
  const urlParams = new URLSearchParams(location.search);
  const categoryParam = urlParams.get('category') || 'airing_today';

  useEffect(() => {
    const pageParam = parseInt(urlParams.get('page') || '1');
    const seriesURL =
      `${seriesBaseURL}${categoryParam}?api_key=${apiKey}` +
      `&language=${navigatorLanguage}&page=${pageParam}`;

    setSelectedCategory(categoryParam);
    setPage(pageParam);
    getSeriesFromTMDB(seriesURL);
  }, [selectedCategory, page]);

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'airing_today':
        return 'Em exibição hoje';
      case 'top_rated':
        return 'Melhores Avaliados';
      case 'popular':
        return 'Populares';
      case 'on_the_air':
        return 'Em transmissão';
    }
  };

  return (
    <div className={styles.SeriesRoot}>

      <Pagination
        decreasePage={handleDecreasePage}
        increasePage={handleIncreasePage}
        page={page}
        totalPages={totalPages}
      />
      
      <SeriesCategories
        onCategoryChange={handleCategoryChange}
        whatIsTheCategoryOnURL={categoryParam}
      />
      <h1>{getCategoryTitle()}</h1>

      <div className={styles.ListMovies}>
        {series.map((series) => {
          return (
            <MediaCard
              movie={series}
              key={series.id}
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
