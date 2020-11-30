import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import GoogleAuth from '../GoogleAuth/GoogleAuth';
import HorizontalBar from '../HorizontalBar/HorizontalBar';
import RegisterForm from '../RegisterForm.js/RegisterForm';

import { ROUTES } from '../../constants';

const Register = () => {

  let history = useHistory();

  return (
    <div className='register'>
      <h2>Inscription</h2>

      <RegisterForm history={history} />
      <HorizontalBar text='OU' />
      <GoogleAuth text="S'inscrire avec Google" />

      <p className='link'>
        Déjà inscrit ? <Link to={ROUTES.SIGN_IN} id='login-link'>Connectez-vous</Link>
      </p>
    </div>
  );
}

export default Register;
