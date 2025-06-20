import React from 'react';
import './Header.css';

const Header = () => (
  <header className="header">
    <div className="logo">LA GUARIDA DEL LOBO</div>
    <nav className="navbar">
      <a href="#">INICIO</a>
      <a href="#">ACERCA DE NOSOTROS</a>
      <a href="#">CATÁLOGO</a>
      <a href="#">CONTACTO</a>
    </nav>
    <div className="search-bar">
      <input type="text" placeholder="Buscar..." />
      <button>🔍</button>
    </div>
    <div className="icons">
      <span>🛒</span>
      <span>👤</span>
    </div>
  </header>
);

export default Header;