import React from 'react';

const WordCard = ({ openWordForm, id, word, translation, lastRepetition }) => {

  let dateStr = null;

  if (lastRepetition) {
    const date = new Date(lastRepetition);

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let minutes = date.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;

    dateStr = `Révisé le ${date.toLocaleDateString('fr-FR')} à ${hours}h${minutes}`;
  }

  return (
    <div className='word-card'>
      <p className='word'>{ word }</p>
      <p className='translation'>{ translation }</p>

      <div className='bottom'>
        <span className='time'>{ dateStr ? dateStr : 'Pas encore révisé' }</span>
        <button className='edit' onClick={openWordForm}>Modifier</button>
        <button className='supprimer'>Supprimer</button>
      </div>
    </div>
  );
}

export default WordCard;
