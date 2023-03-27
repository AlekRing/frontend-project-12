import React, { useMemo } from 'react';
import AppRoutes from './routes';
import ChatContext from './store/context/chatContext';
import useChat from './hooks/useChat';

const App = () => {
  const chatActions = useChat();

  const passingContext = useMemo(() => ({ chatActions }), [chatActions]);

  return (
    <ChatContext.Provider value={passingContext}>
      <AppRoutes />
    </ChatContext.Provider>
  );
};

export default App;
