import React from 'react';
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

const rollbarConfig = {
  accessToken: '465a8bd8d9234685aff8bea4e277acec',
  environment: 'testenv',
};

i18n
  .use(initReactI18next)
  .init({
    resources: locales,
    lng: 'ru',
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <BrowserRouter>
        <ReduxProvider store={store}>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ReduxProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>,
);

reportWebVitals();
