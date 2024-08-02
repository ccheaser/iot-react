import React from 'react';
import { useParams } from 'react-router-dom';
import PlatformCard from '../components/PlatformCard';
import branchData from '../data/branchData'; // Veriyi import edin
import './BranchPage.css'; // Stil dosyasını import edin

const BranchPage = () => {
  const { id } = useParams();
  const platforms = branchData[id] || []; // İlgili şubenin platform kartlarını al

  return (
    <div className="branch-page-container">
      <h1 className="branch-page-heading">{id} Sayfası</h1>
      {platforms.map((platform, index) => (
        <PlatformCard key={index} name={platform} />
      ))}
    </div>
  );
};

export default BranchPage;
