import React, { useState } from 'react';
import WordListForm from '../WordListForm/WordListForm';

const WordListInfo = props => {

  const {
    wordLists,
    wordList,
    openWordList,
    deleteList,
    userId,
    setCloseCurrentFormFunc
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  
  const openEditForm = () => {
    setShowEditForm(true);
    setCloseCurrentFormFunc(() => setShowEditForm(false));
  };

  const closeEditForm = () => {
    setShowEditForm(false);
    setCloseCurrentFormFunc(false);
  };

  const handleDeleteList = () => {
    let text;
    let quit = false;
    let wordToEnter = 'oui';

    do {
      text = prompt(`
        Êtes-vous sûr de vouloir supprimer la liste "${wordList.name}" ?
        (cette action est irréversible !)
        Écrivez "${wordToEnter}" pour confirmer :
      `);

      if (text === null) quit = true; // user cliked "cancel" button
      if (text === wordToEnter) deleteList(wordList.id, userId);
    } while (!quit && text !== wordToEnter);
  };

  const handleOpenWordList = e => {
    if (e.target.classList.contains('allow-click')) openWordList(wordList.slug);
  };

  let nbWords = wordList.words ? Object.keys(wordList.words).length : 0;

  return (
    <>
      { showEditForm
        ? <WordListForm
            show={showEditForm}
            className='edit-word-list'
            wordLists={wordLists}
            wordList={wordList}
            closeForm={closeEditForm}
            userId={userId}
          />
        : (
          <div className='word-list-info allow-click' onClick={handleOpenWordList}>
            <h2 className='name allow-click'>
              { wordList.name }
            </h2>

            <span className='nb-words allow-click'> ({ nbWords } mot{ nbWords > 1 && 's' })</span>

            <div className='actions'>
              <button
                aria-label='modifier la liste'
                className='edit-word-list' 
                onClick={openEditForm}
              >
                <span className='material-icons-round'>edit</span>
              </button>
              <button 
                aria-label='supprimer la liste'
                className='delete-word-list' 
                onClick={handleDeleteList}
              >
                <span className='material-icons-round'>delete_outline</span>
              </button>
            </div>
          </div>
        )
      }
    </>
  );
}

export default WordListInfo;
