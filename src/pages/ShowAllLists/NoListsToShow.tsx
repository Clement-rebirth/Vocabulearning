import { NothingToShow } from '../../components/NothingToShow/NothingToShow';

import noResultFoundImg from '../../assets/img/illustrations/undraw-void-dark-yellow.svg';
import emptyDataImg from '../../assets/img/illustrations/undraw-empty-dark-yellow.svg';

interface NoListsToShowProps {
  noSearchResult: boolean;
  noLists: boolean;
  search: string;
}

export const NoListsToShow = ({ noSearchResult, noLists, search }: NoListsToShowProps) => {
  if (noLists) {
    return (
      <NothingToShow
        className='no-list-to-show'
        message="Vous n'avez aucune liste"
        src={emptyDataImg}
        alt='empty illustration'
      />
    );
  }

  if (noSearchResult) {
    return (
      <NothingToShow
        message={`Aucun résultat pour la recherche "${search}"`}
        src={noResultFoundImg}
        alt='void illustration'
      />
    );
  }

  return null;
};
