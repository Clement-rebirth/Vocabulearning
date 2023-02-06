import React, { useEffect, useRef, useState } from 'react';
import { signIn } from '../../../utils/firebase/authMethods';
import { ROUTES } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setshowPassword] = useState(false);

  let emailInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

  const handleChange = e => {
    const { value, name } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  }

  const handleSignIn = e => {
    e.preventDefault();
    const { email, password } = loginFormData;

    signIn(email, password, () => {
      navigate(ROUTES.HOME, {
        replace: true,
        state: {
          redirectAfterAuth: true
        }
      });
    }, error => {
      console.log('login errors :');
      console.log(error);
      alert('Email ou mot de passe incorrect');
    });
  }

  return (
    <form onSubmit={handleSignIn}>
      <div>
        <label htmlFor='login-email'>Email</label>
        <input
          ref={emailInputRef}
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
            className='show-password-btn'
          >
            <i className='eye-icon material-icons-round'>
              { showPassword ? 'visibility' : 'visibility_off' }
            </i>
          </div>
        </div>
      </div>
      <button>Se connecter</button>
    </form>
  );
}

export default LoginForm;
