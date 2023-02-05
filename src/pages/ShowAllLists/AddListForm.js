import React from 'react';
import { addList } from '../../utils/firebase/listMethods';
import { validateList } from '../../utils/lists/validateList';

import ListForm from './ListForm';

const AddListForm = ({ closeForm, userId, existingLists, show }) => {

  const handleSubmit = (e, listName, setListNameError) => {
    e.preventDefault();

    let error = validateList(listName, existingLists);
    setListNameError(error);

    if (error) return;

    addList({ name: listName }, userId);
    closeForm();
  };

  if (!show) return null;

  return (
    <div className='list-form'>
      <ListForm handleSubmit={handleSubmit} closeForm={closeForm} show={show} />
    </div>
  );
}

export default AddListForm;
