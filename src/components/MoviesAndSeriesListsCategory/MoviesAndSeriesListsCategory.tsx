import { useLocation } from "react-router-dom"
import styles from "./moviesAndSeriesListsCategory.module.css"


export default function MoviesAndSeriesLists({ onCategoryChange }: any) {
    const location = useLocation()
    return (
        <div className={styles.MoviesLists}>
            <ul className={styles.List}>
                {
                    location.pathname == '/series'
                        ? <li><button onClick={() => onCategoryChange('airing_today')}>Em exibição hoje</button></li>
                        : <li><button onClick={() => onCategoryChange('now_playing')}>Em exibição</button></li>
                }
                <li><button onClick={() => onCategoryChange('popular')}>Populares</button></li>
                <li><button onClick={() => onCategoryChange('top_rated')}>Melhores Avaliados</button></li>
                {
                    location.pathname == '/series'
                        ? <li><button onClick={() => onCategoryChange('on_the_air')}>Em transmissão</button></li>
                        : <li><button onClick={() => onCategoryChange('upcoming')}>Em breve</button></li>
                }
            </ul>
        </div>
    )
}