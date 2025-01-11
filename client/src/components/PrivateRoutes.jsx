import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes({ allowedRole }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  console.log(token, '...privateroutes');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (!allowedRole.includes(role)) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default PrivateRoutes;
