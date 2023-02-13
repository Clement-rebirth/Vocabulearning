const MenuHeader = ({ handleClose, title = '' }) => (
  <div className='top'>
    <button className='close-menu' onClick={handleClose}>
      <span className='material-symbols-rounded'>close</span>
    </button>
    <h1><span>{ title }</span></h1>
  </div>
);

export default MenuHeader;
