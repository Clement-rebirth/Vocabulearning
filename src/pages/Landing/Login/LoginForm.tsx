import { useEffect, useRef, useState } from 'react';
import { signIn } from '../../../utils/firebase/authMethods';
import { ROUTES } from '../../../constants';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setshowPassword] = useState(false);

  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = loginFormData;

    signIn(email, password)
      .then(() => {
        navigate(ROUTES.HOME, {
          replace: true,
          state: {
            redirectAfterAuth: true,
          },
        });
      })
      .catch(() => {
        alert('Email ou mot de passe incorrect');
      });
  };

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
          <button
            onClick={() => setshowPassword(!showPassword)}
            className='show-password-btn'
            type='button'
          >
            <i className='eye-icon material-symbols-rounded'>
              { showPassword ? 'visibility' : 'visibility_off' }
            </i>
          </button>
        </div>
      </div>
      <button>Se connecter</button>
    </form>
  );
};
