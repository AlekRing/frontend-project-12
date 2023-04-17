import React, { useEffect, useMemo, useState } from 'react';
import AppRoutes from './routes';
import AuthContext from './store/context/authContext';
import ChatContext from './store/context/chatContext';

const App = ({ chatActions }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };
  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `bearer ${token}` } : {};
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && token !== undefined) logIn();
  }, []);

  const authCtx = useMemo(() => ({
    isLoggedIn, logIn, logOut, getAuthHeader,
  }), [isLoggedIn]);

  const passingContext = useMemo(() => ({ chatActions }), [chatActions]);

  return (
    <AuthContext.Provider value={authCtx}>
      <ChatContext.Provider value={passingContext}>
        <AppRoutes />
      </ChatContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
