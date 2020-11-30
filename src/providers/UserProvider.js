import React, { createContext, useEffect, useState } from 'react';

import firebase from '../firebase/firebase';
import 'firebase/auth';

export const UserContext = createContext({ 
  user: null,
  setUser: () => {}
});

const UserProvider = ({ children }) => {

  // null = loading
  // false = sign out
  // other = sign in
  const [user, setUser] = useState(null);

  // console.log('user : ', user);

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
