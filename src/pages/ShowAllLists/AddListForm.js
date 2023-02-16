import { useContext } from 'react';
import { UserContext } from '../../providers/UserProvider';
import { addList } from '../../utils/firebase/listMethods';
import { validateList } from '../../utils/lists/validateList';
import { ListsContext } from '../../providers/ListsProvider';
import { PopUpContext } from '../../providers/PopUpProvider';

import ListForm from './ListForm';

const AddListForm = ({ closeForm, show }) => {
  const { showPopUp } = useContext(PopUpContext);
  const { lists } = useContext(ListsContext);
  const { user } = useContext(UserContext);
  const userId = user.uid;

  const handleSubmit = (e, listName, setListNameError) => {
    e.preventDefault();

    let errors = validateList(listName, lists);
    setListNameError(errors[0]);

    if (errors.length > 0) return;

    addList({ name: listName }, userId)
      .then(() => {
        closeForm();
        showPopUp('La liste a bien été ajoutée');
      })
      .catch(error => showPopUp('Une erreur inconnue est survenue', 'error'));

  };

  if (!show) return null;

  return (
    <div className='list-form'>
      <ListForm handleSubmit={handleSubmit} closeForm={closeForm} show={show} />
    </div>
  );
}

export default AddListForm;
