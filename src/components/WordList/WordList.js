import React from 'react';

const WordList = ({id, name, words }) => {
  return (
    <>
      <h2>{ name }</h2>
      <p>
        { words ? 'Votre liste contient des mots' : 'Votre liste ne contient aucun mot' }
      </p>
    </>
  );
}

export default WordList;
