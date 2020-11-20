import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { signIn } from '../../firebase/userMethods';

import GoogleAuth from '../GoogleAuth/GoogleAuth';
import HorizontalBar from '../HorizontalBar/HorizontalBar';

import { ROUTES } from '../../constants';

const Login = () => {

  let history = useHistory();

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setshowPassword] = useState(false);

  const handleChange = e => {
    const { value, name } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  }

  const handleSignIn = e => {
    e.preventDefault();
    const { email, password } = loginFormData;

    signIn(email, password, () => {
      history.replace(ROUTES.HOME);
    }, error => {
      console.log('login errors :');
      console.log(error);
      alert('Email ou mot de passe incorrect');
    });
  }

  return (
    <div className='login'>
      <h2>Connexion</h2>
      <form onSubmit={handleSignIn}>
        <div>
          <label htmlFor='login-email'>Email</label>
          <input
            id='login-email'
            placeholder='user@example.com'
            required
            value={loginFormData.email}
            name='email'
            type='email'
            onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='login-password'>Mot de passe</label>
          <div className='show-password'>
            <input
              id='login-password'
              placeholder='Mot de passe'
              required
              value={loginFormData.password}
              name='password'
              type={ showPassword ? 'text' : 'password' }
              onChange={handleChange} />
            <div 
              onClick={() => setshowPassword(!showPassword)}
              className='show-password-btn'>
              <i className={ showPassword ? 'icon visibility-icon' : 'icon visibility-off-icon' }></i>
            </div>
          </div>
        </div>
        <button>Se connecter</button>
      </form>

      <HorizontalBar text='OU' />

      <GoogleAuth text='Se connecter avec Google' />

      <p className='link'>Pas encore inscrit ? <Link to={ROUTES.SIGN_UP} id='register-link'>Inscrivez-vous</Link></p>
    </div>
  );
}

export default Login;
