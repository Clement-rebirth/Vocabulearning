import React, { createContext, useEffect, useState } from 'react';
import firebase from '../utils/firebase/firebase';
import 'firebase/auth';

export const UserContext = createContext({
  user: null,
  setUser: () => {}
});

const UserProvider = ({ children }) => {

  // null = loading
  // false = signed out
  // object = signed in
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribe = firebase.auth().onAuthStateChanged(userData => {
      setUser(userData ? userData : false);
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      { children }
    </UserContext.Provider>
  );
}

export default UserProvider;
