import React, { useEffect, useRef, useState } from 'react';

const ListForm = ({ handleSubmit, listNameInitialValue = '', closeForm, show }) => {

  const [listName, setListName] = useState(listNameInitialValue);
  const [listNameError, setListNameError] = useState(null);

  let listNameInputRef = useRef(null);

  useEffect(() => {
    if (show) listNameInputRef.current.focus();
  }, [show]);

  return (
    <form onSubmit={e => handleSubmit(e, listName, setListNameError)}>
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
  );
}
 
export default ListForm;
