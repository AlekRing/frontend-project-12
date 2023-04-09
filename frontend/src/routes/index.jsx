import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from '../components/navbar';
import PrivateRoute from '../components/privateRoute';
import NotFound from '../components/notFound';
import ChatPage from '../components/chatPage';
import SignUp from '../components/SignUp';
import Login from '../components/login';

const AppRoutes = () => (
  <>
    <Navbar />
    <Routes>
      <Route
        path="/"
        element={(
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        )}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <ToastContainer />
  </>
);

export default AppRoutes;
