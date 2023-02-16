import Overlay from '../Overlay/Overlay';
import MenuContainer from './MenuContainer';
import MenuHeader from './MenuHeader';
import MenuContent from './MenuContent';

import './Menu.css';

const Menu = ({ isShow, handleClose, handleSignOut }) => {

  return (
    <Overlay close={handleClose} isShow={isShow}>
      <MenuContainer isShow={isShow} menuTitle='VocabuLearning'>
        <MenuHeader title='Vocabulearning' handleClose={handleClose} />

        <MenuContent>
          <button className='menu-item text-danger bg-transparent' onClick={handleSignOut}>
            <span className='material-symbols-rounded'>exit_to_app</span>
            <span className='text'>Se déconnecter</span>
          </button>
        </MenuContent>
      </MenuContainer>
    </Overlay>
  );
}

export default Menu;
