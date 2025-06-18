import { Link } from "react-router-dom";
import styles from "./menuBar.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthProvider } from "../../context/AuthProvider";
import AuthContext from "../../context/AuthContext";
export default function MenuBar() {
  const authContext = useContext(AuthContext);

  return (
    <div className={styles.MenuBarRoot}>
      <ul className={styles.MenuList}>
        <li>
          <Link to="/">Início</Link>
        </li>
        <li>
          <Link to="/movies">Filmes</Link>
        </li>
        <li>
          <Link to="/series">Séries</Link>
        </li>
        {authContext?.logged ? (
          <>
            <li>
              {" "}
              <Link to="/profile">Perfil</Link>
            </li>

            <li>
              <Link to="/favorite">Favoritos</Link>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
