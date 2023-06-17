import { addList } from '../../utils/firebase/listMethods';
import { validateList } from '../../utils/lists/validateList';
import { useToast } from '../../contexts/ToastContext';
import { useUser } from '../../contexts/UserContext';

import { ListForm } from './ListForm';

interface AddListFormProps {
  closeForm: () => void;
  show: boolean;
}

export const AddListForm = ({ closeForm, show }: AddListFormProps) => {
  const { toast } = useToast();
  const { user } = useUser();
  const userId = user ? user.uid : null;

  const handleSubmit = (
    e: React.FormEvent,
    listName: string,
    setListNameError: React.Dispatch<React.SetStateAction<string | null>>,
  ) => {
    e.preventDefault();
    if (!userId) return;

    const errors = validateList(listName);
    setListNameError(errors[0] ?? null);

    if (errors.length > 0) return;

    addList(listName, userId)
      .then(() => {
        closeForm();
        toast.success('La liste a bien été ajoutée');
      })
      .catch(() => toast.error('Une erreur inconnue est survenue'));
  };

  if (!show) return null;

  return (
    <div className='list-form'>
      <ListForm handleSubmit={handleSubmit} closeForm={closeForm} show={show} />
    </div>
  );
};
