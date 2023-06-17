import { useNavigate } from 'react-router-dom';
import { googleSignIn } from '../../utils/firebase/authMethods';
import { ROUTES } from '../../constants';
import { useToast } from '../../contexts/ToastContext';

export const GoogleAuth = ({ text }: { text: string }) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();

      navigate(ROUTES.HOME, {
        replace: true,
        state: {
          redirectAfterAuth: true,
        },
      });
    } catch (error) {
      toast.error('Une erreur inconnue est survenue lors de la connexion');
    }
  };

  return (
    <button className='google-sign-in' onClick={handleGoogleSignIn}>
      <span className='icon google-g-icon'>
        <span className='path1' /><span className='path2' /><span className='path3' /><span className='path4' />
      </span>
      { text }
    </button>
  );
};
