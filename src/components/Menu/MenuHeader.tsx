interface MenuHeaderProps {
  handleClose: () => void;
  title: string;
}

export const MenuHeader = ({ handleClose, title = '' }: MenuHeaderProps) => (
  <div className='top'>
    <button className='close-menu' onClick={handleClose}>
      <span className='material-symbols-rounded close-icon'>close</span>
    </button>
    <h1><span>{ title }</span></h1>
  </div>
);
