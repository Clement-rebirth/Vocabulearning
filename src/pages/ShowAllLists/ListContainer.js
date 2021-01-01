import React, { useState } from 'react';

import ListInfo from './ListInfo';
import UpdateListForm from './UpdateListForm';

const ListContainer = props => {

  const {
    existingLists,
    list,
    openList,
    userId,
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
      userId={userId}
    />
  );

  return (
    <ListInfo
      list={list}
      openEditForm={openEditForm}
      openList={openList}
      userId={userId}
    />
  );
}

export default ListContainer;
