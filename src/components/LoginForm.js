import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Başarıyla giriş yapıldığında HomePage'e yönlendir
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-form-container">
      <h2>Hoşgeldin</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="E-posta"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Şifre"
          />
        </div>
        <button type="submit">Giriş yap!</button>
        {error && <p className="error-message">{error}</p>}
        <div className="login-link">
          <p>Bir hesaba sahip değil misin?</p>
          <Link to="/register">Kayıt ol!</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
