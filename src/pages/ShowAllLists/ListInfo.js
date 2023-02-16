import { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { deleteList } from '../../utils/firebase/listMethods';
import confirm from '../../utils/confirm';

const ListInfo = ({ list, openEditForm, openList }) => {
  const { user } = useContext(UserContext);
  const userId = user.uid;

  const handleDeleteList = () => {
    let wordToEnter = 'oui';
    let text = `Êtes-vous sûr de vouloir supprimer la liste "${list.name}" ? (cette action est irréversible !)\n`
      + `Écrivez "${wordToEnter}" pour confirmer :`;

    confirm(text, wordToEnter, () => deleteList(userId, list.id));
  };

  const handleOpenList = e => {
    if (e.target.classList.contains('allow-click')) openList(list.slug);
  };

  let nbWords = list.words ? Object.keys(list.words).length : 0;

  return (
    <div className='list-info allow-click' onClick={handleOpenList}>
      <h2 className='name allow-click'>
        { list.name }
      </h2>

      <span className='nb-words allow-click'> ({ nbWords } mot{ nbWords > 1 && 's' })</span>

      <div className='actions'>
        <button
          aria-label='modifier la liste'
          className='edit-list btn-rounded-icon'
          onClick={openEditForm}
        >
          <span className='material-symbols-rounded'>edit</span>
        </button>
        <button
          aria-label='supprimer la liste'
          className='delete-list btn-rounded-icon'
          onClick={handleDeleteList}
        >
          <span className='material-symbols-rounded outline'>delete</span>
        </button>
      </div>
    </div>
  );
}

export default ListInfo;
