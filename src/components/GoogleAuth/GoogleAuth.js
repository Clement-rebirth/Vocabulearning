import React from 'react';
import { useHistory } from 'react-router-dom';
import { googleSignIn } from '../../firebase/userMethods';

import { ROUTES } from '../../constants';

const GoogleAuth = ({ text }) => {

  let history = useHistory();

  const handleGoogleSignIn = () => {
    googleSignIn(() => {
      history.push(ROUTES.HOME);
    }, error => {
      console.log({
        code: error.code,
        message: error.message,
        email: error.email,
        credential: error.credential,
      });
    });
  }

  return (
    <button className='google-sign-in' onClick={handleGoogleSignIn}>
      <span className='icon google-g-icon'>
        <span className='path1' /><span className='path2' /><span className='path3' /><span className='path4' />
      </span>
      { text }
    </button>
  );
}

export default GoogleAuth;
