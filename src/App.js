import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BranchPage from './pages/BranchPage';
import PlatformPage from './pages/PlatformPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './components/PrivateRoute'; // Güncellenmiş PrivateRoute

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute
              element={
                <div className="main-layout">
                  <Sidebar />
                  <div className="content">
                    <Header />
                    <HomePage />
                  </div>
                </div>
              }
            />
          }
        />
        <Route
          path="/branch/:id"
          element={
            <PrivateRoute
              element={
                <div className="main-layout">
                  <Sidebar />
                  <div className="content">
                    <Header />
                    <BranchPage />
                  </div>
                </div>
              }
            />
          }
        />
        <Route
          path="/platform/:id"
          element={
            <PrivateRoute
              element={
                <div className="main-layout">
                  <Sidebar />
                  <div className="content">
                    <Header />
                    <PlatformPage />
                  </div>
                </div>
              }
            />
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
