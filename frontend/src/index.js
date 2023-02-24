import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import App from './App';
import reportWebVitals from './reportWebVitals';
import locales from './i18n/locales';

import store from './store';

i18n
  .use(initReactI18next)
  .init({
    resources: locales,
    lng: 'ru',
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>,
);

reportWebVitals();
