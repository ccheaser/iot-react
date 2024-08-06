import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import './PlatformPage.css'; // Stil dosyasını import edin

const PlatformPage = () => {
  const { id } = useParams(); // URL'den peron ID'sini al
  const [weeklyData, setWeeklyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [error, setError] = useState(null);

  // ID'yi Firebase formatına dönüştür
  const formatId = id.replace('-', ''); // 'peron-2' -> 'peron2'

  useEffect(() => {
    const db = getDatabase();

    // Haftalık veriyi çekme
    const weeklyRef = ref(db, `sube1/tabloverileri/haftalik/${formatId}`);
    const unsubscribeWeekly = onValue(weeklyRef, 
      (snapshot) => {
        setWeeklyData(snapshot.val());
        setError(null);
      },
      (error) => {
        console.error('Haftalık veri çekme hatası:', error);
        setError('Haftalık veri çekme hatası');
      }
    );

    // Aylık veriyi çekme
    const monthlyRef = ref(db, `sube1/tabloverileri/aylik/${formatId}`);
    const unsubscribeMonthly = onValue(monthlyRef, 
      (snapshot) => {
        setMonthlyData(snapshot.val());
        setError(null);
      },
      (error) => {
        console.error('Aylık veri çekme hatası:', error);
        setError('Aylık veri çekme hatası');
      }
    );

    // Günlük veriyi çekme
    const dailyRef = ref(db, `sube1/tabloverileri/gunluk/${formatId}`);
    const unsubscribeDaily = onValue(dailyRef, 
      (snapshot) => {
        setDailyData(snapshot.val());
        setError(null);
      },
      (error) => {
        console.error('Günlük veri çekme hatası:', error);
        setError('Günlük veri çekme hatası');
      }
    );

    return () => {
      unsubscribeWeekly();
      unsubscribeMonthly();
      unsubscribeDaily();
    };
  }, [formatId]);

  const renderTable = (data, title) => (
    <div className="platform-table-container">
      <h2>{title}</h2>
      <table className="platform-table">
        <thead>
          <tr>
            <th>Peron</th>
            <th>Jeton</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            <tr>
              <td>{formatId}</td> {/* Peron ID'si burada gösteriliyor */}
              <td>
                {Object.keys(data).map(key => (
                  <span key={key}>
                    {Array.isArray(data[key]) ? data[key].join('') : data[key]}
                  </span>
                ))}
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan="2">Veri yükleniyor...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="platform-page-container">
      <h1>Peron {formatId} Detayları</h1>
      {error && <p className="error-message">{error}</p>}
      {renderTable(weeklyData, 'Haftalık Veriler')}
      {renderTable(monthlyData, 'Aylık Veriler')}
      {renderTable(dailyData, 'Günlük Veriler')}
    </div>
  );
};

export default PlatformPage;
