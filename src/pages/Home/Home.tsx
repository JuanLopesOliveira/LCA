import { useState, useEffect } from 'react';
import MediaCard from '../../components/MediaCard/MediaCard';
import styles from './home.module.css';
import { Link } from 'react-router-dom';

const discoverAPI = import.meta.env.VITE_API_DISCOVER;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Home() {
  const [topMovies, setTopMovies] = useState<any[]>([]);
  const navigatorLanguage = navigator.language;

  const getTopRatedMovies = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    setTopMovies(data.results as any[]);
  };

  useEffect(() => {
    const discoverMoviesURL = `${discoverAPI}?api_key=${apiKey}&language=${navigatorLanguage}`;
    getTopRatedMovies(discoverMoviesURL);
  }, []);

  return (
    <div className={styles.HomeRoot}>
      <h1>Início</h1>
      <div className={styles.ListMovies}>
        {topMovies.map((movie) => {
          return (
            <MediaCard
              key={movie.id}
              movie={movie}
              showLink={true}
              favoriteOrUnfavorite="FAVORITE"
            />
          );
        })}
      </div>
      <button>
        <Link to="/movies">
          <h2>Mais</h2>
        </Link>
      </button>
    </div>
  );
}
