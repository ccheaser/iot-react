import React from 'react';
import BranchCard from '../components/BranchCard';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <h1 className="homepage-heading">Ana Sayfa</h1>
      <div className="homepage-container">
        <BranchCard name="Şube 1" />
        <BranchCard name="Şube 2" />
      </div>
    </div>
  );
};

export default HomePage;
