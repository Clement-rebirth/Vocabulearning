import React, { useState } from 'react';
import emailIsValid from '../../utils/emailIsValid';
import firebaseApp from '../../firebase';
import 'firebase/auth';
import GoogleAuth from '../GoogleAuth/GoogleAuth';

const Register = () => {

  const [registerFormData, setRegisterFormData] = useState({
    email: '',
    password: '',
    emailError: null,
    passwordError: null
  });

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
      errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    return errors;
  }
    
  const clearForm = () => {
    let formData = { ...registerFormData };
    for (let data in formData) formData[data] = '';
    setRegisterFormData(formData);
  }

  const handleRegister = e => {
    e.preventDefault();

    const formData = {
      email: registerFormData.email,
      password: registerFormData.password
    };

    const errors = validate(formData);

    setRegisterFormData({ ...registerFormData, emailError: errors.email });
    setRegisterFormData({ ...registerFormData, passwordError: errors.password });

    if (!errors.empty) return;

    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(user => {
        console.log(user);
        clearForm();
      }).catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setRegisterFormData({ ...registerFormData, emailError: 'Cet email est déjà utilisé' });
        } else if (error.code === 'auth/invalid-email') {
          setRegisterFormData({ ...registerFormData, emailError: 'Email incorrect' });
        }
          
        console.log(error);
      });
  }

  return (
    <>
      <h2>Inscription</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor='register-email'>Email :</label>
          <input 
            id='register-email'
            className={ registerFormData.emailError ? 'invalid' : null }
            placeholder='user@example.com'
            required
            value={registerFormData.email}
            name='email'
            type='email'
            onChange={handleChange} />
          <p className='invalid-message'>{ registerFormData.emailError }</p>  
        </div>
        <div>
          <label htmlFor='register-password'>Mot de passe (6 caractères minimum) :</label>
          <input 
            id='register-password'
            className={ registerFormData.passwordError ? 'invalid' : null }
            placeholder='Mot de passe'
            required
            value={registerFormData.password}
            name='password'
            type='password'
            onChange={handleChange} />
            <p className='invalid-message'>{ registerFormData.passwordError }</p>
        </div>
        <button>S'inscrire</button>
      </form>

      <GoogleAuth text="S'inscrire avec Google" />
    </>
  );
}

export default Register;
