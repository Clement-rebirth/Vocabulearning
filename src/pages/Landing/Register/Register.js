import React from 'react';
import { Link } from 'react-router-dom';

import GoogleAuth from '../GoogleAuth';
import HorizontalBar from '../../../components/HorizontalBar/HorizontalBar';
import RegisterForm from './RegisterForm';

import { ROUTES } from '../../../constants';

const Register = () => {
  return (
    <div className='register'>
      <h2 className='underline-title'><span>Inscription</span></h2>

      <RegisterForm />
      <HorizontalBar text='OU' />
      <GoogleAuth text="S'inscrire avec Google" />

      <p className='link'>
        Déjà inscrit ? <Link to={ROUTES.SIGN_IN} id='login-link'>Connectez-vous</Link>
      </p>
    </div>
  );
}

export default Register;
