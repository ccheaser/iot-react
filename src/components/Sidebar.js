import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBuilding, FaChevronDown, FaChevronUp, FaBars, FaTimes } from 'react-icons/fa';
import './Sidebar.css';
import logo from '../images/logo.png'; // Logo resmini import edin

const Sidebar = () => {
  const [isBranchMenuOpen, setIsBranchMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleBranchMenuToggle = () => {
    setIsBranchMenuOpen(!isBranchMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div className="menu-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </div>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <nav className="nav-buttons">
        <Link to="/" className="nav-link home-link">
          <FaHome className="nav-icon" />
          <div className="nav-link-label">Anasayfa</div>
          <div className="nav-link-small-text">Anasayfa</div> {/* Küçük yazı */}
        </Link>
        <div className="nav-link branch-link" onClick={handleBranchMenuToggle}>
          <FaBuilding className="nav-icon" />
          <div className="nav-link-label">Şubeler</div>
          <div className="nav-link-small-text">Şubeler</div> {/* Küçük yazı */}
          {isBranchMenuOpen ? <FaChevronUp className="chevron-icon" /> : <FaChevronDown className="chevron-icon" />}
        </div>
        <div className={`branch-menu ${isBranchMenuOpen ? 'open' : ''}`}>
          <Link to="/branch/şube-1" className="branch-link-item">Şube 1</Link>
          <Link to="/branch/şube-2" className="branch-link-item">Şube 2</Link>
          {/* Diğer şubeleri buraya ekleyin */}
        </div>
      </nav>
      <div className="logout">
        <button>Çıkış</button>
      </div>
    </div>
  );
};

export default Sidebar;
