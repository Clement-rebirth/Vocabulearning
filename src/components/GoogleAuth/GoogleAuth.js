import React from 'react';

import firebase from 'firebase/app';
import firebaseApp from '../../firebase';
import 'firebase/auth';
import { useHistory } from 'react-router-dom';

const GoogleAuth = ({ text }) => {

  let history = useHistory();

  const googleAuthenticate = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebaseApp.auth().signInWithRedirect(provider);
    firebaseApp.auth().getRedirectResult()
      .then(() => {
        history.push('/app');
      }).catch(error => {
        console.log({
          code: error.code,
          message: error.message,
          email: error.email,
          credential: error.credential,
        });
      });
  }

  return (
    <button className='google-sign-in' onClick={googleAuthenticate}>
      <span className='icon google-g-icon'>
        <span className='path1' /><span className='path2' /><span className='path3' /><span className='path4' />
      </span>
      { text }
    </button>
  );
}

export default GoogleAuth;
