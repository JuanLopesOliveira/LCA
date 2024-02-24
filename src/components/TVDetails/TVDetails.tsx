import styles from "./TVDetails.module.css";

import ImportantTVInfo from "./ImportantTVInfo"
import OtherTVInfo from "./OtherTVInfo";

import { TVProps } from "../../utils/utils";

const imageURL = import.meta.env.VITE_IMG

export default function TVDetails({ media }: {media: TVProps}) {
    return (
        <div className={styles.MovieDetailsRoot}>

            <div className={styles.BannerDiv}>
                <img src={imageURL + media.backdrop_path} alt={media.name} />
            </div>

            <div className={styles.Details}>
                <div className={styles.PosterImage}>
                    <img src={imageURL + media.poster_path} alt={media.name} />
                </div>

                <ImportantTVInfo tv={media} />
            </div>

            <div className={styles.OtherMovieInformation}>
                <OtherTVInfo tv={media} />
            </div>


        </div>
    )
}