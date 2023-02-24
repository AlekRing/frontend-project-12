import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PrivateRoute from '../containers/PrivateRoute';
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';
import NotFound from '../pages/NotFound';
import SignUpPage from '../pages/SignUpPage';

const AppRoutes = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const { pathname } = useLocation();

  useEffect(() => {
    const checkToken = localStorage.getItem('token');

    if (checkToken !== token) {
      setToken(checkToken);
    }
  }, [pathname, token]);

  return (
    <>
      <Navbar token={token} />
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
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
