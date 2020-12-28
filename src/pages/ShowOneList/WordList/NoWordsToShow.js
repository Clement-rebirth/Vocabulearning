import React from 'react';

import NothingToShow from '../../../components/NothingToShow/NothingToShow';

import noResultFoundImg from '../../../assets/img/illustrations/undraw-void-dark-yellow.svg';
import emptyDataImg from '../../../assets/img/illustrations/undraw-empty-dark-yellow.svg';

const NoWordsToShow = ({ noSearchResult, noWordsInList }) => {

  if (noWordsInList) return (
    <NothingToShow
      className='no-word'
      message='Votre liste ne contient aucun mot'
      src={emptyDataImg}
      alt='empty illustration'
    /> 
  );

  if (noSearchResult) return (
    <NothingToShow
      message='Aucun mot ne correspond à votre recherche'
      src={noResultFoundImg}
      alt='void illustration'
    />
  );

  return null;
}
 
export default NoWordsToShow;
