import React, { useState } from 'react';
import firebaseApp from '../../firebase';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import HorizontalBar from '../HorizontalBar/HorizontalBar';
import { Link } from 'react-router-dom';

const Login = () => {

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setshowPassword] = useState(false);

  const handleChange = e => {
    const { value, name } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  }

  const handleLogin = e => {
    e.preventDefault();
    const { email, password } = loginFormData;

    firebaseApp.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log('login errors :');
        console.log(error);
        alert('Email ou mot de passe incorrect');
      });
  }

  return (
    <div className='login'>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
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

      <p className='link'>Pas encore inscrit ? <Link to='/register' id='register-link'>Inscrivez-vous</Link></p>
    </div>
  );
}

export default Login;
