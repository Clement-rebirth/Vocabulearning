import React from 'react';

const WordCard = props => {

  const { 
    openWordForm, 
    deleteWord, 
    wordListId, 
    currentWord,
    userId,
    closeModal } = props;

  let dateStr = null;

  if (currentWord.lastRepetition) {
    const date = new Date(currentWord.lastRepetition);

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let minutes = date.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;

    dateStr = `Révisé le ${date.toLocaleDateString('fr-FR')} à ${hours}h${minutes}`;
  }

  const handleDelete = () => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce mot ?')) return;
    deleteWord(wordListId, userId, currentWord.id, closeModal);
  };

  return (
    <div className='word-card'>
      <p className='word'>{ currentWord.word }</p>
      <p className='translation'>{ currentWord.translation }</p>

      <div className='bottom'>
        <span className='time'>{ dateStr ? dateStr : 'Pas encore révisé' }</span>
        <button className='edit' onClick={openWordForm}>Modifier</button>
        <button onClick={handleDelete} className='supprimer'>Supprimer</button>
      </div>
    </div>
  );
}

export default WordCard;
