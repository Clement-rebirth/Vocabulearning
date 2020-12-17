import React, { useEffect, useRef, useState } from 'react';

import { slugify } from '../../services/slugify';
import { 
  addWordList as addList, 
  updateWordList as updateList
} from '../../services/firebase/wordListMethods';

const WordListForm = ({ closeForm, wordList, userId, wordLists, className, show }) => {

  const initialValue = wordList ? wordList.name : '';

  const [listName, setListName] = useState(initialValue);
  const [listNameError, setListNameError] = useState(null);
  const [updateMode] = useState(!!wordList);
  let listNameInputRef = useRef(null);

  useEffect(() => {
    if (show) listNameInputRef.current.focus();
  }, [show]);

  useEffect(() => {
    setListName(initialValue);
    setListNameError(null);
  }, [show, initialValue]);

  const validate = name => {
    let error;

    if (name.length > 50) error = 'Le nom ne doit pas dépasser 50 caractères';

    let list = wordLists && Object
      .keys(wordLists)
      .find(key => slugify(wordLists[key].name) === slugify(name));
      
    if (list) error = 'Une liste existe déjà avec ce nom';

    return error;
  };

  const handleSubmitUpdate = e => {
    e.preventDefault();

    // if no modifications
    if (listName === wordList.name) {
      closeForm();
      return;
    }

    let error = validate(listName);
    setListNameError(error);

    if (error) return;

    let propsToUpdate = {
      name: listName, 
      slug: slugify(listName)
    };

    updateList(propsToUpdate, wordList.id, userId);
    closeForm();
  };

  const handleSubmit = e => {
    e.preventDefault();

    let error = validate(listName);
    setListNameError(error);

    if (error) return;
      
    addList({ name: listName }, userId);
    closeForm();
  };

  if (!show) return null;

  return (
    <div className={`word-list-form ${className ? className : ''}`}>
      <form onSubmit={updateMode ? handleSubmitUpdate : handleSubmit}>
        <div>
          <input
            ref={listNameInputRef}
            value={listName}
            onChange={e => setListName(e.target.value)}
            className={`bd-bottom-only ${listNameError ? 'invalid' : ''}`}
            name='list-name'
            placeholder='Nom de la liste'
            autoComplete='off'
            required
            type='text'
          />
          <small className={listNameError && 'invalid-message'}>
            { listNameError }
          </small>
        </div>

        <button type='submit'>
          <span className='material-icons-round'>check</span>
        </button>
        <button className='close-list-form' type='button' onClick={closeForm}>
          <span className='material-icons-round'>close</span>
        </button>
      </form>
    </div>
  );
}

export default WordListForm;
