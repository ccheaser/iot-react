import React from 'react';
import { Link } from 'react-router-dom';
import './BranchCard.css'; // Stilleri import edin

const BranchCard = ({ name }) => {
  return (
    <div className="branch-card">
      <h2>{name}</h2>
      <button>
        <Link to={`/branch/${name.toLowerCase().replace(' ', '-')}`}>Detaylar</Link>
      </button>
    </div>
  );
};

export default BranchCard;
