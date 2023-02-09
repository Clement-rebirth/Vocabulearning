import './firebase';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithRedirect, signOut } from 'firebase/auth';

export const signIn = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};

export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  await signInWithRedirect(auth, provider);
};

export const logOut = () => {
  const auth = getAuth();
  return signOut(auth);
};

export const signUp = (email, password) => {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};
