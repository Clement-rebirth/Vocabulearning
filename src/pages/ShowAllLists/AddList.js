import { useState } from 'react';

import AddListForm from './AddListForm';
import ShowAddListFormBtn from './ShowAddListFormBtn';

const AddList = ({ existingLists, searchMode, setCloseCurrentFormFunc, disableSearchMode }) => {

  const [addFormIsShow, setAddFormIsShow] = useState(false);

  const openAddForm = () => {
    disableSearchMode();
    setAddFormIsShow(true);
    setCloseCurrentFormFunc(() => setAddFormIsShow(false));
  }

  const closeAddForm = () => {
    setAddFormIsShow(false);
    setCloseCurrentFormFunc(false);
  };

  if (searchMode) return null;

  return (
    <>
      <AddListForm
        show={addFormIsShow}
        existingLists={existingLists}
        closeForm={closeAddForm}
      />

      <ShowAddListFormBtn openAddForm={openAddForm} addFormIsShow={addFormIsShow} />
    </>
  );
}

export default AddList;
