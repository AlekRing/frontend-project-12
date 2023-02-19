import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../containers/PrivateRoute';
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  const token = localStorage.getItem('token');

  return (
    <Routes>
      <Route
        path="/"
        element={(
          <PrivateRoute token={token}>
            <ChatPage token={token} />
          </PrivateRoute>
    )}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
