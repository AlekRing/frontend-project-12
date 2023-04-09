import React, { useEffect, useMemo, useState } from 'react';
import AppRoutes from './routes';
import AuthContext from './store/context/authContext';
import ChatContext from './store/context/chatContext';
import useChat from './hooks/useChat';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && token !== undefined) logIn();
  }, []);

  const authCtx = useMemo(() => ({ isLoggedIn, logIn, logOut }), [isLoggedIn]);
  const chatActions = useChat();

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
