import React, { createContext, useEffect, useState } from 'react';
import firebaseApp from '../firebase';

export const UserContext = createContext({ user: null });

const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(userData => {
      console.log('user : ');
      console.log(userData);
      if (userData) {
        // User is signed in
        setUser(userData);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      { children }
    </UserContext.Provider>
  );
}

export default UserProvider;
