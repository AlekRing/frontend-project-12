import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/navbar';
import PrivateRoute from '../containers/privateRoute';
import LoginPage from '../pages/loginPage';
import NotFound from '../pages/notFound';
import ChatPage from '../pages/ChatPage';
import SignUpPage from '../pages/signUpPage';

const AppRoutes = () => {
  const [token, setToken] = useState(null);
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
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/signup" element={<SignUpPage setToken={setToken} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default AppRoutes;
