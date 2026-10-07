import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { Spin } from 'antd';

const PrivateRoute = ({ children }) => {
  const { token, loading } = useContext(AuthContext);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}><Spin size="large" /></div>;
  }

  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
