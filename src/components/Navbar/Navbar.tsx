import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";

import styles from "./navbar.module.css";
import { useState } from "react";
import MenuBar from "./MenuBar";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const formatSearchQuery = function (query: string) {
    return query.toLowerCase();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/search?q=${formatSearchQuery(search)}`);
    setSearch("");
  };

  return (
    <nav className={styles.NavbarRoot}>
      <div className={styles.LogoAndSearchBar}>
        <h2>
          <Link to="/" className={styles.Title}>
            <BiCameraMovie />
            Luz, Câmera. Ação!
          </Link>
        </h2>

        <form onSubmit={handleSubmit} className={styles.Form}>
          <input
            type="text"
            placeholder="Pesquisar um filme"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
          <button type="submit">
            <BiSearchAlt2 />
          </button>
        </form>
      </div>

      <MenuBar />
    </nav>
  );
}
