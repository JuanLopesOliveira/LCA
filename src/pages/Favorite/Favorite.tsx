import { useEffect, useState } from 'react';
import MediaCard from '../../components/MediaCard/MediaCard';
import styles from './favorite.module.css';
import PopUpModal from '../../components/PopUpModal/PopUpModal';

export default function Favorite() {
  interface FavoriteShape {
    mediaType: string;
    mediaID: string;
  }

  const [fetchedFavoritesFromTMDB, setFetchedFavoritesFromTMDB] = useState<
    any[]
  >([]);

  const [errorFromFetchFavorites, setErrorFromFetchFavorites] =
    useState<string>('');

  const [isPopUpHidden, setIsPopUpHidden] = useState<'YES' | 'NO'>('NO');

  const fetchFavorites = async () => {
    try {
      const response = await fetch('https://localhost:3001/getfavorites', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        console.log('caiu aqui');
        const errorText = await response.text();
        const msg = errorText || response.statusText;
        setErrorFromFetchFavorites(msg);
        throw new Error(msg);
      }

      const data = await response.json();

      data.getAllFavorites
        ? await fetchFromTMDB(data.getAllFavorites)
        : setErrorFromFetchFavorites('Nenhum favorito');
      setIsPopUpHidden('YES');
    } catch (err) {
      console.log('caiu aqui');
      setIsPopUpHidden('YES');
      setErrorFromFetchFavorites(err.message);
      throw err;
    }
  };

  const fetchFromTMDB = async (favorites: FavoriteShape[]) => {
    const allFetchedMediaFromTMDB: any[] = [];

    for (const item of favorites) {
      let baseAPI = import.meta.env.VITE_BASE_API;
      item.mediaType == 'movie' ? (baseAPI += 'movie/') : (baseAPI += 'tv/');
      baseAPI += `${item.mediaID}`;
      baseAPI += `?api_key=${import.meta.env.VITE_API_KEY}&language=${
        navigator.language
      }`;

      const response = await fetch(baseAPI, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      allFetchedMediaFromTMDB.push(data);
    }

    setFetchedFavoritesFromTMDB(allFetchedMediaFromTMDB);
    setIsPopUpHidden('YES');
  };

  const handleUnfavoriteError = (message: string) => {
    setErrorFromFetchFavorites(message);
  };

  const handleUnfavoriteSuccess = async () => {
    setErrorFromFetchFavorites('Nenhum favorito');
    setFetchedFavoritesFromTMDB([])
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className={styles.MainFavoritePageDiv}>
      <div className={styles.FavoritePageTitle}></div>
      <PopUpModal
        color="GREEN"
        message="Carregando..."
        hidden={isPopUpHidden}
      />
      <h1>Favorite Page</h1>

      <div className={styles.CardsDiv}>
        {errorFromFetchFavorites}
        {fetchedFavoritesFromTMDB.map((media) => {
          return (
            <MediaCard
              key={media.id}
              movie={media}
              showLink={true}
              favoriteOrUnfavorite="UNFAVORITE"
              onUnfavorite={handleUnfavoriteSuccess}
              onError={handleUnfavoriteError}
            />
          );
        })}
      </div>
    </div>
  );
}
