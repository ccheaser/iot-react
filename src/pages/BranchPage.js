import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PlatformCard from '../components/PlatformCard';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import './BranchPage.css'; // Stil dosyasını import edin

const BranchPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [platformData, setPlatformData] = useState([]);
  
  useEffect(() => {
    const db = getDatabase();
    const auth = getAuth();
    const userRef = ref(db, `users/${auth.currentUser.uid}`);
    
    // Kullanıcı rolünü almak
    const unsubscribeUser = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (!data || !data.role) {
        navigate("/login"); // Kullanıcı yetkisi yoksa giriş sayfasına yönlendir
      }
    });

    return () => unsubscribeUser();
  }, [navigate]);

  useEffect(() => {
    const db = getDatabase();
    
    // Firebase referanslarını oluştur
    const platformRefs = Array.from({ length: 11 }, (_, i) => ref(db, `para${i + 1}`));
    
    // Para verilerini almak
    Promise.all(platformRefs.map(ref => 
      new Promise((resolve) => 
        onValue(ref, (snapshot) => resolve(snapshot.val()))
      )
    )).then(values => {
      setPlatformData(values);
    });

  }, []);

  return (
    <div className="branch-page-container">
      <h1 className="branch-page-heading">Şube {id} Sayfası</h1>
      {platformData.map((tokenValue, index) => (
        <PlatformCard key={index} name={`Peron ${index + 1}`} tokenValue={tokenValue} />
      ))}
    </div>
  );
};

export default BranchPage;
