import { useState } from 'react';
import { ListWithId } from '../../types/list';

import { ListInfo } from './ListInfo';
import { UpdateListForm } from './UpdateListForm';

interface ListContainerProps {
  list: ListWithId;
  openList: (slug: string) => void;
  setCloseCurrentFormFunc: (newCloseFunc: (() => void) | false) => void;
}

export const ListContainer = (props: ListContainerProps) => {
  const {
    list,
    openList,
    setCloseCurrentFormFunc,
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

  if (showEditForm) {
    return (
      <UpdateListForm
        show={showEditForm}
        listToUpdate={list}
        closeForm={closeEditForm}
      />
    );
  }

  return (
    <ListInfo
      list={list}
      openEditForm={openEditForm}
      openList={openList}
    />
  );
};
