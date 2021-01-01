import React, { useContext, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from './providers/UserProvider';
import { ROUTES } from './constants';
import { signOut } from './services/firebase/authMethods';

import { Route } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import ShowAllLists from './pages/ShowAllLists/ShowAllLists';
import ShowOneList from './pages/ShowOneList/ShowOneList';
import SearchProvider from './providers/SearchProvider';
import ListsProvider from './providers/ListsProvider';

import './App.css';
import './assets/icons-css/icofont.min.css';

const App = () => {
  
  const [showMenu, setShowMenu] = useState(false);
  
  let history = useHistory();
  let { user, setUser } = useContext(UserContext);

  let location = useLocation();
  let redirectAfterAuth = location.state && location.state.redirectAfterAuth;

  const handleSignOut = () => {
    signOut(() => {
      setUser(false);
      history.replace(ROUTES.LANDING);
    }, error => {
      console.log('logout error : ', error);
    });
  };

  if (user === false && !redirectAfterAuth) return <Redirect to={ROUTES.LANDING} />;

  return (
    <div className='app'>
      <Menu 
        isShow={showMenu}
        handleClose={() => setShowMenu(false)}
        handleSignOut={handleSignOut}
      />

      <ListsProvider>
        <SearchProvider showMenu={() => setShowMenu(true)}>
          <Route exact path={ROUTES.HOME}>
            <ShowAllLists 
              history={history}
              user={user}
            />
          </Route>

          <Route exact path={ROUTES.DISPLAY_ONE_LIST}>
            <ShowOneList
              user={user}
              history={history}
            />
          </Route>
        </SearchProvider>
      </ListsProvider>
    </div>
  );
}

export default App;
