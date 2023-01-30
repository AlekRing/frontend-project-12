import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from '../containers/privateRoute';
import ChatPage from '../pages/chatPage';
import LoginPage from '../pages/loginPage';
import NotFound from '../pages/notFound';

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
