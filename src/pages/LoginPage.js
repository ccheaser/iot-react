import React from 'react';
import LoginForm from '../components/LoginForm';
import './LoginPage.css'; // CSS dosyasını import et

const LoginPage = () => {
  return (
    <div className="login-page">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
