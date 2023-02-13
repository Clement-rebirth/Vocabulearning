import React from 'react';
import { createRoot } from 'react-dom/client';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import Landing from './pages/Landing/Landing';
import NotFound from './pages/NotFound/NotFound';
import UserProvider from './providers/UserProvider';
import PopUpProvider from './providers/PopUpProvider';

import { ROUTES } from './constants';

import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserProvider>
      <PopUpProvider>
        <Router>
          <Routes>
            <Route path={ROUTES.LANDING} element={<Landing />} />
            <Route path={ROUTES.SIGN_IN} element={<Landing />} />
            <Route path={ROUTES.SIGN_UP} element={<Landing />} />
            <Route path={ROUTES.DISPLAY_ONE_LIST} element={<App />} />
            <Route path={`${ROUTES.HOME}/*`} element={<App />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            <Route path='*' element={<Navigate to={ROUTES.NOT_FOUND} replace={true} />} />
          </Routes>
        </Router>
      </PopUpProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
