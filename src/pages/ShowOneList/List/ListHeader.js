const ListHeader = ({ name, nbWords, openWordForm }) => (
  <div className='list-header'>
    <h2>
      { name }
      <span className='nb-words'> ({ nbWords } mot{ nbWords > 1 && 's' })</span>
    </h2>

    <button className='btn btn-primary add-word' onClick={openWordForm}>
      <span className='material-symbols-rounded'>add</span>
      <span className='btn-text'>Ajouter un mot</span>
    </button>
  </div>
);

export default ListHeader;
