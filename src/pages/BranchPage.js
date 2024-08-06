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
  const [supurgeData, setSupurgeData] = useState([]);

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
    const peronRefs = Array.from({ length: 8 }, (_, i) => ref(db, `sube1/peronlar/peron${i + 1}`));
    const supurgeRefs = Array.from({ length: 3 }, (_, i) => ref(db, `sube1/supurgeler/supurge${i + 1}`));

    // Peron verilerini almak
    Promise.all(peronRefs.map(peronRef => 
      new Promise((resolve) => 
        onValue(peronRef, (snapshot) => resolve(snapshot.val()))
      )
    )).then(values => {
      setPlatformData(values.map((value, index) => ({
        name: `peron${index + 1}`,
        value
      })));
    });

    // Supurge verilerini almak
    Promise.all(supurgeRefs.map(supurgeRef => 
      new Promise((resolve) => 
        onValue(supurgeRef, (snapshot) => resolve(snapshot.val()))
      )
    )).then(values => {
      setSupurgeData(values.map((value, index) => ({
        name: `supurge${index + 1}`,
        value
      })));
    });

  }, []);

  return (
    <div className="branch-page-container">
      <h1 className="branch-page-heading">Şube {id} Sayfası</h1>
      
      {platformData.length === 0 ? (
        <p>No peron data available</p>
      ) : (
        platformData.map((data, index) => (
          <PlatformCard 
            key={`peron-${index}`} 
            name={`Peron ${data.name.replace('peron', '')}`} 
            tokenValue={data.value} 
          />
        ))
      )}

      {supurgeData.length === 0 ? (
        <p>No supurge data available</p>
      ) : (
        supurgeData.map((data, index) => (
          <PlatformCard 
            key={`supurge-${index}`} 
            name={`Supurge ${data.name.replace('supurge', '')}`} 
            tokenValue={data.value} 
          />
        ))
      )}
    </div>
  );
};

export default BranchPage;
