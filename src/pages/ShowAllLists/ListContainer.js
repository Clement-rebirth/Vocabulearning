import { useState } from 'react';

import ListInfo from './ListInfo';
import UpdateListForm from './UpdateListForm';

const ListContainer = props => {

  const {
    existingLists,
    list,
    openList,
    setCloseCurrentFormFunc
  } = props;

  const [showEditForm, setShowEditForm] = useState(false);

  const openEditForm = () => {
    setShowEditForm(true);
    setCloseCurrentFormFunc(() => setShowEditForm(false));
  };

  const closeEditForm = () => {
    setShowEditForm(false);
    setCloseCurrentFormFunc(false);
  };

  if (showEditForm) return (
    <UpdateListForm
      show={showEditForm}
      existingLists={existingLists}
      listToUpdate={list}
      closeForm={closeEditForm}
    />
  );

  return (
    <ListInfo
      list={list}
      openEditForm={openEditForm}
      openList={openList}
    />
  );
}

export default ListContainer;
