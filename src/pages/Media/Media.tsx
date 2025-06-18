import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const moviesURL = import.meta.env.VITE_API_MOVIE;
const tvURL = import.meta.env.VITE_API_TV;
const apiKey = import.meta.env.VITE_API_KEY;

import MovieDetails from "../../components/MovieDetails/MovieDetails";
import TVDetails from "../../components/TVDetails/TVDetails";

export default function Media() {
  const { id, mediaType } = useParams();

  const [media, setMedia] = useState();
  const navigatorLanguage = navigator.language;

  const getMovie = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    setMedia(data);
  };

  useEffect(() => {
    const mediaURL = `${
      mediaType === "tv" ? tvURL : moviesURL
    }${id}?api_key=${apiKey}&language=${navigatorLanguage}`;
    getMovie(mediaURL);
  }, []);

  return (
    <div>
      {media && (
        <>
          {mediaType == "tv" ? (
            <TVDetails media={media} />
          ) : (
            <MovieDetails media={media} />
          )}
        </>
      )}
    </div>
  );
}
