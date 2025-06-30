import React from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { GrUser } from "react-icons/gr";
import './Header.css';

const Header = () => (
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
    <div className="search-bar">
      <input type="text" placeholder="Buscar..." />
      <button className="search-button"><FaMagnifyingGlass /></button>
    </div>
    <div className="icons">
      <span><BsCart4 /></span>
      <span><GrUser /></span>
    </div>
  </header>
);

export default Header;
