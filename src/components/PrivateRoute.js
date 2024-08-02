import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const PrivateRoute = ({ element }) => {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>; // Yüklenme durumu
  }

  if (error) {
    console.error(error);
    return <div>Error</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
