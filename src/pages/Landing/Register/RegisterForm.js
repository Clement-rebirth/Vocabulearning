import { useEffect, useRef, useState } from 'react';
import { signUp } from '../../../utils/firebase/authMethods';
import { emailIsValid } from '../../../utils/emailIsValid';
import { ROUTES } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {

  const [registerFormData, setRegisterFormData] = useState({
    email: '',
    password: '',
    emailError: null,
    passwordError: null
  });

  const [showPassword, setshowPassword] = useState(false);

  const navigate = useNavigate();
  let emailInputRef = useRef(null);

  useEffect(() => {
    emailInputRef.current.focus();
  }, []);

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

    let { email, password } = registerFormData;
    const errors = validate(email, password);

    setRegisterFormData({
      ...registerFormData,
      emailError: errors.email,
      passwordError: errors.password
    });

    if (!errors.empty) return;

    signUp(email, password)
      .then(() => {
        navigate(ROUTES.HOME, {
          replace: true,
          state: {
            redirectAfterAuth: true
          }
        });
      })
      .catch(error => {
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
    <form onSubmit={handleSignUp}>
      <div>
        <label htmlFor='register-email'>Email</label>
        <input
          ref={emailInputRef}
          id='register-email'
          className={ registerFormData.emailError ? 'invalid' : '' }
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
            className={ registerFormData.passwordError ? 'invalid' : '' }
            placeholder='Mot de passe'
            required
            value={registerFormData.password}
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
        <small className='invalid-message'>{ registerFormData.passwordError }</small>
      </div>
      <button>S'inscrire</button>
    </form>
  );
}

export default RegisterForm;
