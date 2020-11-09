import React, { useState } from 'react';
import firebaseApp from '../../firebase';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import VerticalBar from '../VerticalBar/VerticalBar';
import { Link } from 'react-router-dom';

const Login = () => {

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });

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
      <Link to='/' className='back-home'>Retour (icon)</Link>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='login-email'>Email :</label>
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
          <label htmlFor='login-password'>Mot de passe :</label>
          <input
            id='login-password'
            placeholder='Mot de passe'
            required
            value={loginFormData.password}
            name='password'
            type='password'
            onChange={handleChange} />
        </div>
        <button>Se connecter</button>
      </form>

      <VerticalBar text='OU' />

      <GoogleAuth text='Se connecter avec Google' />

      <p>Pas encore de compte ? <Link to='/register' id='register-link'>Inscrivez-vous gratuitement</Link></p>
    </div>
  );
}

export default Login;
