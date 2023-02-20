import { useState } from 'react';

import AddListForm from './AddListForm';
import ShowAddListFormBtn from './ShowAddListFormBtn';

const AddList = ({ setCloseCurrentFormFunc }) => {

  const [addFormIsShow, setAddFormIsShow] = useState(false);

  const openAddForm = () => {
    setAddFormIsShow(true);
    setCloseCurrentFormFunc(() => setAddFormIsShow(false));
  }

  const closeAddForm = () => {
    setAddFormIsShow(false);
    setCloseCurrentFormFunc(false);
  };

  return (
    <>
      <AddListForm show={addFormIsShow} closeForm={closeAddForm} />
      <ShowAddListFormBtn openAddForm={openAddForm} addFormIsShow={addFormIsShow} />
    </>
  );
}

export default AddList;
