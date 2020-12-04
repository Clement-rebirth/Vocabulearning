import React, { useState } from 'react';

import { deleteWordList } from '../../firebase/wordListMethods';

import NothingToShow from '../NothingToShow/NothingToShow';
import WordListForm from '../WordListForm/WordListForm';
import WordListInfo from '../WordListInfo/WordListInfo';

import noResultFoundImg from '../../img/illustrations/undraw-void-dark-yellow.svg';
import emptyDataImg from '../../img/illustrations/undraw-empty-dark-yellow.svg';

const WordListsInfo = props => {

  const { 
    wordLists,
    openWordList,
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
        key={key} 
        wordList={{...wordLists[key], id: key}} 
        openWordList={openWordList}
        userId={userId}
        deleteList={deleteWordList}
        setCloseCurrentFormFunc={setCloseCurrentFormFunc}
      />
    ));
  }

  return (
    <div className='word-lists'>
      { !searchMode &&
        <>
          <WordListForm
            show={addFormIsShow}
            wordLists={wordLists}
            userId={userId}
            closeForm={closeAddForm} 
          />
          <button 
            className={`add-list-btn ${addFormIsShow ? 'd-none' : ''}`} 
            onClick={openAddForm}
          >
            <span className='material-icons-round'>add</span> 
            Ajouter une liste
          </button>
        </>
      }

      { wordListsInfo }

      { !wordListsInfo && !searchMode &&
        <NothingToShow
          className='no-list-to-show'
          message="Vous n'avez aucune liste"
          src={emptyDataImg}
          alt='empty'
        /> 
      }
      
      { !wordListsInfo && searchMode &&
        <NothingToShow
          message='Aucune liste ne contient le mot que vous recherchez'
          src={noResultFoundImg}
          alt='void'
        />
      }
    </div>
  );
}

export default WordListsInfo;
