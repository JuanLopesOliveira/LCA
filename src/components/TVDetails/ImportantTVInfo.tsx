import styles from "./ImportantTVInfo.module.css"

import { TVProps } from "../../utils/utils"

export default function ImportantTVInfo({ tv }: { tv: TVProps }) {
    return (
        <div className={styles.Info}>
            <h1>{tv.name}</h1>

            <div className={styles.Tagline}>
                <h3>{tv.tagline}</h3>
            </div>

            <h2>Título Original: {tv.original_name}</h2>
            <h4>{tv.overview}</h4>
        </div>
    )
}