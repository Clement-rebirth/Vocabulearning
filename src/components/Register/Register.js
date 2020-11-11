import React, { useState } from 'react';
import emailIsValid from '../../utils/emailIsValid';
import firebaseApp from '../../firebase';
import 'firebase/auth';
import GoogleAuth from '../GoogleAuth/GoogleAuth';
import HorizontalBar from '../HorizontalBar/HorizontalBar';
import { Link } from 'react-router-dom';

const Register = () => {

  const [registerFormData, setRegisterFormData] = useState({
    email: '',
    password: '',
    emailError: null,
    passwordError: null
  });

  const [showPassword, setshowPassword] = useState(false);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  }

  const validate = (formData) => {
    const errors = {
      empty: true,
      email: '',
      password: ''
    };

    if (!emailIsValid(formData.email)) {
      errors.empty = false;
      errors.email = 'Email incorrect';
    }
    
    if (formData.password.length < 6) {
      errors.empty = false;
      errors.password = '6 caractères minimum';
    }

    return errors;
  }

  const handleRegister = e => {
    e.preventDefault();

    const formData = {
      email: registerFormData.email,
      password: registerFormData.password
    };

    const errors = validate(formData);

    setRegisterFormData({ 
      ...registerFormData, 
      emailError: errors.email,
      passwordError: errors.password
    });

    if (!errors.empty) return;

    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(user => {
        console.log(user);
      }).catch(error => {
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
      <form onSubmit={handleRegister}>
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

      <p className='link'>Déjà inscrit ? <Link to='/login' id='login-link'>Connectez-vous</Link></p>
    </div>
  );
}

export default Register;
