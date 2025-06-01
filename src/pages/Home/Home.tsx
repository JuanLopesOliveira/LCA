import { useState, useEffect } from "react";
import MediaCard from "../../components/MediaCard/MediaCard";
import styles from "./home.module.css"
import { Link } from "react-router-dom";

const discoverAPI = import.meta.env.VITE_API_DISCOVER;
<<<<<<< HEAD
const apiKey = import.meta.env.VITE_API_KEY
=======
const apiKey = import.meta.env.VITE_API_KEY;

>>>>>>> c31e0de1390ac30764829db2cd82d048839763b7

export default function Home() {
    const [topMovies, setTopMovies] = useState<any[]>([]);
    const navigatorLanguage = navigator.language

    const getTopRatedMovies = async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
<<<<<<< HEAD
        console.log(data)
=======
>>>>>>> c31e0de1390ac30764829db2cd82d048839763b7
        setTopMovies(data.results as any[]);
    }

    useEffect(() => {
<<<<<<< HEAD
        const discoverMoviesURL = `${discoverAPI}?api_key=${apiKey}&language=${navigatorLanguage}`;
=======
        const discoverMoviesURL = `${discoverAPI}?${apiKey}&language=${navigatorLanguage}`;
>>>>>>> c31e0de1390ac30764829db2cd82d048839763b7
        getTopRatedMovies(discoverMoviesURL);
    }, [])

    return (
        <div className={styles.HomeRoot}>
            <h1>Início</h1>
            <div className={styles.ListMovies}>
                {topMovies.map(movie => {
                    return (
<<<<<<< HEAD
                        <MediaCard
                            key={movie.id}
                            movie={movie} 
                            showLink={true}
                            favoriteOrUnfavorite="FAVORITE"/>
=======
                        <MediaCard key={movie.id} movie={movie} showLink={true} />
>>>>>>> c31e0de1390ac30764829db2cd82d048839763b7
                    )
                })}
            </div>
            <button><Link to='/movies'><h2>Mais</h2></Link></button>
        </div>
    )
}