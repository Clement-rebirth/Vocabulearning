import React, { createContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import firebaseApp from '../firebase';

export const UserContext = createContext({ user: 'initializing' });

const UserProvider = ({ children }) => {

  const [user, setUser] = useState('initializing');
  let location = useLocation();
  let history = useHistory();

  const updateUser = (userData) => {
    console.log('user : ', userData);

    if (userData) {
      // User was signed out and is now signed in
      if (user === null) history.replace('/app');

      // User is signed in but have just started the app
      // and wasn't already on the app page
      if (user === 'initializing' && location.pathname !== '/app') history.replace('/app');
      setUser(userData);
    } else {
      // User was signed in and is now signed out
      // and isn't already on the home pages
      let homePathsRegex = /(\/)|(\/login)|(\/register)/;
      if (user !== null && homePathsRegex.test(location.pathname)) history.replace('/');
      setUser(null);
    }
  };

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(updateUser);
  }, []);

  return (
    <UserContext.Provider value={user}>
      { children }
    </UserContext.Provider>
  );
}

export default UserProvider;
