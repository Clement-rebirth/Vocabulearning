import { useContext } from 'react';
import { updateList } from '../../utils/firebase/listMethods';
import { validateList } from '../../utils/lists/validateList';
import { slugify } from '../../utils/slugify';
import { UserContext } from '../../providers/UserProvider';
import { ListsContext } from '../../providers/ListsProvider';
import { PopUpContext } from '../../providers/PopUpProvider';

import ListForm from './ListForm';

const UpdateListForm = ({ closeForm, listToUpdate, show }) => {
  const { showPopUp } = useContext(PopUpContext);
  const { lists } = useContext(ListsContext);
  const { user } = useContext(UserContext);
  const userId = user.uid;

  const handleSubmit = (e, listName, setListNameError) => {
    e.preventDefault();

    // if no modifications
    if (listName === listToUpdate.name) {
      closeForm();
      return;
    }

    let errors = validateList(listName, lists);
    setListNameError(errors[0]);

    if (errors.length > 0) return;

    let propsToUpdate = {
      name: listName,
      slug: slugify(listName)
    };

    updateList(propsToUpdate, userId, listToUpdate.id)
      .then(() => closeForm())
      .catch(() => showPopUp('Une erreur inconnue est survenue', 'error'));
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
