import { createContext, useContext, useEffect, useState } from 'react';
import '../utils/firebase/firebase';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';

interface UserContextValues {
  user: User | null;
  userLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextValues | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {

  const [user, setUser] = useState<User | null>(null);
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

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
