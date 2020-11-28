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

  let nbWords = wordList.words ? Object.keys(wordList.words).length : 0;

  return (
    <>
      { showEditForm
        ? <WordListForm
            wordLists={wordLists}
            wordList={wordList}
            closeForm={closeEditForm}
            userId={userId}
          />
        : (
          <div className='word-list-info'>
            <h2 onClick={() => openWordList(wordList.slug)}>
              { wordList.name }
              <span className='nb-words'> ({ nbWords } mot{ nbWords > 1 && 's' })</span>
            </h2>

            <div className='actions'>
              <button className='edit-word-list' onClick={openEditForm}>
                Modifier
              </button>
              <button className='delete-word-list' onClick={handleDeleteList}>Supprimer</button>
            </div>
          </div>
        )
      }
    </>
  );
}

export default WordListInfo;
