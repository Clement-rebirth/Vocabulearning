import NothingToShow from '../../components/NothingToShow/NothingToShow';

import noResultFoundImg from '../../assets/img/illustrations/undraw-void-dark-yellow.svg';
import emptyDataImg from '../../assets/img/illustrations/undraw-empty-dark-yellow.svg';

const NoListsToShow = ({ noSearchResult, noLists }) => {

  if (noLists) return (
    <NothingToShow
      className='no-list-to-show'
      message="Vous n'avez aucune liste"
      src={emptyDataImg}
      alt='empty illustration'
    />
  );

  if (noSearchResult) return (
    <NothingToShow
      message='Aucune liste ne contient le mot que vous recherchez'
      src={noResultFoundImg}
      alt='void illustration'
    />
  );

  return null;
}

export default NoListsToShow;
