const MenuButton = ({ openMenu }) => (
  <button onClick={openMenu} id='open-menu' aria-label='ouvrir le menu'>
    <span className='material-symbols-rounded'>menu</span>
  </button>
);

export default MenuButton;