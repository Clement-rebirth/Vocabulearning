import React, { useState } from 'react';
import { slugify } from '../../utils/utils';

const WordListForm = ({ closeForm, wordList, addList, updateList, userId, wordLists }) => {

  const [listName, setListName] = useState(wordList ? wordList.name : '');
  const [listNameError, setListNameError] = useState(null);
  const [updateMode] = useState(!!wordList);

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

    updateList({ name: listName }, wordList.id, userId);
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

  return (
    <div className='word-list-word'>
      <form onSubmit={updateMode ? handleSubmitUpdate : handleSubmit}>
        <div>
          <input
            value={listName}
            onChange={e => setListName(e.target.value)}
            className={ listNameError && 'invalid' }
            name='name'
            placeholder='Nom de la liste'
            required
            type='text'
          />
          <small className='invalid-message'>{ listNameError }</small>
        </div>

        <button type='submit'>{ updateMode ? 'Modifier' : 'Ajouter' }</button>
        <button type='button' onClick={closeForm}>X</button>
      </form>
    </div>
  );
}

export default WordListForm;
