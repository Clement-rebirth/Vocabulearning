import { googleSignIn } from '../../utils/firebase/authMethods';

const GoogleAuth = ({ text }) => {
  return (
    <button className='google-sign-in' onClick={googleSignIn}>
      <span className='icon google-g-icon'>
        <span className='path1' /><span className='path2' /><span className='path3' /><span className='path4' />
      </span>
      { text }
    </button>
  );
}

export default GoogleAuth;
