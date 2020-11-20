import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { signUp } from '../../firebase/userMethods';

import emailIsValid from '../../utils/emailIsValid';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import HorizontalBar from '../HorizontalBar/HorizontalBar';

import { ROUTES } from '../../constants';

const Register = () => {

  const [registerFormData, setRegisterFormData] = useState({
    email: '',
    password: '',
    emailError: null,
    passwordError: null
  });

  const [showPassword, setshowPassword] = useState(false);

  let history = useHistory();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  }

  const validate = (email, password) => {
    const errors = {
      empty: true,
      email: '',
      password: ''
    };

    if (!emailIsValid(email)) {
      errors.empty = false;
      errors.email = 'Email incorrect';
    }
    
    if (password.length < 6) {
      errors.empty = false;
      errors.password = '6 caractères minimum';
    }

    return errors;
  }

  const handleSignUp = e => {
    e.preventDefault();

    let email = registerFormData.email;
    let password = registerFormData.password;
    const errors = validate(email, password);

    setRegisterFormData({ 
      ...registerFormData, 
      emailError: errors.email,
      passwordError: errors.password
    });

    if (!errors.empty) return;

    signUp(email, password, () => {
      history.replace(ROUTES.HOME);
    }, error => {
      let emailError = '';

      if (error.code === 'auth/email-already-in-use') {
          emailError = 'Cet email est déjà utilisé';
      } else if (error.code === 'auth/invalid-email') {
        emailError = 'Email incorrect';
      }

      setRegisterFormData({ 
        ...registerFormData,
        passwordError: '',
        emailError: emailError
      });

      console.log(error);
    });
  }

  return (
    <div className='register'>
      <h2>Inscription</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor='register-email'>Email</label>
          <input 
            id='register-email'
            className={ registerFormData.emailError ? 'invalid' : null }
            placeholder='user@example.com'
            required
            value={registerFormData.email}
            name='email'
            type='email'
            onChange={handleChange} />
          <small className='invalid-message'>{ registerFormData.emailError }</small>  
        </div>
        <div>
          <label htmlFor='register-password'>Mot de passe (6 caractères minimum)</label>
          <div className="show-password">
            <input 
              id='register-password'
              className={ registerFormData.passwordError ? 'invalid' : null }
              placeholder='Mot de passe'
              required
              value={registerFormData.password}
              name='password'
              type={ showPassword ? 'text' : 'password' }
              onChange={handleChange} />
            <div 
              onClick={() => setshowPassword(!showPassword)}
              className='show-password-btn'>
              <i className={ showPassword ? 'icon visibility-icon' : 'icon visibility-off-icon' }></i>
            </div>
          </div>
          <small className='invalid-message'>{ registerFormData.passwordError }</small>
        </div>
        <button>S'inscrire</button>
      </form>

      <HorizontalBar text='OU' />

      <GoogleAuth text="S'inscrire avec Google" />

      <p className='link'>Déjà inscrit ? <Link to={ROUTES.SIGN_IN} id='login-link'>Connectez-vous</Link></p>
    </div>
  );
}

export default Register;
