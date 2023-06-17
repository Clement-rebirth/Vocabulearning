import { Overlay } from '../Overlay/Overlay';
import { MenuContainer } from './MenuContainer';
import { MenuHeader } from './MenuHeader';

import './Menu.css';

interface MenuProps {
  isShow: boolean;
  handleClose: () => void;
  handleSignOut: () => void;
}

export const Menu = ({ isShow, handleClose, handleSignOut }: MenuProps) => {
  return (
    <Overlay close={handleClose} isShow={isShow}>
      <MenuContainer isShow={isShow}>
        <MenuHeader title='Vocabulearning' handleClose={handleClose} />

        <div className='menu-content'>
          <button className='menu-item text-danger bg-transparent' onClick={handleSignOut}>
            <span className='material-symbols-rounded'>exit_to_app</span>
            <span className='text'>Se déconnecter</span>
          </button>
        </div>
      </MenuContainer>
    </Overlay>
  );
};
