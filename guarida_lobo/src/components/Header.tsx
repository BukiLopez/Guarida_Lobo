import { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { GrUser } from "react-icons/gr";
import axios from "axios";
import './Header.css';
import type { Comic } from "../types/Comic";

interface HeaderProps {
  onComicSelect: (comic: Comic) => void;
}

const Header: React.FC<HeaderProps> = ({ onComicSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Comic[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim().length > 0) {
        axios
          axios
  .get<Comic[]>(`http://localhost:3001/api/search?q=${query}`)
  .then((res) => setResults(res.data))
          .catch((err) => console.error(err));
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSelect = (comic: Comic) => {
    onComicSelect(comic);
    setQuery("");
    setResults([]);
  };

  return (
    <header className="header">
      <div className="logo">
        <span className="logo-line1">LA GUARIDA</span>
        <span className="logo-line2">DEL LOBO</span>
      </div>

      <nav className="navbar">
        <a href="#">INICIO</a>
        <a href="#">ACERCA DE NOSOTROS</a>
        <a href="#">CATÁLOGO</a>
        <a href="#">CONTACTO</a>
      </nav>

      <div className="search-bar" style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Buscar..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="search-button">
          <FaMagnifyingGlass />
        </button>

        {results.length > 0 && (
          <div className="search-results">
            {results.map((comic) => (
              <div
                key={comic.id}
                className="search-result-item"
                onClick={() => handleSelect(comic)}
              >
                <img
                  src={comic.portada_url}
                  alt={comic.nombre}
                />
                <span>{comic.nombre}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="icons">
        <span><BsCart4 /></span>
        <span><GrUser /></span>
      </div>
    </header>
  );
};

export default Header;
