import firebase from './firebase';
import 'firebase/auth';

export function signIn(email, password, resolve, reject) {
  firebase
  .auth()
  .signInWithEmailAndPassword(email, password)
  .then(resolve)
  .catch(reject);
}

export function googleSignIn(resolve, reject) {
  let provider = new firebase.auth.GoogleAuthProvider();
  
  firebase
  .auth()
  .signInWithRedirect(provider);
  
  firebase
  .auth()
  .getRedirectResult()
  .then(resolve)
  .catch(reject);
}

export function signOut(resolve, reject) {
  firebase
  .auth()
  .signOut()
  .then(resolve)
  .catch(reject);
}

export function signUp(email, password, resolve, reject) {
  firebase
  .auth()
  .createUserWithEmailAndPassword(email, password)
  .then(resolve)
  .catch(reject);
}
