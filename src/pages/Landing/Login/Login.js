import { Link } from 'react-router-dom';

import GoogleAuth from '../GoogleAuth';
import HorizontalBar from '../../../components/HorizontalBar/HorizontalBar';
import LoginForm from './LoginForm';

import { ROUTES } from '../../../constants';

const Login = () => {
  return (
    <div className='login'>
      <h2 className='underline-title'><span>Connexion</span></h2>

      <LoginForm />
      <HorizontalBar text='OU' />
      <GoogleAuth text='Se connecter avec Google' />

      <p className='link'>Pas encore inscrit ? <Link to={ROUTES.SIGN_UP} id='register-link'>Inscrivez-vous</Link></p>
    </div>
  );
}

export default Login;
