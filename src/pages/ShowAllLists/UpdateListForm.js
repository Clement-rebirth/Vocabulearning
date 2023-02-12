import { useContext } from 'react';
import { updateList } from '../../utils/firebase/listMethods';
import { validateList } from '../../utils/lists/validateList';
import { slugify } from '../../utils/slugify';
import { UserContext } from '../../providers/UserProvider';

import ListForm from './ListForm';

const UpdateListForm = ({ closeForm, listToUpdate, existingLists, show }) => {
  const { user } = useContext(UserContext);
  const userId = user.uid;

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

    updateList(propsToUpdate, listToUpdate.id, userId);
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
