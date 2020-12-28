import React from 'react';
import { deleteList } from '../../services/firebase/listMethods';

const ListInfo = ({ list, openEditForm, openList, userId }) => {

  const handleDeleteList = () => {
    let text;
    let quit = false;
    let wordToEnter = 'oui';

    do {
      text = prompt(`
        Êtes-vous sûr de vouloir supprimer la liste "${list.name}" ?
        (cette action est irréversible !)
        Écrivez "${wordToEnter}" pour confirmer :
      `);

      if (text === null) quit = true; // user cliked "cancel" button
      if (text === wordToEnter) deleteList(list.id, userId);
    } while (!quit && text !== wordToEnter);
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
          className='edit-list' 
          onClick={openEditForm}
        >
          <span className='material-icons-round'>edit</span>
        </button>
        <button 
          aria-label='supprimer la liste'
          className='delete-list' 
          onClick={handleDeleteList}
        >
          <span className='material-icons-round'>delete_outline</span>
        </button>
      </div>
    </div>
  );
}
 
export default ListInfo;
