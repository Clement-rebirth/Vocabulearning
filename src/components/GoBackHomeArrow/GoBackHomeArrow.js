import { ROUTES } from '../../constants';

import './GoBackHomeArrow.css';

const GoBackHomeArrow = ({ navigate, disableSearchMode }) => {

  const backHome = () => {
    navigate(ROUTES.HOME, { replace: true });
    disableSearchMode();
  };

  return (
    <button
      className='back-home'
      aria-label='retour à la page d&#39;accueil'
      onClick={backHome}
    >
      <span className='material-symbols-rounded'>arrow_back</span>
    </button>
  );
}

export default GoBackHomeArrow;
