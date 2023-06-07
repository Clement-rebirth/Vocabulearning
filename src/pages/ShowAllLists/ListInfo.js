import { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { PopUpContext } from '../../providers/PopUpProvider';
import { deleteList } from '../../utils/firebase/listMethods';
import confirm from '../../utils/confirm';

const ListInfo = ({ list, openEditForm, openList }) => {
  const { showPopUp } = useContext(PopUpContext);
  const { user } = useContext(UserContext);
  const userId = user.uid;

  const handleDeleteList = e => {
    e.stopPropagation();
    let wordToEnter = 'oui';
    let text = `Êtes-vous sûr de vouloir supprimer la liste "${list.name}" ? (cette action est irréversible !)\n`
      + `Écrivez "${wordToEnter}" pour confirmer :`;

    confirm(text, wordToEnter, async () => {
      try {
        await deleteList(userId, list.id);
        showPopUp('La liste a bien été supprimée !');
      } catch (error) {
        showPopUp('Une erreur inconnue est survenue', 'error');
      }
    });
  };

  let nbWords = list.words ? Object.keys(list.words).length : 0;

  return (
    <div className='list-info' onClick={() => openList(list.slug)}>
      <h2 className='name'>
        { list.name }
      </h2>

      <span className='nb-words'> ({ nbWords } mot{ nbWords > 1 && 's' })</span>

      <div className='actions'>
        <button
          aria-label='modifier la liste'
          className='edit-list btn-rounded-icon'
          onClick={e => {
            e.stopPropagation();
            openEditForm();
          }}
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
