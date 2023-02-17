import { useEffect, useRef, useState } from 'react';

const ListForm = ({ handleSubmit, listNameInitialValue = '', closeForm, show }) => {

  const [listName, setListName] = useState(listNameInitialValue);
  const [listNameError, setListNameError] = useState(null);

  let listNameInputRef = useRef(null);

  const handleKeyDown = e => {
    if (e.key === 'Escape') closeForm();
  };

  useEffect(() => {
    if (show) listNameInputRef.current.focus();
  }, [show]);

  return (
    <form onSubmit={e => handleSubmit(e, listName, setListNameError)} onKeyDown={handleKeyDown}>
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

      <button type='submit' className='btn-rounded-icon'>
        <span className='material-symbols-rounded'>check</span>
      </button>
      <button className='close-list-form btn-rounded-icon' type='button' onClick={closeForm}>
        <span className='material-symbols-rounded'>close</span>
      </button>
    </form>
  );
}

export default ListForm;
