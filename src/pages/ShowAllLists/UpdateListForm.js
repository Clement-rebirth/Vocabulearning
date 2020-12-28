import React from 'react';
import { updateWordList } from '../../services/firebase/wordListMethods';
import { validateList } from '../../services/lists/validateList';
import { slugify } from '../../services/slugify';

import ListForm from './ListForm';

const UpdateListForm = ({ closeForm, listToUpdate, userId, existingLists, show }) => {

  const handleSubmit = (e, listName, setListNameError) => {
    e.preventDefault();

    // if no modifications
    if (listName === listToUpdate.name) {
      closeForm();
      return;
    }

    let error = validateList(listName, existingLists);
    setListNameError(error);

    if (error) return;

    let propsToUpdate = {
      name: listName, 
      slug: slugify(listName)
    };

    updateWordList(propsToUpdate, listToUpdate.id, userId);
    closeForm();
  };

  if (!show) return null;

  return (
    <div className='list-form edit-list'>
      <ListForm
        handleSubmit={handleSubmit}
        listNameInitialValue={listToUpdate.name}
        closeForm={closeForm}
        show={show} />
    </div>
  );
}
 
export default UpdateListForm;
