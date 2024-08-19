import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import './SettingsPage.css';

const SettingsPage = () => {
  const [currentValue, setCurrentValue] = useState(''); // Firebase'deki mevcut değer
  const [newValue, setNewValue] = useState(''); // Kullanıcının girdiği yeni değer
  const [statusMessage, setStatusMessage] = useState(''); // Güncelleme durumu mesajı

  useEffect(() => {
    const db = getDatabase();
    const valueRef = ref(db, 'sube1/paradegeri/deger');

    // Mevcut değeri çekme
    onValue(valueRef, (snapshot) => {
      setCurrentValue(snapshot.val());
    });
  }, []);

  const handleValueChange = () => {
    const db = getDatabase();
    const valueRef = ref(db, 'sube1/paradegeri/deger');

    // Firebase'deki değeri güncelle
    set(valueRef, newValue)
      .then(() => {
        setStatusMessage('Değer başarıyla güncellendi!');
      })
      .catch((error) => {
        console.error('Değeri güncellerken bir hata oluştu:', error);
        setStatusMessage('Değeri güncellerken bir hata oluştu.');
      });
  };

  return (
    <div className="settings-page-container">
      <h1>Ayarlar</h1>
      
      <div className="settings-section">
        <label>Mevcut Değer</label>
        <input 
          type="text" 
          value={currentValue} 
          readOnly 
        />
      </div>

      <div className="settings-section">
        <label>Yeni Değer</label>
        <input 
          type="text" 
          value={newValue} 
          onChange={(e) => setNewValue(e.target.value)} 
          placeholder="Yeni değeri girin"
        />
      </div>

      <button className="save-button" onClick={handleValueChange}>Değeri Güncelle</button>
      
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
};

export default SettingsPage;
