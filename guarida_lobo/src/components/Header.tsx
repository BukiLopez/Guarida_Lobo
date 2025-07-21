import { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { GrUser } from "react-icons/gr";
import axios from "axios";
import './Header.css';
import type { Comic } from "../types/Comic";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onComicSelect: (comic: Comic) => void;
}

const Header: React.FC<HeaderProps> = ({ onComicSelect }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Comic[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim().length > 0) {
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

  // Función para manejar el click en el icono usuario
  const handleUserClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/perfil");
    } else {
      navigate("/login");
    }
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
                <img src={comic.portada_url} alt={comic.nombre} />
                <span>{comic.nombre}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="icons">
        <span onClick={() => navigate("/carrito")} style={{ cursor: "pointer" }}>
          <BsCart4 />
        </span>
        <span onClick={handleUserClick} style={{ cursor: "pointer" }}>
          <GrUser />
        </span>
      </div>
    </header>
  );
};

export default Header;
