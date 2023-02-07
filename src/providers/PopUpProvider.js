import { createContext, useState } from 'react';

import PopUpsContainer from '../components/PopUpsContainer/PopUpsContainer';

export const PopUpContext = createContext({
  showPopUp: () => {}
});

const PopUpProvider = ({ children }) => {

  const [popUps, setPopUps] = useState([]);

  const deletePopUp = key => {
    setPopUps(popUps => popUps.filter(popUp => popUp.key !== key));
  };

  const showPopUp = (message = '', status = 'success') => {

    const key = Math.random().toString(36).substr(2, 9);

    const popUp = {
      key,
      message,
      status,
      close: () => deletePopUp(key)
    };

    setPopUps(popUps => [...popUps, popUp]);

    return popUp;
  };

  return (
    <PopUpContext.Provider value={{ showPopUp }}>
      { children }
      <PopUpsContainer popUps={popUps} />
    </PopUpContext.Provider>
  );
}

export default PopUpProvider;
