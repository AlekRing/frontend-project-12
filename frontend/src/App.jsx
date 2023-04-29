import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import AppRoutes from './routes';
import AuthContext from './store/context/authContext';
import ChatContext from './store/context/chatContext';
import logout from './store/actions/auth';
import { setUserName } from './store/reducers/user';

const App = ({ chatActions }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const logIn = ({ token, userName }) => {
    localStorage.setItem('token', token);

    dispatch(setUserName(userName));

    setIsLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    setIsLoggedIn(false);
  };
  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `bearer ${token}` } : {};
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && token !== undefined) logIn(token);
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
