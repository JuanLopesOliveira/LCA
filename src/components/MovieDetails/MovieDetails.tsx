const imageURL = import.meta.env.VITE_IMG
import { MovieProps } from "../../utils/utils";
import ImportantMovieinfo from "./ImportantMovieInfo"

import styles from "./movieDetails.module.css";
import OtherMovieInfo from "./OtherMovieInfo";

export default function MovieDetails({ media }: { media: MovieProps }) {
    return (
        <div className={styles.MovieDetailsRoot}>

            <div className={styles.BannerDiv}>
                <img src={imageURL + media.backdrop_path} alt={media.title} />
            </div>

            <div className={styles.Details}>
                <div className={styles.PosterImage}>
                    <img src={imageURL + media.poster_path} alt={media.title} />
                </div>

                <ImportantMovieinfo movie={media} />
            </div>

            <div className={styles.OtherMovieInformation}>
                <OtherMovieInfo movie={media} />
            </div>


        </div>
    )
}