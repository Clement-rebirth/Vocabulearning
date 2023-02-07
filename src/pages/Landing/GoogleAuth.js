import { useNavigate } from 'react-router-dom';
import { googleSignIn } from '../../utils/firebase/authMethods';

import { ROUTES } from '../../constants';

const GoogleAuth = ({ text }) => {

  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn(() => {
      navigate(ROUTES.HOME, {
        replace: true,
        state: {
          redirectAfterAuth: true
        }
      });
    }, error => {
      console.log({
        code: error.code,
        message: error.message,
        email: error.email,
        credential: error.credential,
      });
    });
  }

  return (
    <button className='google-sign-in' onClick={handleGoogleSignIn}>
      <span className='icon google-g-icon'>
        <span className='path1' /><span className='path2' /><span className='path3' /><span className='path4' />
      </span>
      { text }
    </button>
  );
}

export default GoogleAuth;
