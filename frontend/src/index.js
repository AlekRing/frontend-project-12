import React from 'react';
import { io } from 'socket.io-client';
import { Provider, ErrorBoundary } from '@rollbar/react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client';
import 'react-toastify/dist/ReactToastify.css';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import App from './App';
import reportWebVitals from './reportWebVitals';
import locales from './i18n/locales';
import store from './store';
import { addMessages } from './store/reducers/chatMessages';
import { addChannels, removeChannel, renameChannel as renameChannelReducer } from './store/reducers/chatChannels';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_CONFIG_TOKEN,
  environment: 'testenv',
};

i18n
  .use(initReactI18next)
  .init({
    resources: locales,
    lng: 'ru',
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
const initSocket = () => {
  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessages([payload]));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannels([payload]));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannelReducer(payload));
  });

  const sendMessage = (data) => {
    socket.emit('newMessage', data);
  };

  const createChannel = (name, onFulfilled) => {
    socket.emit('newChannel', { name }, onFulfilled);
  };

  const deleteChannel = (id, onFulfilled) => {
    socket.emit('removeChannel', { id }, onFulfilled);
  };

  const renameChannel = (id, name, onFulfilled) => {
    socket.emit('renameChannel', { id, name }, onFulfilled);
  };

  const handlers = {
    sendMessage,
    createChannel,
    deleteChannel,
    renameChannel,
  };

  return handlers;
};

const init = () => {
  const handlers = initSocket();

  root.render(
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <ReduxProvider store={store}>
            <React.StrictMode>
              <App chatActions={handlers} />
            </React.StrictMode>
          </ReduxProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </Provider>,
  );
};

init();
reportWebVitals();
