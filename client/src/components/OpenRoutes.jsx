import React from 'react';
import { getToken } from '../utils/getToken';
import { getRole } from '../utils/getRole';
import { Outlet, Navigate } from 'react-router-dom';

function OpenRoutes() {
  const token = getToken();
  const role = getRole();
  console.log(token, '...privateroutes');
  if (token && role) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default OpenRoutes;
