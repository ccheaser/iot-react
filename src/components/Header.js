import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Stil dosyasını import edin

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <Link to="/" className="nav-link"></Link>
        <Link to="/branch/şube-1" className="nav-link"></Link>
      </nav>
    </header>
  );
};

export default Header;
