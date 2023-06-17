import { useToast } from '../../contexts/ToastContext';
import { useUser } from '../../contexts/UserContext';
import { ListWithId } from '../../types/list';
import { updateList } from '../../utils/firebase/listMethods';
import { validateList } from '../../utils/lists/validateList';
import { slugify } from '../../utils/slugify';

import ListForm from './ListForm';

interface UpdateListFormProps {
  closeForm: () => void;
  listToUpdate: ListWithId;
  show: boolean;
}

const UpdateListForm = ({ closeForm, listToUpdate, show }: UpdateListFormProps) => {
  const { toast } = useToast();
  const { user } = useUser();
  const userId = user ? user.uid : null;

  const handleSubmit = (
    e: React.FormEvent, listName: string, setListNameError: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    e.preventDefault();
    if (!userId) return;

    // if no modifications
    if (listName === listToUpdate.name) {
      closeForm();
      return;
    }

    let errors = validateList(listName);
    setListNameError(errors[0] ?? null);

    if (errors.length > 0) return;

    let propsToUpdate = {
      name: listName,
      slug: slugify(listName) + listToUpdate.id
    };

    updateList(propsToUpdate, userId, listToUpdate.id)
      .then(() => closeForm())
      .catch(() => toast.error('Une erreur inconnue est survenue'));
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
