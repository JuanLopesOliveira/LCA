import { Link } from 'react-router-dom'
import styles from './menuBar.module.css'

export default function MenuBar() {
    return (
        <div className={styles.MenuBarRoot}>
            <ul className={styles.MenuList}>
                <li><Link to="/">Início</Link></li>
                <li><Link to="/movies">Filmes</Link></li>
                <li><Link to="/series">Séries</Link></li>
            </ul>
        </div>
    )
}