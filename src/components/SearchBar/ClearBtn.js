const ClearBtn = ({ reset }) => (
  <button
    className='clear-search'
    aria-label='effacer la recherche'
    onClick={reset}
  >
    <span className='material-icons-round'>clear</span>
  </button>
);

export default ClearBtn;
