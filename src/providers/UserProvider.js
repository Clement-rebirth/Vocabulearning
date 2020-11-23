import React, { createContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { ROUTES } from '../constants';

import firebase from '../firebase/firebase';
import 'firebase/auth';

export const UserContext = createContext({ user: null });

const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  let location = useLocation();
  let history = useHistory();

  useEffect(() => {
    // do not redirect when the user is on the NOT_FOUND page
    if (location.pathname === ROUTES.NOT_FOUND) return;

    // User is signed in but have just started the app
    // and wasn't already on the home page or home_page/whatever
    if (user && location.pathname.indexOf(ROUTES.HOME) !== 0) history.replace(ROUTES.HOME);
    
    let landingPathsRegex = new RegExp(`^(${ROUTES.LANDING}|${ROUTES.SIGN_IN}|${ROUTES.SIGN_UP})$`);
    
    // User was signed in and is now signed out
    // and isn't already on the landing pages
    if (user === false && !landingPathsRegex.test(location.pathname)) {
      history.replace('/');
    }
  }, [user, location.pathname, history]);

  useEffect(() => {
    let unsubscribe = firebase.auth().onAuthStateChanged(userData => {
      // console.log('user : ', userData);

      if (userData) {
        setUser(userData);
      } else {
        setUser(false);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={user}>
      { children }
    </UserContext.Provider>
  );
}

export default UserProvider;
