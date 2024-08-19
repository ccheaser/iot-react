import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, onValue } from 'firebase/database';
import './PlatformPage.css'; // Stil dosyasını import edin

const PlatformPage = () => {
  const { id } = useParams(); // URL'den peron ID'sini al
  const [weeklyData, setWeeklyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [durumlar, setDurumlar] = useState({});
  const [peronSecenekler, setPeronSecenekler] = useState({
    su: null,
    sicakSu: null,
    kopuk: null,
    renkliKopuk: null,
    cila: null,
  });
  const [progress, setProgress] = useState({
    su: 0,
    sicakSu: 0,
    kopuk: 0,
    renkliKopuk: 0,
    cila: 0,
  });
  const [intervals, setIntervals] = useState({});
  const [error, setError] = useState(null);

  // Timer sürelerini useMemo ile sarmalıyoruz, böylece her render'da yeniden oluşturulmaz.
  const timerDurations = useMemo(() => ({
    su: 3 * 60 * 1000, // 3 dakika
    sicakSu: 3 * 60 * 1000, // 3 dakika
    kopuk: 1 * 60 * 1000, // 1 dakika
    renkliKopuk: 1 * 60 * 1000, // 1 dakika
    cila: 45 * 1000, // 45 saniye
  }), []);

  // ID'yi Firebase formatına dönüştür
  const formatId = id.replace('-', ''); // 'peron-2' -> 'peron2'

  const startProgressBar = useCallback((key) => {
    const duration = timerDurations[key];
    const startTime = Date.now();
    const endTime = startTime + duration;

    const progressInterval = setInterval(() => {
      const now = Date.now();
      const timeLeft = endTime - now;
      if (timeLeft <= 0) {
        clearInterval(progressInterval);
        setProgress((prevState) => ({
          ...prevState,
          [key]: 0, // Süre dolduğunda çubuğu sıfırla
        }));
      } else {
        const progressPercentage = ((duration - timeLeft) / duration) * 100;
        setProgress((prevState) => ({
          ...prevState,
          [key]: progressPercentage,
        }));
      }
    }, 100);

    setIntervals((prevState) => ({
      ...prevState,
      [key]: progressInterval,
    }));
  }, [timerDurations]);

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

    // Durum verilerini çekme
    const durumlarRef = ref(db, `sube1/durumlar`);
    const unsubscribeDurumlar = onValue(durumlarRef, 
      (snapshot) => {
        setDurumlar(snapshot.val());
      },
      (error) => {
        console.error('Durum verisi çekme hatası:', error);
        setError('Durum verisi çekme hatası');
      }
    );

    // Peron seçeneklerini çekme
    const peronSeceneklerYollari = ['su', 'sicakSu', 'kopuk', 'renkliKopuk', 'cila'];
    peronSeceneklerYollari.forEach((secenek) => {
      const secenekRef = ref(db, `sube1/peronsecenekler/${secenek}`);
      onValue(secenekRef, (snapshot) => {
        setPeronSecenekler((prevState) => ({
          ...prevState,
          [secenek]: snapshot.val(),
        }));
      }, (error) => {
        console.error(`${secenek} verisi çekme hatası:`, error);
        setError(`${secenek} verisi çekme hatası`);
      });
    });

    return () => {
      unsubscribeWeekly();
      unsubscribeMonthly();
      unsubscribeDaily();
      unsubscribeDurumlar();
      
      // Sayfa kapatıldığında tüm interval'ları temizleyelim
      Object.keys(intervals).forEach((key) => clearInterval(intervals[key]));
    };
  }, [formatId, intervals]);

  useEffect(() => {
    // Her durum değiştiğinde progress bar'ı başlat
    Object.keys(durumlar).forEach((key) => {
      if (durumlar[key] === "online") {
        startProgressBar(key);
      }
    });
  }, [durumlar, startProgressBar]);

  const renderProgressBar = (key) => (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress[key]}%` }}></div>
    </div>
  );

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
                {typeof data === 'number' ? (
                  data
                ) : (
                  Object.keys(data).map(key => (
                    <span key={key}>
                      {Array.isArray(data[key]) ? data[key].join('') : data[key]}
                    </span>
                  ))
                )}
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

  const renderDurumKart = (durum, title, veri) => {
    const isOnline = durum === "online";
    const statusClass = isOnline ? "status-indicator online" : "status-indicator offline";
    const cardClass = isOnline ? "durum-card active" : "durum-card";

    return (
      <div className={cardClass} key={title}>
        <h3>{title}</h3>
        <div className={statusClass}></div>
        <p>{veri !== null ? veri : 'Veri bulunamadı'}</p>
        {renderProgressBar(title.toLowerCase())} {/* Progress bar burada ekleniyor */}
      </div>
    );
  };

  return (
    <div className="platform-page-container">
      <h1>Peron {formatId} Detayları</h1>
      {error && <p className="error-message">{error}</p>}
      
      <div className="durum-cards-container">
        {renderDurumKart(durumlar.suDurum, 'Su', peronSecenekler.su)}
        {renderDurumKart(durumlar.sicakSuDurum, 'Sıcak Su', peronSecenekler.sicakSu)}
        {renderDurumKart(durumlar.kopukDurum, 'Köpük', peronSecenekler.kopuk)}
        {renderDurumKart(durumlar.renkliKopukDurum, 'Renkli Köpük', peronSecenekler.renkliKopuk)}
        {renderDurumKart(durumlar.cilaDurum, 'Cila', peronSecenekler.cila)}
      </div>

      {renderTable(weeklyData, 'Haftalık Veriler')}
      {renderTable(monthlyData, 'Aylık Veriler')}
      {renderTable(dailyData, 'Günlük Veriler')}
    </div>
  );
};

export default PlatformPage;
