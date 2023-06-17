import { useEffect, useRef, useState } from 'react';
import { signUp } from '../../../utils/firebase/authMethods';
import { emailIsValid } from '../../../utils/emailIsValid';
import { ROUTES } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import { FormErrors } from '../../../types/error';

interface RegisterFormData {
  email: string;
  password: string;
}

export const RegisterForm = () => {
  const [registerFormData, setRegisterFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const [showPassword, setshowPassword] = useState(false);

  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  const validate = (email: string, password: string) => {
    const errors: FormErrors = {};

    if (!emailIsValid(email)) {
      errors.email = 'Email incorrect';
    }

    if (password.length < 6) {
      errors.password = '6 caractères minimum';
    }

    return errors;
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = registerFormData;
    const errors = validate(email, password);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    signUp(email, password)
      .then(() => {
        navigate(ROUTES.HOME, {
          replace: true,
          state: {
            redirectAfterAuth: true,
          },
        });
      })
      .catch(error => {
        let emailError = '';

        if (error.code === 'auth/email-already-in-use') {
          emailError = 'Cet email est déjà utilisé';
        } else if (error.code === 'auth/invalid-email') {
          emailError = 'Email incorrect';
        }

        setFormErrors({ ...formErrors, email: emailError });
      });
  };

  return (
    <form onSubmit={handleSignUp}>
      <div>
        <label htmlFor='register-email'>Email</label>
        <input
          ref={emailInputRef}
          id='register-email'
          className={ formErrors.email ? 'invalid' : '' }
          placeholder='user@example.com'
          required
          value={registerFormData.email}
          name='email'
          type='email'
          onChange={handleChange}
        />
        {formErrors.email && (
          <small className='invalid-message'>{ formErrors.email }</small>
        )}
      </div>
      <div>
        <label htmlFor='register-password'>Mot de passe (6 caractères minimum)</label>
        <div className='show-password'>
          <input
            id='register-password'
            className={ formErrors.password ? 'invalid' : '' }
            placeholder='Mot de passe'
            required
            value={registerFormData.password}
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
        {formErrors.password && (
          <small className='invalid-message'>{ formErrors.password }</small>
        )}
      </div>
      <button>S&apos;inscrire</button>
    </form>
  );
};
