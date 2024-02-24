import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MovieCard from "../../components/MediaCard/MediaCard";
import styles from "./search.module.css";
import Pagination from "../../components/Pagination/Pagination";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

export default function Search() {
    const [searchParams] = useSearchParams();
    const [searchedMedia, setSearchedMedia] = useState<any[]>([]);
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const navigate = useNavigate()
    const query = searchParams.get("q");
    const pageParam = parseInt(searchParams.get("page") || '1')
    const navigatorLanguage = navigator.language;

    const getSearchedMovies = async (url: any) => {
        const response = await fetch(url);
        const data = await response.json();
        setSearchedMedia(data.results);
        setTotalPages(data.total_pages)
    }

    const handleDecreasePage = () => {
        if (page > 1) {
            setPage(page - 1)
            navigate(`/search?q=${query}&page=${page - 1}`)
        }
    }

    const handleIncreasePage = () => {
        setPage(page + 1)
        navigate(`/search?q=${query}&page=${page + 1}`)
    }

    useEffect(() => {
        const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}&language=${navigatorLanguage}&page=${page}`;
        getSearchedMovies(searchWithQueryURL);
        setPage(pageParam)
        console.log(searchedMedia)
    }, [query, page])

    return (
        <div className={styles.SearchRoot}>
            <h2>Resultados para: <span>{query}</span></h2>
            <div className={styles.ListMovies}>
                {searchedMedia.length > 0
                    ? searchedMedia.map(media => {
                        return (
                            <MovieCard key={media.id} movie={media} showLink={true} />
                        )
                    })
                    : 'Não encontrado'
                }
            </div>
            {searchedMedia.length > 0 &&
                (<Pagination increasePage={handleIncreasePage} decreasePage={handleDecreasePage} page={page} totalPages={totalPages} />)
            }

        </div>
    )
}