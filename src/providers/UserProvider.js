import { createContext, useEffect, useState } from 'react';
import '../utils/firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
    const auth = getAuth();

    return onAuthStateChanged(auth, userData => {
      setUser(userData ? userData : false);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      { children }
    </UserContext.Provider>
  );
}

export default UserProvider;
