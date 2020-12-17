import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import App from './App';
import Landing from './pages/Landing/Landing';
import NotFound from './pages/NotFound/NotFound';
import UserProvider from './providers/UserProvider';
import PopUpProvider from './providers/PopUpProvider';

import { ROUTES } from './constants';

import './index.css';
import './assets/icons-css/icomoon.css';

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path={[ROUTES.LANDING, ROUTES.SIGN_IN, ROUTES.SIGN_UP]}>
            <Landing />
          </Route>
          <Route path={[ROUTES.DISPLAY_ONE_LIST, ROUTES.HOME]}>
            <PopUpProvider>
              <App />
            </PopUpProvider>
          </Route>
          <Route path={ROUTES.NOT_FOUND}>
            <NotFound />
          </Route>
          <Route>
            <Redirect to={ROUTES.NOT_FOUND} />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
