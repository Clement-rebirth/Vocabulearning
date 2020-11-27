import React, { useState } from 'react';
import WordListForm from '../WordListForm/WordListForm';
import WordListInfo from '../WordListInfo/WordListInfo';

const WordListsInfo = props => {

  const { 
    updateList,
    addList,
    wordLists,
    openWordList,
    deleteList,
    userId,
    searchMode,
    disableSearchMode
  } = props;

  const [addFormIsShow, setAddFormIsShow] = useState(false);
  const [closeCurrentForm, setCloseCurrentForm] = useState(false);

  // close the current form if there is one and set the new one
  const setCloseCurrentFormFunc = newCloseFunc => {
    if (closeCurrentForm) closeCurrentForm();
    setCloseCurrentForm(() => newCloseFunc);
  };
  
  const openAddForm = () => {
    disableSearchMode();
    setAddFormIsShow(true);
    setCloseCurrentFormFunc(() => setAddFormIsShow(false));
  }
  
  const closeAddForm = () => {
    setAddFormIsShow(false);
    setCloseCurrentFormFunc(false);
  };

  let wordListsInfo = null;
  let wordListsLength = wordLists && Object.keys(wordLists).length;

  if (wordLists && wordListsLength > 0) {
    wordListsInfo = Object.keys(wordLists).map(key => (
      <WordListInfo
        wordLists={wordLists}
        deleteList={deleteList}
        updateList={updateList}
        key={key} 
        wordList={{...wordLists[key], id: key}} 
        openWordList={openWordList}
        userId={userId}
        setCloseCurrentFormFunc={setCloseCurrentFormFunc}
      />
    ));
  }

  return (
    <div className='word-lists'>
      { wordListsInfo
        ? wordListsInfo
        : <p className='no-list'>
            { searchMode ? 'Aucun résultat trouvé' : `Vous n'avez aucune liste` }
          </p>
      }
      
      { addFormIsShow 
        ? <WordListForm 
            wordLists={wordLists}
            userId={userId}
            addList={addList} 
            closeForm={closeAddForm} />
        : <button className='add-list-btn' onClick={openAddForm}>
            + Ajouter une liste
          </button>
      }
    </div>
  );
}

export default WordListsInfo;
