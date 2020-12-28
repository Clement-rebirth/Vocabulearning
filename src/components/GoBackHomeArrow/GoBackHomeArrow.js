import React from 'react';
import { ROUTES } from '../../constants';

import './GoBackHomeArrow.css';

const GoBackHomeArrow = ({ history, disableSearchMode }) => {

  const backHome = () => {
    history.replace(ROUTES.HOME);
    disableSearchMode();
  };

  return (
    <button
      className='back-home' 
      aria-label='retour à la page d&#39;accueil' 
      onClick={backHome}
    >
      <span className='material-icons-round'>arrow_back</span>
    </button>
  );
}
 
export default GoBackHomeArrow;
