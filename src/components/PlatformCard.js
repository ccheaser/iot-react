import React from 'react';
import { Link } from 'react-router-dom';
import './PlatformCard.css'; // Stilleri import edin

const PlatformCard = ({ name, tokenValue }) => {
  return (
    <div className="platform-card">
      <h2>{name}</h2>
      <p>Jeton: {tokenValue}</p>
      <button>
        <Link to={`/platform/${name.toLowerCase().replace(' ', '-')}`}>Detaylar</Link>
      </button>
    </div>
  );
};

export default PlatformCard;
