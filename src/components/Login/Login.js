import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import GoogleAuth from '../GoogleAuth/GoogleAuth';
import HorizontalBar from '../HorizontalBar/HorizontalBar';
import LoginForm from '../LoginForm/LoginForm';

import { ROUTES } from '../../constants';

const Login = () => {

  let history = useHistory();

  return (
    <div className='login'>
      <h2>Connexion</h2>

      <LoginForm history={history} />
      <HorizontalBar text='OU' />
      <GoogleAuth text='Se connecter avec Google' />

      <p className='link'>Pas encore inscrit ? <Link to={ROUTES.SIGN_UP} id='register-link'>Inscrivez-vous</Link></p>
    </div>
  );
}

export default Login;
