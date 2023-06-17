import { NothingToShow } from '../../../components/NothingToShow/NothingToShow';

import noResultFoundImg from '../../../assets/img/illustrations/undraw-void-dark-yellow.svg';
import emptyDataImg from '../../../assets/img/illustrations/undraw-empty-dark-yellow.svg';

interface NoWordsToShowProps {
  noSearchResult: boolean;
  noWordsInList: boolean;
}

export const NoWordsToShow = ({ noSearchResult, noWordsInList }: NoWordsToShowProps) => {
  if (noWordsInList) {
    return (
      <NothingToShow
        className='no-word'
        message='Votre liste ne contient aucun mot'
        src={emptyDataImg}
        alt='empty illustration'
      />
    );
  }

  if (noSearchResult) {
    return (
      <NothingToShow
        message='Aucun mot ne correspond à votre recherche'
        src={noResultFoundImg}
        alt='void illustration'
      />
    );
  }

  return null;
};
