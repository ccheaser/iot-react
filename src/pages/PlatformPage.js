import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { database } from '../firebase'; // Firebase Realtime Database konfigürasyonunu import edin
import { ref, onValue } from 'firebase/database'; // Firebase Realtime Database işlevlerini import edin
import './PlatformPage.css'; // Stil dosyasını import edin

const PlatformPage = () => {
  const { id } = useParams(); // URL'den platform ID'sini al
  const [platformData, setPlatformData] = useState(null);

  useEffect(() => {
    // Firebase'den veri çekme
    const platformRef = ref(database, `platforms/${id}`);
    const unsubscribe = onValue(platformRef, (snapshot) => {
      setPlatformData(snapshot.val());
    });

    return () => unsubscribe(); // Temizlik işlevi
  }, [id]);

  return (
    <div className="platform-page-container">
      <h1>Peron {id} Detayları</h1>
      <div className="platform-table-container">
        <table className="platform-table">
          <thead>
            <tr>
              <th>Başlık</th>
              <th>Veri</th>
            </tr>
          </thead>
          <tbody>
            {/* Firebase'den veri çekildiğinde buraya satırlar eklenecek */}
            {platformData ? (
              Object.keys(platformData).map((key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{platformData[key]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">Veri yükleniyor...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlatformPage;
