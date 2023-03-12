import React, { useMemo } from 'react';
import AppRoutes from './routes';
import SocketContext from './store/context/socketContext';
import useSocket from './hooks/useSocket';

const App = () => {
  const socket = useSocket();

  const passingContext = useMemo(
    () => ({ socket }),
    [socket],
  );

  return (
    <SocketContext.Provider value={passingContext}>
      <AppRoutes />
    </SocketContext.Provider>
  );
};

export default App;
