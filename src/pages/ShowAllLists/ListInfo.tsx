import { deleteList } from '../../utils/firebase/listMethods';
import confirm from '../../utils/confirm';
import { useToast } from '../../contexts/ToastContext';
import { useUser } from '../../contexts/UserContext';
import { ListWithId } from '../../types/list';

interface ListInfoProps {
  list: ListWithId;
  openEditForm: () => void;
  openList: (slug: string) => void;
}

const ListInfo = ({ list, openEditForm, openList }: ListInfoProps) => {
  const { toast } = useToast();
  const { user } = useUser();
  const userId = user ? user.uid : null;

  const handleDeleteList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!userId) return;

    let wordToEnter = 'oui';
    let text = `Êtes-vous sûr de vouloir supprimer la liste "${list.name}" ? (cette action est irréversible !)\n`
      + `Écrivez "${wordToEnter}" pour confirmer :`;

    confirm(text, wordToEnter, async () => {
      try {
        await deleteList(userId, list.id);
        toast.success('La liste a bien été supprimée !');
      } catch (error) {
        toast.error('Une erreur inconnue est survenue');
      }
    });
  };

  let nbWords = list.words ? Object.keys(list.words).length : 0;

  return (
    <div className='list-info' onClick={() => openList(list.slug)}>
      <h2 className='name'>
        { list.name }
      </h2>

      <span className='nb-words'> ({ nbWords } mot{ nbWords > 1 && 's' })</span>

      <div className='actions'>
        <button
          aria-label='modifier la liste'
          className='edit-list btn-rounded-icon'
          onClick={e => {
            e.stopPropagation();
            openEditForm();
          }}
        >
          <span className='material-symbols-rounded'>edit</span>
        </button>
        <button
          aria-label='supprimer la liste'
          className='delete-list btn-rounded-icon'
          onClick={handleDeleteList}
        >
          <span className='material-symbols-rounded outline'>delete</span>
        </button>
      </div>
    </div>
  );
}

export default ListInfo;
