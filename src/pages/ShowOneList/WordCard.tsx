import { deleteWord } from '../../utils/firebase/wordMethods';
import { useToast } from '../../contexts/ToastContext';
import { useUser } from '../../contexts/UserContext';
import { WordWithId } from '../../types/word';

import { HorizontalBar } from '../../components/HorizontalBar/HorizontalBar';

interface WordCardProps {
  openWordForm: () => void;
  listId: string;
  wordToShow: WordWithId;
  closeModal: () => void;
}

export const WordCard = (props: WordCardProps) => {
  const {
    openWordForm,
    listId,
    wordToShow,
    closeModal,
  } = props;

  const { toast } = useToast();
  const { user } = useUser();
  const userId = user ? user.uid : null;
  let dateStr = null;

  if (wordToShow.lastReview) {
    const date = new Date(wordToShow.lastReview);

    const hours = date.getHours();
    const hoursStr = hours < 10 ? `0${hours}` : hours.toString();

    const minutes = date.getMinutes();
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString();

    dateStr = `Révisé le ${date.toLocaleDateString('fr-FR')} à ${hoursStr}h${minutesStr}`;
  }

  const handleDelete = () => {
    if (!userId) return;
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce mot ?')) return;

    deleteWord(userId, listId, wordToShow.id)
      .then(() => {
        closeModal();
        toast.success('Le mot a bien été supprimé');
      })
      .catch(() => toast.error('Une erreur inconnue est survenue'));
  };

  return (
    <div className='word-card'>
      <p className='word'>Anglais : { wordToShow.word }</p>
      <p className='translation'>Français : { wordToShow.translation }</p>

      <HorizontalBar />
      <p className='time'>{ dateStr ?? 'Pas encore révisé' }</p>
      <HorizontalBar />

      <div className='bottom'>
        <button className='edit btn btn-text-primary' onClick={openWordForm}>
          Modifier
          <span className='material-symbols-rounded'>edit</span>
        </button>
        <button onClick={handleDelete} className='delete btn btn-text-danger'>
          Supprimer
          <span className='material-symbols-rounded outline'>delete</span>
        </button>
      </div>
    </div>
  );
};
