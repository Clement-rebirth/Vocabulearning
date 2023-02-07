import PopUpMessage from './PopUpMessage';

import './PopUpsContainer.css';

const PopUpsContainer = ({ popUps }) => (
  <div className='pop-ups-containers'>
    {
      popUps.map(popUp => (
        <PopUpMessage
          key={popUp.key}
          status={popUp.status}
          message={popUp.message}
          close={popUp.close}
        />
      ))
    }
  </div>
);

export default PopUpsContainer;
