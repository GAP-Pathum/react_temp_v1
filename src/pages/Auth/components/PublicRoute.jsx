import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { CSpinner } from '@coreui/react';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <CSpinner size="lg" />
      </div>
    );
  }

  if (isAuthenticated) {
    // Redirect authenticated users to home
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default PublicRoute;
