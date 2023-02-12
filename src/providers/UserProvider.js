import { createContext, useEffect, useState } from 'react';
import '../utils/firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const UserContext = createContext({
  user: null,
  userLoading: true,
  setUser: () => {}
});

const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    return onAuthStateChanged(auth, userData => {
      setUser(userData);
      setUserLoading(false);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, userLoading, setUser }}>
      { children }
    </UserContext.Provider>
  );
}

export default UserProvider;
