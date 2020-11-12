import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import './index.css';
import './icons-css/icomoon.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Home from './components/Home/Home';
import NotFound from './components/NotFound/NotFound';
import UserProvider from './providers/UserProvider';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <Switch>
          <Route exact path={['/', '/login', '/register']}>
            <Home />
          </Route>
          <Route path='/app'>
            <App />
          </Route>
          <Route><NotFound /></Route>
        </Switch>
      </UserProvider>
    </Router>
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
